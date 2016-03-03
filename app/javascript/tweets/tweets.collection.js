
define(['underscore', 'backbone', 'tweets/tweet.model'],
 function(_, Backbone, Tweet){ 
    
  var TweetsCollection = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: Tweet,
    url: "http://localhost:3000/api/usertimeline",

    filterByRetweet: function (value) {  //{retween_min: integer , picture: boolean }
      var results = this.models.filter(function(model){
        return model.get('retweet_count') >= value;
      })
      results = _.map( results, function( model ) { return model.toJSON()  } );

      return new Backbone.Collection(results);
    }     

  });

  return new TweetsCollection;
});
