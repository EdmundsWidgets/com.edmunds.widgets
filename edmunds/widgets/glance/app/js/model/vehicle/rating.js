define(function() {
    return Backbone.Model.extend({
        initialize: function(options) {
            this.parse(options)
        },
        parse: function(response) {
            this.attributes.id = response.title.toLowerCase().replace(/\s+/g,"-");
        }
    });
});