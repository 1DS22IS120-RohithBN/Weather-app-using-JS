document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "fe35dd07bd8b43906402a8bba0f1b20e";
    const url = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric&q=`;

    const searchButton = document.querySelector(".search button");
    const searchInput = document.querySelector(".search input");
    const searchimg=document.querySelector(".weather img");

    async function checkWeather(city) {
        try {
            const response = await fetch(url + city);
            if (!response.ok) {
                throw new Error("City not found");
            }
            const data = await response.json();
            console.log(data);

            if(data.weather[0].main=="Clouds"){
                searchimg.src="images/clouds.png"
            }
            else if(data.weather[0].main=="Clear"){
                searchimg.src="images/clear.png"
            }
            else if(data.weather[0].main=="Drizzle"){
                searchimg.src="images/drizzle.png"
            }
            else if(data.weather[0].main=="Mist"){
                searchimg.src="images/mist.png"
            }
            else if(data.weather[0].main=="Rain"){
                searchimg.src="images/rain.png"
            }
            else if(data.weather[0].main=="Snow"){
                searchimg.src="images/snow.png"
            }
            const temp = Math.round(data.main.temp);
            document.querySelector(".temp h1").textContent = temp + "°C";
            document.querySelector(".area h2").textContent = data.name;
            document.querySelector(".humidity").textContent = data.main.humidity + "%";
            document.querySelector(".windspeed").textContent = data.wind.speed + " km/h";
        } catch (error) {
            console.error("Error fetching weather data: ", error);
            alert("Could not fetch weather data. Please try again.");
        }
    }

    searchButton.addEventListener("click", () => {
        const city = searchInput.value.trim();
        if (city) {
            checkWeather(city);
        } else {
            alert("Please enter a city name.");
        }
    });
});
