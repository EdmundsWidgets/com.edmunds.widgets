define(function() {
    return _.template('' +
//        '<section class="content container-fluid">' +
        '<div class="row">' +
        '<% _.each(collection, function(el) { %><div class="col-xs-12 col-sm-6 col-md-4"><div data-id="<%= el.id %>" class="rating-selector"><div class="letter-grade small <%= el.grade.gradeClass %>"><%= el.grade.grade %></div><div class="category"><%= el.title %></div><div class="arrow-right"></div><div class="text-grade"><%= el.grade.textGrade %></div></div></div><% }) %>' +
        '<div class="col-xs-12">' +
        '<div class="rating-summary">' +
        '<h4>Rating summary</h4>' +
        '<p><%= summary %></p>' +
        '</div>' +
        '</div>' +
        '</div>' +
//        '</section>' +
    '');
});