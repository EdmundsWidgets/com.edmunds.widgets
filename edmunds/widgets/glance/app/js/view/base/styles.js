define([
    'dispatcher',
    'collection/base/styles',
    'template/base/styles'
], function(dispatcher, StylesCollection, stylesTemplate) {
    return Backbone.View.extend({
        collection: new StylesCollection(),
        template: stylesTemplate,
        events: {
            'click a': 'getStyleId'
        },
        initialize: function(options) {
            this.listenTo(this.collection, 'reset', this.render);
            this.collection.fetch({
                data: {
                    api_key: options.apiKey,
                    submodel: options.submodel
                },
                reset: true
            });
        },
        render: function() {
            var firstItem = this.collection.at(0).toJSON();
            this.$el.html(this.template({
                collection: this.collection.toJSON(),
                currentItem: firstItem
            }));
            dispatcher.trigger('onVehicleChange', firstItem.id);
            return this;
        },
        getStyleId: function(e) {
            e.preventDefault();
            var target = $(e.currentTarget),
                styleId = target.data('id');
            this.$('button').html(target.text() + '<span class="arrow-down"></span>');
            dispatcher.trigger('onVehicleChange', styleId);
        }
    });
});