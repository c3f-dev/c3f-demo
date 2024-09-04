const ZEROS = "00000000";
const PROBEINTERVALSIG = "01010101";
const SENDPROBEINTERVALSIG = "01010101";
const RANDOMSIG = "01010111";

const RANDOMBITS128 = "00000100111101100011010100111001011000011011100011000011000010010101011001110110000111111000111001001110011000101101101010011101";

const RANDOMPREFIX = "111111000001111100000111100000111000001100010000000000000000000000" + RANDOMSIG;

const RANDOMBITS1024 = "0101100101101010001110101010111010101001000001101111010111011101110001100101101010101100011010100011110101010001001010100000010000110011101101010110010101101111101011001001000111111010110101111110001110100110111111110110111110101001001000110100100110001100101100101001101000011000111111010100110100101010100100111111101010010011001110001011011001101101011110110100011000111111000100010010001001111001000100001100110100010010100100110000000110110101101110111010010101111000000100111100001100001001101111100111010011111111011111000010100001010101000000010101010011010100010100011101101100001011001101010111001001011100001001110111110010010000001001000100000111011001001010000000101010001110111011110111001001110111111001110001101010010000001001010011100111101101000101100100110101000001001111101100110001111110110000010110010010001011010000100101010110011010100110110001000001011111000010111110100001000111001010111111000111110000110010010101110101110000010011000011000000000100100101100100011101101011010010101101110010101111";

const BROWSER_MAC = ['chrome', 'opera', 'firefox', 'brave', 'edge', 'safari'];
const BROWSER = ['chrome', 'opera', 'firefox', 'brave', 'edge'];
const BROWSER_LINK = {'chrome':"https://www.google.com/chrome/downloads/", 'opera':"https://www.opera.com/", 'firefox':"https://www.mozilla.org/en-US/firefox/new/", 'brave':"https://brave.com/", 'safari':"https://www.apple.com/safari/", 'edge':"https://www.microsoft.com/en-us/edge"}

function fnBrowserDetect() {
  let userAgent = navigator.userAgent;
  let browserName;

  if(userAgent.match(/edg/i)){
    browserName = "edge";
  }else if(userAgent.match(/opr/i)){
    browserName = "opera";
  }else if(userAgent.match(/chrome|chromium|crios/i)){
    browserName = "chrome";
  }else if(userAgent.match(/firefox|fxios/i)){
    browserName = "firefox";
  }else if(userAgent.match(/safari/i)){
    browserName = "safari";
  }else{
    browserName="No browser detection";
  }
  if (navigator.brave) browserName = "brave";
  return browserName;
}

function fnOSDetect(){
  let OSName;

  OSName = navigator.platform;
  return OSName;
}

// ===========old version
// function fnOSDetect(){
//   var userAgent = navigator.userAgent.toLowerCase();
//   var name = 'Unknown';
//   var version = 'Unknown';
//   if (userAgent.indexOf('win') > -1) {
//     name = 'Windows';
//   if (userAgent.indexOf('windows nt 5.0') > -1) {
//       version = 'Windows 2000';
//   } else if (userAgent.indexOf('windows nt 5.1') > -1 || userAgent.indexOf('windows nt 5.2') > -1) {
//       version = 'Windows XP';
//   } else if (userAgent.indexOf('windows nt 6.0') > -1) {
//       version = 'Windows Vista';
//   } else if (userAgent.indexOf('windows nt 6.1') > -1 || userAgent.indexOf('windows 7') > -1) {
//       version = 'Windows 7';
//   } else if (userAgent.indexOf('windows nt 6.2') > -1 || userAgent.indexOf('windows 8') > -1) {
//       version = 'Windows 8';
//   } else if (userAgent.indexOf('windows nt 6.3') > -1) {
//       version = 'Windows 8.1';
//   } else if (userAgent.indexOf('windows nt 6.2') > -1 || userAgent.indexOf('windows nt 10.0') > -1) {
//       version = 'Windows 10';
//   } else {
//       version = 'Unknown';
//   }
//   } else if (userAgent.indexOf('iphone') > -1) {
//     name = 'iPhone';
//   } else if (userAgent.indexOf('mac') > -1) {
//     name = 'Mac';
//   } else if (userAgent.indexOf('x11') > -1 || userAgent.indexOf('unix') > -1 || userAgent.indexOf('sunname') > -1 || userAgent.indexOf('bsd') > -1) {
//     name = 'Unix';
//   } else if (userAgent.indexOf('linux') > -1) {
//     if (userAgent.indexOf('android') > -1) {
//       name = 'Android';
//   } else {
//       name = 'Linux';
//   }
//   } else {
//     name = 'Unknown';
//   }
//   // return { name, version };
//   return name;
// }

function getDateAccuracy() {
  var startTime = Date.now();
  while(Date.now() == startTime);
  return Date.now() - startTime;
}

const validMaxRatio = 0.8;
const validMinRatio = 0.4;

const BROWSERTYPE = fnBrowserDetect();
const DATEACCURACY = getDateAccuracy();
