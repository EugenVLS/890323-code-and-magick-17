/* eslint-disable no-undef */
'use strict';

// Модуль setup.js
(function () {
  var COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];

  var EYES_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'];

  var FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  var userDialog = document.querySelector('.setup');
  var form = userDialog.querySelector('.setup-wizard-form');
  var setup = document.querySelector('.setup');
  var wizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireball = setup.querySelector('.setup-fireball-wrap');
  var coatColorInput = setup.querySelector('input[name = \'coat-color\']');
  var eyesColorInput = setup.querySelector('input[name = \'eyes-color\']');
  var fireballColorInput = setup.querySelector('input[name = \'fireball-color\']');
  window.setup = {};

  var setCoatColor = function (evt) {
    var newColor = window.util.getRandom(COAT_COLORS);
    evt.currentTarget.style.fill = newColor;
    coatColorInput.value = newColor;
    window.wizard.onCoatChange(newColor);
  };

  var setEyesColor = function (evt) {
    var newColor = window.util.getRandom(EYES_COLORS);
    evt.currentTarget.style.fill = newColor;
    eyesColorInput.value = newColor;
    window.wizard.onEyesChange(newColor);
  };

  var setFireBallColor = function (evt) {
    var newColor = window.util.getRandom(FIREBALL_COLORS);
    evt.currentTarget.style.background = newColor;
    fireballColorInput.value = newColor;
  };

  wizardCoat.addEventListener('click', setCoatColor);

  wizardEyes.addEventListener('click', setEyesColor);

  wizardFireball.addEventListener('click', setFireBallColor);

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      setup.classList.add('hidden');
    });
    evt.preventDefault();
  });
})();
