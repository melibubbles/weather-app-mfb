function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
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
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function formatMonth(timestamp) {
  let date = new Date(timestamp * 1000);
  let month = date.getMonth();
  let months = [
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

  return months[month];
}

function formatDayNumber(timestamp) {
  let date = new Date(timestamp * 1000);
  let dayNumber = date.getDate();

  return dayNumber;
}

function showForecast(response) {
  let tomorrowDate = document.querySelector("#tomorrow-date");
  let forecastElement = document.querySelector("#tomorrow-forecast");
  let forecastHTML = `
      <div class="row">
        <div class="card-group">
          <div class="col-3">
            <div class="card text-center">
              <div class="card-body">
                <div class="card-title">
                  <div class="time-of-day">
                    Morning
                  </div>
                  <div class="time-temp">
                    ${Math.round(response.data.daily[1].temp.morn)}°C
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-3">
            <div class="card text-center">
              <div class="card-body">
                <div class="card-title">
                  <div class="time-of-day">
                    Afternoon
                  </div>
                  <div class="time-temp">
                    ${Math.round(response.data.daily[1].temp.day)}°C
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-3">
            <div class="card text-center">
              <div class="card-body">
                <div class="card-title">
                  <div class="time-of-day">
                    Evening
                  </div>
                  <div class="time-temp">
                    ${Math.round(response.data.daily[1].temp.eve)}°C
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-3">
            <div class="card text-center">
              <div class="card-body">
                <div class="card-title">
                  <div class="time-of-day">
                    Night
                  </div>
                  <div class="time-temp">
                    ${Math.round(response.data.daily[1].temp.night)}°C
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

  console.log(response.data.daily[1]);

  tomorrowDate.innerHTML = `${formatMonth(
    response.data.daily[1].dt
  )} ${formatDayNumber(response.data.daily[1].dt)}`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "9b38a1b5ab26f73e5bf09125bd340224";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function showWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  console.log(response.data);

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "9b38a1b5ab26f73e5bf09125bd340224";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  searchCity(cityInputElement.value);
}

function searchLocation(position) {
  let apiKey = "9b38a1b5ab26f73e5bf09125bd340224";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let cityForm = document.querySelector("#search-form");
cityForm.addEventListener("submit", handleSubmit);

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", getCurrentLocation);

searchCity("Tokyo");
