define([
    'model/vehicle/grade',
    'collection/vehicle/rating',
    'view/vehicle/rating-selector'
], function(GradeModel, RatingCollection, RatingSelectorView) {

    var viewOptions = ['apiKey'];

    return Backbone.View.extend({
        tagName: 'section',
        className: 'content',
        template: _.template('' +
            '<div class="container-fluid">' +
            '<div class="row">' +
            '<div class="rating-details-container"></div>' +
            '<div class="rating-selectors-container">' +
            '<div class="rating-selectors"></div>' +
            '<div class="col-xs-12">' +
            '<div class="rating-summary">' +
            '<h4>Rating summary</h4>' +
            '<p></p>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
        ''),

//        model: new GradeModel(), note: Delete this later

        initialize: function(options) {
            _.extend(this, _.pick(options, viewOptions));
            this.listenTo(this.model, 'change', this.render);
            this.on('setStyleId', this.load);
        },

        render: function() {
            this.$el.html(this.template);
            this.$('p').text(this.model.get('summary'));
            this.ratingSelectorView = new RatingSelectorView({
                el: this.$('.rating-selectors'),
                collection: this.model.get('ratings')
            });
            this.ratingSelectorView.render();
            return this;
        },

        load: function(styleId) {
            this.$el.html('Loading...');
            this.model.fetch({
                url: this.model.url(styleId),
                data: {
                    api_key: this.apiKey
                },
                dataType: 'jsonp'
            });
            return this;
        }

    });

});