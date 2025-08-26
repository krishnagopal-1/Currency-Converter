const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("#btn");
const fromCurrancy = document.querySelector(".from select");
const toCurrancy = document.querySelector(".to select");
const result = document.querySelector(".result");

const updateFlag = (element) => {
    let currencyCode = element.value;
    let countryCode = countryList[currencyCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

const exchangeRate = async () => {
    let amount = document.querySelector("form input");
    let amtValue = amount.value;
    if (amtValue === "" || amtValue < 1) {
        amtValue = 1;
        amount.value = "1";
    };

    const URL = `${BASE_URL}/${fromCurrancy.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurrancy.value.toLowerCase()][toCurrancy.value.toLowerCase()];

    let finalAmount = amtValue * rate;
    result.innerText = `${amtValue} ${fromCurrancy.value} = ${finalAmount} ${toCurrancy.value}`;
};

for (let select of dropdown) {
    for (let currencyCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currencyCode;
        newOption.value = currencyCode;
        if (select.name === "from" && currencyCode === "USD") {
            newOption.selected = true;
        } else if (select.name === "to" && currencyCode === "INR") {
            newOption.selected = true;
        };
        select.append(newOption);
    };

    select.addEventListener("change", (evnt) => {
        updateFlag(evnt.target);
    })
};

btn.addEventListener("click", (evnt) => {
    evnt.preventDefault();
    exchangeRate();
});

window.addEventListener("load", () => {
    exchangeRate();
});