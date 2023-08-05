// Global variables
let dayBox = document.querySelector(".Weathers.row");
let WeatherDate; // Store weather data obtained from the API
const API_KEY = "eb316044db8b4031855123636230408";

// Arrays for converting day and month numbers to strings
const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Function to get weather data from the weather API
async function getWeatherDate(location = "cairo") {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=3&aqi=yes&alerts=no`
    );
    WeatherDate = await response.json();
    displayCurrentDay();
    displayFutureForecast();
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

// Function to display weather data of the current day
function displayCurrentDay() {
  dayBox.innerHTML = `
     <div class="col-lg-4">
       <div id="day1Box" class="rounded-3">
         <div class="weatherDate d-flex justify-content-between align-items-center px-4 py-3 rounded-3">
           <p class="day w-50 text-capitalize mb-0">${
             weekDays[
               new Date(WeatherDate.forecast.forecastday[0].date).getDay()
             ]
           }</p>
           <p class="date w-50 text-capitalize text-end mb-0">${new Date(
             WeatherDate.forecast.forecastday[0].date
           ).getDate()} ${
    months[new Date(WeatherDate.forecast.forecastday[0].date).getMonth()]
  }</p>
         </div>
         <div class="weatherInfo px-4 py-3">
           <p class="weatherLocation fw-medium fs-5 text-capitalize">${
             WeatherDate.location.name
           }, ${WeatherDate.location.region}, ${
    WeatherDate.location.country
  }</p>
           <div class="weatherForcast d-flex justify-content-between align-items-center">
             <p class="weatherDeg text-light fw-bolder mb-0 w-75">${
               WeatherDate.current.temp_c
             }&deg;C</p>
             <div class="weatherIcon w-25">
               <img src="${
                 WeatherDate.current.condition.icon
               }" alt="weather condition icon" class="sunImg w-100" />
             </div>
           </div>
           <p id="weatherDesc" class="text-capitalize fs-5">${
             WeatherDate.current.condition.text
           }</p>
           <div class="weatherIndications my-4 d-flex flex-wrap gap-3">
             <div class="weatherIndicator humadity me-3 text-capitalize">
               <img src="./imgs/icon-umberella.png" alt="umbrella" class="me-2" />
               <span>Humidity: ${WeatherDate.current.humidity}%</span>
             </div>
             <div class="weatherIndicator wind me-3">
               <img src="./imgs/icon-wind.png" alt="wind image" class="me-2" /><span>Wind: ${
                 WeatherDate.current.wind_kph
               }km/h</span>
             </div>
           </div>
         </div>
       </div>
     </div>
   `;
}

// Function to display future weather forecast
function displayFutureForecast() {
  for (let i = 1; i < 3; i++) {
    dayBox.innerHTML += `
       <div class="col-lg-4">
         <div id="futureForecast" class="child-${i} rounded-3">
           <div class="weatherDate px-4 py-3 rounded-3">
             <p class="tomorrow text-capitalize mb-0 text-center">${
               weekDays[
                 new Date(WeatherDate.forecast.forecastday[i].date).getDay()
               ]
             }</p>
           </div>
           <div class="day2Info px-4 py-3 d-flex justify-content-between align-items-center">
             <div class="w-100">
               <div class="d-flex justify-content-between align-items-center">
                 <div class="w-75 mb-5">
                   <p class="tomDegree text-light fw-bolder mb-0">${
                     WeatherDate.forecast.forecastday[i].day.maxtemp_c
                   }&deg;C</p>
                   <p class="tomInfo fs-5 mt-0 mb-3 ps-3">${
                     WeatherDate.forecast.forecastday[i].day.mintemp_c
                   }&deg;C</p>
                 </div>
                 <div class="w-25 weatherIcon">
                   <img src="${
                     WeatherDate.forecast.forecastday[i].day.condition.icon
                   }" alt="sun image" class="sunPhoto mb-2 w-100" />
                 </div>
               </div>
               <p class="tomDesc text-center text-capitalize fs-5">${
                 WeatherDate.forecast.forecastday[i].day.condition.text
               }</p>
               <div class="weatherIndicator my-4 text-center">
                 <img src="./imgs/icon-umberella.png" alt="umbrella" class="me-2 conditionIcon" />
                 <span class="text-capitalize">Humidity: ${
                   WeatherDate.forecast.forecastday[i].day.avghumidity
                 }%</span>
               </div>
             </div>
           </div>
         </div>
       </div>
     `;
  }
}

// Function to search for a city
let searchInput = document.querySelector(".searchField");
searchInput.addEventListener("keyup", searchCity);
document.querySelector(".searchBtn").addEventListener("click", searchCity);

// Function to search for a city and get weather data
function searchCity() {
  if (searchInput.value === "") {
    getCurrentWeather();
  } else if (searchInput.value !== "") {
    getWeatherDate(searchInput.value);
  }
}

// Function to get weather data of the user's current location
function getCurrentWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const location = [
        position.coords.latitude,
        position.coords.longitude,
      ].join(",");
      getWeatherDate(location);
    });
  }
}

// Function to display all data once the page loads
async function displayAllData() {
  // Display cairo as a default location until user responds to the location allowance message
  await getWeatherDate();
  // Get weather of the user's current location
  getCurrentWeather();
}

displayAllData();
