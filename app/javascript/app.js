//app module handles initial/'home' view and events

define([
  'jquery',
  'underscore', 
  'backbone',
  'tweets/tweets.collection',
  'tweets/tweet.view'
  ], function($, _, Backbone, Tweets, TweetView){
    var AppView = Backbone.View.extend({

      // bind to existing app container
      el: $("#app-container"),

      events: {
       "keypress #screen-name-input":  "fetchTweets",
      },

      initialize: function() {
        console.log('App.initialize');
        _.bindAll(this, 'render', 'addTweetView');

        this.input = this.$("#screen-name-input");

        Tweets.bind('add', this.addTweetView);
      },

      render: function() {
        console.log('running render function');
      },

      fetchTweets: function(e) {
        if (e.keyCode != 13) return;
        var screenName = this.input.val();
        console.log('input was', screenName);

        Tweets.fetch({
          data: {screen_name: screenName},
          error:  error
        });

        function error(err){
          console.log('ERROR: Tweets.fetch', err);
        }
      },

      addTweetView: function(tweet){
        var tweetView = new TweetView({model: tweet});
        this.$("#tweet-list-box").append(tweetView.render().el);
      }

    });

    return AppView;
});
