// API CALL https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

// API KEY 6ba36869088d690b197fddb2f2b348d2

//API COORDINATES BY CITY NAME http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key} 
    //Ex: https://api.openweathermap.org/geo/1.0/direct?q=London&limit=1&appid=6ba36869088d690b197fddb2f2b348d2









var cityName = "Richmond"

//getting api for city to lat long conversion
var Coords = ("https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=6ba36869088d690b197fddb2f2b348d2");

//returned JSON to get Lat and Lon

fetch(Coords).then(function(response) {
    
    response.json().then(function(data) {
        //console.log(data[0].lat);
        console.log("https://api.openweathermap.org/data/2.5/onecall?lat=" + data[0].lat + "&lon=" + data[0].lon + "&appid=6ba36869088d690b197fddb2f2b348d2")
    });
    

});





//logging weather data for searched city
//console.log("https://api.openweathermap.org/data/2.5/onecall?lat=" + Coords.lat + "&lon=" + Coords.lon + "&appid=6ba36869088d690b197fddb2f2b348d2")

