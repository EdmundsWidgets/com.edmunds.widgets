define(['collection/vehicle/styles', 'template/vehicle/styles'], function(StylesCollection, stylesTemplate) {
    var viewOptions = ['apiKey', 'submodel'];
    return Backbone.View.extend({
        tagName: 'ul',
        attributes: {
            class: 'dropdown-menu',
            role: 'menu'
        },
        collection: new StylesCollection(),
        template: stylesTemplate,

        initialize: function(options) {
            _.extend(this, _.pick(options, viewOptions));
            this.listenTo(this.collection, 'reset', this.render);
            this.load();
        },
        render: function() {
            this.$el.empty();
            this.collection.each(this.add, this);
            this.$el.find('li').on('click', $.proxy(this.onClick, this));
            return this;
        },
        add: function(model) {
            var item = this.template(model.toJSON());
            this.$el.append(item);
            return this;
        },
        load: function() {
            this.collection.fetch({
                data: {
                    api_key:    this.apiKey,
                    submodel:   this.submodel
                },
                reset: true,
                dataType: 'jsonp'
            });
            return this;
        },
        onClick: function(e) {
            e.preventDefault();
            var el = $(e.currentTarget);
            var model = this.collection.get(el.data('id'));
            $('.list-style-id button').html(el.text() + '<span class="arrow-down"></span>');
            this.trigger('change', model);
        }
    });
});