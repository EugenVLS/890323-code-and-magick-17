'use strict';

// Модуль stat.js
(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var GAP = 10;
  var HORIZONTAL_GAP = 50;
  var BAR_WIDTH = 40;
  var BAR_HEIGHT = 150;

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;

    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var getMaxElement = function (arr) {
    if (arr.length > 0) {
      var maxElement = arr[0];
    }

    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }
    return maxElement;
  };

  var getColors = function (numberOfPlayers) {
    var colors = [];
    var i = 0;

    while (colors.length < numberOfPlayers) {
      var saturation = Math.round(Math.random() * numberOfPlayers) / numberOfPlayers * 100;
      var color = ' hsl(240, ' + saturation + '%, 50%)';

      if (colors.indexOf(color) === -1) {
        colors[i] = color;
        i++;
      }
    }
    return colors;
  };

  var getX = function (index) {
    var x = CLOUD_X + HORIZONTAL_GAP + (HORIZONTAL_GAP + BAR_WIDTH) * index;
    return x;
  };

  var getY = function (index, maxTime, time) {
    var y = CLOUD_HEIGHT - 3 * GAP - (BAR_HEIGHT * time) / maxTime;
    return y;
  };

  var getHeight = function (maxTime, time) {
    var height = (BAR_HEIGHT * time) / maxTime;
    return height;
  };

  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

    ctx.font = '16px PT Mono';
    ctx.textBaseline = 'hanging';

    ctx.fillStyle = '#000';
    ctx.fillText('Ура вы победили!', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 2);
    ctx.fillText('Cписок результатов:', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 4);

    var maxTime = getMaxElement(times);
    var colors = getColors(names.length);

    for (var i = 0; i < names.length; i++) {

      if (names[i] === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      } else {
        ctx.fillStyle = colors[i];
      }

      var x = getX(i);
      var y = getY(i, maxTime, times[i]);
      var height = getHeight(maxTime, times[i]);

      ctx.fillText(Math.round(times[i]), x, y - 2 * GAP);
      ctx.fillRect(x, y, BAR_WIDTH, height);
      ctx.fillText(names[i], x, y + height + GAP);
    }
  };
})();
