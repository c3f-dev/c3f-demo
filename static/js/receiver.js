var offscreenCan;
var gl;
var Canvas;
var myWorker;
var sender_browser;
var receiver_browser;
var abc={};
var serverWorker;
var fixedBitSequence;
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
  if(msg.data[0]=='Receive_Sequence')
  {
    fixedBitSequence=msg.data[1];
    convertBackToUnicode();
  }
    
 
}




        

function convertBackToUnicode() {
    if (!fixedBitSequence) {
        alert("Please change into 512 bits sequence！");
        return;
    }


    const lengthInfo = fixedBitSequence.slice(0, 9);
    const n = parseInt(lengthInfo, 2);  

    const binaryData = fixedBitSequence.slice(9, 9 + n);


    const byteArray = [];
    for (let i = 0; i < binaryData.length; i += 8) {
        const byte = binaryData.slice(i, i + 8);
        byteArray.push(parseInt(byte, 2));
    }


    const decodedText = new TextDecoder('utf-8').decode(new Uint8Array(byteArray));


    document.getElementById('unicodeResult').textContent = decodedText;
}