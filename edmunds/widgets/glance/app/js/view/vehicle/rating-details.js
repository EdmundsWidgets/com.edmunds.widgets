define([
    'template/vehicle/rating-details',
    'view/vehicle/rating-strip'
], function(ratingDetailsTemplate, RatingStripView) {

    return Backbone.View.extend({
        template: ratingDetailsTemplate,
        events: {
            'click .close-button': 'close'
        },
        initialize: function() {
            $('.rating-selectors-container').hide();
            this.ratingStripView = new RatingStripView({
                collection: this.model.get('subRatings')
            });
        },
        render: function() {
            this.$el.show();
            this.$el.html(this.template(this.model.toJSON()));
            this.$('.rating-details').append(this.ratingStripView.el);
            this.ratingStripView.render();
        },
        close: function() {
            this.$el.hide();
            this.trigger('close');
        }
    });
});