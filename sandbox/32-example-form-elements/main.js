const {forms} = document;
const formsArr = Array.from(forms);

const newLineChar = String.fromCodePoint(0x0A);
const formOutputOnInputName = "form_output_on_input";
const formOutputOnSubmitName = "form_output_on_submit";
const formOutputOnInputDefaultValue = `ON FORM INPUT${newLineChar}`;
const formOutputOnSubmitDefaultValue = `ON FORM SUBMIT${newLineChar}`;

formsArr.forEach(form => {
    const {id: formId} = form;
    const formContainer = form.parentElement;
    const formOutputOnInput = document.createElement("output");
    const formOutputOnSubmit = document.createElement("output");

    formOutputOnInput.setAttribute("name", formOutputOnInputName);
    formOutputOnInput.defaultValue = formOutputOnInputDefaultValue;

    formOutputOnSubmit.setAttribute("name", formOutputOnSubmitName);
    formOutputOnSubmit.defaultValue = formOutputOnSubmitDefaultValue;

    [formOutputOnInput, formOutputOnSubmit].forEach(formOutput => {
        // inputs which data will be sent on form submission and also have id attribute
        const validInputs = Array.from(form.elements).filter(elem => elem.tagName !== "output" && elem.id);

        if (validInputs.length) formOutput.setAttribute("for", validInputs.map(elem => elem.id).join(" "));
        formOutput.setAttribute("form", formId);

        formContainer.append(formOutput);
    });
});

document.body.addEventListener("input", e => {
    const {target: formElement} = e;
    const {form} = formElement;
    const newLineChar = String.fromCodePoint(0x0A);

    form[formOutputOnInputName].value = form[formOutputOnInputName].defaultValue;
    form[formOutputOnInputName].value += `Type: ${formElement.type}${newLineChar}`;
    form[formOutputOnInputName].value += `Name: ${formElement.name}${newLineChar}`;
    form[formOutputOnInputName].value += `Value: ${formElement.value}${newLineChar}`;
    if (formElement.type === "checkbox" || formElement.type === "radio") form[formOutputOnInputName].value += `Checked: ${formElement.checked}${newLineChar}`;
});

document.body.addEventListener("submit", e => {
    const {target: form} = e;
    const formData = new FormData(form);

    form[formOutputOnSubmitName].value = form[formOutputOnSubmitName].defaultValue;

    for ([name, value] of formData.entries()){
        form[formOutputOnSubmitName].value += `${name}: ${value}${newLineChar}`;
    }

    e.preventDefault();
});
