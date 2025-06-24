// Текущий пользователь
let currentUser = null;

// Показать страницу
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

// Переключение вкладок
function switchTab(tabId) {
    // Скрыть все вкладки
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    // Убрать активный класс у всех табов
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });

    // Показать выбранную вкладку
    document.getElementById(tabId).classList.add('active');

    // Найти соответствующий таб и сделать его активным
    const tabs = document.querySelectorAll('.tab');
    for (let i = 0; i < tabs.length; i++) {
        if (tabs[i].getAttribute('onclick').includes(tabId)) {
            tabs[i].classList.add('active');
            break;
        }
    }
}

// Переключение разделов админки
function switchAdminSection(sectionId) {
    // Скрыть все разделы
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.remove('active');
    });

    // Убрать активный класс у всех кнопок меню
    document.querySelectorAll('.admin-menu button').forEach(button => {
        button.classList.remove('active');
    });

    // Показать выбранный раздел
    document.getElementById(sectionId).classList.add('active');

    // Найти соответствующую кнопку и сделать ее активной
    const buttons = document.querySelectorAll('.admin-menu button');
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].getAttribute('onclick').includes(sectionId)) {
            buttons[i].classList.add('active');
            break;
        }
    }
}

// Показать/скрыть поля для водителей при регистрации
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('reg-role').addEventListener('change', function() {
        const driverFields = document.getElementById('driver-fields');
        if (this.value === 'driver') {
            driverFields.classList.remove('hidden');
        } else {
            driverFields.classList.add('hidden');
        }
    });

    // Установим сегодняшнюю дату по умолчанию в полях даты
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('trip-date').value = today;
    document.getElementById('offer-date').value = today;

    // Установим текущее время + 1 час по умолчанию
    const now = new Date();
    now.setHours(now.getHours() + 1);
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    document.getElementById('offer-time').value = `${hours}:${minutes}`;
});

// Вход пользователя
function loginUser() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Простая проверка (в реальном приложении нужно проверять с сервером)
    if (email && password) {
        // Симуляция разных пользователей
        if (email === 'admin@pop.utka') {
            currentUser = {
                id: 1,
                name: 'Администратор',
                email: 'admin@pop.utka',
                role: 'admin'
            };
        } else if (email === 'driver@pop.utka') {
            currentUser = {
                id: 2,
                name: 'Иван Иванов',
                email: 'driver@pop.utka',
                phone: '+7 123 456 7890',
                role: 'driver',
                carModel: 'Volkswagen Passat',
                carNumber: 'А123БВ777',
                rating: 4.8
            };
        } else {
            currentUser = {
                id: 3,
                name: 'Анна Петрова',
                email: 'passenger@pop.utka',
                phone: '+7 987 654 3210',
                role: 'passenger'
            };
        }

        alert('Вход выполнен успешно!');
        updateUIAfterLogin();
        showPage('home');
    } else {
        alert('Пожалуйста, заполните все поля');
    }
}

// Регистрация пользователя
function registerUser() {
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const phone = document.getElementById('reg-phone').value;
    const password = document.getElementById('reg-password').value;
    const role = document.getElementById('reg-role').value;

    if (name && email && phone && password && role) {
        currentUser = {
            id: Math.floor(Math.random() * 1000),
            name: name,
            email: email,
            phone: phone,
            role: role
        };

        if (role === 'driver') {
            currentUser.carModel = document.getElementById('reg-car-model').value;
            currentUser.carNumber = document.getElementById('reg-car-number').value;
            currentUser.rating = 5.0; // Новый водитель начинает с 5 звезд
        }

        alert('Регистрация прошла успешно!');
        updateUIAfterLogin();
        showPage('home');
    } else {
        alert('Пожалуйста, заполните все обязательные поля');
    }
}

// Обновление интерфейса после входа
function updateUIAfterLogin() {
    const authButtons = document.querySelector('.auth-buttons');
    authButtons.innerHTML = '';

    if (currentUser) {
        const userInfo = document.createElement('div');
        userInfo.style.color = 'white';
        userInfo.style.marginRight = '15px';
        userInfo.textContent = currentUser.name;

        const logoutBtn = document.createElement('button');
        logoutBtn.className = 'btn-danger';
        logoutBtn.textContent = 'Выйти';
        logoutBtn.onclick = logoutUser;

        authButtons.appendChild(userInfo);
        authButtons.appendChild(logoutBtn);

        // Показать/скрыть элементы в зависимости от роли
        if (currentUser.role === 'admin') {
            document.querySelector('nav ul').innerHTML += '<li><a href="#" onclick="showPage(\'admin\')">Админка</a></li>';
        }
    }
}

// Выход пользователя
function logoutUser() {
    currentUser = null;
    location.reload(); // Просто перезагружаем страницу для сброса
}

// Поиск поездок
function searchTrips() {
    const fromCity = document.getElementById('from-city').value;
    const toCity = document.getElementById('to-city').value;
    const date = document.getElementById('trip-date').value;

    if (fromCity && toCity && date) {
        alert(`Поиск поездок из ${fromCity} в ${toCity} на ${date}`);
        // В реальном приложении здесь был бы запрос к серверу
    } else {
        alert('Пожалуйста, заполните все поля для поиска');
    }
}

// Предложить поездку
function offerTrip() {
    const fromCity = document.getElementById('offer-from-city').value;
    const toCity = document.getElementById('offer-to-city').value;
    const date = document.getElementById('offer-date').value;
    const time = document.getElementById('offer-time').value;
    const price = document.getElementById('offer-price').value;
    const seats = document.getElementById('offer-seats').value;
    const car = document.getElementById('offer-car').value;

    if (fromCity && toCity && date && time && price && seats && car) {
        alert(`Поездка из ${fromCity} в ${toCity} на ${date} в ${time} создана! Цена: ${price} ₽ за место, мест: ${seats}`);
        showPage('offer-trip');
    } else {
        alert('Пожалуйста, заполните все поля');
    }
}

// Забронировать поездку
function requestTrip() {
    if (!currentUser) {
        alert('Для бронирования места необходимо войти в систему');
        showPage('login');
        return;
    }

    alert('Ваша заявка на поездку отправлена водителю!');
    showPage('find-trip');
}