// API CALL https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

// API KEY 6ba36869088d690b197fddb2f2b348d2

//API COORDINATES BY CITY NAME http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key} 
    //Ex: https://api.openweathermap.org/geo/1.0/direct?q=London&limit=1&appid=6ba36869088d690b197fddb2f2b348d2



/////////////////////////////////////


// var cityName = "Richmond"

//getting api for city to lat long conversion
// var ApiCoords = ("https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=6ba36869088d690b197fddb2f2b348d2");

//returned JSON to get Lat and Lon

// fetch(ApiCoords).then(function(response) {
    
//     response.json().then(function(data) {
//         //console.log(data[0].lat);
//         console.log("https://api.openweathermap.org/data/2.5/onecall?lat=" + data[0].lat + "&lon=" + data[0].lon + "&appid=6ba36869088d690b197fddb2f2b348d2")
//     });
    
// });


/////////////////////////////////////
var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city-input");
var weatherSpecsEl = document.querySelector("#weather-specs");
var locationEl = document.querySelector("#location");
var forecastOneEl = document.querySelector("#forecast-1");
var forecastTwoEl = document.querySelector("#forecast-2");
var forecastThreeEl = document.querySelector("#forecast-3");
var forecastFourEl = document.querySelector("#forecast-4");
var forecastFiveEl = document.querySelector("#forecast-5");


var formSubmitHandler = function(event) {
    event.preventDefault();
    
    //gets value from input element
    var city = cityInputEl.value.trim();

    if(city) {
        getCityCoords(city);
        cityInputEl.value="";
        weatherSpecsEl.textContent="";
        getCityName(city);
    } else {
        alert("Please enter a City");
    }
  };



cityFormEl.addEventListener("submit", formSubmitHandler);



var getCityCoords = function(city) {
    //format the github api url
    var ApiCoords = ("https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=6ba36869088d690b197fddb2f2b348d2");

    //make a request to the url
    fetch(ApiCoords).then(function(response) {
        if (response.ok) {
        response.json().then(function(data) {
            var selectedCity = ("https://api.openweathermap.org/data/2.5/onecall?lat=" + data[0].lat + "&lon=" + data[0].lon + "&units=imperial&appid=6ba36869088d690b197fddb2f2b348d2");
            displayWeather(selectedCity);
            // console.log(ApiCoords)
            displayForecast(selectedCity);
            displayForecast2(selectedCity);
            displayForecast3(selectedCity);
            displayForecast4(selectedCity);
            displayForecast5(selectedCity);
        });
        } else {
            alert("Error: City Not Found")
        } 
       
    })
    .catch(function(error) {
        //notice this `.catch()` getting chained onto the end of the ` .then()` method
        alert("Unable to connect to openweathermap.org");
    });
};






var displayWeather = function(selectedCity) {
     
    fetch(selectedCity).then(function(response) {
    
            response.json().then(function(data) {

                //Displays Icon
                //console.log(data.current.weather[0].icon);
                var currentIconEl = document.createElement("img")
                currentIconEl.src = "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png"
                weatherSpecsEl.append(currentIconEl)

                //Displays current Temp
                var currentTempEl = document.createElement("p")
                currentTempEl.textContent = "Temp: " + data.current.temp + " \xB0F"
                weatherSpecsEl.append(currentTempEl);

                //Displays current wind
                var currentWindEl = document.createElement("p")
                currentWindEl.textContent = "Wind: " + data.current.wind_speed + " MPH"
                weatherSpecsEl.append(currentWindEl);

                //Displays current humidity
                var currentHumidityEl = document.createElement("p")
                currentHumidityEl.textContent = "Humidity: " + data.current.humidity + " %"
                weatherSpecsEl.append(currentHumidityEl);

                //Displays current UV Index
                var currentUVIndexEl = document.createElement("p")
                currentUVIndexEl.textContent = "UV Index: " + data.current.uvi
                weatherSpecsEl.append(currentUVIndexEl);
               

            });
            
    });
    

} ;





  // var currentWeatherEl = document.createElement("p");
    // currentWeatherEl.textContent = selectedCity
    // weatherSpecsEl.appendChild(currentWeatherEl);



    var getCityName = function(city) {
        //format the github api url
        var cityName = ("https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=6ba36869088d690b197fddb2f2b348d2");
    
        //make a request to the url
        fetch(cityName).then(function(response) {
            response.json().then(function(data) {

                
            var currentWeatherEl = document.createElement("h3");
            currentWeatherEl.textContent = data[0].name + " (" + moment().format('l') + ")"
            weatherSpecsEl.classList.add('weather-specs');
            weatherSpecsEl.append(currentWeatherEl);

            

            });
        })
    };



