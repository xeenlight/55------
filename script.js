let themeToggleImg = document.getElementById('themeToggleImg');
let isDarkTheme = localStorage.getItem('isDarkTheme') === 'true'; // Загружаем тему из localStorage
let headerImg = document.querySelector('header img');

document.addEventListener('DOMContentLoaded', () => {
    updateTheme(); // Обновляем тему при загрузке страницы
    getRandomAvatar(); // Получаем случайный аватар
    makeStep(event);

});

// Функция для переключения тем
function toggleTheme() {
    isDarkTheme = !isDarkTheme; // Переключаем тему
    localStorage.setItem('isDarkTheme', isDarkTheme); // Сохраняем в localStorage
    updateTheme(); // Обновляем стиль страницы
}

function updateTheme() {
    const body = document.body;
    const sidebar = document.querySelector('.sidebar'); // Получаем боковую панель
    const sidebarContentSpans = document.querySelectorAll('.sidebar-content span'); // Получаем все span внутри sidebar-content

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

        sidebar.style.backgroundColor = '#101217'; // Устанавливаем цвет для темной темы

        // Обновляем стиль для span
        sidebarContentSpans.forEach(span => {
            span.style.background = '#1d1f25';
            span.style.color = '#fdfdfd';
            span.style.textShadow = '0 3px 5px rgba(0, 0, 0, 0.4)';
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

        sidebar.style.backgroundColor = '#fff'; // Устанавливаем цвет для светлой темы

        // Обновляем стиль для span
        sidebarContentSpans.forEach(span => {
            span.style.background = '#ebe9f4';
            span.style.color = '#1d1f25';
            span.style.textShadow = 'none'; // Убираем текстовую тень для светлой темы
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
let game_id

let points = 1000;

let authorizationForm = document.getElementById("authorization");
authorizationForm.addEventListener("submit", authorization);

// Обработчик авторизации
async function authorization(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    username = formData.get("username");

    // Скрыть лоадер после выполнения запроса
    let response = await sendRequest("user", "GET", { username });
    loader.style.display = 'none'; // Скрываем лоадер

    // Показываем PopUp снова после обработки
    popUp.style.display = 'block'; // Или 'block', в зависимости от ваших стилей

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

    // Обновляем информацию в HeaderUser
    let userInfo = document.querySelector(".HeaderUser .spanOne");
    userInfo.innerHTML = `${username}`;

    let userInfo2 = document.querySelector(".HeaderUser .spanTwo");
    userInfo2.innerHTML = `<img src="./img/point.png" class="pointImg">${balance}`;

    // Проверяем, есть ли сохраненный аватар в localStorage для данного пользователя
    let avatarImg = document.getElementById('userAvatar');
    let avatarSrc = localStorage.getItem(`avatar_${username}`); // Сохраняем аватар с уникальным ключом для пользователя
    
    if (!avatarSrc) {
        avatarSrc = getRandomAvatar(); // Генерируем случайный аватар, если нет сохраненного
        localStorage.setItem(`avatar_${username}`, avatarSrc); // Сохраняем его с уникальным ключом
    }

    avatarImg.src = avatarSrc; // Устанавливаем аватар
    avatarImg.style.display = 'inline'; // Показываем аватарку

    // Устанавливаем аватарку в боковом меню
    let sidebarAvatarImg = document.getElementById('sidebarUserAvatar');
    sidebarAvatarImg.src = avatarSrc; // Используем тот же аватар
    sidebarAvatarImg.style.display = 'inline'; // Показываем аватарку

    // Обновляем информацию в sidebar
    let sidebarUserInfo = document.querySelector(".sidebar-content .spanOne");
    sidebarUserInfo.innerHTML = `${username}`;

    let sidebarUserInfo2 = document.querySelector(".sidebar-content .spanTwo");
    sidebarUserInfo2.innerHTML = `<img src="./img/point.png" class="pointImg">${balance}<img src="./img/point.png" class="pointImg">`;

    localStorage.setItem("username", username);

    if (localStorage.getItem("game_id")) {
        gameButton.setAttribute("data-game", "stop");
    } else {
        gameButton.setAttribute("data-game", "start");
    }
}





// Обработчик выхода
document.getElementById("exit").addEventListener("click", exit);
document.getElementById("exit2").addEventListener("click", exit);



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
            showUser(); // Показываем пользователя и его данные
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

document.addEventListener('DOMContentLoaded', () => {
    let gameButton = document.getElementById("gameButton");
    gameButton.addEventListener("click", startOrStopGame);
    
    // Функция запуска/остановки игры
    function startOrStopGame() {
        let option = gameButton.getAttribute("data-game");
        const gameMenu = document.querySelector('.GameMenu');
        const PointUser = document.querySelector('.PointUser');

        if (option === "start") {
            if (points > 0) {
                clearArea(); // Очищаем поле перед новой игрой
                startGame(); // Запускаем новую игру

                // Показываем GameMenu и скрываем PointUser
                gameMenu.style.display = 'flex';
                PointUser.style.display = 'none'; 
                
                // Обновляем статус кнопки
                gameButton.setAttribute("data-game", "stop");
                gameButton.innerHTML = "Завершить игру";
            }
        } else if (option === "stop") {
            stopGame(); // Останавливаем игру
            
            // Возвращаем элементы в исходное состояние
            gameMenu.style.display = 'none'; // Скрываем GameMenu
            PointUser.style.display = 'block'; // Показываем PointUser
            
            // Обновляем статус кнопки
            gameButton.setAttribute("data-game", "start");
            gameButton.innerHTML = "Играть";
        }
    }
});




function startOrStopGame() {
    let option = gameButton.getAttribute("data-game");
    if (option === "start") {
        if (points > 0) {
            clearArea(); // Очищаем поле перед новой игрой
            startGame(); // Запускаем новую игру
        }
    } else if (option === "stop") {
        stopGame(); // Останавливаем игру
    }
}

  
async function startGame() {
    // Сбрасываем счетчик флажков
    flagCount = 0;

    let response = await sendRequest("new_game", "POST", { username, points });
    if (response.error) {
        alert(response.message);
    } else {
        console.log(response);
        game_id = response.game_id;
        gameButton.setAttribute("data-game", "stop");
        gameButton.innerHTML = "Завершить игру";
        activateArea();
    }
}

  
  function activateArea() {
    let cells = document.querySelectorAll(".cell");
    let columns = 10;
    let rows = 8;
    cells.forEach((cell, i) => {
        setTimeout(() => {
            let row = Math.floor(i / columns);
            let column = i % columns;
            cell.setAttribute("data-row", row);
            cell.setAttribute("data-column", column);
            cell.classList.add("active");
            cell.addEventListener("contextmenu", setFlag);
            cell.addEventListener("click", makeStep);
        }, 10 * i);
    });
  }
  
let flagCount = 0; // Количество установленных флажков
const maxFlags = 10; // Максимальное количество флажков
const flagDisplay = document.querySelector('.flagAll'); // Убедитесь, что этот элемент существует

function setFlag(event) {
    event.preventDefault();
    let cell = event.target;

    // Проверяем, является ли клетка неактивированной
    if (!cell.classList.contains("active")) {
        return; // Выходим из функции, если клетка неактивирована
    }

    // Проверяем, установлен ли уже флажок
    if (cell.classList.contains("flag")) {
        cell.classList.remove("flag");
        flagCount--; // Уменьшаем счетчик флажков
    } else {
        // Проверяем, не превышает ли установка нового флажка лимит
        if (flagCount < maxFlags) {
            cell.classList.add("flag");
            flagCount++; // Увеличиваем счетчик флажков
        } else {
            alert("Вы можете установить только 10 флажков."); // Уведомляем пользователя
        }
    }

    // Обновляем отображение количества флажков
    updateFlagDisplay(); // Обязательно вызываем здесь
}

function updateFlagDisplay() {
    // Вычисляем оставшиеся флажки
    const remainingFlags = maxFlags - flagCount;

    // Обновляем текст в элементе h5
    flagDisplay.innerText = remainingFlags; // Обновляем текст в элементе h5
}

// Инициализация при загрузке
updateFlagDisplay(); // Устанавливаем начальное значение

function updateFlagDisplay() {
    // Вычисляем оставшиеся флажки
    const remainingFlags = maxFlags - flagCount;

    // Обновляем текст в обоих элементах h5
    flagDisplay.forEach(display => {
        display.innerText = remainingFlags; // Обновляем текст
    });
}

// Инициализация при загрузке
updateFlagDisplay(); // Устанавливаем начальное значение

  
  function updateFlagDisplay() {
      // Вычисляем оставшиеся флажки
      const remainingFlags = maxFlags - flagCount;
      flagDisplay.innerText = remainingFlags; // Обновляем текст в элементе h5
  }
  
  // Инициализация при загрузке
  updateFlagDisplay(); // Устанавливаем начальное значение
  


  
  
  async function makeStep(event) {
    let cell = event.target;
    let row = +cell.getAttribute("data-row");
    let column = +cell.getAttribute("data-column");
  
    let response = await sendRequest("game_step", "POST", { game_id, row, column });
    if (response.error) {
        alert(response.message);
    } else {
        if (response.status === "Won" || response.status === "Failed") {
            updateArea(response.table);
            balance = response.balance;
            showUser();
            gameButton.setAttribute("data-game", "start");
            gameButton.innerHTML = "Играть";
            // Добавляем задержку перед показом сообщения

        }
        
        else if (response.status === "Ok") {
            updateArea(response.table);
        }
    }
  }
  

  function updateArea(table) {
    let cells = document.querySelectorAll(".cell");
    let j = 0;
    for (let row = 0; row < table.length; row++) {
        for (let column = 0; column < table[row].length; column++) {
            let value = table[row][column];
            if (value === 0) {
                if (cells[j].classList.contains("flag")) {
                    cells[j].classList.remove("flag"); // Убираем флажок, если он был установлен
                    flagCount--; // Уменьшаем счётчик флажков
                    updateFlagDisplay(); // Обновляем отображение флажков
                }
                cells[j].classList.remove("active");
                cells[j].innerHTML = ''; // Пустая ячейка
            } else if (value >= 1) {
                if (cells[j].classList.contains("flag")) {
                    cells[j].classList.remove("flag"); // Убираем флажок
                    flagCount--; // Уменьшаем счётчик флажков
                    updateFlagDisplay(); // Обновляем отображение флажков
                }
                cells[j].classList.remove("active");
                cells[j].innerHTML = value; // Число
            } else if (value === "BOMB") {
                if (cells[j].classList.contains("flag")) {
                    cells[j].classList.remove("flag"); // Убираем флажок
                    flagCount--; // Уменьшаем счётчик флажков
                    updateFlagDisplay(); // Обновляем отображение флажков
                }
                cells[j].classList.remove("active");
                cells[j].classList.add("bomb"); // Бомба
            }
            j++;
        }
    }
}


  async function stopGame() {
    let response = await sendRequest("stop_game", "POST", { username, game_id });
    if (response.error) {
        alert(response.message);
    } else {
        console.log(response);
        balance = response.balance;
        showUser();
        game_id = "";
        gameButton.setAttribute("data-game", "start");
        gameButton.innerHTML = "Играть";
        clearArea(); // Очищаем поле после завершения игры
    }
}

function clearArea() {
    const area = document.querySelector(".area");
    area.innerHTML = ""; // Очищаем содержимое области
    for (let i = 0; i < 80; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");

        // Добавляем класс в зависимости от текущей темы
        if (isDarkTheme) {
            cell.classList.add("dark");
        } else {
            cell.classList.add("light");
        }

        area.appendChild(cell); // Добавляем новую ячейку
    }
}




// Добавляем обработчик клика для кнопки "Войти"
const registrationButton = document.getElementById('registrationButton');
const usernameInput = authorizationForm.querySelector('input[name="username"]');
const errorMessage = document.createElement('p');
const loader = document.querySelector('.loader'); // Получаем элемент лоадера
const popUp = document.querySelector('.PopUp'); // Получаем элемент PopUp

errorMessage.style.color = 'red';
errorMessage.style.display = 'none'; // Скрываем сообщение по умолчанию
authorizationForm.appendChild(errorMessage);

registrationButton.addEventListener('click', () => {
    if (usernameInput.value.trim() === '') {
        errorMessage.textContent = 'Обязательное поле';
        errorMessage.style.display = 'block'; // Показываем сообщение
        usernameInput.classList.add('error'); // Добавляем класс ошибки
    } else {
        errorMessage.style.display = 'none'; // Скрываем сообщение, если поле заполнено
        usernameInput.classList.remove('error'); // Удаляем класс ошибки
        // Показать лоадер и скрыть PopUp перед отправкой
        loader.style.display = 'grid'; // Показываем лоадер
        popUp.style.display = 'none'; // Скрываем PopUp
        authorizationForm.dispatchEvent(new Event('submit'));
    }
});


const burgerMenu = document.getElementById('burgerMenu');
const sidebar = document.getElementById('sidebar');
const closeBtn = document.getElementById('closeBtn');
const closeAutuExit = document.getElementById('exit2');

burgerMenu.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('active'); // Закрыть меню
});

closeAutuExit.addEventListener('click', () => {
    sidebar.classList.remove('active'); // Закрыть меню
});

// Закрытие меню при клике вне его области
document.addEventListener('click', (event) => {
    if (!sidebar.contains(event.target) && !burgerMenu.contains(event.target)) {
        sidebar.classList.remove('active'); // Закрыть меню
    }
});

// Обработка свайпов по всему экрану
let startX;

document.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX;
});

document.addEventListener('touchmove', (event) => {
    const currentX = event.touches[0].clientX;
    // Проверяем, что свайп идет слева направо
    if (startX - currentX < 50) {
        sidebar.classList.remove('active'); // Закрыть меню
    }
});


const avatars = [
    'image/11.png',
    'image/12.png',
    'image/13.png',
    'image/14.png',
    'image/15.png',
    'image/16.png',
    'image/17.png',
    'image/18.png',
    'image/19.png',
    'image/20.png',
];
function getRandomAvatar() {
    const randomIndex = Math.floor(Math.random() * avatars.length);
    return avatars[randomIndex];
}