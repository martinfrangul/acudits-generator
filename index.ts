let getNextJoke = document.getElementById('nextJoke') as HTMLButtonElement;

let jokeData: { joke?: string; value?: string };

const icanHadDad = 'https://icanhazdadjoke.com/';
const chuckNorris = 'https://api.chucknorris.io/jokes/random';

function isEmptyObject(obj: Record<string, any>) {
  return Object.keys(obj).length === 0;
}

let jokeUrl: string;
let voteIcon1 = document.getElementById('vote-1-img') as HTMLImageElement;
let voteIcon2 = document.getElementById('vote-2-img') as HTMLImageElement;
let voteIcon3 = document.getElementById('vote-3-img') as HTMLImageElement;

// METEO //

async function getMeteo() {
  try {
    const response = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=41.3879&longitude=2.16992&current_weather=true',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      }
    );
    const data = await response.json();
    const tempText = document.getElementById('tempText');
    if (tempText) {
      tempText.innerHTML = data.current_weather.temperature + 'º';
    }
  } catch (error) {
    console.log(error);
  }
}

getMeteo();

///////////////////

async function getJoke() {
  // REMOVE BOUNCING //

  voteIcon1.classList.remove('bounce');
  voteIcon2.classList.remove('bounce');
  voteIcon3.classList.remove('bounce');

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
    if (jokeText) {
      if (jokeUrl == icanHadDad) {
        jokeText.innerText = data.joke;
        jokeData = data;
      } else if (jokeUrl == chuckNorris) {
        jokeText.innerText = data.value;
        jokeData = data;
      }
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

const reportJokes: Record<string, any> = [];

let voteObject: object = {};

const voteListener = (id: number) => {
  const date = new Date();

  if (id === 1) {
    voteIcon1.classList.add('bounce');
    voteIcon2.classList.remove('bounce');
    voteIcon3.classList.remove('bounce');

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
    voteIcon2.classList.add('bounce');
    voteIcon1.classList.remove('bounce');
    voteIcon3.classList.remove('bounce');

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
    voteIcon3.classList.add('bounce');
    voteIcon1.classList.remove('bounce');
    voteIcon2.classList.remove('bounce');

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
