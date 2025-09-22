// Reemplaza con tu ciudad y tu API key de OpenWeatherMap
const apiKey = '744ed0f9b204254882ec2f354b7819ed';
const city = encodeURIComponent('La Paz, BO');

const currentWeatherDiv = document.getElementById('current-weather');
const forecastDiv = document.getElementById('forecast');

fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`)
  .then(res => res.json())
  .then(data => {
    // Mostrar clima actual
    const current = data.list[0];
    const temp = current.main.temp.toFixed(1);
    const desc = current.weather[0].description;
    currentWeatherDiv.innerHTML = `<p>Current: ${temp}°C - ${desc}</p>`;

    // Pronóstico de 3 días (cada 8 registros = 24h)
    let forecastHTML = '<h3>3-Day Forecast</h3>';
    for (let i = 0; i < 3; i++) {
      const day = data.list[i * 8];
      const dayTemp = day.main.temp.toFixed(1);
      const dayDesc = day.weather[0].description;
      forecastHTML += `<p>${day.dt_txt.split(' ')[0]}: ${dayTemp}°C - ${dayDesc}</p>`;
    }
    forecastDiv.innerHTML = forecastHTML;
  })
  .catch(err => {
    currentWeatherDiv.innerHTML = "<p>Weather data unavailable.</p>";
    console.error(err);
  });
