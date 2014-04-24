define([
    'view/vehicle/styles',
    'view/vehicle/grade',
    'view/vehicle/rating-bar',
    'view/vehicle/edmunds-says',
    'template/vehicle/header',
    'template/vehicle/footer',
    'view/vehicle/consumer-reviews'
], function(StylesView, GradeView, RatingBarView, EdmundsSaysView, headerTemplate, footerTemplate, ConsumerReviewsView) {

    return Backbone.View.extend({

        className: 'edm-widget rating-tab',

        events: {
            'click .edm-navigation a[data-id="rating"]': 'ratingTab',
            'click .edm-navigation a[data-id="edmunds-says"]': 'edmundsSays',
            'click .edm-navigation a[data-id="consumer-reviews"]': 'consumerReviews'
        },

        initialize: function(options) {
            this.options = options;
            this.initializeStylesView(options);
//            this.initializeGradeView(options);
            this.initializeRatingBarView(options);
            this.consumerReviewsView = new ConsumerReviewsView();
        },

        initializeStylesView: function(options) {
            this.stylesView = new StylesView({
                apiKey: options.apiKey,
                submodel: options.submodel
            });
            this.listenTo(this.stylesView, 'change', this.onVehicleStyleChange);
        },

        /*initializeGradeView: function(options) { note: Delete this later
            this.gradeView = new GradeView({
                apiKey: options.apiKey
            });
        },*/

        initializeRatingBarView: function(options) {
            this.ratingBarView = new RatingBarView({
                apiKey: options.apiKey
            });
        },

        render: function() {
            this.$el.append(headerTemplate);
            this.$el.append(this.ratingBarView.el);
            this.$('.list-style-id').append(this.stylesView.el);
            this.$el.append(footerTemplate);
//            this.$el.append(this.gradeView.el);
            this.edmundsSaysView = new EdmundsSaysView({
                el: '.content'
            });
            return this;
        },

        onVehicleStyleChange: function(/*style*/) {
            var styleId = 200434856; // style.get('id');
//            this.gradeView.trigger('setStyleId', styleId);
            this.ratingBarView.trigger('setStyleId', styleId);
        },

        edmundsSays: function(e) {
            e.preventDefault();
            this.$('.edm-navigation li').removeClass('active');
            $(e.currentTarget).parent('li').addClass('active');
            this.edmundsSaysView.render();
        },

        ratingTab: function(e) {
            e.preventDefault();
            this.$('.edm-navigation li').removeClass('active');
            $(e.currentTarget).parent('li').addClass('active');
            this.$('.content').empty();
            this.$el.removeClass('edmunds-says');
            this.$el.addClass('rating-tab');
            this.ratingBarView.render();
            this.ratingBarView.gradeView.render();
        },
        consumerReviews: function(e) {
            e.preventDefault();
            this.$('.edm-navigation li').removeClass('active');
            $(e.currentTarget).parent('li').addClass('active');
            this.consumerReviewsView.render();
        }

    });

});