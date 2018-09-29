
$(document).ready(function(){ //when the document is ready we will do these things


   $("#cityField").keyup(function(){
       
      $("#txtHint").text($("#cityField").val());
      $.getJSON("http://bioresearch.byu.edu/cs260/jquery/getcity.cgi?q=" + encodeURI(makeCaps($("#cityField").val())), function(data){
         $("#txtHint").text(makeCaps($("#cityField").val()));
          var everything = "<ul>";
          
          $.each(data, function(i,item) {
            everything += "<li> " + data[i].city;
          });
            
          everything += "</ul>";
          $("#txtHint").html(everything);
      });
   });
   
   
   $("#weatherButton").click(function(e){
       console.log("Submit button pressed!");
       e.preventDefault(); //will prevent the browswer from submitting the form
       
       var value = $("#cityField").val();
       
       var myUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + encodeURI(value) + "&APPID=89d40a3deb8cccbf273764a68a681420&units=imperial";
       
       
       $.ajax({
           url: myUrl,
           dataType: "json",
           success: function(parsed_json) {
               
               $("#displayCity").val(makeCaps(value));
               
               var everything = "<ul>";
               
               
               var weatherObj = parsed_json["weather"][0];
               
               var description = weatherObj["description"];
               var image = weatherObj["icon"];
               
               var iconURL = "http://openweathermap.org/img/w/" + image + ".png";
               $("#weatherIcon").attr("src", iconURL);
               $("body").css('background-image', 'url(' + iconURL + ')');
               
               var main = parsed_json["main"];
               
               var temperature = main["temp"];
               var humidity = main["humidity"];
               var tempMax = main["temp_max"];
               var tempMin = main["temp_min"];
               
               var coord = parsed_json["coord"];
               
               
               everything += "<li><h1>" + parsed_json["name"] + "</h1> lat: " + coord["lat"] + " long: " + coord["lon"] + "</li>";
               
               everything += "<li><h1>" + temperature + " F</h1></li><li>Min: " + tempMin + " F Max: " + tempMax + " F</li><li>Humidity: " + humidity + "%</li>";
               everything += "<li>" + description + "</li>";
               
               everything += "</ul>";;
               
               $("#weather").html(everything);
               
           },
           failure: function(parsed_json){
               $("#displayCity").val("No City");
               $("#weather").html("No Weather");
           },
       });
   });
   
   
   
   
   $("#searchButton").click(function(e){
       var value = $("#searchField").val();
       console.log(value);
       
       e.preventDefault(); //will prevent the browswer from submitting the form
       var myUrl = "https://api.stackexchange.com/2.2/search?order=desc&sort=activity&intitle=" + encodeURI(value) + "&site=stackoverflow";
       
       console.log(myUrl);
       
       $.ajax({
           url: myUrl,
           dataType: "json",
           success: function(parsed_json) {
               
               var everything = "<ul>";
               
               var itemsArray = parsed_json["items"]; //get into the array it returns of all of the items
               
               for(var i = 0; i < itemsArray.length; i++){
                   var title = itemsArray[i]["title"];
                   var link = itemsArray[i]["link"];
                   
                   everything += "<li><a href =\"" + link + "\">" + title + "</a></li>";
               }
               
               everything += "</ul>";
               $("#searchResults").html(everything);
               
               
               
           }
       });
   });
   
   
   
});

function makeCaps(str){
    str = str.charAt(0).toUpperCase() + str.slice(1);
    
    for(var i = 0; i < str.length - 2; i++){
        if(str.charAt(i) == " "){
            str = str.substr(0, i + 1) + str.charAt(i + 1).toUpperCase() + str.substr(i + 2);
        }
    }
    
    return str;
}