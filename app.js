const CURRENCY_URL = "https://2024-03-06.currency-api.pages.dev/v1/currencies/eur.json";

const dropdowns = document.querySelectorAll(".dropdown-box select");
const fromCurn = document.querySelector(".from select");
const toCurn = document.querySelector(".to select");
const result = document.querySelector(".result")
const btn = document.querySelector(".form-btn")


for(select of dropdowns){
    for( currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected"
        }else if(select.name === "to" && currCode === "BDT"){
            newOption.selected = "selected"
        }
        select.append(newOption);
    }
    select.addEventListener("change", (e) => {
        changeFlag(e.target);
    });
}

const exchangeRate =async ()=>{
    let amount = document.querySelector(".input")
    let amoVal = amount.value;
    if( amoVal === "" || amoVal < 1 ){
        amoVal = 1;
        amoVal.value = "1";
    }
    const URL = `${CURRENCY_URL}/${fromCurn.value.toLowerCase()}/${toCurn.value.toLowerCase().json}`
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data [toCurn.value.toLowerCase()];

    const ultimateRate = amoVal*rate
    result.innerText = `${amoVal} ${fromCurn} = ${ultimateRate} ${toCurn}`
}

const changeFlag = (element)=>{
   let currCode = element.value;
   let countryCode = countryList[currCode];
   let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
   let img = element.parentElement.querySelector("img");
    img.src = newsrc;
}
btn.addEventListener("click", (e)=>{
    e.preventDefault()
    exchangeRate()
})
window.addEventListener("load", () => {
    exchangeRate();
  });