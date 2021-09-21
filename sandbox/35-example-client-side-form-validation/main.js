document.body.addEventListener("submit", e => e.preventDefault());

// *** simple example of constraint validation API ***

const constraintValidationAPIFormEmail = document.getElementById("constraint_validation_api_form_mail");

constraintValidationAPIFormEmail.addEventListener("input", function (event) {
    const email = event.target;
    if (email.validity.typeMismatch) {
        email.setCustomValidity("I am expecting an e-mail address!");
    } else {
        email.setCustomValidity("");
    }
});

// *** extended example of constraint validation API ***
/*
there are many ways to pick a DOM node; here we get the form itself and the email input box,
as well as the span element into which we will place the error message.
*/
const extendedConstraintValidationAPIForm  = document.getElementById("extended_constraint_validation_api_form");

const extendedConstraintValidationAPIFormEmail = document.getElementById("extended_constraint_validation_api_form_email");
const extendedConstraintValidationAPIFormEmailError = document.querySelector("#extended_constraint_validation_api_form_email + span.error");

extendedConstraintValidationAPIFormEmail.addEventListener("input", function (event) {
    // each time the user types something, we check if the form fields are valid.
    if (extendedConstraintValidationAPIFormEmail.validity.valid) {
        // in case there is an error message visible, if the field is valid, we remove the error message.
        extendedConstraintValidationAPIFormEmailError.textContent = ""; // Reset the content of the message
        extendedConstraintValidationAPIFormEmailError.className = "error"; // Reset the visual state of the message
    } else {
        // if there is still an error, show the correct error
        showError();
    }
});

extendedConstraintValidationAPIForm.addEventListener("submit", function (event) {
    // if the email field is valid, we let the form submit
    if(!extendedConstraintValidationAPIFormEmail.validity.valid) {
        // if it isn't, we display an appropriate error message
        showError();
        // then we prevent the form from being sent by canceling the event
        event.preventDefault();
    }
});

function showError() {
    if(extendedConstraintValidationAPIFormEmail.validity.valueMissing) {
        // if the field is empty, display the following error message.
        extendedConstraintValidationAPIFormEmailError.textContent = "You need to enter an e-mail address.";
    } else if(extendedConstraintValidationAPIFormEmail.validity.typeMismatch) {
        // if the field doesn't contain an email address, display the following error message.
        extendedConstraintValidationAPIFormEmailError.textContent = "Entered value needs to be an e-mail address.";
    } else if(extendedConstraintValidationAPIFormEmail.validity.tooShort) {
        // if the data is too short, display the following error message.
        extendedConstraintValidationAPIFormEmailError.textContent = `Email should be at least ${ extendedConstraintValidationAPIFormEmail.minLength } characters; you entered ${ extendedConstraintValidationAPIFormEmail.value.length }.`;
    }
    // set the styling appropriately
    extendedConstraintValidationAPIFormEmailError.className = 'error active';
}

// *** example of form validation without usage of the constraint validation API ***

// there are fewer ways to pick a DOM node with legacy browsers
const withoutConstraintValidationAPIForm  = document.getElementById("without_constraint_validation_api_form");
const withoutConstraintValidationAPIFormEmail = document.getElementById("without_constraint_validation_api_form_email");

// the following is a trick to reach the next sibling element node in the DOM
// this is dangerous because you can easily build an infinite loop
// in modern browsers, you should prefer using element.nextElementSibling
let withoutConstraintValidationAPIFormError = withoutConstraintValidationAPIFormEmail;
do {
    withoutConstraintValidationAPIFormError = withoutConstraintValidationAPIFormError.nextSibling;
} while (withoutConstraintValidationAPIFormError.nodeType !== 1)

// as per the HTML5 specification
const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// many legacy browsers do not support the addEventListener method.
// here is a simple way to handle this; it's far from the only one.
function addEvent(element, event, callback) {
    let previousEventCallBack = element["on"+event];
    element["on"+event] = function (e) {
        let output = callback(e);

        // a callback that returns `false` stops the callback chain
        // and interrupts the execution of the event callback
        if (output === false) return false;

        if (typeof previousEventCallBack === "function") {
            output = previousEventCallBack(e);
            if (output === false) return false;
        }
    }
}

// now we can rebuild our validation constraint
// because we do not rely on CSS pseudo-class, we have to
// explicitly set the valid/invalid class on our email field
addEvent(window, "load", function () {
    // here, we test if the field is empty (remember, the field is not required)
    // if it is not, we check if its content is a well-formed e-mail address.
    const test = withoutConstraintValidationAPIFormEmail.value.length === 0
        || emailRegExp.test(withoutConstraintValidationAPIFormEmail.value);

    withoutConstraintValidationAPIFormEmail.className = test ? "email valid" : "email invalid";
});

// this defines what happens when the user types in the field
addEvent(withoutConstraintValidationAPIFormEmail, "input", function () {
    const test = withoutConstraintValidationAPIFormEmail.value.length === 0
        || emailRegExp.test(withoutConstraintValidationAPIFormEmail.value);
    if (test) {
        withoutConstraintValidationAPIFormEmail.className = "email valid";
        withoutConstraintValidationAPIFormError.textContent = "";
        withoutConstraintValidationAPIFormError.className = "error";
    } else {
        withoutConstraintValidationAPIFormEmail.className = "email invalid";
    }
});

// this defines what happens when the user tries to submit the data
addEvent(withoutConstraintValidationAPIForm, "submit", function () {
    const test = withoutConstraintValidationAPIFormEmail.value.length === 0
        || emailRegExp.test(withoutConstraintValidationAPIFormEmail.value);

    if (!test) {
        withoutConstraintValidationAPIFormEmail.className = "email invalid";
        withoutConstraintValidationAPIFormError.textContent = "I expect an e-mail, darling!";
        withoutConstraintValidationAPIFormError.className = "error active";

        // some legacy browsers do not support the event.preventDefault() method
        return false;
    } else {
        withoutConstraintValidationAPIFormEmail.className = "email valid";
        withoutConstraintValidationAPIFormError.textContent = "";
        withoutConstraintValidationAPIFormError.className = "error";
    }
});
