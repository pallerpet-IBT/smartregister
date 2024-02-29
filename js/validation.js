(function () {
    'use strict';
    const forms = document.querySelectorAll('.requires-validation');
    Array.from(forms).forEach(function (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.remove('was-validated');
            updateSubmitButtonState(form);
        }, false);

        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function (event) {
                if(input.id === "message"){
                    if(input.value.length >= 20){
                        input.classList.remove('is-invalid');
                        input.classList.add('is-valid');
                    } else {
                        input.classList.remove('is-valid');
                        setProperWarningMessage(input);
                        input.classList.add('is-invalid');
                    }
                }
                else if (input.checkValidity() && input.value.length >= input['min'] ) {
                    input.classList.remove('is-invalid');
                    input.classList.add('is-valid');
                } else {
                    input.classList.remove('is-valid');
                    setProperWarningMessage(input);
                    input.classList.add('is-invalid');
                }
                updateSubmitButtonState(form);
            });

            input.addEventListener('blur', function (event) {
                if (!input.checkValidity()) {
                    input.classList.add('is-invalid');
                }
            });
        });
    });
})();

function updateSubmitButtonState(form) {
    const submitButton = form.querySelector('#submitButton');
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;
    inputs.forEach(input => {
        if (!input.checkValidity()) {
            isValid = false;
        }
    });
    submitButton.disabled = !isValid;
    if (isValid) {
        submitButton.classList.add('btn-success');
    } else {
        submitButton.classList.remove('btn-success');
    }
}

function setProperWarningMessage(input) {
    var errorMessage = "";
    switch(input.id) {
        case "userName":
            errorMessage = input.value === "" ? "Name is required!" : "Minimum length is 4 characters.";
            document.getElementById('userNameInvalid').innerHTML = errorMessage;
            break;
        case "company":
            errorMessage = input.value === "" ? "Company is required!" : "Minimum length is 4 characters.";
            document.getElementById('companyInvalid').innerHTML = errorMessage;
            break;
        case "userEmail":
            if (input.value === "") {
                errorMessage = "Email is required!";
            } else if (input.value.length < 8) {
                errorMessage = "Minimum length is 8 characters!";
            } else if (!input.value.includes("@")) {
                errorMessage = "The email does not contain the @ sign.";
            } else {
                errorMessage = "Invalid email";
            }
            document.getElementById('emailInvalid').innerHTML = errorMessage;
            break;
        case "message":
            errorMessage = input.value === "" ? "Message is required!" : "Minimum length of message is 20 characters.";
            document.getElementById('messageInvalid').innerHTML = errorMessage;
            break;
        default:
            break;
    }
}