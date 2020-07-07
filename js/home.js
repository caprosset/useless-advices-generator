const randomButton = document.getElementById('random-button');
const randomSection = document.getElementById('random-section');
let randomParagraph = null;

const API_URL = "https://api.adviceslip.com/advice";

function get(url) {
  return fetch(url).then(response => response.json());
}

const API = { get }

const getRandomAdvice = async () => {
  try {
    const data = await API.get(API_URL);
    const randomAdvice = data.slip.advice;

    if(!randomSection.contains(randomParagraph)) {
      randomParagraph = document.createElement('p');
      randomSection.appendChild(randomParagraph);
    } 
    randomParagraph.innerHTML = randomAdvice;
  } catch (err) {
    console.log(err)
  }
}

randomButton.addEventListener('click', getRandomAdvice);

document.body.onload = getRandomAdvice;





