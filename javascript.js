
$(document).ready(function(){

var topics = ["Family Guy", "The Simpsons", "American Dad", "Rick and Morty", "Big Mouth", "South Park", "Bobs Burgers", "Spongebob", "Fairly Oddparents", "Scooby Doo", "Rocket Power", "Dexters Laboratory"]

var createButtons = function() {
    //removes all elements within the buttons section
    $("#buttons").empty();
    //create buttons based on elements in the array
    for (var i=0; i<topics.length; i++){
        //Creates new buttons
        var newButton = $("<button>");
        //Give button an attribute
        newButton.attr("data-type");
        //Give button a name that reflects the array
        newButton.text(topics[i]);
        //add class to button
        newButton.attr("class", "gif btn");
        //add buttons to the DOM
        newButton.attr("data-show", topics[i]);
        $("#buttons").append(newButton);
    }
}

var submit = function() {
    //When submit button is clicked...
    $("#submit-button").on("click", function(event){
        //Prevent from the default form/input events from occurring 
        event.preventDefault();
        //Get input text value
        var inputVal = $("#userInput").val();
        //psuh user input to array
        topics.push(inputVal);
        //Create new buttons
        createButtons();
        //Testing
        console.log(inputVal);
        console.log(topics);

    });
}

var displayGif = function(){
    $(document).on("click", ".gif", function() {
        var show = $(this).attr("data-show");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          show + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log(this);
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          .then(function(response) {
            var results = response.data;
            console.log(results);
    
            for (var i = 0; i < results.length; i++) {
              var gifDiv = $("<div class='item'>");
    
              var rating = results[i].rating;
    
              var p = $("<p>").text("Rating: " + rating);
    
              var showImage = $("<img>");
              showImage.attr("src", results[i].images.original_still.url);
              showImage.attr("data-still", results[i].images.original_still.url);
              showImage.attr("data-animated", results[i].images.original.url);
              showImage.attr("data-state", "still");
    
              gifDiv.prepend(p);
              gifDiv.prepend(showImage);
    
              $("#gifs-appear-here").prepend(gifDiv);
            }
          });
      });

}

var animateGif = function(){
    $(document).on("click", "img", function(){
        var state = $(this).attr("data-state");
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animated"));
            $(this).attr("data-state", "animated");
          } else if (state === "animated") {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
    });
}

createButtons();
submit();
displayGif();
animateGif();



});