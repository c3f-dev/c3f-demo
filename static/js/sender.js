//http://127.0.0.1:5500/deploy/sender.html?id=LJH&browser=d6a5c9544eca9b5ce2266d1c34a93222
//稳定版本 send和receive具有应答能力

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
  

  sendInit();

}



function handleMessage(msg)
{
  if(msg.data[0]=='timeOK')
  {
    flagBar=1;
  }else(msg.data[0]=='bar process')
  {
    let progressBar=document.getElementById("progress");
    progress += 20; // 假设每次增加 20%
    if(progress<100)
    {
      progressBar.style.width = `${progress}%`;
      progressBar.innerHTML=progressBar.style.width;
    }else{
  
      // 每2秒检查一次flag变量的值
      const intervalId = setInterval(() => {
        if (flagBar === 1) {
            console.log('flag_Bar OK');
            progressBar.style.width = `${100}%`;
            progressBar.innerHTML=progressBar.style.width;
            clearInterval(intervalId); // 停止检查
        }
      }, 2000);
    
    }

  }
}