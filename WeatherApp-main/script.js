let weather = {
    "apiKey": "2a4897ed351abaa71baaf07e68d616c2",
    fetchWeather: function (city) {
        fetch(
                "http://api.openweathermap.org/data/2.5/weather?q="
                + city 
                + "&units=metric&appid=" 
                + this.apiKey
            )
            .then((response) => {
                if (!response.ok) {
                  alert("Nie znaleziono miasta.");
                  throw new Error("Nie znaleziono miasta.");
                }
                return response.json();
              })
              .then((data) => this.displayWeather(data));
          },
    displayWeather: function(data) {

        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name,icon,description,temp,humidity,speed)
        document.querySelector(".city").innerText = "Pogoda w " + name;
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/"+ icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText =
            "Wilgotność: " + humidity + "%";
        document.querySelector(".wind").innerText =
            "Prędkość wiatru: " + speed + " km/h";
        document.body.style.backgroundImage =
            "url('https://source.unsplash.com/1600x900/?" + name + "')";
        },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });

  document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

 // weather.fetchWeather("Rzeszów");