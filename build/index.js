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
function getJoke() {
    return __awaiter(this, void 0, void 0, function* () {
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
        }
        catch (error) {
            console.log('ERROR:', error);
        }
    });
}
;
getNextJoke.addEventListener('click', getJoke);
window.addEventListener('load', getJoke);
