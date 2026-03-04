// validation:
// Victor
// https://www.youtube.com/watch?v=h5qqmE83Tes

const form = document.querySelector("form");
const formGroup1 = document.querySelectorAll(".personInfo input");

form.setAttribute("novalidate", true);

function validateField(field) {
  if (!field.validity.valid) {
    console.log("field is invalid");
    return false;
  } else {
    return true;
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let isValid = true;

  const fields = formGroup1;
  fields.forEach((field) => {
    console.log(`Checking ${field.name}`);
    const fieldValid = validateField(field);
    if (!fieldValid) {
      isValid = false;
    } else {
      console.log("valide veld");
    }
  });

  if (isValid) {
    console.log("submitting");
  } else {
    console.log("error");
  }
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
