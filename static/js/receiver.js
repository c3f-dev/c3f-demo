//http://127.0.0.1:5500/deploy/receiver.html?id=LJH&browser=9ed987966c06808b50f9fddc24931bd1
//http://127.0.0.1:5500/deploy/sender.html?id=LJH&browser=9ed987966c06808b50f9fddc24931bd1
//Firefox:  ?id=LJH&browser=d6a5c9544eca9b5ce2266d1c34a93222
//Opera:  ?id=LJH&browser=9ed987966c06808b50f9fddc24931bd1

var offscreenCan;
var gl;
var Canvas;
var myWorker;
var sender_browser;
var receiver_browser;
var abc={};
var serverWorker;
window.onload = mainWithThreads;



function receiveInit()
{
  myWorker=new Worker("static/js/workers/probeWorker.js"); 
  myWorker.addEventListener('message',handleMessage);
  Canvas=document.getElementById("Canvas");
  offscreenCan=Canvas.transferControlToOffscreen();
  myWorker.postMessage({ canvas: offscreenCan}, [offscreenCan]);
  
}


function handleSubMessage()
{
  
}



function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}




function mainWithThreads()
{
  receiveInit();
} 

function handleMessage(msg)
{

    
 
}



