//ip_address = "aws.xxx.io";
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

Collector = function() {
  this.finalized = false;
  this.basicInfo= {
    userAgent: "",
    WebGL: false,
    inc: "Undefined",
    gpu: "Undefined",
    timezone: "Undefined",
    plugins: "Undefined",
    cookie: "Undefined",
    localstorage: "Undefined",
    manufacturer: "Undefined",
    adBlock: "Undefined",
    cpuCores: "Undefined",
    userID: "Undefined"
  };

  // get the list of plugins
  this.getPlugins = function() {
    var plgs_len = navigator.plugins.length;
    var plugins = [];
    for(var i = 0;i < plgs_len;i ++) {
      plugins.push(navigator.plugins[i].name);
    }
    plugins.sort();
    var plgs = plugins.join("~");
    plgs = plgs.replace(/[^a-zA-Z~ ]/g, "");
    return plgs;
  };


  this.getResolution = function() {
    var res = window.screen.width+"_"+window.screen.height+"_"+window.screen.colorDepth+"_"+window.screen.availWidth + "_" + window.screen.availHeight + "_" + window.screen.left + '_' + window.screen.top + '_' + window.screen.availLeft + "_" + window.screen.availTop + "_" + window.innerWidth + "_" + window.outerWidth;
    return res;
  }

  // check the support of local storage
  this.checkLocalStorage = function() {
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
      return true;
    } catch(e) {
      return false;
    }
  };

  // get the number of CPU cores
  this.getCPUCores = function() {
    if(!navigator.hardwareConcurrency)
      return "-1"
    else
      return navigator.hardwareConcurrency;
  };

  // check the support of WebGL
  this.getWebGL = function() {
    canvas = getCanvas('canvasElem');
    var gl = getGL(canvas);
    return gl;
  }

  // get the inc info
  this.getInc = function(gl) {
    var debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (debugInfo) return gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
    return "No Debug Info";
  }

  // get the GPU info
  this.getGpu = function(gl) {
    var debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (debugInfo) return gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    return "No Debug Info";
  }

  this.genPostData = function() {
    // get every basic features
    this.basicInfo['userAgent'] = navigator.userAgent;
    this.basicInfo['timezone'] = new Date().getTimezoneOffset();
    this.basicInfo['cookie'] = getWebGLDeliveryCookie();
    this.basicInfo['plugins'] = this.getPlugins();
    this.basicInfo['screen'] = this.getResolution();
    this.basicInfo['cookieEnabled'] = navigator.cookieEnabled;
    this.basicInfo['localstorage'] = this.checkLocalStorage();
    this.basicInfo['adBlock'] = $('#RYHmaVMTFnOE')[0] == null ? 'Yes' : 'No';
    this.basicInfo['cpuCores'] = this.getCPUCores();
    this.basicInfo['browser'] = fnBrowserDetect();
    this.basicInfo['userID'] = userID;

    // WebGL information
    this.testGL = this.getWebGL();
    if (this.testGL) this.basicInfo['WebGL'] = true;
    else this.basicInfo['WebGL'] = false;
    this.basicInfo['inc'] = "Not Supported";
    this.basicInfo['gpu'] = "Not Supported";

    if (this.basicInfo['WebGL']) {
      this.basicInfo['inc'] = this.getInc(this.testGL);
      this.basicInfo['gpu'] = this.getGpu(this.testGL);
    }

    console.log(this.basicInfo);
    /*
    this.startSend = function(){
      $.ajax({
        url : "https://" + ip_address + "/data",
        dataType : "json",
        contentType: 'application/json',
        type : 'POST',
        data : JSON.stringify(this.basicInfo),
        success : function(data) {
          console.log(data);
          // try to install the cookie
          var cookie = data['cookie']
          // setCookie("SameSite", "None; Secure", 365);
          setCookie('WebGLDelivery', cookie, 365);
        },
        error: function (xhr, ajaxOptions, thrownError) {
          alert(thrownError);
        }
      });
    }
    */
  }
};

/* Converts the charachters that aren't UrlSafe to ones that are and
   removes the padding so the base64 string can be sent
   */
Base64EncodeUrlSafe = function(str) {
  return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
};

stringify = function(array) {
  var str = "";
  for (var i = 0, len = array.length; i < len; i += 4) {
    str += String.fromCharCode(array[i + 0]);
    str += String.fromCharCode(array[i + 1]);
    str += String.fromCharCode(array[i + 2]);
  }
  // NB: AJAX requires that base64 strings are in their URL safe
  // form and don't have any padding
  var b64 = window.btoa(str);
  return Base64EncodeUrlSafe(b64);
};


function getCookieByName(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) 
    return parts.pop().split(';').shift();
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getWebGLDeliveryCookie() {
  cookie = getCookieByName("WebGLDelivery");
  // console.log(cookie);
  if (!cookie) cookie = "None"
  return cookie;
}

