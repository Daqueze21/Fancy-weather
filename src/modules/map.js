export default class Map {
  constructor() {

  }

  // fetch city data from API
  async renderMap(lng, lat) {
    mapboxgl.accessToken = process.env.Map_KEY;
    const map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
      center: [lng, lat], // starting position [lng, lat]
      zoom: 8, // starting zoom
    });
  }
}

// map

