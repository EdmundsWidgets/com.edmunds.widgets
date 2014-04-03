define(function() {
    return _.template('' +
        '<div class="col-xs-12 col-sm-6 col-md-4">' +
        '<div class="grade"><%= grade.grade %></div>' +
        '<div class="strip-container">' +
        '<div class="strip <%= grade.gradeClass %>" style="width: ' + '<%= score * 10 %>' + '%"></div>' +
        '</div>' +
        '<div class="title"><%= title %></div>' +
        '</div>' +
    '');
});