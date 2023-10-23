document.addEventListener("DOMContentLoaded", () => {
  const editIcons = document.querySelectorAll("[data-icon-type=edit-icon]");
  const modal = document.querySelector(".modal");
  const modalContent = document.querySelector(".modal-content");
  console.log(modal);
  editIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      console.log("icon clicked");
      modal.classList.toggle("active");
      modalContent.classList.toggle("active");
    });
  });
  console.log(editIcons);
  console.log("in script");
});
