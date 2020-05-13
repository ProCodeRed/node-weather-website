// clientside js 
console.log('client side js is running');


// fetch('http://localhost:3000/weather?address=!').then((res) => {
//     res.json().then((data) => {
//         if(data.error) {
//             console.log(data.error)
//         }
//         else {
//             console.log(data.location);
//             console.log(data.forecast)
//         }
//     })
// }) // fetch api used this is how it is used

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msgOne = document.querySelector('#msg-1');
const msgTwo = document.querySelector('#msg-2');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault(); //stop refresh page

    const location = search.value; // getting value from input user provided
    msgOne.textContent = 'Loading Please wait ...';
    msgTwo.textContent = '';

        fetch('http://localhost:3000/weather?address=' + location).then((res) => {
            res.json().then((data) => {
                if(data.error) {
                    msgOne.textContent = data.error;
                }
                else {
                    msgOne.textContent = data.location;
                    msgTwo.textContent = data.forecast;
                }
            })
        }) // fetch api used
})