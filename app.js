const baseurl="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const selector=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("button");
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");
const msg=document.querySelector(".msgconv p");
for(let select of selector){
    for(currcode in countryList){
        let newoption=document.createElement("option");
        newoption.innerText=currcode;
        newoption.value=currcode;
        select.append(newoption);
        if(select.name==="from" && currcode==="USD"){
            newoption.selected="select";
        }
        if(select.name==="to" && currcode==="INR"){
            newoption.selected="select";
        }
    }
    select.addEventListener("change",(evt)=>{
        flagupdate(evt.target);
    });
}
const flagupdate=(element)=>{
    let currcode=element.value;
    let countrycode=countryList[currcode];
    let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newsrc;
}
window.addEventListener("load",()=>{
    updateexchangerate();
})
btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateexchangerate();
})
const updateexchangerate= async ()=>{
    let amount=document.querySelector("input");
    let amtval=amount.value;
    if(amtval.value=="" || amtval<1){
        amtval=1;
        amount.value=1;
    }
    // console.log(fromcurr.value,tocurr.value);
    let newurl= `${baseurl}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
    let response=await fetch(newurl);
    let data=await response.json();
    let rate=data[tocurr.value.toLowerCase()];
    let finalamt=amtval*rate;
    msg.innerText = `${amtval} ${fromcurr.value} = ${finalamt} ${tocurr.value}`;
    
}