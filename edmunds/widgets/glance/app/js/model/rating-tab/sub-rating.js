define(function() {
    return Backbone.Model.extend({
        parse: function(response) {
            response.grade = this.convertGrade(response.grade);
            return response;
        },
        convertGrade: function(grade) {
            switch (grade.toLowerCase()) {
                case 'a':
                    return {
                        grade: 'a',
                        gradeClass: 'excellent'
                    };
                case 'b':
                    return {
                        grade: 'b',
                        gradeClass: 'good'
                    };
                case 'c':
                    return {
                        grade: 'c',
                        gradeClass: 'fair'
                    };
                case 'd':
                    return {
                        grade: 'd',
                        gradeClass: 'poor'
                    };
                case 'e':
                    return {
                        grade: 'e',
                        gradeClass: 'bad'
                    };
                default:
                    return 'N/A';
            }
        }
    });
});