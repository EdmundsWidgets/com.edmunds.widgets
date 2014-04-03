define(function() {
    return _.template('' +
        '<div class="col-xs-12 col-sm-6 col-md-4">' +
        '<div data-id="<%= id %>" class="rating-selector">' +
        '<div class="letter-grade small <%= grade.gradeClass %>"><%= grade.grade %></div>' +
        '<div class="category"><%= title %></div>' +
        '<div class="arrow-right"></div>' +
        '<div class="text-grade"><%= grade.textGrade %></div>' +
        '</div>' +
        '</div>' +
    '');
});