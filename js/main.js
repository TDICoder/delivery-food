
//1. Получаем элементы 
//2. Функции
//3. События 
//4. Запуск

// 0.КОНСТАНТЫ////////////////////////////////////////////////////////////////////////
const BIRTHDAY = '06.05.2020';

// 1.ПЕРЕМЕННЫЕ/////////////////////////////////////////////////////////////////////////
// 0
const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
// 1
const buttonAuth = document.querySelector(".button-auth");
const modalAuth = document.querySelector(".modal-auth");
const closeModalAuth = document.querySelector(".close-auth");
const logInForm = document.getElementById("logInForm");
const loginInput = document.querySelector("#login");
const loginPass = document.querySelector("#password")
const userName = document.querySelector(".user-name")
const buttonOut = document.querySelector(".button-out")
//2
const cardsRestaurants = document.querySelector('.cards-restaurants');

const containerPromo = document.querySelector('.container-promo'); // скрыть, при клике на ресторан 
const restaurants = document.querySelector('.restaurants') // скрыть, при клике на ресторан 
const menu = document.querySelector('.menu'); // показать, при клике на ресторан 
const logo = document.querySelector('.logo');

const cardsMenu = document.querySelector('.cards-menu');

//console.log(buttonLogin);

// Получаем значение из локалсторадж при обновлении страницы
let login = '', password = '';
login = localStorage.getItem('delivery');

//modalAuth.classList.add('hello');
//modalAuth.classList.contains('hello');  // contains есть или нет, возвращает true или false
//modalAuth.classList.remove('modal-auth');

//console.log(modalAuth.classList.contains('hello'));
//console.log(modalAuth);
//console.dir(modalAuth);

//console.log(logInForm);

// 2.ФУНКЦИИ////////////////////////////////////////////////////////////////////////////
function toggleModal() {
  modal.classList.toggle("is-open");
}

// Скрыть/показать модальное окно Авторизации
function toggleModalAuth()  {
  modalAuth.classList.toggle('is-open');
  loginInput.placeholder = '';loginPass.placeholder = '';loginInput.style.borderColor = '';loginPass.style.borderColor = '';
  loginInput.value = loginInput.value.trim();
  loginPass.value = loginPass.value
}

//Если не Авторизован
function notAuthorized () {

  console.log('не авторизован');

    // Скрываем корзину
    cartButton.style.display = 'none';

          function logIn(event){
            //console.log('логин');
            // Выключаем отправку формы по submit
            event.preventDefault();  
            
            login = loginInput.value
            password = loginPass.value.trim();

            localStorage.setItem('delivery',login); // Сохраняем значение инпут в локалсторадж
            //console.log(login);

            //  debugger;
           
            if (login && password ) {
              toggleModalAuth();
              buttonAuth.removeEventListener("click",toggleModalAuth)
              closeModalAuth.removeEventListener("click",toggleModalAuth);
              logInForm.removeEventListener("submit",logIn);
              logInForm.reset(); // Очистить все инпуты формы
              checkAuth();
            }
            else {
              if(!login) { loginInput.placeholder = 'Обязательное поле';loginInput.style.borderColor = 'red'; loginInput.focus(); return;}
              if(!password) { loginPass.placeholder = 'Обязательное поле';loginPass.style.borderColor = 'red'; loginPass.focus(); }
            }
          }

  buttonAuth.addEventListener("click",toggleModalAuth);
  closeModalAuth.addEventListener("click",toggleModalAuth);
  logInForm.addEventListener("submit",logIn);
}

//Если Авторизован
function authorized () {
    console.log('aвторизован');
    //buttonAuth.style.backgroundColor = 'red';

        function logOut(){

          // Возврат на главную
          desc();
          ////////////////////////////////

          login = null;  password = null;
          buttonAuth.style.display = '';
          userName.style.display = '';
          buttonOut.style.display = '';

          localStorage.removeItem('delivery');

          buttonOut.removeEventListener("click",logOut);
          checkAuth();
        }

  userName.textContent = login;

  buttonAuth.style.display = 'none';
  userName.style.display = 'inline';
  buttonOut.style.display = 'block';

  buttonOut.addEventListener("click",logOut);

  // Показываем корзину
  cartButton.style.display = 'flex';

}

function checkAuth() {
  if (login) {
      authorized();
    } else {
      notAuthorized();
    }
  }


function createCardRestaurant() {

  // Формируем верстку ресторана
  const card = `
      <a class="card card-restaurant">
      <img src="img/pizza-plus/preview.jpg" alt="image" class="card-image"/>
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title">Пицца плюс</h3>
          <span class="card-tag tag">50 мин</span>
        </div>
        <div class="card-info">
          <div class="rating">
            4.5
          </div>
          <div class="price">От 900 ₽</div>
          <div class="category">Пицца</div>
        </div>
      </div>
    </a>
  `;
  // Втавляем в верстку
  cardsRestaurants.insertAdjacentHTML('beforeend',card);
}



function createCardGood() {
  // Создаем оболочку для верстки товара и добаялем класс  card
  const cardGood = document.createElement('div');
  cardGood.className = 'card';
  // сама верстка блюда
  const good =  `
        <img src="img/pizza-plus/pizza-classic.jpg" alt="image" class="card-image"/>
        <div class="card-text">
          <div class="card-heading">
            <h3 class="card-title card-title-reg">Пицца Классика</h3>
          </div>
          <div class="card-info">
            <div class="ingredients">Соус томатный, сыр «Моцарелла», сыр «Пармезан», ветчина, салями,
              грибы.
            </div>
          </div>
          <div class="card-buttons">
            <button class="button button-primary button-add-cart">
              <span class="button-card-text">В корзину</span>
              <span class="button-cart-svg"></span>
            </button>
            <strong class="card-price-bold">510 ₽</strong>
          </div>
        </div>
      `;
  // Добавляем в ДОМ
  cardGood.insertAdjacentHTML('beforeend',good);

  cardsMenu.insertAdjacentElement('beforeend',cardGood);

  // console.log(cardGood);

}


function openGoods (event) {
  // определяем куда конкретно кликнули
  const target = event.target;
  // определяем верхнюю оболчку карточки,closest поднимается выше до селектора (класса) cards-restaurants
  const restaurant = target.closest('.card-restaurant');
  //  console.log('restaurant',restaurant);

  // скрываем все рестораны, показываем меню
  if(restaurant) {

    // Очищем блюда в ресторане
    cardsMenu.textContent = '';

    // Проверка на авторизацию
    if(!login){
      toggleModalAuth();
    }
    //////////////////////////

    if(login) {
        containerPromo.classList.add('hide');
        restaurants.classList.add('hide');
        menu.classList.remove('hide');

        createCardGood();
        createCardGood();
        createCardGood();
      }

  }

}

// Возврат на главную-выход
function desc() {
  // Очищем блюда в ресторане
  cardsMenu.textContent = '';

  containerPromo.classList.remove('hide');
  restaurants.classList.remove('hide');
  menu.classList.add('hide');
}


// 3.ОБРАБОТЧИКИ СОБЫТИЙ///////////////////////////////////////////////////
// Запуск, СОБЫТИЯ////////////////////////////////////////////////////////////////////////////

// Клик на корзину
cartButton.addEventListener("click", toggleModal);
// Клик на закрытие карзины
close.addEventListener("click", toggleModal);
// Клик на ресторан
cardsRestaurants.addEventListener('click',openGoods)

// При клике на лого выозвращяем рестораны
logo.addEventListener('click', desc)

// debugger;

checkAuth();

createCardRestaurant();
createCardRestaurant();
createCardRestaurant();
