const desktop = document.querySelector("[data-desktop]");
const startButton = document.querySelector("[data-start-button]");
const startMenu = document.querySelector("[data-start-menu]");
const mobileIconLayoutQuery = window.matchMedia("(max-width: 720px)");

function getWindowById(id) {
  return document.getElementById(id);
}

function getTaskButton(windowElement) {
  if (!windowElement || !windowElement.id) {
    return null;
  }

  return document.querySelector(`[data-restore-window="${windowElement.id}"]`);
}

function getMaximizeButton(windowElement) {
  if (!windowElement) {
    return null;
  }

  return windowElement.querySelector('[data-window-action="maximize"]');
}

function syncMaximizeButton(windowElement) {
  const maximizeButton = getMaximizeButton(windowElement);

  if (!maximizeButton) {
    return;
  }

  const isMaximized = windowElement.classList.contains("is-maximized");
  maximizeButton.setAttribute("aria-label", isMaximized ? "Restore window" : "Maximize window");
  maximizeButton.setAttribute("aria-pressed", String(isMaximized));
}

function updateTaskState(windowElement) {
  const taskButton = getTaskButton(windowElement);

  if (!taskButton) {
    return;
  }

  taskButton.classList.toggle("is-minimized", windowElement.classList.contains("is-minimized"));
  taskButton.classList.toggle("is-closed", windowElement.classList.contains("is-closed"));
  taskButton.classList.toggle(
    "is-active",
    !windowElement.classList.contains("is-minimized") && !windowElement.classList.contains("is-closed")
  );
  taskButton.setAttribute("aria-pressed", String(taskButton.classList.contains("is-active")));
}

function restoreWindow(windowElement) {
  if (!windowElement) {
    return;
  }

  windowElement.classList.remove("is-minimized", "is-closed");
  syncMaximizeButton(windowElement);
  updateTaskState(windowElement);
}

function minimizeWindow(windowElement) {
  windowElement.classList.add("is-minimized");
  windowElement.classList.remove("is-closed");
  updateTaskState(windowElement);
}

function maximizeWindow(windowElement, button) {
  windowElement.classList.toggle("is-maximized");
  syncMaximizeButton(windowElement);
  updateTaskState(windowElement);
}

function closeWindow(windowElement) {
  if (!windowElement) {
    return;
  }

  windowElement.classList.add("is-closed");
  windowElement.classList.remove("is-minimized", "is-maximized");
  syncMaximizeButton(windowElement);
  updateTaskState(windowElement);
}

function closeStartMenu() {
  if (!startMenu || !startButton) {
    return;
  }

  startMenu.classList.remove("is-open");
  startMenu.setAttribute("aria-hidden", "true");
  startButton.classList.remove("is-active");
  startButton.setAttribute("aria-expanded", "false");
}

function toggleStartMenu() {
  if (!startMenu || !startButton) {
    return;
  }

  const isOpen = startMenu.classList.toggle("is-open");
  startMenu.setAttribute("aria-hidden", String(!isOpen));
  startButton.classList.toggle("is-active", isOpen);
  startButton.setAttribute("aria-expanded", String(isOpen));
}

document.querySelectorAll("[data-window-action]").forEach((button) => {
  button.addEventListener("click", () => {
    const windowElement = button.closest("[data-window]");

    if (!windowElement) {
      return;
    }

    if (button.dataset.windowAction === "minimize") {
      minimizeWindow(windowElement);
    }

    if (button.dataset.windowAction === "maximize") {
      maximizeWindow(windowElement, button);
    }

    if (button.dataset.windowAction === "close") {
      closeWindow(windowElement);
    }

    closeStartMenu();
  });
});

document.querySelectorAll("[data-restore-window]").forEach((button) => {
  button.addEventListener("click", () => {
    const windowElement = getWindowById(button.dataset.restoreWindow);

    if (!windowElement || windowElement.classList.contains("is-closed")) {
      return;
    }

    if (windowElement.classList.contains("is-minimized")) {
      restoreWindow(windowElement);
    } else {
      minimizeWindow(windowElement);
    }

    closeStartMenu();
  });
});

document.querySelectorAll("[data-open-window]").forEach((button) => {
  button.addEventListener("click", () => {
    restoreWindow(getWindowById(button.dataset.openWindow));
    closeStartMenu();
  });
});

