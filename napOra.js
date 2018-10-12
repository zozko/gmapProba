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
var N = Math.round((ma - elsonap) / 1000 / 60 / 60 / 24 + 0.5);
document.getElementsByClassName('napSzam')[0].innerHTML =
  'az év ' + N + '. napja van ma.';

//var lngtd = ;
var zenith = 96;
var localOffset = 0;
var fromRad = 180 / 3.14159;
var toRad = 3.14159 / 180;
var lngHour = loti / 15;
var tRise = N + (6 - lngHour) / 24;
var tSet = N + (18 - lngHour) / 24;
var MRise = 0.9856 * tRise - 3.289;
var MSet = 0.9856 * tSet - 3.289;
var padFel;
var padLe;
console.log(loti + ' napora loti ellenorzes');
/*if (loti === undefined) {
  window.location.reload(true);
}
*/
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
    lngHour +
    ' latitude: ' +
    lati +
    ' longitude: ' +
    loti
);

// a nyari idoszamitas beallitasa
if (N > 90 && N < 300) localOffset -= 1;

// a Nap valos longitudojanak kiszamitasa (felkelo = lfel; lenyugvo = lLe)
var lFel =
  MRise +
  1.916 * Math.sin(toRad * MRise) +
  0.02 * Math.sin(2 * toRad * MRise) +
  282.634;
var lLe =
  MSet +
  1.916 * Math.sin(toRad * MSet) +
  0.02 * Math.sin(2 * toRad * MSet) +
  282.634;
console.log(lFel + ' es ' + lLe);

if (lFel > 360) lFel -= 360;
if (lFel < 0) lFel += 360;
if (lLe > 360) lLe -= 360;
if (lLe < 0) lLe += 360;

// a Nap valos ascendesenek kiszamitasa ( felkelo = felRa; lenyugvo = leRa)
var felRa = fromRad * Math.atan(0.91764 * Math.tan(toRad * lFel));
var leRa = fromRad * Math.atan(0.91764 * Math.tan(toRad * lLe));
if (felRa > 360) felRa -= 360;
if (felRa < 0) felRa += 360;
if (leRa > 360) leRa -= 360;
if (leRa < 0) felRa += 360;

// QUADRANSOK letrehozasa (felkelo = felLquadrant; lenyugvo = leLquadrant)
var felLquadrant = Math.floor(lFel / 90) * 90;
var leLquadrant = Math.floor(lLe / 90) * 90;
var felRAquadrant = Math.floor(felRa / 90) * 90;
var leRAquadrant = Math.floor(leRa / 90) * 90;
var felRa2 = (felRa + (felLquadrant - felRAquadrant)) / 15;
var leRa2 = (leRa + (leLquadrant - leRAquadrant)) / 15;

// quadransok atszamitasa orakka !!! FELULERTEKELNI HOGY SZUKSEGES-E!!!
/*
var felRa3 = felRa2;
var leRa3 = leRa2;
*/
// a Nap deklinacioja
var sinDecFel = 0.39782 * Math.sin(toRad * lFel);
var sinDecLe = 0.39782 * Math.sin(toRad * lLe);
var cosDecFel = Math.cos(Math.asin(sinDecFel));
var cosDecLe = Math.cos(Math.asin(sinDecLe));

// a Nap helyi idejenek szoge cosHfel es cosHle
var cosHfel =
  (Math.cos(zenith) - sinDecFel * Math.sin(lati)) /
  (cosDecFel * Math.cos(lati));
var cosHle =
  (Math.cos(zenith) - sinDecLe * Math.sin(lati)) / (cosDecLe * Math.cos(lati));

if (cosHfel > 1) console.log('itt ma nem kel fel a NAP!');
if (cosHle < -1) console.log('itt ma nem nyugszik le a Nap!');

// idoszamitas befejezese...
var felkeloH = 360 - (fromRad * Math.acos(cosHfel)) / 15;
console.log('feleko ora: ' + felkeloH);

//  a lenyugvo ido lenyugvoH
var lenyugvoH = (fromRad * Math.acos(cosHle)) / 15;
console.log('lenyugvas ideje: ' + lenyugvoH);

// helyi felkelo ido  felT
var felT = felkeloH + felRa2 - 0.06571 * tRise - 6.662;

// helyi lenyugvo ido leT
var leT = lenyugvoH + leRa2 - 0.06571 * tSet - 6.662;

// UTC
var utFel = felT - lngHour;
var utLe = leT - lngHour;
if (utFel > 24) utFel -= 24;
if (utFel < 0) utFel += 24;
if (utLe > 24) utLe -= 24;
if (utLe < 0) utLe += 24;

// local time felkelo localTfel
var localTfel = utFel - localOffset;
var hourFel = localTfel;
console.log(hourFel);

var minuteFel = (localTfel - hourFel) * 60;
if (minuteFel < 10) {
  padFel = '0';
} else {
  padFel = ' ';
}

console.log(hourFel + ' : ' + padFel + '' + minuteFel + ' a Nap felkel');

// local time lenyugvo localTle
var localTle = utLe - localOffset;
var hourLe = localTle;
var minuteLe = (localTle - hourLe) * 60;
if (minuteLe < 10) {
  padLe = '0';
} else {
  padLe = ' ';
}

console.log(hourLe + ' : ' + padLe + '' + minuteLe + ' a Nap lenyugszik');
