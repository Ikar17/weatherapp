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
    viewElems.weatherInfoCity = getDOMElems("weatherInfoCity");
    viewElems.weatherInfoTemperature = getDOMElems("weatherInfoTemperature");
}

const setupListeners = () => {
    viewElems.searchInput.addEventListener("keydown", onEnterSubmit);
    viewElems.searchButton.addEventListener("click", onClickSubmit);
}

const initializeApp = () =>{
    connectHTMLElems();
    setupListeners();
}

const onEnterSubmit = (event) => {
    if(event.key === 'Enter'){
        const value = viewElems.searchInput.value;
        getWeather(value).then(data => {
            console.log(data);
        });
    }
};
const onClickSubmit = (event) => {
    const value = viewElems.searchInput.value;
    getWeather(value).then(data => {
        console.log(data);
    });
};

document.addEventListener("DOMContentLoaded", initializeApp);