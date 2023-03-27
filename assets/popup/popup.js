// Global function.
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
