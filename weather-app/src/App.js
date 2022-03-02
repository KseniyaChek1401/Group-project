import React, {useState} from 'react'
import './App.css'
function App() {

const apiKey = 'f8c53282ec9260dc4013de135a8568e7'
const [weatherData, setWeatherData] = useState([{}])
const [city, setCity] = useState("")  

const getWeather = (event) => {
  if(event.key === "Enter") {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}').then(
      response => response.json()
    ).then(
      data => {
        setWeatherData(data)
        setCity("")
      }
    )
  }
}




return (
    <div className="container">
        <input
         className="input" 
         placeholder="Kirjoita paikkakunta..." 
         onChange={e => setCity(e.target.value)}
         value={city}
         onKeyPress={getWeather}
         />


         {typeof weatherData.main ==='undefined' ? (
           <div>
             <p>Tervetuloa sääsovellukseen! Kirjoita paikannimi, jonka säätiedot haluat.</p>
            </div>
         ): (
           <div classsName='weather-data'>
             <p className='city'>{weatherData.name}</p>
             <p className='temp'>{Math.round(weatherData.main.temp)}&#x2103;</p>
             <p className='weather'>{weatherData.weather[0].main}</p>
           </div>
         )}

         {weatherData.cod === "404" ? (
           <p>Paikkaa ei löydy.</p>
         ):(
           <>
           </>
         )}
    </div>
  )}
  
export default App