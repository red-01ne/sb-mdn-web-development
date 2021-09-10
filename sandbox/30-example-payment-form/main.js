const {forms} = document;

for (let i = 0; i < forms.length; i++) {
    forms[i].addEventListener("submit", e => {
        e.preventDefault();
    });
}
