let lat;
let long;
const apiKey = "b560e078761f8fc3e43b41a0c32119b4"

function startApp() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                lat = position.coords.latitude;
                long = position.coords.longitude;

                console.log("lat: ", lat, "long: ", long);

                getWeatherData();
            }
        );
    }
}

function getWeatherData() {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
    console.log(url);

    fetch(url)
        .then(function (response) {
            response.json().then(function (data) {
                console.log(data);
                updateWeatherData(data);
            });
        });
}

function updateWeatherData(data) {
    const city = data.name;
    document.getElementById("city").innerHTML = city;

    const temp = data.main.temp.toFixed();
    document.getElementById("temp").innerHTML = temp + " <sup>o</sup>C";

    const humi = data.main.humidity;
    document.getElementById("humidity").innerHTML = humi + "%";

    const press = data.main.pressure;
    document.getElementById("pressure").innerHTML = press + "hPa";

    const clouds = data.clouds.all;
    document.getElementById("cloudsPerc").innerHTML = clouds + "%";

    const wind = data.wind.speed.toFixed();
    document.getElementById("wind").innerHTML = wind + " km/h";

    const sunrise = new Date(data.sys.sunrise * 1000);
    document.getElementById("sunRise").innerHTML = sunrise.getHours() + ":" + sunrise.getMinutes();

    const sunset = new Date(data.sys.sunset * 1000);
    document.getElementById("sunSet").innerHTML = sunset.getHours() + ":" + sunset.getMinutes();

}