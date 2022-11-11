import { getWeather } from './apiService.js'
import { connectHTMLElems } from './DOMService.js'

class WeatherApp{
    constructor(){
        let viewElems = {};
        this.createDOMList();
        this.setupListeners();
    }

    createDOMList = () =>{
        let list = Array.from(document.querySelectorAll('[id]')).map(elem => elem.id);
        this.viewElems = connectHTMLElems(list);
        console.log(this.viewElems);
    }

    setupListeners = () => {
        this.viewElems.searchInput.addEventListener("keydown", this.onSubmit);
        this.viewElems.searchButton.addEventListener("click", this.onSubmit);
        this.viewElems.returnButton.addEventListener("click", this.returnToSearch);
    }

    onSubmit = (event) => {
        if(event.key === 'Enter' || event.type==='click'){
            this.fadeInOut();
            const value = this.viewElems.searchInput.value;
            getWeather(value).then(data => {
                this.viewElems.searchInput.style.borderColor = "black";
                this.viewElems.searchError.classList.remove('weather-info_search-view_error');
                this.viewElems.searchError.innerText = "";
                this.switchView();
                this.displayWeatherData(data);
                this.fadeInOut();
            })
            .catch(err => {
                this.viewElems.searchInput.style.borderColor = "red";
                this.viewElems.searchError.classList.add('weather-info_search-view_error');
                this.viewElems.searchError.innerText = "Incorrect city";
                this.fadeInOut();
            });
        }
    }

    fadeInOut = () => {
        if(this.viewElems.mainContainer.style.opacity==='0.95' || this.viewElems.mainContainer.style.opacity === '' ){
            this.viewElems.mainContainer.style.opacity = '0';
        }else{
            this.viewElems.mainContainer.style.opacity = '0.95';
        }
    }

    switchView = () => {
        if(this.viewElems.weatherSearchView.style.display !== 'none'){
            this.viewElems.weatherSearchView.style.display = 'none';
            this.viewElems.weatherForecastView.style.display = 'flex';
        }else{
            this.viewElems.weatherForecastView.style.display = 'none';
            this.viewElems.weatherSearchView.style.display = 'flex';
        }
    }

    returnToSearch = () => {
        this.fadeInOut();
        setTimeout(()=>{
            this.switchView();
            this.viewElems.searchInput.value = " ";
            this.fadeInOut();
        },500);
    }

    displayWeatherData = (data) => {
        this.viewElems.city.innerText = data.name;
        const icon = data.weather[0].icon;
        this.viewElems.cityIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        this.viewElems.cityIcon.alt = data.weather[0].description;
        let curr_temp = Math.round(data.main.temp)-273;
        let min_temp = Math.round(data.main.temp_min)-273;
        let max_temp = Math.round(data.main.temp_max)-273;
        this.viewElems.curr_temp.innerText = `Current temperature: ${curr_temp}°C`;
        this.viewElems.min_temp.innerText = `Min. temperature: ${min_temp}°C`;
        this.viewElems.max_temp.innerText = `Max. temperature: ${max_temp}°C`;
    }

}


document.addEventListener("DOMContentLoaded", new WeatherApp());
