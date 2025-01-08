document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector(".form-container");
  const mapContainer = document.querySelector(".map-container");

  // Set the map height equal to form height
  const setMapHeight = () => {
    const formHeight = contactForm.offsetHeight;
    mapContainer.style.height = `${formHeight}px`;
  };

  // Set the map height when the page loads
  setMapHeight();

  // Optional: Adjust height if window is resized
  window.addEventListener("resize", setMapHeight);

  // Handle form submission
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission until validation
    // Reset previous errors
    resetErrors();

    // Get form field values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();
    let isValid = true;

    // Validate form fields
    if (!name) {
      setError("name", "nameError", "Please enter your name.");
      isValid = false;
    }
    if (!email || !validateEmail(email)) {
      setError("email", "emailError", "Please enter a valid email address.");
      isValid = false;
    }
    if (!subject) {
      setError("subject", "subjectError", "Please enter a subject.");
      isValid = false;
    }
    if (!message) {
      setError("message", "messageError", "Please enter your message.");
      isValid = false;
    }

    // If form is valid, submit the form
    if (isValid) {
      contactForm.submit(); // Submit the form after validation
    }
  });

  // Reset error messages and input styles
  function resetErrors() {
    const fields = ["name", "email", "subject", "message"];
    fields.forEach((field) => {
      const input = document.getElementById(field);
      const error = document.getElementById(`${field}Error`);
      input.classList.remove("is-invalid");
      error.style.display = "none";
    });
  }

  // Set error message and display
  function setError(inputId, errorId, errorMessage) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    input.classList.add("is-invalid");
    error.textContent = errorMessage;
    error.style.display = "block"; // Show error
  }

  // Email validation function
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Show the toast if it exists in the URL fragment
  if (window.location.hash === "#submissionToast") {
    const toast = document.getElementById("submissionToast");
    const toastInstance = new bootstrap.Toast(toast);
    toastInstance.show();
  }
});
