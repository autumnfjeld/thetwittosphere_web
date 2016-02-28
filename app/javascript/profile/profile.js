define(['underscore', 'backbone'], function(_, Backbone) {
  var ProfileModel = Backbone.Model.extend({

    url: "http://localhost:3000/api/userprofile"

  });

  return new ProfileModel;
});
