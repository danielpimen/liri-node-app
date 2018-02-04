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

switch(command){
	case 'my-tweets':
		getTwitter();
		break;

	case 'spotify-this-song':
		spotifySong();
		break;

	case 'movie-this' :
		getMovie();
		break;

	case 'do-what-it-says' :
		doIt();
		break;

}



//Get Tweets
var getTwitter = () => {
	var paramaters = {screen_name: 'danielpimen92', count: 10};
	client.get('statuses/user_timeline', paramaters, function(error, tweets, response){

		if (!error){
			var data = [];
			for (var i = 0; i < tweets.length; i++) {
				console.log(tweets[i]);
			}
		}
	})

}