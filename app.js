
// https://www.youtube.com/watch?v=FjY4DKLSYjk

$(document).ready(function(){
	var allowAjaxHide = false;
	var hideFunction = function(event){
		if (!allowAjaxHide) {
			event.preventDefault();
		}
		allowAjaxHide = false;
	};
	$("#ajaxIndicator").on("hide.bs.modal", hideFunction);

	// perform twitter search when public form is submitted
	$("#getposts_forms").submit(function(event){
		event.preventDefault();
		$("output").empty();
		$("errors").empty();

		var search = $("#search").val();
		var language = $("lang").val();
		var resultType = $("#type").value();
		console.log(search);
		console.log(language);
		console.log(resultType)

		// validate all form input as needed
		var errorMessages = "";
		var emptyStringPattern = /^\$/;

		if(emptyStringPattern.test(search)) {
			errorMessages += "You must enter a search term";
		} 
		if(errorMessages.length > 0) {
			$("#errors").text(errorMessages);
			return;
		}

		//consumer key and authorization 

		var consumerAPIKey = VtCD0uYTi7yDOp8ZApKzrfs2I;
		var consumerAPISecret = IulvuKyqOEp9nUxg1sXvwzTkDNhi69mvOYvgv4bNmXx50k2ZeD;
		var accessToken = 1737988216547115008-987lh04lu60gWzZLeIxGsKT2bSpTgG;
		var accessTokenSecret = PK0AhMaoi55gh1Zv4pLqv0yNBKigMdNKEd4s4PhCInkq6;
		var userID = 28211625;

		// ajax request

		$.ajax({
			url: "https://api.twitter.com/1.1/search/tweets.json?" + "&q=nasa&result_type=popular",
			data: {
				q: search,
				lang: language,
				result_type: resultType,
			},
			success: function(serverResponse) {
				try {
				console.log(serverResponse);
				// from twitter
				var statuses = serverResponse.statuses;
				for(var i = 0; i < statuses.length; i++) {
					var tweet = statuses[i];
					// from twitter
					var template = $($("#tweet").prop("content")).children().clone();

					template.find(".body").text(tweet.text);
					template.find(".user").text("@" + tweet.user.screen_name);
					template.find(".retweets").text(tweet.retweet_count);

					$("#output").append(template);
				}
				} catch(ex) {
					console.error(ex); 
					$("#errors").text("An error has occurred");
				}
			},

			error: function(jqXHR, textStatus, errorThrown) {
				if(errorThrown == "Service unavailable") {
					$("#errors").text("Your script isn't running");					
				}
				else {
					$("#errors").text("An unknown error occurred:" + errorThrown)
				}
			},

			complete: function() {
				// set GIF to be visible
				allowAjaxHide = true;
				$("#ajaxIndicator").modal("hide");
			} 
		});
		$("#ajaxIndicator").modal("show");
	});	
});
