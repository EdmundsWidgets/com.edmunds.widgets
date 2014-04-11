define([
    'model/vehicle/edmunds-says',
    'template/vehicle/edmunds-says'
], function(EdmundsSaysModel, edmundsSaysTemplate){
    return Backbone.View.extend({
        model: new EdmundsSaysModel(),
        initialize: function() {
            this.model.fetch();
        },

        template: edmundsSaysTemplate,

        render: function() {
            this.$container = $('.content');
            this.$container.removeClass('rating-tab');
            this.$container.addClass('edmunds-says');
            this.$container.html(this.template(this.model.toJSON()))
        }
    });
});