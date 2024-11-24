const weatherData = document.getElementById('weather-data')
const airIndexValue = ['Good', 'Modarator', 'Unhealthy', 'Very Unhealthy', 'Hazardous']


fetch('https://api.weatherapi.com/v1/current.json?key=71e40a797d764923b92130924242111&q=Dhaka&aqi=yes')
.then(res => res.json())
.then(data => {
    weatherData.innerHTML =`
    <div class="flex items-center gap-1">
        <span class="text-lg mt-1"><i class="ri-map-pin-line"></i></span> 
        <span  class="font-semibold">${data.location.name}, ${data.location.country}</span>
    </div> 
    <div  class="text-center text-2xl font-semibold mt-2">${data.current.condition.text}</div> 
    <div  class="flex  justify-center mt-10 ${getAnimation(data.current.condition.text, data.current.condition.icon)}">
        <img  class="h-[250px]" alt="weather" src="${getImage(data.current.condition.text, data.current.condition.icon)}">   
    </div> 
    <div class="text-center font-bold ">
        <div  class="text-5xl">${Math.floor(data.current.temp_c)}°C</div>
        <div class="font-semibold">${airIndexValue[data.current.air_quality['us-epa-index']]}</div>
    </div>
    <div class="text-xl mt-10 flex justify-center gap-14">
        <div class="text-center ">
            <div class="font-semibold ">Wind</div>
            <div class="font-bold">${data.current.wind_kph} Km/h</div>
        </div>
        <div>
            <div class="text-center ">
                <div class="font-semibold ">Feels Like</div>
                <div  class="font-bold">${Math.floor(data.current.feelslike_c)}°C</div>
            </div>
        </div>
        <div>
            <div class="text-center ">
            <div class="font-semibold ">Humidity</div>
            <div  class="font-bold">${data.current.humidity}%</div>
        </div></div>
    </div>
    `
})
.catch(err =>{
    console.log(err)
})

const getAnimation = (status, dayStatus) => {
    if(status.includes('Clear')) {
      if(dayStatus.includes('day')) {
        return 'animate-spin'
      } else {
        return 'animate-bounce'
      }
    } else if(status.includes('Cloudy')) {
      return 'animate-pulse'
    } else if(status.includes('Rain')) {
      return 'animate-ping'
    }
  
    return 'animate-pulse'
  }


const getImage = (status, dayStatus) =>{
    if(status.includes('Clear')){
        if(dayStatus.includes('day')){
            return './images/sun.png'
        }else{
            return'./images/night.png'
        }
    }else if(status.includes('Cloudy')){
        return './images/clear.png'
    }else if(status.includes('Rain')){
        return './images/rain_cloud.png'
    }

    return './images/clear.png'
}