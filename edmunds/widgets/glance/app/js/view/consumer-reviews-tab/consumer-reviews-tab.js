define([
    'dispatcher',
    'model/consumer-reviews-tab/consumer-reviews-tab',
    'view/consumer-reviews-tab/reviews-list'
], function(dispatcher, ConsumerReviewsModel, ReviewsListView) {
    return Backbone.View.extend({
        el: '.main-content',
        events: {
            'click .rating-selector': 'renderDetails',
            'click .close-button': 'renderContent'
        },
        model: new ConsumerReviewsModel(),
        initialize: function(options) {
            this.options = options || {};
            this.listenTo(this.model, 'change', this.init);
            this.listenTo(dispatcher, 'onVehicleChange', this.load);
        },
        render: function() {
            this.$el.empty();
            this.$el.html(this.reviewsListView.render().el);
            return this;
        },
        load: function (styleId) {
            this.model.fetch({
                url: this.model.url(styleId),
                data: {
                    api_key: this.options.apiKey
                }
            });
        },
        init: function() {
            this.reviewsListView = new ReviewsListView({
                averageRating: this.model.get('averageRating'),
                reviewsCount: this.model.get('reviewsCount'),
                collection: this.model.get('reviews')
            });
        }
    })
});