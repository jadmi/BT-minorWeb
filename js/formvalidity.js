const bsn = document.getElementById("bsnNumber");
const form = document.querySelector("form");

bsn.addEventListener("input", (event) => {
  if (bsn.validity.valueMissing) {
    bsn.setCustomValidity("Dit veld is verplicht!");
  } else if (bsn.validity.patternMismatch) {
    bsn.setCustomValidity("Dit veld moet 8 of 9 cijfers bevatten.");
  } else {
    bsn.setCustomValidity("");
  }
});

// form.addEventListener("submit", function (event) {
//   event.preventDefault();
//   console.log("Form wordt niet verzonden");
// });
