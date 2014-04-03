define([
    'model/vehicle/rating'
], function(RatingModel) {
    return Backbone.Collection.extend({
        model: RatingModel,
        comparator: function(model) {
            return model.get('title');
        }
    });
});
