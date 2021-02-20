import Geocode from "react-geocode";

// set Google Maps Geocoding API
Geocode.setApiKey(process.env.REACT_APP_FIREBASE_API_KEY);
// set response language to english.
Geocode.setLanguage("en");

Geocode.setLocationType("ROOFTOP");

// Get address from latitude & longitude.
function addrFromCoords(geoPoint) {
  let lat = geoPoint.coords[1];
  let lng = geoPoint.coords[0];
  Geocode.fromLatLng(lat, lng).then(
    (response) => {
      const address = response.results[0].formatted_address;
      let city, state, country;
      for (let i = 0; i < response.results[0].address_components.length; i++) {
        for (
          let j = 0;
          j < response.results[0].address_components[i].types.length;
          j++
        ) {
          switch (response.results[0].address_components[i].types[j]) {
            case "locality":
              city = response.results[0].address_components[i].long_name;
              break;
            case "administrative_area_level_1":
              state = response.results[0].address_components[i].long_name;
              break;
            case "country":
              country = response.results[0].address_components[i].long_name;
              break;
          }
        }
      }
      return { city, state, country, address };
    },
    (error) => {
      return error;
    }
  );
}

// Get latitude & longitude from address.
function coordsFromAddr(addr) {
  if (addr !== "") {
    return new Promise((resolve, reject) => {
    Geocode.fromAddress(addr).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        let output = { lat: lat, lng: lng };
        resolve(output);
      },
      (error) => {
        console.error(error)
        reject(error)
      })
    })
  } else {
    return null
  }
}

const GeoSearch = { addrFromCoords: addrFromCoords, coordsFromAddr: coordsFromAddr }

export default GeoSearch;
