const cityInput = document.getElementById('change-loc');
const city = document.getElementById('city');
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const desc = document.getElementById('desc');
const feelsLike = document.getElementById('feels-like');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const changeLoc = document.getElementById('change-loc');
const key="960595cf69784cb2a28fad112a9cc40c";

window.onload = getUserLocation();

cityInput.addEventListener('input', () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${key}`)
    .then(res => res.json())
    .then(data => renderWeatherData(data)) 
    .catch(error => console.log(error))
})

function getCurrentWeather(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`)
    .then(res => res.json())
    .then(data => renderWeatherData(data)) 
    .catch(error => console.log(error))
}

function success(position){
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    getCurrentWeather(lat, lon);
}

function error(err){
    console.log('Geolocation is not supported by your browser');
}

function getUserLocation(){
    if(!navigator.geolocation){
        window.alert('Geolocation is not supported by your browser')
    }
    else{
        navigator.geolocation.getCurrentPosition(success, error);
    } 
}

function renderWeatherData(object){
    console.dir(object);
    renderDate(object.dt);
    city.innerText = object.name + ', ' + object.sys.country;
    temp.innerText = Math.floor(object.main.temp - 273) + '°C';
    temp.innerText = Math.floor(object.main.temp) + 'k';
    desc.innerText = object.weather[0].main;
    feelsLike.innerText = 'Feels like: ' + (Math.floor(object.main.feels_like) - 273) + '°C';
    humidity.innerText = 'Humidity: ' + object.main.humidity + '%';
    wind.innerText = 'Wind: ' + object.wind.speed + ' m/s';
    setIcons(object.weather[0].icon);
    if (object.weather[0].icon[2] === 'n'){
        document.querySelector('main').style.background = 'linear-gradient( #130c61, darkblue)';
    }else{
        document.querySelector('main').style.background = '#7bd8f7';
    }
}

function renderDate(unixTimestamp){
    const currentDate = new Date(unixTimestamp * 1000);
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    if(dayNames[currentDate.getDay()] === undefined){
        date.innerText = ' ';
    }else{
        date.innerText = dayNames[currentDate.getDay()] + ' ' + (currentDate.getDate() + 1) + ' ' + monthNames[currentDate.getMonth()];
    }
    
    
};

function setIcons(desc){
    iconArray = ['01d', '01n', '02d', '02n', '03d', '03n', '04d', '04n', '09d', '09n', '10d', '10n', '11d', '11n', '13d', '13n', '50d', '50n'];
    for (icon of iconArray){
         if (icon === desc){
            document.getElementById('icon').src = './icons/' + icon + '.png';
        }
    }
}





