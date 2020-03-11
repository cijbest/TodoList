const toDoform = document.querySelector(".js-toDoForm"), // �ٸ� js������ �̸��� ��ġ�� �ʰ� �� ��
      toDoInput = toDoform.querySelector("input"),
      toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';



let toDos = []; // �� ���� �迭�� ����

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
    // filter�� �־��� �Լ��� �׽�Ʈ�� ����ϴ� ��� ��Ҹ� ��� ���ο� �迭�� ��ȯ�Ѵ�.
    // ��� ������ ��Ҹ� ������ �������� ��Ƽ� �迭�� �����.
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id); // li.id�� string -> int�� ��ȯ
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos(){  // toDos�� ������ �ͼ� ���ÿ� �Է��Ѵ�.
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    // �ڹٽ�ũ��Ʈ�� localStorage�� �ִ� ��� �����͸� String���� �����Ѵ�.
    // JSON.stringify�� �ڹٽ�ũ��Ʈ object�� string���� �ٲ��ش�.
}

function paintToDo(text){
    const li = document.createElement("li"); // li ��Ҹ� ����� li��� ������ �ִ´�.
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
    toDoList.appendChild(li); // ������ li�� ������ ������.
    const toDoObj= {
        text: text,
        id: newId
    }
    toDos.push(toDoObj); // �迭�� �ִ´�.
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValues = toDoInput.value;
    paintToDo(currentValues);
    toDoInput.value = ""; // �Էµ� �Ŀ� �ƹ��͵� ���� ���·� �����.
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos); // string -> object
        // forEach�� �⺻������ �Լ��� �����Ų��.
        // toDos�� �ִ� ������ ���ؼ� function�� �����Ų��.
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