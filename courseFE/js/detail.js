const URL_COURSE_API = "https://course-be-test.herokuapp.com/api/course";
const URL_SUPPORTER_API = "https://course-be-test.herokuapp.com/api/supporter";
const params = new URLSearchParams(window.location.search)

// Course element
const breadcrumbEl = document.querySelector(".breadcrumb")
const titleEl = document.querySelector(".course-title")
const descriptionEl = document.querySelector(".course-description")

// Supporter element
const supporterEl = document.querySelector(".supporter")

// Lay thong tin khoa hoc tu BE
const getCourseAPI = () => {
    let id = params.get("id");
    console.log(id);
    return axios.get(`${URL_COURSE_API }?id=${id}`);
} 

// Lay thong tin supporter tu BE
const getSupporterAPI = (id) => {
    return axios.get(`${URL_SUPPORTER_API}?id=${id}`);
}

const getCourse = async () => {
    try {
        let course = await getCourseAPI();
        console.log(course.data);
        let supporter = await getSupporterAPI(course.data.supporterId)
        console.log(supporter.data);

        render(course.data, supporter.data);
    } catch (error) {
        console.log(error)
    }
}

const render = (course, supporter) => {
    if(course == null){
        breadcrumbEl.innerHTML = `
            <li class="breadcrumb-item"><a href="./course-list.html">Khóa học</a></li>
            <li class="breadcrumb-item active" aria-current="page"></li>
        `
        titleEl.innerText = "";
        descriptionEl.innerText = "";
    } else {
        breadcrumbEl.innerHTML = `
            <li class="breadcrumb-item"><a href="./course-list.html">Khóa học</a></li>
            <li class="breadcrumb-item active" aria-current="page">${course.title}</li>
        `
        titleEl.innerText = course.title;
        descriptionEl.innerText = course.description;

        if(supporter == null){
            supporterEl.innerHTML = `<p>No supporter</p>`
        } else {
            supporterEl.innerHTML = `
            <div class="supporter d-flex align-items-center">
                <div class="supporter-image">
                    <img src="${supporter.avatar}" alt="tư vấn viên" class="rounded-circle w-75 h-75">
                </div>
                <div class="supporter-info">
                    <p>
                        <b>Tư vấn viên :</b>
                        ${supporter.name}
                    </p>
                    <p>
                        <b>Email :</b>
                        ${supporter.email}
                    </p>
                    <p>
                        <b>Số điện thoại :</b>
                        ${supporter.phone}
                    </p>
                </div>
             </div>
            `
        }
    }
}

getCourse();