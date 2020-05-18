const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const msgFour = document.querySelector('#msg-4');
const msgFive = document.querySelector('#msg-5');
const msgSix = document.querySelector('#msg-6');

const card = document.querySelector('.card');
const cardHeader = document.querySelector('.cardHeader');
const cardBody = document.querySelector('.cardBody');

// const weatherDesc = document.getElementById('descSpan');
// const city = document.querySelector('.title');

const[msgOne, WeatherDescription, tTemperature, weatherIconImg, WeatherDescriptions, bTemperature, tempFeelLike, pressure, humidity, windSpeed, windDir, cloudiness, country, timeZone, cityName, coordinates, sunRise, sunSet, dataRecievedAt, seaLevel, groundLevel] = [
    document.querySelector('#msg-1'),
    document.querySelector('.WeatherDescription'),
    document.querySelector('#tTemperature'),
    document.querySelector('#weatherIcon-img'),
    document.getElementById("weather").querySelectorAll(".WeatherDescription"),
    document.querySelector('#bTemperature'),
    document.querySelector('#tempFeelLike'),
    document.querySelector('#pressure'),
    document.querySelector('#humidity'),
    document.querySelector('#windSpeed'),
    document.querySelector('#windDir'),
    document.querySelector('#cloudiness'),




    document.querySelector('#country'),
    document.querySelector('#timeZone'),
    document.querySelector('#cityName'),
    document.querySelector('#coordinates'),
    document.querySelector('#sunRise'),
    document.querySelector('#sunSet'),
    document.querySelector('#dataRecievedAt'),
    document.querySelector('#seaLevel'),
    document.querySelector('#groundLevel')
]

// initial value for cards
card.style.display = "none";
cardHeader.style.display = "none";
cardBody.style.display = "none";




