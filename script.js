let themeToggleImg = document.getElementById('themeToggleImg');
let isDarkTheme = true;

themeToggleImg.addEventListener('click', () => {
    if (isDarkTheme) {
        // Меняем цветовую тему на светлую
        document.body.style.backgroundColor = '#fafbff';
        document.body.style.color = '#1d1f25'; // Цвет текста по желанию

        document.querySelector('header').style.backgroundColor = '#ebe9f4';
        document.querySelector('.gridBlocks').style.backgroundColor = '#ebe9f4';
        document.querySelector('.pointsBlocks').style.backgroundColor = '#ebe9f4';
        
        isDarkTheme = false;
    } else {
        // Меняем цветовую тему на темную
        document.body.style.backgroundColor = '#101217';
        document.body.style.color = '#ffffff'; // Цвет текста по желанию

        document.querySelector('header').style.backgroundColor = '#1d1f25';
        document.querySelector('.gridBlocks').style.backgroundColor = '#1d1f25';
        document.querySelector('.pointsBlocks').style.backgroundColor = '#1d1f25';
        
        isDarkTheme = true;
    }
});
