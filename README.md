# Diogo Mota Windows XP Personal Homepage

A static personal homepage styled as a Windows XP desktop, with a Y2K/retro profile window for Diogo Mota.

## Pages

- `index.html` - XP desktop homepage with Diogo's photo, name, role, company, desktop shortcuts, Start menu, taskbar, and navigation buttons
- `posts.html` - XP window placeholder for Posts
- `projects.html` - XP window placeholder for Projects
- `recommendations.html` - XP window placeholder for Recommendations

## Files

- `styles.css` - Windows XP desktop, taskbar, Start menu, window chrome, responsive layout, and Y2K profile styling
- `script.js` - Start menu behavior, desktop icon selection/dragging, clock, and window controls
- `assets/diogo.jpg` - profile photo used by the homepage
- `assets/xp/` - Windows XP wallpaper, desktop icons, taskbar icons, and Start menu assets

## Interactions

- Start button opens and closes the XP-style Start menu.
- Desktop icons can be selected and dragged on desktop widths.
- Window controls support minimize, restore, maximize, and close.
- The taskbar button restores or minimizes the active window.

## Run Locally

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:4173/
```

No build step is required.
