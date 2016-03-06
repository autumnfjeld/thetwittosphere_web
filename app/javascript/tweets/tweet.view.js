define(['jquery', 'underscore', 'backbone'],
  function($, _, Backbone){
    var TweetView = Backbone.View.extend({

      el: "<div class='tweet-box'></div>",
      //would be nice to use retweet icon
      template: _.template( "<div>" +
                              "<p class='tweet-date'> <%= date %> </p> " +
                              "<p class='tweet-text'> <%= text %> &nbsp; rt:<%= retweet_count %> </p>" +
                            "</div"),


      initialize: function(){
        _.bindAll(this, 'render');
        this.model.view = this;
      },

      render: function(){
        var model = this.model.toJSON();
        if (!model.text) return this;      //avoid template Uncaught ReferenceError
        $(this.el).html(this.template(this.makeTemplateModel(model)));
        if(model.entities.media) this.addImage(model);
        return this;
      },

      makeTemplateModel: function(model){
        var date = new Date(model.created_at);       //ideally: format date as  Jan 3, 2015
        return {
          text: model.text,
          retweet_count: model.retweet_count,
          date: date.toDateString()
        }
      },

      addImage: function(model){
        var  mediaUrl = model.entities.media && model.entities.media[0].media_url_https; 
        $(this.el).append("<img class='tweet-img' src='"+ mediaUrl + "'>");
      }

    });

    return TweetView;
  });