
// Hold shared data
data = {};

// Simple DOM query
$ = function( query ) {
  return document.querySelector(query);
};

// Toggle a HTML class
toggleClass = function( el, cName ) {
  var index = el.className.indexOf(cName);
  if (index  > -1) {
    var before = el.className.slice(0, index - 1);
    var after = el.className.slice(index + cName.length);
    el.className = before + after;
  } else {
    el.className += " " + cName;
  }
};

// Pretty print seconds
prettyTime = function( seconds ) {
  seconds = Math.round(seconds);
  var minutes = Math.floor(seconds / 60);
  var diff = seconds - (minutes * 60);
  var time = minutes + ":" + diff;
  return time;
}

// Easy way to update HTML
el = {
  _app: $(".app"),
  title: $(".title"),
  artist: $(".artist"),
  album: $(".album"),
  time: $(".time")
};
makeFunction = function( el ) {
  return function( text ) {
    el.innerHTML = text;
  };
}
for (var key in el) {
  if (key.slice(0,1) == "_") continue;
  el["_"+key] = el[key];
  el[key] = makeFunction(el[key]);
}

// Toggle between full and minimal (fired on double click)
el._app.ondblclick = function( e ) {
  toggleClass(this, "full");
};

// Called by BowTie when the track is changed
function trackUpdate( track ) {

  var trackTitle  = track.title  || "";
  var trackArtist = track.artist || "";
  var trackAlbum  = track.album  || "";

  data.trackLength = track.length || 0;

  el.title(trackTitle);
  el.artist(trackArtist);
  el.album(trackAlbum);

}

// Called by BowTie every second
function statusUpdate() {
  var current = Player.playerPosition();
  el.time(prettyTime(current) + " / " + prettyTime(data.trackLength));
}
