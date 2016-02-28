define(['underscore', 'backbone'], function(_, Backbone) {
  var UserModel = Backbone.Model.extend({

    urlRoot: '/api/userprofile',
    url: "http://localhost:3000/api/userprofile",

    initialize: function(){
      console.log('UserModel initialized', this);
    }    

  });

  return new UserModel;
});
