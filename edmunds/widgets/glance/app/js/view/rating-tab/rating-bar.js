define([
    'dispatcher',
    'template/rating-tab/rating-bar'
], function (dispatcher, ratingBarTemplate) {
    return Backbone.View.extend({
        className: 'rating-bar container-fluid',
        template: ratingBarTemplate,
        initialize: function () {
            this.render();
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
});