document.addEventListener('DOMContentLoaded', () => {
    const habits = [
        'dates-abstinence',
        'dates-nails',
        'dates-face',
        'dates-soap'
    ];

    // Загрузка сохраненных данных
    habits.forEach(id => {
        const container = document.getElementById(id);
        const savedData = JSON.parse(localStorage.getItem(id)) || [];
        for (let i = 1; i <= 31; i++) {
            const day = document.createElement('div');
            day.className = 'day';
            day.textContent = i;
            if (savedData.includes(i)) {
                day.classList.add('checked');
            }
            day.addEventListener('click', () => {
                if (day.classList.contains('checked')) {
                    day.classList.remove('checked');
                    saveData(id);
                } else {
                    day.classList.add('checked');
                    saveData(id);
                }
            });
            container.appendChild(day);
        }
    });

    function saveData(id) {
        const days = document.getElementById(id).querySelectorAll('.day');
        const checkedDays = Array.from(days).filter(day => day.classList.contains('checked')).map(day => parseInt(day.textContent, 10));
        localStorage.setItem(id, JSON.stringify(checkedDays));
    }

    function checkMissedDays() {
        const today = new Date().getDate(); // Получаем текущий день месяца
        const rows = document.querySelectorAll('.dates');
        rows.forEach(row => {
            const days = row.querySelectorAll('.day');
            days.forEach(day => {
                const dayNumber = parseInt(day.textContent, 10);
                if (dayNumber < today && !day.classList.contains('checked') && !day.classList.contains('missed')) {
                    day.classList.add('missed');
                }
            });
        });
    }

    // Начальная проверка пропущенных дней
    checkMissedDays();
    // Проверка на пропущенные дни каждую минуту
    setInterval(checkMissedDays, 60000);
});
