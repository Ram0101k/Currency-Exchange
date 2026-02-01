const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");
for (code in countryList) {
    console.log(code,countryList[code]);
}
let i=0;
for(let select of dropdowns) {
    for(curcode in countryList) {
        let newoption=document.createElement("option");
        newoption.innerText=curcode;
        newoption.value=curcode;
        if(select.name==="from" && curcode==="USD") {
            newoption.selected="selected";
        } else if(select.name==="to" && curcode==="INR") {
            newoption.selected="selected";
        }
        select.append(newoption);
    }
    select.addEventListener("change",(event)=> {
        updtflag(event.target);
    });
}

const updtExchRate= async()=> {
    let amt=document.querySelector(".amount input");
    console.log(amt);   
    let amtvalue=amt.value;
    if(amtvalue==="" || amtvalue<1) {
        amtvalue=1;
        amt.value=1;
    }
    console.log(amtvalue);
    console.log(`From currency ${fromcurr.value} to currency ${tocurr.value}`);
    const url=`${BASE_URL}/${fromcurr.value.toLowerCase()}.min.json`;
    let response=await fetch(url);
   // console.log(response);
    let data=await response.json();
    //console.log(data);
    let rate=data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
    console.log(rate);
    let finalamt=amtvalue*rate;
    console.log(finalamt);
    msg.innerText=`${amtvalue} ${fromcurr.value} = ${finalamt} ${tocurr.value}`;
};
const updtflag=(element)=> {
   let curcode=element.value;
   console.log(`curcode = ${curcode}`);
   let cntrycode=countryList[curcode];
   console.log(`Country Code= ${cntrycode}`);
   let newsrc=`https://flagsapi.com/${cntrycode}/flat/64.png`;
   let img=element.parentElement.querySelector("img");
   img.src=newsrc;
}
btn.addEventListener("click",(event)=>{
    event.preventDefault();
    updtExchRate();
});

window.addEventListener("load",()=>{
    updtExchRate();
});

