'use strict';

(function () {
  var userDialog = document.querySelector('.setup');

  var similarListElement = userDialog.querySelector('.setup-similar-list');

  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var similar = userDialog.querySelector('.setup-similar');

  var renderWizard = function (wizard) {
    var element = similarWizardTemplate.cloneNode(true);

    element.querySelector('.setup-similar-label').textContent = wizard.name;
    element.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    element.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return element;
  };

  window.render = function (data) {
    var fragment = document.createDocumentFragment();
    var takeNumber = data.length > 4 ? 4 : data.length;
    similarListElement.innerHTML = '';

    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(renderWizard(data[i]));
    }

    similarListElement.appendChild(fragment);
    similar.classList.remove('hidden');
  };
})();

