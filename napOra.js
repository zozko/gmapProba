//itt szamitja ki hanyadik nap van az evben
var ma = new Date();
var elsonap = new Date(ma.getFullYear(), 0, 1);
var napSzama = Math.round((ma - elsonap) / 1000 / 60 / 60 / 24 + 0.5);
document.getElementsByClassName('napSzam')[0].innerHTML =
  'az év ' + napSzama + '. napja van ma.';

//napkelte es napnyugta valtozoi:
var lngtd;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(adPosition);
} else {
  x.innerHTML = 'Geolocation is not supported by this browser.';
}
function adPosition(position) {
  longi = position.coords.longitude;
  lngtd = { newLongi: this.longi };
  return lngtd;
}

//var lngtd = longitude.newLongi;
var zenith = 96;
var localOffset = 0;
var fromRad = 180 / 3.14159;
var toRad = 3.14159 / 180;
/*
var lngHour = longi / 15;
var tRise = napSzama + (6 - lngHour) / 24;
var tSet = napSzama + (18 - lngHour) / 24;
var MRise = 0.9856 * tRise - 3.289;
var MSet = 0.9856 * tSet - 3.289;
*/
for (a = 0; a < 100000; a++) {
  console.log(a);
}
console.log('a naporaban a longitudo: ' + lngtd);
