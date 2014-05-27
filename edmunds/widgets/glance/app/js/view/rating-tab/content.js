define([
    'template/rating-tab/content'
], function(contentTemplate) {
    return Backbone.View.extend({
        tagName: 'section',
        className: 'content container-fluid',
        template: contentTemplate,
        initialize: function() {
            this.render();
        },
        render: function() {
            this.$el.html(this.template({
                collection: this.collection.toJSON(),
                summary: this.collection.summary
            }));
            return this;
        }
    });
});