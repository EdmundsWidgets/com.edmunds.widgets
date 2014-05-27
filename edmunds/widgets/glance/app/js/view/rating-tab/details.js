define([
    'template/rating-tab/details'
], function(detailsTemplate) {
    return Backbone.View.extend({
        template: detailsTemplate,
        initialize: function(options) {
            this.options = options || {};
        },
        render: function() {
            this.$el.html(this.template({
                rating: this.model.toJSON(),
                subrating: this.model.get('subRatings').toJSON(),
                make: this.options.make,
                carModel: this.options.carModel,
                year: this.options.year,
                subModel: this.options.subModel
            }));
            return this;
        }
    });
});