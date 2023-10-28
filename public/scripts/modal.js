function generateDateString(data) {
  const dateData = data;
  const date = new Date(dateData);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const dateString = day + "/" + month + "/" + year;
  return dateString;
}

function imagePreview() {
  // const previewImage = document.getElementById(theme_image_id);
  const previewImage = document.getElementById("theme-preview-image");
  const imageInput = document.getElementById("image-input");

  if (imageInput.files && imageInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (event) {
      previewImage.src = event.target.result;
    };

    reader.readAsDataURL(imageInput.files[0]);
  }

  // console.log(previewImage);
}

// import { generateDateString } from '../../helper_functions/timeFunctions.js';

function generateFormElement(inputType, classElements, isTextArea, loadedInformation, id = 0, labelText = "default") {
  const formElementDiv = document.createElement("div");

  const label = document.createElement("label");
  label.innerText = labelText;
  label.setAttribute("for", id);
  label.style.display = "block";
  //definition of label

  const formElement = document.createElement(inputType);
  formElement.setAttribute("id", id);
  if (isTextArea === true) {
    formElement.innerText = loadedInformation;
    formElement.setAttribute("rows", 10);
    formElement.setAttribute("cols", 60);
    formElement.maxLength = 250;
    formElementDiv.classList.add("textarea-div");
  }
  //definition of text area
  else {
    formElement.setAttribute("type", "text");
    formElement.setAttribute("value", loadedInformation);
    formElementDiv.classList.add("textinput-div");
  }
  //definition of text input
  for (let element of classElements) {
    formElement.classList.add(element);
  }

  formElementDiv.appendChild(label);
  formElementDiv.appendChild(formElement);
  return formElementDiv;
}

function generateId(recordType, id) {
  const returnedId = recordType + "-" + id;
  return returnedId;
}
//function to generateDateStrings used for inputs

document.addEventListener("DOMContentLoaded", () => {
  const editIcons = document.querySelectorAll("[data-icon-type=edit-icon]");
  const modal = document.querySelector(".modal");
  const modalContent = document.querySelector(".modal-content");
  const closeModal = document.querySelector(".modal-close-button");

  //setup edit icons
  editIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      modal.classList.toggle("active");
      modalContent.classList.toggle("active");

      //get all the data attributes, the icon attributes have all the data relating to the entry
      const dataAttributes = {};
      for (const attr of icon.attributes) {
        //go through all the attributes, pick only the ones that start with data-, then remove data- from those names and use that as a key, storing the value of the attribute as the value
        if (attr.name.startsWith("data-")) {
          dataAttributes[attr.name.replace("data-", "")] = attr.value;
        }
      }
      const newForm = document.createElement("form");
      newForm.classList.add("modal-form");
      const modalFormLeft = document.createElement("div");
      modalFormLeft.classList.add("modal-form-left");
      const modalFormRight = document.createElement("div");
      modalFormRight.classList.add("modal-form-right");
      newForm.appendChild(modalFormLeft);
      newForm.appendChild(modalFormRight);

      //sets up the initial segments of the form: splitting it down the middle where CSS will have a 2 grid layout

      const leftTopSection = document.createElement("div");
      leftTopSection.classList.add("modal-form-left-top-section");
      modalFormLeft.appendChild(leftTopSection);
      const leftBottomSection = document.createElement("div");
      leftBottomSection.classList.add("modal-form-left-bottom-section");
      modalFormLeft.appendChild(leftBottomSection);

      if (dataAttributes["page"] === "themes") {
        const editHeader = document.createElement("h1");
        editHeader.innerText = "Edit Theme";
        const themeNameInput = generateFormElement("input", ["modal-input"], false, dataAttributes["theme-name"], generateId("themes", dataAttributes["theme-id"]), "Theme Name");
        const themeInformationInput = generateFormElement(
          "textarea",
          ["modal-text-area"],
          true,
          dataAttributes["theme-information"],
          generateId("themes", dataAttributes["theme-id"]),
          "Theme Information"
        );
        const startDateInput = generateFormElement(
          "input",
          ["modal-input", "modal-start-date", "datetimepicker"],
          false,
          generateDateString(dataAttributes["start-date-time"]),
          generateId("themes", dataAttributes["theme-id"]),
          "Start Date"
        );
        const endDateInput = generateFormElement(
          "input",
          ["modal-input", "modal-end-date", "datetimepicker"],
          false,
          generateDateString(dataAttributes["end-date-time"]),
          generateId("themes", dataAttributes["theme-id"]),
          "End Date"
        );
        leftTopSection.appendChild(editHeader);
        leftTopSection.appendChild(themeNameInput);
        leftTopSection.appendChild(startDateInput);
        leftTopSection.appendChild(endDateInput);
        leftBottomSection.appendChild(themeInformationInput);
        /// working on right section

        const rightFirstColumn = document.createElement("div");
        rightFirstColumn.classList.add("modal-form-right-section-first-column");
        const rightSecondColumn = document.createElement("div");
        rightSecondColumn.classList.add("modal-form-right-section-second-column");

        const image = document.createElement("img");
        image.setAttribute("src", dataAttributes["image-url"]);
        image.setAttribute("alt", "theme " + dataAttributes["theme-name"] + "-image");
        image.setAttribute("id", "theme-preview-image");
        image.classList.add("modal-theme-image");
        modalFormRight.appendChild(image);

        const imageInputDiv = document.createElement("div");
        imageInputDiv.classList.add("modal-image-input-div");
        imageInputDiv.style.display = "flex";
        imageInputDiv.style.justifyContent = "center";
        const imageInput = document.createElement("input");
        imageInput.setAttribute("type", "file");
        imageInput.setAttribute("id", "image-input");
        imageInput.setAttribute("accept", "image/*");
        imageInput.addEventListener("change", imagePreview);
        imageInputDiv.appendChild(imageInput);
        modalFormRight.appendChild(imageInputDiv);

        const submitButton = document.createElement("button");
        submitButton.classList.add("btn", "btn-primary");
        submitButton.innerText = "Submit";
        modalFormRight.appendChild(submitButton);
      }
      modalContent.append(newForm);

      flatpickr(".datetimepicker", {
        altInput: true,
        altFormat: "d-m-Y",
        dateFormat: "d-m-Y",
      });
    });
  });
  closeModal.addEventListener("click", () => {
    modal.classList.toggle("active");
    modalContent.classList.toggle("active");
    const form = document.querySelector(".modal-form");
    modalContent.removeChild(form);
  });
  console.log("in script");
});
