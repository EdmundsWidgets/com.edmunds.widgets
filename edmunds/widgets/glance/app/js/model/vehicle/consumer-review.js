define(function() {
    return Backbone.Model.extend({
        url: 'https://api.edmunds.com/api/vehiclereviews/v2/styles/101403692?fmt=json&api_key=axr2rtmnj63qsth3ume3tv5f',
        parse: function(response) {
            response.averageRating = Math.round(response.averageRating).toFixed(1);
            return response;
        }
    });
});