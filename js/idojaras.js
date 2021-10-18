
let data = { "weathers" : [
    { "daynumber": 0,
    "temperature":-11.2},  { "daynumber": 1,
    "temperature":14.4},  { "daynumber": 2,
    "temperature":18.0},  { "daynumber": 3,
    "temperature":17.3},  { "daynumber": 4,
    "temperature":21.7},  { "daynumber": 5,
    "temperature":19.5},  { "daynumber": 6,
    "temperature":28.2}],
 "offerss" : [
    {"upperLimit":0,
    "offerMessage": "Ma forró csokit is árusítunk!"},
    {"upperLimit":15,
    "offerMessage":  "Melegedj át egy teával nálunk!"},
    {"upperLimit":20,
    "offerMessage":"Ma finom sütivel várunk!"},
    {"upperLimit":25,
    "offerMessage":"Ma fagyit is kínálunk!"},
    {"upperLimit":50,
    "offerMessage":"Hűsítsd le magad egy jéghideg limonádéval!"}
]}

let unit = document.querySelector("form").unit;


function toFahrenheit (temp){
        return 1.8*temp + 32;
    }


function WriteWeather() {
    const day = document.querySelector("#day").value;
    const weatherDiv = document.querySelector("#weather");
    const temperature = findWeather(day).temperature;
    const message = findOffer(temperature);
    weatherDiv.innerHTML = unit.value == "celsius" ? temperature + "°C" : toFahrenheit(temperature).toFixed(2) + "°F";
    weatherDiv.innerHTML += '<br><span class="offer" title="Mai különleges ajánlatunk.">' + message + '</span>';
    maxTemp();
    minTemp();
    averageTemp();
};



function findWeather (day){
    for (let weather of data.weathers){
        if (weather.daynumber == day){
            return weather;
        }
    }
};

function findOffer (temperature){
    for (let offer of data.offerss){
        if (temperature<= offer.upperLimit){
            return offer.offerMessage;
        }
    }
};

function maxTemp(){
    let maxTemp = data.weathers.length != 0 ? data.weathers[0].temperature : 0;
    let maxTempSpan = document.querySelector("#maxTemp");
    for (let i = 0; i < data.weathers.length; i++) {
        if (data.weathers[i].temperature > maxTemp) {
            maxTemp = data.weathers[i].temperature;
        };   
    }
    maxTempSpan.innerHTML = unit.value == "celsius" ? maxTemp : toFahrenheit(maxTemp).toFixed(2) ;
}

function minTemp(){
    let minTemp = data.weathers.length != 0 ? data.weathers[0].temperature : 0;
    let minTempSpan = document.querySelector("#minTemp");
    for (let i = 0; i < data.weathers.length; i++) {
        if (data.weathers[i].temperature < minTemp) {
            minTemp = data.weathers[i].temperature;
        };
        
    }
    minTempSpan.innerHTML = unit.value == "celsius" ? minTemp : toFahrenheit(minTemp).toFixed(2) ;
}

function averageTemp(){
    let sumTemp = 0;
    let averageTemp = document.querySelector("#averageTemp");
    for (let i = 0; i < data.weathers.length; i++) {
        sumTemp += data.weathers[i].temperature;
    }
    averageTemp.innerHTML = unit.value == "celsius" ? 
        (sumTemp / data.weathers.length).toFixed(2) : toFahrenheit(sumTemp / data.weathers.length).toFixed(2) ;
}




function adder() {
    const adderDiv = document.querySelector ("#adder");
    for (i = 1; i < 101; i++) {
        adderDiv.innerHTML += i % 11 == 0 ? ", <strong>" + i : ", " + i;
        adderDiv.innerHTML += i % 10 == 0 ? "<br>" : "";
    }
}