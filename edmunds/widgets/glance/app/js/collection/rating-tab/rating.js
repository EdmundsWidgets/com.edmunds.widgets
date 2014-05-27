define([
    'model/rating-tab/rating'
], function(RatingModel) {
    return Backbone.Collection.extend({
        model: RatingModel,
        comparator: function(model) {
            return model.get('title');
        }
    });
});
