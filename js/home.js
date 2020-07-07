const randomButton = document.getElementById('random-button');
const randomParagraph = document.getElementById('random-advice');

const API_URL = "https://api.adviceslip.com/advice";

function get(url) {
  return fetch(url).then(response => response.json())
}

const API = { get }

const getRandomAdvice = async () => {
  try {
    let data = await API.get(API_URL);
    const randomAdvice = data.slip.advice;
    
    randomParagraph.innerHTML = randomAdvice; 
  } catch (err) {
    console.log(err)
  }
}

randomButton.addEventListener('click', () => getRandomAdvice());

document.body.onload = getRandomAdvice;