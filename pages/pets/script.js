document.addEventListener('DOMContentLoaded', () => {
  function getPageWidth() {
    const element = document.createElement('div');

    element.style.overflowY = 'scroll';
    element.style.width = '50px';
    element.style.height = '50px';

    // Вставить элемент в документ, иначе размеры будут равны 0.
    document.body.appendChild(element);
    const scrollWidth = element.offsetWidth - element.clientWidth;

    element.remove();

    return document.body.clientWidth + scrollWidth;
  }

  function createPetCard({ img, name }) {
    const element = document.createElement('div');
    element.classList.add('friends__animal-card');
    element.innerHTML = `
      <img class="friends__animal-photo" src="${img}" alt="${name}">
      <div class="friends__animal-name">${name}</div>
      <button class="shelter-button--secondary friends__button-card">Learn more</button>
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

  // Вычислить количество карточек на странице,
  // опираясь на ширину вкладки браузера.
  function getCountCardsOnPage() {
    const pageWidth = getPageWidth();
    return pageWidth < 768 ? 3 : pageWidth < 1280 ? 6 : 8;
  }

  function getPagesMap(pets, countCardsOnPage) {
    // Создать пустой массив, который в последствии будет содержать 48 питомцев,
    // каждый из которых будет повторяться 6 раз.
    // Вместе с этим каждому питомцу будет присвоен уникальный `id`.
    const paginationPets = [];
    for (let index = 0; index < 6; index++) {
      const part = pets.map(function(pet) {
        return {
          ...pet,
          id: index * pets.length + pet.id,
        };
      });
      paginationPets.push(...part);
    }

    // `pagesMap` будет содержать пары "ключ:значение".
    // Ключ - номер страницы, значение - массив питомцев, отображаемых на определенной странице.
    const pagesMap = new Map();
    const pageCount = paginationPets.length / countCardsOnPage;
    for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
      const petsOnCurrentPage = paginationPets.splice(0, countCardsOnPage);
      const mixedPetsForCurrentPage = [];
      for (let index = 1; index <= countCardsOnPage; index++) {
        mixedPetsForCurrentPage.push(getRandomItem(petsOnCurrentPage));
      }
      pagesMap.set(pageNumber, mixedPetsForCurrentPage);
    }
    return pagesMap;
  }

  // Получаем данные с преобразованными путями.
  const pets = getPets()
    .map(pet => {
      return {
        ...pet,
        img: '../../data' + pet.img,
      };
    });

  // Получаем ссылку на контейнер с карточками, удаляем карточки из HTML, используя массив питомцев,
  // создаем карточки и добавляем их в контейнер.
  const cardsContainerElement = document.getElementsByClassName('friends__animal-container')[0];
  function displayCards(pets, cardsContainerElement) {
    cardsContainerElement.innerHTML = '';
    pets.forEach(pet => {
      const petCard = createPetCard(pet);
      petCard.addEventListener('click', (pointerEvent) => {
        // Создаем информационную карточку питомца и показываем попап с ней.
        const petPopupContent = createContent(pet);
        openPopup(petPopupContent);
      });
      cardsContainerElement.appendChild(petCard);
    });
  }

  const countCardsOnPage = getCountCardsOnPage();
  const pagesMap = getPagesMap(pets, countCardsOnPage);

  const firstPageButtonElement = document.getElementsByClassName('friends__button--double-back')[0];
  const previousPageButtonElement = document.getElementsByClassName('friends__button--back')[0];
  const currentPageButtonElement = document.getElementsByClassName('friends__button--current')[0];
  const nextPageButtonElement = document.getElementsByClassName('friends-button--next')[0];
  const lastPageButtonElement = document.getElementsByClassName('friends-button--double-next')[0];

  let currentPageNumber = 1;
  displayCards(pagesMap.get(currentPageNumber), cardsContainerElement);

  firstPageButtonElement.addEventListener('click', () => {
    currentPageNumber = 1;
    displayCards(pagesMap.get(currentPageNumber), cardsContainerElement);
    currentPageButtonElement.innerText = currentPageNumber;
    firstPageButtonElement.setAttribute('disabled', 'true');
    previousPageButtonElement.setAttribute('disabled', 'true');
    lastPageButtonElement.removeAttribute('disabled');
    nextPageButtonElement.removeAttribute('disabled');
  });

  previousPageButtonElement.addEventListener('click', () => {
    currentPageNumber--;
    displayCards(pagesMap.get(currentPageNumber), cardsContainerElement);
    currentPageButtonElement.innerText = currentPageNumber;
    if (currentPageNumber === 1) {
      previousPageButtonElement.setAttribute('disabled', 'true');
      firstPageButtonElement.setAttribute('disabled', 'true');
    }
    nextPageButtonElement.removeAttribute('disabled');
    lastPageButtonElement.removeAttribute('disabled');
  });

  nextPageButtonElement.addEventListener('click', () => {
    currentPageNumber++;
    displayCards(pagesMap.get(currentPageNumber), cardsContainerElement);
    currentPageButtonElement.innerText = currentPageNumber;
    if (currentPageNumber === pagesMap.size) {
      nextPageButtonElement.setAttribute('disabled', 'true');
      lastPageButtonElement.setAttribute('disabled', 'true');
    }
    previousPageButtonElement.removeAttribute('disabled');
    firstPageButtonElement.removeAttribute('disabled');
  });

  lastPageButtonElement.addEventListener('click', () => {
    currentPageNumber = pagesMap.size;
    displayCards(pagesMap.get(currentPageNumber), cardsContainerElement);
    currentPageButtonElement.innerText = currentPageNumber;
    lastPageButtonElement.setAttribute('disabled', 'true');
    nextPageButtonElement.setAttribute('disabled', 'true');
    previousPageButtonElement.removeAttribute('disabled');
    firstPageButtonElement.removeAttribute('disabled');
  });
});
