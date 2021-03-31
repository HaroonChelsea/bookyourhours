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

Chart.defaults.global.defaultFontFamily = "Nunito";
Chart.defaults.global.defaultFontColor = "#888";
Chart.defaults.global.defaultFontSize = "14";

const ctx = document.getElementById("chart").getContext("2d");

const chart = new Chart(ctx, {
  type: "line",

  // The data for our dataset
  data: {
    labels: ["January", "February", "March", "April", "May", "June"],
    // Information about the dataset
    datasets: [
      {
        label: "Views",
        backgroundColor: "rgba(42,65,232,0.08)",
        borderColor: "#2a41e8",
        borderWidth: "3",
        data: [196, 132, 215, 362, 210, 252],
        pointRadius: 5,
        pointHoverRadius: 5,
        pointHitRadius: 10,
        pointBackgroundColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointBorderWidth: "2"
      }
    ]
  },

  // Configuration options
  options: {
    layout: {
      padding: 10
    },

    legend: { display: false },
    title: { display: false },

    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: false
          },
          gridLines: {
            borderDash: [6, 10],
            color: "#d8d8d8",
            lineWidth: 1
          }
        }
      ],
      xAxes: [
        {
          scaleLabel: { display: false },
          gridLines: { display: false }
        }
      ]
    },

    tooltips: {
      backgroundColor: "#333",
      titleFontSize: 13,
      titleFontColor: "#fff",
      bodyFontColor: "#fff",
      bodyFontSize: 13,
      displayColors: false,
      xPadding: 10,
      yPadding: 10,
      intersect: false
    }
  }
});
