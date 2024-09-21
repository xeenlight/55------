let themeToggleImg = document.getElementById('themeToggleImg');
let isDarkTheme = true;
let headerImg = document.querySelector('header img');

document.addEventListener('DOMContentLoaded', () => {
    updateTheme();
});

// Функция для переключения тем
function toggleTheme() {
    isDarkTheme = !isDarkTheme; // Переключаем тему
    updateTheme();
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

        // Устанавливаем цвет для checked в темной теме
        document.body.style.setProperty('--checked-color', '#0DBBDD');

        document.querySelectorAll('label').forEach(label => {
            label.classList.remove('light-label');
            label.classList.add('dark-label');
        });

        // Меняем цвет для блоков на темной теме
        document.querySelector('.gridBlocks').style.backgroundColor = '#1d1f25';
        document.querySelector('.pointsBlocks').style.backgroundColor = '#1d1f25';

        // Меняем класс для ячеек на темную тему
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

        // Устанавливаем цвет для checked в светлой теме
        document.body.style.setProperty('--checked-color', '#2af599');

        document.querySelectorAll('label').forEach(label => {
            label.classList.remove('dark-label');
            label.classList.add('light-label');
        });

        // Меняем цвет для блоков на светлой теме
        document.querySelector('.gridBlocks').style.backgroundColor = '#ebe9f4';
        document.querySelector('.pointsBlocks').style.backgroundColor = '#ebe9f4';

        // Меняем класс для ячеек на светлую тему
        document.querySelectorAll('.cell').forEach(cell => {
            cell.classList.remove('dark');
            cell.classList.add('light');
        });
    }
}

// Добавляем обработчик клика для переключения темы
themeToggleImg.addEventListener('click', toggleTheme);

// Добавляем обработчик клика для label, чтобы предотвратить переключение темы
document.querySelectorAll('label').forEach(label => {
    label.addEventListener('click', (event) => {
        event.stopPropagation(); // предотвращает переключение темы
    });
});
