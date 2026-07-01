# Agent Notes

This repository contains a static personal homepage for Diogo Mota styled as a Windows XP desktop with Y2K/retro chrome inside the profile window.

## Project Rules

- Use only plain HTML, CSS, and vanilla JavaScript.
- Do not add frameworks, build tools, package managers, backend code, or databases unless explicitly requested.
- Keep the site focused on the existing content: photo, name, job title, company, and the three navigation links.
- Preserve the current Windows XP desktop UX/UI, imported XP assets, background, color palette, and font choices unless the user explicitly asks to change them.
- The profile photo used by the site is `assets/diogo.jpg`.
- Windows XP UI assets used by the site live in `assets/xp/`.
- Do not reference or recreate an `input/` folder for runtime assets; temporary source/reference files should be moved into the correct site structure or deleted.
- Root-level source/reference images should not be kept if they are not used by the site.
- Window controls should remain functional: minimize to taskbar, restore from taskbar/desktop icon, maximize/restore, and close/reopen.
- The Start menu, taskbar, desktop shortcuts, and mobile layout are part of the intended UX.

## Verification

- For local testing, run `python -m http.server 4173 --bind 127.0.0.1`.
- Verify `index.html`, `posts.html`, `projects.html`, `recommendations.html`, `styles.css`, `script.js`, `assets/diogo.jpg`, and referenced `assets/xp/` files load successfully.
- When changing layout, check both desktop and mobile widths for overflow.
- When changing behavior, verify the Start menu and window controls still work.
