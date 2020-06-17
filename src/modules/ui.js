export default class UI {
  constructor() {
    // dom elements
    this.temperatureDegree = document.querySelector(
      '.weather-today_temperature'
    );
    this.celsiumBtn = document.querySelector('.temp__celsBtn');
    this.city = document.querySelector('.city-name');
    this.currentDate = document.querySelector('.current-date');
    this.weatherIcon = document.querySelector('.weather-icon');
    this.summary = document.querySelector('.summary');
    this.windSpeed = document.querySelector('.wind-speed');
    this.tempApparent = document.querySelector('.temp-apparent');
    this.humidity = document.querySelector('.humidity');
    this.forecastDay = document.querySelectorAll('.forecast-day');
    this.forecastTemp = document.querySelectorAll('.forecast-temp');
    this.forecastIcon = document.querySelectorAll('.forecast-icon');
    this.searchButton = document.querySelector('.search-button');
    this.latitude = document.querySelector('.latitude');
    this.longitude = document.querySelector('.longitude');
    this.weatherIconUrl = `https://www.weatherbit.io/static/img/icons/`;
  }

  // render data
  async renderWeather(weatherData, lang) {
    console.log('render weather', weatherData);
    // add date and time on page
    const date = new Date();

    this.currentDate.textContent = `${date.getDayName()}  ${date.getDate()}  ${date.getMonthName()} ${date.toLocaleTimeString(
      'en-US',
      { hour12: false }
    )}`;

    // add temperature
    localStorage.setItem('today', Math.round(weatherData[0].temp));

    this.temperatureDegree.textContent = `${
      this.celsiumBtn.classList.contains('temp-button_clicked')
        ? localStorage.getItem('today')
        : Math.floor((localStorage.getItem('today') * 9) / 5 + 32)
    }°`;

    this.summary.textContent = weatherData[0].weather.description;
    this.weatherIcon.src = `${this.weatherIconUrl}${weatherData[0].weather.icon}.png`;

    // add data for forecast cards

    [...this.forecastTemp].forEach((el, i) => {
      localStorage.setItem(`day${i}`, Math.round(weatherData[i + 1].temp));
      el.textContent = `${
        this.celsiumBtn.classList.contains('temp-button_clicked')
          ? localStorage.getItem(`day${i}`)
          : Math.floor((localStorage.getItem(`day${i}`) * 9) / 5 + 32)
      }°`;
    });

    [...this.forecastIcon].forEach((el, i) => {
      el.src = `${this.weatherIconUrl}${weatherData[i + 1].weather.icon}.png`;
    });

    [...this.forecastDay].forEach((el, i) => {
      const nextDay = new Date(date.getTime() + 24 * 60 * 60 * 1000 * (i + 1));

      el.textContent = `${nextDay.getDayName()}`;
    });

    // add other data
    if (lang === 'be') {
      this.windSpeed.textContent = `Вецер: ${Math.round(
        weatherData[0].wind_spd
      )} m/s`;
      this.tempApparent.textContent = `Ціск: ${Math.round(
        weatherData[0].pres / 1.33322387415
      )} мм`;
      this.humidity.textContent = `Вільготнасць: ${weatherData[0].rh}%`;
    } else if (lang === 'ru') {
      this.windSpeed.textContent = `Ветер: ${Math.round(
        weatherData[0].wind_spd
      )} m/s`;
      this.tempApparent.textContent = `Давление: ${Math.round(
        weatherData[0].pres / 1.33322387415
      )} мм`;
      this.humidity.textContent = `Влажность: ${weatherData[0].rh}%`;
    } else {
      this.windSpeed.textContent = `Wind speed: ${Math.round(
        weatherData[0].wind_spd
      )} m/s`;
      this.tempApparent.textContent = `Pressure: ${Math.round(
        weatherData[0].pres / 1.33322387415
      )} mm`;
      this.humidity.textContent = `Humidity: ${weatherData[0].rh}%`;
    }
  }

  async renderCityData(cityInfo, lang) {
    const cityName = cityInfo.formatted.split(',');
    
    if (cityName.length > 2) {
      cityName.splice(1, 1);
    }
    const latitude = `${cityInfo.geometry.lat
      .toString()
      .slice(0, 2)}° ${cityInfo.geometry.lat.toString().slice(3, 5)}`;
    const longitude = `${cityInfo.geometry.lng
      .toString()
      .slice(0, 2)}° ${cityInfo.geometry.lng.toString().slice(3, 5)}`;

    this.city.textContent = `${cityName.join(',')}`;
    if (lang === 'be') {
      this.searchButton.textContent = 'ШУКАЦЬ';
      this.latitude.textContent = `Шырата: ${latitude}`;
      this.longitude.textContent = `Даугата: ${longitude}`;
      console.log('ctInfo', cityInfo);
    } else if (lang === 'ru') {
      this.searchButton.textContent = 'ИСКАТЬ';
      this.latitude.textContent = `Широта: ${latitude}`;
      this.longitude.textContent = `Доглота: ${longitude}`;
    } else {
      this.searchButton.textContent = 'SEARCH';
      this.latitude.textContent = `Latitude: ${latitude}`;
      this.longitude.textContent = `Longitude: ${longitude}`;
    }
  }
}
