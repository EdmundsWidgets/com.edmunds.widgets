define(function() {
    return _.template('' +
        '<div class="rating-bar container-fluid">' +
        '<div class="row">' +
        '<div class="rating-stars col-xs-7 col-sm-8">' +
        '<div class="star filled"></div>' +
        '<div class="star filled"></div>' +
        '<div class="star filled"></div>' +
        '<div class="star filled"></div>' +
        '<div class="star"></div>' +
        '<div class="text-rating-star hidden-xs"><span>4.0</span> out of 5.0</div>' +
        '</div>' +
        '<div class="reviews-count col-xs-5 col-sm-4">' +
        '<span class="hidden-xs">Based on</span><span>12</span> reviews</div>' +
        '</div>' +
        '</div>' +
        '<section class="content ">' +
        '<% _.each(collection, function(review) { %><div class="consumer-review" data-id="<%= review.id %>"><div class="container-fluid"><div class="row"><div class="col-xs-12 col-sm-10"><div class="row"><div class="col-xs-12"><div class="rating-stars"><div class="star filled"></div><div class="star filled"></div><div class="star filled"></div><div class="star filled"></div><div class="star"></div></div><div class="date"><%= review.created %></div> </div> <div class="col-xs-12"><h4><%= review.title %></h4> <p class="vehicle">Vehicle: 2014 Mazda MAZDA3 i Touring 4dr Hatchback (2.0L 4cyl 6A)</p></div> </div> </div> <div class="hidden-xs col-sm-2"> <div class="pros"><%= review.thumbsUpDownCounter.thumbsUp %></div> <div class="clearmine"></div> <div class="cons"><%= review.thumbsUpDownCounter.thumbsDown %></div> </div> </div> </div> </div> <% }) %>' +
        '</section>' +
    '');
});