var country = "Oslo";
const apiKey = "a4f6d2336badaa56710b35ab5cdbdbd7";
var queryUrl = "api.openweathermap.org/data/2.5/forecast?q="+country+"&appid="+apiKey;


$.ajax({
    url:queryUrl,
    method:"GET"
}).then(function(response) {
    console.log(response); 
    console.log();
});