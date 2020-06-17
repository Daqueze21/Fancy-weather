export default class RefreshBackground {
  constructor() {
    this.key = 'nnLTXJWiodrXTvdOkwthYQ2aTwqnRTY-iKh1oGOJKaY';
    this.url =
      'https://api.unsplash.com/photos/random?query=morning&client_id=';
  }

  // fetch image from API
  async getLinkToImage() {
    const response = await fetch(`${this.url}${this.key}`);
    const data = await response.json();

    return data.urls.regular;
  }
}

// async function getLinkToImage() {
//   const url = `https://api.unsplash.com/photos/random?query=morning&client_id=${`nnLTXJWiodrXTvdOkwthYQ2aTwqnRTY-iKh1oGOJKaY`}`;
//   const res = await fetch(url);
//   if (res.ok) {
//
//     console.log(data.urls.regular);
//     body.style.backgroundImage = `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3) ), url('${}')`;
//   } else {
//     console.log(res.status);
//   }
// }
