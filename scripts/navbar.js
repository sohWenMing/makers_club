document.addEventListener("DOMContentLoaded", () => {
  console.log("loaded");
  const hamburgerButton = document.getElementById("hamburger-icon");
  const hamburgerLines = hamburgerButton.querySelectorAll("div");
  const mobileNav = document.querySelector(".mobile-navbar");
  const openToggles = [...hamburgerLines, mobileNav];
  console.log(openToggles);

  hamburgerButton.addEventListener("click", () => {
    console.log("button loaded");
    openToggles.forEach((element) => {
      element.classList.toggle("open");
    });
  });
});
