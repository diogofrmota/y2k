const starfield = document.querySelector("[data-starfield]");

function createStar(index) {
  const star = document.createElement("span");
  const size = index % 9 === 0 ? 5 : index % 4 === 0 ? 4 : 3;
  const left = Math.random() * 100;
  const top = Math.random() * 100;
  const speed = 1.8 + Math.random() * 2.8;
  const delay = Math.random() * -4;

  star.className = "star";
  star.style.left = `${left}%`;
  star.style.top = `${top}%`;
  star.style.setProperty("--size", `${size}px`);
  star.style.setProperty("--speed", `${speed}s`);
  star.style.setProperty("--delay", `${delay}s`);

  return star;
}

if (starfield) {
  const starCount = window.matchMedia("(max-width: 640px)").matches ? 26 : 42;
  const fragment = document.createDocumentFragment();

  for (let index = 0; index < starCount; index += 1) {
    fragment.appendChild(createStar(index));
  }

  starfield.appendChild(fragment);
}

document.querySelectorAll(".y2k-button, .back-button").forEach((button) => {
  button.addEventListener("pointerenter", () => {
    button.classList.add("is-hovering");
  });

  button.addEventListener("pointerleave", () => {
    button.classList.remove("is-hovering", "is-clicking");
  });

  button.addEventListener("pointerdown", () => {
    button.classList.add("is-clicking");
  });

  button.addEventListener("pointerup", () => {
    button.classList.remove("is-clicking");
  });

  button.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      button.classList.add("is-clicking");
    }
  });

  button.addEventListener("keyup", () => {
    button.classList.remove("is-clicking");
  });
});

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
