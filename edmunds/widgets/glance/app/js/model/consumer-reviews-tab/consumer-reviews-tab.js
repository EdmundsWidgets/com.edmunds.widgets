define([
    'collection/consumer-reviews-tab/reviews-list'
], function(ReviewsListCollection) {
    return Backbone.Model.extend({
        url: function(/*styleId*/) {
            var styleId = 200434856; //note: Uncomment parameter and delete this row
            return 'https://api.edmunds.com/api/vehiclereviews/v2/styles/' + styleId;
        },
        parse: function(response) {
            response.averageRating = parseFloat(response.averageRating).toFixed(1);
            response.reviews = new ReviewsListCollection(response.reviews, {
                parse: true
            });
            return response;
        }
    });
});