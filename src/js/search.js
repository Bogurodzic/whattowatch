//SCRIPTS RESPONSIBLE FOR SEARCH INPUT




var search = $("#search-text");
var searchIcon = $("#search-icon");
var searchList = $("#search-list");

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
	filmSearch($(search).val());
});

//Hide film list
$(".search").mouseleave(function(){
	if($(searchList).html() !== ""){
		$(searchList).slideUp(function(){
			clear("#search-list", "html");
		});
	}
});


function filmSearch(query){
	
	var link = "https://api.themoviedb.org/3/search/movie?api_key=c4d475955f6473a3c143f712208e6b17&query="+query;
	var settings = getSettings(link);

	$.ajax(settings).done(function(data){
		
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


function filmDescription(id){

	var link = "http://api.themoviedb.org/3/movie/"+id+"?api_key=c4d475955f6473a3c143f712208e6b17&append_to_response=videos";
	var settings = getSettings(link);

	 $.ajax(settings).done(function(data){
	 	var title = data.original_title;
	 	var overview = data.overview;
	 	var date = data.release_date;
	 	var rating = data.vote_average;
		var imgstring ="https://image.tmdb.org/t/p/w500/";
		var youtubeKey = data.videos.results[0].key;
		var genres = [];
		imgstring += data.poster_path;

		$.each(data.genres, function(index, element){
			console.log(element);
			genres.push(element.name);
		});

		console.log(data);
		console.log(data.genres);
		console.log(genres);
		console.log(data.videos.results[0].key);
		$(document.body).append(createElement("div", "", "film"));
		$(".film:last").append(createElement("div", "", "film-header"));
		$(".film-header:last").append(createImage(imgstring)).addClass("film-image");
		$(".film:last").append(createElement("div", "", "film-description"));
		$(".film:last .film-description").append(createElement("h2", title, "film-title"));
		$(".film:last .film-description").append(createElement("p", overview, "film-overview"));
		$(".film:last .film-description").append("<iframe class='youtube' width='560' height='315' src='https://www.youtube.com/embed/"+youtubeKey+"' frameborder='0' allowfullscreen></iframe>");
		$(createElement("div", "", "film-summary")).appendTo(".film:last .film-description");
		$(".film:last .film-description .film-summary").append(createElement("p", "Genres: "+genres, ""));
		$(".film:last .film-description .film-summary").append(createElement("p", "Rating: "+rating, "rating"));
		$(".film:last").append("<i class='close fa fa-times fa-2x' aria-hidden='true'></i>").on("click", function(){
			console.log("lllll");
			$(this).remove();
		});




	});
}



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

