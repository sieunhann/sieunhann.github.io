const breedListEl = document.getElementById("breed-list")

// https://dog.ceo/api/breeds/list/all
// Lay danh sach giong loai va hien thi
const getBreedList = async () => {
    try {
        let res = await axios.get("https://dog.ceo/api/breeds/list/all") // lay danh sach giong loai

        renderBreedList(res.data.message)

    } catch (error) {
        console.log(error)
    }
}

const renderBreedList = obj => {
    let key = Object.keys(obj);
    console.log(key);

    let html = "";
    key.forEach(key => {
        html += `<option value=${key}>${key}</option>`;
    })

    breedListEl.innerHTML = html;
}

getBreedList();

const result = document.querySelector('.result')
const btnRandom = document.getElementById("btn")
const imageEl = document.getElementById("image")

btnRandom.addEventListener("click", async () => {
    try {
        subBreedListEl.innerHTML = "";
        result.style.visibility = 'hidden';

        let value = breedListEl.options[breedListEl.selectedIndex].value;
        let response = await axios.get(`https://dog.ceo/api/breed/${value}/list`); // lay danh sach giong loai con
        console.log(response);

        if (response.data.message.length == 0) {
            const para = document.createElement("li");
            para.innerHTML = `Khong co sub breed`;
            subBreedListEl.appendChild(para);
        } else {
            renderSubBreedList(response.data.message, value);
        }

    } catch (error) {
        console.log(error);
    }
})

// Lấy danh sách sub breed và hiển thị
const subBreedListEl = document.getElementById("sub-breed-list")

const renderSubBreedList = (obj, value) => {
    let key = Object.values(obj);
    console.log(key);

    key.forEach(key => {
        const para = document.createElement("li");
        para.innerHTML = `${key}`;
        subBreedListEl.appendChild(para);
        
        para.addEventListener("click", async () => {
            try {
                let res = await axios.get(`https://dog.ceo/api/breed/${value}/${key}/images/random`);
                imageEl.src = res.data.message;
                result.style.visibility = 'visible';
            } catch (error) {
                console.log(error)
            }
        })
    })
}




