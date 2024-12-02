import React, { useEffect, useRef, useState } from 'react'
import './WeatherApp.css'
import searchIcon from '../assets/search.svg'
import cloudIcon from '../assets/cloudy.svg'
import drizzleIcon from '../assets/drizzle.svg'
import humidIcon from '../assets/humidiy.svg'
import rainIcon from '../assets/rainy.svg'
import snowIcon from '../assets/snowy.svg'
import sunIcon from '../assets/sunny.svg'
import windIcon from '../assets/wind.svg'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WeatherApp = () => {
/* const [data,setData] = useState([]) */
const inputRef = useRef()
const [weatherData,setWeatherData] = useState(false)
const allIcons ={
    "01d": sunIcon,
    "01n": sunIcon,
    "02d": cloudIcon,
    "02n": cloudIcon,
    "03d": cloudIcon,
    "03n": cloudIcon,
    "50d": cloudIcon,
    "50n": cloudIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "13d": snowIcon,
    "13n": snowIcon,
}
 const search = async (city)=>{
    if(city===''){
        toast("Enter City Name")
        return
    }
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
/*         axios.get(url)
        .then((res)=>{
            setData(res.main)
        })
        console.log(data) */    //Axios didnt work
        const respone = await fetch(url)
        const data = await respone.json()
        if(!respone.ok){
            toast(data.message);
            return
        }
        console.log(data)
        const icon = allIcons[data.weather[0].icon] || clear_icon;
        setWeatherData({
            humdity:data.main.humidity,
            wind: data.wind.speed,
            temprature: Math.floor(data.main.temp),
            location: data.name,
            icon: icon,
            description: data.weather[0].description,
            feelsLike: Math.floor(data.main.feels_like)
        })
    } catch (error) {
        setWeatherData(false)
        console.error("Error in fetchin data")
        toast('An Error Occured!')
    }
 }
   useEffect(()=>{
    search("Kochi");
   },[])
  
  return (
    <div className='weather'>
        <div className="search-bar">
            <input ref={inputRef} type="text" placeholder='Search' />
            <img src={searchIcon} alt="" onClick={()=>{search(inputRef.current.value)}} />
        </div>
        <img src={weatherData.icon} alt="" className='weather-icon' />
        <p className='weather-desc'>{weatherData.description}</p>
        <p className='temp'>{weatherData.temprature}°C</p>
        <p className='feelLike'>Feels Like: {weatherData.feelsLike}°C</p>
        <p className='location'>{weatherData.location}</p>
        <div className="weather-data">
            <div className="col">
                <img src={humidIcon} alt="" className='colImg' />
                <div>{weatherData.humdity}%</div>
                <span>Humidity</span>
            </div>
            <div className="col">
                <img src={windIcon} alt="" className='colImg' />
                <div>{weatherData.wind} Km/h</div>
                <span>Wind</span>
            </div>
        </div>
        <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition: Bounce
        />
    </div>
  )
}

export default WeatherApp