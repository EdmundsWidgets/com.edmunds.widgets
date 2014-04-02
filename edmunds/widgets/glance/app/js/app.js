define([
    'view/vehicle/styles',
    'view/vehicle/grade',
    'template/vehicle/header',
    'view/vehicle/rating-bar'
], function(StylesView, GradeView, headerTemplate, RatingBarView) {

    return Backbone.View.extend({

        className: 'edm-widget rating-tab',

        initialize: function(options) {
            this.initializeStylesView(options);
            this.initializeGradeView(options);
            this.initializeRatingBarView(options);
        },

        initializeStylesView: function(options) {
            this.stylesView = new StylesView({
                apiKey: options.apiKey,
                submodel: options.submodel
            });
            this.listenTo(this.stylesView, 'change', this.onVehicleStyleChange);
        },

        initializeGradeView: function(options) {
            this.gradeView = new GradeView({
                apiKey: options.apiKey
            });
        },

        initializeRatingBarView: function(options) {
            this.ratingBarView = new RatingBarView({
                apiKey: options.apiKey
            });
        },

        render: function() {
            this.$el.append(headerTemplate);
            this.$el.append(this.ratingBarView.el);
            $('.list-style-id').append(this.stylesView.el);
            this.$el.append(this.gradeView.el);
            return this;
        },

        onVehicleStyleChange: function(/*style*/) {
            var styleId = 200434856; // style.get('id');
            this.gradeView.trigger('setStyleId', styleId);
            this.ratingBarView.trigger('setStyleId', styleId);
        }

    });

});