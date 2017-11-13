var topics = ["pizza", "taco", "spagetti", "sushi", "junk food",
                  "salmon", "sandwich", "steak", "hot dog", "hamburger"];


	function renderButtons() {

  		$("#buttonPanel").empty();

  		for (var i = 0; i < topics.length; i++) {
 
		    var button = $("<button>");
		    button.addClass("foodButton");
		    button.attr("data-food", topics[i]);
		    button.text(topics[i]);

		    $("#buttonPanel").append(button);
  		}
	}

	$("#add-food").on("click", function(event) {
  		
  		event.preventDefault();

  		var food = $("#food-input").val().trim();

  		topics.push(food);
  		$("#food-input").val("");

  		renderButtons();
	});

	function getFoodGifs() {

		  var foodName = $(this).attr("data-food");
		  var foodString = foodName.split(" ").join("+");

		  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + foodString + 
		                 "&rating=pg&limit=10&api_key=dc6zaTOxFJmzC";

		  $.ajax({
		  	method: "GET",
		    url: queryURL,
		  })
		  .done(function(response) {

		    var dataArray = response.data;

		    $("#gifPanel").empty();
    			for (var i = 0; i < dataArray.length; i++) {
			      var newDiv = $("<div>");
			      newDiv.addClass("foodGif");

			      var newRating = $("<h3>").html("Rating: " + dataArray[i].rating);
			      newDiv.append(newRating);

			      var newImg = $("<img>");
			      newImg.attr("src", dataArray[i].images.fixed_height_still.url);
			      newImg.attr("data-still", dataArray[i].images.fixed_height_still.url);
			      newImg.attr("data-animate", dataArray[i].images.fixed_height.url);
			      newImg.attr("data-state", "still");
			      newDiv.append(newImg);

			      
			      $("#gifPanel").append(newDiv);

				}	
    
  			});
	}

	
	function animateFoodGif() {
	  
	  var state = $(this).find("img").attr("data-state");

	  if (state === "still") {
	    $(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
	    $(this).find("img").attr("data-state", "animate");
	  } 
	  else {
	    $(this).find("img").attr("src", $(this).find("img").attr("data-still"));
	    $(this).find("img").attr("data-state", "still");
	  }
	}

	$(document).ready(function() {
	  renderButtons();
	});

	$(document).on("click", ".foodButton", getFoodGifs);

	$(document).on("click", ".foodGif", animateFoodGif);
		

	 