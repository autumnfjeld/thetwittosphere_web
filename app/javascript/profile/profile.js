define(['underscore', 'backbone'], function(_, Backbone) {
  var ProfileModel = Backbone.Model.extend({

    url: "https://thetwittosphere-api.herokuapp.com/api/userprofile"

  });

  return new ProfileModel;
});
