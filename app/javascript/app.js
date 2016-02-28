//app module handles initial/'home' view and events

define([
  'jquery',
  'underscore', 
  'backbone',
  'tweets/tweets.collection',
  'tweets/tweet.view',
  'profile/user',
  'profile/user.view'
  ], function($, _, Backbone, Tweets, TweetView, User, UserView){
    var AppView = Backbone.View.extend({

      // bind to existing app container
      el: $("#app-container"),

      events: {
       "keypress #screen-name-input":  "fetchTwitInfo",
      },

      initialize: function() {

        _.bindAll(this, 'render', 'addTweetView');

        this.input = this.$("#screen-name-input");

        Tweets.bind('add', this.addTweetView);
      },

      render: function() {
        console.log('running render function');
      },

      fetchTwitInfo: function(e) {
        if (e.keyCode != 13) return;
        var screenName = this.input.val();
        console.log('input was', screenName);

        User.fetch({
          data: {screen_name: screenName},
          error: errorUser
        });

        Tweets.fetch({
          data: {screen_name: screenName},
          error:  errorTweets
        });

        function errorUser(err){
          console.log('ERROR: User.fetch', err);
        }

        function errorTweets(err){
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
