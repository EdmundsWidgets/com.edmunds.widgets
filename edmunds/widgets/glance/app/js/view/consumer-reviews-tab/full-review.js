define([
    'template/consumer-reviews-tab/full-review'
], function(fullReviewTemplate) {
    return Backbone.View.extend({
        el: '.reviews-tab',
        template: fullReviewTemplate,
        initialize: function(options) {
            this.options = options || {};
        },
        render: function() {
            this.$el.html(this.template({
                model: this.model.toJSON(),
                reviewsCount: this.options.reviewsCount,
                currentReview: this.options.currentReview
            }));
            return this;
        }
    });
});