weatherForm.addEventListener('submit', (e) => {
    e.preventDefault(); //stop refresh page

    const location = search.value; // getting value from input user provided
    msgOne.textContent = 'Loading Please wait ...';

        fetch('/weather?address=' + location ).then((res) => {
            res.json().then((data) => {
                if(data.error) {
                    msgOne.textContent = data.error;
                    search.style.cssText = "border: 3px solid red"
                }
                else {
                    msgOne.textContent = data.location;
                    msgOne.style.cssText = "color: #fff; font-size: 18px"; 
                    search.style.cssText = "border: 3px solid lawngreen"

                    setInterval(() => {
                        msgOne.style.visibility = (msgOne.style.visibility == 'hidden' ? '' : 'hidden');
                        cardHeader.style.display = "block"
                    }, 2000);
                
                        // Weather in brief
                        card.style.display = "block";
                        cardHeader.style.display = "block"

                        WeatherDescription.textContent = data.description;
                        weatherIconImg.src = "https://openweathermap.org/img/w/" + data.weatherIcon + ".png";
                        tTemperature.textContent = data.temperature;
                        msgFour.textContent = data.humidity;
                        msgFive.textContent =  data.feeltemp;
                        msgSix.textContent = data.cityName;

                    // weather in deatils
                    cardBody.style.display = "block";

                        country.textContent = data.countryname;
                        timeZone.textContent = data.timeZone; 
                        // console.log(new Date().toString().match(/([A-Z]+[\+-][0-9]+)/)[1]);
                        
                        cityName.textContent = data.cityName;
                        coordinates.textContent = "lat : " + data.latitude + ", " + "lon : " + data.longitude;




                        // sunrise data conversion from unix to nomal 
                        const riseMilliseconds = data.sunRise * 1000 ;
                        const dateObjectOne = new Date(riseMilliseconds);
                        const finalDataSinRize = dateObjectOne.toLocaleString("en-IN", {hour: "numeric", minute: "numeric", second: "numeric"});
                        sunRise.textContent = finalDataSinRize;


                        // sunSet data conversion from unix to nomal 
                        const setMilliseconds = data.sunSet * 1000 ;
                        const dateObjectThree = new Date(setMilliseconds);
                        const finalDataSet = dateObjectThree.toLocaleString("en-IN", {hour: "numeric", minute: "numeric", second: "numeric"});
                        sunSet.textContent = finalDataSet;
                        
                        // changing data form UNIX format to normal format
                        const milliseconds = data.dataRecieve * 1000 ;
                        const dateObjectTwo = new Date(milliseconds);
                        const finalDataDataRecieve = dateObjectTwo.toLocaleString("en-IN", {timeZoneName: "short"});
                        dataRecievedAt.textContent = finalDataDataRecieve;


                        seaLevel.textContent = data.seaLevel + "hPa";
                        groundLevel.textContent = data.groundLevel + "hPa";


                        WeatherDescriptions[0].textContent = data.description;
                        WeatherDescriptions[1].src = "https://openweathermap.org/img/w/" + data.weatherIcon + ".png";
                        bTemperature.textContent = data.temperature + "°C";
                        tempFeelLike.textContent =data.feeltemp + "°C";
                        pressure.textContent = data.pressure + "hPa";
                        humidity.textContent = data.humidity + "%";
                        windSpeed.textContent = data.windSpeed + "m/sec";

                        // wind direction config
                        windDir.textContent = ((i) => {
                            if(i >= 349 && i <= 11){
                                    return +i + "° ↑ N";
                            } else if (i >= 12 && i <= 33) {
                                    return +i + "° -=- NNE";
                            } else if (i >= 34 && i <= 56) {
                                    return +i + "° ↗ NE";
                            } else if (i >= 57 && i <= 78) {
                                    return +i + "° -=- ENE";
                            } else if (i >= 79 && i <= 101) {
                                    return +i + "° → E";
                            } else if (i >= 102 && i <= 123) {
                                    return +i + "° -=- ESE";
                            } else if (i >= 124 && i <= 146) {
                                    return +i + "° ↘ SE";
                            } else if (i >= 147 && i <= 168) {
                                    return +i + "° -=- SSE";
                            } else if (i >= 169 && i <= 191) {
                                    return +i + "° ↓ S";
                            } else if (i >= 192 && i <= 213) {
                                    return +i + "° -=- SSW";
                            } else if (i >= 214 && i <= 236) {
                                    return +i + "° ↙ SW";
                            } else if (i >= 237 && i <= 258) {
                                    return +i + "° -=- WSW";
                            } else if (i >= 259 && i <= 281) {
                                    return +i + "° ← W";
                            } else if (i >= 282 && i <= 303) {
                                    return +i + "° -=- WNW";
                            } else if (i >= 304 && i <= 326) {
                                    return +i + "° ↖ NW";
                            } else if (i >= 327 && i <= 348) {
                                    return +i + "° -=- NNW";
                            }
                        })(data.windDir);


                        cloudiness.textContent = data.cloudiness + "%";



                    console.log(data.description);               
                 }

                console.log(data);
                
            }) 
        }) // fetch api used

})





// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
}


// for header scroll
$(window).scroll(function() {
        if ($(this).scrollTop() > 80){
        $('header').addClass('sticky');
        $('.navbar-brand').addClass('sticky-nav-brand ');
        $('.nav-link').addClass('sticky-nav-link ');
        $('.bar1').addClass('bar1-black');
        $('.bar2').addClass('bar2-black');
        $('.bar3').addClass('bar3-black');

        }
        else{
        $('header').removeClass('sticky');
        $('.navbar-brand').removeClass('sticky-nav-brand ');
        $('.nav-link').removeClass('sticky-nav-link ');
        $('.bar1').removeClass('bar1-black');
        $('.bar2').removeClass('bar2-black');
        $('.bar3').removeClass('bar3-black');
        }
  });


  //menu icon js
  function myFunction(x) {
        x.classList.toggle("change");
      }