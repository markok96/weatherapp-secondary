const input = document.querySelector('.search');
const city = document.querySelector('.city');
const date = document.querySelector('.date');
const temperature = document.querySelector('.temperature');
const icon = document.querySelector('.icon');
const description = document.querySelector('.description');
const form = document.querySelector('form');



function setQuery(e){
    let inputValue = input.value;
    getResults(inputValue);
    
    e.preventDefault();
}

function getResults(query){
    const apiKey = '94b75603bf786678a08dc3f19499885c';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`
    fetch(url)
    .then(response => response.json())
    .then(displayResults)
    .catch(() => {
        console.log('There was an error');
    })
}

function displayResults(response){
    const {name, main, sys, weather} = response;
    const iconImg = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
    weather[0]["icon"]
  }.svg`
    const now = new Date()
    
    city.innerHTML = `${name}, ${sys.country}`;
    date.innerHTML = getFullDate(now);
    temperature.innerHTML = `${Math.round(main.temp)}<span>°C</span>`;
    icon.innerHTML = `<img src="${iconImg}" alt="">`;
    description.innerHTML = `${weather[0]["description"]}`;
}

function getFullDate(givenDate){
    const currentDate = givenDate.getDate();
    const currentYear = givenDate.getFullYear();
    // DAY
    const daysArr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const dayNum = givenDate.getDay();
    let day;
    for(let i = 0; i < daysArr.length; i++) {
        if(dayNum === i) {
            day = daysArr[i];
        }
    }
    // MONTH
    const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthNum = givenDate.getMonth();
    let month
    for(let i = 0; i < monthsArr.length; i++) {
        if(monthNum === i) {
            month = monthsArr[i];
        }
    }
    return `${day}, ${formatDate(currentDate)} ${month} ${currentYear}`;
}

function formatDate(date){
    return date < 10 ? `0${date}` : date;
}

form.addEventListener('submit', setQuery);
