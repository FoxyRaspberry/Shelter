document.addEventListener('DOMContentLoaded', () => {
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
});
