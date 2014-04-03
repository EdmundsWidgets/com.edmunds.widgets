define([
    'model/vehicle/sub-rating'
], function(SubRatingModel) {
    return Backbone.Collection.extend({
        model: SubRatingModel,
        comparator: function(model) {
            return model.get('title');
        }
    });
});