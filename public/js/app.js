const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const msgOne = document.querySelector('#msg-1');
const msgTwo = document.querySelector('#msg-2');
const msgThree = document.querySelector('#msg-3');
const msgFour = document.querySelector('#msg-4');
const msgFive = document.querySelector('#msg-5');
const msgSix = document.querySelector('#msg-6');

const card = document.querySelector('.card');
const cardHeader = document.querySelector('.cardHeader');
const cardBody = document.querySelector('.cardBody');

const weatherDesc = document.getElementById('descSpan');
const city = document.querySelector('.title');
const temperature = document.querySelector('.subtitle');
const weatherIconImg = document.querySelector('#weatherIcon-img');

// defining for Topographical details
const[country, timeZone, cityName, coordinates, sunRise, sunSet, dataRecievedAt, seaLevel, groundLevel] = [
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
                }
                else {
                    msgOne.textContent = data.location;
                    msgOne.style.cssText = "color: green; font-size: 25px"; 

                    setInterval(() => {
                        msgOne.style.visibility = (msgOne.style.visibility == 'hidden' ? '' : 'hidden');
                        cardHeader.style.display = "block"
                    }, 2000);

                    setInterval(() => {
                        card.style.display = "block";
                        cardHeader.style.display = "block"

                        msgTwo.textContent = data.description;
                        weatherIconImg.src = "http://openweathermap.org/img/w/" + data.weatherIcon + ".png";
                        msgThree.textContent = data.temperature;
                        msgFour.textContent = data.humidity;
                        msgFive.textContent =  data.feeltemp;
                        msgSix.textContent = data.cityName;

                    }, 1000);

                    setInterval(() => {
                        cardBody.style.display = "block";

                        country.textContent = data.countryname;
                        timeZone.textContent = data.timeZone;
                        cityName.textContent = data.cityName;
                        coordinates.textContent = "lat : " + data.latitude + ", " + "lon : " + data.longitude;
                        sunRise.textContent = data.sunRise,
                        sunSet.textContent = data.sunSet,
                        dataRecievedAt.textContent = data.dataRecieve,
                        seaLevel.textContent = data.seaLevel,
                        groundLevel.textContent = data.groundLevel

                    }, 1500);


                    console.log(data.description);               
                 }

                console.log(data);
                
            }) 
        }) // fetch api used

})