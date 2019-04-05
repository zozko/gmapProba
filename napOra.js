setTimeout(() => {
  console.log('a beolvasott koordinatak: ' + lati + ' & ' + loti);

  var ma = new Date();
  var elsonap = new Date(ma.getFullYear(), 0, 1);
  var N = Math.round((ma - elsonap) / 1000 / 60 / 60 / 24 + 0.5);
  console.log('ma az év ' + N + '. napja van!');
  var d = new Date();
  var localOffset = d.getTimezoneOffset();
  console.log(localOffset + ' perc az UTC-hez kepest');
  localOffset = localOffset / 60;
  console.log('UTC hez kepest a helyi ido oraban: ' + localOffset);

  function computeSunrise(day, sunrise) {
    /*Sunrise/Sunset Algorithm taken from
  http://williams.best.vwh.net/sunrise_sunset_algorithm.htm
  inputs:
  day = day of the year
  sunrise = true for sunrise, false for sunset
  output:
      time of sunrise/sunset in hours */

    //lat, lon for Sturovo Slovakia
    var latitude = lati;
    var longitude = loti;
    var zenith = 90.83333333333333;
    var D2R = Math.PI / 180;
    var R2D = 180 / Math.PI;

    // convert the longitude to hour value and calculate an approximate time
    var lnHour = longitude / 15;
    var t;
    if (sunrise) {
      t = day + (6 - lnHour) / 24;
    } else {
      t = day + (18 - lnHour) / 24;
    }

    //calculate the Sun's mean anomaly
    M = 0.9856 * t - 3.289;

    //calculate the Sun's true longitude
    L = M + 1.916 * Math.sin(M * D2R) + 0.02 * Math.sin(2 * M * D2R) + 282.634;
    if (L > 360) {
      L = L - 360;
    } else if (L < 0) {
      L = L + 360;
    }

    //calculate the Sun's right ascension
    RA = R2D * Math.atan(0.91764 * Math.tan(L * D2R));
    if (RA > 360) {
      RA = RA - 360;
    } else if (RA < 0) {
      RA = RA + 360;
    }

    //right ascension value needs to be in the same qua
    Lquadrant = Math.floor(L / 90) * 90;
    RAquadrant = Math.floor(RA / 90) * 90;
    RA = RA + (Lquadrant - RAquadrant);

    //right ascension value needs to be converted into hours
    RA = RA / 15;

    //calculate the Sun's declination
    sinDec = 0.39782 * Math.sin(L * D2R);
    cosDec = Math.cos(Math.asin(sinDec));

    //calculate the Sun's local hour angle
    cosH =
      (Math.cos(zenith * D2R) - sinDec * Math.sin(latitude * D2R)) /
      (cosDec * Math.cos(latitude * D2R));
    var H;
    if (sunrise) {
      H = 360 - R2D * Math.acos(cosH);
    } else {
      H = R2D * Math.acos(cosH);
    }
    H = H / 15;

    //calculate local mean time of rising/setting
    T = H + RA - 0.06571 * t - 6.622;

    //adjust back to UTC
    UT = T - lnHour; // lnHour = localoffset?
    if (UT > 24) {
      UT = UT - 24;
    } else if (UT < 0) {
      UT = UT + 24;
    }

    //convert UT value to local time zone of latitude/longitude
    localT = UT - localOffset; // localOffsetnek a timezonet kell beallitania!

    //convert to Milliseconds
    return localT * 3600 * 1000;
  }

  console.log(N);
  var sunrise = computeSunrise(N, true);
  var sunset = computeSunrise(N, false);
  var napAzEgen = sunset - sunrise;
  console.log('Nap az Egen milisecben: ' + napAzEgen);

  function convertMS(ms) {
    var d, h, m, s;
    s = Math.floor(ms / 1000);
    m = Math.floor(s / 60);
    s = s % 60;
    h = Math.floor(m / 60);
    m = m % 60;
    d = Math.floor(h / 24);
    h = h % 24;
    if (h > 30) {
      m += 1;
    }
    return h + ':' + m;
    return { d: d, h: h, m: m, s: s };
  }

  var napF = convertMS(sunrise);
  var napL = convertMS(sunset);
  console.log('a napkelete: ' + napF + ' a napnyugta: ' + napL);

  napF = parseFloat(napF);
  napL = parseFloat(napL);

  var sunOnSky = convertMS(napAzEgen);
  console.log('a Nap az egen ma ' + sunOnSky + ' orat van fen!');
}, 4000);
