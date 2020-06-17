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
/** render user city weather data END */

/** Voice recognition block */
const talkBtn = document.querySelector('.talkBtn');
const Input = document.querySelector('.search-input');

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = () => {
  console.log('voice recognition');
};

recognition.onresult = (event) => {
  const current = event.resultIndex;
  const { transcript } = event.results[current][0];
  saveRecognitionToInput(transcript);
};

const saveRecognitionToInput = (transcript) => {
  Input.value = transcript;
};

talkBtn.addEventListener('click', () => {
  recognition.start();
});
/** Voice recognition block END */