/////////////////////////////////5 day Forecasting/////////////////////////////////


/////////////Day 1/////////////////
    var displayForecast = function(selectedCity) {
     
        fetch(selectedCity).then(function(response) {
        
                response.json().then(function(data) {

                    //Displays Date
                    var DateEl = document.createElement("h5")
                    DateEl.textContent = moment().add(1, 'days').format('l')
                    forecastOneEl.append(DateEl);
                    
                    //Displays Icon
                    //console.log(data.daily[0].weather[0].icon);
                    var currentIconEl = document.createElement("img")
                    currentIconEl.src = "http://openweathermap.org/img/wn/" + data.daily[0].weather[0].icon + ".png"
                    forecastOneEl.append(currentIconEl)
    
                    //Displays current Temp
                    var TempEl = document.createElement("p")
                    TempEl.textContent = "Temp: " + data.daily[0].temp.day + " \xB0F"
                    forecastOneEl.append(TempEl);
    
                    //Displays current wind
                    var WindEl = document.createElement("p")
                    WindEl.textContent = "Wind: " + data.daily[0].wind_speed + " MPH"
                    forecastOneEl.append(WindEl);
    
                    //Displays current humidity
                    var HumidityEl = document.createElement("p")
                    HumidityEl.textContent = "Humidity: " + data.daily[0].humidity + " %"
                    forecastOneEl.append(HumidityEl);
    
                    //Displays current UV Index
                    var UVIndexEl = document.createElement("p")
                    UVIndexEl.textContent = "UV Index: " + data.daily[0].uvi
                    forecastOneEl.append(UVIndexEl);

                    forecastOneEl.classList.add('forecast-box');
                   
    
                });
                
        });
        
    
    } ;

/////////////Day 2/////////////////

var displayForecast2 = function(selectedCity) {
     
    fetch(selectedCity).then(function(response) {
    
            response.json().then(function(data) {

                //Displays Date
                var DateEl = document.createElement("h5")
                DateEl.textContent = moment().add(2, 'days').format('l')
                forecastTwoEl.append(DateEl);

                //Displays Icon
                var IconEl = document.createElement("img")
                IconEl.src = "http://openweathermap.org/img/wn/" + data.daily[1].weather[0].icon + ".png"
                forecastTwoEl.append(IconEl)

                //Displays current Temp
                var TempEl = document.createElement("p")
                TempEl.textContent = "Temp: " + data.daily[1].temp.day + " \xB0F"
                forecastTwoEl.append(TempEl);

                //Displays current wind
                var WindEl = document.createElement("p")
                WindEl.textContent = "Wind: " + data.daily[1].wind_speed + " MPH"
                forecastTwoEl.append(WindEl);

                //Displays current humidity
                var HumidityEl = document.createElement("p")
                HumidityEl.textContent = "Humidity: " + data.daily[1].humidity + " %"
                forecastTwoEl.append(HumidityEl);

                //Displays current UV Index
                var UVIndexEl = document.createElement("p")
                UVIndexEl.textContent = "UV Index: " + data.daily[1].uvi
                forecastTwoEl.append(UVIndexEl);

                forecastTwoEl.classList.add('forecast-box');
               

            });
            
    });
    

} ;

