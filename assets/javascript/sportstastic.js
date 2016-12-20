var teams = ['Philadelphia Phillies', 'Philadelphia Eagles' , 'Philadelphia 76ers', 'Philadelphia Flyers' , 'Philadelphia Union', 'Rutgers Football'];

	function showButtons(){ 

		$('#windowButtons').empty();

		for (var i = 0; i < teams.length; i++){

		    var bttn = $('<button>');
		    bttn.addClass('team');
		    bttn.attr('data-name', teams[i]);
		    bttn.text(teams[i]);
		    $('#windowButtons').append(bttn);
		    
		}
	}


	function attachGifs(){

		var team = $(this).data('name');
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + team + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
                url: queryURL,
                method: 'GET'
            })

        .done(function(response) {

  			var results = response.data;

            for (var i = 0; i < results.length; i++) {

				var teamDiv = $("#windowGifs").append('<div>');

				var ratingData = results[i].rating;
				var rating = $(teamDiv).append('<div>');
				rating.append('<h4><b>Rating: </b>' + ratingData + '</h4>');


				var teamData = results[i].team;

				var image = $('<br><img></br>')
				rating.append(image);

				image.addClass('teamImage').attr('src', results[i].images.fixed_height_still.url).attr('data-state', 'still').attr('data-animate', results[i].images.fixed_height.url).attr('data-still', results[i].images.fixed_height_still.url);
			}
		});
	}


	$('#addGif').on('click', function(){

		var teamInput = $('#gif-input').val().trim();
		teams.push(teamInput);

		showButtons();

		return false;

	})

	$(document).on('click', '.teamImage', function(){
    // console.log("OUCH!")

		var state = $(this).attr('data-state')

            if (state === 'animate') {
                $(this).attr('src', $(this).attr('data-still'));
                $(this).attr('data-state', 'still');
            }

            else if (state !== 'animate') {
                $(this).attr('src', $(this).attr('data-animate'));
                $(this).attr('data-state', 'animate');
            }
    });

	showButtons();

	$(document).on('click', '.team', attachGifs);
