//Scripts responsible for Search Input




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
$(".outside").mouseleave(function(){
	if($(searchList).html() !== ""){
		$(searchList).stop(true).slideUp();
	}
});


function filmSearch(query){
	
	var link = "https://api.themoviedb.org/3/search/movie?api_key=c4d475955f6473a3c143f712208e6b17&query="+query;
	var settings = getSettings(link);

	$.ajax(settings).done(function(data){
		clear("#search-list", "html");		
		$.each(data.results, function(index, value){
			//create list element
			var title = $(createElement("li", value.original_title))

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

	var link = "http://api.themoviedb.org/3/movie/"+id+"?api_key=c4d475955f6473a3c143f712208e6b17";
	var settings = getSettings(link);

	 $.ajax(settings).done(function(data){
		var imgstring ="https://image.tmdb.org/t/p/w500/";
		imgstring += data.poster_path;
		$(document.body).append(data.title);
		$(document.body).append(createImage(imgstring));
		//$(document.body).append("<iframe width='560' height='315' src='https://www.youtube.com/embed/"+data.videos.results[0].key+"' frameborder='0' allowfullscreen></iframe>")

	});
}

function createElement(type, value){
	return "<"+type+">" + value +"</"+type+">"
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

