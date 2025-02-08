const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies";

// for(currencyCode in countryList){
//     console.log(currencyCode +" "+ countryList[currencyCode]);
// }

const dropdowns=document.querySelectorAll(".dropdown select");
for(let select of dropdowns){
    for(currencyCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currencyCode;
        newOption.value=currencyCode;
        if(select.name==="from" && currencyCode==="USD"){
            newOption.selected="selected"
        }
        if(select.name==="to" && currencyCode==="INR"){
            newOption.selected="selected"
        }
        select.append(newOption);
    }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

//changing flags
const updateFlag=(element)=>{
    let currencyCode=element.value;
    let countryCode=countryList[currencyCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;

}

let btn=document.querySelector("form button");
let message=document.querySelector(".msg");

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let fromCurr=document.querySelector(".from select").value.toLowerCase();
    let toCurr=document.querySelector(".to select").value.toLowerCase();
    let amount=document.querySelector("form input");
    let amountVal=amount.value;
    if(amountVal==="" || amountVal<1){
        amountVal=1;
        amount.value="1";
        console.log(amountVal);
    }

    const URL=`${BASE_URL}/${fromCurr}.json`;
    // console.log(URL)
    let response=await fetch(URL);
    let data=await response.json();
    // console.log(data);
    // console.log(fromCurr,toCurr);
    // console.log(data[fromCurr][toCurr]);
    let toAmount=Math.floor(amountVal*data[fromCurr][toCurr]);
    message.innerHTML=`${amountVal} ${fromCurr.toUpperCase()} = ${toAmount} ${toCurr.toUpperCase()}`;

})

