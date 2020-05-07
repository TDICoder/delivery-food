
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

//3
const getData = async function(url) {

    const response = await fetch(url);

    if (!response.ok) {
      // Если response.ok false, то скидываем ошибку. Сбрасываем выполнение этой функции и выдаем ошибку
      throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}`);
    }
    
    // console.log(response.json())
    const res = await response.json();

    return res;
}

// getData('./db/partners.json');

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

// Проверка Логина на Валидность https://habr.com/ru/post/123845/
const valid = function(str) {
  const nameReg = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/;
  // Тестируем и возвращаем true или false
  return nameReg.test(str);
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
           
            if (valid(login) && password ) {
              toggleModalAuth();
              buttonAuth.removeEventListener("click",toggleModalAuth)
              closeModalAuth.removeEventListener("click",toggleModalAuth);
              logInForm.removeEventListener("submit",logIn);
              logInForm.reset(); // Очистить все инпуты формы
              checkAuth();
            }
            else {
              if(!login) { loginInput.placeholder = 'Обязательное поле';loginInput.style.borderColor = 'red'; loginInput.style.outlineColor = 'transparent'; loginInput.focus(); return;}
              if(!password) { loginPass.placeholder = 'Обязательное поле';loginPass.style.borderColor = 'red'; loginPass.style.outlineColor = 'red'; loginPass.focus(); }
    
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


function createCardRestaurant(restaurant) {

  // console.log(restaurant);
  // console.log(restaurant.name);
  // console.log(restaurant.price);

// деструктуризация - получаем переменные с именами по ключу обьекта (как пример в момент деструктуризации переименуем переменную time_of_delivery обьекта restaurant в timeOfDelivery )
const { image, kitchen, price, name, stars, products, time_of_delivery: timeOfDelivery } = restaurant;
// console.log(image, kitchen, price, name, stars, products, timeOfDelivery);

  // Формируем верстку ресторана
  const card = `
      <a class="card card-restaurant" data-menu="${products}">
      <img src="${image}" alt="image" class="card-image"/>
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title">${name}</h3>
          <span class="card-tag tag">${timeOfDelivery} мин</span>
        </div>
        <div class="card-info">
          <div class="rating">
          ${stars}
          </div>
          <div class="price">От  ${price} ₽</div>
          <div class="category">${kitchen}</div>
        </div>
      </div>
    </a>
  `;
  // Втавляем в верстку
  cardsRestaurants.insertAdjacentHTML('beforeend',card);
}



function createCardGood(goods) {
  // console.log('goods: ', goods);
  const { price, id, image, name, description } = goods
  // console.log(price);
  
  // Создаем оболочку для верстки товара и добаялем класс  card
  const cardGood = document.createElement('div');
  cardGood.setAttribute('id', id);
  cardGood.className = 'card';
  // сама верстка блюда
  const good =  `
        <img src="${image}" alt="image" class="card-image"/>
        <div class="card-text">
          <div class="card-heading">
            <h3 class="card-title card-title-reg">${name}</h3>
          </div>
          <div class="card-info">
            <div class="ingredients">${description}</div>
          </div>
          <div class="card-buttons">
            <button class="button button-primary button-add-cart">
              <span class="button-card-text">В корзину</span>
              <span class="button-cart-svg"></span>
            </button>
            <strong class="card-price-bold">${price} ₽</strong>
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
  console.log('restaurant',restaurant);
  console.log(restaurant.querySelector('.card-title'));

  // скрываем все рестораны, показываем меню
  if(restaurant) {

                const sectionHeading = document.querySelector('.rest-heading');
                // console.log(sectionHeading);
                  sectionHeading.textContent = '';

                const restName = restaurant.querySelector('.card-title').textContent,
                  restRating = restaurant.querySelector('.rating').textContent,
                  restCardTag = restaurant.querySelector('.card-tag').textContent, 
                  restCardImage = restaurant.querySelector('.card-image').textContent,
                  restPrice = restaurant.querySelector('.price').textContent;
                  restCategory = restaurant.querySelector('.category').textContent;

                // Определили по какому ресторану мы кликнули
                const restaurantTitle	=`
                <h2 class="section-title restaurant-title">${restName}</h2>
                <div class="card-info">
                  <div class="rating">${restRating}</div>
                  <div class="price">${restPrice}</div>
                  <div class="category">${restCategory}</div>
                </div>
                `;
                
                // console.log('restaurantTitle: ', restaurantTitle);
                sectionHeading.insertAdjacentHTML('beforeend',restaurantTitle);


    // ctrl+shift+l console.log(restaurant.dataset.menu);
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

        getData(`./db/${restaurant.dataset.menu}`).then(function(data){
              data.forEach(createCardGood);
        });

        // createCardGood();
        // createCardGood();
        // createCardGood();
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

function init() {
        //Обращаемся на сервер по url, получаем промис, парсим в json, после принимаем дату в функцию
        getData('./db/partners.json').then(function(data) {
          // console.log(data);

          // data.forEach(createCardRestaurant);
          data.forEach(element => {
            createCardRestaurant(element);
          });

        });

        // Клик на корзину
        cartButton.addEventListener("click", toggleModal);
        // Клик на закрытие карзины
        close.addEventListener("click", toggleModal);
        // Клик на ресторан
        cardsRestaurants.addEventListener('click',openGoods)

        // При клике на лого выозвращяем рестораны
        logo.addEventListener('click', desc)

        //  Реализуем Слайдер в Промо https://swiperjs.com
        new Swiper('.swiper-container', {
        // Optional parameters 
        // https://swiperjs.com/api/

        // direction: 'vertical',
        loop: true,
        // autoplay: true,
        autoplay: {
          delay: 5000
        },
        // slidesPerView: 1,
        // spaceBetween: 10
        })

        checkAuth();

}


init();