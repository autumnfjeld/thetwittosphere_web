define(['jquery', 'underscore', 'backbone'],
  function($, _, Backbone){
    var ProfileView = Backbone.View.extend({

      el: $("#user-profile-box"),

      //should add profile_image
      template: _.template( "<div id='profile-text'>" +
                              "<p> <%= name %>  &nbsp; @<%= screen_name %> </p>" +
                              "<p> <%= description %> </p> " +
                              "<p> <%= location %> </p> " +
                            "</div>"),

      initialize: function(){
        _.bindAll(this, 'render');
        this.model.view = this;
      },

      render: function(){
        var model = this.model.toJSON();
        console.log('profile', model);
        if (!model.screen_name) return this;   //avoid template Uncaught ReferenceError
        var imageUrl = 'url(' + this.model.get('profile_background_image_url_https') || null + ')';

        $(this.el).html(this.template(model));
        this.$el.css({'border': '2px solid hsl(252, 3%, 62%)'});
        $(this.el).data("id", this.model.get('id'));
 
        if (imageUrl) {
          this.$el.css({
            'background-image': imageUrl,
            'background-size': 'contain'
          });
        }

        return this;
      }

    });

    return ProfileView;
  });