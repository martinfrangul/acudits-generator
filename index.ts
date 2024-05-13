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

const voteListener = (id : number) => {
  const date = new Date();

  if (id === 1) {
    voteObject = {
      joke: jokeData.joke,
      score: 1,
      date: date.toISOString(),
    };
  }
  if (id === 2) {
    voteObject = {
      joke: jokeData.joke,
      score: 2,
      date: date.toISOString(),
    };
  }
  if (id === 3) {
    voteObject = {
      joke: jokeData.joke,
      score: 3,
      date: date.toISOString(),
    };
  }
};

getNextJoke.addEventListener('click', getJoke);
window.addEventListener('load', getJoke);
