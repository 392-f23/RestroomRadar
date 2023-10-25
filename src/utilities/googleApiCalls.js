import { getDistanceFromLatLonInKm } from "./distanceLatLon.js";

let map;
let service;
let infowindow;

function createMarker(place) {
  if (!place.geometry || !place.geometry.location) return;

  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
  });

  // adding pop-up for marker: https://developers.google.com/maps/documentation/javascript/adding-a-google-map
  infowindow = new google.maps.InfoWindow();
  google.maps.event.addListener(marker, "click", () => {
    infowindow.setContent(place.name + " , " + place.vicinity || "");
    infowindow.open(marker.map, marker);
  });
}

export function initMap(queryCoordinates, request) {
  const locationMap = new google.maps.LatLng(
    queryCoordinates.lat,
    queryCoordinates.lon
  );
  //console.log(locationMap);
  infowindow = new google.maps.InfoWindow();
  //console.log(locationMap);

  map = new google.maps.Map(document.getElementById("map"), {
    center: locationMap,
    zoom: 13,
  });

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, (results, status) => {
    //console.log(results);
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
      for (let i = 1; i < results.length; i++) {
        //console.log(results[i]);
        createMarker(results[i]);
      }
      //console.log(results[0].geometry.location);
      map.setCenter(results[1].geometry.location);
    }
  });
}

export const getCoordinateLocation = (queryLocation, setCoordinates) => {
  var placesService = new google.maps.places.PlacesService(
    document.createElement("div")
  );

  // query structure: https://developers.google.com/maps/documentation/javascript/places#find_place_from_query
  var requestLocation = {
    query: queryLocation,
    fields: ["name", "geometry", "geometry.location"],
  };

  // iterating through places from API request: https://developers.google.com/maps/documentation/javascript/places#find_place_from_query
  placesService.findPlaceFromQuery(requestLocation, function (results, status) {
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        //console.log(results[i]);
        let lon = results[i].geometry.viewport.Oa.hi;
        let lat = results[i].geometry.viewport.mb.hi;
        setCoordinates({ lat, lon });
        //console.log({lat,lon});
      }
    }
  });
};

const getRating = (restrooms, restroomId) => {
  if (restrooms) {
    const restroomReviews = restrooms[restroomId];

    if (!restroomReviews) {
      return 0;
    }

    let ratingSum = 0;
    for (const reviewId in restroomReviews) {
      const review = restroomReviews[reviewId];
      ratingSum = ratingSum + review.rating;
    }
    return ratingSum / Object.entries(restroomReviews).length;
  }
};

export const getNearbyRestrooms = (
  queryCoordinates,
  setNearbyPlaces,
  setRestroomData,
  address,
  setSimpleAddress,
  coordinates,
  setAddress,
  restroomsFromFirebase
) => {
  //console.log(queryCoordinates);

  var currentLocation = new google.maps.LatLng(
    queryCoordinates.lat,
    queryCoordinates.lon
  );
  var placesService = new google.maps.places.PlacesService(
    document.createElement("div")
  );
  var requestNearby = {
    location: currentLocation,
    radius: "1000",
    type: ["public"],
  };

  // iterating through places from API request: https://developers.google.com/maps/documentation/javascript/places#find_place_from_query
  placesService.nearbySearch(requestNearby, function (results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      let nearbyResults = [];
      //console.log("got here too");
      //console.log(results);
      for (var i = 1; i < results.length; i++) {
        /* let openStatus;
        new google.maps.places.PlacesService(document.createElement("div")).getDetails({
          placeId: results[i].place_id,
          fields: ['opening_hours','utc_offset_minutes'],
          }, function (place, status) {
            if (status !== 'OK') return; // something went wrong
            const isOpenAtTime = place.opening_hours.isOpen();
            //console.log(isOpenAtTime);
            if (isOpenAtTime) {
              openStatus = true;
            } else {
              openStatus = false;
            }
        });
        console.log(openStatus); */
        let types = results[i].types;
        let primary_types = [
          "bakery",
          "bar",
          "cafe",
          "campground",
          "city_hall",
          "convenience_store",
          "department_store",
          "gas_station",
          "library",
          "restaurant",
          "university",
        ];
        for (let ii = 0; ii < primary_types.length; ii++) {
          if (results[i].types.includes(primary_types[i])) {
            types = [primary_types[i]];
          }
        }
        
        if (types[0] != "locality") {
          nearbyResults.push({
            id: results[i].place_id,
            name: results[i].name,
            address: results[i].vicinity,
            distance: getDistanceFromLatLonInKm(
              results[i].geometry.viewport.mb.hi,
              results[i].geometry.viewport.Oa.hi,
              queryCoordinates.lat,
              queryCoordinates.lon
            ).toFixed(2),
            rating: getRating(restroomsFromFirebase, results[i].place_id)
              ? getRating(restroomsFromFirebase, results[i].place_id)
              : 0,
            types: types,
            priceLevel: "Purchase required ($6)",
            operational: results[i].business_status,
          });
        }

      }
      //console.log(nearbyResults);
      setNearbyPlaces(nearbyResults);
      setRestroomData(nearbyResults);
      getAddressFromLocation(coordinates, setAddress);
      setSimpleAddress(address.split(","));
      //console.log(queryCoordinates);
      //console.log(requestNearby);
      window.initMap = initMap(queryCoordinates, requestNearby);
    }
  });
};

export const getCurrLocation = (setCoordinates) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        //console.log(pos);
        setCoordinates({ lat: pos.lat, lon: pos.lng });
      },
      () => {
        console.log("Geolocation Error");
      }
    );
  } else {
    // Browser doesn't support Geolocation
    console.log("Geolocation Error");
  }
};

export const getAddressFromLocation = (coordinates, setAddress) => {
  const geocoder = new google.maps.Geocoder();
  geocoder
    .geocode({
      location: {
        lat: parseFloat(coordinates.lat),
        lng: parseFloat(coordinates.lon),
      },
    })
    .then((response) => {
      if (response.results[0]) {
        const address = response.results[0].formatted_address;
        //console.log(address)
        setAddress(address);
      } else {
        console.log("Reverse geocode error");
      }
    })
    .catch((e) => window.alert("Geocoder failed due to: " + e));
};
