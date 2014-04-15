define(function() {
    return _.template('' +
        '<div class="container-fluid">' +
        '<div class="row">' +
        '<div class="col-xs-12 col-md-6">' +
        '<div class="pros">' +
        '<h4>PROs</h4>' +
        '<ul>' +
        '<% _.each(pro, function(el) { %> <li> - <%= el %></li>  <% }) %>' +
        '</ul>' +
        '</div>' +
        '</div>' +
        '<div class="col-xs-12 col-md-6">' +
        '<div class="cons">' +
        '<h4>CONs</h4>' +
        '<ul>' +
        '<% _.each(con, function(el) { %> <li> - <%= el %></li>  <% }) %>' +
        '</ul>' +
        '</div>' +
        '</div>' +
        '<div class="col-xs-12">' +
        '<div class="rating-summary">' +
        '<h4>What\'s new for 2013?</h4>' +
        '<p><%= whatsNew %></p>' +
        '</div>' +
        '</div>' +
        '<div class="hidden-xs col-sm-12">' +
        '<div class="rating-summary">' +
        '<h4>Introduction</h4>' +
        '<%= introduction %>' +
        '</div>' +
        '</div>' +
        '<div class="col-xs-12">' +
        '<a href="http://www.edmunds.com/honda/accord/2013/rating-details.html?sub=sedan" class="btn btn-primary btn-primary-dark">Read full review <span class="hidden-xs">on Edmunds.com</span></a>' +
        '</div>' +
        '</div>' +
        '</div>' +
    '');
});