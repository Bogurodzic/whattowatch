$("#random").click(function(){
	getRandomMovie();
});

//get random movie
function getRandomMovie(){
	var filmId;
	var random = getRandomNumber();
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
		if(checkStatus(jqXHR.status)){
			getRandomMovie();
		}
	})
	.done(function(){
		filmDescription(random);
	});


};

function checkStatus(status){
	if(status === 404){
		return true;
	}
}

function getRandomNumber(){
	return Math.floor((Math.random() * 1000) + 1) + 68;
}
