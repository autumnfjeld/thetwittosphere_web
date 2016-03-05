define(['jquery', 'underscore', 'backbone'],
  function($, _, Backbone){
    var TweetView = Backbone.View.extend({

      el: "<div class='tweet-box'></div>",
      //maybe reformt retweet layout, use retweet icon
      template: _.template( "<p class='tweet-text'> <%= text %> &nbsp; rt:<%= retweet_count %> </p>"),

      initialize: function(){
        _.bindAll(this, 'render');
        this.model.view = this;
      },

      render: function(){
        var model = this.model.toJSON();
        if (!model.text) return this;      //avoid template Uncaught ReferenceError
        $(this.el).html(this.template(model));
        this.addImage(model);
        return this;
      },

      addImage: function(model){
        var  mediaUrl = model.entities.media && model.entities.media[0].media_url_https; 
        // console.log('mediaUrl +++', mediaUrl);
        $(this.el).append("<div>" + mediaUrl + "</div>");
      }
      // viewData: function(model){
      //   // console.log('model', model);
      //   var viewModel = {
      //     text: model.text,
      //     retweet_count: model.retweet_count,
      //     media_url: model.entities.media && model.entities.media[0].media_url_https || "hi"
      //   }
      //   if (model.entities.media) {
      //     viewModel.media_url = model.entities.media[0].medial_url_https
      //   }
      //   return viewModel;
      // }

    });

    return TweetView;
  });