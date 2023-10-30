function generateDateString(data) {
  const dateData = data;
  const date = new Date(dateData);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const dateString = day + "/" + month + "/" + year;
  return dateString;
}

//function to generateDateStrings used for inputs

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
}

function getDataAttributes(element) {
  console.log(element, element.attributes);
  const dataAttributes = {};
  for (const attr of element.attributes) {
    if (attr.name.startsWith("data-")) {
      dataAttributes[attr.name.replace("data-", "")] = attr.value;
    }
  }
  return dataAttributes;
}

function generateNewForm(documentToAppend) {
  const newForm = document.createElement("form");
  newForm.classList.add("modal-form");
  const modalFormLeft = document.createElement("div");
  modalFormLeft.classList.add("modal-form-left");
  const modalFormRight = document.createElement("div");
  modalFormRight.classList.add("modal-form-right");
  newForm.appendChild(modalFormLeft);
  newForm.appendChild(modalFormRight);
  documentToAppend.append(newForm);
}

function generateNewFormWithLeftRightSections(documentToAppend) {
  generateNewForm(documentToAppend);
  const formElements = {};
  const modalFormLeft = document.querySelector(".modal-form-left");
  const modalFormRight = document.querySelector(".modal-form-right");
  const leftTopSection = document.createElement("div");
  leftTopSection.classList.add("modal-form-left-top-section");
  modalFormLeft.appendChild(leftTopSection);
  const leftBottomSection = document.createElement("div");
  leftBottomSection.classList.add("modal-form-left-bottom-section");
  modalFormLeft.appendChild(leftBottomSection);
  formElements.modalFormLeft = modalFormLeft;
  formElements.modalFormRight = modalFormRight;
  formElements.leftTopSection = leftTopSection;
  formElements.leftBottomSection = leftBottomSection;
  return formElements;
}

function generateFormElement(inputType, classElements, isTextArea, loadedInformation = "", id = 0, labelText = "default") {
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

      const dataAttributes = getDataAttributes(icon);

      formElements = generateNewFormWithLeftRightSections(modalContent);

      if (dataAttributes["page"] === "themes") {
        const editHeader = document.createElement("h1");
        if (dataAttributes["existing"] === "true") {
          editHeader.innerText = "Edit Theme";
        } else {
          editHeader.innerText = "New Theme";
        }

        const themeNameInput = generateFormElement("input", ["modal-input"], false, dataAttributes["theme-name"] || "", generateId("themes", dataAttributes["theme-id"] || "0"), "Theme Name");

        const themeInformationInput = generateFormElement(
          "textarea",
          ["modal-text-area"],
          true,
          dataAttributes["theme-information"] || "",
          generateId("themes", dataAttributes["theme-id"] || "0"),
          "Theme Information"
        );
        const startDateInput = generateFormElement(
          "input",
          ["modal-input", "modal-start-date", "datetimepicker"],
          false,
          generateDateString(dataAttributes["start-date-time"] || ""),
          generateId("themes", dataAttributes["theme-id"] || "0"),
          "Start Date"
        );
        const endDateInput = generateFormElement(
          "input",
          ["modal-input", "modal-end-date", "datetimepicker"],
          false,
          generateDateString(dataAttributes["end-date-time"] || ""),
          generateId("themes", dataAttributes["theme-id"] || 0),
          "End Date"
        );
        formElements.leftTopSection.appendChild(editHeader);
        formElements.leftTopSection.appendChild(themeNameInput);
        formElements.leftTopSection.appendChild(startDateInput);
        formElements.leftTopSection.appendChild(endDateInput);
        formElements.leftBottomSection.appendChild(themeInformationInput);

        const image = document.createElement("img");
        image.setAttribute("src", dataAttributes["image-url"]);
        image.setAttribute("alt", "theme " + dataAttributes["theme-name"] + "-image");
        image.setAttribute("id", "theme-preview-image");
        image.classList.add("modal-theme-image");
        formElements.modalFormRight.appendChild(image);

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
        formElements.modalFormRight.appendChild(imageInputDiv);

        const submitButton = document.createElement("button");
        submitButton.classList.add("btn", "btn-primary");
        submitButton.innerText = "Submit";
        formElements.modalFormRight.appendChild(submitButton);
      }

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
