define(['jquery', 'underscore', 'backbone'],
  function($, _, Backbone){
    var UserView = Backbone.View.extend({

      //basic test to get api data to view
      template: _.template("<p <%= name %> </p>"),

      initialize: function(){
        _.bindAll(this, 'render');
        this.model.view = this;
      },

      render: function(){
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
      }

    });

    return UserView;
  });