define(function() {
    return _.template('' +
        '<div class="container-fluid">' +
        '<div class="row">' +
        '<div class="rating-stars col-xs-7 col-sm-8">' +
        '<div class="star filled"></div>' +
        '<div class="star filled"></div>' +
        '<div class="star filled"></div>' +
        '<div class="star filled"></div>' +
        '<div class="star"></div>' +
        '<div class="text-rating-star hidden-xs"><span><%= averageRating %></span> out of 5.0</div>' +
        '</div>' +
        '<div class="reviews-count col-xs-5 col-sm-4"><span class="hidden-xs">Based on</span> <span><%= reviewsCount %></span> reviews </div>' +
        '</div>' +
        '</div>' +
    '');
});