const body = document.querySelector("body");

const IMG_NUMBER = 3;

/* 나중에
function handleImgLoad() {
    console.log("finished loading");
}
*/

function paintImage(imgNumber){
    const image = new Image();
    image.src = `images/${imgNumber + 1}.jpg`;
    //body.appendChild(image);
    //image.addEventListener("loaded", handleImgLoad); -> API(나중에 배울거임)
    image.classList.add("bgImage");
    body.prepend(image); // body의 맨 앞에 image를 삽입(첫 노드가 된다.)
}

function genRandom(){
    // Math.floor() : 소수점 버림, Math.ceil() : 소수점 올림
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();