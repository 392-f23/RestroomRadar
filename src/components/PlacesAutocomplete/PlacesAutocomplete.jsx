import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
  getDetails,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import "./PlacesAutocomplete.css";
import { getCoordinateLocation } from "../../utilities/googleApiCalls";

const PlacesAutocomplete = ({ setCoordinates, simpleAddress, isLoaded }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    callbackName: "initMap",
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });
  const ref = useOnclickOutside(() => {
    // When the user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
    () => {
      // When the user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      clearSuggestions();

      getCoordinateLocation(description, setCoordinates);

      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        //console.log("📍 Coordinates: ", { lat, lng });
      });
      //console.log("hey!", description);
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      getCoordinateLocation(suggestion.description, setCoordinates);

      return (
        <li className='addressli' key={place_id} onClick={handleSelect(suggestion)}>
          <b>{main_text}</b> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div ref={ref} className="autocomplete-div">
      <input
        value={value}
        type="search"
        onChange={handleInput}
        disabled={!ready}
        className={`addressinput ${status === 'OK' ? 'addressinputfocus' : ''}`}
        placeholder={isLoaded ? "Calculating current location..." : "near " + simpleAddress[0]+","+simpleAddress[1] + "..."}
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === "OK" && (
        <ul className='suggestions'>{renderSuggestions()}</ul>
      )}
    </div>
  );
};

export default PlacesAutocomplete;
