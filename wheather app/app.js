const form = document.querySelector("form");
const search = document.querySelector("#search");
const weather = document.querySelector("#weather");

const getWeather = async (city) => {
    weather.innerHTML = "<h2>Loading...</h2>";
    
    const API_KEY = "0433dfbccf444e51971115509242711";
    const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`;


    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();
        showWeather(data);
    } catch (error) {
        weather.innerHTML = "<h2>City Not Found</h2>";
    }
};

const showWeather = (data) => {
    weather.innerHTML = `
        <div>
            <img src="${data.current.condition.icon}" alt="Weather Icon">
        </div>
        <div>
            <h2>${data.current.temp_c} ℃</h2>
            <h4>${data.current.condition.text}</h4>
        </div>
    `;
};

form.addEventListener("submit", function (event) {
    getWeather(search.value);
    event.preventDefault();
});
