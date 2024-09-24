let themeToggleImg = document.getElementById('themeToggleImg');
let isDarkTheme = localStorage.getItem('isDarkTheme') === 'true'; // Загружаем тему из localStorage
let headerImg = document.querySelector('header img');

document.addEventListener('DOMContentLoaded', () => {
    updateTheme(); // Обновляем тему при загрузке страницы
});

// Функция для переключения тем
function toggleTheme() {
    isDarkTheme = !isDarkTheme; // Переключаем тему
    localStorage.setItem('isDarkTheme', isDarkTheme); // Сохраняем в localStorage
    updateTheme(); // Обновляем стиль страницы
}

function updateTheme() {
    const body = document.body;

    if (isDarkTheme) {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');

        document.body.style.backgroundColor = '#101217';
        document.body.style.color = '#ffffff';
        document.querySelector('header').style.backgroundColor = '#1d1f25';
        headerImg.classList.remove('light');
        headerImg.classList.add('dark');

        document.body.style.setProperty('--checked-color', '#0DBBDD');

        document.querySelectorAll('label').forEach(label => {
            label.classList.remove('light-label');
            label.classList.add('dark-label');
        });

        document.querySelector('.gridBlocks').style.backgroundColor = '#1d1f25';
        document.querySelector('.pointsBlocks').style.backgroundColor = '#1d1f25';

        document.querySelectorAll('.cell').forEach(cell => {
            cell.classList.remove('light');
            cell.classList.add('dark');
        });
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');

        document.body.style.backgroundColor = '#fafbff';
        document.body.style.color = '#1d1f25';
        document.querySelector('header').style.backgroundColor = '#ebe9f4';
        headerImg.classList.remove('dark');
        headerImg.classList.add('light');

        document.body.style.setProperty('--checked-color', '#2af599');

        document.querySelectorAll('label').forEach(label => {
            label.classList.remove('dark-label');
            label.classList.add('light-label');
        });

        document.querySelector('.gridBlocks').style.backgroundColor = '#ebe9f4';
        document.querySelector('.pointsBlocks').style.backgroundColor = '#ebe9f4';

        document.querySelectorAll('.cell').forEach(cell => {
            cell.classList.remove('dark');
            cell.classList.add('light');
        });
    }
}

// Добавляем обработчик клика для переключения темы
themeToggleImg.addEventListener('click', toggleTheme);

// Обработчик клика для label
document.querySelectorAll('label').forEach(label => {
    label.addEventListener('click', (event) => {
        event.stopPropagation();
    });
});

// Функция отправки запросов
async function sendRequest(url, method, data) {
    url = `https://tg-api.tehnikum.school/tehnikum_course/minesweeper/${url}`;

    if (method === "POST") {
        let response = await fetch(url, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    } else if (method === "GET") {
        url = url + "?" + new URLSearchParams(data);
        let response = await fetch(url, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        return await response.json();
    }
}

let username;
let balance;
checkUser();

let points = 1000;

let authorizationForm = document.getElementById("authorization");
authorizationForm.addEventListener("submit", authorization);

// Обработчик авторизации
async function authorization(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    username = formData.get("username");

    let response = await sendRequest("user", "GET", { username });
    if (response.error) {
        let regResponse = await sendRequest("user", "POST", { username });
        if (regResponse.error) {  
            alert(regResponse.message);
        } else {
            balance = regResponse.balance;
            showUser();
        }
    } else {
        balance = response.balance;
        showUser();
    }
}

// Функция отображения информации о пользователе
function showUser() {
    let popUpSection = document.querySelector("section");
    popUpSection.style.display = "none"; 
    let userInfo = document.querySelector("header span");
    userInfo.innerHTML = `[${username}, ${balance}]`;

    localStorage.setItem("username", username);

    if (localStorage.getItem("game_id")) {
        gameButton.setAttribute("data-game", "stop");
    } else {
        gameButton.setAttribute("data-game", "start");
    }
}

// Обработчик выхода
document.querySelector(".exit").addEventListener("click", exit);

function exit() {
    let popUpSection = document.querySelector("section");
    popUpSection.style.display = "flex"; 
    let userInfo = document.querySelector("header span");
    userInfo.innerHTML = `[]`;

    localStorage.removeItem("username");
}

// Проверка пользователя
async function checkUser() {
    if (localStorage.getItem("username")) {
        username = localStorage.getItem("username");
        let response = await sendRequest("user", "GET", { username });
        if (response.error) {
            alert(response.message);
        } else {
            balance = response.balance;
            showUser();
        }
    } else {
        let popUpSection = document.querySelector("section");
        popUpSection.style.display = "flex"; 
    }
}

// Обработчик для установки очков
let pointBtns = document.getElementsByName("point");
pointBtns.forEach((elem) => {
    elem.addEventListener("input", setPoints);
});

function setPoints() {
    let checkedBtn = document.querySelector("input:checked");
    points = +checkedBtn.value;
}

let gameButton = document.getElementById("gameButton");
gameButton.addEventListener("click", startOrStopGame);

function startOrStopGame() {
    let option = gameButton.getAttribute("data-game");
    if (option == "start") {
        if (points > 0) {
            startGame();
        }
    } else if (option == "stop") {
        // Логика остановки игры
    }
}

async function startGame() {
    let response = await sendRequest("new_game", "POST", { username, points });
    if (response.error) {
        alert(response.message);
    } else {
        console.log(response);
    }
}

// Добавляем обработчик клика для кнопки "Войти"
const registrationButton = document.getElementById('registrationButton');
registrationButton.addEventListener('click', async () => {
    await authorizationForm.dispatchEvent(new Event('submit'));
});

// Добавляем обработчик нажатия клавиши Enter
usernameInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        registrationButton.click();
    }
});
