let themeToggleImg = document.getElementById('themeToggleImg');
let isDarkTheme = true;

// Функция для переключения тем
function toggleTheme() {
    if (isDarkTheme) {
        // Меняем цветовую тему на светлую
        document.body.style.backgroundColor = '#fafbff';
        document.body.style.color = '#1d1f25';

        document.querySelector('header').style.backgroundColor = '#ebe9f4';
        document.querySelector('.gridBlocks').style.backgroundColor = '#ebe9f4';
        document.querySelector('.pointsBlocks').style.backgroundColor = '#ebe9f4';
        
        // Устанавливаем класс для .cell на светлой теме
        document.querySelectorAll('.cell').forEach(cell => {
            cell.classList.remove('dark');
            cell.classList.add('light');
        });
        
        document.querySelectorAll('label').forEach(label => {
            label.classList.remove('dark-label');
            label.classList.add('light-label');
        });
        
        isDarkTheme = false;
    } else {
        // Меняем цветовую тему на темную
        document.body.style.backgroundColor = '#101217';
        document.body.style.color = '#ffffff';

        document.querySelector('header').style.backgroundColor = '#1d1f25';
        document.querySelector('.gridBlocks').style.backgroundColor = '#1d1f25';
        document.querySelector('.pointsBlocks').style.backgroundColor = '#1d1f25';
        
        // Устанавливаем класс для .cell на темной теме
        document.querySelectorAll('.cell').forEach(cell => {
            cell.classList.remove('light');
            cell.classList.add('dark');
        });
        
        document.querySelectorAll('label').forEach(label => {
            label.classList.remove('light-label');
            label.classList.add('dark-label');
        });
        
        isDarkTheme = true;
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
