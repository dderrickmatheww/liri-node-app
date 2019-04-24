require("dotenv").config();

var keys = require(".key");

var spotify = new Spotify(keys.spotify);

var track = process.argv.slice(2).join(" ");

var band = process.argv.slice(3).join(" ");

spotify.search({ type: track, query: band, limit: 10 }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
  console.log(JSON.stringify(data, null, 2));
})