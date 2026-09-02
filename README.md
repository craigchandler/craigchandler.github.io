# Craig Chandler's Portfolio

This is my personal portfolio website built using Bootstrap, Gulp, and Vite.

## Prerequisites

- Node.js 20.19.x, or Node.js 22.12 or higher
- npm (comes with Node.js)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/craigchandler/craigchandler.github.io.git
cd craigchandler.github.io
```

2. Install dependencies:
```bash
npm install
```

3. Build the assets:
```bash
npm run build
```

## Development

To start the development server with live reload:
```bash
npm run dev
```

This will:
- Compile LESS files to CSS
- Minify CSS and JavaScript
- Copy vendor files
- Serve the site with Vite at `http://127.0.0.1:5173`
- Watch source files and reload automatically

## Available Commands

- `npm run build` - Full build of all assets
- `npm run dev` - Build assets, watch sources, and start the Vite development server
- `npm run watch:assets` - Build assets and watch LESS and source JavaScript without starting a server
- `npm run serve` - Start only the Vite development server
- `npm run audit` - Fail when npm reports a high or critical vulnerability
- `npx gulp css` - Compile and minify CSS only
- `npx gulp js` - Minify JavaScript only
- `npx gulp less` - Compile LESS files
- `npx gulp vendor` - Copy vendor files

## File Structure

```
├── css/                  # Compiled CSS files
├── js/                   # JavaScript files
├── less/                 # LESS source files
├── vendor/              # Third-party libraries
├── img/                 # Image assets
├── index.html           # Main HTML file
├── gulpfile.js         # Gulp configuration
└── package.json        # Project dependencies
```

## Updating Dependencies

To update all dependencies to their latest versions:

1. Check for outdated packages:
```bash
npm outdated
```

2. Update packages:
```bash
npm update
```

3. Rebuild assets:
```bash
npm run build
```

## Deployment

The site is hosted on GitHub Pages. To deploy:

1. Build the assets:
```bash
npm run build
```

2. Commit and push changes:
```bash
git add .
git commit -m "Update site"
git push origin main
```

GitHub Pages will automatically deploy the site from the main branch.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
