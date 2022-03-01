const api = 'b10cb66493392c08d398f6307803e489';

const iconImg = document.getElementById('weather-icon');
const loc = document.querySelector('#location');
const tempC = document.querySelector('.c');
const desc = document.querySelector('.desc');

window.addEventListener('load', () => {
  let long;
  let lat;
 
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric`;
      
      fetch(base)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const { temp } = data.main;
          const place = data.name;
          const { icon } = data.weather[0];
          const { sunrise, sunset } = data.sys;

          const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
          
      

          iconImg.src = iconUrl;
          loc.textContent = `${place}`;
          tempC.textContent = `${temp.toFixed(0)} °C`;
          
        });
    });
  }
});