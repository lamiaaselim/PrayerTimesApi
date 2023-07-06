// Names of cities
let cities = [
    {
        cityNameAr:"القاهرة",
        cityNameEn:"Al Qāhirah"
    },
    {
        cityNameAr:"البحر الأحمر",
        cityNameEn:"Al Baḩr al Aḩmar"
    }, 
    {
        cityNameAr:"الأسكندرية",
        cityNameEn:"Al Iskandarīyah"
    },
    {
        cityNameAr:"الجيزة",
        cityNameEn:"Al Jīzah" 
    },
    {
        cityNameAr:"المنوفية",
        cityNameEn:"Al Minūfīyah"
    }, 
    {
        cityNameAr:"الأقصر",
        cityNameEn:"Al Uqşur"
    },
    {
        cityNameAr:"الوادي الجديد",
        cityNameEn:"Al Wādī al Jadīd"
    }, 
    {
        cityNameAr:"السويس",
        cityNameEn:"As Suways"
    }, 
    {
        cityNameAr:"بور سعيد",
        cityNameEn:"Būr Sa‘īd"
    }, 
    {
        cityNameAr:"دمياط",
        cityNameEn:"Dumyāţ"
    }, 
    {
        cityNameAr:"جنوب سيناء",
        cityNameEn:"Janūb Sīnā'"
    }, 
    {
        cityNameAr:"شمال سيناء",
        cityNameEn:"Shamāl Sīnā'"
    }, 
    {
        cityNameAr:"قـنا",
        cityNameEn:"Qinā"
    }

];

// Fill Select by cities
for (city of cities){
    let content = `
    <option>${city.cityNameAr}</option>
    `
    document.getElementById('inputcities').innerHTML += content;
}

document.getElementById("inputcities").addEventListener("change", (event)=> {
    document.getElementById("cityName").innerHTML =event.target.value;

    let cityNameSelcted = "";
    for (let city of cities){
        if (city.cityNameAr == event.target.value ){
            // console.log(city.cityNameAr)
            // console.log(event.target.value)
            cityNameSelcted = city.cityNameEn
            // console.log(city.cityNameEn)
        }
    }
    cityPrayerTimes(cityNameSelcted);
    
})

function cityPrayerTimes(city){
    // feach prayer Times from API
let params ={
    country: "EG",
    city: city  // "Al Qāhirah"
}
// Fetching using Axios
axios.get('http://api.aladhan.com/v1/timingsByCity', {
    params: params
})
.then((response)=> {
    let times = response.data.data;
    let dateOfDay = response.data.data.date.gregorian.date;
    let nameOfDay = response.data.data.date.hijri.weekday.ar;
    document.getElementById('fagr-time').innerHTML =
    `<h6 class="text-center droid-arabic-naskh" style="direction: ltr;">${times.timings.Fajr}</h6>`
    document.getElementById('sun-time').innerHTML =
    `<h6 class="text-center">${times.timings.Sunrise}</h6>`
    document.getElementById('zohr-time').innerHTML =
    `<h6 class="text-center">${times.timings.Dhuhr}</h6>`
    document.getElementById('azr-time').innerHTML =
    `<h6 class="text-center">${times.timings.Asr}</h6>`
    document.getElementById('maghrb-time').innerHTML =
    `<h6 class="text-center">${times.timings.Maghrib}</h6>`
    document.getElementById('asha-time').innerHTML =
    `<h6 class="text-center">${times.timings.Isha}</h6>`
    document.getElementById('dayDate').innerHTML =
    `<h5 id="dayDate">${dateOfDay} </h5>`
    document.getElementById('dayName').innerHTML =
    `<h5>${nameOfDay} </h5>`

})
.catch((error)=>  {
    console.log(error);
});
}

cityPrayerTimes("Al Qāhirah");


function filterTimeForPrayer(id, time){
    document.getElementById(id).innerHTML=time;
}

