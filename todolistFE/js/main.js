const todoListEl = document.querySelector(".todo-list");
const URL_API = "https://todos-list-be.herokuapp.com/api/v1/todos";
const todoInput = document.querySelector(".todo-input")
const inputVal = todoInput.firstElementChild;
const addBtn = todoInput.querySelector("#btn-add");
const updateBtn = todoInput.querySelector("#btn-update");
const todoOp = document.querySelector(".todo-option");

// Luu lai cv
let todos = [];

// Danh sach API ====
// 1. Lay danh sach cv
// a. Lay danh sach tat ca cv
const getTodoAPI = () => {
    return axios.get(URL_API); // tra ve promise
}
// b. Lay danh sach cv theo status
const getTodoByStatusAPI = (status) => {
    return axios.get(`${URL_API}?status=${status}`); // tra ve promise
}

// 2. Xoa cong viec
const deleteTodoAPI = (id) => {
    return axios.delete(`${URL_API}/${id}`); // tra ve promise
}

// 3. Them cong viec
const createTodoAPI = () => {
    return axios.post(URL_API, {
        "title": inputVal.value,
        "status": false
    })
}

// 4. Update cong viec
const updateTodoAPI = (id, title, status) => {
    return axios.put(`${URL_API}/${id}`, {
        "title": title,
        "status": status
    })
}


// Ham xu ly =====
// 1. Lay danh sach cv

// Thuc hien lay danh sach khi chon bo loc
todoOp.addEventListener('change', async (e) => {
    try {
        let target = e.target;
        checkRender(target)
    } catch (error) {
        console.log(error);
    }
})

// Lay danh sach cong viec theo bo loc
const checkRender = (target) => {
    switch(target.id){
        case "all": 
            getTodo();
            break;
        case "active":
            getTodoByStatus(true);
            break;
        case "unactive":
            getTodoByStatus(false);
            break;
    }
}


// a. Danh sach tat ca cv
const getTodo = async () => {
    try {
        let res = await getTodoAPI();
        console.log(res.data);

        todos = res.data;
        renderTodo(todos); // res.data = array
    } catch (error) {
        console.log(error);
    }
}

// b. Danh sach cv theo status
const getTodoByStatus = async (status) => {
    try {
        let res = await getTodoByStatusAPI(status);
        console.log(res.data)

        todos = res.data;
        renderTodo(todos);
    } catch (error) {
        console.log(error);
    }
}

// 2. Xoa cong viec
const deleteTodo = async (id) => {
    try {
        let isConfirm = confirm("Ban co muon xoa khong?");
        if (isConfirm) {
            await deleteTodoAPI(id); // Xoa tren server

            // Xoa tren mang ban dau (splice, filter)
            todos = todos.filter(t => t.id != id);
            renderTodo(todos)
            // Hien thi lai tren giao dien
            console.log(todos);
        }
    } catch (error) {
        console.log(error);
    }
}

// 3. Them cong viec
addBtn.addEventListener("click", async () => {
    try {
        checkValidate();
        let todo = await createTodoAPI();
        inputVal.value = "";
        let arr = todoOp.getElementsByClassName('todo-option-item');
        for(let i = 0; i < arr.length; i++){
            let val = arr[i].firstElementChild;
            console.log(val);
            if(val.checked){
                checkRender(val);
                break;
            }
        }
    } catch (error) {
        console.log(error);
    }
})

// 4. Chinh sua du lieu
// a. Chinh sua status
// update du lieu (status)
const updateTodoStatus = (id) => {
    let obj = todos.find(obj => obj.id == id);
    console.log(obj);
    if (obj.status == false) {
        obj.status = true;
        updateTodoAPI(id, obj.title, true);
    } else {
        obj.status = false;
        updateTodoAPI(id, obj.title, false);
    }
    renderTodo(todos);
}

// b. Chinh sua title
const updateTodoTitle = (id) => {
    let obj = todos.find(obj => obj.id == id);
    inputVal.value = obj.title;
    updateBtn.style.display = "inline-block";
    addBtn.style.display = "none";

    updateBtn.addEventListener("click", async () => {
        try {
            checkValidate();
            obj.title = inputVal.value;
            updateTodoAPI(id, obj.title, obj.status);
            updateBtn.style.display = "none";
            addBtn.style.display = "inline-block";
            inputVal.value = "";
            renderTodo(todos);
        } catch (error) {
            console.log(error);
        }
    })
}

// Ham ho tro
// Check validate
const checkValidate = () => {
    if (inputVal.value == "") {
        alert("Title cannot blank");
    }
}

// Hien thi ds todo ra ngoai giao dien
const renderTodo = arr => {
    todoListEl.innerHTML = "";

    if (arr.length == 0) {
        todoListEl.innerHTML = "Khong co cong viec nao trong danh sach";
        return;
    }

    let html = "";
    arr.forEach(el => {
        html += `
            <div class="todo-item ${el.status ? "active-todo" : ""}">
                <div class="todo-item-title">
                    <input type="checkbox" ${el.status ? "checked" : ""} onchange="updateTodoStatus(${el.id})" />
                    <p>${el.title}</p>
                </div>
                <div class="option">
                    <button class="btn btn-update" onclick="updateTodoTitle(${el.id})">
                        <img src="./img/pencil.svg" alt="icon" />
                    </button>
                    <button class="btn btn-delete" onclick="deleteTodo(${el.id})">
                        <img src="./img/remove.svg" alt="icon" />
                    </button>
                </div>
            </div>
        `
    });
    todoListEl.innerHTML = html;
}

getTodo();

