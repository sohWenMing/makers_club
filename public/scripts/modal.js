document.addEventListener("DOMContentLoaded", () => {
  const editIcons = document.querySelectorAll("[data-icon-type=edit-icon]");
  const modal = document.querySelector(".modal");
  const modalContent = document.querySelector(".modal-content");
  const closeModal = document.querySelector(".modal-close-button");
  console.log(modal);

  //setup edit icons
  editIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      console.log("icon clicked");
      modal.classList.toggle("active");
      modalContent.classList.toggle("active");

      //get all the data attributes
      const dataAttributes = {};
      for(const attr of icon.attributes) {
        if(attr.name.startsWith("data-")) {
          dataAttributes[attr.name.replace("data-", "")] = attr.value;
        }
      }
      const newForm = document.createElement('form');
      const themeNameInput = document.createElement('input')
      themeNameInput.setAttribute('type', 'text');
      themeNameInput.setAttribute('value', dataAttributes['theme-name']);
      newForm.appendChild(themeNameInput);
      modalContent.append(newForm);
    });
  });
  closeModal.addEventListener("click", () => {
    modal.classList.toggle("active");
    modalContent.classList.toggle("active");
  })
  console.log("in script");
});
