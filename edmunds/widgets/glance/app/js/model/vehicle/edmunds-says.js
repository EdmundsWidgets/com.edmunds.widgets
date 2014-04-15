define(function() {
    return Backbone.Model.extend({
        url: 'https://api.edmunds.com/v1/content/editorreviews?make=honda&model=accord&year=2013&fmt=json&api_key=axr2rtmnj63qsth3ume3tv5f',
        parse: function(response) {
            response = response['editorial'];
            response.con = response.con.replace('<p>', '').replace('</p>', '').split('; ');
            response.pro = response.pro.replace('<p>', '').replace('</p>', '').split('; ');
            response.introduction = response.introduction.replace(/\s<p>.*/g, '');
            return response;
        }
    });
});