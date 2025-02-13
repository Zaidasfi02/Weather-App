let tempCelsius = null; // Store temperature in Celsius
let isCelsius = true; // Toggle state

document.getElementById("searchBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value;
  const apiKey = "3bd28d5ddedac484d33d74f65518854a"; // Replace with your API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === "404") {
        document.getElementById("errorMessage").innerText = "City not found!";
        document.getElementById("weatherInfo").style.display = "none";
      } else {
        tempCelsius = data.main.temp; // Store temperature in Celsius
        isCelsius = true; // Reset toggle state

        document.getElementById("cityName").innerText = data.name;
        document.getElementById(
          "temperature"
        ).innerText = `Temperature: ${tempCelsius}°C`;
        document.getElementById(
          "humidity"
        ).innerText = `Humidity: ${data.main.humidity}%`;
        document.getElementById(
          "windSpeed"
        ).innerText = `Wind Speed: ${data.wind.speed} m/s`;
        document.getElementById("description").innerText =
          data.weather[0].description;
        document.getElementById(
          "weatherIcon"
        ).src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        document.getElementById("weatherInfo").style.display = "block";
        document.getElementById("errorMessage").innerText = "";
        changeBackground(data.weather[0].main);
      }
    })
    .catch((error) => console.log(error));
});

function changeBackground(weather) {
  let backgroundImage = "";

  if (weather === "Clear") {
    backgroundImage =
      "/images/sunny.jpg.png"; // Sunny
  } else if (weather === "Clouds") {
    backgroundImage =
      "https://images.pexels.com/photos/531767/pexels-photo-531767.jpeg"; // Cloudy
  } else if (weather === "Rain") {
    backgroundImage =
      "https://images.pexels.com/photos/110874/pexels-photo-110874.jpeg"; // Rainy
  } else if (weather === "Snow") {
    backgroundImage =
      "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg"; // Snowy
  } else if (weather === "Thunderstorm") {
    backgroundImage =
      "https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg"; // Thunderstorm
  } else if (weather === "Mist" || weather === "Fog") {
    backgroundImage =
      "https://images.pexels.com/photos/110874/pexels-photo-110874.jpeg"; // Foggy
  } else {
    backgroundImage =
      "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg"; // Default
  }

  // Apply styling background image
  document.body.style.backgroundImage = `url('${backgroundImage}')`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundAttachment = "fixed";
}
// Temperature Toggle Button
document.getElementById("toggleTemp").addEventListener("click", () => {
  if (tempCelsius !== null) {
    if (isCelsius) {
      let tempFahrenheit = (tempCelsius * 9) / 5 + 32; // Convert to Fahrenheit
      document.getElementById(
        "temperature"
      ).innerText = `Temperature: ${tempFahrenheit.toFixed(2)}°F`;
    } else {
      document.getElementById(
        "temperature"
      ).innerText = `Temperature: ${tempCelsius}°C`;
    }
    isCelsius = !isCelsius; // Toggle state
  }
});
