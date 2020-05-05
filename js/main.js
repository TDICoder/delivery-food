const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}

//Day 1

//1.Получаем элементы 
//2. Функции
//2. Навешиваем события 

// ПЕРЕМЕННЫЕ/////////////////////////////////////////////////////////////////////////
const buttonAuth = document.querySelector(".button-auth");
const modalAuth = document.querySelector(".modal-auth");
const closeModalAuth = document.querySelector(".close-auth");
const logInForm = document.getElementById("logInForm");
const loginInput = document.querySelector("#login");
const loginPass = document.querySelector("#password")
const userName = document.querySelector(".user-name")
const buttonOut = document.querySelector(".button-out")

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

// ФУНКЦИИ////////////////////////////////////////////////////////////////////////////
// Скрыть/показать модальное окно Авторизации
function toggleModalAuth()  {
  modalAuth.classList.toggle('is-open');
}

//Если не Авторизован
function notAuthorized () {

  console.log('не авторизован');

          function logIn(event){
            //console.log('логин');
            // Выключаем отправку формы по submit
            event.preventDefault();  
            
            login = loginInput.value;
            password = loginPass.value;

            localStorage.setItem('delivery',login); // Сохраняем значение инпут в локалсторадж
            //console.log(login);

            //  debugger;
           
            if (login && password ) {
              loginInput.placeholder = '';loginPass.placeholder = '';
              toggleModalAuth();
              buttonAuth.removeEventListener("click",toggleModalAuth)
              closeModalAuth.removeEventListener("click",toggleModalAuth);
              logInForm.removeEventListener("submit",logIn);
              logInForm.reset(); // Очистить все инпуты формы
              checkAuth();
            }
            else {
              if(!login) { loginInput.placeholder = 'Обязательное поле'; loginInput.focus(); return;}
              if(!password) { loginPass.placeholder = 'Обязательное поле'; loginPass.focus(); }
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

}

function checkAuth() {
  if (login) {
      authorized();
    } else {
      notAuthorized();
    }
  }


// Запуск, СОБЫТИЯ////////////////////////////////////////////////////////////////////////////

checkAuth();