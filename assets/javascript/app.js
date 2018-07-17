var map;
var service;
var marker;
var pos;
var infowindow;
var typs = [];
var clicker;
var test = 0;
var queryUrl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?";
// "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=oakville&term=Starbucks"
var result = [];
var address = [];
var queryUrl2 = "";
var search = $("#search").val().trim();
console.log(search);
function initialize() {
    var mapOptions = {
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            pos = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
            infowindow = new google.maps.InfoWindow({map: map,position: pos,content: "You're Here!"});
           
 
            var request = {location:pos,radius:1000, types:typs};
            map.setCenter(pos);
            infowindow = new google.maps.InfoWindow();
            var service = new google.maps.places.PlacesService(map);
            service.nearbySearch(request,callback);
        }, 
        function() { 
        handleNoGeolocation(true);
        });
    } 
    else {
    handleNoGeolocation(false);
    }
 

    $("#cafe").on("click",function(){
        clicker = true;
        initialize();
        $(".cards").html("");
        typs = [];
        typs.push("cafe");
       
    }); 
    $("#restaurants").on("click",function(){
        clicker = true;
        $(".cards").html("");
        initialize();
        typs= [];
        typs.push("restaurant");
        
    }); 
    $("#bars").on("click",function(){
        clicker = true;
        $(".cards").html("");
        initialize();
        typs = [];
        typs.push("bar");
        
    }); 

  function create() {
      
  }
    function createMarker(place, icon) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
            icon: {
                url: icon,
                scaledSize: new google.maps.Size(10, 10) // pixels
                },
                animation: google.maps.Animation.DROP
            });
            
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent(place.name+ '<br>' +place.vicinity);
                infowindow.open(map, this);
            });
    }

  //retrieves results
    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {    
                createMarker(results[i]);
                //console.log(results[i]);
                result.push(results[i].name);
                address.push(results[i].vicinity);
                
                if(result && address === 0){
                    $(".cards").text("No Results")
                }
                
                queryUrl2 = queryUrl + "location=" + address[i] + "&term="+result[i] + "&limit=1";
                var cards = $('<div class="card blue-grey darken-1"></div>');      

            $.ajax({
                method: "GET",
                url: queryUrl2,
                dataType: "json",
                headers: {
                    "Authorization": "Bearer R2RXNWRVFQgmlFfg-7_lfm7i0p7ck1k-87GJy1sjJCTbGirXDYRKi5h0l7r4Ltb1M-_nNLskftSFHoyj71QsX3asqivL8O8LuPcky9rLQ6jwYnzPtdThYciL8gNMW3Yx",
                }}).then(function (response) {
                            console.log(response.businesses[0].name);
                            var distance = response.businesses[0].distance; 
                            var text = $('<div class="card blue-grey darken-1 cds">'+ response.businesses[0].name + '<br/>' + 'Rating: ' + response.businesses[0].rating + '/5' + '<br/>'+ 'Price: ' + response.businesses[0].price + '<br/> '+'Phone #: ' + response.businesses[0].phone + '<br/>' + 'Distance: ' + (Math.round( distance * 100 )/100 ).toString() +'m' + '<br/>' + '<button class = "waves-effect waves-light btn intBtn"><a href = ' + response.businesses[0].url + ' id = "buttonTxt"> On Yelp! </a> </button>'+'</div>')
                            $(".cards").append(text);
                

            }) 
             
                
            }
            
        }
    }
    
}
// SPARE KEY
// gqqI1WuGp5Wr7QmZmrtJleBqhRGAVHibKExf_CtV2P7CFQ4LJgOI9gOX0zJ_-JdArDZXuvb-1mOFBsDfSoy7Rr9KJqJka3b837KqtJgQbROVBnOpbZSlgyEcKhVKW3Yx
