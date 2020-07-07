const randomButton = document.getElementById('random-button');
const randomTitle = document.getElementById('random-title');
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

    if(!document.body.contains(randomParagraph)) {
      randomParagraph = document.createElement('p');
      randomParagraph.setAttribute('id', 'random-advice')
      randomTitle.insertAdjacentElement('afterend', randomParagraph);
    } 
    randomParagraph.innerHTML = randomAdvice;

    randomButton.disabled = true;
    setTimeout(() => randomButton.disabled = false, 5000);
  } catch (err) {
    console.log(err)
  }
}

randomButton.addEventListener('click', getRandomAdvice);

document.body.onload = getRandomAdvice;





