let getNextJoke = document.getElementById('nexJoke');

let jokeData: object;

const icanHadDad = 'https://icanhazdadjoke.com/';
const chuckNorris = 'https://api.chucknorris.io/jokes/random';

function isEmptyObject(obj: object) {
  return Object.keys(obj).length === 0;
}
let jokeUrl: string;

async function getJoke() {
  let randomNumber = Math.floor(Math.random() * (2 - 1 + 1) + 1);
  if (randomNumber == 1) {
    jokeUrl = icanHadDad;
  } else {
    jokeUrl = chuckNorris;
  }
  if (isEmptyObject(voteObject) === false) {
    reportJokesListener();
  }

  try {
    const response = await fetch(jokeUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    const data = await response.json();
    let jokeText = document.getElementById('joke');
    if (jokeUrl == icanHadDad) {
      jokeText.innerText = data.joke;
      jokeData = data;
      voteObject = {};
      console.log(reportJokes);
    }
    if (jokeUrl == chuckNorris) {
      jokeText.innerText = data.value;
      jokeData = data;
      voteObject = {};
      console.log(reportJokes);
    }

    return jokeData;
  } catch (error) {
    console.log('ERROR:', error);
  }
}
const reportJokesListener = () => {
  reportJokes.push(voteObject);
};

//////// VOTACIONES //////////

const reportJokes = [];

let voteObject: object = {};



const voteListener = (id: number) => {
  const date = new Date();

  let voteIcon1 = document.getElementById('vote-1')
  let voteIcon2 = document.getElementById('vote-2')
  let voteIcon3 = document.getElementById('vote-3')
  
  if (id === 1) {
    voteIcon1.classList.add('vote-icon-1-clicked')
    voteIcon2.classList.remove('vote-icon-2-clicked')
    voteIcon3.classList.remove('vote-icon-3-clicked')

    if (jokeUrl == icanHadDad) {
      voteObject = {
        joke: jokeData.joke,
        score: 1,
        date: date.toISOString(),
      };
    }
    if (jokeUrl == chuckNorris) {
      voteObject = {
        joke: jokeData.value,
        score: 1,
        date: date.toISOString(),
      };
    }
  }
  if (id === 2) {
    voteIcon2.classList.add('vote-icon-2-clicked')
    voteIcon1.classList.remove ('vote-icon-1-clicked')
    voteIcon3.classList.remove ('vote-icon-3-clicked')

    if (jokeUrl == icanHadDad) {
      voteObject = {
        joke: jokeData.joke,
        score: 2,
        date: date.toISOString(),
      };
    }
    if (jokeUrl == chuckNorris) {
      voteObject = {
        joke: jokeData.value,
        score: 2,
        date: date.toISOString(),
      };
    }
  }
  if (id === 3) {
    voteIcon3.classList.add ('vote-icon-3-clicked')
    voteIcon1.classList.remove ('vote-icon-1-clicked')
    voteIcon2.classList.remove ('vote-icon-2-clicked')
    
    if (jokeUrl == icanHadDad) {
      voteObject = {
        joke: jokeData.joke,
        score: 3,
        date: date.toISOString(),
      };
    }
    if (jokeUrl == chuckNorris) {
      voteObject = {
        joke: jokeData.value,
        score: 3,
        date: date.toISOString(),
      };
    }
  }
};

////////////////////////// 

getNextJoke.addEventListener('click', getJoke);
window.addEventListener('load', getJoke);
