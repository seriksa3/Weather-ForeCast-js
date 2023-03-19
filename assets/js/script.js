// var country;
// const apiKey = "a4f6d2336badaa56710b35ab5cdbdbd7";
// var queryUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+country+"&appid="+apiKey;


// $.ajax({
//     url:queryUrl,
//     method:"GET"
// }).then(function(response) {
//     console.log(response); 
//     console.log();
// });
const key = "62d5440eb21080da0f55dfad5e6d254d";
const searchInput = $("#search-input");
const searchButton = $("#search-button");
const historyDiv = $("#history");
const historyButton = $("#history-button");

// -------- Initial Event Listener Function  --------//

let fromSearch = function(event) {
  event.preventDefault();
  let cityname = searchInput.val();
  let geoQuery = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityname + "&limit=5&appid=" + key;
  getGeoLocation(geoQuery);
};

let fromHistory = function(event) {
  let cityname = $(this).text();
  let geoQuery = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityname + "&limit=5&appid=" + key;
  getGeoLocation(geoQuery);
};

searchButton.on("click", fromSearch);
historyDiv.on("click", ".history-btn", fromHistory);

// -------- Find and Sort Data Function --------//

let getGeoLocation = function(geoQuery) {
  // This function gets the data from the weather API, and runs a series of functions
  // that retreieve the wanted data and outputs the data in dymically created HTML format.
  $.ajax({
    url: geoQuery,
    method: "GET",
    success: function(response01) {
      // First, get the city name, and the lonLat coords.
      city = response01[0].name;
      lat = response01[0].lat;
      lon = response01[0].lon;

      createhistoryButton(city);
      setLocalStorage(city);

      let queryURL =
        "https://api.openweathermap.org/data/2.5/forecast?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=" +
        key +
        "&units=metric";
      // Then enter the returned data into the next URL, to get the weather data for that location.
      $.ajax({
        url: queryURL,
        method: "GET",
      }).then(function(response02) {
        list = response02.list; // Returns all weather data points for the next 5 days.
        selectedListItems = getSelectedListItems(list); // Runs func to select only data points for 12 noon each day.
        dataPointVariables = assignDataPointVariables(city, selectedListItems); // Sorts an array of data points, and selects required properties (temp, wind etc).

        displayMainForecast(dataPointVariables); // Dynamically displays the main forcast panel
        display5DayForecast(dataPointVariables); // Dynamically display the 5 day forcas boxes.
      });
    },
  });
};

let getSelectedListItems = function(list) {
  // This filters and select data points for 12 noon each day.
  selectedListItemsArray = [];
  list.forEach((item) => {
    timestamp = item.dt;
    hour = getHour(timestamp);
    if (hour === 12) {
      selectedListItemsArray.push(item);
    }
  });
  return selectedListItemsArray;
};

let getHour = function(timeStamp) {
  // Helper function to calculate the time as an hour.
  date = new Date(timeStamp * 1000);
  hour = date.getHours();
  formattedTime = hour;
  return hour;
};

let getDate = function(timeStamp) {
  // Helper function to calculate the date from seconds
  date = new Date(timeStamp * 1000);
  day = date.getDate();
  month = date.getMonth() + 1;
  $(document).ready(function() {

    function getDate() {
      var date = new Date();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var year = date.getFullYear();
      var fullDate = month + '/' + day + '/' + year;
      return fullDate;
    }
  
    // Load data from server when the page is ready
    $.ajax({
      url: 'https://api.example.com/data',
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        // Loop through each item in the response data
        $.each(data, function(index, item) {
          // Create a new row for the table
          var row = $('<tr>');
  
          // Add columns to the row with the relevant data
          var nameCol = $('<td>').text(item.name);
          var dateCol = $('<td>').text(item.date);
          var amountCol = $('<td>').text(item.amount);
  
          // Append the columns to the row
          row.append(nameCol);
          row.append(dateCol);
          row.append(amountCol);
  
          // Append the row to the table
          $('#data-table tbody').append(row);
        });
  
        // Update the last updated date
        $('#last-updated').text('Last Updated: ' + getDate());
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log('Error loading data from server: ' + textStatus + ', ' + errorThrown);
      }
    });
  
    // Handle form submission
    $('#submit-form').submit(function(event) {
      event.preventDefault();
  
      // Get form data
      var name = $('#name-input').val();
      var date = $('#date-input').val();
      var amount = $('#amount-input').val();
  
      // Create new data object
      var newData = {
        name: name,
        date: date,
        amount: amount
      };
  
      // Send data to server
      $.ajax({
        url: 'https://api.example.com/data',
        type: 'POST',
        dataType: 'json',
        data: newData,
        success: function(responseData) {
          // Create a new row for the table
          var row = $('<tr>');
  
          // Add columns to the row with the relevant data
          var nameCol = $('<td>').text(newData.name);
          var dateCol = $('<td>').text(newData.date);
          var amountCol = $('<td>').text(newData.amount);
  
          // Append the columns to the row
          row.append(nameCol);
          row.append(dateCol);
          row.append(amountCol);
  
          // Append the row to the table
          $('#data-table tbody').append(row);
  
          // Clear the form inputs
          $('#name-input').val('');
          $('#date-input').val('');
          $('#amount-input').val('');
  
          // Update the last updated date
          $('#last-updated').text('Last Updated: ' + getDate());
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log('Error submitting form data: ' + textStatus + ', ' + errorThrown);
        }
      });
    });
  
  });
};  
