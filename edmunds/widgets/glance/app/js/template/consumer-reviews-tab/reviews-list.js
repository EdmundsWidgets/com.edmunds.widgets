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
        '<div class="text-rating-star hidden-xs"><span><%= averageRating %></span> out of 5.0</div>' +
        '</div>' +
        '<div class="reviews-count col-xs-5 col-sm-4">' +
        '<span class="hidden-xs">Based on</span> <span><%= reviewsCount %></span> reviews</div>' +
        '</div>' +
        '</div>' +
        '<section class="content col-xs-12">' +
        '<% _.each(collection, function(review) { %><div class="consumer-review reviews-list" data-id="<%= review.id %>"><div class="container-fluid"><div class="row"><div class="col-xs-12 col-sm-10"><div class="row"><div class="col-xs-12"><div class="rating-stars"><div class="star filled"></div><div class="star filled"></div><div class="star filled"></div><div class="star filled"></div><div class="star"></div></div><div class="date"><%= review.created %></div> </div> <div class="col-xs-12"><h4><%= review.title %></h4> <p class="vehicle">Vehicle: Honda Accord 2013 Sedan EX 4dr Sedan (2.4L 4cyl CVT)</p></div> </div> </div> <div class="hidden-xs col-sm-2"> <div class="pros"><%= review.thumbsUpDownCounter.thumbsUp %></div> <div class="clearmine"></div> <div class="cons"><%= review.thumbsUpDownCounter.thumbsDown %></div> </div> </div> </div> </div> <% }) %>' +
        '</section>' +
    '');
});