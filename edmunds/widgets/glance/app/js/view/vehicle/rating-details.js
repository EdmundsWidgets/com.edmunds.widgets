define([
    'template/vehicle/rating-details'
], function(ratingDetailsTemplate) {

    return Backbone.View.extend({
        template: ratingDetailsTemplate,
        events: {
            'click .close-button': 'close'
        },
        initialize: function() {
            $('.rating-selectors-container').hide();
        },
        render: function() {
            this.$el.show();
            this.$el.html(this.template(this.model));
        },
        close: function() {
            this.$el.hide();
            this.trigger('close');
        }
    });
});