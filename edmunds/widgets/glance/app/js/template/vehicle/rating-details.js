define(function() {
    return _.template('' +
        '<div class="rating-details">' +
        '<div class="rating-title col-xs-12">' +
        '<div class="letter-grade small <%= grade.gradeClass %>"><%= grade.grade %></div>' +
        '<div class="category"><%= title %></div>' +
        '<div class="text-grade"><%= grade.textGrade %></div>' +
        '<div class="close-button"></div>' +
        '</div>' +
        '<hr class="col-sm-12"/>' +
        '<p class="description"><%= summary %></p>' +
        '</div>' +
    '')
});