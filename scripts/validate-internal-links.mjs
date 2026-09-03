import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, extname, join, relative } from 'node:path';

const outputDirectory = 'dist';
const siteOrigin = 'https://craigchandler.xyz';
const htmlFiles = [];

function collectHtmlFiles(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const entryPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      collectHtmlFiles(entryPath);
    } else if (entry.name.endsWith('.html')) {
      htmlFiles.push(entryPath);
    }
  }
}

function outputPathFor(pathname) {
  if (pathname === '/') return join(outputDirectory, 'index.html');
  if (pathname.endsWith('/')) return join(outputDirectory, pathname, 'index.html');
  return join(outputDirectory, pathname);
}

if (!existsSync(outputDirectory)) {
  throw new Error('The dist directory does not exist. Run the Astro build before validating links.');
}

collectHtmlFiles(outputDirectory);

const failures = [];

for (const htmlFile of htmlFiles) {
  const html = readFileSync(htmlFile, 'utf8');
  const source = relative(outputDirectory, htmlFile);
  const sourceDirectory = dirname(source).replaceAll('\\', '/');
  const sourcePath = sourceDirectory === '.' ? '/' : `/${sourceDirectory}/`;

  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const value = match[1];

    if (value.startsWith('#') || /^(?:mailto:|tel:)/.test(value)) continue;

    const url = new URL(value, `${siteOrigin}${sourcePath}`);
    if (url.origin !== siteOrigin) continue;

    const pathname = url.pathname;

    if (pathname !== '/' && !extname(pathname) && !pathname.endsWith('/')) {
      failures.push(`${source}: extensionless internal URL must end in "/": ${value}`);
      continue;
    }

    const target = outputPathFor(pathname);
    if (!existsSync(target)) failures.push(`${source}: target does not exist: ${value}`);
  }
}

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Validated internal URLs in ${htmlFiles.length} generated HTML files.`);
}
