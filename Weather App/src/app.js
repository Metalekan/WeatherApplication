let weatherDisplay = document.querySelector('.weatherDisplay');

let weather = {
    apiKey: "01e6ec3ae8696e5051d75a0e98e2a697",
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
        + city
        + "&units=metric&appid="
        + this.apiKey
        ).then((response) => response.json()).then((data) => 
        this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        const { country } = data.sys;

        document.querySelector('.city').innerText = `Right now in ${name}`;
        document.querySelector('.icon').src =  `https://openweathermap.org/img/w/${icon}.png`;
        document.querySelector('.description').innerText = `${description}`;
        document.querySelector('.temp').innerHTML = `<h3 class="temp">${temp}°C</h3>`;
        document.querySelector('.humidity').innerText = `Humidity: ${humidity}%`;
        document.querySelector('.windspeed').innerText = `Wind Speed: ${speed}km/h`;
        document.querySelector('.country').innerHTML = `<i class="fs-1 bi bi-geo-alt-fill"></i> ${country}`;
    },

    search: function() {
        this.fetchWeather(document.querySelector('#enter-city').value);
    },
    getWeekDay: function() {
        const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const d = new Date();
        const fulldate = new Date().toLocaleDateString();
        let day = weekday[d.getDay()];;
        document.querySelector('.date').innerHTML = `<p><i class="bi bi-calendar-check"></i> ${fulldate} | ${day}</p>`;
    },

};

document.querySelector('#searchBtn').addEventListener('click', function () {
    weather.search();
    reveal();
    weather.getWeekDay();
    clear();
});

document.querySelector('#enter-city').addEventListener('keyup', function (event) {
    if (event.key == "Enter") {
        weather.search();
        reveal();
        clear();
        weather.getWeekDay();
    }
});

function clear() {
    document.querySelector('#enter-city').value = "";
}
function reveal() {
    weatherDisplay.classList.add('show');
}
