$("#snackbar-user-status label").click(function() {
  Snackbar.show({
    text: "Your status has been changed!",
    pos: "bottom-center",
    showAction: false,
    actionText: "Dismiss",
    duration: 3000,
    textColor: "#fff",
    backgroundColor: "#383838"
  });
});

function initAutocomplete() {
  const options = {
    types: ["(cities)"]
    // componentRestrictions: {country: "us"}
  };

  const input = document.getElementById("autocomplete-input");
  const autocomplete = new google.maps.places.Autocomplete(input, options);
}

// Autocomplete adjustment for homepage
if ($(".intro-banner-search-form")[0]) {
  setTimeout(function() {
    $(".pac-container").prependTo(".intro-search-field.with-autocomplete");
  }, 300);
}
