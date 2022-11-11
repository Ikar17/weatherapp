import {getWeather} from './apiService.js'

let viewElems = {};

const getDOMElems = (id) => {
    return document.getElementById(id);
}

const connectHTMLElems = () =>{
    viewElems.mainContainer = getDOMElems("mainContainer");
    viewElems.weatherSearchView = getDOMElems("weatherSearchView");

    viewElems.searchInput = getDOMElems("searchInput");
    viewElems.searchButton = getDOMElems("searchButton");

    viewElems.weatherForecastView = getDOMElems("weatherForecastView");
    viewElems.returnButton = getDOMElems("returnButton");

    viewElems.weatherInfoCity = getDOMElems("weatherInfoCity");
    viewElems.weatherInfoTemperature = getDOMElems("weatherInfoTemperature");

    viewElems.city = getDOMElems("city");
    viewElems.cityIcon = getDOMElems("cityIcon");
    viewElems.curr_temp = getDOMElems("curr_temp");
    viewElems.min_temp = getDOMElems("min_temp");
    viewElems.max_temp = getDOMElems("max_temp");
}

const setupListeners = () => {
    viewElems.searchInput.addEventListener("keydown", onEnterSubmit);
    viewElems.searchButton.addEventListener("click", onClickSubmit);
    viewElems.returnButton.addEventListener("click", returnToSearch);
}

const initializeApp = () =>{
    connectHTMLElems();
    setupListeners();
}

const onEnterSubmit = (event) => {
    if(event.key === 'Enter'){
        fadeInOut();
        const value = viewElems.searchInput.value;
        getWeather(value).then(data => {
            console.log(data);
            switchView();
            displayWeatherData(data);
            fadeInOut();
        });
    }
};
const onClickSubmit = (event) => {
    fadeInOut();
    const value = viewElems.searchInput.value;
    getWeather(value).then(data => {
        console.log(data);
        switchView();
        displayWeatherData(data);
        fadeInOut();
    });
};

const fadeInOut = () => {
    if(viewElems.mainContainer.style.opacity==='1' || viewElems.mainContainer.style.opacity === '' ){
        viewElems.mainContainer.style.opacity = '0';
    }else{
        viewElems.mainContainer.style.opacity = '1';
    }
}

const switchView = () => {
    if(viewElems.weatherSearchView.style.display !== 'none'){
        viewElems.weatherSearchView.style.display = 'none';
        viewElems.weatherForecastView.style.display = 'flex';
    }else{
        viewElems.weatherForecastView.style.display = 'none';
        viewElems.weatherSearchView.style.display = 'flex';
    }
}

const returnToSearch = () => {
    fadeInOut();
    setTimeout(()=>{
        switchView();
        fadeInOut();
    },500);
}

const displayWeatherData = (data) => {
    viewElems.city.innerText = data.name;
    const icon = data.weather[0].icon;
    viewElems.cityIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    let curr_temp = Math.round(data.main.temp)-273;
    let min_temp = Math.round(data.main.temp_min)-273;
    let max_temp = Math.round(data.main.temp_max)-273;
    viewElems.curr_temp.innerText = `Current temperature: ${curr_temp}°C`;
    viewElems.min_temp.innerText = `Min. temperature: ${min_temp}°C`;
    viewElems.max_temp.innerText = `Max. temperature: ${max_temp}°C`;
}

document.addEventListener("DOMContentLoaded", initializeApp);