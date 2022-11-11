
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

const onEnterSubmit = () => {};
const onClickSubmit = () => {};

document.addEventListener("DOMContentLoaded", initializeApp);