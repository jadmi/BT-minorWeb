// validation:
// Victor
// https://www.youtube.com/watch?v=h5qqmE83Tes

const form = document.querySelector("form");
const input = document.querySelectorAll("input");
const fileInput = document.querySelector("#deed");
const fileName = document.querySelector("#fileName");
const today = new Date().toISOString().split("T")[0];

form.setAttribute("novalidate", true);

// https://stackoverflow.com/questions/574904/get-next-previous-element-using-javascript
function validateField(field) {
  const label = document.querySelector(`label[for="${field.id}"]`);
  if (field.closest(".nestedFieldset")) return true;

  const errorMessage =
    field.type === "radio"
      ? field.closest("fieldset").querySelector(".errorMessage")
      : field.nextElementSibling;

  if (!field.validity.valid) {
    field.classList.add("hasError");
    field.setAttribute("aria-describedby", `${field.id}Error`);

    if (field.validity.patternMismatch || field.type === "radio") {
      errorMessage.textContent = field.dataset.error;
    } else {
      errorMessage.textContent = label.textContent + " is verplicht!";
    }
    return false;
  } else {
    field.classList.remove("hasError");
    field.removeAttribute("aria-describedby");

    if (field.type === "radio") {
      if (field.closest(".optionalQuestion")) return true; // skip radios inside optionalQuestion
      if (field.closest(".nestedFieldset")) return true;
    } else {
      if (field.offsetParent === null) return true;
    } // skip hidden/optional fields - // Claude gebruikt. prompt: how to skip hidden fields with      javascript? (offsetParent)
    errorMessage.textContent = "";
    return true;
  }
}

input.forEach((input) => {
  if (input.type === "radio") {
    input.addEventListener("change", () => {
      validateField(input);
    });
  } else
    input.addEventListener("blur", () => {
      validateField(input);
    });
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let isValid = true;

  const fields = input;
  fields.forEach((field) => {
    const fieldValid = validateField(field);
    if (!fieldValid) {
      isValid = false;
    }
  });

  if (isValid) {
    console.log(submit);
  } else {
    const firstInvalid = Array.from(fields).find((i) => !i.validity.valid); // Hulp van Victor
    firstInvalid.focus();
  }
});

fileInput.addEventListener("change", () => {
  fileName.textContent = fileInput.files[0].name;
});

document.querySelectorAll('input[type="date"]').forEach((input) => {
  input.max = today;
});
