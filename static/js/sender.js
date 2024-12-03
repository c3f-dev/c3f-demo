

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
var interval=0;


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

function isWebRTCSupported() {
	return !!(window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection);
  }
  
function isTorBrowser() {
	let userAgent = navigator.userAgent;

	// 检查 userAgent 是否包含 "TorBrowser"
	if (userAgent.includes("TorBrowser")) {
		return true;
	}

	// 如果 userAgent 中未包含 "TorBrowser"，检查 WebRTC 是否被禁用
	if (!isWebRTCSupported()) {
		return true;
	}

	return false;
}
  
  
function convertToFixedBitSequence() {
  const inputText = document.getElementById('inputText').value;
  // 获取输入框中的值
  const intervalValue = document.getElementById('interval').value;
  interval=intervalValue;
  const utf8Encoded = new TextEncoder().encode(inputText); 
  const binaryString = Array.from(utf8Encoded).map(byte => byte.toString(2).padStart(8, '0')).join(''); 

  const n = binaryString.length;
  if (n > 503) {
      alert("Too long! (Unicode beyond 512 bit)");
      return;
  }


  const lengthInfo = n.toString(2).padStart(9, '0');
  

  const paddingBits = '0'.repeat(512 - n - 9);
  

  fixedBitSequence = lengthInfo + binaryString + paddingBits;


  document.getElementById('result').textContent = fixedBitSequence;


  let processtext=document.getElementById("processtext");
  processtext.innerHTML="Setup Now"
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




var browserHere;

function sendInit()
{

  browserHere=fnBrowserDetect();
  if(browserHere=="firefox"){
	if(isTorBrowser())
	{
		browserHere="tor";
	}
  }
  console.log("browserHere=",browserHere);



  myWorker=new Worker("static/js/workers/senderWorker.js");
  myWorker.addEventListener('message',handleMessage);
  Canvas=document.getElementById("Canvas");
  offscreenCan=Canvas.transferControlToOffscreen();
  myWorker.postMessage({ canvas: offscreenCan, interval: parseInt(interval, 10)}, [offscreenCan]);


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


var numre=0;
function handleMessage(msg)
{
  if(msg.data[0]=='WebglOK')
  {
    myWorker.postMessage(["512bit",fixedBitSequence,browserHere]);
  }else if(msg.data[0]=='timeOK')
  {
    flagBar=1;
  }else if(msg.data[0]=="Retransmit")
  {
     numre+=1;
    let progressBar=document.getElementById("progress");
    progress=20;
    if(progress==20)
    {
      let processtext=document.getElementById("processtext");
      processtext.innerHTML="Retransmitting Now (Retransmitting Times="+numre+")";
    }
    progressBar.style.width = `${progress}%`;
    progressBar.innerHTML=progressBar.style.width;


  }else if(msg.data[0]=='bar process')
  {
    let progressBar=document.getElementById("progress");
    progress += 10; 
    if(progress==20)
    {
      let processtext=document.getElementById("processtext");
      processtext.innerHTML="Transmitting Now"
    }

    if(progress==90)
    {
      let processtext=document.getElementById("processtext");
      processtext.innerHTML="Receiver Checking Now"
    }

    if(progress==100)
    {
      let processtext=document.getElementById("processtext");
      processtext.innerHTML="Finished. Please go back to the receiver and check the message received."
    }

    if(progress<=100)
    {
      progressBar.style.width = `${progress}%`;
      progressBar.innerHTML=progressBar.style.width;
    }
  
  }
}