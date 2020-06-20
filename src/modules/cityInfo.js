export default class CityInfo {
  constructor() {
    // api data

    this.url = 'https://api.opencagedata.com/geocode/v1/json?q=';
  }

  // fetch city data from API
  async getCityInfo(city, lang) {
    const response = await fetch(
      `${this.url}${city}&key=${process.env.Opencagedata_KEY}&language=${lang}&pretty=1&no_annotations=1`
    );
    const data = await response.json();

    return data;
  }
}
