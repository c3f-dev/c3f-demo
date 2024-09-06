

var offscreenCan;
var gl;
var Canvas;
var myWorker;
var current_URL;
var bar_width=0;
var progress = 0;
var abc={};
var serverWorker;
var flagBar=0;
var fixedBitSequence;
function convertToFixedBitSequence() {
  const inputText = document.getElementById('inputText').value;
  const utf8Encoded = new TextEncoder().encode(inputText); 
  const binaryString = Array.from(utf8Encoded).map(byte => byte.toString(2).padStart(8, '0')).join(''); 

  const n = binaryString.length;
  if (n > 512) {
      alert("Unicode beyond 512 bit！");
      return;
  }


  const lengthInfo = n.toString(2).padStart(9, '0');
  

  const paddingBits = '0'.repeat(512 - n - 9);
  

  fixedBitSequence = lengthInfo + binaryString + paddingBits;


  document.getElementById('result').textContent = fixedBitSequence;
  sendInit();
}


window.onload = mainWithThreads;

var getCanvas = function(canvasName) {
    var canvas = document.getElementById(canvasName);
    if(!canvas){
        $('#testCanvas').append("<canvas id='" + canvasName + "' width='256' height='256'></canvas>");
    }
    canvas = document.getElementById(canvasName);
    return canvas;
}

var getGL = function(canvas) {
  var gl = canvas.getContext(
         "webgl", {
          antialias : false,
        });
  return gl;
}


function changeBar()
{
  let elem=document.getElementById("results");
  bar_width+=25;
  elem.innerHTML=bar_width.toString()+"%";
}






function sendInit()
{

  myWorker=new Worker("static/js/workers/senderWorker.js");
  myWorker.addEventListener('message',handleMessage);
  Canvas=document.getElementById("Canvas");
  offscreenCan=Canvas.transferControlToOffscreen();
  myWorker.postMessage({ canvas: offscreenCan}, [offscreenCan]);


}

function handleSubMessage(msg)
{
  if(msg.data[0]=='timeOK')
  {
    flagBar=1;
  }
}









function mainWithThreads()
{
  

  

}



function handleMessage(msg)
{
  if(msg.data[0]=='WebglOK')
  {
    myWorker.postMessage(["512bit",fixedBitSequence]);
  }else if(msg.data[0]=='timeOK')
  {
    flagBar=1;
  }else if(msg.data[0]=='bar process')
  {
    let progressBar=document.getElementById("progress");
    progress += 20; 
    if(progress<100)
    {
      progressBar.style.width = `${progress}%`;
      progressBar.innerHTML=progressBar.style.width;
    }else{
  

      const intervalId = setInterval(() => {
        if (flagBar === 1) {
            console.log('flag_Bar OK');
            progressBar.style.width = `${100}%`;
            progressBar.innerHTML=progressBar.style.width;
            clearInterval(intervalId); 
        }
      }, 2000);
    
    }

  }
}