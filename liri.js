require("dotenv").config();

var util = require('util');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');
var keys = require('./keys');

var spotifyClient = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

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
    let songSearch = process.argv[3];
    spotifyClient.search({ type: 'track', query: songSearch }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        let spotifyData = data;
        var dataList = [];
        for (var i = 0; i < spotifyData.length; i++) {
            dataList.push({
                'Songs: ': spotifyData[i]
            });
        }

        console.log(data);
    });
}


////////Get Tweets
let getTwitter = () => {
    client.get('search/tweets', { q: 'danielpimen92' }, function(error, tweets, response) {
    	util.inspect(tweets, {depth: 2, colors: true});
    	let tweetsList = tweets.statuses

        if (!error) {
            var data = [];
            for (var i = 0; i < tweetsList.length; i++) {
                data.push({
                    'Tweets: ': tweetsList[i].text,
                    'Made At' : tweetsList[i].created_at
                });
            }
            console.log(data);
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
switch (command) {
    case 'my-tweets':
        getTwitter();
        break;

    case 'spotify-this-song':
        getSpotify();
        break;

    case 'movie-this':
        getMovie();
        break;

    case 'do-what-it-says':
        doIt();
        break;

}