/////////////Day 3/////////////////
var displayForecast3 = function(selectedCity) {
     
    fetch(selectedCity).then(function(response) {
    
            response.json().then(function(data) {

                //Displays Date
                var DateEl = document.createElement("h5")
                DateEl.textContent = moment().add(3, 'days').format('l')
                forecastThreeEl.append(DateEl);

                //Displays Icon
                var IconEl = document.createElement("img")
                IconEl.src = "http://openweathermap.org/img/wn/" + data.daily[2].weather[0].icon + ".png"
                forecastThreeEl.append(IconEl)

                //Displays current Temp
                var TempEl = document.createElement("p")
                TempEl.textContent = "Temp: " + data.daily[2].temp.day + " \xB0F"
                forecastThreeEl.append(TempEl);

                //Displays current wind
                var WindEl = document.createElement("p")
                WindEl.textContent = "Wind: " + data.daily[2].wind_speed + " MPH"
                forecastThreeEl.append(WindEl);

                //Displays current humidity
                var HumidityEl = document.createElement("p")
                HumidityEl.textContent = "Humidity: " + data.daily[2].humidity + " %"
                forecastThreeEl.append(HumidityEl);

                //Displays current UV Index
                var UVIndexEl = document.createElement("p")
                UVIndexEl.textContent = "UV Index: " + data.daily[2].uvi
                forecastThreeEl.append(UVIndexEl);

                forecastThreeEl.classList.add('forecast-box');
               

            });
            
    });
    

} ;


/////////////Day 4/////////////////
var displayForecast4 = function(selectedCity) {
     
    fetch(selectedCity).then(function(response) {
    
            response.json().then(function(data) {

                //Displays Date
                var DateEl = document.createElement("h5")
                DateEl.textContent = moment().add(4, 'days').format('l')
                forecastFourEl.append(DateEl);

                //Displays Icon
                var IconEl = document.createElement("img")
                IconEl.src = "http://openweathermap.org/img/wn/" + data.daily[3].weather[0].icon + ".png"
                forecastFourEl.append(IconEl)

                //Displays current Temp
                var TempEl = document.createElement("p")
                TempEl.textContent = "Temp: " + data.daily[3].temp.day + " \xB0F"
                forecastFourEl.append(TempEl);

                //Displays current wind
                var WindEl = document.createElement("p")
                WindEl.textContent = "Wind: " + data.daily[3].wind_speed + " MPH"
                forecastFourEl.append(WindEl);

                //Displays current humidity
                var HumidityEl = document.createElement("p")
                HumidityEl.textContent = "Humidity: " + data.daily[3].humidity + " %"
                forecastFourEl.append(HumidityEl);

                //Displays current UV Index
                var UVIndexEl = document.createElement("p")
                UVIndexEl.textContent = "UV Index: " + data.daily[3].uvi
                forecastFourEl.append(UVIndexEl);

                forecastFourEl.classList.add('forecast-box');
               

            });
            
    });
    

} ;

/////////////Day 5/////////////////
var displayForecast5 = function(selectedCity) {
     
    fetch(selectedCity).then(function(response) {
    
            response.json().then(function(data) {

                //Displays Date
                var DateEl = document.createElement("h5")
                DateEl.textContent = moment().add(5, 'days').format('l')
                forecastFiveEl.append(DateEl);

                //Displays Icon
                var IconEl = document.createElement("img")
                IconEl.src = "http://openweathermap.org/img/wn/" + data.daily[4].weather[0].icon + ".png"
                forecastFiveEl.append(IconEl)

                //Displays current Temp
                var TempEl = document.createElement("p")
                TempEl.textContent = "Temp: " + data.daily[4].temp.day + " \xB0F"
                forecastFiveEl.append(TempEl);

                //Displays current wind
                var WindEl = document.createElement("p")
                WindEl.textContent = "Wind: " + data.daily[4].wind_speed + " MPH"
                forecastFiveEl.append(WindEl);

                //Displays current humidity
                var HumidityEl = document.createElement("p")
                HumidityEl.textContent = "Humidity: " + data.daily[4].humidity + " %"
                forecastFiveEl.append(HumidityEl);

                //Displays current UV Index
                var UVIndexEl = document.createElement("p")
                UVIndexEl.textContent = "UV Index: " + data.daily[4].uvi
                forecastFiveEl.append(UVIndexEl);

                forecastFiveEl.classList.add('forecast-box');
               

            });
            
    });
    

} ;