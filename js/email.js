
(function() {
    emailjs.init({
        publicKey: "8MIUeQwrJghC6u4Xl" //paller.peter
        //publicKey: "..." //IBT
    });
})();

window.onload = function() {
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();

        if(validateForm()) {
            var messageContainer = document.getElementById("emailResponseContainer");
            var message = document.getElementById("emailResponse");
            
            emailjs.sendForm('service_???', 'template_???', this) // paller.peter
            //emailjs.sendForm('service_9gwm38t', 'template_oun59fs', this) // IBT
            .then(() => {
                if (messageContainer && message){
                    message.innerHTML = "The message has been successfully sent.";
                    messageContainer.classList.add("alert-success");
                    messageContainer.classList.remove("hidden");
                    // setTimeout(function() {
                    //     messageContainer.classList.add("hidden");
                    // }, 5000);
                    this.reset();
                }
            }, (error) => {
                message.innerHTML = "The email sending failed. Please contact us at the provided email address.";
                messageContainer.classList.add("alert-danger");
                messageContainer.classList.remove("hidden");
            });
        }
    });
}

function validateForm() {
    var form = document.getElementById('contact-form');
    var inputs = form.querySelectorAll('input, textarea');
  
    var isValid = true;
  
    inputs.forEach(function(input) {
      var rule = input.getAttribute('data-rule');
      var msg = input.getAttribute('data-msg');
      var value = input.value.trim();
  
      if (rule === 'required' && value === '') {
        showError(input, msg);
        isValid = false;
      } else if (rule === 'email' && !validateEmail(value)) {
        showError(input, msg);
        isValid = false;
      } else if (rule.startsWith('minlen')  && value.length < parseInt(input.getAttribute('data-rule').split(':')[1], 10)) {
        showError(input, msg);
        isValid = false;
      } else {
        hideError(input);
      }
    });
  
    return isValid;
  }
  
  function showError(input, message) {
    var parent = input.parentElement;
    var validationMsg = parent.querySelector('.validation');
    validationMsg.innerHTML = message;
    validationMsg.style.display = 'block';
  }
  
  function hideError(input) {
    var parent = input.parentElement;
    var validationMsg = parent.querySelector('.validation');
    validationMsg.innerHTML = '';
    validationMsg.style.display = 'none';
  }
  
  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
