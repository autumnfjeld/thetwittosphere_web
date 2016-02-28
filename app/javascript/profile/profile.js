define(['underscore', 'backbone'], function(_, Backbone) {
  var ProfileModel = Backbone.Model.extend({

    // urlRoot: '/api/userprofile',
    url: "http://localhost:3000/api/userprofile",

    initialize: function(){
      console.log('ProfileModel initialized', this);
    }    

  });

  return new ProfileModel;
});
