define([
    'template/consumer-reviews-tab/reviews-list',
    'view/consumer-reviews-tab/full-review'
], function(reviewsListTemplate, FullReviewView) {
    return Backbone.View.extend({
        className: 'reviews-tab',
        template: reviewsListTemplate,
        events: {
            'click .consumer-review': 'renderFullReview',
            'click .list-reviews': 'render'
        },
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
        },
        renderFullReview: function(e) {
            var id = $(e.currentTarget).data('id');
            this.fullReviewView = new FullReviewView({
                model: this.collection.get(id)
            });
            this.$('.content').html(this.fullReviewView.render());
        }
    });
});