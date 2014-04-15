define([
    'model/vehicle/edmunds-says',
    'template/vehicle/edmunds-says',
    'template/vehicle/rating'
], function(EdmundsSaysModel, edmundsSaysTemplate, RatingTemplate){
    return Backbone.View.extend({
        model: new EdmundsSaysModel(),
        initialize: function() {
            this.model.fetch();
        },

        template: edmundsSaysTemplate,
        ratingTemplate: RatingTemplate,

        render: function() {
            this.$container = $('.content');
            this.$ratingBar = $('.rating-bar');
            this.$widget = $('.edm-widget');
            this.$widget.removeClass('rating-tab');
            this.$widget.addClass('edmunds-says');
            this.$ratingBar.html(this.ratingTemplate(this.model.toJSON()));
            this.$container.html(this.template(this.model.toJSON()));
            return this;
        }
    });
});