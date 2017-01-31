//SCRIPTS RESPONSIBLE FOR SEARCH INPUT


$(window).on('load', function() {
    $("#loader-wrapper").fadeOut(1000);
});



var search = $("#search-text");
var searchIcon = $("#search-icon");
var searchList = $("#search-list");

//Prevents autocomplete inputs
$("form :input").attr("autocomplete", "off");

//Clear search bar on every click
$(search).on("focus", function(){
	clear(this, "val");
	$(this).css("width", "500px");
});

//Shorten search bar
$(search).on("focusout", function(){
	if($(search).val() === ""){
		$(this).css("width", "100px");
	}
});

$(searchIcon).on("click", function(){
	if($(search).val() !== ""){
		//if search input isn't empty, looks for provided value
		clear("#search-list", "html");
		filmSearch($(search).val());		
	} else {
		alert("Please provide which film are you looking for.");
	}

});

$(".search").keydown(function(event){
        if(event.keyCode === 13) {
			clear("#search-list", "html");
			filmSearch($(search).val());
    		return false;
        } else if (event.keyCode === 8) {
			$(searchList).slideUp(function(){
				clear("#search-list", "html");
			});
        }
    });

//Hide film list
$(".search").mouseleave(function(){
	if($(searchList).html() !== ""){
		$(searchList).slideUp(function(){
			clear("#search-list", "html");
		});
	}
});


//create a list with films according to provided string
function filmSearch(query){
	
	var link = "https://api.themoviedb.org/3/search/movie?api_key=c4d475955f6473a3c143f712208e6b17&query="+query;
	var settings = getSettings(link);

	$.ajax(settings).done(function(data){
		
		if(data.total_results === 0){
			$(createElement("li", "No data found.")).appendTo($("#search-list"));
		}

		$.each(data.results, function(index, value){
			//create list element
			var title = $(createElement("li", value.title))

			$(title).on("click", function(){
				filmDescription(value.id);
				$("#search-list").stop(true).slideUp();
			});
			$(title).appendTo($("#search-list"));

		})
		$("#search-list").stop(true).slideDown();
	});

}

//Create new film entry and fill it with api's information
function filmDescription(id){

	var link = "http://api.themoviedb.org/3/movie/"+id+"?api_key=c4d475955f6473a3c143f712208e6b17&append_to_response=videos";
	var settings = getSettings(link);

	 $.ajax(settings).done(function(data){
	 	var title = data.title;
	 	var orgTitle = data.original_title;
	 	var overview =  shorterText(data.overview);
	 	var date = data.release_date;
	 	var rating = data.vote_average;
		var imgstring ="https://image.tmdb.org/t/p/w500/";

		//var youtubeKey = data.videos.results[0].key;

		var genres = [];
		imgstring += data.poster_path;

		$.each(data.genres, function(index, element){
			genres.push(element.name);
		});

		console.log(data);
		//$(document.body).append(createElement("div", "", "film"));
		$(createElement("div", "", "film")).appendTo($(document.body)).css("display", "none");
		$(".film:last").append(createElement("div", "", "film-header"));
		$(".film-header:last").append(createImage(imgstring)).addClass("film-image");
		$(".film:last").append(createElement("div", "", "film-description"));
		$(".film:last .film-description").append(createElement("h2", title, "film-title"));
		$(".film:last .film-description .film-title").append(createElement("span", "  org title: '"+orgTitle+"'", "film-title-org"));
		$(".film:last .film-description").append(createElement("p", overview, "film-overview"));
		$(".film:last .film-description").append(isTrailer(data));
		$(createElement("div", "", "film-summary")).appendTo(".film:last .film-description");
		$(".film:last .film-description .film-summary").append(createElement("p", "<span class='bold'>Genres:</span> "+genres, ""));
		$(".film:last .film-description .film-summary").append(createElement("p", "<span class='bold'>Realse:</span> "+date, ""));
		$(".film:last .film-description .film-summary").append(createElement("p", "<span class='bold'>Rating:</span> "+rating, "rating"));
		$(".film:last").append("<i class='close fa fa-times fa-2x' aria-hidden='true'></i>");
		$(".film:last").fadeIn();

	});
}

//Delegate function on every new film object
$(document).on("click", ".film .close", function(){
	$(this).parent().fadeOut(function(){
		$(this).remove();
	});
});

function createElement(type, value, eleClass){
	if (eleClass) {
		return "<"+type+" class=" +eleClass+ ">" + value +"</"+type+">"
	} else {
		return "<"+type+">" + value +"</"+type+">"
	}
}

function createImage(link){
	return ("<img src="+link+">");
}

//Check if film has key data and create youtube trailer, if not, create image
function isTrailer(data){

	var youtubeKey = (function lookForKeyError(){
		var key;
		try {
			key = data.videos.results[0].key;
		}
		catch(err) {
			key =false;
		}
		return key;
	})();

	if (youtubeKey !== false) {
		return $("<iframe src='https://www.youtube.com/embed/"+youtubeKey+"' frameborder='0' allowfullscreen></iframe>").addClass("youtube");
	} else {
		return $(createImage("http://www.k-state.edu/mog/images/No-Trailer.jpg")).addClass("youtube");
	}
}

//ajax settings
function getSettings(url){
	return {
		"async": true,
	  	"crossDomain": true,
	 	"url": url,
	 	"method": "GET",
	 	"headers": {},
	  	"data": "{}"		
	}
}

function clear(element, value){
	if (value === "val") {
		$(element).val("");		
	} else if (value === "html") {
		$(element).html("");
	}
}

//If text is too long, makes it shorter
function shorterText(data){
	var text = data;
		if(text.length > 320){
			text = text.slice(0,320);
		}
		return text;
	}


