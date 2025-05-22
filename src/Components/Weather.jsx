import React, { useEffect, useRef, useState } from 'react';
import './Weather.css'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import axios from 'axios'

const Weather = () => {

    const inputRef = useRef();

    const[weatherData, setWeatherData] = useState(false);

        const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon
    }

    const search = async (city) => {


        if(city === "") {
            alert("Please enter a city name")
            return;
        }

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
            const res = await axios.get(url)
            const data = res.data;

            const icon = allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData({
                visibility: data.visibility / 1000,
                wind: data.wind.speed,
                humidity: data.main.humidity,
                feels: data.main.feels_like,
                temp: Math.floor(data.main.temp),
                location: data.name,
                description: data.weather[0].description,
                Date: new Date().toDateString(),
                icon: icon
            })
        } catch (error) {
        if (error.response) {
            alert(error.response.data.message);
        } else {
            console.error("Error fetching weather data:", error);
        }
        setWeatherData(false);
        }
    }
        
    useEffect(() => {
        search("London")
    }, [])


    return (
        <div className='weather items-center flex-col w-96 m-5'>
            <div className='search-bar flex items-center mb-5 w-full relative'>
                <input ref={inputRef} className='h-12 py-2.5 px-4 text-white border-0 outline-0' type="text" placeholder='Search By City Or Country' />
                <i className='fa-solid fa-magnifying-glass absolute right-1.5 cursor-pointer text-white py-2.5 px-5' onClick={()=> search(inputRef.current.value)}></i>
            </div>
            {weatherData?<>
                <div className="info p-5">
                    <div className="city flex items-center">
                        <img src={weatherData.icon} alt="weather-icon" className='w-20 me-3' />
                        <div className="details flex-column">
                            <p className='text-white text-2xl font-bold'>{weatherData.location}</p>
                            <span className='date text-white text-xs'>{weatherData.Date}</span>
                        </div>
                    </div>
                    <div className="temp flex flex-col justify-center items-center p-7">
                        <p className='text-white text-6xl'>{weatherData.temp}<span className='text-sm'>°C</span></p>
                        <p className='text-white text-sm mt-1.5'>{weatherData.description}</p>
                    </div>
                    <div className="weather-data text-sm flex justify-between text-white p-5 mt-9">
                        <div className="col">
                            <p className="visibility mb-4"><i className="fa-regular fa-eye me-2"></i>Visibility <span>{weatherData.visibility}km</span></p>
                            <p className="humidity"><i className="fa-solid fa-droplet me-2"></i>Humidity <span>{weatherData.humidity}%</span></p>
                        </div>
                        <div className="col">
                            <p className="feels mb-4"><i className="fa-solid fa-temperature-empty me-2"></i>Feels like <span>{weatherData.feels}°C</span></p>
                            <p className="wind"><i className="fa-solid fa-wind me-2"></i>Wind <span>{weatherData.wind}m/s</span></p>
                        </div>
                    </div>
                </div>
            </>:<></>}
        </div>
    );
}

export default Weather;
