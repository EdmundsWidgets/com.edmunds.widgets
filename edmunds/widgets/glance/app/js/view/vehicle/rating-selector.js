define([
    'template/vehicle/rating-selector',
    'view/vehicle/rating-details'
], function(ratingSelectorTemplate, RatingDetailsView) {

    return Backbone.View.extend({

        template: ratingSelectorTemplate,

        events: {
            'click .rating-selector': 'renderDetails'
        },

        initialize: function() {
            this.contentContainer = $('.rating-details-container');
        },

        renderDetails: function(e) {
            var id = $(e.currentTarget).data('id');
            this.ratingDetailsView = new RatingDetailsView({
                el: this.contentContainer,
                model: this.collection.get(id)
            });
            this.ratingDetailsView.on('close', this.show, this);
            this.ratingDetailsView.render();
        },

        show: function() {
            $('.rating-selectors-container').show();
        },

        render: function() {
            this.$el.empty();
            this.collection.each(this.add, this);
            return this;
        },

        add: function(rating) {
            var item = this.template(rating.toJSON());
            this.$el.append(item);
            return this;
        }

    });

});