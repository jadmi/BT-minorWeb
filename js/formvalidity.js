// validation:
// Victor
// https://www.youtube.com/watch?v=h5qqmE83Tes

const form = document.querySelector("form");
const input = document.querySelectorAll("input");
const fileInput = document.querySelector("#deed");
const fileName = document.querySelector("#fileName");
const today = new Date().toISOString().split("T")[0];
const beneficiary = document.querySelector(".beneficiary");

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

const container = document.querySelector("#beneficiaryContainer");

container.addEventListener("click", function (event) {
  if (event.target.classList.contains("beneficiary")) {
    addBeneficiary();
  }
});

let beneficiaryCount = 1;
function addBeneficiary() {
  beneficiaryCount++;
  const html = `
    <div class="optionalQuestion">
      <fieldset class="nestedFieldset">
        <legend class="followUpQuestion">Voer de gegevens in van verkrijger ${beneficiaryCount}</legend>

        <p class="errorMessage" aria-live="polite" id="lastNameError${beneficiaryCount}"></p>

        <label for="bsnNumber${beneficiaryCount}">BSN of RSIN verkrijger </label>
        <input
          type="text"
          id="bsnNumber${beneficiaryCount}"
          name="bsnNummer${beneficiaryCount}"
          inputmode="numeric"
          minlength="8"
          maxlength="9"
          pattern="\\d{8,9}"
          required
          data-error="Vul een geldig BSN of RSIN in van 8 of 9 cijfers!"
        />
        <p class="errorMessage" aria-live="polite" id="bsnNumberError${beneficiaryCount}"></p>

        <label for="firstNameBeneficiary${beneficiaryCount}">Voorletter(s) </label>
        <input
          type="text"
          id="firstNameBeneficiary${beneficiaryCount}"
          name="voornaamNotaris${beneficiaryCount}"
          pattern="^[A-Za-z.]+$"
          data-error="Vul alleen letters in bij voorletters!"
        />

        <label for="prefixBeneficiary${beneficiaryCount}">Tussenvoegsel(s) </label>
        <input
          type="text"
          id="prefixBeneficiary${beneficiaryCount}"
          name="tussenvoegselVerkrijger${beneficiaryCount}"
        />

        <label for="lastNameBeneficiary${beneficiaryCount}">Achternaam</label>
        <input
          type="text"
          id="lastNameBeneficiary${beneficiaryCount}"
          name="achternaamVerkrijger${beneficiaryCount}"
          pattern="^[A-Za-z.]+$"
          data-error="Vul alleen letters in bij de achternaam van de verkrijger!"
        />

        <fieldset>
          <legend class="followUpQuestion">
            Krijgt deze verkrijger waarvoor u geen aangifte doet het hele vermogen?
          </legend>
          <label class="radioWrapper">
            <input type="radio" name="verkrijgerVraag1-${beneficiaryCount}" value="ja" />
            Ja
          </label>
          <label class="radioWrapper">
            <input type="radio" name="verkrijgerVraag1-${beneficiaryCount}" value="nee" />
            Nee
          </label>
        </fieldset>

        <fieldset class="lastFieldset">
          <legend class="followUpQuestion" >
            Doet deze verkrijger een beroep op diens wettelijke erfdeel?
          </legend>
          <label class="radioWrapper">
            <input type="radio" name="verkrijgerVraag2-${beneficiaryCount}" value="ja" />
            Ja
          </label>
          <label class="radioWrapper">
            <input type="radio" name="verkrijgerVraag2-${beneficiaryCount}" value="nee" />
            Nee
          </label>

        </fieldset>
      </fieldset>
    </div>
  `;

  container.insertAdjacentHTML("beforeend", html);

  const button = container.querySelector(".beneficiary");

  // Einde van formulier verkrijger pakken en daaronder de knop plaatsen
  const allQuestions = container.querySelectorAll(".optionalQuestion");
  const newestQuestion = allQuestions[allQuestions.length - 1];
  const newestLastFieldset = newestQuestion.querySelector(".lastFieldset");
  newestLastFieldset.appendChild(button);
}

document.querySelectorAll("input[type='radio']").forEach((radio) => {
  radio.addEventListener("change", (e) => {
    if (e.target.name === "verkrijger") {
      e.target
        .closest(".radioWrapper")
        .scrollIntoView({ behavior: "smooth", block: "nearest" });
      return;
    }

    const optionalQuestion =
      e.target.closest(".optionalChoice")?.nextElementSibling;

    const radioWrapper = e.target
      .closest(".radioWrapper")
      ?.parentElement?.querySelector(".fileLabel, .marriageDiv");

    const target = optionalQuestion || radioWrapper;

    if (target && target.style.display !== "none") {
      target.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });
});

document.querySelector(".beneficiary").addEventListener("click", () => {
  setTimeout(() => {
    const allBeneficiaries = document.querySelectorAll(".nestedFieldset");
    const last = allBeneficiaries[allBeneficiaries.length - 1];
    last.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 50);
});
