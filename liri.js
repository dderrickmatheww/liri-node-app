
require("dotenv").config();

var Spotify = require('node-spotify-api');

var keys = require("./key");

var axios = require("axios")

var spotify = new Spotify(keys.spotify);

var moment = require('moment')

var userInput = process.argv[2];

var track = process.argv.slice(3).join(" ");

//********************************************************************************************************************************************************************* */
// Spotify API 
//********************************************************************************************************************************************************************* */

function spotifyThisSong(){

spotify.search({ type: "track", query: track, limit: 1 })
  
.then(function(response){

spotArr = response.tracks.items;

//  console.log(JSON.stringify(response));

for(i = 0; i < spotArr.length; i++){
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
  
}
})

.catch(function(err) {
  console.log(err);
});

}


//********************************************************************************************************************************************************************* */
// OMDB API 
//********************************************************************************************************************************************************************* */

function movieThis(){
axios.get('http://www.omdbapi.com/?apikey=4741e6f9&s='+ track + '&type=movie&r=json')
  .then(function (response) {
    // console.log(response.data.Search[0]);
    var imbdID = response.data.Search[0].imdbID
    console.log(imbdID)
    axios.get('http://www.omdbapi.com/?apikey=4741e6f9&i=' + imbdID + '&type=movie&r=json').then(function(data){

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
    console.log("Ratings \r\n" + "Rotten Tomatoes: " + movieData.Ratings[1].Value +"\r\n" + "Internet Movie Database: " + movieData.Ratings[0].Value)
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

