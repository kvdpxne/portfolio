## Introduction

A single-page portfolio website designed to present projects, skills, and professional experience in a clean and modern way. It focuses on readability, visual consistency, and smooth interaction across all devices.

The site adapts to the user's preferred color scheme automatically while also allowing manual switching between themes. Content is organized into clear sections with subtle animations that appear as the user scrolls, keeping the browsing experience fluid and unobtrusive.

## Technical Overview

The site is built entirely with plain JavaScript and CSS, without any frameworks or runtime dependencies. There is no bundler in the traditional sense and no module system in use. Styling relies on CSS custom properties to drive the dark and light themes, which are switched by toggling a single class and persisted in `localStorage` so the preference survives page reloads and respects the system setting on first visit.

Sections that are not immediately visible, such as the projects list and the case study, are rendered on demand using `IntersectionObserver` to reduce initial page weight and improve perceived performance. A Canvas-based particle animation runs in the background, throttled through `requestAnimationFrame` and paused when the tab is hidden.

The site is a Progressive Web App: it ships with a Web Manifest and a Service Worker that caches static assets using a cache-first strategy for CSS, JavaScript and the manifest, and a network-first strategy for HTML so content stays fresh. This makes the site installable and functional offline.

The contact form is handled by Web3Forms, with the access key kept out of the client bundle. Submissions are routed through a Netlify Edge Function acting as a proxy, which reads the key from Netlify environment variables and forwards the request to the Web3Forms API.

The build pipeline is powered by Gulp, which minifies HTML, CSS and JavaScript to their absolute limits, generates the sitemap, and copies static assets into the `dist/` directory. The site is deployed on Netlify, with the build command `npm run build` and the publish directory set to `dist/`.

## Build

```bash
npm install
npm run build
```

Output directory: `dist/`

## Deployment

Deployed on Netlify. Build command: `npm run build`. Publish directory: `dist`.

The `WEB3FORMS_ACCESS_KEY` environment variable must be set in the Netlify dashboard and scoped to Edge Functions.

## License

Licensed under the WTFPL (Do What The Fuck You Want To Public License). The full license text is available in the LICENSE file.
