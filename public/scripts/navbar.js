document.addEventListener("DOMContentLoaded", () => {
  console.log("loaded");
  const hamburgerButton = document.getElementById("hamburger-icon");
  const hamburgerLines = hamburgerButton.querySelectorAll("div");
  const mobileNav = document.querySelector(".mobile-navbar");
  const content = document.getElementById("main-content");
  const openToggles = [...hamburgerLines, mobileNav, content];

  console.log(openToggles);

  hamburgerButton.addEventListener("click", () => {
    console.log("button loaded");
    openToggles.forEach((element) => {
      element.classList.toggle("open");
    });
  });

  window.addEventListener("resize", () => {
    if (this.window.innerWidth >= 891) {
      const openElements = document.querySelectorAll(".open");
      openElements.forEach((element) => {
        element.classList.remove("open");
      });
    }
  });
});
