const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msgOne = document.querySelector('#msg-1');
const msgTwo = document.querySelector('#msg-2');
const mainDiv = document.querySelector('#myData')





weatherForm.addEventListener('submit', (e) => {
    e.preventDefault(); //stop refresh page

    const location = search.value; // getting value from input user provided
    msgOne.textContent = 'Loading Please wait ...';
    msgTwo.textContent = '';

        fetch('/weather?address=' + location).then((res) => {
            res.json().then((data) => {
                if(data.error) {
                    msgOne.textContent = data.error;
                }
                else {
                    msgOne.textContent = data.location;
                    msgOne.style.color = 'green';
                    setInterval(() => {
                        msgOne.style.visibility = (msgOne.style.visibility == 'hidden' ? '' : 'hidden');
                    }, 2000);
                    msgTwo.textContent = data.forecast;
                    
                    const humidity = document.createElement('P');
                    humidity.textContent = "humidity :" + data.forecast[0];
                    mainDiv.appendChild(humidity);
                }
                
            }) 
        }) // fetch api used



        // fetch('/weather?address=' + location).then((res) => res.json()).then((data) => console.log(data))
        // .catch((err) => console.log('Wrong city name!'))

})