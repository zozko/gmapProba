//napkelte es napnyugta valtozoi:

if (navigator.geolocation) {
  var lngtd;
  navigator.geolocation.getCurrentPosition(adPosition);
} else {
  document.getElementsByClassName('longitudo')[0].innerHTML =
    'Geolocation is not supported by this browser.';
}

function adPosition(position) {
  longi = position.coords.longitude;
  lngtd = parseFloat(longi);
  return lngtd;
}

//itt szamitja ki hanyadik nap van az evben
var ma = new Date();
var elsonap = new Date(ma.getFullYear(), 0, 1);
var napSzama = Math.round((ma - elsonap) / 1000 / 60 / 60 / 24 + 0.5);
document.getElementsByClassName('napSzam')[0].innerHTML =
  'az év ' + napSzama + '. napja van ma.';

//var lngtd = ;
var zenith = 96;
var localOffset = 0;
var fromRad = 180 / 3.14159;
var toRad = 3.14159 / 180;
var lngHour = loti / 15;
var tRise = napSzama + (6 - lngHour) / 24;
var tSet = napSzama + (18 - lngHour) / 24;
var MRise = 0.9856 * tRise - 3.289;
var MSet = 0.9856 * tSet - 3.289;

console.log('naporaban a lati es a loti ' + lati + ' ' + loti);
console.log(
  'valtozoim tRise: ' +
    tRise +
    ' tSet: ' +
    tSet +
    ' MRise:' +
    MRise +
    ' MSet: ' +
    MSet +
    ' es lngHour: ' +
    lngHour
);
