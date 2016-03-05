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
       "change #retweet-filter-input":  "updateTweetView",
       "change #picture-select": "updateTweetView"
      },

      initialize: function() {
        _.bindAll(this, 'render', 'addProfileView', 'addTweetView', 'updateTweetView');

        this.input = this.$("#screen-name-input");
        this.filterByRetweet = this.$("#retweet-filter-input");
        this.filterByPicutre = this.$("#picture-select");

        Tweets.bind('add', this.addTweetView);
        Profile.bind('sync', this.addProfileView);
      },

      // render: function() {
      //   console.log('running render function');
      // },

      fetchTwitInfo: function(e) {
        if (e.keyCode != 13) return;
        var screenName = this.input.val();

        Profile.fetch({
          data: {screen_name: screenName},
          error: errorProfile
        });

        //this automatically populates Tweets collection/Tweet models
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

      addProfileView: function(profile){
        var profileId = profile.get('id');
        if (this.$("#user-profile-box").data("id") !== profileId){
          this.$("#tweet-list-box").empty();  
          var profileView = new ProfileView({model: profile});
          this.$("#user-profile-box").append(profileView.render().el);
        }
      },

      addTweetView: function(tweet){
        // this.$("#tweet-list-box").empty();  //temporary handling of repeat entried
        var tweetView = new TweetView({model: tweet});
        this.$("#tweet-list-box").append(tweetView.render().el);
      },

      // Add all items in the **Todos** collection at once.
      updateTweetView: function(e) {
        // if (e.type === 'keypress' && e.keyCode != 13) return;        
        var minRetweets = this.filterByRetweet.val() || 0,  //assume people are looking for more-than
            hasPicture = this.filterByPicutre.val();
        if (hasPicture === 'null') hasPicture = null;
        console.log('updateTweetView:: minRetweets', minRetweets, 'hasPicture', hasPicture, typeof hasPicture);

        if(minRetweets || hasPicture) {
          //get filtered collection
          var filteredTweets = Tweets.filter(minRetweets, hasPicture);
          console.log('filteredTweets length:', filteredTweets.length);
          console.log('filteredTweets', filteredTweets);
          //brute force: re-display whole list, might not be practicle for long list, then would be nice to remove/add individual tweets
          this.$("#tweet-list-box").empty();     
          filteredTweets.each(this.addTweetView);  
        }
      },      

    });

    return AppView;
});
