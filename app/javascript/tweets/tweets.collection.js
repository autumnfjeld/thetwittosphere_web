
define(['underscore', 'backbone', 'tweets/tweet.model'],
 function(_, Backbone, Tweet){ 
    
  var TweetsCollection = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: Tweet,       

    url: "https://thetwittosphere-api.herokuapp.com/api/usertimeline",

    parse: function(response){
      console.log('TweetsCollection.parse: response', response);
      //this assumes there is either a statusCode or an array of tweets
      if (response.statusCode){
        return;
      } else {
        return response;
      } 
    },

    filter: function (minRetweets, hasPic) { 
      if (hasPic === 'null') hasPic = null;
      // console.log('minRetweets', minRetweets, 'hasPic', hasPic, !hasPic);
      var hasMedia, picFlag, rtCountFlag
      var results = this.models.filter(function(model){
        if (hasPic) hasMedia = model.toJSON().entities.media ? true : false;
        picFlag = !hasPic || (hasPic === 'nopic' && !hasMedia) || (hasPic === 'yespic' && hasMedia);
        rtCountFlag = model.get('retweet_count') >= minRetweets;
        // console.log('picFlag', picFlag, 'rtCountFlag', rtCountFlag);
        return picFlag && rtCountFlag;
      })
      results = _.map( results, function( model ) { return model.toJSON()  } );

      return new Backbone.Collection(results);
    }     

  });

  return new TweetsCollection;
});


