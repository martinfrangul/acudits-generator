let getNextJoke = document.getElementById('nexJoke');

let jokeData: object;

function isEmptyObject(obj: object) {
  return Object.keys(obj).length === 0;
}

async function getJoke() {
  if (isEmptyObject(voteObject) === false) {
    reportJokesListener();
  }

  try {
    const response = await fetch('https://icanhazdadjoke.com/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    const data = await response.json();
    let jokeText = document.getElementById('joke');
    jokeText.innerText = data.joke;
    jokeData = data;
    voteObject = {};
    console.log(reportJokes);

    return jokeData;
  } catch (error) {
    console.log('ERROR:', error);
  }
}
const reportJokesListener = () => {
  reportJokes.push(voteObject);
};

// VOTOS
const reportJokes = [];

let voteObject: object = {};

const vote1Listener = () => {
  voteObject = {
    joke: jokeData.joke,
    score: 1,
    date: Date(),
  };
};

const vote2Listener = () => {
  voteObject = {
    joke: jokeData.joke,
    score: 2,
    date: Date(),
  };
};

const vote3Listener = () => {
  voteObject = {
    joke: jokeData.joke,
    score: 3,
    date: Date(),
  };
};

getNextJoke.addEventListener('click', getJoke);
window.addEventListener('load', getJoke);
