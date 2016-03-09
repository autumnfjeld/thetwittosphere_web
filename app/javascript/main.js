
require.config({
  paths: {
    jquery: '../vendor/jquery.min',
    underscore: '../vendor/underscore-min',
    backbone: '../vendor/backbone-min'
  }

});

require([
  'app',
], function(App){
  var app = new App();
});