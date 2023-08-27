const apiKey = "35c459541569b4b932dc648f252275e9";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric`; 
//units=metric for precise temperature
//&q={cityName}
//&appid={apiKey}
//&lang={language}

let input = document.querySelector(".searchInput");
let weatherImage = document.querySelector(".weatherImage");
let temperature = document.querySelector(".temperature");
let cityName = document.querySelector(".cityName");
let wind = document.querySelector(".wind");
let humidity = document.querySelector(".humidity");
let weatherDescription = document.querySelector(".weather");

//Adding a click event to the button in order to call checkWeather function
document.querySelector('.button').addEventListener("click", () => {
    console.log(input.value);
    checkWeather();
});


//Requesting weather information using the api and passing data to the functions responsible for load the content
async function checkWeather(){
    let url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${encodeURI(input.value)}&lang=pt_br&appid=35c459541569b4b932dc648f252275e9`;
    let response = await fetch(url);
    var data = await response.json();
    console.log(data);  

    loadData(data);
    loadImage(data);
};


//Function responsible to load the correct local weather information
function loadData(data){
    temperature.innerHTML = `<h1>${Math.floor(data.main.temp)}°C</h1>`;
    cityName.innerHTML = `<h2>${data.name}</h2>`;
    wind.innerHTML = `<p>Vento: ${Math.floor(data.wind.speed*3.6)} km/h</p>`; //To convert wind speed from m/s to km/h
    humidity.innerHTML = `<p>Humidade: ${Math.floor(data.main.humidity)}%</p>`;

    WeatherDescription = capitalizeFirstLetter(data.weather[0].description);
    weatherDescription.innerHTML = `<p>${WeatherDescription}</p>`;
};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

//Function responsible to load the correct weather image
function loadImage(data){
    weatherImage.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
};


