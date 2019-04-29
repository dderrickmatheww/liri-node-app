
require("dotenv").config();

var keys = require("./key");

var Spotify = require('node-spotify-api');

var axios = require("axios")

var moment = require('moment')

var fs = require('file-system')

var spotify = new Spotify(keys.spotify);

var userInput = process.argv[2];

var track = process.argv.slice(3).join(" ");


//********************************************************************************************************************************************************************** */
//Switch statement to set the logic for the commands
//********************************************************************************************************************************************************************** */

  switch (userInput) {
    case "concert-this":
      concertThis(track)
      break;
    case "spotify-this-song":
      spotifyThisSong(track)
      break;
    case "movie-this":
      movieThis(track)
      break;
    case "do-this":
      doWhat(track)
      break;
    default:
      console.log("I don't understand, please use the commands! (concert-this, spotify-this-song, movie-this, or do-this)")
      break;
  }


//********************************************************************************************************************************************************************* */
// Spotify API -- spotify-this-song
//********************************************************************************************************************************************************************* */

function spotifyThisSong(track) {
  if(!track) {
    var track = "Gods plan"
  }
  spotify.search({ type: "track", query: track, limit: 1 })

    .then(function (response) {

      spotArr = response.tracks.items;

      


      for (i = 0; i < spotArr.length; i++) {
        releaseDate = moment(spotArr[i].release_date).format("MM/DD/YYYY hh:00 A");
        console.log("\r\n")
        console.log("Album: " + response.tracks.items[i].name)
        console.log("========================================")
        console.log("\r\n")
        console.log("Release date: " + releaseDate)
        console.log("========================================")
        console.log("\r\n")
        console.log("Artist name: " + response.tracks.items[i].album.artists[0].name)
        console.log("========================================")
        console.log("\r\n")
        console.log("Spotify link: " + response.tracks.items[i].external_urls.spotify)
        console.log("========================================")
        console.log("\r\n")
      }
    })

    .catch(function (err) {
      console.log(err);
    });

}


//********************************************************************************************************************************************************************* */
// OMDB API -- movie-this
//********************************************************************************************************************************************************************* */

function movieThis(track) {
  if(!track) {
    var track = "Mr: Nobody"
  }
  axios.get('http://www.omdbapi.com/?apikey=4741e6f9&s=' + track + '&type=movie&r=json')
    .then(function (response) {
      
      // console.log(response.data.Search[0]);
      var imbdID = response.data.Search[0].imdbID
     
      axios.get('http://www.omdbapi.com/?apikey=4741e6f9&i=' + imbdID + '&type=movie&r=json').then(function (data) {

        var movieData = data.data

        // console.log(movieData)
        console.log("\r\n")
        console.log("Title: " + movieData.Title)
        console.log("\r\n")
        console.log("Released: " + movieData.Released)
        console.log("\r\n")
        console.log("Rated: " + movieData.Rated)
        console.log("\r\n")
        console.log("Main Actors: " + movieData.Actors)
        console.log("\r\n")
        console.log("Plot of Movie: " + movieData.Plot)
        console.log("\r\n")
        console.log("Ratings \r\n" + "Rotten Tomatoes: " + movieData.Ratings[1].Value + "\r\n" + "Internet Movie Database: " + movieData.Ratings[0].Value)
        console.log("\r\n")
        console.log("Box Office: " + movieData.BoxOffice)


      })
        .catch(function (error) {
          console.log(error);
        });
    })
    .catch(function (error) {
      console.log(error);
    });
}

//********************************************************************************************************************************************************************* */
// BandsInTown API -- concert-this
//********************************************************************************************************************************************************************* */


function concertThis(track) {
  if(!track) {
    var track = "Drake"
  }
  axios.get('https://rest.bandsintown.com/artists/' + track + '/events?app_id=codingbootcamp')
    .then(function (response) {

      //console.log(response.data);
      var concertData = response.data

      for (i = 0; i < concertData.length; i++) {
        console.log("Concert info. for " + track)
        console.log("\r\n")
        console.log("Venue: " + concertData[i].venue.name)
        console.log("\r\n")
        console.log("Location: " + concertData[i].venue.city + ", " + concertData[i].venue.country)
        console.log("\r\n")
        console.log("Date: " + moment(concertData[i].datetime).format("MM/DD/YYYY hh:00 A"))
        console.log("\r\n")
        console.log("============================================================================")


      }



    })
    .catch(function (error) {
      console.log(error);
    });
}


//******************************************************************************************************************************************************************** */
// fs API do-what-it-says
//******************************************************************************************************************************************************************** */
function doWhat() {
  fs.readFile("random.txt", "utf8", function (error, data) {

    if (error) {
      console.log("Error: " + error)
    }


    let dataArr = data.split(",");

    var userInput = dataArr[0];
    

    var track = dataArr[1];
    

    switch (userInput) {
      case "concert-this":
        concertThis(track)
        break;
      case "spotify-this-song":
        spotifyThisSong(track)
        break;
      case "movie-this":
        movieThis(track)
        break;
      case "do-this":
        doWhat(track)
        break;
      default:
        console.log("I don't understand, please use the commands! (concert-this, spotify-this-song, movie-this, or do-this)")
        break;
    }
  })
 
}







