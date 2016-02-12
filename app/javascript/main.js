
require.config({
  paths: {
    jquery: '../../node_modules/jquery/dist/jquery.min',
    underscore: '../../node_modules/backbone/node_modules/underscore/underscore-min',
    backbone: '../../node_modules/backbone/backbone-min'
  }

});

require([
  'app',
], function(App){
  console.log('App', App);
  var app = new App();
});