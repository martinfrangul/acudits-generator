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
let getNextJoke = document.getElementById('nexJoke');
let jokeData;
function isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
}
function getJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        if (isEmptyObject(voteObject) === false) {
            reportJokesListener();
        }
        try {
            const response = yield fetch('https://icanhazdadjoke.com/', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                },
            });
            const data = yield response.json();
            let jokeText = document.getElementById('joke');
            jokeText.innerText = data.joke;
            jokeData = data;
            voteObject = {};
            console.log(reportJokes);
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
// VOTOS
const reportJokes = [];
let voteObject = {};
const voteListener = (id) => {
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
