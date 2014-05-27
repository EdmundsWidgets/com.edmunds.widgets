define([
    'model/rating-tab/sub-rating'
], function(SubRatingModel) {
    return Backbone.Collection.extend({
        model: SubRatingModel,
        comparator: function(model) {
            return model.get('title');
        }
    });
});