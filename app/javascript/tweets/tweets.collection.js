
define(['underscore', 'backbone', 
  // 'libs/backbone/localstorage', 
  // 'tweets'
  ], function(_, Backbone, Store, Tweets){

  var Tweet = Backbone.Model.extend({
    defaults: {
      id_str: "111111111111",
      user: {screen_name: 'henri'},
      text: 'woo hoo! learning backbone!'
    },  

    initialize: function(){
      console.log('TweetModel initialized')
    }
  });    
    
  var TweetsCollection = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: Tweet,
    url: "http://localhost:3000/api/mockTweets",

    //test fetch
    initialize: function(){
      console.log('test initialize Tweets Collection');
      // this.fetch();
    },

    //override json method for lazy testing, but not working
    // sync: function(method, collection, options) {
    //   options.dataType = "jsonp";
    //   return Backbone.sync(method, collection, options);      
    // }


  });
  return new TweetsCollection;
});


