# Personal Site

A personal website built with [Eleventy](https://www.11ty.dev/) (v3). Source files live in `src/`, and the compiled site is written to `_site/`.

## Requirements

- [Node.js](https://nodejs.org/) 20 or newer (the deploy workflow uses Node 20)
- npm (installed with Node.js)

## Setup

Install the dependencies once after cloning the repository:

```sh
npm install
```

## Run a local development server

```sh
npm start
```

This runs `eleventy --serve`, which builds the site, starts a local server, and rebuilds automatically when you change a file. Open the URL printed in the terminal, usually <http://localhost:8080>.

Stop the server with `Ctrl+C`.

## Build the site

```sh
npm run build
```

This compiles the site into the `_site/` folder. Nothing is served, so use it to check the output before deploying. `_site/` is ignored by git.

To serve the built output, run a static file server on `_site/`, for example:

```sh
npx http-server _site
```

## Project structure

```
src/                 Site source (pages, templates, assets)
  _includes/         Layouts and partials
  contents/          Page content
  pictures/          Images (copied as-is)
  index.html         Home page
  style.css          Stylesheet (copied as-is)
  favicon.svg        Browser tab icon (copied as-is)
  background_*.svg   Light and dark theme backgrounds (copied as-is)
eleventy.config.js   Eleventy configuration (filters, passthrough copies, watch targets)
.eleventyignore      Files and folders Eleventy should skip
_site/               Generated output (do not edit by hand)
```

Files listed as passthrough copies in `eleventy.config.js` are copied to `_site/` without processing.

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`. The workflow runs `npm ci` and `npm run build`, then publishes `_site/` to GitHub Pages. The checkout uses full git history because the `lastModified` filter reads per-file dates from git.

## Troubleshooting

- **Port 8080 is already in use:** stop the other process, or pass a different port with `npx @11ty/eleventy --serve --port=8081`.
- **Changes are not picked up:** restart `npm start`. Eleventy only watches files it has already loaded, so new files added while the server is running may need a restart.
- **`lastModified` shows the file's file-system date:** the file is not committed yet, so git has no history for it. It will use the commit date after you commit.
