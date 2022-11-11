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

document.addEventListener("DOMContentLoaded", initializeApp);