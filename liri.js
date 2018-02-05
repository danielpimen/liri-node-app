require("dotenv").config();

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');
var keys = require('./keys');

var spotifyClient = new Spotify(keys.spotify);
var client = new Twitter(keys.twitterKeys);

var command = process.argv[2];
var argList = process.argv;
var input = '';


var writeToLog = function(data) {
  fs.appendFile("random.txt", '\r\n\r\n');

  fs.appendFile("random.txt", JSON.stringify(data), function(err) {
    if (err) {
      return console.log(err);
    }

    console.log("log.txt was updated!");
  });
}




///////Get Song through Spotify
let getSpotify = () => {
	console.log(client);
}


////////Get Tweets
let getTwitter = () => {
	var params = {screen_name: 'node.js', count: 10};
	client.get('statuses/user_timeline', params, function(error, tweets, response){

		if (!error){
			var data = [];
			for (var i = 0; i < tweets.length; i++) {
				data.push({
					'tweet date: ' : tweets[i].created_at,
					'Your Tweets: ' : tweets[i].text,


				});
			}
			console.log('Hello');
			writeToLog();
		}
	})

}

////////Get Movie Info
let getMovie = () => {
	console.log('Lets find this movie');
}


//////Do it function
let doIt = () => {
	console.log('You Lazy bitch');
}

///Switch for user input
switch(command){
	case 'my-tweets':
		getTwitter();
		break;

	case 'spotify-this-song':
		getSpotify();
		break;

	case 'movie-this' :
		getMovie();
		break;

	case 'do-what-it-says' :
		doIt();
		break;

}








