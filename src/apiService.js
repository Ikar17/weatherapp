export const getWeather = (city) => {
    const apiKey = "cbe1dc102e94da9d885a89a927b38bce";
    const limit = "1";

    return fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${apiKey}`)
    .then((res) => res.json())
    .then((localizations) => {
        const lat = localizations[0].lat;
        const lon = localizations[0].lon;
        return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        .then((res) => res.json())
        .then((city) => {
            return city;
        })
    })
}