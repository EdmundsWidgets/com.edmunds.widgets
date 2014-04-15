define([
    'model/vehicle/grade',
    'view/vehicle/grade',
    'template/vehicle/rating-bar'
], function(GradeModel, GradeView, ratingBarTemplate){
    var viewOptions = ['apiKey'];
    return Backbone.View.extend({
        className: 'rating-bar',
        template: ratingBarTemplate,
        model: new GradeModel(),

        initialize: function(options) {
            _.extend(this, _.pick(options, viewOptions));
            this.listenTo(this.model, 'change', this.render);
            this.on('setStyleId', this.load);
            this.initializeGradeView();
        },

        initializeGradeView: function() {
            this.gradeView = new GradeView({
                model: this.model
            });
        },

        load: function(styleId) {
            this.model.fetch({
                url: this.model.url(styleId),
                data: {
                    api_key: this.apiKey
                }
            });
        },

        render: function() {
            $('.edm-widget').removeClass('edmunds-says');
            $('.edm-widget').addClass('rating-tab');
            $('.edm-navigation li').removeClass('active');
            $('a[data-id="rating"]').parent('li').addClass('active');
            this.$el.html(this.template(this.model.toJSON()));
            this.$el.after(this.gradeView.el);
        }
    });
});