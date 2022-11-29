console.log("Hello console!")
function calcAmount() {
    let price = 1000;
    let amountInput = document.querySelector("input[name = 'amount-input']");
    let amountNumber = parseInt(amountInput.value);
    amountNumber = isNaN(amountNumber) ? 0 : amountNumber;

    showSumPrice(price, amountNumber);
}
function showSumPrice(price = 1000, amountNumber = 1) {
    amountNumber = amountNumber || 0
    let showAmount = document.querySelector("span.show-amount");
    if (amountNumber > 10) {
        alert("Maximum 10 terméket vásárolhat!");
        return;
    } else if (amountNumber < 1) {
        alert("Minimum 1 terméket kell vásárolnia.");
    } else {
        let amount = amountNumber * price;
        showAmount.innerHTML = amount;
    }

}

let sendButton = document.querySelector("form .btn.btn-primary");
/* sendButton.onclick = function () {
    alert("Hello JS!!")
}*/

sendButton.addEventListener("click", calcAmount);

window.addEventListener("resize", function () {
    console.log(this.innerHeight, this.innerWidth);
})

let orderForm = document.querySelector("#orderForm");
orderForm.addEventListener("submit", function (ev) {
    // ev.preventDefault();
    let inputs = this.querySelectorAll("input");
    let values = {};
    for (let i = 0; i < inputs.length; i++) {
        values[inputs[i].name] = inputs[i].value;
    }
    console.log(values);
})


// Időjárás


// Add child element.
let helpText = document.createElement("small");
helpText.className = "form-text text-muted";
helpText.innerHTML = "Adja meg a feltéteket!";

let parent = document.querySelector("div.row .col-sm-6");
parent.appendChild(helpText);

// Parent element kezelése.
let alertCloseButtons = document.querySelectorAll(".btn-close[data-bs-dismiss='alert']");
let alertCloseEvent = function (ev) {
    this.parentElement.style.display = "none";
}
for (let i = 0; i < alertCloseButtons.length; i++) {
    alertCloseButtons[i].addEventListener("click", alertCloseEvent);
}

// Select elem kitöltése.
let toppings = [
    "Szalonna",
    "Hagyma",
    "Tükörtojás",
    "Libamáj",
    "Extra sonka"
];

let toppingSelect = document.querySelector("#topInput");
let index = 0;
while (index < toppings.length) {
    let option = document.createElement("option");
    option.value = index;
    option.innerHTML = toppings[index];
    toppingSelect.appendChild(option);
    index++;
}
