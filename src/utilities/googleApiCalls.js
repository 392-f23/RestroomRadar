import { getDistanceFromLatLonInKm } from "./distanceLatLon.js";

export const getCoordinateLocation = (queryLocation,setCoordinates) => {

    var placesService = new google.maps.places.PlacesService(document.createElement("div"));
    
    // query structure: https://developers.google.com/maps/documentation/javascript/places#find_place_from_query
    var requestLocation = {
      query: queryLocation,
      fields: ['name', 'geometry','geometry.location']
    };
      
    // iterating through places from API request: https://developers.google.com/maps/documentation/javascript/places#find_place_from_query
    placesService.findPlaceFromQuery(requestLocation, function(results, status) {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          console.log(results[i]);
          let lon = results[i].geometry.viewport.Oa.hi;
          let lat = results[i].geometry.viewport.mb.hi;
          setCoordinates({lat, lon});
          //console.log({lat,lon});
        }
      }
    }
    );
}
  
export const getNearbyRestrooms = (queryCoordinates,setNearbyPlaces,setRestroomData) => {
    //console.log("queryCoordinates");
    //console.log(queryCoordinates);
    var currentLocation = new google.maps.LatLng(queryCoordinates.lat,queryCoordinates.lon);
    var placesService = new google.maps.places.PlacesService(document.createElement("div"));
    //console.log("currentLocation");
    //console.log(currentLocation);
    // query structure: https://developers.google.com/maps/documentation/javascript/places#place_search_requests
    var requestNearby = {
      location: currentLocation,
      radius: '1000',
      type: ['public restrooms']
    };

    // iterating through places from API request: https://developers.google.com/maps/documentation/javascript/places#find_place_from_query
    placesService.nearbySearch(requestNearby, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        let nearbyResults = [];
        //console.log("got here too");
        //console.log(results);
        for (var i = 1; i < results.length; i++) {
        //console.log(results[i]);
          nearbyResults.push({
            "id": results[i].place_id, 
            "name": results[i].name,
            "address": results[i].vicinity,
            "distance": getDistanceFromLatLonInKm(
              results[i].geometry.viewport.mb.hi,
              results[i].geometry.viewport.Oa.hi,
              queryCoordinates.lat,
              queryCoordinates.lon).toFixed(2),
            "rating": results[i].rating,
            "priceLevel": "Purchase required ($6)",
            "operational": results[i].business_status
          });}
        setNearbyPlaces(nearbyResults);
        setRestroomData(nearbyResults);
        //console.log(nearbyResults);
      }
    });
}