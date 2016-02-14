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
       "keypress #twitter-screen-name":  "createOnEnter",
      },

      initialize: function() {
        console.log('App.initialize');
        _.bindAll(this, 'render');

        this.input = this.$("#twitter-screen-name");
      },

      render: function() {
        console.log('running render function')
      },

      createOnEnter: function(e) {
        if (e.keyCode != 13) return;
        console.log('input was', this.input.val());
        Tweets.fetch();
      }

    });

    return AppView;
});
