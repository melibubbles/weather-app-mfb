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
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return months[month];
}

function formatDayNumber(timestamp) {
  let date = new Date(timestamp * 1000);
  let dayNumber = date.getDate();

  return dayNumber;
}

function showTodayForecast(response) {
  let todayForecast = response.data.daily[0];
  let forecastElement = document.querySelector("#weather-forecast");
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
                    ${Math.round(todayForecast.temp.morn)}°C
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
                    ${Math.round(todayForecast.temp.day)}°C
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
                    ${Math.round(todayForecast.temp.eve)}°C
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
                    ${Math.round(todayForecast.temp.night)}°C
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

  forecastElement.innerHTML = forecastHTML;
}

function showTomorrowForecast(response) {
  let tomorrowForecast = response.data.daily[1];
  let forecastElement = document.querySelector("#weather-forecast");
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
                    ${Math.round(tomorrowForecast.temp.morn)}°C
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
                    ${Math.round(tomorrowForecast.temp.day)}°C
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
                    ${Math.round(tomorrowForecast.temp.eve)}°C
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
                    ${Math.round(tomorrowForecast.temp.night)}°C
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

  forecastElement.innerHTML = forecastHTML;
}

function showFiveDayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `
      <div class="row">
        <div class="card-group">
    `;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col">
        <div class="card text-center">
          <div class="card-body">
            <div class="card-title">
              <div class="day-week">
                ${formatDay(forecastDay.dt)}
              </div>
              <div class="month-day">
                ${formatMonth(forecastDay.dt)} ${formatDayNumber(
          forecastDay.dt
        )}
              </div>
              <div class="forecast-icon">
                <img src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" alt="" width="45">
              </div>
              <div class="max-temp">
                ${Math.round(forecastDay.temp.max)}°C
              </div>
              <div class="min-temp">
                <small>${Math.round(forecastDay.temp.min)}°C</small>
              </div>          
            </div>
          </div>
        </div>
      </div>
    `;
    }
  });

  forecastHTML =
    forecastHTML +
    `
      </div>
        </div>
    `;
  forecastElement.innerHTML = forecastHTML;
}

function activateTodayForecastButton(event) {
  event.preventDefault();
  tomorrowForecastButton.classList.remove("active");
  fiveDayForecastButton.classList.remove("active");
  todayForecastButton.classList.add("active");

  let apiKey = "9b38a1b5ab26f73e5bf09125bd340224";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTodayForecast);
}

function activateTomorrowForecastButton(event) {
  event.preventDefault();
  todayForecastButton.classList.remove("active");
  fiveDayForecastButton.classList.remove("active");
  tomorrowForecastButton.classList.add("active");

  let apiKey = "9b38a1b5ab26f73e5bf09125bd340224";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTomorrowForecast);
}

function activateFiveDayForecastButton(event) {
  event.preventDefault();
  todayForecastButton.classList.remove("active");
  tomorrowForecastButton.classList.remove("active");
  fiveDayForecastButton.classList.add("active");

  let apiKey = "9b38a1b5ab26f73e5bf09125bd340224";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showFiveDayForecast);
}

function getForecast(coordinates) {
  let apiKey = "9b38a1b5ab26f73e5bf09125bd340224";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTodayForecast);
}

function showWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;
  latitude = response.data.coord.lat;
  longitude = response.data.coord.lon;

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

let latitude = null;
let longitude = null;

let cityForm = document.querySelector("#search-form");
cityForm.addEventListener("submit", handleSubmit);

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", getCurrentLocation);

let todayForecastButton = document.querySelector("#today-button");
todayForecastButton.addEventListener("click", activateTodayForecastButton);

let tomorrowForecastButton = document.querySelector("#tomorrow-button");
tomorrowForecastButton.addEventListener(
  "click",
  activateTomorrowForecastButton
);

let fiveDayForecastButton = document.querySelector("#five-days-button");
fiveDayForecastButton.addEventListener("click", activateFiveDayForecastButton);

searchCity("Tokyo");
