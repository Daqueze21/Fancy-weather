import UserGeolocation from './modules/userGeolocation';
import CityInfo from './modules/cityInfo';
import WeatherData from './modules/weatherData';
import Map from './modules/map';
import RefreshBackground from './modules/refreshBackground';
import UI from './modules/ui';

import './scss/index.scss'; // scss

/** render user city weather data */
window.addEventListener('load', () => {
  // Get user geolocation
  const geolocation = new UserGeolocation();

  geolocation
    .getUserGeolocation()
    .then((city) => {
      console.log('geoloc', city);

      const cityInfo = new CityInfo();

      cityInfo
        .getCityInfo(city, languageSelected.value.toLowerCase())
        .then((result) => {
          const ui = new UI();

          ui.renderCityData(
            result.results[0],
            languageSelected.value.toLowerCase()
          );

          // Get  weather
          const weather = new WeatherData(
            city,
            languageSelected.value.toLowerCase(),
            result.results[0].components.country_code.toUpperCase()
          );

          // render weather
          weather
            .getWeatherData()
            .then((result) => {
              ui.renderWeather(
                result.data,
                languageSelected.value.toLowerCase()
              );
            })
            .catch((err) => console.log('wheatherData', err));

          // render map
          const map = new Map();
          map.renderMap(
            result.results[0].geometry.lng,
            result.results[0].geometry.lat
          );
        })
        .catch((err) => console.log('cityinfo', err));

      localStorage.setItem('userCity', city);
    })
    .catch((err) => console.log('geolocation', err));
});
/** render user city weather data END */

/** change language block */
const languageSelected = document.querySelector('.language select');

languageSelected.addEventListener('change', () => {
  const cityInfo = new CityInfo();

  cityInfo
    .getCityInfo(
      input.value === '' ? localStorage.getItem('userCity') : input.value,
      languageSelected.value.toLowerCase()
    )
    .then((result) => {
      const ui = new UI();

      ui.renderCityData(
        result.results[0],
        languageSelected.value.toLowerCase()
      );

      // Get  weather
      const weather = new WeatherData(
        input.value === '' ? localStorage.getItem('userCity') : input.value,
        languageSelected.value.toLowerCase(),
        result.results[0].components.country_code.toUpperCase()
      );

      weather
        .getWeatherData()
        .then((result) => {
          ui.renderWeather(result.data, languageSelected.value.toLowerCase());
        })
        .catch((err) => console.log('wheatherData', err));

      const map = new Map();
      map.renderMap(
        result.results[0].geometry.lng,
        result.results[0].geometry.lat
      );
    })
    .catch((err) => console.log('cityinfo', err));
});
/** change language block END */

/** Voice recognition block */
const talkBtn = document.querySelector('.talkBtn');
const Input = document.querySelector('.search-input');

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = () => {
  console.log('voice recognition');
};

recognition.onresult = (event) => {
  const current = event.resultIndex;
  const { transcript } = event.results[current][0];
  saveRecognitionToInput(transcript);
};

const saveRecognitionToInput = (transcript) => {
  Input.value = transcript;
};

talkBtn.addEventListener('click', () => {
  recognition.start();
});
/** Voice recognition block END */

/** Change bogy background block */
const bodyBackground = new RefreshBackground();
const body = document.querySelector('body');
const backgroundImage = document.querySelector('.refresh-button');

bodyBackground
  .getLinkToImage()
  .then((result) => {
    body.style.backgroundImage = `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3) ), url('${result}')`;
  })
  .catch((err) => console.log(err));

backgroundImage.addEventListener('click', () => {
  bodyBackground
    .getLinkToImage()
    .then((result) => {
      body.style.backgroundImage = `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3) ), url('${result}')`;
    })
    .catch((err) => console.log(err));
});
/** Change bogy background block END */

const input = document.querySelector('#searchInput');
const form = document.querySelector('form');
form.addEventListener('submit', formSubmitted);

/** render data for new city */
function formSubmitted(event) {
  event.preventDefault();

  // get cityInfo
  const cityInfo = new CityInfo();

  cityInfo
    .getCityInfo(input.value, languageSelected.value.toLowerCase())
    .then((result) => {
      const ui = new UI();

      ui.renderCityData(
        result.results[0],
        languageSelected.value.toLowerCase()
      );

      // Get  weather
      const weather = new WeatherData(
        input.value,
        languageSelected.value.toLowerCase(),
        result.results[0].components.country_code.toUpperCase()
      );

      weather
        .getWeatherData()
        .then((result) => {
          ui.renderWeather(result.data, languageSelected.value.toLowerCase());
        })
        .catch((err) => console.log('wheatherData', err));

      const map = new Map();
      map.renderMap(
        result.results[0].geometry.lng,
        result.results[0].geometry.lat
      );
    })
    .catch((err) => console.log('cityinfo', err));
}
/** render data for new city END */

/** func to get days and month names */
(function () {
  const daysEN = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const daysRU = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
  ];
  const daysBE = [
    'Нядзеля',
    'Понядзелак',
    'Аўторак',
    'Серада',
    'Чацьверг',
    'Пятніца',
    'Субота',
  ];
  const monthsEN = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const monthsRU = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];

  const monthsBE = [
    'Студзень',
    'Люты',
    'Сакавiк',
    'Красавiк',
    'Май',
    'Червень',
    'Лiпень',
    'Жнiвень',
    'Верасень',
    'Кастрычнiк',
    'Лiстапад',
    'Снежань',
  ];

  Date.prototype.getMonthName = function () {
    if (languageSelected.value === 'BE') {
      return monthsBE[this.getMonth()];
    }
    if (languageSelected.value === 'RU') {
      return monthsRU[this.getMonth()];
    }

    return monthsEN[this.getMonth()];
  };
  Date.prototype.getDayName = function () {
    if (languageSelected.value === 'BE') {
      return daysBE[this.getDay()];
    }
    if (languageSelected.value === 'RU') {
      return daysRU[this.getDay()];
    }

    return daysEN[this.getDay()];
  };
})();
/** func to get days and month names END */

/** convert temperature */
const fahrenheit = document.querySelector('.temp__farenheitBtn');
const celsius = document.querySelector('.temp__celsBtn');
const temperatureDegree = document.querySelector('.weather-today_temperature');
const forecastTemperature = document.querySelectorAll('.forecast-temp');

function toFahrenheit(temperatureInCels) {
  return `${Math.floor((+temperatureInCels.slice(0, -1) * 9) / 5 + 32)}°`;
}

function convertTemperature() {
  if (celsius.classList.contains('temp-button_clicked')) {
    celsius.classList.remove('temp-button_clicked');
    fahrenheit.classList.add('temp-button_clicked');

    [...forecastTemperature].forEach((el) => {
      el.textContent = toFahrenheit(el.textContent);
    });

    temperatureDegree.textContent = toFahrenheit(temperatureDegree.textContent);
  } else {
    fahrenheit.classList.remove('temp-button_clicked');
    celsius.classList.add('temp-button_clicked');

    [...forecastTemperature].forEach((el, i) => {
      el.textContent = `${localStorage.getItem(`day${i}`)}°`;
    });

    temperatureDegree.textContent = `${localStorage.getItem('today')}°`;
  }
}

fahrenheit.addEventListener('click', convertTemperature);
celsius.addEventListener('click', convertTemperature);
/** convert temperature END */
