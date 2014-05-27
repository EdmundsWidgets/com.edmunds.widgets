define([
    'collection/rating-tab/sub-rating'
], function(SubratingCollection) {
    return Backbone.Model.extend({
        parse: function(response) {
            response.id = response.title.toLowerCase().replace(/\s+/g, '-');

            response.subRatings = new SubratingCollection(response.subRatings, {
                parse: true
            });

            response.grade = this.convertGrade(response.grade);

            return response;
        },
        convertGrade: function(grade) {
            switch (grade.toLowerCase()) {
                case 'a':
                    return {
                        grade: 'a',
                        textGrade: 'Excellent!',
                        gradeClass: 'excellent'
                    };
                case 'b':
                    return {
                        grade: 'b',
                        textGrade: 'Good',
                        gradeClass: 'good'
                    };
                case 'c':
                    return {
                        grade: 'c',
                        textGrade: 'Fair',
                        gradeClass: 'fair'
                    };
                case 'd':
                    return {
                        grade: 'd',
                        textGrade: 'Poor',
                        gradeClass: 'poor'
                    };
                case 'e':
                    return {
                        grade: 'e',
                        textGrade: 'Bad',
                        gradeClass: 'bad'
                    };
                default:
                    return 'N/A';
            }
        }
    });
});