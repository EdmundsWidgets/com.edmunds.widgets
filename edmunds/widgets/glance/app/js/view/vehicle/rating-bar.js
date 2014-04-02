define(['model/vehicle/grade', 'template/vehicle/rating-bar'], function(GradeModel, ratingBarTemplate){
    return Backbone.View.extend({
        className: 'rating-bar container-fluid',
        template: ratingBarTemplate,
        model: new GradeModel(),

        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
            this.on('setStyleId', this.load);
        },

        load: function(styleId) {
            this.model.fetch({
                url: this.model.url(styleId),
                data: {
                    api_key: 'axr2rtmnj63qsth3ume3tv5f'
                }
            })
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
        }
    });
});