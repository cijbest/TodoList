// 위도와 경도를 가지고 온다.
// API : 다른 서버로부터 손쉽게 데이터를 가져올 수 있는 수단. (오직 데이터만)
const weather = document.querySelector(".js-weather");

const API_KEY ="596d3632ad5352caa015f3ab483ceca5";
const COORDS = 'coords';

function getWeatherState(state){
    return `<image class="weatherImg" src="http://openweathermap.org/img/wn/${state}@2x.png"/>`;
}

function getWeather(lat, log){
    // then : 데이터가 완전히 들어온 다음 함수를 호출해주는 메서드
    // fetch만 해서 데이터를 가지고 왔을 땐 Network의 정보만 주므로, 
    // 그 정보 내부의 body부분에 필요한 json파일을 가지고 오기 위해서 json()을 쓴다.
    fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=${API_KEY}&units=metric`
        ).then(function(response){ // fetch로 가지고 온 데이터에 대한 함수
            return response.json(); // json 데이터를 준비해서 리턴(이것도 데이터 처리하는데 시간 걸린다.)
        }).then(function(json){  // 리턴된 json파일에 대한 함수
            const temperature = json.main.temp;
            const place = json.name;
            const weatherState = getWeatherState(json.weather[0].icon);
            weather.innerHTML = `&nbsp&nbsp&nbsp&nbsp ${weatherState}<br> ${temperature} @ ${place}`;
        });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoError(position){
    console.log(position);
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude, // -> latitude: latitude 랑 같은 거
        longitude // -> longitude: longitude 랑 같은 거
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();