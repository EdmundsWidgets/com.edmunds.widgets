define(function() {
    return _.template('' +
        '<div class="row">' +
        '<div class="rating-details">' +
        '<div class="rating-title col-xs-12">' +
        '<div class="letter-grade small <%= rating.grade.gradeClass %>"><%= rating.grade.grade %></div>' +
        '<div class="category"><%= rating.title %></div>' +
        '<div class="text-grade"><%= rating.grade.textGrade %></div>' +
        '<div class="close-button"></div>' +
        '</div>' +
        '<hr class="col-sm-12"/>' + //note: Delete this porn later
        '<p class="description"><%= rating.summary %></p>' +
        '<div class="edmunds-rating-strips">' +
        '<% _.each(subrating, function(el) { %><div class="col-xs-12 col-sm-6 col-md-4"><div class="grade"><%= el.grade.grade %></div><div class="strip-container"><div class="strip <%= el.grade.gradeClass %>" style="width: <%= el.score * 10 %>%"></div></div><div class="title"><%= el.title %></div></div><% }) %>' +
        '<div class="col-xs-12">' +
        '<a href="http://www.edmunds.com/<%= make %>/<%= carModel %>/<%= year %>/rating-details.html?sub=<%= subModel %>" class="btn btn-primary btn-primary-dark">Read full review <span class="hidden-xs">on Edmunds.com</span></a>' +
        '</div>' +
        '</div>' +
        '</div>' +
    '');
});