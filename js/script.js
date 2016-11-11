
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
    var $street = $('#street');
    var $city = $('#city');
    var address = $street.val() + ', ' + $city.val();
    $greeting.text('So, you want to live at ' + address + '?');
    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + address;
    var imgHtml = '<img class= "bgimg" src="'+ streetviewUrl + '"/>';
    $body.append(imgHtml);

    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
url += '?' + $.param({
  'api-key': "bdf24466ac6148f5a951e3459c6191c9",
  'fq': "news_desk:(\"Sports\") AND glocations:(\""+$city.val()+"\")",
  'page': 0
});
$.getJSON(url, function(data){
    console.log(data);
 var lis = "";
 $.each(data.response.docs, function(index, dc){
     lis += '<li class="article">' + 
     '<a href=' + dc.web_url + ' target=_blank>' + dc.headline.main + '</a>'+
     '<p>' + (dc.abstract == null ? dc.snippet : dc.abstract) + '</p>' +
     '</li>';
 });
 $nytHeaderElem.text('New York Times Articles About '+ $city.val());
 $nytElem.append(lis);
});


    return false;
};

$('#form-container').submit(loadData);
