export default class Map {
  constructor() {
    // mapKey
    this.key =
      'pk.eyJ1IjoiZGFxdWV6ZTIxIiwiYSI6ImNrYXp4YzgxcTAwc2QycnFsaWRtZmtidmgifQ.EGgcHrEkAXOKvAmb3FWwtw';
  }

  // fetch city data from API
  async renderMap(lng, lat) {
    mapboxgl.accessToken =this.key;
    const map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
      center: [lng, lat], // starting position [lng, lat]
      zoom: 8, // starting zoom
    });
  }
}


// map

