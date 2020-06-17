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
const form = document.querySelector('form');
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
