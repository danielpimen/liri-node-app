/*PsuedoCode
------1)Need to finish OMDB function(allow multiple movie search)
-------Need to create a loop that trims space in between query words
------2)Fix DoIt function. Need to substitute text from random.txt into parameters
------3)Spotify function - figure out why to parse through objects and pull data

*/

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
        util.inspect(data, { depth: 2, colors: true });
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
        util.inspect(tweets, { depth: 2, colors: true });
        let tweetsList = tweets.statuses

        if (!error) {
            var data = [];
            for (var i = 0; i < tweetsList.length; i++) {
                data.push({
                    'Tweets: ': tweetsList[i].text,
                    'Made At': tweetsList[i].created_at
                });
            }
            console.log(data);
        }
    })

}


////////Get Movie Info
let getMovie = (movie) => {
    let search = process.argv[3];
    console.log(search);
    if (search === '') {
        search = 'Mr. Nobody';
    } else {
        console.log('Lets find your movie');
    }

    search = search.split(' ').join('+');

    var queryString = "https://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=40e9cece";

    request(queryString, function(error, response, body) {
        let data = JSON.parse(body);
        console.log('Title: ' + data.Title);
        console.log('Year Released: ' + data.Released );
        console.log('IMDB Rating: ' + data.imdbRating);
        console.log('Language: ' + data.Language);
        console.log('Country: ' + data.Country);
        console.log('Actors: ' + data.Actors);
        console.log('Plot: ' + data.Plot);
    });
}


//////Do it function
let doIt = () => {
    fs.readFile('./random.txt', 'utf8', function(error, data){
        if (error){
            console.log(error);
            return;
        }else{
            console.log(data);
            let split = data.split(', ');
            let command1 = split[0].trim();
            let parameter =split[1].trim();
            getSpotify()

        }
    } )
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

