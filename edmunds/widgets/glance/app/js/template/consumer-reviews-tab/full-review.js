define(function() {
    return _.template('' +
        '<div class="main-content">' +
        '<div class="rating-bar container-fluid">' +
        '<div class="list-reviews"></div>' +
        '<div class="list-reviews-nav">' +
        '<div class="next-review"></div>' +
        '<div class="prev-review"></div>' +
        '<div class="reviews-count hidden-xs">Review 1 out of 12</div>' +
        '</div>' +
        '</div>' +
        '<div class="consumer-review">' +
        '<div class="container-fluid">' +
        '<div class="row">' +
        '<div class="col-xs-12">' +
        '<div class="row">' +
        '<div class="col-xs-12">' +
        '<div class="rating-stars">' +
        '<div class="star filled"></div>' +
        '<div class="star filled"></div>' +
        '<div class="star filled"></div>' +
        '<div class="star filled"></div>' +
        '<div class="star"></div>' +
        '</div>' +
        '<div class="date"><%= created %></div>' +
        '</div>' +
        '<div class="col-xs-12">' +
        '<h4><%= title %></h4>' +
        '<p class="vehicle">Vehicle: 2014 Mazda MAZDA3 i Touring 4dr Hatchback (2.0L 4cyl 6A)</p>' +
        '<p class="title">Favorite Features:</p>' +
        '<p><%= favoriteFeatures %></p>' +
        '<p class="title">Suggested Improvements:</p>' +
        '<p><%= suggestedImprovements %></p>' +
        '<p><%= text %></p>' +
        '</div>' +
        '<div class="rated col-xs-12">' +
        '<div>Item rated:</div>' +
        '<div class="pros"><%= thumbsUpDownCounter.thumbsUp %></div>' +
        '<div class="cons"><%= thumbsUpDownCounter.thumbsDown %></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
    '');
});