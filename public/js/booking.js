document.addEventListener("DOMContentLoaded", () => {
  const bookingForm = document.getElementById("bookingForm");
  flatpickr("#checkin", {
    minDate: "today",
    dateFormat: "Y-m-d",
    onChange: function (selectedDates, dateStr) {
      flatpickr("#checkout", {
        minDate: dateStr,
        dateFormat: "Y-m-d",
      });
    },
  });

  flatpickr("#checkout", {
    minDate: "today",
    dateFormat: "Y-m-d",
  });

  function showToast() {
    const toast = document.getElementById("submissionToast");
    toast.style.display = "block";
    toast.classList.add("show");

    setTimeout(() => {
      hideToast();
    }, 5000);
  }

  function hideToast() {
    const toast = document.getElementById("submissionToast");
    toast.style.display = "none";
    toast.classList.remove("show");
  }

  function resetErrors() {
    const fields = [
      "name",
      "email",
      "checkin",
      "checkout",
      "select1",
      "select2",
      "select3",
      "message",
    ];
    fields.forEach((field) => {
      const input = document.getElementById(field);
      const error = document.getElementById(`${field}Error`);
      if (input) input.classList.remove("is-invalid");
      if (error) error.style.display = "none";
    });
  }

  function setError(inputId, errorId, errorMessage) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    if (input) input.classList.add("is-invalid");
    if (error) {
      error.textContent = errorMessage;
      error.style.display = "block";
    }
  }

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  function validateDates() {
    const checkin = document.getElementById("checkin").value;
    const checkout = document.getElementById("checkout").value;

    if (!checkin || !checkout) {
      return false;
    }

    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);

    if (checkoutDate <= checkinDate) {
      return false;
    }

    return true;
  }

  bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();
    resetErrors();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const checkin = document.getElementById("checkin").value.trim();
    const checkout = document.getElementById("checkout").value.trim();
    const adult = document.getElementById("select1").value.trim();
    const child = document.getElementById("select2").value.trim();
    const room = document.getElementById("select3").value.trim();
    const message = document.getElementById("message").value.trim();

    let isValid = true;
    if (!name) {
      setError("name", "nameError", "Please enter your name.");
      isValid = false;
    }

    if (!email || !validateEmail(email)) {
      setError("email", "emailError", "Please enter a valid email address.");
      isValid = false;
    }

    if (!checkin) {
      setError("checkin", "checkinError", "Please select your check-in date.");
      isValid = false;
    }

    if (!checkout || !validateDates()) {
      setError(
        "checkout",
        "checkoutError",
        "Please select a valid check-out date."
      );
      isValid = false;
    }

    if (!adult) {
      setError(
        "select1",
        "select1Error",
        "Please select the number of adults."
      );
      isValid = false;
    }

    if (!child) {
      setError(
        "select2",
        "select2Error",
        "Please select the number of children."
      );
      isValid = false;
    }

    if (!room) {
      setError("select3", "select3Error", "Please select a room.");
      isValid = false;
    }

    if (isValid) {
      showToast();
      setTimeout(() => {
        bookingForm.submit();
        bookingForm.reset();
        bookingForm.classList.remove("was-validated");

        const checkoutInput = document.getElementById("checkout");
        const checkoutError = document.getElementById("checkoutError");

        checkoutInput.classList.remove("is-invalid");
        checkoutError.style.display = "none";
      }, 500);
    }
  });
});
