define(function() {

    return Backbone.Collection.extend({

        url: 'https://api.edmunds.com/api/vehicle/v2/honda/accord/2013',

        parse: function(response) {
            return response['styles'];
        }

    });

});