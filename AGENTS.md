# Agent Notes

This repository contains a static personal Y2K-style homepage for Diogo Mota.

## Project Rules

- Use only plain HTML, CSS, and vanilla JavaScript.
- Do not add frameworks, build tools, package managers, backend code, or databases unless explicitly requested.
- Keep the site focused on the existing content: photo, name, job title, company, and the three navigation links.
- Preserve the current background, color palette, and font choices unless the user explicitly asks to change them.
- The profile photo used by the site is `assets/diogo.jpg`.
- Root-level source/reference images should not be kept if they are not used by the site.

## Verification

- For local testing, run `python -m http.server 4173 --bind 127.0.0.1`.
- Verify `index.html`, `posts.html`, `projects.html`, `recommendations.html`, `styles.css`, `script.js`, and `assets/diogo.jpg` load successfully.
- When changing layout, check both desktop and mobile widths for overflow.
