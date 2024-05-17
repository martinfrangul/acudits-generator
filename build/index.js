"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let getNextJoke = document.getElementById('nextJoke');
let jokeData;
const icanHadDad = 'https://icanhazdadjoke.com/';
const chuckNorris = 'https://api.chucknorris.io/jokes/random';
function isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
}
let jokeUrl;
let voteIcon1 = document.getElementById('vote-1-img');
let voteIcon2 = document.getElementById('vote-2-img');
let voteIcon3 = document.getElementById('vote-3-img');
// METEO //
function getMeteo() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('https://api.open-meteo.com/v1/forecast?latitude=41.3879&longitude=2.16992&current_weather=true', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                },
            });
            const data = yield response.json();
            const tempText = document.getElementById('tempText');
            if (tempText) {
                tempText.innerHTML = data.current_weather.temperature + 'º';
            }
        }
        catch (error) {
            console.log(error);
        }
    });
}
getMeteo();
///////////////////
function getJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        // REMOVE BOUNCING //
        voteIcon1.classList.remove('bounce');
        voteIcon2.classList.remove('bounce');
        voteIcon3.classList.remove('bounce');
        let randomNumber = Math.floor(Math.random() * (2 - 1 + 1) + 1);
        if (randomNumber == 1) {
            jokeUrl = icanHadDad;
        }
        else {
            jokeUrl = chuckNorris;
        }
        if (isEmptyObject(voteObject) === false) {
            reportJokesListener();
        }
        try {
            const response = yield fetch(jokeUrl, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                },
            });
            const data = yield response.json();
            let jokeText = document.getElementById('joke');
            if (jokeText) {
                if (jokeUrl == icanHadDad) {
                    jokeText.innerText = data.joke;
                    jokeData = data;
                }
                else if (jokeUrl == chuckNorris) {
                    jokeText.innerText = data.value;
                    jokeData = data;
                }
                voteObject = {};
                console.log(reportJokes);
            }
            return jokeData;
        }
        catch (error) {
            console.log('ERROR:', error);
        }
    });
}
const reportJokesListener = () => {
    reportJokes.push(voteObject);
};
//////// VOTACIONES //////////
const reportJokes = [];
let voteObject = {};
const voteListener = (id) => {
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
