$( document ).ready(function() {
    // Array that lists the initial super hero searches
    var heroes = ["Batman", "Superman", "The Flash", "Green Lantern", "Wonder Woman", "Aqua Man", "Cyborg",
    "Captain America", "Iron Man", "The Hulk", "Thor", "Black Panther", "Hawkeye", "Deadpool"];

    // Function that displays all gif buttons
    function displayGifButtons(){
        $("#gifButtonsView").empty();
        for (var i = 0; i < heroes.length; i++){
            var gifButtons = $("<button>");
            gifButtons.addClass("action");
            gifButtons.addClass("btn btn-primary")
            gifButtons.attr("data-name", heroes[i]);
            gifButtons.text(heroes[i]);
            $("#gifButtonsView").append(gifButtons);
        }
    }
    // Function to add a new action button
    function addNewButton(){
        $("#addGif").on("click", function(){
        var hero = $("#hero-input").val().trim();
        if (hero === ""){
          return false; 
        }
        heroes.push(action);
    
        displayGifButtons();
        return false;
        });
    }

    // Function that displays all of the gifs
    function displayGifs(){
        var action = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log(queryURL); // displays the constructed url
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response) {
            console.log(response);
            $("#gifsView").empty();
            var results = response.data; 
            if (results === ""){
              alert("There isn't a gif for this selected button");
            }
            for (var i=0; i<results.length; i++){
    
                var gifDiv = $("<div>");
                gifDiv.addClass("gifDiv");
                // pulling rating of gif
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.append(gifRating);

                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url);
                gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); // still image
                gifImage.attr("data-animate",results[i].images.fixed_height_small.url);
                gifImage.attr("data-state", "still");
                gifImage.addClass("image");
                gifDiv.append(gifImage);

                // adding div of gifs to gifsView div
                $("#gifsView").prepend(gifDiv);
            }
        });
    }
    // Calling Functions & Methods
    displayGifButtons(); 
    addNewButton();

    $(document).on("click", ".action", displayGifs);
    $(document).on("click", ".image", function(){
        var state = $(this).attr('data-state');
        if ( state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
    });
    