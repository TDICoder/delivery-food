
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
const inputSearch = document.querySelector('.input-search');
const sectionHeading = document.querySelector('.rest-heading');

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

// Получаем значение из локалсторадж при обновлении страницы
let login = '', password = '';
login = localStorage.getItem('delivery');

//4 Корзина
const cart = [];

const modalBody = document.querySelector('.modal-body');
const modalPrice = document.querySelector('.modal-pricetag');
const clearCart = document.querySelector('.clear-cart');

// getData('./db/partners.json');

//console.log(buttonLogin);

function saveCart() {
    localStorage.setItem(login+'Cart',JSON.stringify(cart)); // Сохраняем значение корзины в локалсторадж
}

function loadCart() {
  const cartJson =  localStorage.getItem(login+'Cart');      
  if(cartJson)
  {
    cart.length = 0;
      //cart = JSON.parse(cartJson);
    cart.push(...JSON.parse(cartJson));
  // console.log('cart: ', JSON.parse(cartJson));
  }

}

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
    loadCart();

        function logOut(){
          // Возврат на главную
          desc();
          ////////////////////////////////

          localStorage.removeItem('delivery');
          // localStorage.removeItem(login+'Cart');

          login = null;  password = null; 
          buttonAuth.style.display = '';
          userName.style.display = '';
          buttonOut.style.display = '';
          // Скрываем корзину
          cartButton.style.display = '';

          cart.length = 0;

          buttonOut.removeEventListener("click",logOut);
          checkAuth();
        }

  userName.textContent = login;

  // Показываем корзину
  cartButton.style.display = 'flex';

  buttonAuth.style.display = 'none';
  userName.style.display = 'inline';
  buttonOut.style.display = 'flex';

  buttonOut.addEventListener("click",logOut);


}

// function checkAuth() {
//   if (login) {
//       authorized();
//     } else {
//       notAuthorized();
//     }
//   }

const checkAuth = ()=> login ? authorized() : notAuthorized();



