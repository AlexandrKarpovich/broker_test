function getRefQueryParam(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

var utmParamQueryString = '',
    utmParamQueryStringTrimmed = '',
    utm_source = '',
    utm_medium = '',
    utm_content = '',
    utm_campaign = '',
    utm_term = '';

(function() {
    utm_source = getRefQueryParam("utm_source");
    utm_medium = getRefQueryParam("utm_medium");
    utm_content = getRefQueryParam("utm_content");
    utm_campaign = getRefQueryParam("utm_campaign");
    utm_term = getRefQueryParam("utm_term");

    if (utm_source) {
        utmParamQueryString += '&utm_source=' + utm_source;
    }
    if (utm_medium) {
        utmParamQueryString += '&utm_medium=' + utm_medium;
    }
    if (utm_content) {
        utmParamQueryString += '&utm_content=' + utm_content;
    }
    if (utm_campaign) {
        utmParamQueryString += '&utm_campaign=' + utm_campaign;
    }
    if (utm_term) {
        utmParamQueryString += '&utm_term=' + utm_term;
    }

    if(utmParamQueryString.length > 0) {
        utmParamQueryString = utmParamQueryString.substring(1);
        utmParamQueryStringTrimmed = utmParamQueryString;
        utmParamQueryString = '?' + utmParamQueryString;
    }
})();

var navLinks = document.querySelectorAll('a.list__item__link');

navLinks.forEach(function(item) {
    item.href += utmParamQueryString;
});