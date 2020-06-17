export default class WeatherData {
  constructor(city, lang, countryCode) {
    // api data
    this.key = 'cb2447744a3a4e01b1d104d6581812cf';
    this.url = 'https://api.weatherbit.io/v2.0/forecast/daily?city=';

    this.city = city;
    this.lang = lang;
    this.countryCode = countryCode;
  }

  // fetch image from API
  async getWeatherData() {
    const response = await fetch(
      `${this.url}${this.city}&country=${this.countryCode}&days=4&units=M&lang=${this.lang}&key=${this.key}`
    );
    const data = await response.json();

    return data;
  }
}
