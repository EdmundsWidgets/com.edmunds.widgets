define([
    'template/vehicle/rating-strip'
], function(ratingStripTemplate) {
    return Backbone.View.extend({
        className: 'edmunds-rating-strips',

        template: ratingStripTemplate,

        linkToTheFullReview: _.template('' +
            '<div class="col-xs-12">' +
            '<a href="#" class="btn btn-primary btn-primary-dark">Read full review <span class="hidden-xs">on Edmunds.com</span></a>' +
            '</div>' +
        ''),

        render: function() {
            this.$el.empty();
            this.collection.each(this.add, this);
            this.$el.append(this.linkToTheFullReview);
            return this;
        },

        add: function(ratingStrip) {
            var item = this.template(ratingStrip.toJSON());
            this.$el.append(item);
            return this;
        }
    });
});