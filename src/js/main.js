$("#random").click(function(){
	getRandomMovie();
});

//get random movie
function getRandomMovie(){
	var filmId;
	var random = Math.floor((Math.random() * 1000) + 1) + 68;
	var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "http://api.themoviedb.org/3/movie/"+random+"?api_key=c4d475955f6473a3c143f712208e6b17&append_to_response=videos",
	  "method": "GET",
	  "headers": {},
	  "data": "{}"
	 }

	$.ajax(settings)
	//if movie doesnt exist, start function once again
	.always(function (jqXHR){
		filmId = random;
		console.log(jqXHR.status);
		if(jqXHR.status === 404){
			getRandomMovie();
		}
	})
	.done(function(){
		filmDescription(random);
	});


};
