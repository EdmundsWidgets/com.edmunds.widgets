define([
    'template/consumer-reviews-tab/full-review'
], function(fullReviewTemplate) {
    return Backbone.View.extend({
        el: '.reviews-tab',
        template: fullReviewTemplate,
        initialize: function() {},
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
});