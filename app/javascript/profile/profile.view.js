define(['jquery', 'underscore', 'backbone'],
  function($, _, Backbone){
    var ProfileView = Backbone.View.extend({

      el: $("#user-profile-box"),

      //basic test to get api data to view
      template: _.template( "<p> <%= name %>  &nbsp; @<%= screen_name %> </p>" +
                            "<p> <%= description %> </p> " +
                            "<p> <%= location %> </p> "),
      // template: _.template( "<table>" +
      //                         "<tr>" +
      //                           "<td> Name </td> <td> <%= name %> </td>  </tr>"+
      //                           "<tr> <td>  </td> <td> @<%= screen_name %> </td>" +
      //                         "</tr"+
      //                       "</table>" ),

      initialize: function(){
        _.bindAll(this, 'render');
        this.model.view = this;
      },

      render: function(){
        var model = this.model.toJSON();
        if (!model.screen_name) return this;   //avoid template Uncaught ReferenceError
        var image = this.model.get('profile_background_image_url_https') || null;

        $(this.el).html(this.template(model));
        $(this.el).data("id", this.model.get('id'));
 
        //experiment with personalized styling
        if (image) {
          this.$el.css({
            'background-image': 'url(' + image + ')',
             'text-shadow': '0px 0px 10px hsl(0,0%,40%)'
          });
        }

        return this;
      }

    });

    return ProfileView;
  });