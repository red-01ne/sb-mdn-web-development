document.body.addEventListener("submit", e => e.preventDefault());

// *** disabled input constraint form ***

// wait for the page to finish loading
/*
document.addEventListener('DOMContentLoaded', function () {
    // attach `change` event listener to checkbox
    document.getElementById("disable_constraint_form_same_billing").addEventListener("change", toggleBilling);
}, false);
*/

const sameBillingCheckbox = document.getElementById("disable_constraint_form_same_billing");

sameBillingCheckbox.addEventListener("change", toggleBilling);

function toggleBilling() {
    // select the billing text fields
    const billingItems = document.querySelectorAll('#disable_constraint_form_billing input[type="text"]');
    // select the billing text labels
    const billingLabels = document.querySelectorAll('#disable_constraint_form_billing .billing-label');

    // toggle the billing text fields and labels
    for (let i = 0; i < billingItems.length; i++) {
        billingItems[i].disabled = !billingItems[i].disabled;

        if (billingLabels[i].getAttribute('class') === 'billing-label disabled-label') {
            billingLabels[i].setAttribute('class', 'billing-label');
        } else {
            billingLabels[i].setAttribute('class', 'billing-label disabled-label');
        }
    }
}
