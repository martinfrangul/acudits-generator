let getNextJoke = document.getElementById('nexJoke');

getNextJoke.addEventListener('click', async function () {
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
  } catch (error) {
    console.log('ERROR:', error);
  }
});