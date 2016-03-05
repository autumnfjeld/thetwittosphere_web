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
     
      el: $("#app-container"),                       // bind to existing app container

      events: {
       "keypress #screen-name-input":  "fetchTwitInfo",
       "click #go-btn": "fetchTwitInfo",
       "keyup #retweet-filter-input":  "updateTweetListView",
       "change #picture-select": "updateTweetListView"
      },

      initialize: function() {
        _.bindAll(this,  'render', 'initViews', 'addProfileView', 'addTweetView');

        this.input = this.$("#screen-name-input");
        this.filtersBox = this.$("#filters-box");
        this.filterByRetweet = this.$("#retweet-filter-input");
        this.filterByPicutre = this.$("#picture-select");

        Tweets.bind('add', this.addTweetView); //or this could be in TweetView.initialize as this.listenTo(this.model.....)
        Tweets.listenToOnce(Tweets, 'add', this.initViews);
        Profile.bind('sync', this.addProfileView);
      },

      // render: function() {
      //   console.log('running render function');
      // },

      fetchTwitInfo: function(e) {
        if (e.type === 'keypress' && e.keyCode != 13) return;
        var screenName = this.input.val();

        Profile.fetch({
          data: {screen_name: screenName},
          error: errorProfile
        });

        Tweets.fetch({                                  //automatically populates Tweets collection/Tweet models
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
        var tweetView = new TweetView({model: tweet});
        this.$("#tweet-list-box").append(tweetView.render().el);
      },

      initViews: function(){
        console.log('initViews.  Tweets.length:', Tweets.length);
        this.filtersBox.css({display: 'block'});
      },

      updateTweetListView: function() {  
        var tweetList,
            minRetweets = this.filterByRetweet.val() || 0,        //assume people are looking for more-than
            hasPicture = this.filterByPicutre.val();
        if (hasPicture === 'null') hasPicture = null;
        console.log('updateTweetListView:: minRetweets', minRetweets, 'hasPicture', hasPicture, typeof hasPicture);
        if(minRetweets || hasPicture) {
          tweetList = Tweets.filter(minRetweets, hasPicture);     //get filtered collection
          console.log('filteredTweets length:', tweetList.length);
          this.$("#tweet-list-box").empty();                      //brute force: re-display whole list, might not be practicle for long list, then would be nice to remove/add individual tweets
          tweetList.each(this.addTweetView);  
        } 
      }

    });

    return AppView;
});
