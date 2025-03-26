# Craig Chandler's Portfolio

This is my personal portfolio website built using Bootstrap and Gulp.

## Prerequisites

- Node.js (v16 or higher)
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
npx gulp build
```

## Development

To start the development server with live reload:
```bash
npx gulp watch
```

This will:
- Compile LESS files to CSS
- Minify CSS and JavaScript
- Copy vendor files
- Start a local server
- Watch for changes and reload automatically

## Available Gulp Tasks

- `npx gulp build` - Full build of all assets
- `npx gulp css` - Compile and minify CSS only
- `npx gulp js` - Minify JavaScript only
- `npx gulp less` - Compile LESS files
- `npx gulp vendor` - Copy vendor files
- `npx gulp watch` - Start development server and watch for changes

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
npx gulp build
```

## Deployment

The site is hosted on GitHub Pages. To deploy:

1. Build the assets:
```bash
npx gulp build
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