document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("taxForm");
  const modal = document.getElementById("modal");
  const closeBtn = document.getElementsByClassName("close")[0];

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (validateForm()) {
      showModal(calculateTax());
    }
  });

  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  function validateForm() {
    let valid = true;
    const inputs = document.querySelectorAll('input[type="number"], select');
    inputs.forEach((input) => {
      const errorSpan = input.nextElementSibling;
      if (!input.value) {
        errorSpan.style.display = "inline";
        valid = false;
      } else {
        errorSpan.style.display = "none";
      }
    });
    return valid;
  }

  function calculateTax() {
    const age = document.getElementById("age").value;
    const income = parseFloat(document.getElementById("income").value);
    const extraIncome = parseFloat(
      document.getElementById("extraIncome").value
    );
    const deductions = parseFloat(document.getElementById("deductions").value);

    let tax = 0;
    if (income + extraIncome - deductions > 800000) {
      if (age === "<40") {
        tax = 0.3 * (income + extraIncome - deductions - 800000);
      } else if (age === ">=40 <60") {
        tax = 0.4 * (income + extraIncome - deductions - 800000);
      } else if (age === ">=60") {
        tax = 0.1 * (income + extraIncome - deductions - 800000);
      }
    }
    return tax.toFixed(2);
  }

  function showModal(tax) {
    const resultElement = document.getElementById("result");
    resultElement.textContent = `Tax to be paid: ₹${tax}`;
    modal.style.display = "block";
  }
});
