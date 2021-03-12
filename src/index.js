let now = new Date();

let h4 = document.querySelector("h4");

let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
h4.innerHTML = `${day} ${hours}:${minutes} `;

function search(event) {
  event.preventDefault();
  let h2 = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  h2.innerHTML = cityInput.value;
  searchCity(cityInput.value);
}

function searchCity(city) {
  let units = "imperial";
  let apiKey = "a06569d1dceff8eaf6d3eaf85c4585eb";
  let apiURl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiURl).then(displayWeather);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function showCelsiusTemp(response) {
  let celsiusTemp = document.querySelector("#temp");
  celsiusTemp.innerHTML = Math.round(response.data.main.temp);
}
function convertToCelsius() {
  let cityInput = document.querySelector("#city");

  let city = cityInput.innerHTML;
  let units = "metric";
  let apiKey = "a06569d1dceff8eaf6d3eaf85c4585eb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showCelsiusTemp);
}
function showFahrenheitTemp(response) {
  let fahrenheitTemp = document.querySelector("#temp");
  fahrenheitTemp.innerHTML = Math.round(response.data.main.temp);
}
function convertToFahrenheit() {
  let cityInput = document.querySelector("#city");

  let city = cityInput.innerHTML;
  let units = "imperial";
  let apiKey = "a06569d1dceff8eaf6d3eaf85c4585eb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showFahrenheitTemp);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function displayWeather(response) {
  console.log(response);
  console.log(response.data.name);
  console.log(response.data.main.temp);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function showPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(displayPosition);
}

function displayPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "imperial";
  let apiKey = `a06569d1dceff8eaf6d3eaf85c4585eb`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

