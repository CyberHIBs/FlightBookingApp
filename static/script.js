document.addEventListener("DOMContentLoaded", () => {
  // 🎯 Elements
  const bookingForm = document.querySelector(".booking-form form");
  const departureDate = document.getElementById("departure");
  const returnDate = document.getElementById("return");
  const fromSelect = document.getElementById("from");
  const toSelect = document.getElementById("to");
  const passengersSelect = document.getElementById("passengers");

  // ✅ Set minimum departure date to today
  const today = new Date().toISOString().split("T")[0];
  departureDate.setAttribute("min", today);
  returnDate.setAttribute("min", today);

  // 🔄 Update return date min dynamically
  departureDate.addEventListener("change", () => {
    returnDate.value = "";
    returnDate.setAttribute("min", departureDate.value);
  });

  // ✅ Fade-in form on load
  document.querySelector(".booking-form").classList.add("fade-in");

  // ✅ Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // ✅ Form Validation
  bookingForm.addEventListener("submit", function (e) {
    const fromCity = fromSelect.value;
    const toCity = toSelect.value;
    const departure = departureDate.value;
    const returnD = returnDate.value;
    const passengers = passengersSelect.value;

    let error = "";

    if (!fromCity || !toCity) {
      error = "Please select both departure and destination cities.";
    } else if (fromCity === toCity) {
      error = "Source and destination cannot be the same.";
    } else if (!departure) {
      error = "Please select a departure date.";
    } else if (returnD && returnD <= departure) {
      error = "Return date must be after the departure date.";
    } else if (!passengers || passengers < 1 || passengers > 9) {
      error = "Please select 1 to 9 passengers.";
    }

    if (error) {
      e.preventDefault();
      showAlert(error, "error");
    } else {
      showAlert("Searching flights...", "success");
    }
  });

  // ✅ Custom Alert Popup
  function showAlert(message, type) {
    const existingAlert = document.querySelector(".alert-popup");
    if (existingAlert) existingAlert.remove();

    const alert = document.createElement("div");
    alert.className = `alert-popup ${type}`;
    alert.setAttribute("role", "alert");
    alert.textContent = message;

    document.body.appendChild(alert);

    setTimeout(() => {
      alert.classList.add("visible");
      setTimeout(() => {
        alert.classList.remove("visible");
        setTimeout(() => alert.remove(), 400);
      }, 2500);
    }, 100);
  }
});
