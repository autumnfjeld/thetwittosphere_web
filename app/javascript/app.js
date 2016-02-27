//app module handles initial/'home' view and events

define([
  'jquery',
  'underscore', 
  'backbone',
  'tweets/tweets.collection'
  ], function($, _, Backbone, Tweets){
    var AppView = Backbone.View.extend({

      // bind to existing app container
      el: $("#app-container"),

      events: {
       "keypress #screen-name-input":  "createOnEnter",
      },

      initialize: function() {
        console.log('App.initialize');
        _.bindAll(this, 'render');

        this.input = this.$("#screen-name-input");
      },

      render: function() {
        console.log('running render function')
      },

      createOnEnter: function(e) {
        if (e.keyCode != 13) return;
        var screenName = this.input.val();
        console.log('input was', screenName);
        Tweets.fetch({
          data: {screen_name: screenName},
          success: success,
          error:  error
        });
        //Either listen to a “change” event on the model or provide a “success” callback in the fetch method, to know when the data has been returned so that you can load it in to your view and display it as needed.
        function success(model, response){
          console.log('SUCCESS: Tweets.fetch', model, response);
        }

        function error(err){
          console.log('ERROR: Tweets.fetch', err);
        }
      }

    });

    return AppView;
});
