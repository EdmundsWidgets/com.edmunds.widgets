define([
    'collection/rating-tab/rating'
], function (RatingCollection) {
    return Backbone.Model.extend({
        url: function (/*styleId*/) {
            var styleId = 200434856; //note: Uncomment parameter and delete this row
            return 'https://api.edmunds.com/api/vehicle/v2/grade/' + styleId;
        },
        parse: function (response) {
            response.ratings = new RatingCollection(response.ratings, {
                parse: true
            });
            response.ratings.summary = response.summary;
            response.ratings.make = response.make.name.toLowerCase();
            response.ratings.model = response.model.name.toLowerCase();
            response.ratings.subModel = response.style.submodel.niceName.toLowerCase();
            response.ratings.year = response.year.year;
            response.grade = this.convertGrade(response.grade);
            return response;
        },
        convertGrade: function (grade) {
            switch (grade.toLowerCase()) {
                case 'a':
                    return {
                        grade: 'a',
                        textGrade: 'Excellent!',
                        gradeClass: 'excellent',
                        activeA: 'active'
                    };
                case 'b':
                    return {
                        grade: 'b',
                        textGrade: 'Good',
                        gradeClass: 'good',
                        activeB: 'active'
                    };
                case 'c':
                    return {
                        grade: 'c',
                        textGrade: 'Fair',
                        gradeClass: 'fair',
                        activeC: 'active'
                    };
                case 'd':
                    return {
                        grade: 'd',
                        textGrade: 'Poor',
                        gradeClass: 'poor',
                        activeD: 'active'
                    };
                case 'e':
                    return {
                        grade: 'e',
                        textGrade: 'Bad',
                        gradeClass: 'bad',
                        activeE: 'active'
                    };
                default:
                    return 'N/A';
            }
        }
    });
});