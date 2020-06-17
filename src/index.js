import UserGeolocation from './modules/userGeolocation';
import CityInfo from './modules/cityInfo';
import WeatherData from './modules/weatherData';
import Map from './modules/map';
import RefreshBackground from './modules/refreshBackground';

import './scss/index.scss'; // scss

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
          console.log(result);

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
              console.log(result);
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

/** change language block */
const languageSelected = document.querySelector('.language select');

/** change language block END */

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
