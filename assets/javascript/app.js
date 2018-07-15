
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
//console.log(typs);
  
 
function initialize() 
{
    var mapOptions = {
     zoom: 16,
     mapTypeId: google.maps.MapTypeId.ROADMAP,
     };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    //HTML5 geolocation
    if (navigator.geolocation) 
    {
       navigator.geolocation.getCurrentPosition(function(position) 
       {
            pos = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
            infowindow = new google.maps.InfoWindow({map: map,position: pos,content: "You're Here!"});
           
            // Request from Typs Array
            var request = {location:pos,radius:1000, types:typs};
            map.setCenter(pos);
            infowindow = new google.maps.InfoWindow();
            var service = new google.maps.places.PlacesService(map);
            service.nearbySearch(request,callback);
        }, 
        function() 
        { 
        handleNoGeolocation(true);
        });
    } 
    else 
    {
    handleNoGeolocation(false);
    }
 
   //button click for marker
    $("#cafe").on("click",function(){
        clicker = true;
        initialize();
        typs = [];
        typs.push("cafe");
        console.log("clicked" + "  " + clicker + "" + typs);
    }); 
    $("#restaurants").on("click",function(){
        clicker = true;
        initialize();
        typs= [];
        typs.push("restaurant");
        console.log("clicked" + "  " + clicker + "" + typs);
    }); 
    $("#bars").on("click",function(){
        clicker = true;
        initialize();
        typs = [];
        typs.push("bar");
        console.log("clicked" + "  " + clicker + "" + typs);
    }); 

  //retrieves results
  function callback(results, status) 
    {
      if (status == google.maps.places.PlacesServiceStatus.OK) 
      {
        for (var i = 0; i < results.length; i++) 
        {    
          createMarker(results[i]);
          console.log(results[i]);
          result.push(results[i].name);
        }
      }
    }
}
//Makes a marker
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
        
//zomato api
/*$.ajax({
    method: "GET",
    url: queryUrl,
    dataType: "json",
    headers: {
        "user-key": "cf5804bac687763220c3be71ce79923b"
    },
})
*/

$.ajax({
    method: "GET",
    url: queryUrl + "location=" + result[0] + "&term="+result[1],
    dataType: "json",
    headers: {
        "Authorization": "Bearer gqqI1WuGp5Wr7QmZmrtJleBqhRGAVHibKExf_CtV2P7CFQ4LJgOI9gOX0zJ_-JdArDZXuvb-1mOFBsDfSoy7Rr9KJqJka3b837KqtJgQbROVBnOpbZSlgyEcKhVKW3Yx",
    }}).then(function (response) {
        console.log(response);
   /* //console.log(response);
    for (i=0;i<response.businesses.length;i++){
        //console.log(response.businesses[i].rating);
    }
    //console.log(result);
    $(".card-title").append(response.businesses[0].name);
    */

})