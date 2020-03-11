const form = document.querySelector(".js-form"),
      input = form.querySelector("input"),
      greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
      SHOWING_CN = "showing";


function saveName(text){
    localStorage.setItem(USER_LS, text);
}      

function handleSubmit(event){
    event.preventDefault(); // 기본동작을 막음 -> 새로고침 안 됨
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}  

function askForName(){
    form.classList.add(SHOWING_CN); // 폼 보이기
    form.addEventListener("submit", handleSubmit); // 입력폼에 뭘 써서 보내면 반응
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CN); // 폼 숨기기
    greeting.classList.add(SHOWING_CN);
    greeting.innerHTML = `&#10077 Hello&#10082 &nbsp${text} &#10078`;
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){ // She is not
        askForName();
    } else { // she is
        paintGreeting(currentUser);
    }
}

function init(){
    loadName();
}

init();