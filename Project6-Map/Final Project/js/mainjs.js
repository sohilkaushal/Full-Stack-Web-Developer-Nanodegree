//AN ARRAY OF LOCATIONS DEFINED

var maps = [{
    title: "PCA STADIUM",
    locations: {
        lat: 30.6909,
        lng: 76.7375
    },
    show: true,
    selected: false,
    id: "4d6318a32f16b60c8ebcdcf4"
}, {
    title: "ELANTE MALL",
    locations: {
        lat: 30.7058,
        lng: 76.8010
    },
    show: true,
    selected: false,
    id: "5114cd90e4b06bb0ed15a97f"
}, {
    title: "SUKHNA LAKE",
    locations: {
        lat: 30.7421,
        lng: 76.8188
    },
    show: true,
    selected: false,
    id: "4c456c4b8c1f20a14ebd3d99"
  }, {
      title: "ROCK GARDEN",
      locations: {
          lat: 30.7525,
          lng: 76.8101
      },
      show: true,
      selected: false,
      id: "4b6fe660f964a5206dff2ce3"
    },  {
        title: "CHATTBIR ZOO",
        locations: {
            lat: 30.6039,
            lng: 76.7925
        },
        show: true,
        selected: false,
        id: "4f531694e4b07e4c63681170"
 }];
 var map;

//INITAL CONSTRUCTOR FOR MAP

 function initMap() {
     var mapOptions = {
         center: {
             lat: 30.7565,
             lng: 76.8019
         },
         zoom: 16,
         mapTypeControl: false
     };
     map = new google.maps.Map(document.getElementById('map'), mapOptions);
     markerInfo = new google.maps.InfoWindow();
     ko.applyBindings(new referenceModel());
 }

 function Error() {
     document.getElementById('map').innerHTML = "SORRY!AN ERROR OCCURED AND YOUR REQUEST COULD NOT BE FULFILLED";
 }

 function referenceModel() {

     var it = this;
     var bounds = new google.maps.LatLngBounds();
     it.errormsg = ko.observable();
     it.searchText = ko.observable();
     it.markers = [];

     //MARKER PROPERTIES DEFINED

     for (var i = 0; i < maps.length; i++) {
         var marker = new google.maps.Marker({
             position: maps[i].locations,
             map: map,
             name: maps[i].title,
             animation: google.maps.Animation.DROP,
             show: ko.observable(maps[i].show),
             selected: ko.observable(maps[i].selected),
             fsid: maps[i].id
         });
         it.markers.push(marker);
         bounds.extend(marker.position);
         it.markers[it.markers.length - 1].setVisible(it.markers[it.markers.length - 1].show());
     }

     //AJAX REQUEST USING FOURSQUARE API IN ORDER TO GET NUMBER OF LIKES ON EACH OF THE DEFINED LOCATIONS

     it.markers_info = function(marker) {
         $.ajax({

           //CLIENT SECRETS AND CLIENT ID ADDED HERE

             url: "https://api.foursquare.com/v2/venues/" + marker.fsid + "?client_id=XSPLS2M3VI1HKPJNZ01F0SDO1R03HGOAS2T3PCTYNYKCO2IE&client_secret=ZZLJVWZJZW5BPONAHRH2CMCMVBPTX3Z2DUM2Y1UR4DPLUH2M&v=20161016",
             dataType: "json",
             success: function(data) {
                 result = data.response.venue;
                 if (result.hasOwnProperty('likes')) {
                     marker.likes = result.likes.summary;
                 }
             },
             error: function(e) {
                 it.errormsg("HEY!UNFORTUNATELY THERE WAS AN ERROR");
             }
         });
     };

     //addListener DEFINED

     for (var j = 0; j < it.markers.length; j++) {
         (function(marker) {
             it.markers_info(marker);
             marker.addListener('click', function() {
                 it.setSelected(marker);
             });
         })(it.markers[j]);
     }

     //SEARCH FUNCTIONALITY

     it.search = function() {
         markerInfo.close();
         var text = it.searchText();
         if (text.length === 0) {
             it.showAll(true);
         } else {
             for (var i = 0; i < it.markers.length; i++) {
                 if (it.markers[i].name.toLowerCase().indexOf(text.toLowerCase()) > -1) {
                     it.markers[i].setVisible(true);
                     it.markers[i].show(true);
                 } else {
                     it.markers[i].setVisible(false);
                     it.markers[i].show(false);
                 }
             }
         }
         markerInfo.close();
     };

     //SHOW ALL MARKERS

     it.showAll = function(show) {
         for (var i = 0; i < it.markers.length; i++) {
             it.markers[i].setVisible(show);
             it.markers[i].show(show);
         }
     };

     //MARKERS UNSELECTED

     it.unselectAll = function() {
         for (var i = 0; i < it.markers.length; i++) {
             it.markers[i].selected(false);
         }
     };

     it.setSelected = function(marker) {
         console.log(location);
         it.unselectAll();
         marker.selected(true);

         it.currentMarker = marker;

         //NO OF LIKES DISPLAYED INSIDE THE InfoWindow

         formatLikes = function() {
             if (it.currentMarker.likes === "" || it.currentMarker.likes === undefined) {
                 return "No likes";
             } else {
                 return it.currentMarker.likes;
             }
         };

         var formatMarkerInfo = "<h5>" + it.currentMarker.name + "</h5>" + "<div>" + formatLikes() + "</div>";

         markerInfo.setContent(formatMarkerInfo);

         markerInfo.open(map, marker);

         //ANIMATION ADDED

         it.animateMarker = function(marker) {
             marker.setAnimation(google.maps.Animation.BOUNCE);
             setTimeout(function() {
                 marker.setAnimation(null);
             }, 900);
         };

         it.animateMarker(marker);

         it.hideNav = function(){
           $('.button-collapse').sideNav('hide');
         };
     };

     //MAP FIT TO BOUNDS

     map.fitBounds(bounds);
   }
