const toDoform = document.querySelector(".js-toDoForm"), // 다른 js파일의 이름과 겹치지 않게 할 것
      toDoInput = toDoform.querySelector("input"),
      toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';



let toDos = []; // 할 일을 배열에 저장

function checkeToDo(event){
    const btn = event.target;
    const span = btn.nextSibling;
    if(span.classList.contains("checkedList")){
        btn.innerHTML = "&#9744";
        span.classList.remove("checkedList");
    } else {
        btn.innerHTML = "&#9746";
        span.classList.add("checkedList");
    }
}
function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    // filter는 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환한다.
    // 방금 삭제한 요소를 제외한 나머지만 모아서 배열을 만든다.
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id); // li.id를 string -> int로 변환
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos(){  // toDos를 가지고 와서 로컬에 입력한다.
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    // 자바스크립트는 localStorage에 있는 모든 데이터를 String으로 저장한다.
    // JSON.stringify는 자바스크립트 object를 string으로 바꿔준다.
}

function paintToDo(text){
    const li = document.createElement("li"); // li 요소를 만들고 li라는 변수에 넣는다.
    const chkBtn = document.createElement("button");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    chkBtn.innerHTML = "&#9744";
    chkBtn.classList.add("vBtn");
    chkBtn.addEventListener("click", checkeToDo);
    delBtn.innerHTML = "&#10004";
    delBtn.classList.add("xBtn");
    delBtn.addEventListener("click", deleteToDo);
    span.innerHTML = `&nbsp ${text}`;
    li.appendChild(chkBtn);
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li); // 마지막 li를 생성해 끝낸다.
    const toDoObj= {
        text: text,
        id: newId
    }
    toDos.push(toDoObj); // 배열에 넣는다.
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValues = toDoInput.value;
    paintToDo(currentValues);
    toDoInput.value = ""; // 입력된 후에 아무것도 없는 상태로 만든다.
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos); // string -> object
        // forEach는 기본적으로 함수를 실행시킨다.
        // toDos에 있는 각각에 대해서 function을 실행시킨다.
        parsedToDos.forEach(function(toDo){ 
            paintToDo(toDo.text);
        });
    }
}    

function init(){
    loadToDos();
    toDoform.addEventListener("submit", handleSubmit);
}

init();