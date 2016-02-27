define(['underscore', 'backbone'], function(_, Backbone) {
  var TweetModel = Backbone.Model.extend({

    initialize: function(){
      console.log('TweetModel initialized')
    },

  });

  return TweetModel;
});
