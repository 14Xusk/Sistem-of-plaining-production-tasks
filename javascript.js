/*Обработчики событий применяются для реакции на действия пользователя. При клике на кнопку "удалить", модальное окно отображается на странице. Кнопка "нет" закрывает модальное окно, а кнопка "да" закрывает модальное окно и отображает сообщение об успешном удалении товаров. Кнопка "перейти в каталог" скрывает сообщение об успешном удалении товаров. Если бы мы использовали этот поп-ап на реальном интернет-магазине, можно было бы после удаления товаров из корзины  сразу переводить пользователя обратно в каталог.*/

// deleteBtn - переменная, содержащая ссылку на кнопку "удалить" на странице.
const deleteBtn = document.getElementById("delete-btn");

// popup - переменная, содержащая ссылку на модальное окно на странице.
const popup = document.getElementById("popup");

// noBtn - переменная, содержащая ссылку на кнопку "нет" в модальном окне на странице.
const noBtn = document.getElementById("no-btn");

// yesBtn - переменная, содержащая ссылку на кнопку "да" в модальном окне на странице.
const yesBtn = document.getElementById("yes-btn");

// success - переменная, содержащая ссылку на блок с сообщением об успешном удалении товаров.
const success = document.getElementById("success");

// buyBtn - переменная, содержащая ссылку на кнопку "начать покупки" на странице.
const buyBtn = document.getElementById("buy-btn");

// данная строка кода получает элемент с id "overlay" из HTML документа и сохраняет его в переменной "overlay"
const overlay = document.getElementById("overlay");

// добавляем обработчик событий на клик по кнопке с id "deleteBtn"
deleteBtn.addEventListener("click", () => {
  // при клике на кнопку "deleteBtn" устанавливаем CSS свойство "display" элемента с id "popup" на "block", чтобы показать попап.
  popup.style.display = "block";

  // добавляется класс "show" к элементу с id "overlay", чтобы показать затемнение.
  overlay.classList.add("show");
});

// добавляем обработчик событий на клик по кнопке с id "noBtn"
noBtn.addEventListener("click", () => {
  // при клике на кнопку "noBtn" устанавливаем CSS свойство "display" элемента с id "popup" на "none", чтобы скрыть попап.
  popup.style.display = "none";

  // удаляется класс "show" у элемента с id "overlay", чтобы скрыть затемнение.
  overlay.classList.remove("show");
});

// добавляем обработчик событий на клик по кнопке с id "yesBtn"
yesBtn.addEventListener("click", () => {
  // при клике на кнопку "yesBtn" устанавливаем CSS свойство "display" элемента с id "popup" на "none", чтобы скрыть попап.
  popup.style.display = "none";

  // при клике на кнопку "yesBtn" устанавливаем CSS свойство "display" элемента с id "success" на "block", чтобы показать сообщение об успешном удалении товаров.
  success.style.display = "block";

  // добавляется класс "show" к элементу с id "overlay", чтобы показать затемнение.
  overlay.classList.add("show");
});

// добавляем обработчик событий на клик по кнопке с id "buyBtn"
buyBtn.addEventListener("click", () => {
  // при клике на кнопку "buyBtn" устанавливаем CSS свойство "display" элемента с id "success" на "none", чтобы скрыть сообщение об успешном удалении товаров.
  success.style.display = "none";

  // удаляется класс "show" у элемента с id "overlay", чтобы скрыть затемнение.
  overlay.classList.remove("show");
});