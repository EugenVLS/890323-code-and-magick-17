/* eslint-disable no-undef */
'use strict';

// Модуль setup.js
(function () {
  var userDialog = document.querySelector('.setup');

  var similarListElement = userDialog.querySelector('.setup-similar-list');

  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
  var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var amount = 4;

  var getWizard = function () {
    var wizard = {};

    wizard.name = window.util.getRandom(names) + ' ' + window.util.getRandom(surnames);
    wizard.coatColor = window.util.getRandom(coatColors);
    wizard.eyesColor = window.util.getRandom(eyesColors);

    return wizard;
  };

  var generateWizards = function () {
    var wizards = [];

    for (var i = 0; i < amount; i++) {
      wizards[i] = getWizard();
    }

    return wizards;
  };

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var showWizards = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < wizards.length; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }

    similarListElement.appendChild(fragment);
  };

  var wizards = generateWizards();

  showWizards(wizards);

  userDialog.querySelector('.setup-similar').classList.remove('hidden');

  var setup = document.querySelector('.setup');
  var wizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireball = setup.querySelector('.setup-fireball-wrap');
  var coatColorInput = setup.querySelector('input[name = \'coat-color\']');
  var eyesColorInput = setup.querySelector('input[name = \'eyes-color\']');
  var fireballColorInput = setup.querySelector('input[name = \'fireball-color\']');

  var setCoatColor = function (evt) {
    var randomColor = window.util.getRandom(coatColors);
    evt.currentTarget.style.fill = randomColor;
    coatColorInput.value = randomColor;
  };

  var setEyesColor = function (evt) {
    var randomColor = window.util.getRandom(eyesColors);
    evt.currentTarget.style.fill = randomColor;
    eyesColorInput.value = randomColor;
  };

  var setFireBallColor = function (evt) {
    var randomColor = window.util.getRandom(fireballColors);
    evt.currentTarget.style.background = randomColor;
    fireballColorInput.value = randomColor;
  };

  wizardCoat.addEventListener('click', setCoatColor);

  wizardEyes.addEventListener('click', setEyesColor);

  wizardFireball.addEventListener('click', setFireBallColor);
})();
