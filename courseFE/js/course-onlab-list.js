const URL_API = "https://course-be-test.herokuapp.com/api/courses?type=onlab"
let SUB_URL = "";

const courseList = document.querySelector(".course-list")
const filterTopics = document.querySelector(".col-md-3")
const searchInput = document.querySelector(".seach-form-input")

// Mang chua danh sach khoa hoc duoc lay ra
let courses = [];

// 1. Lay danh sach tat ca
// Lay danh sach tat ca khoa hoc
const getCourseAPI = () => {
    return axios.get(URL_API);
}

// Hien thi danh sach khoa hoc
const getCourses = async () => {
    try {
        let res = await getCourseAPI();
        courses = res.data;
        console.log(courses);

        render(courses);
    } catch (error) {
        console.log(error);
    }
}

getCourses();

// 2. Loc theo topic
// Loc danh sach theo Topic
filterTopics.addEventListener("change", async (e) => {
    try {
        let target = e.target;
        let topic = checkTopic(target);
        if (!SUB_URL.includes("title=")) {
            SUB_URL = `&topic=${topic}`;
        } else {
            let nums = SUB_URL.indexOf("title=");
            let urlLength = SUB_URL.length;
            SUB_URL = `&topic=${topic}&` + SUB_URL.slice(nums, urlLength);
        }

        let res = await axios.get(URL_API + SUB_URL);
        let courses = res.data;
        console.log(courses);

        render(courses);
    } catch (error) {
        console.log(error);
    }
})

// Lay danh sach theo bo loc Topic
const checkTopic = (obj) => {
    let topic = ""
    switch (obj.id) {
        case "backend":
            topic = "Backend";
            break;
        case "frontend":
            topic = "Frontend";
            break;
        case "mobile":
            topic = "Mobile";
            break;
        case "database":
            topic = "Database";
            break;
    }
    return topic;
}

// 3. Loc theo title
// Loc theo danh sach topic

searchInput.addEventListener("keydown", async (event) => {
    try {
        if (event.key == "Enter") {
            if(SUB_URL.includes("title=")){
                let nums = SUB_URL.indexOf("title=");
                SUB_URL = SUB_URL.slice(0, nums + 6); // nums + 7: vi sau dau "=" trong ?title=
                SUB_URL += searchInput.value;
            } else {
                if(!SUB_URL.includes("topic=")){
                    SUB_URL = `&title=${searchInput.value}`;
                } else {
                    SUB_URL += `&title=${searchInput.value}`;
                }
            }

            let res = await axios.get(URL_API + SUB_URL);
            let courses = res.data;
            console.log(courses);

            render(courses);
        }
    } catch (error) {
        console.log(error)
    }
})


// Hien thi thong tin cac khoa hoc
const render = arr => {
    courseList.innerHTML = "";
    if (arr.length == 0) {
        courseList.innerHTML = "";
        return;
    }

    let html = "";
    arr.forEach(el => {
        html += `
        <div class="col-md-4">
            <a href="./detail.html?id=${el.id}">
                <div class="course-item shadow-sm rounded mb-4">
                    <div class="course-item-image">
                        <img src="${el.image}"
                        alt="khoa hoc">
                    </div>
                    <div class="course-item-info p-3">
                        <h2 class="fs-5 mb-3 text-dark">${el.title}</h2>
                        <p class="type fw-light text-black-50">${el.type}</p>
                    </div>
                </div>
            </a>
         </div>
        `
    });
    courseList.innerHTML = html;
}

