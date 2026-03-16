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
    field.classList.remove("hasSuccess");
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

    if (field.value.trim() !== "") {
      field.classList.add("hasSuccess");
    } else {
      field.classList.remove("hasSuccess");
    }

    field.removeAttribute("aria-describedby");

    if (field.type === "radio") {
      if (field.closest(".optionalQuestion")) return true;
      if (field.closest(".nestedFieldset")) return true;
    } else {
      if (field.offsetParent === null) return true;
    }

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
  const invalidFields = [];

  const fields = input;
  fields.forEach((field) => {
    const fieldValid = validateField(field);

    if (!fieldValid) {
      isValid = false;

      if (
        field.type === "radio" &&
        field !== document.querySelector(`input[name="${field.name}"]`)
      ) {
        return;
      }
      // Hulp van claude met array method
      invalidFields.push(field);
    }
  });

  if (isValid) {
    hideErrorSummary();
    form.submit();
  } else {
    showErrorSummary(invalidFields);
  }
});

fileInput.addEventListener("change", () => {
  fileName.textContent = fileInput.files[0].name;
});

document.querySelectorAll('input[type="date"]').forEach((input) => {
  input.max = today;
});

function showErrorSummary(invalidFields) {
  const errorSummary = document.querySelector("#errorSummary");
  const errorSummaryList = document.querySelector("#errorSummaryList");

  errorSummaryList.innerHTML = "";

  invalidFields.forEach((field) => {
    const errorMessage =
      field.type === "radio"
        ? field.closest("fieldset").querySelector(".errorMessage")
        : field.nextElementSibling;

    const li = document.createElement("li");
    const link = document.createElement("a");

    link.href = `#${field.id}`;
    link.textContent = errorMessage.textContent;

    link.addEventListener("click", (e) => {
      e.preventDefault();
      field.focus();
    });

    li.appendChild(link);
    errorSummaryList.appendChild(li);
  });

  errorSummary.hidden = false;
  errorSummary.focus();
}

function hideErrorSummary() {
  const errorSummary = document.querySelector("#errorSummary");
  const errorSummaryList = document.querySelector("#errorSummaryList");

  errorSummary.hidden = true;
  errorSummaryList.innerHTML = "";
}

const groupInputs = document.querySelectorAll("#representativeGroup input");
groupInputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.value.length > 0) {
      groupInputs.forEach((other) => {
        if (other !== input) {
          other.disabled = true;
          other.required = false;
        } else {
          other.required = true;
        }
      });
    } else {
      groupInputs.forEach((other) => {
        other.disabled = false;
        other.required = false;
      });
    }
  });
});
