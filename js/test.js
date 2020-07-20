// const getArtWorkByCountry = (country) => {
  
//   fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?geoLocation=${country}&q=a`)
//   .then( (response) => response.json())
//   .then(data => {
//     console.log('data', data.objectIDs)
//     let randomId = Math.floor(Math.random() * data.objectIDs.length);
//     let randomObjectID = data.objectIDs[randomId];

//     return fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomObjectID}`)
//   })
//   .then(res => res.json())
//   .then(data => console.log('object', data))
//   .catch( (err) => console.log(err));
// }

// let searchTerm = document.querySelector('#input-search').value
// window.addEventListener('load', () => getArtWorkByCountry(searchTerm));







// let rockArray = ["https://api.deezer.com/genre/133/artists", "https://api.deezer.com/genre/152/artists", "https://api.deezer.com/genre/154/artists", "https://api.deezer.com/genre/156/artists"];


// const getArtistsFromGenre = async (array) => {
//   let allArtistsArr = [];

//   try {
//     for(let i = 0; i < array.length; i++) {
//       const response = await fetch(`https://cors-anywhere.herokuapp.com/${array[i]}`)
//       const data = await response.json();
//       allArtistsArr.push(...data.data);
//     }
//     console.log('allArtistsArr from 1st function :>> ', allArtistsArr);
//     return allArtistsArr;
//   } catch (err) {
//     console.log('err :>> ', err);
//   }
// }

// const getRandomArtists = async (array) => {
//   try {
//     let allArtistsArr = await getArtistsFromGenre(array);
//     console.log('allArtistsArr from 2d function :>> ', allArtistsArr);

//     let randomArtists = [];
//     for(let j = 0; j < 4; j++) {
//       let randomIndex = Math.floor(Math.random() * allArtistsArr.length)
//       randomArtists.push(allArtistsArr[randomIndex].tracklist)
//     }

//   return randomArtists;
//   } catch(err) {
//     console.log('err :>> ', err);
//   }
// }


// const getAllTracksFromRandomArtists = async (array) => {
//   try { 
//     let randomArtists = await getRandomArtists(array);
//     let allTracksFromRandomArtists = [];

//     console.log('randomArtists from 3rd function :>> ', randomArtists);

//     for(let k = 0; k < randomArtists.length; k++) {
//       const response = await fetch(`https://cors-anywhere.herokuapp.com/${randomArtists[k]}`)
//       const data = await response.json();
//       allTracksFromRandomArtists.push(...data.data);
//       // console.log("tracks from random artists", allTracksFromRandomArtists)
//     }

//     return allTracksFromRandomArtists;

//   } catch (err) {
//     console.log('err :>> ', err);
//   }
// }

// const getRandomTracks = async (array) => {
//   try {
//     let randomTracks = [];
//     let allTracks = await getAllTracksFromRandomArtists(array);

//     console.log('allTracks :>> ', allTracks);

//     for(let l = 0; l < 4; l++) {
//       let randomIndex = Math.floor(Math.random() * allTracks.length);
//       randomTracks.push(allTracks[randomIndex].link)
//     }
//     console.log("random Tracks", randomTracks);

//     return randomTracks;
//   }
//   catch(err) {
//     console.log('err :>> ', err);
//   }
// } 

// window.addEventListener('load', () => getRandomTracks(rockArray));


const displayResult = (cocktailName) => {
  console.log('hello :>> ');
  var ingrList = document.querySelector("#cocktail-by-name ul");

  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`)
      .then((response) => {
          return response.json();
      })
      .then((cocktail) => {
        if (cocktail.drinks) {
          let ingredientsWithMeasure = [];
          for(let i=0; i<15; i++){     
            let currentIngredient = cocktail.drinks[0][`strIngredient${i}`];
            let currentMeasure = cocktail.drinks[0][`strMeasure${i}`];

            if(currentIngredient && currentMeasure) {
              ingredientsWithMeasure.push({ingredient: currentIngredient, measure: currentMeasure});
            } else if(currentIngredient && !currentMeasure) {
              ingredientsWithMeasure.push({ingredient: currentIngredient})
            }
          }
          console.log('ingredientsWithMeasure :>> ', ingredientsWithMeasure);ingredientsWithMeasure.forEach(ingrObj => {
            let ingrListItem = document.createElement('li');

            if(ingrObj.measure) {
              ingrListItem.innerHTML = ingrObj.ingredient + " " + ingrObj.measure;
            } else {
              ingrListItem.innerHTML = ingrObj.ingredient;
            }
            ingrList.appendChild(ingrListItem);
          })
        }
      })
      .catch((err) => console.log(err))
}
const urlParams = new URLSearchParams(window.location.search);
const cocktailName = urlParams.get('cocktailName');

window.addEventListener('load', () => displayResult('margarita'))



// const drinks = {
//   strIngredient1: "asdfasf",
//   strIngredient2: null,
//   strIngredient3: "asdfa",
//   strIngredient4: "",
//   strIngredient5: null
// };

// const filteredProperties = Object.keys(drinks)
//   .filter(p => p.includes("strIngredient"))
//   .filter(p => !!drinks[p]);

// console.log("filteredProperties", filteredProperties);

// const existingIngredients = filteredProperties.map(p => drinks[p]);

// console.log("existingIngredients", existingIngredients);
