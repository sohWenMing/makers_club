function getDateTimeFromString(dateString) {
  const dateparts = dateString.split("-");
  const day = parseInt(dateparts[0], 10);
  const month = parseInt(dateparts[1], 10) - 1;
  const year = parseInt(dateparts[2], 10);
  const dateTime = new Date(year, month, day);
  const dateTimeInUTC = new Date(dateTime.setHours(dateTime.getHours() + 2));
  return dateTimeInUTC;
}

function generateDateString(data) {
  const dateData = data;
  const date = new Date(dateData);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const dateString = day + "/" + month + "/" + year;
  return dateString;
}

function getDataAttributes(element) {
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
  newForm.setAttribute("id", "theme-form");
  newForm.classList.add("modal-form");
  const modalFormLeft = document.createElement("div");
  modalFormLeft.classList.add("modal-form-left");
  const modalFormRight = document.createElement("div");
  modalFormRight.classList.add("modal-form-right");
  newForm.appendChild(modalFormLeft);
  newForm.appendChild(modalFormRight);

  documentToAppend.append(newForm);
}

function setEndPoint(route, form) {
  if (route === "themes") {
    form.action = "/admin/themes";
    form.method = "post";
    form.enctype = "multipart/form-data";
    return form;
  }
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
    formElement.maxLength = 50;
    formElementDiv.classList.add("textinput-div");
  }
  formElement.name = labelText;
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

function getModalAndModalContent() {
  const modalObject = {};
  const modal = document.querySelector(".modal");
  const modalContent = document.querySelector(".modal-content");
  modalObject.modal = modal;
  modalObject.modalContent = modalContent;
  return modalObject;
}

function generateThemeForm(element) {
  const { modal, modalContent } = getModalAndModalContent();
  const dataAttributes = getDataAttributes(element);
  const formElements = generateNewFormWithLeftRightSections(modalContent);
  const form = document.querySelector("form");
  setEndPoint("themes", form);

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

  const imageFigure = document.createElement("figure");
  const imageCaption = document.createElement("figcaption");
  if (dataAttributes["image-url"] && dataAttributes["image-url"] != "") {
    imageCaption.innerText = "Current Image";
  } else {
    imageCaption.innerText = "No Image Currently Associated";
  }
  const image = document.createElement("img");
  image.setAttribute("src", dataAttributes["image-url"] || "./images/question_mark.jpeg");
  image.setAttribute("alt", "theme " + dataAttributes["theme-name"] || "empty-preview" + "-image");
  image.setAttribute("id", "theme-preview-image");
  image.classList.add("modal-theme-image");
  imageFigure.append(image);
  imageFigure.append(imageCaption);

  formElements.modalFormRight.appendChild(imageFigure);

  const imageInputDiv = document.createElement("div");
  imageInputDiv.style.height = "160px";
  imageInputDiv.style.width = "200px";
  imageInputDiv.style.border = "2px solid var(--font-gray)";
  imageInputDiv.style.margin = "var(--space-m) 0";
  const imageInput = document.createElement("input");
  imageInput.setAttribute("type", "file");
  imageInputDiv.append(imageInput);
  formElements.modalFormRight.appendChild(imageInputDiv);
  FilePond.registerPlugin(FilePondPluginImagePreview);
  const pond = FilePond.create(document.querySelector('input[type="file"]'), {
    labelIdle: "Upload A New Image",
    name: "image-input-filepond",
    imagePreviewHeight: 100,
    server: "/admin/uploads" });

  console.log(pond);
  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.classList.add("btn", "btn-primary");
  submitButton.innerText = "Submit";
  formElements.modalFormRight.appendChild(submitButton);

  flatpickr(".datetimepicker", {
    altInput: true,
    altFormat: "d-m-Y",
    dateFormat: "d-m-Y",
  });

  const themeNameParsleySelector = document.querySelector('[name="Theme Name"]');
  const themeInformationParsleySelector = document.querySelector('[name="Theme Information"]');
  const startDatePickerParsleySelector = document.querySelector(".modal-input.modal-start-date.datetimepicker.form-control.input");
  const endDatePickerParsleySelector = document.querySelector(".modal-input.modal-end-date.datetimepicker.form-control.input");

  themeNameParsleySelector.setAttribute("data-parsley-required", "");
  themeInformationParsleySelector.setAttribute("data-parsley-length", "[10, 250]");
  themeInformationParsleySelector.setAttribute("data-parsley-required", "");
  startDatePickerParsleySelector.setAttribute("data-parsley-required", "");
  endDatePickerParsleySelector.setAttribute("data-parsley-required", "");
  const parsleyForm = $("#theme-form").parsley();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("submit button was hit");
    const formData = new FormData(form);
    console.log("Form Data: " + Object.keys(formData));
    for (const [name, value] of formData) {
      console.log(`Name: ${name}, Value: ${value}`);
    }

    fetch(form.action, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((errorText) => {
            throw new Error(errorText);
          });
        }
        return response.text();
      })
      .then((text) => {
        console.log("text:", text);
      })
      .catch((error) => {
        alert(error.message);
      });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  const editIcons = document.querySelectorAll("[data-icon-type=edit-icon]");
  const closeModal = document.querySelector(".modal-close-button");
  const newThemeButton = document.getElementById("new-theme-button");
  const deleteIcons = document.querySelectorAll(".delete-icon");
  const { modal, modalContent } = getModalAndModalContent();

  editIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      modal.classList.toggle("active");
      modalContent.classList.toggle("active");
      if (icon.hasAttribute("data-page") && icon.getAttribute("data-page") === "themes") {
        generateThemeForm(icon);
      }
    });
  });

  deleteIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      console.log("delete icon clicked");
      const userResponse = window.confirm("Are you sure you want to proceed? this cannot be undone");
      if (userResponse === true) {
        console.log("User proceeded");
      } else {
        console.log("User cancelled action");
      }
    });
  });

  newThemeButton.addEventListener("click", () => {
    modal.classList.toggle("active");
    modalContent.classList.toggle("active");
    generateThemeForm(newThemeButton);
  });

  closeModal.addEventListener("click", () => {
    modal.classList.toggle("active");
    modalContent.classList.toggle("active");
    const form = document.querySelector(".modal-form");
    modalContent.removeChild(form);
    parsleyForm.destroy();
  });
  console.log("in script");
});
