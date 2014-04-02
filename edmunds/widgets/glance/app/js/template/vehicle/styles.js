define(function(){
    return _.template('' +
        '<li data-id="<%= id %>">' +
        '<a href="#"><%= name %></a>' +
        '</li>' +
    '');
});