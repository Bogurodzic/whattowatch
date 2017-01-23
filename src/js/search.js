//Scripts responsible for Search Input
var search = $("#search-text");
var searchIcon = $("#search-icon");

$(search).on("focus", function(){
	$(this).css("width", "500px");
});


$(search).on("focusout", function(){
	if($(search).val() === ""){
		$(this).css("width", "100px");
	}
});

$(searchIcon).on("click", function(){
	filmSearch($(search).val());
});

function filmSearch(query){
	
	var settings = {
		"key": "c4d475955f6473a3c143f712208e6b17",
		"async": true,
		"crossDomain": true,
		"url": "https://api.themoviedb.org/3/search/movie?api_key=c4d475955f6473a3c143f712208e6b17&query="+query,
		"method": "GET",
		"headers": {},
		"data": "{}"
	}

	$.ajax(settings).done(function(data){
		$.each(data.results, function(index, value){
			$("#search-list").append("<li>"+value.original_title+"</li>");
		})
	});

}