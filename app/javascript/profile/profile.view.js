define(['jquery', 'underscore', 'backbone'],
  function($, _, Backbone){
    var ProfileView = Backbone.View.extend({

      el: $("#user-profile-box"),

      template: _.template( "<div id='profile'>" +
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
        $(this.el).data("id", this.model.get('id'));
 
        //experiment with personalized styling
        if (imageUrl) {
          this.$("#profile").css({
            'background-image': imageUrl,
            'background-size': 'contain',
             'font-weight': 'bold',
             'text-shadow': '0px 0px 1px hsl(0,100%,100%), 0px 0px 1px hsl(0,100%,100%)'
          });
          var rule = "background-image:" + imageUrl +");background-size:cover;";
          document.styleSheets[0].addRule('#profile:before', rule);
          document.styleSheets[0].addRule('#profile:after', rule);
        }

        return this;
      }

    });

    return ProfileView;
  });