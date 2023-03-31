document.addEventListener('DOMContentLoaded', () => {
  function createPetCard({ img, name }) {
    const element = document.createElement('div');
    element.classList.add('pets__animal-card');
    element.innerHTML = `
      <img class="pets__animal-photo" alt="${name}" src="${img}">
      <div class="pets__animal-name">${name}</div>
      <button class="shelter-button--secondary pets__button-card">Learn more</button>
    `;
    return element;
  }

  // Возвращает псевдослучайное целое число в диапазоне.
  function getRandomNumber(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }

  function getRandomItem(array) {
    const index = getRandomNumber(0, array.length - 1);
    const item = array[index];
    array.splice(index, 1);
    return item;
  }

  // Получаем данные с преобразованными путями.
  const pets = getPets()
    .map(pet => {
      return {
        ...pet,
        img: '../../data' + pet.img,
      };
  });

  // Может содержать все карточки или все, кроме отображаемых карточек.
  const cardDeck = [...pets];
  
  // Предыдущий набор карточек.
  // Служит промежуточным местом хранения карточек для пополнения колоды `cardDeck`.
  let previousCards = [];

  // Карточки, которые хотим отобразить в карусели.
  let cardsToDisplay = [];

  // Массив применённых функций (event listeners), чтобы помнить, от чего надо отписаться.
  let addedEventListeners = [];

  // Перебор карточек. Генерируем новый набор карточек для отображения.
  // Вместе с этим:
  // * запоминаем предыдущий набор карточек
  // * восполняем `cardDeck`
  function moveCardsBetweenDecks() {
    previousCards = [...cardsToDisplay];
    cardsToDisplay = [];
    let limit = 3;
    while (limit--) {
      cardsToDisplay.push(getRandomItem(cardDeck));
    }
    previousCards.forEach(card => cardDeck.push(card));
  }

  // Отображает карточки питомцев.
  function displayPetCards(cardsContainerElement) {
    // Отписаться и очистить массив действующих подписок.
    addedEventListeners.forEach(({ eventListener, petCardElement }) => {
      petCardElement.removeEventListener('click', eventListener);
    });
    addedEventListeners = [];

    cardsContainerElement.innerHTML = '';
    cardsToDisplay.forEach(pet => {
      const petCardElement = createPetCard(pet);
      // Определить функцию подписки: создать информационную карточку питомца и показать попап с ней.
      const eventListener = (pointerEvent) => {
        const petPopupContent = createContent(pet);
        openPopup(petPopupContent);
      };

      // Положить элемент и функцию в массив.
      addedEventListeners.push({
        eventListener,
        petCardElement,
      });

      // Использовать функцию для подписки.
      petCardElement.addEventListener('click', eventListener);

      cardsContainerElement.appendChild(petCardElement);
    });
  }

  function shuffleAndShowCards() {
    moveCardsBetweenDecks();
    displayPetCards(cardsContainerElement);
  }

  // Получить ссылку на контейнер с карточками, удалить карточки из HTML, используя массив питомцев,
  // создать карточки и добавить их в контейнер.
  const cardsContainerElement = document.getElementsByClassName('pets__animal-container')[0];
  shuffleAndShowCards();

  // Обработать клик по стрелочкам, генерировать новые карточки, вывести на дисплей.
  const previousSlideButtonElement = document.getElementsByClassName('pets__button-arrow-adaptive')[0];
  previousSlideButtonElement.addEventListener('click', shuffleAndShowCards);

  const nextSlideButtonElement = document.getElementsByClassName('pets__button-reversed-adaptive')[0];
  nextSlideButtonElement.addEventListener('click', shuffleAndShowCards);
});
