
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

// Easy way to update HTML
el = {
  _app: $(".app"),
  title: $(".title"),
  artist: $(".artist"),
  album: $(".album")
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
  console.log("test")
  toggleClass(this, "full");
};

// Called by BowTie when the track is changed
function trackChanged( track ) {

  var trackTitle  = track.title  || "";
  var trackArtist = track.artist || "";
  var trackAlbum  = track.album  || "";

  el.title(trackTitle);
  el.artist(trackArtist);
  el.album(trackAlbum);

}
