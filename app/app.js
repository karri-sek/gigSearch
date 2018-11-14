"use strict";

// =================================================================================
// App Configuration
// =================================================================================

const { App } = require("jovo-framework");

const config = {
  logging: true
};

const app = new App(config);

// =================================================================================
// App Logic
// =================================================================================

app.setHandler({
  LAUNCH: function() {
    let speech =
      "You can ask us about gigs in your location, or about gigs for a specific artist or band.";
    let reprompt =
      'For example, you could say "who is playing in London?" or "when is Bob Dylan playing?"';
    this.ask(speech, reprompt);
  },

  END: function() {
    app.tell(
      "Goodbye from your friends at Songkick, looking forward to speaking to you again soo!"
    );
  },

  ArtistIntent: function(artist) {
    console.log("artist intent for artist " + artist.value);
    this.setSessionAttribute("artist", artist);
    // look up sk artist id
    let artistsearch = {
      host: "api.songkick.com",
      path:
        "/api/3.0/search/artists.json?query=" +
        escape(artist) +
        "&apikey=" +
        sk_apikey,
      port: "80",
      method: "GET"
    };
    let req_search = http.request(artistsearch, artistsearch_callback);
    req_search.end();
  }
});

module.exports.app = app;
