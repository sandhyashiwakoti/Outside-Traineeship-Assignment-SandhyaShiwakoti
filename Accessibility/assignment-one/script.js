const form = document.querySelector(".contact-form");
const privacyCheckbox = document.getElementById("privacy-agree");
const privacyError = document.getElementById("privacy-error");

form.addEventListener("submit", function (e) {
  // stop form from submitting
  e.preventDefault();

  // hasError tracks if there are any errors
  let hasError = false;
  // check each required input
  const requiredInputs = [
    { id: "first-name", errorId: "first-name-error" },
    { id: "last-name", errorId: "last-name-error" },
    { id: "work-email", errorId: "work-email-error" },
    { id: "company", errorId: "company-error" },
    { id: "job-title", errorId: "job-title-error" },
  ];

  requiredInputs.forEach(function (field) {
    const input = document.getElementById(field.id);
    const error = document.getElementById(field.errorId);

    if (input.value === "") {
      // show error if field is empty
      error.style.display = "block";
      hasError = true;
    } else {
      // hide error if field has value
      error.style.display = "none";
    }
  });

  // check if privacy checkbox is checked
  // If not checked, show error message
  if (!privacyCheckbox.checked) {
    privacyError.style.display = "block";
    hasError = true;
  } else {
    privacyError.style.display = "none";
  }

  //   If no errors, show success message
  if (!hasError) {
    alert("Form submitted successfully!");
  }
});
