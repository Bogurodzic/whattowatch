var settings = {
	"key": "c4d475955f6473a3c143f712208e6b17",
	"async": true,
	"crossDomain": true,
	"url": "http://api.themoviedb.org/3/movie/"+random+"?api_key=c4d475955f6473a3c143f712208e6b17&append_to_response=videos",
	"method": "GET",
	"headers": {},
	"data": "{}"
}


$(".color").on("click", function(){
	$(this).css("width", "500px");
	$.ajax({
		type: "GET",
		url: "http://api.themoviedb.org/3/movie/39099?api_key=c4d475955f6473a3c143f712208e6b17",
		success: function(data){

			$imgstring ="https://image.tmdb.org/t/p/w500/";
			$imgstring += data.poster_path;
			//$('.color').append("<img src="+$imgstring+">")
		}
	})
})



$("#random").click(function(){
	getRandomMovie();
});

//get random movie
function getRandomMovie(){

	var random = Math.floor((Math.random() * 1000) + 1) + 68;
	$settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "http://api.themoviedb.org/3/movie/"+random+"?api_key=c4d475955f6473a3c143f712208e6b17&append_to_response=videos",
	  "method": "GET",
	  "headers": {},
	  "data": "{}"
	 }

	$.ajax($settings)
	//if movie doesnt exist, start function once again
	.always(function (jqXHR){
		console.log(jqXHR.status);
		if(jqXHR.status === 404){
			getRandomMovie();
		}
	})
	.done(function (data){
		console.log(data.videos.results[0].key);
		$imgstring ="https://image.tmdb.org/t/p/w500/";
		$imgstring += data.poster_path;
		$(".color").append(data.title);
		$(".color").append("<img src="+$imgstring+">");
		$(".color").append("<iframe width='560' height='315' src='https://www.youtube.com/embed/"+data.videos.results[0].key+"' frameborder='0' allowfullscreen></iframe>")

	});


};

//Geting movie genres from TMDB
function getMovieGenres(){

	$settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=c4d475955f6473a3c143f712208e6b17",
	  "method": "GET",
	  "headers": {},
	  "data": "{}"
	}

	$.ajax($settings).done(function (data) {


		$.each(data.genres, function(index, value){

				var name = this.name;
				var id = this.id;
				$test = "<button>"+name+"</button>"
				$("<button>"+name+"</button>").appendTo($(".color")).click(function(){
					console.log(name);
					console.log(id);
				});
			
		});

	});

}


