/* eslint-disable no-undef */
'use strict';

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

var getRandom = function (array) {
  var index = Math.floor(Math.random() * array.length);
  return array[index];
};

var getWizard = function () {
  var wizard = {};
  wizard.name = getRandom(names) + ' ' + getRandom(surnames);
  wizard.coatColor = getRandom(coatColors);
  wizard.eyesColor = getRandom(eyesColors);

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

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var nameInput = setup.querySelector('.setup-user-name');
var wizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
var wizardFireball = setup.querySelector('.setup-fireball-wrap');
var coatColorInput = setup.querySelector('input[name = \'coat-color\']');
var eyesColorInput = setup.querySelector('input[name = \'eyes-color\']');
var fireballColorInput = setup.querySelector('input[name = \'fireball-color\']');
var openCoords = {};

var setCoatColor = function (evt) {
  var randomColor = getRandom(coatColors);
  evt.currentTarget.style.fill = randomColor;
  coatColorInput.value = randomColor;
};

var setEyesColor = function (evt) {
  var randomColor = getRandom(eyesColors);
  evt.currentTarget.style.fill = randomColor;
  eyesColorInput.value = randomColor;
};

var setFireBallColor = function (evt) {
  var randomColor = getRandom(fireballColors);
  evt.currentTarget.style.background = randomColor;
  fireballColorInput.value = randomColor;
};

wizardCoat.addEventListener('click', setCoatColor);

wizardEyes.addEventListener('click', setEyesColor);

wizardFireball.addEventListener('click', setFireBallColor);

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  openCoords.x = setup.offsetLeft;
  openCoords.y = setup.offsetTop;
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  setup.style.top = openCoords.y + 'px';
  setup.style.left = openCoords.x + 'px';
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function () {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

nameInput.addEventListener('focus', function () {
  document.removeEventListener('keydown', onPopupEscPress);
});

nameInput.addEventListener('blur', function () {
  document.addEventListener('keydown', onPopupEscPress);
});

var dialogHandler = setup.querySelector('.upload');

dialogHandler.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var dragged = false;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    dragged = true;

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    setup.style.top = (setup.offsetTop - shift.y) + 'px';
    setup.style.left = (setup.offsetLeft - shift.x) + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (dragged) {
      var onClickPreventDefault = function (evt) {
        evt.preventDefault();
        dialogHandler.removeEventListener('click', onClickPreventDefault);
      };
      dialogHandler.addEventListener('click', onClickPreventDefault);
    }
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
