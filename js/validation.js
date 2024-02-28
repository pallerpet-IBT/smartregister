(function () {
    'use strict';
    const forms = document.querySelectorAll('.requires-validation');
    Array.from(forms).forEach(function (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);

        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function (event) {
                //console.log('input', input, 'input.value', input.value);
                if(input.id === "message"){
                    //console.log('input.value.lenth', input.value.length);
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
            });

            input.addEventListener('blur', function (event) {
                if (!input.checkValidity()) {
                    input.classList.add('is-invalid');
                }
            });
        });
    });
})();

function setProperWarningMessage(input){
    //console.log('input', input, input.id);

    if(input.id === "userName"){
        document.getElementById('userNameInvalid').innerHTML = input.value == 0 ? "Name is required!" : "Minimum length is 4 character."
    }
    if(input.id === "company"){
        document.getElementById('companyInvalid').innerHTML = input.value == 0 ? "Company is required!" : "Minimum length is 4 character."
    }
    if(input.id === "userEmail"){
        if(input.value == 0){
            document.getElementById('emailInvalid').innerHTML = "Email is required!"
        } 
        else if(input.value < 8){
            document.getElementById('emailInvalid').innerHTML = "Minimum length is 8 character!"
        }
        else if(!input.value.includes("@")){
            document.getElementById('emailInvalid').innerHTML = "The email does not contain the @ sign."
        }
        else{
            document.getElementById('emailInvalid').innerHTML = "Invalid email"
        }
    }
    if(input.id === "message"){
    document.getElementById('messageInvalid').innerHTML = input.value == 0 ? "Message is required!" : "Minimum length of message is 20 character."
    }
}