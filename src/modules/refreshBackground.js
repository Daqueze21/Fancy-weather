export default class RefreshBackground {
  constructor() {
    this.url =
      'https://api.unsplash.com/photos/random?query=morning&client_id=';
  }

  // fetch image from API
  async getLinkToImage() {
    const response = await fetch(`${this.url}${process.env.Unsplash_KEY}`);
    const data = await response.json();

    return data.urls.regular;
  }
}


