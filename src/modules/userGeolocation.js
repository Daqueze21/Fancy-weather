export default class UserGeolocation {
  constructor() {
    this.key = 'dca4e1911e3c08';
    this.url = 'https://ipinfo.io/json?token=';
  }

  // fetch data from API
  async getUserGeolocation() {
    const response = await fetch(`${this.url}${this.key}`);
    const data = await response.json();

    return data.city;
  }
}