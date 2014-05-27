define(function() {
    return Backbone.Collection.extend({
        parse: function(response) {
            response = this.convertDates(response);
            return response;
        },
        convertDates: function(data) {
            _.each(data, function(model) {
                var fullDate = new Date(model.created),
                    year = fullDate.getFullYear(),
                    month = fullDate.getMonth(),
                    date = fullDate.getDate();
                model.created = year + '/' + month + '/' + date;
            });
            return data;
        }
    });
});