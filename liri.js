// REVISED WORKING CODE 

var fs = require("fs");
var request = require("request");
var twitter = require("twitter");
var spotify = require("node-spotify-api");
var keys = require("./keys.js");
var firstArg = process.argv[2];
var secondArg = "";

if (process.argv[3]) {
    for (var n = 3; n < process.argv.length; n++) {
        secondArg += " " + process.argv[n];
    }
};

fireLiri(firstArg, secondArg);

function fireLiri(firstArg, nextArg) {
    switch (firstArg) {
        case "my-tweets":
            runTwitter();
            break;
        case "spotify-this-song":
            runSpotify(nextArg);
            break;
        case "movie-this":
            runOMDB(nextArg);
            break;
        case "do-what-it-says":
            runDoIt();
            break;
        default:
            console.log("===============================================");
            console.log("Error, please follow one of these formats.");
            console.log("=============");
            console.log("node liri.js my-tweets");
            console.log("=============");
            console.log("node liri.js spotify-this-song '<song name here>'");
            console.log("=============");
            console.log("node liri.js movie-this '<movie name here>'");
            console.log("=============");
            console.log("node liri.js do-what-it-says");
            console.log("===============================================");
    };
}

function runTwitter() {
    var client = new twitter(keys.twitterKeys);
    var params = { screen_name: 'gout_squad' };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                var date = tweets[i].created_at;
                console.log("@gout_squad: " + tweets[i].text + " Created at: " + date);
            }
        } else {
            console.log(error);
        }
    });
}

function runSpotify(song) {
    var spotifyAPI = new spotify(keys.spotifyKeys);
    spotifyAPI.search({ type: 'track', query: song || "The Sign Ace of Base" }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Song: " + data.tracks.items[0].name);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log("Preview Here: " + data.tracks.items[0].preview_url);
        }
    });
}

function runOMDB(value) {
    if (value === "") {
        value = "Mr.Nobody";
    }
    
    var request = require("request");
    request("http://www.omdbapi.com/?t=" + value + "&apikey=40e9cece", function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("RT Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    });
}

function runDoIt() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        } else {
            console.log(data);
            var dataArr = data.split(",");
            console.log(dataArr);
            firstArg = dataArr[0];
            secondArg = dataArr[1];
            fireLiri(firstArg, secondArg);
        }
    });
}


// ORIGINAL WORKING CODE 

// var fs = require("fs");
// var request = require("request");
// var twitter = require("twitter");
// var spotify = require("node-spotify-api");
// var keys = require("./keys.js");
// var firstArg = process.argv[2];

// if (firstArg === "my-tweets") {
//     runTwitter();
// } else if (firstArg === "spotify-this-song") {
//     if (process.argv[3]) {
//         var value = "";
//         for (var n = 3; n < process.argv.length; n++) {
//             value += " " + process.argv[n];
//         }
//     };
//     runSpotify();
// } else if (firstArg === "movie-this") {
//     if (process.argv[3]) {
//         var value = "";
//         for (var n = 3; n < process.argv.length; n++) {
//             value += " " + process.argv[n];
//         }
//     };
//     runOMDB();
// } else if (firstArg === "do-what-it-says") {
//     runDoIt();
// } else {
//     console.log("Liri is not sure where you are asking for. Try again!");
// }

// function runTwitter() {
//     var client = new twitter(keys.twitterKeys);
//     var params = { screen_name: 'gout_squad' };
//     client.get('statuses/user_timeline', params, function(error, tweets, response) {
//         if (!error) {
//             for (var i = 0; i < tweets.length; i++) {
//                 var date = tweets[i].created_at;

//                 console.log("@gout_squad: " + tweets[i].text + " Created at: " + date);
//             }
//         } else {
//             console.log(error);
//         }
//     });
// }

// function runSpotify() {
//     var spotifyAPI = new spotify(keys.spotifyKeys);
//     spotifyAPI.search({ type: 'track', query: value || "The Sign Ace of Base" }, function(err, data) {
//         if (err) {
//             return console.log('Error occurred: ' + err);
//         } else {
//             console.log("Artist: " + data.tracks.items[0].artists[0].name);
//             console.log("Song: " + data.tracks.items[0].name);
//             console.log("Album: " + data.tracks.items[0].album.name);
//             console.log("Preview Here: " + data.tracks.items[0].preview_url);
//         }
//     });
// }

// function runOMDB() {
//     if (value === undefined) {
//         value = "Mr.Nobody";
//     }
//     var request = require("request");
//     request("http://www.omdbapi.com/?t=" + value + "&apikey=40e9cece", function(error, response, body) {
//         if (!error && response.statusCode === 200) {
//             console.log("Title: " + JSON.parse(body).Title);
//             console.log("Year: " + JSON.parse(body).Year);
//             console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
//             console.log("RT Rating: " + JSON.parse(body).Ratings[1].Value);
//             console.log("Country: " + JSON.parse(body).Country);
//             console.log("Language: " + JSON.parse(body).Language);
//             console.log("Plot: " + JSON.parse(body).Plot);
//             console.log("Actors: " + JSON.parse(body).Actors);
//         }
//     });
// }

// function runDoIt() {
//     fs.readFile("random.txt", "utf8", function(error, data) {
//         if (error) {
//             return console.log(error);
//         } else {
//             var spotifyAPI = new spotify(keys.spotifyKeys);
//             var dataArr = data.split(",");
//             spotifyAPI.search({ type: 'track', query: dataArr[1] }, function(err, data) {
//                 console.log("Artist: " + data.tracks.items[0].artists[0].name);
//                 console.log("Song: " + data.tracks.items[0].name);
//                 console.log("Album: " + data.tracks.items[0].album.name);
//                 console.log("Preview Here: " + data.tracks.items[0].preview_url)
//             });
//         }
//     });
// }