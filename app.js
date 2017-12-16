$(document).ready(function() {

var topics = ["the office" , "colombia" , "liberty university"]


//Makes buttons from topics array
function buttons() {

       
        $("#buttons-view").empty();

        
        for (var i = 0; i < topics.length; i++) {
        
          var newButton = $("<button>");
          
          newButton.addClass("btn btn-primary");
          newButton.addClass("button");
          
          newButton.attr("data-name", topics[i]);
          
          newButton.text(topics[i]);
          
          $("#buttons-view").append(newButton);
        }
      }

buttons()


        //Adds a button
      $(document).on("click" , "#addButton" , function(event) {
        event.preventDefault();
        
        var topic = $("#addInput").val().trim();
        
        topics.push(topic);

        $("#addInput").empty();
        
        buttons();

      });


      //Calls the gif
      $(document).on("click", ".button" , function(event) {
       event.preventDefault();

        var topicUrl = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topicUrl + "&api_key=jJhXjIruQRUjwtKKCvYrkXotrqxnccuL&limit=10";

        
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

          //could not figure out how to get divs next to each other 
          var results = response.data;

          for (var i = 0; i < response.data.length; i++) {

          var giphyDiv = $("<div>");

          var p = $("<p>").text("Rating: " + results[i].rating);

          var imageTag = $("<img>")

          imageTag.attr("src" , results[i].images.original_still.url);

          imageTag.attr("data-state" , "animate");

          imageTag.attr("data-still" , results[i].images.original_still.url);

          imageTag.attr("data-animate" , results[i].images.original.url);

          giphyDiv.append(p);
          giphyDiv.append(imageTag);
          
          $(imageTag).addClass("gifPic")

          $("#gifs-appear-here").prepend(giphyDiv)

            
          }

        });
        

      });




      //Animates the gif on click. Might take a few moments to work
    $(document).on("click" , ".gifPic" , function() {
       


        var state = $(this).attr("data-state")
        
        if (state == 'still') {
            var url = $(this).attr("data-animate")
            $(this).attr("src", url)
            $(this).attr("data-state", 'animate')
        }

        
         if (state == 'animate') {
          var urlStill = $(this).attr("data-still")
          $(this).attr("src", urlStill)
          $(this).attr("data-state", 'still')

        }

        
    });

})


 