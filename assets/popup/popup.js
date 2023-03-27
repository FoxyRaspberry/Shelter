// Global functions.

function createContent({ breed, name, type, history, age, inoculations, diseases, parasites, img }) {
  const element = document.createElement('div');
  element.classList.add('shelter-popup__pet-card');
  element.innerHTML = `
    <img class="shelter-popup__pet-image" src="${img}" alt="Pet ${name}">
    <div class="shelter-popup__pet-description">
      <h3 class="shelter-header-three shelter-popup__pet-name">${name}</h3>
      <h4 class="shelter-header-four shelter-popup__pet-breed">${type} - ${breed}</h4>
      <h5 class="shelter-header-five shelter-popup__pet-history">${history}</h5>
      <ul class="shelter-popup__pet-characteristics-list">
        <li class="shelter-header-five shelter-popup__pet-characteristics"><b>Age:</b> ${age}</li>
        <li class="shelter-header-five shelter-popup__pet-characteristics"><b>Inoculations:</b> ${inoculations.join(', ')}</li>
        <li class="shelter-header-five shelter-popup__pet-characteristics"><b>Diseases:</b> ${diseases.join(', ')}</li>
        <li class="shelter-header-five shelter-popup__pet-characteristics"><b>Parasites:</b> ${parasites.join(', ')}</li>
      </ul>
    </div>
  `;
  return element;
}

function createPopup() {
  const sectionElement = document.createElement('section');
  sectionElement.classList.add('shelter-popup__section');

  const containerElement = document.createElement('div');
  containerElement.classList.add('shelter-popup__container');

  const closeElement = document.createElement('button');
  closeElement.classList.add('shelter-close-button', 'shelter-popup__button-close');
  closeElement.innerHTML = '&times;';

  containerElement.appendChild(closeElement);
  sectionElement.appendChild(containerElement);

  return {
    closeElement,
    containerElement,
    sectionElement,
  };
}

function openPopup(contentElement) {
  switchBodyScrollable(true);
  const blackoutElement = createBlackout();
  document.body.appendChild(blackoutElement);
  const {
    closeElement,
    containerElement,
    sectionElement,
  } = createPopup();
  containerElement.appendChild(contentElement);
  document.body.appendChild(sectionElement);

  const handleClick = (pointerEvent) => {
    if (pointerEvent.target !== sectionElement && pointerEvent.target !== closeElement) return;
    closePopup(blackoutElement, sectionElement);
    sectionElement.removeEventListener('click', handleClick);
  };

  sectionElement.addEventListener('click', handleClick);
}

function createBlackout() {
  const element = document.createElement('div');
  element.classList.add('shelter-popup__blackout');
  return element;
}

function switchBodyScrollable(fixed) {
  if (fixed) {
    document.body.classList.add('shelter-popup--fix-scroll');
  } else {
    document.body.classList.remove('shelter-popup--fix-scroll');
  }
}

function closePopup(blackoutElement, popupElement) {
  switchBodyScrollable(false);
  blackoutElement.remove();
  popupElement.remove();
}
