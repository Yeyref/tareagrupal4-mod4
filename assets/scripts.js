const API_KEY = 'e0c15b8e93223e5c828fbf46a5d20e5f';
const API_URL = 'http://api.openweathermap.org/data/2.5/weather';

async function getWeatherData(city, country) {
    const url = `${API_URL}?q=${city},${country}&appid=${API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Error al obtener los datos :(');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}
function kelvinToCelsius(kelvin) {
    return kelvin - 273.15;
}
document.getElementById('weather-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const city = document.getElementById('city').value;
    const country = document.getElementById('country').value;
    const data = await getWeatherData(city, country);
    if (data) {
        const tempCelsius = kelvinToCelsius(data.main.temp).toFixed(1);
        const tempMinCelsius = kelvinToCelsius(data.main.temp_min).toFixed(1);
        const tempMaxCelsius = kelvinToCelsius(data.main.temp_max).toFixed(1);

        document.getElementById('weather-info').innerHTML = `
            <h2>Weather in ${city}, ${country}</h2>
            <p>Temperature: ${tempCelsius} °C</p>
            <p>Min Temperature: ${tempMinCelsius} °C</p>
            <p>Max Temperature: ${tempMaxCelsius} °C</p>
        `;
    }
});
function delay(ms) {
    return new Promise(resolve => setTimeout(() => resolve('Información Enviada'), ms));
}

async function getDelayedMessage() {
    try {
        const message = await delay(2000);
        console.log(message);
    } catch (error) {
        console.error('Error:', error);
    }
}

getDelayedMessage();
