//app module handles initial/'home' view and events

define([
  'jquery',
  'underscore', 
  'backbone',
  'tweets/tweets.collection',
  'tweets/tweet.view',
  'profile/profile',
  'profile/profile.view'
  ], function($, _, Backbone, Tweets, TweetView, Profile, ProfileView){
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

        Profile.fetch({
          data: {screen_name: screenName},
          error: errorProfile
        });

        Tweets.fetch({
          data: {screen_name: screenName},
          error:  errorTweets
        });

        function errorProfile(err){
          console.log('ERROR: Profile.fetch', err);
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
