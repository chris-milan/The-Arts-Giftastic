var artCategories = ['Surrealist', 'Post-Impressionism', 'Art Deco', 'Cubism', 'Street Art', 'Kinetic Art', 'Pop Art', 'Fluxus', 'Fauvism', 'De Stijl', 'Minimalism', 'ASCII', 'Gothic Art'];

var api = "https://api.giphy.com/v1/gifs/search?q=";
var apiKey = "&api_key=8GuNxaaaAIDSLo8aVuAkKU3OgK4lRrhk&limit=";
var limit= 10;
    
    //allows buttons to populate, stemming from the artCategories array
    function renderButtons() {
        $("#genres-view").empty();
        for (var i = 0; i < artCategories.length; i++) {
        var a = $("<button>");
        a.addClass("category");
        a.addClass("btn btn-outline-info");
        a.attr("data-name", artCategories[i]);
        a.text(artCategories[i]);
        $("#genres-view").append(a);
        }
    }
    
    //allows user to intput their own category & crafts a clickable search button
    $("#add-arts").on("click", function(event) {
        event.preventDefault();
        var category = $("#arts-input").val().trim();
        artCategories.push(category);
        renderButtons();
    //resets text inputted into form after a submit
    $('form').get(0).reset()  
    });
 
    $(document).on("click", ".category", function() {
        var genre = $(this).attr("data-name");
        var queryURL = api + genre + apiKey + limit;
        $("#arts").empty();
        $.ajax({
            url: queryURL,
            method: "GET"
            })
            //getting data from giphy api
            .then(function(response) {
                var results = response.data;
                console.log(response);

                for (var i = 0; i < results.length; i++) {
                var gifGrid = $("<th>");
                gifGrid.addClass("item");

                var rating = results[i].rating;
                var title = results[i].title;

                var p = $("<p class='gifInfo'>").append("Rating: " + rating.toUpperCase() + "<br><br>Title: " +     title.toLowerCase() + "<hr>")
            
            //adds necessary attributes to each gif image
            var genreImage = $("<img>");
                genreImage.attr("src", results[i].images.fixed_height_still.url)
                genreImage.attr("data-still", results[i].images.fixed_height_still.url)
                genreImage.attr("data-animate", results[i].images.fixed_height.url)
                genreImage.attr("data-state", "still");
                genreImage.attr("alt", results[i].title)
                genreImage.addClass("gif");
            
            //creates grid of still gif images pulled from giphy api with a table
            //containing title and rating text    
            $("#arts").prepend(gifGrid);
            gifGrid.prepend(p);
            gifGrid.prepend(genreImage);       
            } 
            
            //animates or pauses gifs on click
            $(".gif").on("click", function() {
                var state = $(this).attr("data-state");
                if (state === "still") {
                  $(this).attr("src", $(this).attr("data-animate"));
                  $(this).attr("data-state", "animate");
                } else {
                  $(this).attr("src", $(this).attr("data-still"));
                  $(this).attr("data-state", "still"); 
                }
            });
         
            //plays all gifs   
             $("#playAll").on("click", function(event){
                var play = $(".gif");
                    play.each(function(){
                     $(this).attr("src", $(this).attr("data-animate"));
                          $(this).attr("data-state", "animate");         
                })
            });
            
            //pauses all gifs   
             $("#pauseAll").on("click", function(event){
                var pause = $(".gif");
                    pause.each(function(){
                     $(this).attr("src", $(this).attr("data-still"));
                          $(this).attr("data-state", "still");         
                })
            });
        });
    });
  
    renderButtons();

  