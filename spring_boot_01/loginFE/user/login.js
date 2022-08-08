const nameIp = document.querySelector("#input-name");
const passIp = document.querySelector("#input-password");
const loginBtn = document.querySelector("#btn-login")
const loginEl = document.querySelector("#login")
const titleEl = document.querySelector("#title")
const infoEl = document.querySelector("#info")
const backBtn = document.querySelector("#back")
const check = document.querySelector(".input-row")

loginBtn.addEventListener("click", async () => {
    try {
        checkValidate();
        let value = await axios.post("http://localhost:8080/login", {
            "userName": nameIp.value,
            "password": passIp.value
        })
        loginEl.style.display = "none";
        showInfo(value.data);
        backBtn.style.display = "block";
    } catch (error) {
        console.log(error)
        alert("Username or Password is incorrect")
    }
})

function showInfo(user){
    let html = "";
    let title = `<h1>Hello ${user.userName}</h1>`;
    let email = `<p>Email: ${user.email}</p>`;
    let avatar = `<img src="https://sieunhann.github.io/spring_boot_01/loginFE/image/${user.avatar}" alt="${user.userName}" width="150">`
    html = title + email + avatar;

    infoEl.innerHTML = html;
    infoEl.style.display = "block";
}

backBtn.addEventListener("click", () => {
    nameIp.value = "";
    passIp.value = "";
    loginEl.style.display = "block";
    infoEl.style.display = "none";
    backBtn.style.display = "none"
})

function checkValidate(){
    let nameVal = nameIp.value;
    let passVal = passIp.value;

    let parentVal = document.querySelectorAll(".input-row");
    parentVal.forEach(parentVal => parentVal.querySelector(".message").innerText = "");

    if(nameVal == ""){
        error(nameIp, "User name cannot be blank");
    }
    if(passVal == ""){
        error(passIp, "Password cannot be blank");
    }
}

function error(val, message){
    let parentVal = val.parentNode;
    parentVal.querySelector(".message").innerText = message;
}