define(function(){
    return _.template('' +
        '<button type="button" class="btn dropdown-toggle" data-toggle="dropdown"><%= currentItem.name %><span class="arrow-down"></span></button>' +
        '<ul class="dropdown-menu" role="menu">' +
        '<% _.each(collection, function(el){ %> <li><a data-id="<%= el.id %>" href="#"><%= el.name %></a></li><% }) %>' +
        '</ul>' +
        '</div>' +
    '');
});