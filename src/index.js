import UserGeolocation from './modules/userGeolocation';

import './scss/index.scss'; // scss

window.addEventListener('load', () => {
  // Get user geolocation
  const geolocation = new UserGeolocation();

  geolocation
    .getUserGeolocation()
    .then((city) => {
      console.log('geoloc', city);
    })
    .catch((err) => console.log('geolocation', err));
});
