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
            var selectedCity = ("https://api.openweathermap.org/data/2.5/onecall?lat=" + data[0].lat + "&lon=" + data[0].lon + "&appid=6ba36869088d690b197fddb2f2b348d2");
            displayWeather(selectedCity);
            // console.log(ApiCoords)
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
                //console.log(data);

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

                
            console.log(data)
            var currentWeatherEl = document.createElement("h3");
            currentWeatherEl.textContent = data[0].name + " (" +moment().subtract(10, 'days').calendar() +")"
            weatherSpecsEl.append(currentWeatherEl);
            });
        })
    };

    
