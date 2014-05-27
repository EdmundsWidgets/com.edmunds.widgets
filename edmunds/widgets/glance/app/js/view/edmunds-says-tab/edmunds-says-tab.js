define([
    'model/edmunds-says-tab/edmunds-says-tab',
    'template/edmunds-says-tab/edmunds-says-tab'
], function(EdmundsSaysTabModel, edmundsSaysTabTemplate) {
    return Backbone.View.extend({
        el: '.main-content',
        template: edmundsSaysTabTemplate,
        model: new EdmundsSaysTabModel(),
        initialize: function() {
//            this.listenTo(this.model, 'change', this.render);
        },
        render: function() {
            this.$el.empty();
            this.$el.html(this.template({
                model: this.model.toJSON(),
                cons: this.model.get('con'),
                pros: this.model.get('pro'),
                introduction: this.model.get('introduction')
            }));
            return this;
        },
        load: function() {
            this.model.fetch({
                url: this.model.urlStatic
            })
        }
    });
});