// validation:
// Victor
// https://www.youtube.com/watch?v=h5qqmE83Tes

const form = document.querySelector("form");
const formGroup1 = document.querySelectorAll("[required]");
const fileInput = document.querySelector("#deed");
const fileName = document.querySelector("#fileName");

form.setAttribute("novalidate", true);

// https://stackoverflow.com/questions/574904/get-next-previous-element-using-javascript
function validateField(field) {
  const errorMessage =
    field.type === "radio"
      ? field.closest("fieldset").querySelector(".errorMessage")
      : field.nextElementSibling;

  if (!field.validity.valid) {
    if (field.validity.patternMismatch || field.type === "radio") {
      errorMessage.textContent = field.dataset.error;
    } else {
      errorMessage.textContent = "Dit veld is verplicht!";
    }
    return false;
  } else {
    console.log(field.name, errorMessage);

    errorMessage.textContent = "";
    return true;
  }
}

form.querySelectorAll("input").forEach((input) => {
  input.addEventListener("blur", () => {
    validateField(input);
  });
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let isValid = true;

  const fields = formGroup1;
  fields.forEach((field) => {
    const fieldValid = validateField(field);
    if (!fieldValid) {
      isValid = false;
    }
  });

  if (isValid) {
    form.reset();
  } else {
    form.querySelector(":invalid").focus();
  }
});

fileInput.addEventListener("change", () => {
  fileName.textContent = fileInput.files[0].name;
});

// bsn.addEventListener("input", (event) => {
//   if (bsn.validity.valueMissing) {
//     bsn.setCustomValidity("Dit veld is verplicht!");
//   } else if (bsn.validity.patternMismatch) {
//     bsn.setCustomValidity("Dit veld moet 8 of 9 cijfers bevatten.");
//   } else {
//     bsn.setCustomValidity("");
//   }
// });

// form.addEventListener("submit", function (event) {
//   event.preventDefault();
//   console.log("Form wordt niet verzonden");
// });
