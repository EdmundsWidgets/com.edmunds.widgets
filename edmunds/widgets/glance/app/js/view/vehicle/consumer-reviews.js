define([
    'template/vehicle/consumer-reviews',
    'template/vehicle/consumer-reviews-rating',
    'model/vehicle/consumer-review'
], function(consumerReviewsTemplate, consumerReviewsRatingTemplate, ConsumerReviewModel) {
    return Backbone.View.extend({
        template: consumerReviewsTemplate,
        model: new ConsumerReviewModel(),
        ratingTemplate: consumerReviewsRatingTemplate,
        initialize: function() {
            this.model.fetch();
        },
        render: function() {
            this.$container = $('.content');
            this.$ratingBar = $('.rating-bar');
            this.$widget = $('.edm-widget');
            this.$widget.removeClass('edmunds-says');
            this.$widget.addClass('reviews-tab');
            this.$ratingBar.html(this.ratingTemplate(this.model.toJSON()));
            this.$ratingStars = $('.star');
            this.$averageRating = this.model.get('averageRating');
            this.$reviews = this.model.get('reviews');
            this.$ratingStars.removeClass('filled');
            _.each(this.$ratingStars, function(el, i) {
                if (i < this.$averageRating) {
                    $(el).addClass('filled');
                }
            }, this);
            this.$container.html(this.template({
                collection: this.$reviews
            }));
            return this;
        }
    });
});