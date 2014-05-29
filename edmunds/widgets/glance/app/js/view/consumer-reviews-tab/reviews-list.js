define([
    'template/consumer-reviews-tab/reviews-list',
    'view/consumer-reviews-tab/full-review'
], function(reviewsListTemplate, FullReviewView) {
    return Backbone.View.extend({
        className: 'reviews-tab',
        template: reviewsListTemplate,
        initialize: function(options) {
            this.options = options || {};
        },
        render: function() {
            this.$el.html(this.template({
                collection: this.collection.toJSON(),
                averageRating: this.options.averageRating,
                reviewsCount: this.options.reviewsCount
            }));
            return this;
        }
    });
});