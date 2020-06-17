import UserGeolocation from './modules/userGeolocation';
import CityInfo from './modules/cityInfo';
import WeatherData from './modules/weatherData';

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
        .then(result => {
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

        })
        .catch(err => console.log('cityinfo', err));

      localStorage.setItem('userCity', city);
    })
    .catch((err) => console.log('geolocation', err));
});


/** change language block */
const languageSelected = document.querySelector('.language select');

/** change language block END */