document.querySelectorAll("[data-close-window]").forEach((button) => {
  button.addEventListener("click", () => {
    closeWindow(getWindowById(button.dataset.closeWindow));
    closeStartMenu();
  });
});

if (startButton) {
  startButton.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleStartMenu();
  });
}

if (startMenu) {
  startMenu.addEventListener("click", (event) => {
    event.stopPropagation();
  });
}

document.addEventListener("click", (event) => {
  if (startMenu && startButton && !startMenu.contains(event.target) && !startButton.contains(event.target)) {
    closeStartMenu();
  }

  if (!event.target.closest(".desktop-icon")) {
    document.querySelectorAll(".desktop-icon.is-selected").forEach((icon) => {
      icon.classList.remove("is-selected");
    });
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeStartMenu();
  }
});

document.querySelectorAll(".y2k-button, .back-button, .desktop-icon, .start-button, .task-button, .start-item").forEach((button) => {
  button.addEventListener("pointerdown", () => {
    button.classList.add("is-clicking");
  });

  button.addEventListener("pointerup", () => {
    button.classList.remove("is-clicking");
  });

  button.addEventListener("pointerleave", () => {
    button.classList.remove("is-clicking");
  });
});

function makeDesktopIconDraggable(icon) {
  let pointerId = null;
  let startX = 0;
  let startY = 0;
  let originX = 0;
  let originY = 0;
  let dragging = false;

  icon.addEventListener("pointerdown", (event) => {
    if (mobileIconLayoutQuery.matches) {
      return;
    }

    pointerId = event.pointerId;
    startX = event.clientX;
    startY = event.clientY;

    const rect = icon.getBoundingClientRect();
    originX = rect.left + window.scrollX;
    originY = rect.top + window.scrollY;

    document.querySelectorAll(".desktop-icon.is-selected").forEach((selectedIcon) => {
      selectedIcon.classList.remove("is-selected");
    });
    icon.classList.add("is-selected");
    icon.setPointerCapture(pointerId);
  });

  icon.addEventListener("pointermove", (event) => {
    if (pointerId !== event.pointerId || !desktop) {
      return;
    }

    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;

    if (!dragging && Math.hypot(deltaX, deltaY) < 6) {
      return;
    }

    dragging = true;
    icon.classList.add("is-dragging");
    icon.style.position = "fixed";
    icon.style.left = `${Math.max(4, Math.min(window.innerWidth - icon.offsetWidth - 4, originX + deltaX))}px`;
    icon.style.top = `${Math.max(4, Math.min(window.innerHeight - icon.offsetHeight - 42, originY + deltaY))}px`;
  });

  icon.addEventListener("pointerup", (event) => {
    if (pointerId !== event.pointerId) {
      return;
    }

    icon.releasePointerCapture(pointerId);
    icon.classList.remove("is-dragging", "is-clicking");

    if (dragging) {
      event.preventDefault();
      icon.dataset.wasDragged = "true";
      window.setTimeout(() => {
        delete icon.dataset.wasDragged;
      }, 0);
    }

    pointerId = null;
    dragging = false;
  });

  icon.addEventListener("click", (event) => {
    if (icon.dataset.wasDragged === "true") {
      event.preventDefault();
      return;
    }

    icon.classList.add("is-selected");
  });

  icon.addEventListener("dragstart", (event) => {
    event.preventDefault();
  });
}

document.querySelectorAll("[data-draggable]").forEach(makeDesktopIconDraggable);

function clearDesktopIconPositions() {
  if (!mobileIconLayoutQuery.matches) {
    return;
  }

  document.querySelectorAll("[data-draggable]").forEach((icon) => {
    icon.style.removeProperty("position");
    icon.style.removeProperty("left");
    icon.style.removeProperty("top");
  });
}

clearDesktopIconPositions();

if (typeof mobileIconLayoutQuery.addEventListener === "function") {
  mobileIconLayoutQuery.addEventListener("change", clearDesktopIconPositions);
} else {
  mobileIconLayoutQuery.addListener(clearDesktopIconPositions);
}

function updateClock() {
  const clock = document.querySelector("[data-clock]");

  if (!clock) {
    return;
  }

  const now = new Date();
  clock.textContent = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
}

updateClock();
setInterval(updateClock, 30000);

document.querySelectorAll("[data-window]").forEach(updateTaskState);
document.querySelectorAll("[data-window]").forEach(syncMaximizeButton);