// Функуия формирования верстки и вывода ресторанов в DOM на главную
function createCardRestaurant(restaurant) {
  /* 
  Получаем обьект restaurant, разбираем его на переменные, формируем вертску и вставляем в DOM внутрь элемента cardsRestaurants
  */

  // console.log(restaurant);
  // console.log(restaurant.name);
  // console.log(restaurant.price);

// деструктуризация - получаем переменные с именами по ключу обьекта (как пример в момент деструктуризации переименуем переменную time_of_delivery обьекта restaurant в timeOfDelivery )
const { image, kitchen, price, name, stars, products, time_of_delivery: timeOfDelivery } = restaurant;
// console.log(image, kitchen, price, name, stars, products, timeOfDelivery);

  // Формируем верстку ресторана
  const card = `
      <a class="card card-restaurant" 
      data-menu="${products}"
      data-info="${[name,price,stars,image,timeOfDelivery,kitchen]}">
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




// Функуия верстки блюд
function createCardGood(goods) {
  /*Принимаем goods, деструктуризируем, создаем элемент cardGood, добавляем ему атрибут id и класс card, 
  формируем верстку для Карточки блюда, вставляем эту верствку в наш созданный  элемент cardGood, После чего вставляем сам элемент cardGood в DOM*/

  // console.log('goods: ', goods);
  const { price, id, image, name, description } = goods
  // console.log(price);
  
  // Создаем оболочку для верстки товара и добаялем класс  card
  const cardGood = document.createElement('div');
  cardGood.setAttribute('id', id); 
  // cardGood.id = id;
  cardGood.className = 'card';
  // сама верстка блюда
  const good =  `
        <img src="${image}" alt="${name}" class="card-image"/>
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
            <strong class="card-price card-price-bold">${price} ₽</strong>
          </div>
        </div>
      `;
  // Добавляем good в cardGood
  cardGood.insertAdjacentHTML('beforeend',good);
   // Вставляем в ДОМ, внутрь элемента cardsMenu
  cardsMenu.insertAdjacentElement('beforeend',cardGood);
}


// Функция Клика на ресторан
function openGoods (event) {
  // определяем куда конкретно кликнули
  const target = event.target;
  // определяем верхнюю оболчку карточки,closest поднимается выше до селектора (класса) cards-restaurants
  const restaurant = target.closest('.card-restaurant');
  // console.log('restaurant',restaurant);
  // console.log(restaurant.querySelector('.card-title'));

  // скрываем все рестораны, показываем меню
  if(restaurant) { 

    // const sectionHeading = document.querySelector('.rest-heading');
                // console.log(sectionHeading);
                // console.log(restaurant.dataset.info.split(',')); // Парсим строку с разделителем , из атрибута data-info ресторана
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

//Функция на кнопку добавления в корзину
function addToCart(event){
  const target = event.target;
    // console.log('target: ', target);
  const buttonAddToCart = target.closest('.button-add-cart');
    // console.log('buttonAddToCart: ', buttonAddToCart);

  if(buttonAddToCart){

    const card = target.closest('.card');

    const title = card.querySelector('.card-title-reg').textContent;
    const cost = card.querySelector('.card-price').textContent;
    const id = card.id;
    
    
    /* Проверяем нет ли в нашей корзине уже этого id. Для этого берем метод find.
      find ищет в массиве элемент по совпадению - условию описанной в функции 
    */
  // Создаем новый массив
    const food = cart.find(function(item){
      // console.log('id: ', id);
      return item.id === id
    });


      if(food) {
        food.count++;
      }
      else {
        cart.push({ id, title, cost, count: 1 })
      }

    console.log('food: ', food);
    console.log('cart: ', cart);

    saveCart();
      
  }
}


// Список в корзине - рендер 
function renderCart() {
  modalBody.textContent = '';
  modalPrice.textContent = '0 ₽';
  
  cart.forEach(function({ id, title, cost, count }){

    const cartRow =`
        <div class="food-row">
          <span class="food-name">${title}</span>
          <strong class="food-price">${cost}</strong>
          <div class="food-counter">
              <button class="counter-button counter-minus" data-id="${id}">-</button>
              <span class="counter">${count}</span>
              <button class="counter-button counter-plus" data-id="${id}">+</button>
          </div>
        </div>`;

    modalBody.insertAdjacentHTML('afterbegin',cartRow);

    const totalPrice = cart.reduce(function(result,item) { 
      return result + (parseFloat(item.cost))*item.count }, 0)

      modalPrice.textContent = totalPrice + ' ₽';

  });



}


// 
function changeCount(event){
  const target = event.target;
  if(target.classList.contains('counter-button')){
    const food = cart.find(function(item){
      return item.id === target.dataset.id
    });

      if (target.classList.contains('counter-minus')) {
        food.count--;
                if(food.count === 0) {
                cart.splice(cart.indexOf(food), 1);
        }
      }

    if (target.classList.contains('counter-plus')) food.count++;

    saveCart();
    renderCart();
  }
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
        cartButton.addEventListener("click", function(){
          renderCart();
          toggleModal();
        });
        // Клик на закрытие карзины
        close.addEventListener("click", toggleModal);
        // Клик на ресторан
        cardsRestaurants.addEventListener('click',openGoods)
        // При клике на лого выозвращяем рестораны
        logo.addEventListener('click', desc)

        // 
        cardsMenu.addEventListener('click',addToCart);

        // 
        modalBody.addEventListener('click',changeCount);

        // 
        clearCart.addEventListener('click',function(){
          cart.length = 0;
          localStorage.removeItem(Login+'Cart');
          renderCart();
        });

        //Поиск блюд по Enter
        inputSearch.addEventListener('keydown', function(event){
          // console.log('event.key: ', event.key);
          // console.log('event.key: ', event.keyCode);
          if(event.keyCode === 13) {
            // Сохраняем значения ввода до 13 в target
            const target = event.target.value.toLowerCase().trim();
            event.target.value = '';
            if(!target || target.length < 3) {
              event.target.style.backgroundColor = 'tomato';
              setTimeout(function(){event.target.style.backgroundColor = ''}, 2000)
              return;
            }
            // console.log(target);
            // Сначала будем получаеть все товары
            const menuAll = [];
            // // Будущий отфильрованный по target массив с подходящими элементиами  
            // const menuSearch = [];

            // Идем на сервер, передаем фильтр target и получаем массив для рендера (.php?Search=${target})
            getData('./db/partners.json')
              .then(function(rests) {
                // Метод map() создаёт новый массив с результатом true для каждого элемента массива.
                const menuLinks = rests.map(function(item){
                  return item.products;
                });
                // console.log('products: ', products);

                // Бежим по адресам ресторанов, получаем меню каждого, и записываем все в наш массив menuAll
                menuLinks.forEach(link => {
                  // console.log('link: ', link);

                  getData('./db/'+ link)
                    .then(function(menuRest){
                      // ... spread оператор посогает обьединить в один массив
                      menuAll.push(...menuRest);
                      // console.log('menuAll: ', menuAll);

                      const menuSearch = menuAll.filter(function(item){
                        return item.name.toLowerCase().includes(target);
                      });

                      sectionHeading.textContent = '';
                      sectionHeading.insertAdjacentHTML('beforeend','<h2 class="section-title restaurant-title">Результат поиска</h2>');

                      cardsMenu.textContent = '';
                      containerPromo.classList.add('hide');
                      restaurants.classList.add('hide');
                      menu.classList.remove('hide');
                      return menuSearch;

                    })
                    .then(function(menuSearch){
                      // console.log('menuSearch: ', menuSearch);
                      menuSearch.forEach(createCardGood);
                    });
                });

            });

          }
        })

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