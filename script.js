const wrapper = document.querySelector(".wrapper"),
inputPart = document.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button"),
wIcon = document.querySelector(".weather-part img"),
arrowBack = wrapper.querySelector("header i");

let api;

inputField.addEventListener("keyup", e =>{
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value);
    }
});

locationBtn.addEventListener("click", () =>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        alert("Your browser not support geolocation api");
    }
});
function onSuccess(position) {
   const {latitude, longitude} = position.coords;
   api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=f23a97a053f7398982160a60389c3998`;
   fetchData();
}
function onError(error) {
    infoTxt.innerHTML = error.message;
    infoTxt.classList.add("error");
}
function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=f23a97a053f7398982160a60389c3998`;
    fetchData();
}

function fetchData() {
    infoTxt.innerHTML = "Getting weather details...";
    infoTxt.classList.add("pending");
    fetch(api).then(response =>(response.json()).then(result => weatherdetails(result)));
}

function weatherdetails(info) {
    if (info.cod == "404") {
        infoTxt.classList.replace("pending", "error");
        infoTxt.innerHTML = `Please enter valid city name / Check spelling`;
    }else{
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {feels_like, humidity, temp} = info.main;


        if(id == 800){
            wIcon.src = "img/clear.svg";
        }else if(id >= 200 && id <= 232){
            wIcon.src = "img/storm.svg";  
        }else if(id >= 600 && id <= 622){
            wIcon.src = "img/snow.svg";
        }else if(id >= 701 && id <= 781){
            wIcon.src = "img/haze.svg";
        }else if(id >= 801 && id <= 804){
            wIcon.src = "img/cloud.svg";
        }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
            wIcon.src = "img/rain.svg";
        }


        wrapper.querySelector(".temp, .numb").innerHTML = Math.floor(temp);
        wrapper.querySelector(".weather").innerHTML = description;
        wrapper.querySelector(".location span").innerHTML = `${city}, ${country}`;
        wrapper.querySelector(".temp .numb-2").innerHTML = Math.floor(feels_like);
        wrapper.querySelector(".humidity span").innerHTML = `${humidity}%`;



        infoTxt.classList.remove("pending", "error");
        wrapper.classList.add("active");
        console.log(info);
    }
    console.log(info);
}

arrowBack.addEventListener("click", () =>{
    wrapper.classList.remove("active");
})