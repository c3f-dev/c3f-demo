
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



