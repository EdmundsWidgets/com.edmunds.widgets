define(function(){
    return _.template('' +
        '<header>' +
        '<div class="container-fluid">' +
        '<h1 class="pull-left">2013 Acura ILX sedan</h1>' +
        '<div class="btn-group list-style-id pull-left">' +
        '<button type="button" class="btn dropdown-toggle" data-toggle="dropdown">' +
        'Choose style...' +
        '<span class="arrow-down"></span>' +
        '</button>' +
        '</div>' +
        '</div>' +
        '<div class="container-fluid">' +
        '<div class="row">' +
        '<ul class="nav nav-pills edm-navigation">' +
        '<li class="active">' +
        '<a href="#">Ratings</a>' +
        '</li>' +
        '<li>' +
        '<a href="#">Edmunds says</a>' +
        '</li>' +
        '<li class="dropdown visible-xs">' +
        '<a class="dropdown-toggle" data-toggle="dropdown" href="#">' +
        'Reviews' +
        '<span class="arrow-down"></span>' +
        '</a>' +
        '<ul class="dropdown-menu">' +
        '<li>' +
        '<a href="#">TCO</a>' +
        '</li>' +
        '<li>' +
        '<a href="#">Photos</a>' +
        '</li>' +
        '<li>' +
        '<a href="#">Videos</a>' +
        '</li>' +
        '</ul>' +
        '</li>' +
        '<li class="hidden-xs">' +
        '<a href="#">Consumer Reviews</a>' +
        '</li>' +
        '<li class="hidden-xs">' +
        '<a href="#">Photos</a>' +
        '</li>' +
        '<li class="hidden-xs">' +
        '<a href="#">Videos</a>' +
        '</li>' +
        '</ul>' +
        '</div>' +
        '</div>' +
        '</header>' +
    '')
});