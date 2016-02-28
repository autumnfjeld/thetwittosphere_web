
define(['underscore', 'backbone', 'tweets/tweet.model'],
 function(_, Backbone, Tweet){ 
    
  var TweetsCollection = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: Tweet,
    url: "http://localhost:3000/api/usertimeline"

  });

  return new TweetsCollection;
});


