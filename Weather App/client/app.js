document.addEventListener('DOMContentLoaded', function() {
        // Set up the API endpoint and key
        const apiKey = '32d13bfd8c41a615f07d8a932e8994ab'; 
        const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

        // Select DOM elements
        const searchButton = document.querySelector('button');
        const cityInput = document.getElementById('city');
        const weatherContainer = document.querySelector('.weather');

        // Function to fetch weather data from the API
        async function getWeather(city) {
            try {
                // Fetch weather data for the entered city
                const response = await fetch(`${apiUrl}?q=${city}&units=metric&appid=${apiKey}`);
                const data = await response.json();

                // Check if the response was successful
                if (data.cod === 200) {
                    // Get the weather icon code from the response
                    const iconCode = data.weather[0].icon;
                    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`; // Construct the image URL

                    // Create HTML elements to display the weather information
                    const weatherInfo = `
                        <h2>${data.name}, ${data.sys.country}</h2>
                        <img src="${iconUrl}" alt="${data.weather[0].description}" />
                        <p>${data.weather[0].description}</p>
                        <p>Temperature: ${data.main.temp}°C</p>
                        <p>Humidity: ${data.main.humidity}%</p>
                        <p>Wind Speed: ${data.wind.speed} m/s</p>
                    `;
                    weatherContainer.innerHTML = weatherInfo;
                } else {
                    weatherContainer.innerHTML = `<p>City not found. Please try again.</p>`;
                }
            } catch (error) {
                weatherContainer.innerHTML = `<p>There was an error fetching the weather data.</p>`;
            }
        }
        // Event listener for the search button
        searchButton.addEventListener('click', () => {
            const city = cityInput.value.trim();
            if (city) {
                getWeather(city); // Get the weather for the entered city
            } else {
                weatherContainer.innerHTML = `<p>Please enter a city name.</p>`;
            }
        });

        // Optional: Allow pressing Enter to search
        cityInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                searchButton.click();
            }
        });
    });
