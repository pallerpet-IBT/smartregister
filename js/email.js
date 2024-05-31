(function () {
  emailjs.init({
    publicKey: "8MIUeQwrJghC6u4Xl", //paller.peter
    //publicKey: "..." //IBT
  });
})();

window.onload = function () {
  document
    .getElementById("contact-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      if (validateForm()) {
        var messageContainer = document.getElementById(
          "emailResponseContainer"
        );
        var message = document.getElementById("emailResponse");

        emailjs
          .sendForm("service_uiedg7x", "template_o1jsn3m", this) // paller.peter
          //emailjs.sendForm('service_???', 'template_???', this) // IBT
          .then(
            () => {
              if (messageContainer && message) {
                message.innerHTML = "The message has been successfully sent.";
                messageContainer.classList.add("alert-success");
                messageContainer.classList.remove("hidden");
                setTimeout(function () {
                  messageContainer.style.display = "none";
                  console.log("messageContainer is hidden", messageContainer);
                }, 4000);
                this.reset();
                console.log("email sent!");
                document
                  .getElementById("contact-form")
                  .classList.remove("was-validated");
                reloadForm();
              }
            },
            (error) => {
              message.innerHTML =
                "The email sending failed. Please contact us at the provided email address.";
              messageContainer.classList.add("alert-danger");
              messageContainer.classList.remove("hidden");
            }
          );
      }
    });
};

function validateForm() {
  var form = document.getElementById("contact-form");
  var inputs = form.querySelectorAll("input, textarea");

  var isValid = true;

  inputs.forEach(function (input) {
    var rule = input.getAttribute("data-rule");
    var value = input.value.trim();

    if (rule === "required" && value === "") {
      isValid = false;
    } else if (rule === "email" && !validateEmail(value)) {
      isValid = false;
    } else if (
      rule.startsWith("minlen") &&
      value.length < parseInt(input.getAttribute("data-rule").split(":")[1], 10)
    ) {
      isValid = false;
    }
  });

  return isValid;
}

function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function reloadForm() {
  var form = document.getElementById("contact-form");
  var inputs = form.querySelectorAll("input, textarea, button");

  inputs.forEach(function (input) {
    input.classList.remove("is-valid", "is-invalid");
  });
}
