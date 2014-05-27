define([
    'dispatcher',
    'model/rating-tab/rating-bar',
    'view/rating-tab/rating-bar',
    'view/rating-tab/content',
    'view/rating-tab/details'
], function(dispatcher, RatingBarModel, RatingBarView, ContentView, DetailsView) {
    return Backbone.View.extend({
        className: 'main-content',
        events: {
            'click .rating-selector': 'renderDetails',
            'click .close-button': 'renderContent'
        },
        model: new RatingBarModel(),
        initialize: function(options) {
            this.options = options || {};
            this.listenTo(dispatcher, 'onVehicleChange', this.load);
            this.listenTo(this.model, 'change', this.init);
        },
        init: function() {
            this.$el.empty();
            //note: Is it a good practice to create new instance every time when model is changed?
            this.contentView = new ContentView({
                collection: this.model.get('ratings')
            });
            this.ratingBarView = new RatingBarView({
                model: this.model
            });
            this.render();
        },
        render: function() {
            this.$el.empty();
            this.$el.append(this.ratingBarView.el);
            this.$el.append(this.contentView.el);
            return this;
        },
        load: function(styleId) {
            this.model.fetch({
                url: this.model.url(styleId),
                data: {
                    api_key: this.options.apiKey
                }
            });
        },
        renderDetails: function(e) {
            var id = $(e.currentTarget).data('id');
            this.detailsView = new DetailsView({
                model: this.model.get('ratings').get(id),
                make: this.model.get('ratings').make,
                carModel: this.model.get('ratings').model,
                year: this.model.get('ratings').year,
                subModel: this.model.get('ratings').subModel
            });
            this.$('.content').html(this.detailsView.render().el);
        },
        renderContent: function() {
            this.contentView.render();
        }
    });
});