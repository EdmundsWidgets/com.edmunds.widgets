define(function() {
    return _.template('' +
        '<div class="footer-to-the-bottom">' +
        '<header>' +
        '<div class="container-fluid">' +
        '<div class="row">' +
        '<div class="col-sm-6">' +
        '<h1>2013 Honda Accord sedan</h1>' + //note: Make/Model/Year should be passed from Widget Configurator
        '</div>' +
        '<div class="col-sm-6">' +
        '<div class="list-style-id btn-group">' +
        '<button disabled type="button" class="btn dropdown-toggle" data-toggle="dropdown">Loading...</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="container-fluid">' +
        '<div class="row">' +
        '<ul class="nav nav-pills edm-navigation">' +
        '<li class="active"><a data-id="rating-tab" href="#">Ratings</a></li>' +
        '<li><a data-id="edmunds-says-tab" href="#">Edmunds says</a></li>' +
        '<li class="dropdown visible-xs">' +
        '<a class="dropdown-toggle" data-toggle="dropdown" href="#">Reviews<span class="arrow-down"></span></a>' +
        '<ul class="dropdown-menu">' +
        '<li><a data-id="consumer-reviews-tab" href="#">Consumer reviews</a></li>' +
        '<li><a href="#">TCO</a></li>' +
        '<li><a href="#">Photos</a></li>' +
        '<li><a href="#">Videos</a></li>' +
        '</ul>' +
        '</li>' +
        '<li class="hidden-xs"><a data-id="consumer-reviews-tab" href="#">Consumer Reviews</a></li>' +
        '<li class="hidden-xs"><a href="#">Photos</a></li>' +
        '<li class="hidden-xs"><a href="#">Videos</a></li>' +
        '</ul>' +
        '</div>' +
        '</div>' +
        '</header>' +
        '</div>' +
        '<footer class="container-fluid">' +
        '<div class="row">' +
        '<a class="legacy col-xs-5" href="#">Legal Notice</a>' +
        '<div class="logo col-xs-7"><a href="http://www.edmunds.com" class="pull-right"></a>Build by</div>' +
        '</div>' +
        '</footer>' +
    '');
});