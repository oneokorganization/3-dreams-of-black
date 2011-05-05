// Create a class to handle emitting cases
function HandleErrors(d) {

  var that = this;
  var destination = d || "/alternate";

  Trailer = "<ul id = 'trailer'><li class = 'first'><a href = '#'>Watch Trailer</a></li><li><a href = 'http://ro.me/album'>Rome Album</a></li><li class = 'last'><a href = 'http://ro.me/tech'>The Technology</a></li><li class = 'clear'></li></ul>";

  this.MagicVariable = "case";

  this.Errors = [
    "<p>We are very sorry, but &#147;3 Dreams of Black&#148; is an experiment and unfortunately does not currently function on every configuration. It appears that your computer&#39;s graphics card doesn&#39;t support WebGL technology. You can find more details for troubleshooting <a href = 'http://get.webgl.org/troubleshooting/'>here</a> and obtain a list of recommended graphics cards. Although you are unable to participate in the full experience today, we expect this website to be up for a while, so please check back if you&#39;re on a different computer. Though not the full experience, you can also watch a video trailer, access the rest of the ROME album site and learn more about WebGL technology.</p>" + Trailer,
    "<p>Apologies for the tech trouble. &#147;3 Dreams of Black&#148; is an experiment and unfortunately does not currently function on every configuration. It appears your computer&#39;s graphics card doesn&#39;t support WebGL technology. You can find more details for troubleshooting <a href = 'http://get.webgl.org/troubleshooting/'>here</a> and obtain a list of recommended graphics cards. Although you are unable to participate in the full experience today, we expect this website to be up for a while, so please check back if you&#39;re on a different computer. Though not the full experience, you can also watch a video trailer, access the rest of the ROME album site and learn more about WebGL technology.<p>" + Trailer,
    "<p>We are sorry, but it appears that your browser does not support WebGL. Please <a href = 'http://www.google.com/chrome?brand=CHKX&utm_campaign=en&utm_source=en-rome-webgl&utm_medium=rome-webgl'>download Google Chrome</a> and try launching this site again. If you are unable to install a new web browser, you can try downloading the <a href = 'http://www.google.com/chromeframe'>Google Chrome Frame plugin</a> instead.</p>",
    "<p>We are sorry, but it appears that your browser does not support WebGL. Please <a href = 'http://www.google.com/chrome?brand=CHKX&utm_campaign=en&utm_source=en-rome-webgl&utm_medium=rome-webgl'>download Google Chrome</a> and try launching this site again.</p>",
    "<p>We are sorry, but it appears that your browser does not support WebGL. &#147;3 Dreams of Black&#148; is an experiment that was designed with the browser Google Chrome in mind. Please try launching this site again on a computer with up-to-date graphics drivers. Though not the full experience, you can also watch a video trailer, access the rest of the ROME album site, and learn more about WebGL technology.</p>" + Trailer,
    "<p>We&#39;re sorry, but &#147;3 Dreams of Black&#148; is an experiment that was designed with the browser Google Chrome in mind. As a result, it may not work perfectly in your current browser. For the best viewing experience, you can <a href = 'http://www.google.com/chrome?brand=CHKX&utm_campaign=en&utm_source=en-rome-webgl&utm_medium=rome-webgl'>download Google Chrome</a> and launch this site again, or go ahead and <a id = 'escape-from-warning' href = '#'>try it anyway</a>.</p>"
  ];

  this.getUrlVars = function() {
      var vars = null;
      var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

      for(var i = 0; i < hashes.length; i++) {
          var hash = hashes[i].split('=');
          if(hash.length == 2) {
            var a = hash[0];
            var b = hash[1];
            if(a && b) {
              if(vars == null) {
                vars = {};
              }
              vars[a] = b;
            }
          }
      }
      return vars;
  };

  this.checkForErrors = function() {
    
    // scrape everything navigator.userAgent;
    var Detector = {
        webgl : ( function () { try { return !! window.WebGLRenderingContext && !! document.createElement( 'canvas' ).getContext( 'experimental-webgl' ); } catch( e ) { return false; } } )(),
        conditions : [
                      ( function () { return hasUserAgent(/[cC]hrome/); } )(),
                      ( function () { return hasUserAgent(/[Ff]ire[Ff]ox\/[4-9]/); } )(),
                      ( function () { return hasUserAgent(/MSIE [789]/) && hasUserAgent(/[Ww]indows [Nn][Tt] [6789]\./); } )(),
                      ( function () { return hasUserAgent(/[Ss]afari/) && hasUserAgent(/[Mm]ac [Oo][Ss] [Xx] 10\_[6789]/); } )(),
                      ( function () { return hasUserAgent(/i[Pp]hone/) || hasUserAgent(/i[Pp]ad/) || hasUserAgent(/[Aa]ndroid/); } )()
                      ],
        message : ""
    };

    if(Detector.webgl) {
      // We're good!
      if(Detector.conditions[1]) {
        // Overlay condition check with localStorage
        // Detector.message = Errors[5];
        if(hasLocalStorage()) {
          // go ahead darling
          if(!localStorage["RomeError"]) {
            // overlay our condition

            window.addEventListener("load", function() {

              var shade = document.createElement("div");
              var errorContainer = document.createElement("div");
              var error = document.createElement("div");
                  error.setAttribute("id", "rome-error");
              var styles = document.createElement("style");
                  styles.innerHTML = "a { color: #fff; }";
                  document.getElementsByTagName("head")[0].appendChild(styles);

              // Styling
              var shadeStyle = "width: 100%; height: 100%; position: fixed; margin: 0; padding: 0; top: 0; left: 0;";
              shade.setAttribute("style", shadeStyle);
              var errorContainerStyle = "position: fixed; width: 400px; margin: 0 auto; top: " + (window.innerHeight - 200) / 2.0 + "px; left: " + (window.innerWidth - 400) / 2.0 + "px;";
              errorContainer.setAttribute("style", errorContainerStyle);
              var errorStyle = "width: 330px; padding: 50px 35px; background: rgba(0, 0, 0, 0.3); color: #fff; font: color: #fff; font: 500 12px/18px 'Futura', Arial, sans-serif; letter-spacing: 1px; text-align: center;";
              error.setAttribute("style", errorStyle);
              error.innerHTML = that.Errors[5];

              // Add Event Listeners
              var windowResize = function() {
                errorContainer.style.left = (window.innerWidth - 400) / 2.0 + "px";
                errorContainer.style.top = (window.innerHeight) / 2.0 + "px";
              };
              var removeErrors = function() {
                document.body.removeChild(shade);
                document.body.removeChild(errorContainer);
                window.removeEventListener("resize", windowResize, false);
              };
              shade.addEventListener("click", function() {
                removeErrors();
              }, false);
              window.addEventListener("resize", windowResize, false);

              errorContainer.appendChild(error);
              document.body.appendChild(shade);
              document.body.appendChild(errorContainer);

              var escape = document.getElementById("escape-from-warning");
                  escape.addEventListener("click", function(e) {
                    e.preventDefault();
                    removeErrors();
                  }, false);
            }, false);

            localStorage["RomeError"] = true;
          }
        }
      }
    } else {
      // run other conditions
      for(var i = 0; i < Detector.conditions.length; i++) {
        if(Detector.conditions[i]) {
          // Then we've found what we're looking for!
          window.location = destination + "?" + this.MagicVariable + "=" + i;
          break;
        }
      }
    }
  };
  // returns true or false based on 
  function hasUserAgent(condition) {
    return navigator.userAgent.match(condition);
  }

  function hasLocalStorage() {
    try {
      return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
      return false;
    }
  }
}

// if has get contents of case then dont run else run HandleErrors
// Read a page's GET URL variables and return them as an associative array.
var romeErrors = new HandleErrors();
var variables = romeErrors.getUrlVars();
if(variables) {
  if(variables[romeErrors.MagicVariable]) {
    // this means we are in the error page
    window.addEventListener("load", function() {
      var iterator = variables[romeErrors.MagicVariable];
      var error = document.getElementById("error");
          error.innerHTML = romeErrors.Errors[iterator];
    }, false);
  }
} else {
  romeErrors.checkForErrors();
}
var Logger = function () {

	this.domElement = document.createElement( 'div' );
	this.domElement.style.fontFamily = 'Helvetica, Arial, sans-serif';
	this.domElement.style.textAlign = 'left';
	this.domElement.style.fontSize = '9px';
	this.domElement.style.padding = '2px 0px 3px 0px';

	this.log = function ( msg ) {

		this.domElement.appendChild( document.createTextNode( msg ) );
		this.domElement.appendChild( document.createElement( 'br' ) );

	},

	this.clear = function () {

		while ( this.domElement.childNodes.length > 0 ) {

			this.domElement.removeChild( this.domElement.childNodes[ 0 ] );

		}

	}

}

// stats.js r5 - http://github.com/mrdoob/stats.js
var Stats=function(){function w(d,K,n){var u,f,c;for(f=0;f<30;f++)for(u=0;u<73;u++){c=(u+f*74)*4;d[c]=d[c+4];d[c+1]=d[c+5];d[c+2]=d[c+6]}for(f=0;f<30;f++){c=(73+f*74)*4;if(f<K){d[c]=b[n].bg.r;d[c+1]=b[n].bg.g;d[c+2]=b[n].bg.b}else{d[c]=b[n].fg.r;d[c+1]=b[n].fg.g;d[c+2]=b[n].fg.b}}}var v=0,x=2,e,y=0,l=(new Date).getTime(),J=l,z=l,o=0,A=1E3,B=0,m,g,a,p,C,q=0,D=1E3,E=0,h,i,r,F,s=0,G=1E3,H=0,j,k,t,I,b={fps:{bg:{r:16,g:16,b:48},fg:{r:0,g:255,b:255}},ms:{bg:{r:16,g:48,b:16},fg:{r:0,g:255,b:0}},mem:{bg:{r:48,
g:16,b:26},fg:{r:255,g:0,b:128}}};e=document.createElement("div");e.style.cursor="pointer";e.style.width="80px";e.style.opacity="0.9";e.style.zIndex="10001";e.addEventListener("click",function(){v++;v==x&&(v=0);m.style.display="none";h.style.display="none";j.style.display="none";switch(v){case 0:m.style.display="block";break;case 1:h.style.display="block";break;case 2:j.style.display="block"}},false);m=document.createElement("div");m.style.backgroundColor="rgb("+Math.floor(b.fps.bg.r/2)+","+Math.floor(b.fps.bg.g/
2)+","+Math.floor(b.fps.bg.b/2)+")";m.style.padding="2px 0px 3px 0px";e.appendChild(m);g=document.createElement("div");g.style.fontFamily="Helvetica, Arial, sans-serif";g.style.textAlign="left";g.style.fontSize="9px";g.style.color="rgb("+b.fps.fg.r+","+b.fps.fg.g+","+b.fps.fg.b+")";g.style.margin="0px 0px 1px 3px";g.innerHTML='<span style="font-weight:bold">FPS</span>';m.appendChild(g);a=document.createElement("canvas");a.width=74;a.height=30;a.style.display="block";a.style.marginLeft="3px";m.appendChild(a);
p=a.getContext("2d");p.fillStyle="rgb("+b.fps.bg.r+","+b.fps.bg.g+","+b.fps.bg.b+")";p.fillRect(0,0,a.width,a.height);C=p.getImageData(0,0,a.width,a.height);h=document.createElement("div");h.style.backgroundColor="rgb("+Math.floor(b.ms.bg.r/2)+","+Math.floor(b.ms.bg.g/2)+","+Math.floor(b.ms.bg.b/2)+")";h.style.padding="2px 0px 3px 0px";h.style.display="none";e.appendChild(h);i=document.createElement("div");i.style.fontFamily="Helvetica, Arial, sans-serif";i.style.textAlign="left";i.style.fontSize=
"9px";i.style.color="rgb("+b.ms.fg.r+","+b.ms.fg.g+","+b.ms.fg.b+")";i.style.margin="0px 0px 1px 3px";i.innerHTML='<span style="font-weight:bold">MS</span>';h.appendChild(i);a=document.createElement("canvas");a.width=74;a.height=30;a.style.display="block";a.style.marginLeft="3px";h.appendChild(a);r=a.getContext("2d");r.fillStyle="rgb("+b.ms.bg.r+","+b.ms.bg.g+","+b.ms.bg.b+")";r.fillRect(0,0,a.width,a.height);F=r.getImageData(0,0,a.width,a.height);try{if(webkitPerformance&&webkitPerformance.memory.totalJSHeapSize)x=
3}catch(L){}j=document.createElement("div");j.style.backgroundColor="rgb("+Math.floor(b.mem.bg.r/2)+","+Math.floor(b.mem.bg.g/2)+","+Math.floor(b.mem.bg.b/2)+")";j.style.padding="2px 0px 3px 0px";j.style.display="none";e.appendChild(j);k=document.createElement("div");k.style.fontFamily="Helvetica, Arial, sans-serif";k.style.textAlign="left";k.style.fontSize="9px";k.style.color="rgb("+b.mem.fg.r+","+b.mem.fg.g+","+b.mem.fg.b+")";k.style.margin="0px 0px 1px 3px";k.innerHTML='<span style="font-weight:bold">MEM</span>';
j.appendChild(k);a=document.createElement("canvas");a.width=74;a.height=30;a.style.display="block";a.style.marginLeft="3px";j.appendChild(a);t=a.getContext("2d");t.fillStyle="#301010";t.fillRect(0,0,a.width,a.height);I=t.getImageData(0,0,a.width,a.height);return{domElement:e,update:function(){y++;l=(new Date).getTime();q=l-J;D=Math.min(D,q);E=Math.max(E,q);w(F.data,Math.min(30,30-q/200*30),"ms");i.innerHTML='<span style="font-weight:bold">'+q+" MS</span> ("+D+"-"+E+")";r.putImageData(F,0,0);J=l;if(l>
z+1E3){o=Math.round(y*1E3/(l-z));A=Math.min(A,o);B=Math.max(B,o);w(C.data,Math.min(30,30-o/100*30),"fps");g.innerHTML='<span style="font-weight:bold">'+o+" FPS</span> ("+A+"-"+B+")";p.putImageData(C,0,0);if(x==3){s=webkitPerformance.memory.usedJSHeapSize*9.54E-7;G=Math.min(G,s);H=Math.max(H,s);w(I.data,Math.min(30,30-s/2),"mem");k.innerHTML='<span style="font-weight:bold">'+Math.round(s)+" MEM</span> ("+Math.round(G)+"-"+Math.round(H)+")";t.putImageData(I,0,0)}z=l;y=0}}}};


var GUI=function(){var _this=this;var MIN_WIDTH=240;var MAX_WIDTH=500;var head=document.getElementsByTagName("head")[0],style=document.createElement("style"),css="#guidat{position:fixed;top:0;right:0;width:auto;z-index:1001;text-align:right}.guidat{color:#fff;opacity:0.97;text-align:left;float:right;margin-right:20px;margin-bottom:20px;background-color:#fff}.guidat,.guidat input{font:9.5px Lucida Grande,sans-serif}.guidat-controllers{height:300px;overflow-y:auto;overflow-x:hidden;background-color:rgba(0,0,0,0.1)}a.guidat-toggle{text-decoration:none;cursor:pointer;color:#fff;background-color:#222;text-align:center;display:block;padding:5px}a.guidat-toggle:hover{background-color:#000}.guidat-controller{padding:3px;height:25px;clear:left;border-bottom:1px solid #222;background-color:#111}.guidat-controller,.guidat-controller input,.guidat-slider-bg,.guidat-slider-fg{-moz-transition:background-color 0.15s linear;-webkit-transition:background-color 0.15s linear;transition:background-color 0.15s linear}.guidat-controller.boolean:hover,.guidat-controller.function:hover{background-color:#000}.guidat-controller input{float:right;outline:none;border:0;padding:4px;margin-top:2px;background-color:#222}.guidat-controller input:hover{background-color:#444}.guidat-controller input:focus{background-color:#555}.guidat-controller.number{border-left:5px solid #00aeff}.guidat-controller.string{border-left:5px solid #1ed36f}.guidat-controller.string input{border:0;color:#1ed36f;margin-right:2px;width:148px}.guidat-controller.boolean{border-left:5px solid #54396e}.guidat-controller.function{border-left:5px solid #e61d5f}.guidat-controller.number input[type=text]{width:35px;margin-left:5px;margin-right:2px;color:#00aeff}.guidat .guidat-controller.boolean input{margin-top:6px;margin-right:2px;font-size:20px}.guidat-controller:last-child{border-bottom:none;-webkit-box-shadow:0px 1px 3px rgba(0,0,0,0.5);-moz-box-shadow:0px 1px 3px rgba(0,0,0,0.5);box-shadow:0px 1px 3px rgba(0,0,0,0.5)}.guidat-propertyname{padding:5px;padding-top:7px;cursor:default;display:inline-block}.guidat-slider-bg:hover,.guidat-slider-bg.active{background-color:#444}.guidat-slider-bg:hover .guidat-slider-fg,.guidat-slider-bg.active .guidat-slider-fg{background-color:#52c8ff}.guidat-slider-bg{background-color:#222;cursor:ew-resize;width:40%;margin-top:2px;float:right;height:21px}.guidat-slider-fg{background-color:#00aeff;height:20px}";style.type="text/css";style.innerHTML=css;head.appendChild(style);var controllers=[];var listening=[];var autoListen=true;var listenInterval;var controllerHeight;var curControllerContainerHeight=0;var _this=this;var open=false;var width=280;var explicitOpenHeight=false;var openHeight;var name;var resizeTo=0;var resizeTimeout;this.domElement=document.createElement("div");this.domElement.setAttribute("class","guidat");this.domElement.style.width=width+"px";var controllerContainer=document.createElement("div");controllerContainer.setAttribute("class","guidat-controllers");controllerContainer.addEventListener("DOMMouseScroll",function(e){var scrollAmount=this.scrollTop;if(e.wheelDelta){scrollAmount+=e.wheelDelta}else{if(e.detail){scrollAmount+=e.detail}}if(e.preventDefault){e.preventDefault()}e.returnValue=false;controllerContainer.scrollTop=scrollAmount},false);controllerContainer.style.height="0px";var toggleButton=document.createElement("a");toggleButton.setAttribute("class","guidat-toggle");toggleButton.setAttribute("href","#");toggleButton.innerHTML="Show Controls";var toggleDragged=false;var dragDisplacementY=0;var togglePressed=false;var my,pmy,mx,pmx;var resize=function(e){pmy=my;pmx=mx;my=e.pageY;mx=e.pageX;var dmy=my-pmy;if(!open){if(dmy>0){open=true;curControllerContainerHeight=openHeight=1;toggleButton.innerHTML=name||"Hide Controls"}else{return}}var dmx=pmx-mx;if(dmy>0&&curControllerContainerHeight>controllerHeight){var d=GUI.map(curControllerContainerHeight,controllerHeight,controllerHeight+100,1,0);dmy*=d}toggleDragged=true;dragDisplacementY+=dmy;dragDisplacementX+=dmx;openHeight+=dmy;width+=dmx;curControllerContainerHeight+=dmy;controllerContainer.style.height=openHeight+"px";width=GUI.constrain(width,MIN_WIDTH,MAX_WIDTH);_this.domElement.style.width=width+"px";checkForOverflow()};toggleButton.addEventListener("mousedown",function(e){pmy=my=e.pageY;pmx=mx=e.pageX;togglePressed=true;e.preventDefault();dragDisplacementY=0;dragDisplacementX=0;document.addEventListener("mousemove",resize,false);return false},false);toggleButton.addEventListener("click",function(e){e.preventDefault();return false},false);document.addEventListener("mouseup",function(e){if(togglePressed&&!toggleDragged){_this.toggle();_this.domElement.style.width=(width+1)+"px";setTimeout(function(){_this.domElement.style.width=width+"px"},1)}if(togglePressed&&toggleDragged){if(dragDisplacementX==0){_this.domElement.style.width=(width+1)+"px";setTimeout(function(){_this.domElement.style.width=width+"px"},1)}if(openHeight>controllerHeight){clearTimeout(resizeTimeout);openHeight=resizeTo=controllerHeight;beginResize()}else{if(controllerContainer.children.length>=1){var singleControllerHeight=controllerContainer.children[0].offsetHeight;clearTimeout(resizeTimeout);var target=Math.round(curControllerContainerHeight/singleControllerHeight)*singleControllerHeight-1;resizeTo=target;if(resizeTo<=0){_this.hide();openHeight=singleControllerHeight*2}else{openHeight=resizeTo;beginResize()}}}}document.removeEventListener("mousemove",resize,false);e.preventDefault();toggleDragged=false;togglePressed=false;return false},false);this.domElement.appendChild(controllerContainer);this.domElement.appendChild(toggleButton);if(GUI.autoPlace){if(GUI.autoPlaceContainer==null){GUI.autoPlaceContainer=document.createElement("div");GUI.autoPlaceContainer.setAttribute("id","guidat");document.body.appendChild(GUI.autoPlaceContainer)}GUI.autoPlaceContainer.appendChild(this.domElement)}this.autoListenIntervalTime=1000/60;var createListenInterval=function(){listenInterval=setInterval(function(){_this.listen()},this.autoListenIntervalTime)};this.__defineSetter__("autoListen",function(v){autoListen=v;if(!autoListen){clearInterval(listenInterval)}else{if(listening.length>0){createListenInterval()}}});this.__defineGetter__("autoListen",function(v){return autoListen});this.listenTo=function(controller){if(listening.length==0){createListenInterval()}listening.push(controller)};this.unlistenTo=function(controller){for(var i=0;i<listening.length;i++){if(listening[i]==controller){listening.splice(i,1)}}if(listening.length<=0){clearInterval(listenInterval)}};this.listen=function(whoToListenTo){var arr=whoToListenTo||listening;for(var i in arr){arr[i].updateDisplay()}};this.listenAll=function(){this.listen(controllers)};this.autoListen=true;var alreadyControlled=function(object,propertyName){for(var i in controllers){if(controllers[i].object==object&&controllers[i].propertyName==propertyName){return true}}return false};var construct=function(constructor,args){function F(){return constructor.apply(this,args)}F.prototype=constructor.prototype;return new F()};this.add=function(){var object=arguments[0];var propertyName=arguments[1];if(alreadyControlled(object,propertyName)){}var value=object[propertyName];if(value==undefined){GUI.error(object+' either has no property "'+propertyName+'", or the property is inaccessible.');return}var type=typeof value;var handler=handlerTypes[type];if(handler==undefined){GUI.error('Cannot create controller for data type "'+type+'"');return}var args=[this];for(var j=0;j<arguments.length;j++){args.push(arguments[j])}var controllerObject=construct(handler,args);if(!controllerObject){GUI.error('Error creating controller for "'+propertyName+'".');return}controllerContainer.appendChild(controllerObject.domElement);controllers.push(controllerObject);GUI.allControllers.push(controllerObject);if(type!="function"&&GUI.saveIndex<GUI.savedValues.length){controllerObject.setValue(GUI.savedValues[GUI.saveIndex]);GUI.saveIndex++}checkForOverflow();if(!explicitOpenHeight){openHeight=controllerHeight}return controllerObject};var checkForOverflow=function(){controllerHeight=0;for(var i in controllers){controllerHeight+=controllers[i].domElement.offsetHeight}if(controllerHeight-1>openHeight){controllerContainer.style.overflowY="auto"}else{controllerContainer.style.overflowY="hidden"}};var handlerTypes={number:GUI.NumberController,string:GUI.StringController,"boolean":GUI.BooleanController,"function":GUI.FunctionController};var alreadyControlled=function(object,propertyName){for(var i in controllers){if(controllers[i].object==object&&controllers[i].propertyName==propertyName){return true}}return false};var construct=function(constructor,args){function F(){return constructor.apply(this,args)}F.prototype=constructor.prototype;return new F()};this.reset=function(){};this.toggle=function(){open?this.hide():this.show()};this.show=function(){toggleButton.innerHTML=name||"Hide Controls";resizeTo=openHeight;clearTimeout(resizeTimeout);beginResize();open=true};this.hide=function(){toggleButton.innerHTML=name||"Show Controls";resizeTo=0;clearTimeout(resizeTimeout);beginResize();open=false};this.name=function(n){name=n;toggleButton.innerHTML=n};this.appearanceVars=function(){return[open,width,openHeight,controllerContainer.scrollTop]};var beginResize=function(){curControllerContainerHeight+=(resizeTo-curControllerContainerHeight)*0.6;if(Math.abs(curControllerContainerHeight-resizeTo)<1){curControllerContainerHeight=resizeTo}else{resizeTimeout=setTimeout(beginResize,1000/30)}controllerContainer.style.height=Math.round(curControllerContainerHeight)+"px";checkForOverflow()};if(GUI.guiIndex<GUI.savedAppearanceVars.length){width=parseInt(GUI.savedAppearanceVars[GUI.guiIndex][1]);_this.domElement.style.width=width+"px";openHeight=parseInt(GUI.savedAppearanceVars[GUI.guiIndex][2]);explicitOpenHeight=true;if(eval(GUI.savedAppearanceVars[GUI.guiIndex][0])==true){curControllerContainerHeight=openHeight;var t=GUI.savedAppearanceVars[GUI.guiIndex][3];setTimeout(function(){controllerContainer.scrollTop=t},0);if(GUI.scrollTop>-1){document.body.scrollTop=GUI.scrollTop}resizeTo=openHeight;this.show()}GUI.guiIndex++}GUI.allGuis.push(this)};GUI.autoPlace=true;GUI.autoPlaceContainer=null;GUI.allControllers=[];GUI.allGuis=[];GUI.saveURL=function(){title=window.location;url=GUI.replaceGetVar("saveString",GUI.getSaveString());window.location=url};GUI.scrollTop=-1;GUI.load=function(c){var d=c.split(",");var a=parseInt(d[0]);GUI.scrollTop=parseInt(d[1]);for(var b=0;b<a;b++){var e=d.splice(2,4);GUI.savedAppearanceVars.push(e)}GUI.savedValues=d.splice(2,d.length)};GUI.savedValues=[];GUI.savedAppearanceVars=[];GUI.getSaveString=function(){var d=[];d.push(GUI.allGuis.length);d.push(document.body.scrollTop);for(var c in GUI.allGuis){var e=GUI.allGuis[c].appearanceVars();for(var b=0;b<e.length;b++){d.push(e[b])}}for(var c in GUI.allControllers){if(GUI.allControllers[c].type=="function"){continue}var a=GUI.allControllers[c].getValue();if(GUI.allControllers[c].type=="number"){a=GUI.roundToDecimal(a,4)}d.push(a)}return d.join(",")};GUI.getVarFromURL=function(a){var e=[],d;var b=window.location.href.slice(window.location.href.indexOf("?")+1).split("&");for(var c=0;c<b.length;c++){d=b[c].split("=");if(d==undefined){continue}if(d[0]==a){return d[1]}}return null};GUI.replaceGetVar=function(g,f){var d=[],c;var e=window.location.href;var a=window.location.href.slice(window.location.href.indexOf("?")+1).split("&");for(var b=0;b<a.length;b++){c=a[b].split("=");if(c==undefined){continue}if(c[0]==g){return e.replace(c[1],f)}}if(window.location.href.indexOf("?")!=-1){return e+"&"+g+"="+f}return e+"?"+g+"="+f};GUI.saveIndex=0;GUI.guiIndex=0;GUI.showSaveString=function(){alert(GUI.getSaveString())};GUI.makeUnselectable=function(a){a.onselectstart=function(){return false};a.style.MozUserSelect="none";a.style.KhtmlUserSelect="none";a.unselectable="on"};GUI.makeSelectable=function(a){a.onselectstart=function(){};a.style.MozUserSelect="auto";a.style.KhtmlUserSelect="auto";a.unselectable="off"};GUI.map=function(a,d,b,e,c){var a=e+(c-e)*((a-d)/(b-d));return a};GUI.constrain=function(a,c,b){if(a<c){a=c}else{if(a>b){a=b}}return a};GUI.error=function(a){if(typeof console.error=="function"){console.error("[GUI ERROR] "+a)}};GUI.roundToDecimal=function(c,a){var b=Math.pow(10,a);return Math.round(c*b)/b};GUI.extendController=function(a){a.prototype=new GUI.Controller();a.prototype.constructor=a};if(GUI.getVarFromURL("saveString")!=null){GUI.load(GUI.getVarFromURL("saveString"))}GUI.Slider=function(a,d,i,b,h){var d=d;var i=i;var b=b;var g=false;var e=this;var j,k;this.domElement=document.createElement("div");this.domElement.setAttribute("class","guidat-slider-bg");this.fg=document.createElement("div");this.fg.setAttribute("class","guidat-slider-fg");this.domElement.appendChild(this.fg);var f=function(l){var m=curtop=0;if(l.offsetParent){do{m+=l.offsetLeft;curtop+=l.offsetTop}while(l=l.offsetParent);return[m,curtop]}};this.__defineSetter__("value",function(m){var l=GUI.map(m,d,i,0,100);this.fg.style.width=l+"%"});var c=function(l){if(!g){return}var n=f(e.domElement);var m=GUI.map(l.pageX,n[0],n[0]+e.domElement.offsetWidth,d,i);m=Math.round(m/b)*b;a.setValue(m)};this.domElement.addEventListener("mousedown",function(l){g=true;j=k=l.pageX;e.domElement.setAttribute("class","guidat-slider-bg active");e.fg.setAttribute("class","guidat-slider-fg active");c(l)},false);document.addEventListener("mouseup",function(l){e.domElement.setAttribute("class","guidat-slider-bg");e.fg.setAttribute("class","guidat-slider-fg");g=false},false);document.addEventListener("mousemove",c,false);this.value=h};GUI.Controller=function(){this.parent=arguments[0];this.object=arguments[1];this.propertyName=arguments[2];if(arguments.length>0){this.initialValue=this.propertyName[this.object]}this.domElement=document.createElement("div");this.domElement.setAttribute("class","guidat-controller "+this.type);this.propertyNameElement=document.createElement("span");this.propertyNameElement.setAttribute("class","guidat-propertyname");this.name(this.propertyName);this.domElement.appendChild(this.propertyNameElement);GUI.makeUnselectable(this.domElement)};GUI.Controller.prototype.changeFunction=null;GUI.Controller.prototype.name=function(a){this.propertyNameElement.innerHTML=a;return this};GUI.Controller.prototype.reset=function(){this.setValue(this.initialValue);return this};GUI.Controller.prototype.listen=function(){this.parent.listenTo(this);return this};GUI.Controller.prototype.unlisten=function(){this.parent.unlistenTo(this);return this};GUI.Controller.prototype.setValue=function(a){this.object[this.propertyName]=a;if(this.changeFunction!=null){this.changeFunction.call(this,a)}this.updateDisplay();return this};GUI.Controller.prototype.getValue=function(){return this.object[this.propertyName]};GUI.Controller.prototype.updateDisplay=function(){};GUI.Controller.prototype.onChange=function(a){this.changeFunction=a;return this};GUI.StringController=function(){this.type="string";var c=this;GUI.Controller.apply(this,arguments);var b=document.createElement("input");var a=this.getValue();b.setAttribute("value",a);b.setAttribute("spellcheck","false");this.domElement.addEventListener("mouseup",function(){b.focus();b.select()},false);b.addEventListener("keyup",function(){c.setValue(b.value)},false);this.updateDisplay=function(){b.value=c.getValue()};this.domElement.appendChild(b)};GUI.extendController(GUI.StringController);GUI.NumberController=function(){this.type="number";GUI.Controller.apply(this,arguments);var f=this;var a=false;var g=false;var i=py=0;var e=arguments[3];var j=arguments[4];var d=arguments[5];if(!d){if(e!=undefined&&j!=undefined){d=(j-e)*0.01}else{d=1}}var c=document.createElement("input");c.setAttribute("id",this.propertyName);c.setAttribute("type","text");c.setAttribute("value",this.getValue());if(d){c.setAttribute("step",d)}this.domElement.appendChild(c);var b;if(e!=undefined&&j!=undefined){b=new GUI.Slider(this,e,j,d,this.getValue());this.domElement.appendChild(b.domElement)}c.addEventListener("blur",function(k){var l=parseFloat(this.value);if(!isNaN(l)){f.updateDisplay()}else{this.value=f.getValue()}},false);c.addEventListener("mousewheel",function(k){k.preventDefault();f.setValue(f.getValue()+Math.abs(k.wheelDeltaY)/k.wheelDeltaY*d);return false},false);c.addEventListener("mousedown",function(k){py=i=k.pageY;g=true;document.addEventListener("mousemove",h,false)},false);c.addEventListener("keydown",function(l){switch(l.keyCode){case 38:var k=f.getValue()+d;f.setValue(k);break;case 40:var k=f.getValue()-d;f.setValue(k);break}},false);document.addEventListener("mouseup",function(k){document.removeEventListener("mousemove",h,false);GUI.makeSelectable(f.parent.domElement);GUI.makeSelectable(c);if(g&&!a){c.focus();c.select()}a=false;g=false},false);var h=function(m){a=true;m.preventDefault();GUI.makeUnselectable(f.parent.domElement);GUI.makeUnselectable(c);py=i;i=m.pageY;var k=py-i;var l=f.getValue()+k*d;f.setValue(l);return false};this.setValue=function(k){k=parseFloat(k);if(e!=undefined&&k<=e){k=e}else{if(j!=undefined&&k>=j){k=j}}return GUI.Controller.prototype.setValue.call(this,k)};this.updateDisplay=function(){c.value=GUI.roundToDecimal(f.getValue(),4);if(b){b.value=f.getValue()}}};GUI.extendController(GUI.NumberController);GUI.FunctionController=function(){this.type="function";var a=this;GUI.Controller.apply(this,arguments);this.domElement.addEventListener("click",function(){a.object[a.propertyName].call(a.object)},false);this.domElement.style.cursor="pointer";this.propertyNameElement.style.cursor="pointer"};GUI.extendController(GUI.FunctionController);GUI.BooleanController=function(){this.type="boolean";GUI.Controller.apply(this,arguments);var _this=this;var input=document.createElement("input");input.setAttribute("type","checkbox");this.domElement.addEventListener("click",function(e){input.checked=!input.checked;e.preventDefault();_this.setValue(input.checked)},false);input.addEventListener("mouseup",function(e){input.checked=!input.checked},false);this.domElement.style.cursor="pointer";this.propertyNameElement.style.cursor="pointer";this.domElement.appendChild(input);this.updateDisplay=function(){input.checked=_this.getValue()};this.setValue=function(val){if(typeof val!="boolean"){try{val=eval(val)}catch(e){}}return GUI.Controller.prototype.setValue.call(this,val)}};GUI.extendController(GUI.BooleanController);
/*!
 * JS Signals <http://millermedeiros.github.com/js-signals/>
 * Released under the MIT license <http://www.opensource.org/licenses/mit-license.php>
 * @author Miller Medeiros <http://millermedeiros.com/>
 * @version 0.5.3
 * @build 143 (02/21/2011 07:18 PM)
 */
var signals=(function(){var a={VERSION:"0.5.3"};function b(g,f,d,e,c){this._listener=f;this._isOnce=d;this.context=e;this._signal=g;this._priority=c||0}b.prototype={_isEnabled:true,execute:function(c){var d;if(this._isEnabled){d=this._listener.apply(this.context,c);if(this._isOnce){this.detach()}}return d},detach:function(){return this._signal.remove(this._listener)},getListener:function(){return this._listener},dispose:function(){this.detach();this._destroy()},_destroy:function(){delete this._signal;delete this._isOnce;delete this._listener;delete this.context},disable:function(){this._isEnabled=false},enable:function(){this._isEnabled=true},isEnabled:function(){return this._isEnabled},isOnce:function(){return this._isOnce},toString:function(){return"[SignalBinding isOnce: "+this._isOnce+", isEnabled: "+this._isEnabled+"]"}};a.Signal=function(){this._bindings=[]};a.Signal.prototype={_shouldPropagate:true,_isEnabled:true,_registerListener:function(g,f,e,d){if(typeof g!=="function"){throw new Error("listener is a required param of add() and addOnce() and should be a Function.")}var c=this._indexOfListener(g),h;if(c!==-1){h=this._bindings[c];if(h.isOnce()!==f){throw new Error("You cannot add"+(f?"":"Once")+"() then add"+(!f?"":"Once")+"() the same listener without removing the relationship first.")}}else{h=new b(this,g,f,e,d);this._addBinding(h)}return h},_addBinding:function(c){var d=this._bindings.length;do{--d}while(this._bindings[d]&&c._priority<=this._bindings[d]._priority);this._bindings.splice(d+1,0,c)},_indexOfListener:function(c){var d=this._bindings.length;while(d--){if(this._bindings[d]._listener===c){return d}}return -1},add:function(e,d,c){return this._registerListener(e,false,d,c)},addOnce:function(e,d,c){return this._registerListener(e,true,d,c)},remove:function(d){if(typeof d!=="function"){throw new Error("listener is a required param of remove() and should be a Function.")}var c=this._indexOfListener(d);if(c!==-1){this._bindings[c]._destroy();this._bindings.splice(c,1)}return d},removeAll:function(){var c=this._bindings.length;while(c--){this._bindings[c]._destroy()}this._bindings.length=0},getNumListeners:function(){return this._bindings.length},disable:function(){this._isEnabled=false},enable:function(){this._isEnabled=true},isEnabled:function(){return this._isEnabled},halt:function(){this._shouldPropagate=false},dispatch:function(d){if(!this._isEnabled){return}var c=Array.prototype.slice.call(arguments),f=this._bindings.slice(),e=this._bindings.length;this._shouldPropagate=true;do{e--}while(f[e]&&this._shouldPropagate&&f[e].execute(c)!==false)},dispose:function(){this.removeAll();delete this._bindings},toString:function(){return"[Signal isEnabled: "+this._isEnabled+" numListeners: "+this.getNumListeners()+"]"}};return a}());
// Tween.js - http://github.com/sole/tween.js
var TWEEN=TWEEN||function(){var a,e,d,b=[];this.add=function(h){b.push(h)};this.remove=function(h){a=b.indexOf(h);a!==-1&&b.splice(a,1)};this.update=function(){a=0;e=b.length;for(d=(new Date).getTime();a<e;)if(b[a].update(d))a++;else{b.splice(a,1);e--}};return this}();
TWEEN.Tween=function(a){var e={},d={},b={},h=1E3,m=0,i=null,n=TWEEN.Easing.Linear.EaseNone,j=null,k=null,l=null;this.to=function(c,f){if(f!==null)h=f;for(var g in c)if(a[g]!==null)b[g]=c[g];return this};this.start=function(){TWEEN.add(this);i=(new Date).getTime()+m;for(var c in b)if(a[c]!==null){e[c]=a[c];d[c]=b[c]-a[c]}return this};this.stop=function(){TWEEN.remove(this);return this};this.delay=function(c){m=c;return this};this.easing=function(c){n=c;return this};this.chain=function(c){j=c};this.onUpdate=
function(c){k=c;return this};this.onComplete=function(c){l=c;return this};this.update=function(c){var f,g;if(c<i)return true;c=(c-i)/h;c=c>1?1:c;g=n(c);for(f in d)a[f]=e[f]+d[f]*g;k!==null&&k.call(a,g);if(c==1){l!==null&&l.call(a);j!==null&&j.start();return false}return true}};TWEEN.Easing={Linear:{},Quadratic:{},Cubic:{},Quartic:{},Quintic:{},Sinusoidal:{},Exponential:{},Circular:{},Elastic:{},Back:{},Bounce:{}};TWEEN.Easing.Linear.EaseNone=function(a){return a};
TWEEN.Easing.Quadratic.EaseIn=function(a){return a*a};TWEEN.Easing.Quadratic.EaseOut=function(a){return-a*(a-2)};TWEEN.Easing.Quadratic.EaseInOut=function(a){if((a*=2)<1)return 0.5*a*a;return-0.5*(--a*(a-2)-1)};TWEEN.Easing.Cubic.EaseIn=function(a){return a*a*a};TWEEN.Easing.Cubic.EaseOut=function(a){return--a*a*a+1};TWEEN.Easing.Cubic.EaseInOut=function(a){if((a*=2)<1)return 0.5*a*a*a;return 0.5*((a-=2)*a*a+2)};TWEEN.Easing.Quartic.EaseIn=function(a){return a*a*a*a};
TWEEN.Easing.Quartic.EaseOut=function(a){return-(--a*a*a*a-1)};TWEEN.Easing.Quartic.EaseInOut=function(a){if((a*=2)<1)return 0.5*a*a*a*a;return-0.5*((a-=2)*a*a*a-2)};TWEEN.Easing.Quintic.EaseIn=function(a){return a*a*a*a*a};TWEEN.Easing.Quintic.EaseOut=function(a){return(a-=1)*a*a*a*a+1};TWEEN.Easing.Quintic.EaseInOut=function(a){if((a*=2)<1)return 0.5*a*a*a*a*a;return 0.5*((a-=2)*a*a*a*a+2)};TWEEN.Easing.Sinusoidal.EaseIn=function(a){return-Math.cos(a*Math.PI/2)+1};
TWEEN.Easing.Sinusoidal.EaseOut=function(a){return Math.sin(a*Math.PI/2)};TWEEN.Easing.Sinusoidal.EaseInOut=function(a){return-0.5*(Math.cos(Math.PI*a)-1)};TWEEN.Easing.Exponential.EaseIn=function(a){return a==0?0:Math.pow(2,10*(a-1))};TWEEN.Easing.Exponential.EaseOut=function(a){return a==1?1:-Math.pow(2,-10*a)+1};TWEEN.Easing.Exponential.EaseInOut=function(a){if(a==0)return 0;if(a==1)return 1;if((a*=2)<1)return 0.5*Math.pow(2,10*(a-1));return 0.5*(-Math.pow(2,-10*(a-1))+2)};
TWEEN.Easing.Circular.EaseIn=function(a){return-(Math.sqrt(1-a*a)-1)};TWEEN.Easing.Circular.EaseOut=function(a){return Math.sqrt(1- --a*a)};TWEEN.Easing.Circular.EaseInOut=function(a){if((a/=0.5)<1)return-0.5*(Math.sqrt(1-a*a)-1);return 0.5*(Math.sqrt(1-(a-=2)*a)+1)};TWEEN.Easing.Elastic.EaseIn=function(a){var e,d=0.1,b=0.4;if(a==0)return 0;if(a==1)return 1;b||(b=0.3);if(!d||d<1){d=1;e=b/4}else e=b/(2*Math.PI)*Math.asin(1/d);return-(d*Math.pow(2,10*(a-=1))*Math.sin((a-e)*2*Math.PI/b))};
TWEEN.Easing.Elastic.EaseOut=function(a){var e,d=0.1,b=0.4;if(a==0)return 0;if(a==1)return 1;b||(b=0.3);if(!d||d<1){d=1;e=b/4}else e=b/(2*Math.PI)*Math.asin(1/d);return d*Math.pow(2,-10*a)*Math.sin((a-e)*2*Math.PI/b)+1};
TWEEN.Easing.Elastic.EaseInOut=function(a){var e,d=0.1,b=0.4;if(a==0)return 0;if(a==1)return 1;b||(b=0.3);if(!d||d<1){d=1;e=b/4}else e=b/(2*Math.PI)*Math.asin(1/d);if((a*=2)<1)return-0.5*d*Math.pow(2,10*(a-=1))*Math.sin((a-e)*2*Math.PI/b);return d*Math.pow(2,-10*(a-=1))*Math.sin((a-e)*2*Math.PI/b)*0.5+1};TWEEN.Easing.Back.EaseIn=function(a){return a*a*(2.70158*a-1.70158)};TWEEN.Easing.Back.EaseOut=function(a){return(a-=1)*a*(2.70158*a+1.70158)+1};
TWEEN.Easing.Back.EaseInOut=function(a){if((a*=2)<1)return 0.5*a*a*(3.5949095*a-2.5949095);return 0.5*((a-=2)*a*(3.5949095*a+2.5949095)+2)};TWEEN.Easing.Bounce.EaseIn=function(a){return 1-TWEEN.Easing.Bounce.EaseOut(1-a)};TWEEN.Easing.Bounce.EaseOut=function(a){return(a/=1)<1/2.75?7.5625*a*a:a<2/2.75?7.5625*(a-=1.5/2.75)*a+0.75:a<2.5/2.75?7.5625*(a-=2.25/2.75)*a+0.9375:7.5625*(a-=2.625/2.75)*a+0.984375};
TWEEN.Easing.Bounce.EaseInOut=function(a){if(a<0.5)return TWEEN.Easing.Bounce.EaseIn(a*2)*0.5;return TWEEN.Easing.Bounce.EaseOut(a*2-1)*0.5+0.5};

// Three.js r40 - http://github.com/mrdoob/three.js
var THREE=THREE||{};if(!window.Int32Array){window.Int32Array=Array;window.Float32Array=Array}THREE.Color=function(b){this.setHex(b)};
THREE.Color.prototype={copy:function(b){this.r=b.r;this.g=b.g;this.b=b.b;this.hex=b.hex},setHex:function(b){this.hex=~~b&16777215;this.updateRGB()},setRGB:function(b,d,c){this.r=b;this.g=d;this.b=c;this.updateHex()},setHSV:function(b,d,c){var f,g,h,j,k,m;if(c==0)f=g=h=0;else{j=Math.floor(b*6);k=b*6-j;b=c*(1-d);m=c*(1-d*k);d=c*(1-d*(1-k));switch(j){case 1:f=m;g=c;h=b;break;case 2:f=b;g=c;h=d;break;case 3:f=b;g=m;h=c;break;case 4:f=d;g=b;h=c;break;case 5:f=c;g=b;h=m;break;case 6:case 0:f=c;g=d;h=b}}this.setRGB(f,
g,h)},updateHex:function(){this.hex=~~(this.r*255)<<16^~~(this.g*255)<<8^~~(this.b*255)},updateRGB:function(){this.r=(this.hex>>16&255)/255;this.g=(this.hex>>8&255)/255;this.b=(this.hex&255)/255},clone:function(){return new THREE.Color(this.hex)}};THREE.Vector2=function(b,d){this.set(b||0,d||0)};
THREE.Vector2.prototype={set:function(b,d){this.x=b;this.y=d;return this},copy:function(b){this.set(b.x,b.y);return this},addSelf:function(b){this.set(this.x+b.x,this.y+b.y);return this},add:function(b,d){this.set(b.x+d.x,b.y+d.y);return this},subSelf:function(b){this.set(this.x-b.x,this.y-b.y);return this},sub:function(b,d){this.set(b.x-d.x,b.y-d.y);return this},multiplyScalar:function(b){this.set(this.x*b,this.y*b);return this},negate:function(){this.set(-this.x,-this.y);return this},unit:function(){this.multiplyScalar(1/
this.length());return this},length:function(){return Math.sqrt(this.lengthSq())},lengthSq:function(){return this.x*this.x+this.y*this.y},clone:function(){return new THREE.Vector2(this.x,this.y)}};THREE.Vector3=function(b,d,c){this.set(b||0,d||0,c||0)};
THREE.Vector3.prototype={set:function(b,d,c){this.x=b;this.y=d;this.z=c;return this},copy:function(b){this.set(b.x,b.y,b.z);return this},add:function(b,d){this.set(b.x+d.x,b.y+d.y,b.z+d.z);return this},addSelf:function(b){this.set(this.x+b.x,this.y+b.y,this.z+b.z);return this},addScalar:function(b){this.set(this.x+b,this.y+b,this.z+b);return this},sub:function(b,d){this.set(b.x-d.x,b.y-d.y,b.z-d.z);return this},subSelf:function(b){this.set(this.x-b.x,this.y-b.y,this.z-b.z);return this},cross:function(b,
d){this.set(b.y*d.z-b.z*d.y,b.z*d.x-b.x*d.z,b.x*d.y-b.y*d.x);return this},crossSelf:function(b){var d=this.x,c=this.y,f=this.z;this.set(c*b.z-f*b.y,f*b.x-d*b.z,d*b.y-c*b.x);return this},multiply:function(b,d){this.set(b.x*d.x,b.y*d.y,b.z*d.z);return this},multiplySelf:function(b){this.set(this.x*b.x,this.y*b.y,this.z*b.z);return this},multiplyScalar:function(b){this.set(this.x*b,this.y*b,this.z*b);return this},divideSelf:function(b){this.set(this.x/b.x,this.y/b.y,this.z/b.z);return this},divideScalar:function(b){this.set(this.x/
b,this.y/b,this.z/b);return this},negate:function(){this.set(-this.x,-this.y,-this.z);return this},dot:function(b){return this.x*b.x+this.y*b.y+this.z*b.z},distanceTo:function(b){return Math.sqrt(this.distanceToSquared(b))},distanceToSquared:function(b){var d=this.x-b.x,c=this.y-b.y;b=this.z-b.z;return d*d+c*c+b*b},length:function(){return Math.sqrt(this.lengthSq())},lengthSq:function(){return this.x*this.x+this.y*this.y+this.z*this.z},lengthManhattan:function(){return this.x+this.y+this.z},normalize:function(){var b=
this.length();b>0?this.multiplyScalar(1/b):this.set(0,0,0);return this},setPositionFromMatrix:function(b){this.x=b.n14;this.y=b.n24;this.z=b.n34},setRotationFromMatrix:function(b){var d=Math.cos(this.y);this.y=Math.asin(b.n13);if(Math.abs(d)>1.0E-5){this.x=Math.atan2(-b.n23/d,b.n33/d);this.z=Math.atan2(-b.n12/d,b.n11/d)}else{this.x=0;this.z=Math.atan2(b.n21,b.n22)}},setLength:function(b){return this.normalize().multiplyScalar(b)},isZero:function(){return Math.abs(this.x)<1.0E-4&&Math.abs(this.y)<
1.0E-4&&Math.abs(this.z)<1.0E-4},clone:function(){return new THREE.Vector3(this.x,this.y,this.z)}};THREE.Vector4=function(b,d,c,f){this.set(b||0,d||0,c||0,f||1)};
THREE.Vector4.prototype={set:function(b,d,c,f){this.x=b;this.y=d;this.z=c;this.w=f;return this},copy:function(b){this.set(b.x,b.y,b.z,b.w||1);return this},add:function(b,d){this.set(b.x+d.x,b.y+d.y,b.z+d.z,b.w+d.w);return this},addSelf:function(b){this.set(this.x+b.x,this.y+b.y,this.z+b.z,this.w+b.w);return this},sub:function(b,d){this.set(b.x-d.x,b.y-d.y,b.z-d.z,b.w-d.w);return this},subSelf:function(b){this.set(this.x-b.x,this.y-b.y,this.z-b.z,this.w-b.w);return this},multiplyScalar:function(b){this.set(this.x*
b,this.y*b,this.z*b,this.w*b);return this},divideScalar:function(b){this.set(this.x/b,this.y/b,this.z/b,this.w/b);return this},lerpSelf:function(b,d){this.set(this.x+(b.x-this.x)*d,this.y+(b.y-this.y)*d,this.z+(b.z-this.z)*d,this.w+(b.w-this.w)*d)},clone:function(){return new THREE.Vector4(this.x,this.y,this.z,this.w)}};THREE.Ray=function(b,d){this.origin=b||new THREE.Vector3;this.direction=d||new THREE.Vector3};
THREE.Ray.prototype={intersectScene:function(b){var d,c,f=b.objects,g=[];b=0;for(d=f.length;b<d;b++){c=f[b];c instanceof THREE.Mesh&&(g=g.concat(this.intersectObject(c)))}g.sort(function(h,j){return h.distance-j.distance});return g},intersectObject:function(b){function d(F,B,T,C){C=C.clone().subSelf(B);T=T.clone().subSelf(B);var V=F.clone().subSelf(B);F=C.dot(C);B=C.dot(T);C=C.dot(V);var P=T.dot(T);T=T.dot(V);V=1/(F*P-B*B);P=(P*C-B*T)*V;F=(F*T-B*C)*V;return P>0&&F>0&&P+F<1}var c,f,g,h,j,k,m,o,t,u,
w,p=b.geometry,z=p.vertices,G=[];c=0;for(f=p.faces.length;c<f;c++){g=p.faces[c];u=this.origin.clone();w=this.direction.clone();m=b.matrixWorld;h=m.multiplyVector3(z[g.a].position.clone());j=m.multiplyVector3(z[g.b].position.clone());k=m.multiplyVector3(z[g.c].position.clone());m=g instanceof THREE.Face4?m.multiplyVector3(z[g.d].position.clone()):null;o=b.matrixRotationWorld.multiplyVector3(g.normal.clone());t=w.dot(o);if(b.doubleSided||(b.flipSided?t>0:t<0)){o=o.dot((new THREE.Vector3).sub(h,u))/
t;u=u.addSelf(w.multiplyScalar(o));if(g instanceof THREE.Face3){if(d(u,h,j,k)){g={distance:this.origin.distanceTo(u),point:u,face:g,object:b};G.push(g)}}else if(g instanceof THREE.Face4&&(d(u,h,j,m)||d(u,j,k,m))){g={distance:this.origin.distanceTo(u),point:u,face:g,object:b};G.push(g)}}}return G}};
THREE.Rectangle=function(){function b(){h=f-d;j=g-c}var d,c,f,g,h,j,k=!0;this.getX=function(){return d};this.getY=function(){return c};this.getWidth=function(){return h};this.getHeight=function(){return j};this.getLeft=function(){return d};this.getTop=function(){return c};this.getRight=function(){return f};this.getBottom=function(){return g};this.set=function(m,o,t,u){k=!1;d=m;c=o;f=t;g=u;b()};this.addPoint=function(m,o){if(k){k=!1;d=m;c=o;f=m;g=o}else{d=d<m?d:m;c=c<o?c:o;f=f>m?f:m;g=g>o?g:o}b()};
this.add3Points=function(m,o,t,u,w,p){if(k){k=!1;d=m<t?m<w?m:w:t<w?t:w;c=o<u?o<p?o:p:u<p?u:p;f=m>t?m>w?m:w:t>w?t:w;g=o>u?o>p?o:p:u>p?u:p}else{d=m<t?m<w?m<d?m:d:w<d?w:d:t<w?t<d?t:d:w<d?w:d;c=o<u?o<p?o<c?o:c:p<c?p:c:u<p?u<c?u:c:p<c?p:c;f=m>t?m>w?m>f?m:f:w>f?w:f:t>w?t>f?t:f:w>f?w:f;g=o>u?o>p?o>g?o:g:p>g?p:g:u>p?u>g?u:g:p>g?p:g}b()};this.addRectangle=function(m){if(k){k=!1;d=m.getLeft();c=m.getTop();f=m.getRight();g=m.getBottom()}else{d=d<m.getLeft()?d:m.getLeft();c=c<m.getTop()?c:m.getTop();f=f>m.getRight()?
f:m.getRight();g=g>m.getBottom()?g:m.getBottom()}b()};this.inflate=function(m){d-=m;c-=m;f+=m;g+=m;b()};this.minSelf=function(m){d=d>m.getLeft()?d:m.getLeft();c=c>m.getTop()?c:m.getTop();f=f<m.getRight()?f:m.getRight();g=g<m.getBottom()?g:m.getBottom();b()};this.instersects=function(m){return Math.min(f,m.getRight())-Math.max(d,m.getLeft())>=0&&Math.min(g,m.getBottom())-Math.max(c,m.getTop())>=0};this.empty=function(){k=!0;g=f=c=d=0;b()};this.isEmpty=function(){return k}};
THREE.Matrix3=function(){this.m=[]};THREE.Matrix3.prototype={transpose:function(){var b,d=this.m;b=d[1];d[1]=d[3];d[3]=b;b=d[2];d[2]=d[6];d[6]=b;b=d[5];d[5]=d[7];d[7]=b;return this},transposeIntoArray:function(b){var d=this.m;b[0]=d[0];b[1]=d[3];b[2]=d[6];b[3]=d[1];b[4]=d[4];b[5]=d[7];b[6]=d[2];b[7]=d[5];b[8]=d[8];return this}};
THREE.Matrix4=function(b,d,c,f,g,h,j,k,m,o,t,u,w,p,z,G){this.set(b||1,d||0,c||0,f||0,g||0,h||1,j||0,k||0,m||0,o||0,t||1,u||0,w||0,p||0,z||0,G||1);this.flat=Array(16);this.m33=new THREE.Matrix3};
THREE.Matrix4.prototype={set:function(b,d,c,f,g,h,j,k,m,o,t,u,w,p,z,G){this.n11=b;this.n12=d;this.n13=c;this.n14=f;this.n21=g;this.n22=h;this.n23=j;this.n24=k;this.n31=m;this.n32=o;this.n33=t;this.n34=u;this.n41=w;this.n42=p;this.n43=z;this.n44=G;return this},identity:function(){this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);return this},copy:function(b){this.set(b.n11,b.n12,b.n13,b.n14,b.n21,b.n22,b.n23,b.n24,b.n31,b.n32,b.n33,b.n34,b.n41,b.n42,b.n43,b.n44);return this},lookAt:function(b,d,c){var f=THREE.Matrix4.__v1,
g=THREE.Matrix4.__v2,h=THREE.Matrix4.__v3;h.sub(b,d).normalize();if(h.length()===0)h.z=1;f.cross(c,h).normalize();if(f.length()===0){h.x+=1.0E-4;f.cross(c,h).normalize()}g.cross(h,f).normalize();this.n11=f.x;this.n12=g.x;this.n13=h.x;this.n21=f.y;this.n22=g.y;this.n23=h.y;this.n31=f.z;this.n32=g.z;this.n33=h.z;return this},multiplyVector3:function(b){var d=b.x,c=b.y,f=b.z,g=1/(this.n41*d+this.n42*c+this.n43*f+this.n44);b.x=(this.n11*d+this.n12*c+this.n13*f+this.n14)*g;b.y=(this.n21*d+this.n22*c+this.n23*
f+this.n24)*g;b.z=(this.n31*d+this.n32*c+this.n33*f+this.n34)*g;return b},multiplyVector4:function(b){var d=b.x,c=b.y,f=b.z,g=b.w;b.x=this.n11*d+this.n12*c+this.n13*f+this.n14*g;b.y=this.n21*d+this.n22*c+this.n23*f+this.n24*g;b.z=this.n31*d+this.n32*c+this.n33*f+this.n34*g;b.w=this.n41*d+this.n42*c+this.n43*f+this.n44*g;return b},rotateAxis:function(b){var d=b.x,c=b.y,f=b.z;b.x=d*this.n11+c*this.n12+f*this.n13;b.y=d*this.n21+c*this.n22+f*this.n23;b.z=d*this.n31+c*this.n32+f*this.n33;b.normalize();
return b},crossVector:function(b){var d=new THREE.Vector4;d.x=this.n11*b.x+this.n12*b.y+this.n13*b.z+this.n14*b.w;d.y=this.n21*b.x+this.n22*b.y+this.n23*b.z+this.n24*b.w;d.z=this.n31*b.x+this.n32*b.y+this.n33*b.z+this.n34*b.w;d.w=b.w?this.n41*b.x+this.n42*b.y+this.n43*b.z+this.n44*b.w:1;return d},multiply:function(b,d){var c=b.n11,f=b.n12,g=b.n13,h=b.n14,j=b.n21,k=b.n22,m=b.n23,o=b.n24,t=b.n31,u=b.n32,w=b.n33,p=b.n34,z=b.n41,G=b.n42,F=b.n43,B=b.n44,T=d.n11,C=d.n12,V=d.n13,P=d.n14,Q=d.n21,ka=d.n22,
ea=d.n23,pa=d.n24,aa=d.n31,oa=d.n32,e=d.n33,xa=d.n34;this.n11=c*T+f*Q+g*aa;this.n12=c*C+f*ka+g*oa;this.n13=c*V+f*ea+g*e;this.n14=c*P+f*pa+g*xa+h;this.n21=j*T+k*Q+m*aa;this.n22=j*C+k*ka+m*oa;this.n23=j*V+k*ea+m*e;this.n24=j*P+k*pa+m*xa+o;this.n31=t*T+u*Q+w*aa;this.n32=t*C+u*ka+w*oa;this.n33=t*V+u*ea+w*e;this.n34=t*P+u*pa+w*xa+p;this.n41=z*T+G*Q+F*aa;this.n42=z*C+G*ka+F*oa;this.n43=z*V+G*ea+F*e;this.n44=z*P+G*pa+F*xa+B;return this},multiplyToArray:function(b,d,c){this.multiply(b,d);c[0]=this.n11;c[1]=
this.n21;c[2]=this.n31;c[3]=this.n41;c[4]=this.n12;c[5]=this.n22;c[6]=this.n32;c[7]=this.n42;c[8]=this.n13;c[9]=this.n23;c[10]=this.n33;c[11]=this.n43;c[12]=this.n14;c[13]=this.n24;c[14]=this.n34;c[15]=this.n44;return this},multiplySelf:function(b){this.multiply(this,b);return this},multiplyScalar:function(b){this.n11*=b;this.n12*=b;this.n13*=b;this.n14*=b;this.n21*=b;this.n22*=b;this.n23*=b;this.n24*=b;this.n31*=b;this.n32*=b;this.n33*=b;this.n34*=b;this.n41*=b;this.n42*=b;this.n43*=b;this.n44*=
b;return this},determinant:function(){var b=this.n11,d=this.n12,c=this.n13,f=this.n14,g=this.n21,h=this.n22,j=this.n23,k=this.n24,m=this.n31,o=this.n32,t=this.n33,u=this.n34,w=this.n41,p=this.n42,z=this.n43,G=this.n44;return f*j*o*w-c*k*o*w-f*h*t*w+d*k*t*w+c*h*u*w-d*j*u*w-f*j*m*p+c*k*m*p+f*g*t*p-b*k*t*p-c*g*u*p+b*j*u*p+f*h*m*z-d*k*m*z-f*g*o*z+b*k*o*z+d*g*u*z-b*h*u*z-c*h*m*G+d*j*m*G+c*g*o*G-b*j*o*G-d*g*t*G+b*h*t*G},transpose:function(){var b;b=this.n21;this.n21=this.n12;this.n12=b;b=this.n31;this.n31=
this.n13;this.n13=b;b=this.n32;this.n32=this.n23;this.n23=b;b=this.n41;this.n41=this.n14;this.n14=b;b=this.n42;this.n42=this.n24;this.n24=b;b=this.n43;this.n43=this.n34;this.n43=b;return this},clone:function(){var b=new THREE.Matrix4;b.n11=this.n11;b.n12=this.n12;b.n13=this.n13;b.n14=this.n14;b.n21=this.n21;b.n22=this.n22;b.n23=this.n23;b.n24=this.n24;b.n31=this.n31;b.n32=this.n32;b.n33=this.n33;b.n34=this.n34;b.n41=this.n41;b.n42=this.n42;b.n43=this.n43;b.n44=this.n44;return b},flatten:function(){this.flat[0]=
this.n11;this.flat[1]=this.n21;this.flat[2]=this.n31;this.flat[3]=this.n41;this.flat[4]=this.n12;this.flat[5]=this.n22;this.flat[6]=this.n32;this.flat[7]=this.n42;this.flat[8]=this.n13;this.flat[9]=this.n23;this.flat[10]=this.n33;this.flat[11]=this.n43;this.flat[12]=this.n14;this.flat[13]=this.n24;this.flat[14]=this.n34;this.flat[15]=this.n44;return this.flat},flattenToArray:function(b){b[0]=this.n11;b[1]=this.n21;b[2]=this.n31;b[3]=this.n41;b[4]=this.n12;b[5]=this.n22;b[6]=this.n32;b[7]=this.n42;
b[8]=this.n13;b[9]=this.n23;b[10]=this.n33;b[11]=this.n43;b[12]=this.n14;b[13]=this.n24;b[14]=this.n34;b[15]=this.n44;return b},flattenToArrayOffset:function(b,d){b[d]=this.n11;b[d+1]=this.n21;b[d+2]=this.n31;b[d+3]=this.n41;b[d+4]=this.n12;b[d+5]=this.n22;b[d+6]=this.n32;b[d+7]=this.n42;b[d+8]=this.n13;b[d+9]=this.n23;b[d+10]=this.n33;b[d+11]=this.n43;b[d+12]=this.n14;b[d+13]=this.n24;b[d+14]=this.n34;b[d+15]=this.n44;return b},setTranslation:function(b,d,c){this.set(1,0,0,b,0,1,0,d,0,0,1,c,0,0,
0,1);return this},setScale:function(b,d,c){this.set(b,0,0,0,0,d,0,0,0,0,c,0,0,0,0,1);return this},setRotationX:function(b){var d=Math.cos(b);b=Math.sin(b);this.set(1,0,0,0,0,d,-b,0,0,b,d,0,0,0,0,1);return this},setRotationY:function(b){var d=Math.cos(b);b=Math.sin(b);this.set(d,0,b,0,0,1,0,0,-b,0,d,0,0,0,0,1);return this},setRotationZ:function(b){var d=Math.cos(b);b=Math.sin(b);this.set(d,-b,0,0,b,d,0,0,0,0,1,0,0,0,0,1);return this},setRotationAxis:function(b,d){var c=Math.cos(d),f=Math.sin(d),g=
1-c,h=b.x,j=b.y,k=b.z,m=g*h,o=g*j;this.set(m*h+c,m*j-f*k,m*k+f*j,0,m*j+f*k,o*j+c,o*k-f*h,0,m*k-f*j,o*k+f*h,g*k*k+c,0,0,0,0,1);return this},setPosition:function(b){this.n14=b.x;this.n24=b.y;this.n34=b.z;return this},getPosition:function(){if(!this.position)this.position=new THREE.Vector3;this.position.set(this.n14,this.n24,this.n34);return this.position},getColumnX:function(){if(!this.columnX)this.columnX=new THREE.Vector3;this.columnX.set(this.n11,this.n21,this.n31);return this.columnX},getColumnY:function(){if(!this.columnY)this.columnY=
new THREE.Vector3;this.columnY.set(this.n12,this.n22,this.n32);return this.columnY},getColumnZ:function(){if(!this.columnZ)this.columnZ=new THREE.Vector3;this.columnZ.set(this.n13,this.n23,this.n33);return this.columnZ},setRotationFromEuler:function(b){var d=b.x,c=b.y,f=b.z;b=Math.cos(d);d=Math.sin(d);var g=Math.cos(c);c=Math.sin(c);var h=Math.cos(f);f=Math.sin(f);var j=b*c,k=d*c;this.n11=g*h;this.n12=-g*f;this.n13=c;this.n21=k*h+b*f;this.n22=-k*f+b*h;this.n23=-d*g;this.n31=-j*h+d*f;this.n32=j*f+
d*h;this.n33=b*g;return this},setRotationFromQuaternion:function(b){var d=b.x,c=b.y,f=b.z,g=b.w,h=d+d,j=c+c,k=f+f;b=d*h;var m=d*j;d*=k;var o=c*j;c*=k;f*=k;h*=g;j*=g;g*=k;this.n11=1-(o+f);this.n12=m-g;this.n13=d+j;this.n21=m+g;this.n22=1-(b+f);this.n23=c-h;this.n31=d-j;this.n32=c+h;this.n33=1-(b+o);return this},scale:function(b){var d=b.x,c=b.y;b=b.z;this.n11*=d;this.n12*=c;this.n13*=b;this.n21*=d;this.n22*=c;this.n23*=b;this.n31*=d;this.n32*=c;this.n33*=b;this.n41*=d;this.n42*=c;this.n43*=b;return this},
extractPosition:function(b){this.n14=b.n14;this.n24=b.n24;this.n34=b.n34},extractRotation:function(b,d){var c=1/d.x,f=1/d.y,g=1/d.z;this.n11=b.n11*c;this.n21=b.n21*c;this.n31=b.n31*c;this.n12=b.n12*f;this.n22=b.n22*f;this.n32=b.n32*f;this.n13=b.n13*g;this.n23=b.n23*g;this.n33=b.n33*g}};
THREE.Matrix4.makeInvert=function(b,d){var c=b.n11,f=b.n12,g=b.n13,h=b.n14,j=b.n21,k=b.n22,m=b.n23,o=b.n24,t=b.n31,u=b.n32,w=b.n33,p=b.n34,z=b.n41,G=b.n42,F=b.n43,B=b.n44;d===undefined&&(d=new THREE.Matrix4);d.n11=m*p*G-o*w*G+o*u*F-k*p*F-m*u*B+k*w*B;d.n12=h*w*G-g*p*G-h*u*F+f*p*F+g*u*B-f*w*B;d.n13=g*o*G-h*m*G+h*k*F-f*o*F-g*k*B+f*m*B;d.n14=h*m*u-g*o*u-h*k*w+f*o*w+g*k*p-f*m*p;d.n21=o*w*z-m*p*z-o*t*F+j*p*F+m*t*B-j*w*B;d.n22=g*p*z-h*w*z+h*t*F-c*p*F-g*t*B+c*w*B;d.n23=h*m*z-g*o*z-h*j*F+c*o*F+g*j*B-c*m*B;
d.n24=g*o*t-h*m*t+h*j*w-c*o*w-g*j*p+c*m*p;d.n31=k*p*z-o*u*z+o*t*G-j*p*G-k*t*B+j*u*B;d.n32=h*u*z-f*p*z-h*t*G+c*p*G+f*t*B-c*u*B;d.n33=g*o*z-h*k*z+h*j*G-c*o*G-f*j*B+c*k*B;d.n34=h*k*t-f*o*t-h*j*u+c*o*u+f*j*p-c*k*p;d.n41=m*u*z-k*w*z-m*t*G+j*w*G+k*t*F-j*u*F;d.n42=f*w*z-g*u*z+g*t*G-c*w*G-f*t*F+c*u*F;d.n43=g*k*z-f*m*z-g*j*G+c*m*G+f*j*F-c*k*F;d.n44=f*m*t-g*k*t+g*j*u-c*m*u-f*j*w+c*k*w;d.multiplyScalar(1/b.determinant());return d};
THREE.Matrix4.makeInvert3x3=function(b){var d=b.m33,c=d.m,f=b.n33*b.n22-b.n32*b.n23,g=-b.n33*b.n21+b.n31*b.n23,h=b.n32*b.n21-b.n31*b.n22,j=-b.n33*b.n12+b.n32*b.n13,k=b.n33*b.n11-b.n31*b.n13,m=-b.n32*b.n11+b.n31*b.n12,o=b.n23*b.n12-b.n22*b.n13,t=-b.n23*b.n11+b.n21*b.n13,u=b.n22*b.n11-b.n21*b.n12;b=b.n11*f+b.n21*j+b.n31*o;if(b==0)throw"matrix not invertible";b=1/b;c[0]=b*f;c[1]=b*g;c[2]=b*h;c[3]=b*j;c[4]=b*k;c[5]=b*m;c[6]=b*o;c[7]=b*t;c[8]=b*u;return d};
THREE.Matrix4.makeFrustum=function(b,d,c,f,g,h){var j;j=new THREE.Matrix4;j.n11=2*g/(d-b);j.n12=0;j.n13=(d+b)/(d-b);j.n14=0;j.n21=0;j.n22=2*g/(f-c);j.n23=(f+c)/(f-c);j.n24=0;j.n31=0;j.n32=0;j.n33=-(h+g)/(h-g);j.n34=-2*h*g/(h-g);j.n41=0;j.n42=0;j.n43=-1;j.n44=0;return j};THREE.Matrix4.makePerspective=function(b,d,c,f){var g;b=c*Math.tan(b*Math.PI/360);g=-b;return THREE.Matrix4.makeFrustum(g*d,b*d,g,b,c,f)};
THREE.Matrix4.makeOrtho=function(b,d,c,f,g,h){var j,k,m,o;j=new THREE.Matrix4;k=d-b;m=c-f;o=h-g;j.n11=2/k;j.n12=0;j.n13=0;j.n14=-((d+b)/k);j.n21=0;j.n22=2/m;j.n23=0;j.n24=-((c+f)/m);j.n31=0;j.n32=0;j.n33=-2/o;j.n34=-((h+g)/o);j.n41=0;j.n42=0;j.n43=0;j.n44=1;return j};THREE.Matrix4.__v1=new THREE.Vector3;THREE.Matrix4.__v2=new THREE.Vector3;THREE.Matrix4.__v3=new THREE.Vector3;
THREE.Object3D=function(){this.parent=undefined;this.children=[];this.up=new THREE.Vector3(0,1,0);this.position=new THREE.Vector3;this.rotation=new THREE.Vector3;this.scale=new THREE.Vector3(1,1,1);this.rotationAutoUpdate=!0;this.matrix=new THREE.Matrix4;this.matrixWorld=new THREE.Matrix4;this.matrixRotationWorld=new THREE.Matrix4;this.matrixAutoUpdate=!0;this.matrixWorldNeedsUpdate=!0;this.quaternion=new THREE.Quaternion;this.useQuaternion=!1;this.boundRadius=0;this.boundRadiusScale=1;this.visible=
!0;this._vector=new THREE.Vector3;this.name=""};
THREE.Object3D.prototype={translate:function(b,d){this.matrix.rotateAxis(d);this.position.addSelf(d.multiplyScalar(b))},translateX:function(b){this.translate(b,this._vector.set(1,0,0))},translateY:function(b){this.translate(b,this._vector.set(0,1,0))},translateZ:function(b){this.translate(b,this._vector.set(0,0,1))},lookAt:function(b){this.matrix.lookAt(b,this.position,this.up);this.rotationAutoUpdate&&this.rotation.setRotationFromMatrix(this.matrix)},addChild:function(b){if(this.children.indexOf(b)===
-1){b.parent!==undefined&&b.parent.removeChild(b);b.parent=this;this.children.push(b);for(var d=this;d.parent!==undefined;)d=d.parent;d!==undefined&&d instanceof THREE.Scene&&d.addChildRecurse(b)}},removeChild:function(b){var d=this.children.indexOf(b);if(d!==-1){b.parent=undefined;this.children.splice(d,1)}},getChildByName:function(b,d){var c,f,g;c=0;for(f=this.children.length;c<f;c++){g=this.children[c];if(g.name===b)return g;if(d){g=g.getChildByName(b,d);if(g!==undefined)return g}}},updateMatrix:function(){this.matrix.setPosition(this.position);
this.useQuaternion?this.matrix.setRotationFromQuaternion(this.quaternion):this.matrix.setRotationFromEuler(this.rotation);if(this.scale.x!==1||this.scale.y!==1||this.scale.z!==1){this.matrix.scale(this.scale);this.boundRadiusScale=Math.max(this.scale.x,Math.max(this.scale.y,this.scale.z))}this.matrixWorldNeedsUpdate=!0},update:function(b,d,c){this.matrixAutoUpdate&&this.updateMatrix();if(this.matrixWorldNeedsUpdate||d){b?this.matrixWorld.multiply(b,this.matrix):this.matrixWorld.copy(this.matrix);
this.matrixRotationWorld.extractRotation(this.matrixWorld,this.scale);this.matrixWorldNeedsUpdate=!1;d=!0}b=0;for(var f=this.children.length;b<f;b++)this.children[b].update(this.matrixWorld,d,c)}};THREE.Quaternion=function(b,d,c,f){this.set(b||0,d||0,c||0,f!==undefined?f:1)};
THREE.Quaternion.prototype={set:function(b,d,c,f){this.x=b;this.y=d;this.z=c;this.w=f;return this},copy:function(b){this.x=b.x;this.y=b.y;this.z=b.z;this.w=b.w;return this},setFromEuler:function(b){var d=0.5*Math.PI/360,c=b.x*d,f=b.y*d,g=b.z*d;b=Math.cos(f);f=Math.sin(f);d=Math.cos(-g);g=Math.sin(-g);var h=Math.cos(c);c=Math.sin(c);var j=b*d,k=f*g;this.w=j*h-k*c;this.x=j*c+k*h;this.y=f*d*h+b*g*c;this.z=b*g*h-f*d*c;return this},setFromAxisAngle:function(b,d){var c=d/2,f=Math.sin(c);this.x=b.x*f;this.y=
b.y*f;this.z=b.z*f;this.w=Math.cos(c);return this},calculateW:function(){this.w=-Math.sqrt(Math.abs(1-this.x*this.x-this.y*this.y-this.z*this.z));return this},inverse:function(){this.x*=-1;this.y*=-1;this.z*=-1;return this},length:function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)},normalize:function(){var b=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);if(b==0)this.w=this.z=this.y=this.x=0;else{b=1/b;this.x*=b;this.y*=b;this.z*=b;this.w*=b}return this},
multiplySelf:function(b){var d=this.x,c=this.y,f=this.z,g=this.w,h=b.x,j=b.y,k=b.z;b=b.w;this.x=d*b+g*h+c*k-f*j;this.y=c*b+g*j+f*h-d*k;this.z=f*b+g*k+d*j-c*h;this.w=g*b-d*h-c*j-f*k;return this},multiply:function(b,d){this.x=b.x*d.w+b.y*d.z-b.z*d.y+b.w*d.x;this.y=-b.x*d.z+b.y*d.w+b.z*d.x+b.w*d.y;this.z=b.x*d.y-b.y*d.x+b.z*d.w+b.w*d.z;this.w=-b.x*d.x-b.y*d.y-b.z*d.z+b.w*d.w;return this},multiplyVector3:function(b,d){d||(d=b);var c=b.x,f=b.y,g=b.z,h=this.x,j=this.y,k=this.z,m=this.w,o=m*c+j*g-k*f,t=
m*f+k*c-h*g,u=m*g+h*f-j*c;c=-h*c-j*f-k*g;d.x=o*m+c*-h+t*-k-u*-j;d.y=t*m+c*-j+u*-h-o*-k;d.z=u*m+c*-k+o*-j-t*-h;return d}};
THREE.Quaternion.slerp=function(b,d,c,f){var g=b.w*d.w+b.x*d.x+b.y*d.y+b.z*d.z;if(Math.abs(g)>=1){c.w=b.w;c.x=b.x;c.y=b.y;c.z=b.z;return c}var h=Math.acos(g),j=Math.sqrt(1-g*g);if(Math.abs(j)<0.001){c.w=0.5*(b.w+d.w);c.x=0.5*(b.x+d.x);c.y=0.5*(b.y+d.y);c.z=0.5*(b.z+d.z);return c}g=Math.sin((1-f)*h)/j;f=Math.sin(f*h)/j;c.w=b.w*g+d.w*f;c.x=b.x*g+d.x*f;c.y=b.y*g+d.y*f;c.z=b.z*g+d.z*f;return c};THREE.Vertex=function(b){this.position=b||new THREE.Vector3};
THREE.Face3=function(b,d,c,f,g,h){this.a=b;this.b=d;this.c=c;this.normal=f instanceof THREE.Vector3?f:new THREE.Vector3;this.vertexNormals=f instanceof Array?f:[];this.color=g instanceof THREE.Color?g:new THREE.Color;this.vertexColors=g instanceof Array?g:[];this.vertexTangents=[];this.materials=h instanceof Array?h:[h];this.centroid=new THREE.Vector3};
THREE.Face4=function(b,d,c,f,g,h,j){this.a=b;this.b=d;this.c=c;this.d=f;this.normal=g instanceof THREE.Vector3?g:new THREE.Vector3;this.vertexNormals=g instanceof Array?g:[];this.color=h instanceof THREE.Color?h:new THREE.Color;this.vertexColors=h instanceof Array?h:[];this.vertexTangents=[];this.materials=j instanceof Array?j:[j];this.centroid=new THREE.Vector3};THREE.UV=function(b,d){this.set(b||0,d||0)};
THREE.UV.prototype={set:function(b,d){this.u=b;this.v=d;return this},copy:function(b){this.set(b.u,b.v);return this}};THREE.Geometry=function(){this.id="Geometry"+THREE.GeometryIdCounter++;this.vertices=[];this.colors=[];this.faces=[];this.edges=[];this.faceUvs=[[]];this.faceVertexUvs=[[]];this.morphTargets=[];this.morphColors=[];this.skinWeights=[];this.skinIndices=[];this.boundingSphere=this.boundingBox=null;this.hasTangents=!1};
THREE.Geometry.prototype={computeCentroids:function(){var b,d,c;b=0;for(d=this.faces.length;b<d;b++){c=this.faces[b];c.centroid.set(0,0,0);if(c instanceof THREE.Face3){c.centroid.addSelf(this.vertices[c.a].position);c.centroid.addSelf(this.vertices[c.b].position);c.centroid.addSelf(this.vertices[c.c].position);c.centroid.divideScalar(3)}else if(c instanceof THREE.Face4){c.centroid.addSelf(this.vertices[c.a].position);c.centroid.addSelf(this.vertices[c.b].position);c.centroid.addSelf(this.vertices[c.c].position);
c.centroid.addSelf(this.vertices[c.d].position);c.centroid.divideScalar(4)}}},computeFaceNormals:function(b){var d,c,f,g,h,j,k=new THREE.Vector3,m=new THREE.Vector3;f=0;for(g=this.faces.length;f<g;f++){h=this.faces[f];if(b&&h.vertexNormals.length){k.set(0,0,0);d=0;for(c=h.vertexNormals.length;d<c;d++)k.addSelf(h.vertexNormals[d]);k.divideScalar(3)}else{d=this.vertices[h.a];c=this.vertices[h.b];j=this.vertices[h.c];k.sub(j.position,c.position);m.sub(d.position,c.position);k.crossSelf(m)}k.isZero()||
k.normalize();h.normal.copy(k)}},computeVertexNormals:function(){var b,d,c,f;if(this.__tmpVertices==undefined){f=this.__tmpVertices=Array(this.vertices.length);b=0;for(d=this.vertices.length;b<d;b++)f[b]=new THREE.Vector3;b=0;for(d=this.faces.length;b<d;b++){c=this.faces[b];if(c instanceof THREE.Face3)c.vertexNormals=[new THREE.Vector3,new THREE.Vector3,new THREE.Vector3];else if(c instanceof THREE.Face4)c.vertexNormals=[new THREE.Vector3,new THREE.Vector3,new THREE.Vector3,new THREE.Vector3]}}else{f=
this.__tmpVertices;b=0;for(d=this.vertices.length;b<d;b++)f[b].set(0,0,0)}b=0;for(d=this.faces.length;b<d;b++){c=this.faces[b];if(c instanceof THREE.Face3){f[c.a].addSelf(c.normal);f[c.b].addSelf(c.normal);f[c.c].addSelf(c.normal)}else if(c instanceof THREE.Face4){f[c.a].addSelf(c.normal);f[c.b].addSelf(c.normal);f[c.c].addSelf(c.normal);f[c.d].addSelf(c.normal)}}b=0;for(d=this.vertices.length;b<d;b++)f[b].normalize();b=0;for(d=this.faces.length;b<d;b++){c=this.faces[b];if(c instanceof THREE.Face3){c.vertexNormals[0].copy(f[c.a]);
c.vertexNormals[1].copy(f[c.b]);c.vertexNormals[2].copy(f[c.c])}else if(c instanceof THREE.Face4){c.vertexNormals[0].copy(f[c.a]);c.vertexNormals[1].copy(f[c.b]);c.vertexNormals[2].copy(f[c.c]);c.vertexNormals[3].copy(f[c.d])}}},computeTangents:function(){function b(ra,fa,za,na,ua,qa,ja){k=ra.vertices[fa].position;m=ra.vertices[za].position;o=ra.vertices[na].position;t=j[ua];u=j[qa];w=j[ja];p=m.x-k.x;z=o.x-k.x;G=m.y-k.y;F=o.y-k.y;B=m.z-k.z;T=o.z-k.z;C=u.u-t.u;V=w.u-t.u;P=u.v-t.v;Q=w.v-t.v;ka=1/(C*
Q-V*P);oa.set((Q*p-P*z)*ka,(Q*G-P*F)*ka,(Q*B-P*T)*ka);e.set((C*z-V*p)*ka,(C*F-V*G)*ka,(C*T-V*B)*ka);pa[fa].addSelf(oa);pa[za].addSelf(oa);pa[na].addSelf(oa);aa[fa].addSelf(e);aa[za].addSelf(e);aa[na].addSelf(e)}var d,c,f,g,h,j,k,m,o,t,u,w,p,z,G,F,B,T,C,V,P,Q,ka,ea,pa=[],aa=[],oa=new THREE.Vector3,e=new THREE.Vector3,xa=new THREE.Vector3,sa=new THREE.Vector3,Ba=new THREE.Vector3;d=0;for(c=this.vertices.length;d<c;d++){pa[d]=new THREE.Vector3;aa[d]=new THREE.Vector3}d=0;for(c=this.faces.length;d<c;d++){h=
this.faces[d];j=this.faceVertexUvs[0][d];if(h instanceof THREE.Face3)b(this,h.a,h.b,h.c,0,1,2);else if(h instanceof THREE.Face4){b(this,h.a,h.b,h.c,0,1,2);b(this,h.a,h.b,h.d,0,1,3)}}var ga=["a","b","c","d"];d=0;for(c=this.faces.length;d<c;d++){h=this.faces[d];for(f=0;f<h.vertexNormals.length;f++){Ba.copy(h.vertexNormals[f]);g=h[ga[f]];ea=pa[g];xa.copy(ea);xa.subSelf(Ba.multiplyScalar(Ba.dot(ea))).normalize();sa.cross(h.vertexNormals[f],ea);g=sa.dot(aa[g]);g=g<0?-1:1;h.vertexTangents[f]=new THREE.Vector4(xa.x,
xa.y,xa.z,g)}}this.hasTangents=!0},computeBoundingBox:function(){var b;if(this.vertices.length>0){this.boundingBox={x:[this.vertices[0].position.x,this.vertices[0].position.x],y:[this.vertices[0].position.y,this.vertices[0].position.y],z:[this.vertices[0].position.z,this.vertices[0].position.z]};for(var d=1,c=this.vertices.length;d<c;d++){b=this.vertices[d];if(b.position.x<this.boundingBox.x[0])this.boundingBox.x[0]=b.position.x;else if(b.position.x>this.boundingBox.x[1])this.boundingBox.x[1]=b.position.x;
if(b.position.y<this.boundingBox.y[0])this.boundingBox.y[0]=b.position.y;else if(b.position.y>this.boundingBox.y[1])this.boundingBox.y[1]=b.position.y;if(b.position.z<this.boundingBox.z[0])this.boundingBox.z[0]=b.position.z;else if(b.position.z>this.boundingBox.z[1])this.boundingBox.z[1]=b.position.z}}},computeBoundingSphere:function(){for(var b=this.boundingSphere===null?0:this.boundingSphere.radius,d=0,c=this.vertices.length;d<c;d++)b=Math.max(b,this.vertices[d].position.length());this.boundingSphere=
{radius:b}},computeEdgeFaces:function(){function b(m,o){return Math.min(m,o)+"_"+Math.max(m,o)}function d(m,o,t){if(m[o]===undefined){m[o]={set:{},array:[]};m[o].set[t]=1;m[o].array.push(t)}else if(m[o].set[t]===undefined){m[o].set[t]=1;m[o].array.push(t)}}var c,f,g,h,j,k={};c=0;for(f=this.faces.length;c<f;c++){j=this.faces[c];if(j instanceof THREE.Face3){g=b(j.a,j.b);d(k,g,c);g=b(j.b,j.c);d(k,g,c);g=b(j.a,j.c);d(k,g,c)}else if(j instanceof THREE.Face4){g=b(j.b,j.d);d(k,g,c);g=b(j.a,j.b);d(k,g,c);
g=b(j.a,j.d);d(k,g,c);g=b(j.b,j.c);d(k,g,c);g=b(j.c,j.d);d(k,g,c)}}c=0;for(f=this.edges.length;c<f;c++){j=this.edges[c];g=j.vertexIndices[0];h=j.vertexIndices[1];j.faceIndices=k[b(g,h)].array;for(g=0;g<j.faceIndices.length;g++){h=j.faceIndices[g];j.faces.push(this.faces[h])}}}};THREE.GeometryIdCounter=0;
THREE.Spline=function(b){function d(p,z,G,F,B,T,C){p=(G-p)*0.5;F=(F-z)*0.5;return(2*(z-G)+p+F)*C+(-3*(z-G)-2*p-F)*T+p*B+z}this.points=b;var c=[],f={x:0,y:0,z:0},g,h,j,k,m,o,t,u,w;this.initFromArray=function(p){this.points=[];for(var z=0;z<p.length;z++)this.points[z]={x:p[z][0],y:p[z][1],z:p[z][2]}};this.getPoint=function(p){g=(this.points.length-1)*p;h=Math.floor(g);j=g-h;c[0]=h==0?h:h-1;c[1]=h;c[2]=h>this.points.length-2?h:h+1;c[3]=h>this.points.length-3?h:h+2;o=this.points[c[0]];t=this.points[c[1]];
u=this.points[c[2]];w=this.points[c[3]];k=j*j;m=j*k;f.x=d(o.x,t.x,u.x,w.x,j,k,m);f.y=d(o.y,t.y,u.y,w.y,j,k,m);f.z=d(o.z,t.z,u.z,w.z,j,k,m);return f};this.getControlPointsArray=function(){var p,z,G=this.points.length,F=[];for(p=0;p<G;p++){z=this.points[p];F[p]=[z.x,z.y,z.z]}return F};this.getLength=function(p){var z,G,F=z=z=0,B=new THREE.Vector3,T=new THREE.Vector3,C=[],V=0;C[0]=0;p||(p=100);G=this.points.length*p;B.copy(this.points[0]);for(p=1;p<G;p++){z=p/G;position=this.getPoint(z);T.copy(position);
V+=T.distanceTo(B);B.copy(position);z*=this.points.length-1;z=Math.floor(z);if(z!=F){C[z]=V;F=z}}C[C.length]=V;return{chunks:C,total:V}};this.reparametrizeByArcLength=function(p){var z,G,F,B,T,C,V=[],P=new THREE.Vector3,Q=this.getLength();V.push(P.copy(this.points[0]).clone());for(z=1;z<this.points.length;z++){G=Q.chunks[z]-Q.chunks[z-1];C=Math.ceil(p*G/Q.total);B=(z-1)/(this.points.length-1);T=z/(this.points.length-1);for(G=1;G<C-1;G++){F=B+G*(1/C)*(T-B);position=this.getPoint(F);V.push(P.copy(position).clone())}V.push(P.copy(this.points[z]).clone())}this.points=
V}};THREE.Edge=function(b,d,c,f){this.vertices=[b,d];this.vertexIndices=[c,f];this.faces=[];this.faceIndices=[]};THREE.Camera=function(b,d,c,f,g){THREE.Object3D.call(this);this.fov=b||50;this.aspect=d||1;this.near=c||0.1;this.far=f||2E3;this.target=g||new THREE.Object3D;this.useTarget=!0;this.matrixWorldInverse=new THREE.Matrix4;this.projectionMatrix=null;this.updateProjectionMatrix()};THREE.Camera.prototype=new THREE.Object3D;THREE.Camera.prototype.constructor=THREE.Camera;
THREE.Camera.prototype.supr=THREE.Object3D.prototype;THREE.Camera.prototype.translate=function(b,d){this.matrix.rotateAxis(d);this.position.addSelf(d.multiplyScalar(b));this.target.position.addSelf(d.multiplyScalar(b))};THREE.Camera.prototype.updateProjectionMatrix=function(){this.projectionMatrix=THREE.Matrix4.makePerspective(this.fov,this.aspect,this.near,this.far)};
THREE.Camera.prototype.update=function(b,d,c){if(this.useTarget){this.matrix.lookAt(this.position,this.target.position,this.up);this.matrix.setPosition(this.position);b?this.matrixWorld.multiply(b,this.matrix):this.matrixWorld.copy(this.matrix);THREE.Matrix4.makeInvert(this.matrixWorld,this.matrixWorldInverse);d=!0}else{this.matrixAutoUpdate&&this.updateMatrix();if(d||this.matrixWorldNeedsUpdate){b?this.matrixWorld.multiply(b,this.matrix):this.matrixWorld.copy(this.matrix);this.matrixWorldNeedsUpdate=
!1;d=!0;THREE.Matrix4.makeInvert(this.matrixWorld,this.matrixWorldInverse)}}for(b=0;b<this.children.length;b++)this.children[b].update(this.matrixWorld,d,c)};THREE.Light=function(b){THREE.Object3D.call(this);this.color=new THREE.Color(b)};THREE.Light.prototype=new THREE.Object3D;THREE.Light.prototype.constructor=THREE.Light;THREE.Light.prototype.supr=THREE.Object3D.prototype;THREE.AmbientLight=function(b){THREE.Light.call(this,b)};THREE.AmbientLight.prototype=new THREE.Light;
THREE.AmbientLight.prototype.constructor=THREE.AmbientLight;THREE.DirectionalLight=function(b,d,c,f){THREE.Light.call(this,b);this.position=new THREE.Vector3(0,1,0);this.intensity=d||1;this.distance=c||0;this.castShadow=f!==undefined?f:!1};THREE.DirectionalLight.prototype=new THREE.Light;THREE.DirectionalLight.prototype.constructor=THREE.DirectionalLight;THREE.PointLight=function(b,d,c){THREE.Light.call(this,b);this.position=new THREE.Vector3;this.intensity=d||1;this.distance=c||0};
THREE.PointLight.prototype=new THREE.Light;THREE.PointLight.prototype.constructor=THREE.PointLight;THREE.LensFlare=function(b,d,c,f){THREE.Object3D.call(this);this.positionScreen=new THREE.Vector3;this.lensFlares=[];this.customUpdateCallback=undefined;b!==undefined&&this.add(b,d,c,f)};THREE.LensFlare.prototype=new THREE.Object3D;THREE.LensFlare.prototype.constructor=THREE.LensFlare;THREE.LensFlare.prototype.supr=THREE.Object3D.prototype;
THREE.LensFlare.prototype.add=function(b,d,c,f){d===undefined&&(d=-1);c===undefined&&(c=0);if(f===undefined)f=THREE.BillboardBlending;c=Math.min(c,Math.max(0,c));this.lensFlares.push({texture:b,size:d,distance:c,x:0,y:0,z:0,scale:1,rotation:1,opacity:1,blending:f})};
THREE.LensFlare.prototype.updateLensFlares=function(){var b,d=this.lensFlares.length,c,f=-this.positionScreen.x*2,g=-this.positionScreen.y*2;for(b=0;b<d;b++){c=this.lensFlares[b];c.x=this.positionScreen.x+f*c.distance;c.y=this.positionScreen.y+g*c.distance;c.wantedRotation=c.x*Math.PI*0.25;c.rotation+=(c.wantedRotation-c.rotation)*0.25}};
THREE.Material=function(b){this.id=THREE.MaterialCounter.value++;b=b||{};this.opacity=b.opacity!==undefined?b.opacity:1;this.transparent=b.transparent!==undefined?b.transparent:!1;this.blending=b.blending!==undefined?b.blending:THREE.NormalBlending;this.depthTest=b.depthTest!==undefined?b.depthTest:!0};THREE.NoShading=0;THREE.FlatShading=1;THREE.SmoothShading=2;THREE.NoColors=0;THREE.FaceColors=1;THREE.VertexColors=2;THREE.NormalBlending=0;THREE.AdditiveBlending=1;THREE.SubtractiveBlending=2;
THREE.MultiplyBlending=3;THREE.AdditiveAlphaBlending=4;THREE.MaterialCounter={value:0};THREE.CubeReflectionMapping=function(){};THREE.CubeRefractionMapping=function(){};THREE.LatitudeReflectionMapping=function(){};THREE.LatitudeRefractionMapping=function(){};THREE.SphericalReflectionMapping=function(){};THREE.SphericalRefractionMapping=function(){};THREE.UVMapping=function(){};
THREE.LineBasicMaterial=function(b){THREE.Material.call(this,b);b=b||{};this.color=b.color!==undefined?new THREE.Color(b.color):new THREE.Color(16777215);this.linewidth=b.linewidth!==undefined?b.linewidth:1;this.linecap=b.linecap!==undefined?b.linecap:"round";this.linejoin=b.linejoin!==undefined?b.linejoin:"round";this.vertexColors=b.vertexColors?b.vertexColors:!1};THREE.LineBasicMaterial.prototype=new THREE.Material;THREE.LineBasicMaterial.prototype.constructor=THREE.LineBasicMaterial;
THREE.MeshBasicMaterial=function(b){THREE.Material.call(this,b);b=b||{};this.color=b.color!==undefined?new THREE.Color(b.color):new THREE.Color(16777215);this.map=b.map!==undefined?b.map:null;this.lightMap=b.lightMap!==undefined?b.lightMap:null;this.envMap=b.envMap!==undefined?b.envMap:null;this.combine=b.combine!==undefined?b.combine:THREE.MultiplyOperation;this.reflectivity=b.reflectivity!==undefined?b.reflectivity:1;this.refractionRatio=b.refractionRatio!==undefined?b.refractionRatio:0.98;this.shading=
b.shading!==undefined?b.shading:THREE.SmoothShading;this.wireframe=b.wireframe!==undefined?b.wireframe:!1;this.wireframeLinewidth=b.wireframeLinewidth!==undefined?b.wireframeLinewidth:1;this.wireframeLinecap=b.wireframeLinecap!==undefined?b.wireframeLinecap:"round";this.wireframeLinejoin=b.wireframeLinejoin!==undefined?b.wireframeLinejoin:"round";this.vertexColors=b.vertexColors!==undefined?b.vertexColors:!1;this.skinning=b.skinning!==undefined?b.skinning:!1;this.morphTargets=b.morphTargets!==undefined?
b.morphTargets:!1};THREE.MeshBasicMaterial.prototype=new THREE.Material;THREE.MeshBasicMaterial.prototype.constructor=THREE.MeshBasicMaterial;
THREE.MeshLambertMaterial=function(b){THREE.Material.call(this,b);b=b||{};this.color=b.color!==undefined?new THREE.Color(b.color):new THREE.Color(16777215);this.map=b.map!==undefined?b.map:null;this.lightMap=b.lightMap!==undefined?b.lightMap:null;this.envMap=b.envMap!==undefined?b.envMap:null;this.combine=b.combine!==undefined?b.combine:THREE.MultiplyOperation;this.reflectivity=b.reflectivity!==undefined?b.reflectivity:1;this.refractionRatio=b.refractionRatio!==undefined?b.refractionRatio:0.98;this.shading=
b.shading!==undefined?b.shading:THREE.SmoothShading;this.wireframe=b.wireframe!==undefined?b.wireframe:!1;this.wireframeLinewidth=b.wireframeLinewidth!==undefined?b.wireframeLinewidth:1;this.wireframeLinecap=b.wireframeLinecap!==undefined?b.wireframeLinecap:"round";this.wireframeLinejoin=b.wireframeLinejoin!==undefined?b.wireframeLinejoin:"round";this.vertexColors=b.vertexColors!==undefined?b.vertexColors:!1;this.skinning=b.skinning!==undefined?b.skinning:!1;this.morphTargets=b.morphTargets!==undefined?
b.morphTargets:!1};THREE.MeshLambertMaterial.prototype=new THREE.Material;THREE.MeshLambertMaterial.prototype.constructor=THREE.MeshLambertMaterial;
THREE.MeshPhongMaterial=function(b){THREE.Material.call(this,b);b=b||{};this.color=b.color!==undefined?new THREE.Color(b.color):new THREE.Color(16777215);this.ambient=b.ambient!==undefined?new THREE.Color(b.ambient):new THREE.Color(328965);this.specular=b.specular!==undefined?new THREE.Color(b.specular):new THREE.Color(1118481);this.shininess=b.shininess!==undefined?b.shininess:30;this.map=b.map!==undefined?b.map:null;this.lightMap=b.lightMap!==undefined?b.lightMap:null;this.envMap=b.envMap!==undefined?
b.envMap:null;this.combine=b.combine!==undefined?b.combine:THREE.MultiplyOperation;this.reflectivity=b.reflectivity!==undefined?b.reflectivity:1;this.refractionRatio=b.refractionRatio!==undefined?b.refractionRatio:0.98;this.shading=b.shading!==undefined?b.shading:THREE.SmoothShading;this.wireframe=b.wireframe!==undefined?b.wireframe:!1;this.wireframeLinewidth=b.wireframeLinewidth!==undefined?b.wireframeLinewidth:1;this.wireframeLinecap=b.wireframeLinecap!==undefined?b.wireframeLinecap:"round";this.wireframeLinejoin=
b.wireframeLinejoin!==undefined?b.wireframeLinejoin:"round";this.vertexColors=b.vertexColors!==undefined?b.vertexColors:!1;this.skinning=b.skinning!==undefined?b.skinning:!1;this.morphTargets=b.morphTargets!==undefined?b.morphTargets:!1};THREE.MeshPhongMaterial.prototype=new THREE.Material;THREE.MeshPhongMaterial.prototype.constructor=THREE.MeshPhongMaterial;
THREE.MeshDepthMaterial=function(b){THREE.Material.call(this,b);b=b||{};this.shading=b.shading!==undefined?b.shading:THREE.SmoothShading;this.wireframe=b.wireframe!==undefined?b.wireframe:!1;this.wireframeLinewidth=b.wireframeLinewidth!==undefined?b.wireframeLinewidth:1};THREE.MeshDepthMaterial.prototype=new THREE.Material;THREE.MeshDepthMaterial.prototype.constructor=THREE.MeshDepthMaterial;
THREE.MeshNormalMaterial=function(b){THREE.Material.call(this,b);b=b||{};this.shading=b.shading?b.shading:THREE.FlatShading;this.wireframe=b.wireframe?b.wireframe:!1;this.wireframeLinewidth=b.wireframeLinewidth?b.wireframeLinewidth:1};THREE.MeshNormalMaterial.prototype=new THREE.Material;THREE.MeshNormalMaterial.prototype.constructor=THREE.MeshNormalMaterial;THREE.MeshFaceMaterial=function(){};
THREE.MeshShaderMaterial=function(b){THREE.Material.call(this,b);b=b||{};this.fragmentShader=b.fragmentShader!==undefined?b.fragmentShader:"void main() {}";this.vertexShader=b.vertexShader!==undefined?b.vertexShader:"void main() {}";this.uniforms=b.uniforms!==undefined?b.uniforms:{};this.attributes=b.attributes;this.shading=b.shading!==undefined?b.shading:THREE.SmoothShading;this.wireframe=b.wireframe!==undefined?b.wireframe:!1;this.wireframeLinewidth=b.wireframeLinewidth!==undefined?b.wireframeLinewidth:
1;this.fog=b.fog!==undefined?b.fog:!1;this.lights=b.lights!==undefined?b.lights:!1;this.vertexColors=b.vertexColors!==undefined?b.vertexColors:!1;this.skinning=b.skinning!==undefined?b.skinning:!1;this.morphTargets=b.morphTargets!==undefined?b.morphTargets:!1};THREE.MeshShaderMaterial.prototype=new THREE.Material;THREE.MeshShaderMaterial.prototype.constructor=THREE.MeshShaderMaterial;
THREE.ShadowVolumeDynamicMaterial=function(b){THREE.Material.call(this,b);b=b||{};this.color=b.color!==undefined?new THREE.Color(b.color):new THREE.Color(16777215);this.map=b.map!==undefined?b.map:null;this.lightMap=b.lightMap!==undefined?b.lightMap:null;this.envMap=b.envMap!==undefined?b.envMap:null;this.combine=b.combine!==undefined?b.combine:THREE.MultiplyOperation;this.reflectivity=b.reflectivity!==undefined?b.reflectivity:1;this.refractionRatio=b.refractionRatio!==undefined?b.refractionRatio:
0.98;this.shading=b.shading!==undefined?b.shading:THREE.SmoothShading;this.wireframe=b.wireframe!==undefined?b.wireframe:!1;this.wireframeLinewidth=b.wireframeLinewidth!==undefined?b.wireframeLinewidth:1;this.wireframeLinecap=b.wireframeLinecap!==undefined?b.wireframeLinecap:"round";this.wireframeLinejoin=b.wireframeLinejoin!==undefined?b.wireframeLinejoin:"round";this.vertexColors=b.vertexColors!==undefined?b.vertexColors:!1;this.skinning=b.skinning!==undefined?b.skinning:!1;this.morphTargets=b.morphTargets!==
undefined?b.morphTargets:!1};THREE.ShadowVolumeDynamicMaterial.prototype=new THREE.Material;THREE.ShadowVolumeDynamicMaterial.prototype.constructor=THREE.ShadowVolumeDynamicMaterial;
THREE.ParticleBasicMaterial=function(b){THREE.Material.call(this,b);b=b||{};this.color=b.color!==undefined?new THREE.Color(b.color):new THREE.Color(16777215);this.map=b.map!==undefined?b.map:null;this.size=b.size!==undefined?b.size:1;this.sizeAttenuation=b.sizeAttenuation!==undefined?b.sizeAttenuation:!0;this.vertexColors=b.vertexColors!==undefined?b.vertexColors:!1};THREE.ParticleBasicMaterial.prototype=new THREE.Material;THREE.ParticleBasicMaterial.prototype.constructor=THREE.ParticleBasicMaterial;
THREE.ParticleCanvasMaterial=function(b){THREE.Material.call(this,b);b=b||{};this.color=b.color!==undefined?new THREE.Color(b.color):new THREE.Color(16777215);this.program=b.program!==undefined?b.program:function(){}};THREE.ParticleCanvasMaterial.prototype=new THREE.Material;THREE.ParticleCanvasMaterial.prototype.constructor=THREE.ParticleCanvasMaterial;THREE.ParticleDOMMaterial=function(b){THREE.Material.call(this);this.domElement=b};
THREE.Texture=function(b,d,c,f,g,h){this.image=b;this.mapping=d!==undefined?d:new THREE.UVMapping;this.wrapS=c!==undefined?c:THREE.ClampToEdgeWrapping;this.wrapT=f!==undefined?f:THREE.ClampToEdgeWrapping;this.magFilter=g!==undefined?g:THREE.LinearFilter;this.minFilter=h!==undefined?h:THREE.LinearMipMapLinearFilter;this.needsUpdate=!1};THREE.Texture.prototype={clone:function(){return new THREE.Texture(this.image,this.mapping,this.wrapS,this.wrapT,this.magFilter,this.minFilter)}};
THREE.MultiplyOperation=0;THREE.MixOperation=1;THREE.RepeatWrapping=0;THREE.ClampToEdgeWrapping=1;THREE.MirroredRepeatWrapping=2;THREE.NearestFilter=3;THREE.NearestMipMapNearestFilter=4;THREE.NearestMipMapLinearFilter=5;THREE.LinearFilter=6;THREE.LinearMipMapNearestFilter=7;THREE.LinearMipMapLinearFilter=8;THREE.ByteType=9;THREE.UnsignedByteType=10;THREE.ShortType=11;THREE.UnsignedShortType=12;THREE.IntType=13;THREE.UnsignedIntType=14;THREE.FloatType=15;THREE.AlphaFormat=16;THREE.RGBFormat=17;
THREE.RGBAFormat=18;THREE.LuminanceFormat=19;THREE.LuminanceAlphaFormat=20;THREE.Particle=function(b){THREE.Object3D.call(this);this.materials=b instanceof Array?b:[b]};THREE.Particle.prototype=new THREE.Object3D;THREE.Particle.prototype.constructor=THREE.Particle;THREE.ParticleSystem=function(b,d){THREE.Object3D.call(this);this.geometry=b;this.materials=d instanceof Array?d:[d];this.sortParticles=!1};THREE.ParticleSystem.prototype=new THREE.Object3D;THREE.ParticleSystem.prototype.constructor=THREE.ParticleSystem;
THREE.Line=function(b,d,c){THREE.Object3D.call(this);this.geometry=b;this.materials=d instanceof Array?d:[d];this.type=c!=undefined?c:THREE.LineStrip};THREE.LineStrip=0;THREE.LinePieces=1;THREE.Line.prototype=new THREE.Object3D;THREE.Line.prototype.constructor=THREE.Line;
THREE.Mesh=function(b,d){THREE.Object3D.call(this);this.geometry=b;this.materials=d&&d.length?d:[d];this.flipSided=!1;this.doubleSided=!1;this.overdraw=!1;if(this.geometry){this.geometry.boundingSphere||this.geometry.computeBoundingSphere();this.boundRadius=b.boundingSphere.radius;if(this.geometry.morphTargets.length){this.morphTargetBase=-1;this.morphTargetForcedOrder=[];this.morphTargetInfluences=[];this.morphTargetDictionary={};for(var c=0;c<this.geometry.morphTargets.length;c++){this.morphTargetInfluences.push(0);
this.morphTargetDictionary[this.geometry.morphTargets[c].name]=c}}}};THREE.Mesh.prototype=new THREE.Object3D;THREE.Mesh.prototype.constructor=THREE.Mesh;THREE.Mesh.prototype.supr=THREE.Object3D.prototype;THREE.Mesh.prototype.getMorphTargetIndexByName=function(b){if(this.morphTargetDictionary[b]!==undefined)return this.morphTargetDictionary[b];console.log("THREE.Mesh.getMorphTargetIndexByName: morph target "+b+" does not exist. Returning 0.");return 0};
THREE.Bone=function(b){THREE.Object3D.call(this);this.skin=b;this.skinMatrix=new THREE.Matrix4;this.hasNoneBoneChildren=!1};THREE.Bone.prototype=new THREE.Object3D;THREE.Bone.prototype.constructor=THREE.Bone;THREE.Bone.prototype.supr=THREE.Object3D.prototype;
THREE.Bone.prototype.update=function(b,d,c){this.matrixAutoUpdate&&(d|=this.updateMatrix());if(d||this.matrixWorldNeedsUpdate){b?this.skinMatrix.multiply(b,this.matrix):this.skinMatrix.copy(this.matrix);this.matrixWorldNeedsUpdate=!1;d=!0}var f,g=this.children.length;if(this.hasNoneBoneChildren){this.matrixWorld.multiply(this.skin.matrixWorld,this.skinMatrix);for(f=0;f<g;f++){b=this.children[f];b instanceof THREE.Bone?b.update(this.skinMatrix,d,c):b.update(this.matrixWorld,!0,c)}}else for(f=0;f<g;f++)this.children[f].update(this.skinMatrix,
d,c)};THREE.Bone.prototype.addChild=function(b){if(this.children.indexOf(b)===-1){b.parent!==undefined&&b.parent.removeChild(b);b.parent=this;this.children.push(b);if(!(b instanceof THREE.Bone))this.hasNoneBoneChildren=!0}};
THREE.SkinnedMesh=function(b,d){THREE.Mesh.call(this,b,d);this.identityMatrix=new THREE.Matrix4;this.bones=[];this.boneMatrices=[];var c,f,g,h,j,k;if(this.geometry.bones!==undefined){for(c=0;c<this.geometry.bones.length;c++){g=this.geometry.bones[c];h=g.pos;j=g.rotq;k=g.scl;f=this.addBone();f.name=g.name;f.position.set(h[0],h[1],h[2]);f.quaternion.set(j[0],j[1],j[2],j[3]);f.useQuaternion=!0;k!==undefined?f.scale.set(k[0],k[1],k[2]):f.scale.set(1,1,1)}for(c=0;c<this.bones.length;c++){g=this.geometry.bones[c];
f=this.bones[c];g.parent===-1?this.addChild(f):this.bones[g.parent].addChild(f)}this.boneMatrices=new Float32Array(16*this.bones.length);this.pose()}};THREE.SkinnedMesh.prototype=new THREE.Mesh;THREE.SkinnedMesh.prototype.constructor=THREE.SkinnedMesh;
THREE.SkinnedMesh.prototype.update=function(b,d,c){if(this.visible){this.matrixAutoUpdate&&(d|=this.updateMatrix());if(d||this.matrixWorldNeedsUpdate){b?this.matrixWorld.multiply(b,this.matrix):this.matrixWorld.copy(this.matrix);this.matrixWorldNeedsUpdate=!1;d=!0}var f,g=this.children.length;for(f=0;f<g;f++){b=this.children[f];b instanceof THREE.Bone?b.update(this.identityMatrix,!1,c):b.update(this.matrixWorld,d,c)}c=this.bones.length;ba=this.bones;bm=this.boneMatrices;for(d=0;d<c;d++)ba[d].skinMatrix.flattenToArrayOffset(bm,
d*16)}};THREE.SkinnedMesh.prototype.addBone=function(b){b===undefined&&(b=new THREE.Bone(this));this.bones.push(b);return b};
THREE.SkinnedMesh.prototype.pose=function(){this.update(undefined,!0);for(var b,d=[],c=0;c<this.bones.length;c++){b=this.bones[c];d.push(THREE.Matrix4.makeInvert(b.skinMatrix));b.skinMatrix.flattenToArrayOffset(this.boneMatrices,c*16)}if(this.geometry.skinVerticesA===undefined){this.geometry.skinVerticesA=[];this.geometry.skinVerticesB=[];var f;for(b=0;b<this.geometry.skinIndices.length;b++){c=this.geometry.vertices[b].position;var g=this.geometry.skinIndices[b].x,h=this.geometry.skinIndices[b].y;
f=new THREE.Vector3(c.x,c.y,c.z);this.geometry.skinVerticesA.push(d[g].multiplyVector3(f));f=new THREE.Vector3(c.x,c.y,c.z);this.geometry.skinVerticesB.push(d[h].multiplyVector3(f));if(this.geometry.skinWeights[b].x+this.geometry.skinWeights[b].y!==1){c=(1-(this.geometry.skinWeights[b].x+this.geometry.skinWeights[b].y))*0.5;this.geometry.skinWeights[b].x+=c;this.geometry.skinWeights[b].y+=c}}}};
THREE.Ribbon=function(b,d){THREE.Object3D.call(this);this.geometry=b;this.materials=d instanceof Array?d:[d];this.flipSided=!1;this.doubleSided=!1};THREE.Ribbon.prototype=new THREE.Object3D;THREE.Ribbon.prototype.constructor=THREE.Ribbon;
THREE.Sound=function(b,d,c,f){THREE.Object3D.call(this);this.isLoaded=!1;this.isAddedToDOM=!1;this.isPlaying=!1;this.duration=-1;this.radius=d!==undefined?Math.abs(d):100;this.volume=Math.min(1,Math.max(0,c!==undefined?c:1));this.domElement=document.createElement("audio");this.domElement.volume=0;this.domElement.pan=0;this.domElement.loop=f!==undefined?f:!0;this.sources=b instanceof Array?b:[b];var g;c=this.sources.length;for(b=0;b<c;b++){d=this.sources[b];d.toLowerCase();if(d.indexOf(".mp3")!==-1)g=
"audio/mpeg";else if(d.indexOf(".ogg")!==-1)g="audio/ogg";else d.indexOf(".wav")!==-1&&(g="audio/wav");if(this.domElement.canPlayType(g)){g=document.createElement("source");g.src=this.sources[b];this.domElement.THREESound=this;this.domElement.appendChild(g);this.domElement.addEventListener("canplay",this.onLoad,!0);this.domElement.load();break}}};THREE.Sound.prototype=new THREE.Object3D;THREE.Sound.prototype.constructor=THREE.Sound;THREE.Sound.prototype.supr=THREE.Object3D.prototype;
THREE.Sound.prototype.onLoad=function(){var b=this.THREESound;if(!b.isLoaded){this.removeEventListener("canplay",this.onLoad,!0);b.isLoaded=!0;b.duration=this.duration;b.isPlaying&&b.play()}};THREE.Sound.prototype.addToDOM=function(b){this.isAddedToDOM=!0;b.appendChild(this.domElement)};THREE.Sound.prototype.play=function(b){this.isPlaying=!0;if(this.isLoaded){this.domElement.play();if(b)this.domElement.currentTime=b%this.duration}};THREE.Sound.prototype.pause=function(){this.isPlaying=!1;this.domElement.pause()};
THREE.Sound.prototype.stop=function(){this.isPlaying=!1;this.domElement.pause();this.domElement.currentTime=0};THREE.Sound.prototype.calculateVolumeAndPan=function(b){b=b.length();this.domElement.volume=b<=this.radius?this.volume*(1-b/this.radius):0};
THREE.Sound.prototype.update=function(b,d,c){if(this.matrixAutoUpdate){this.matrix.setPosition(this.position);d=!0}if(d||this.matrixWorldNeedsUpdate){b?this.matrixWorld.multiply(b,this.matrix):this.matrixWorld.copy(this.matrix);this.matrixWorldNeedsUpdate=!1;d=!0}var f=this.children.length;for(b=0;b<f;b++)this.children[b].update(this.matrixWorld,d,c)};THREE.LOD=function(){THREE.Object3D.call(this);this.LODs=[]};THREE.LOD.prototype=new THREE.Object3D;THREE.LOD.prototype.constructor=THREE.LOD;
THREE.LOD.prototype.supr=THREE.Object3D.prototype;THREE.LOD.prototype.add=function(b,d){d===undefined&&(d=0);d=Math.abs(d);for(var c=0;c<this.LODs.length;c++)if(d<this.LODs[c].visibleAtDistance)break;this.LODs.splice(c,0,{visibleAtDistance:d,object3D:b});this.addChild(b)};
THREE.LOD.prototype.update=function(b,d,c){this.matrixAutoUpdate&&(d|=this.updateMatrix());if(d||this.matrixWorldNeedsUpdate){b?this.matrixWorld.multiply(b,this.matrix):this.matrixWorld.copy(this.matrix);this.matrixWorldNeedsUpdate=!1;d=!0}if(this.LODs.length>1){b=c.matrixWorldInverse;b=-(b.n31*this.position.x+b.n32*this.position.y+b.n33*this.position.z+b.n34);this.LODs[0].object3D.visible=!0;for(var f=1;f<this.LODs.length;f++)if(b>=this.LODs[f].visibleAtDistance){this.LODs[f-1].object3D.visible=
!1;this.LODs[f].object3D.visible=!0}else break;for(;f<this.LODs.length;f++)this.LODs[f].object3D.visible=!1}for(b=0;b<this.children.length;b++)this.children[b].update(this.matrixWorld,d,c)};THREE.ShadowVolume=function(b,d){if(b instanceof THREE.Mesh){THREE.Mesh.call(this,b.geometry,d?[new THREE.ShadowVolumeDynamicMaterial]:[new THREE.ShadowVolumeDynamicMaterial]);b.addChild(this)}else THREE.Mesh.call(this,b,d?[new THREE.ShadowVolumeDynamicMaterial]:[new THREE.ShadowVolumeDynamicMaterial]);this.calculateShadowVolumeGeometry()};
THREE.ShadowVolume.prototype=new THREE.Mesh;THREE.ShadowVolume.prototype.constructor=THREE.ShadowVolume;THREE.ShadowVolume.prototype.supr=THREE.Mesh.prototype;
THREE.ShadowVolume.prototype.calculateShadowVolumeGeometry=function(){if(this.geometry.edges&&this.geometry.edges.length){var b,d,c,f,g,h,j,k,m,o,t,u,w,p,z=new THREE.Geometry;z.vertices=this.geometry.vertices;f=z.faces=this.geometry.faces;var G=z.egdes=this.geometry.edges,F=z.edgeFaces=[];g=0;var B=[];b=0;for(d=f.length;b<d;b++){c=f[b];B.push(g);g+=c instanceof THREE.Face3?3:4;c.vertexNormals[0]=c.normal;c.vertexNormals[1]=c.normal;c.vertexNormals[2]=c.normal;if(c instanceof THREE.Face4)c.vertexNormals[3]=
c.normal}b=0;for(d=G.length;b<d;b++){k=G[b];c=k.faces[0];f=k.faces[1];g=k.faceIndices[0];h=k.faceIndices[1];j=k.vertexIndices[0];k=k.vertexIndices[1];if(c.a===j){m="a";t=B[g]+0}else if(c.b===j){m="b";t=B[g]+1}else if(c.c===j){m="c";t=B[g]+2}else if(c.d===j){m="d";t=B[g]+3}if(c.a===k){m+="a";u=B[g]+0}else if(c.b===k){m+="b";u=B[g]+1}else if(c.c===k){m+="c";u=B[g]+2}else if(c.d===k){m+="d";u=B[g]+3}if(f.a===j){o="a";w=B[h]+0}else if(f.b===j){o="b";w=B[h]+1}else if(f.c===j){o="c";w=B[h]+2}else if(f.d===
j){o="d";w=B[h]+3}if(f.a===k){o+="a";p=B[h]+0}else if(f.b===k){o+="b";p=B[h]+1}else if(f.c===k){o+="c";p=B[h]+2}else if(f.d===k){o+="d";p=B[h]+3}if(m==="ac"||m==="ad"||m==="ca"||m==="da"){if(t>u){c=t;t=u;u=c}}else if(t<u){c=t;t=u;u=c}if(o==="ac"||o==="ad"||o==="ca"||o==="da"){if(w>p){c=w;w=p;p=c}}else if(w<p){c=w;w=p;p=c}c=new THREE.Face4(t,u,w,p);c.normal.set(1,0,0);F.push(c)}this.geometry=z}else this.calculateShadowVolumeGeometryWithoutEdgeInfo(this.geometry)};
THREE.ShadowVolume.prototype.calculateShadowVolumeGeometryWithoutEdgeInfo=function(b){this.geometry=new THREE.Geometry;this.geometry.boundingSphere=b.boundingSphere;this.geometry.edgeFaces=[];var d=this.geometry.vertices,c=this.geometry.faces,f=this.geometry.edgeFaces,g=b.faces;b=b.vertices;var h=g.length,j,k,m,o,t,u=["a","b","c","d"];for(m=0;m<h;m++){k=d.length;j=g[m];if(j instanceof THREE.Face4){o=4;k=new THREE.Face4(k,k+1,k+2,k+3)}else{o=3;k=new THREE.Face3(k,k+1,k+2)}k.normal.copy(j.normal);c.push(k);
for(k=0;k<o;k++){t=b[j[u[k]]];d.push(new THREE.Vertex(t.position.clone()))}}for(h=0;h<g.length-1;h++){b=c[h];for(j=h+1;j<g.length;j++){k=c[j];k=this.facesShareEdge(d,b,k);if(k!==undefined){k=new THREE.Face4(k.indices[0],k.indices[3],k.indices[2],k.indices[1]);k.normal.set(1,0,0);f.push(k)}}}};
THREE.ShadowVolume.prototype.facesShareEdge=function(b,d,c){var f,g,h,j,k,m,o,t,u,w,p,z,G,F=0,B=["a","b","c","d"];f=d instanceof THREE.Face4?4:3;g=c instanceof THREE.Face4?4:3;for(z=0;z<f;z++){h=d[B[z]];k=b[h];for(G=0;G<g;G++){j=c[B[G]];m=b[j];if(Math.abs(k.position.x-m.position.x)<1.0E-4&&Math.abs(k.position.y-m.position.y)<1.0E-4&&Math.abs(k.position.z-m.position.z)<1.0E-4){F++;if(F===1){o=k;t=m;u=h;w=j;p=B[z]}if(F===2){p+=B[z];return p==="ad"||p==="ac"?{faces:[d,c],vertices:[o,t,m,k],indices:[u,
w,j,h],vertexTypes:[1,2,2,1],extrudable:!0}:{faces:[d,c],vertices:[o,k,m,t],indices:[u,h,j,w],vertexTypes:[1,1,2,2],extrudable:!0}}}}}};
THREE.Sprite=function(b){THREE.Object3D.call(this);if(b.material!==undefined){this.material=b.material;this.map=undefined;this.blending=material.blending}else if(b.map!==undefined){this.map=b.map instanceof THREE.Texture?b.map:ImageUtils.loadTexture(b.map);this.material=undefined;this.blending=b.blending!==undefined?b.blending:THREE.NormalBlending}this.useScreenCoordinates=b.useScreenCoordinates!==undefined?b.useScreenCoordinates:!0;this.mergeWith3D=b.mergeWith3D!==undefined?b.mergeWith3D:!this.useScreenCoordinates;
this.affectedByDistance=b.affectedByDistance!==undefined?b.affectedByDistance:!this.useScreenCoordinates;this.alignment=b.alignment instanceof THREE.Vector2?b.alignment:THREE.SpriteAlignment.center;this.rotation3d=this.rotation;this.rotation=0;this.opacity=1;this.uvOffset=new THREE.Vector2(0,0);this.uvScale=new THREE.Vector2(1,1)};THREE.Sprite.prototype=new THREE.Object3D;THREE.Sprite.prototype.constructor=THREE.Sprite;THREE.Sprite.prototype.supr=THREE.Object3D.prototype;
THREE.Sprite.prototype.updateMatrix=function(){this.matrix.setPosition(this.position);this.rotation3d.set(0,0,this.rotation);this.matrix.setRotationFromEuler(this.rotation3d);if(this.scale.x!==1||this.scale.y!==1){this.matrix.scale(this.scale);this.boundRadiusScale=Math.max(this.scale.x,this.scale.y)}this.matrixWorldNeedsUpdate=!0};THREE.SpriteAlignment={};THREE.SpriteAlignment.topLeft=new THREE.Vector2(1,-1);THREE.SpriteAlignment.topCenter=new THREE.Vector2(0,-1);
THREE.SpriteAlignment.topRight=new THREE.Vector2(-1,-1);THREE.SpriteAlignment.centerLeft=new THREE.Vector2(1,0);THREE.SpriteAlignment.center=new THREE.Vector2(0,0);THREE.SpriteAlignment.centerRight=new THREE.Vector2(-1,0);THREE.SpriteAlignment.bottomLeft=new THREE.Vector2(1,1);THREE.SpriteAlignment.bottomCenter=new THREE.Vector2(0,1);THREE.SpriteAlignment.bottomRight=new THREE.Vector2(-1,1);
THREE.Scene=function(){THREE.Object3D.call(this);this.matrixAutoUpdate=!1;this.collisions=this.fog=null;this.objects=[];this.lights=[];this.sounds=[];this.__objectsAdded=[];this.__objectsRemoved=[]};THREE.Scene.prototype=new THREE.Object3D;THREE.Scene.prototype.constructor=THREE.Scene;THREE.Scene.prototype.supr=THREE.Object3D.prototype;THREE.Scene.prototype.addChild=function(b){this.supr.addChild.call(this,b);this.addChildRecurse(b)};
THREE.Scene.prototype.addChildRecurse=function(b){if(b instanceof THREE.Light)this.lights.indexOf(b)===-1&&this.lights.push(b);else if(b instanceof THREE.Sound)this.sounds.indexOf(b)===-1&&this.sounds.push(b);else if(!(b instanceof THREE.Camera||b instanceof THREE.Bone)&&this.objects.indexOf(b)===-1){this.objects.push(b);this.__objectsAdded.push(b)}for(var d=0;d<b.children.length;d++)this.addChildRecurse(b.children[d])};
THREE.Scene.prototype.removeChild=function(b){this.supr.removeChild.call(this,b);this.removeChildRecurse(b)};THREE.Scene.prototype.removeChildRecurse=function(b){if(b instanceof THREE.Light){var d=this.lights.indexOf(b);d!==-1&&this.lights.splice(d,1)}else if(b instanceof THREE.Sound){d=this.sounds.indexOf(b);d!==-1&&this.sounds.splice(d,1)}else if(!(b instanceof THREE.Camera)){d=this.objects.indexOf(b);if(d!==-1){this.objects.splice(d,1);this.__objectsRemoved.push(b)}}for(d=0;d<b.children.length;d++)this.removeChildRecurse(b.children[d])};
THREE.Scene.prototype.addObject=THREE.Scene.prototype.addChild;THREE.Scene.prototype.removeObject=THREE.Scene.prototype.removeChild;THREE.Scene.prototype.addLight=THREE.Scene.prototype.addChild;THREE.Scene.prototype.removeLight=THREE.Scene.prototype.removeChild;THREE.Fog=function(b,d,c){this.color=new THREE.Color(b);this.near=d||1;this.far=c||1E3};THREE.FogExp2=function(b,d){this.color=new THREE.Color(b);this.density=d!==undefined?d:2.5E-4};
THREE.Projector=function(){function b(){var oa=m[k]=m[k]||new THREE.RenderableVertex;k++;return oa}function d(oa,e){return e.z-oa.z}function c(oa,e){var xa=0,sa=1,Ba=oa.z+oa.w,ga=e.z+e.w,ra=-oa.z+oa.w,fa=-e.z+e.w;if(Ba>=0&&ga>=0&&ra>=0&&fa>=0)return!0;else if(Ba<0&&ga<0||ra<0&&fa<0)return!1;else{if(Ba<0)xa=Math.max(xa,Ba/(Ba-ga));else ga<0&&(sa=Math.min(sa,Ba/(Ba-ga)));if(ra<0)xa=Math.max(xa,ra/(ra-fa));else fa<0&&(sa=Math.min(sa,ra/(ra-fa)));if(sa<xa)return!1;else{oa.lerpSelf(e,xa);e.lerpSelf(oa,
1-sa);return!0}}}var f,g,h=[],j,k,m=[],o,t,u=[],w,p=[],z,G,F=[],B,T,C=[],V=new THREE.Vector4,P=new THREE.Vector4,Q=new THREE.Matrix4,ka=new THREE.Matrix4,ea=[new THREE.Vector4,new THREE.Vector4,new THREE.Vector4,new THREE.Vector4,new THREE.Vector4,new THREE.Vector4],pa=new THREE.Vector4,aa=new THREE.Vector4;this.projectVector=function(oa,e){Q.multiply(e.projectionMatrix,e.matrixWorldInverse);Q.multiplyVector3(oa);return oa};this.unprojectVector=function(oa,e){Q.multiply(e.matrixWorld,THREE.Matrix4.makeInvert(e.projectionMatrix));
Q.multiplyVector3(oa);return oa};this.projectObjects=function(oa,e,xa){e=[];var sa,Ba,ga;g=0;Ba=oa.objects;oa=0;for(sa=Ba.length;oa<sa;oa++){ga=Ba[oa];var ra;if(!(ra=!ga.visible))if(ra=ga instanceof THREE.Mesh){a:{ra=void 0;for(var fa=ga.matrixWorld,za=-ga.geometry.boundingSphere.radius*Math.max(ga.scale.x,Math.max(ga.scale.y,ga.scale.z)),na=0;na<6;na++){ra=ea[na].x*fa.n14+ea[na].y*fa.n24+ea[na].z*fa.n34+ea[na].w;if(ra<=za){ra=!1;break a}}ra=!0}ra=!ra}if(!ra){ra=h[g]=h[g]||new THREE.RenderableObject;
g++;f=ra;V.copy(ga.position);Q.multiplyVector3(V);f.object=ga;f.z=V.z;e.push(f)}}xa&&e.sort(d);return e};this.projectScene=function(oa,e,xa){var sa=[],Ba=e.near,ga=e.far,ra,fa,za,na,ua,qa,ja,Fa,Aa,ha,va,Ja,Sa,Wa,O,Z,R;T=G=w=t=0;e.matrixAutoUpdate&&e.update(undefined,!0);oa.update(undefined,!1,e);Q.multiply(e.projectionMatrix,e.matrixWorldInverse);ea[0].set(Q.n41-Q.n11,Q.n42-Q.n12,Q.n43-Q.n13,Q.n44-Q.n14);ea[1].set(Q.n41+Q.n11,Q.n42+Q.n12,Q.n43+Q.n13,Q.n44+Q.n14);ea[2].set(Q.n41+Q.n21,Q.n42+Q.n22,
Q.n43+Q.n23,Q.n44+Q.n24);ea[3].set(Q.n41-Q.n21,Q.n42-Q.n22,Q.n43-Q.n23,Q.n44-Q.n24);ea[4].set(Q.n41-Q.n31,Q.n42-Q.n32,Q.n43-Q.n33,Q.n44-Q.n34);ea[5].set(Q.n41+Q.n31,Q.n42+Q.n32,Q.n43+Q.n33,Q.n44+Q.n34);for(ra=0;ra<6;ra++){Aa=ea[ra];Aa.divideScalar(Math.sqrt(Aa.x*Aa.x+Aa.y*Aa.y+Aa.z*Aa.z))}Aa=this.projectObjects(oa,e,!0);oa=0;for(ra=Aa.length;oa<ra;oa++){ha=Aa[oa].object;if(ha.visible){va=ha.matrixWorld;Ja=ha.matrixRotationWorld;Sa=ha.materials;Wa=ha.overdraw;k=0;if(ha instanceof THREE.Mesh){O=ha.geometry;
na=O.vertices;Z=O.faces;O=O.faceVertexUvs;fa=0;for(za=na.length;fa<za;fa++){j=b();j.positionWorld.copy(na[fa].position);va.multiplyVector3(j.positionWorld);j.positionScreen.copy(j.positionWorld);Q.multiplyVector4(j.positionScreen);j.positionScreen.x/=j.positionScreen.w;j.positionScreen.y/=j.positionScreen.w;j.visible=j.positionScreen.z>Ba&&j.positionScreen.z<ga}na=0;for(fa=Z.length;na<fa;na++){za=Z[na];if(za instanceof THREE.Face3){ua=m[za.a];qa=m[za.b];ja=m[za.c];if(ua.visible&&qa.visible&&ja.visible&&
(ha.doubleSided||ha.flipSided!=(ja.positionScreen.x-ua.positionScreen.x)*(qa.positionScreen.y-ua.positionScreen.y)-(ja.positionScreen.y-ua.positionScreen.y)*(qa.positionScreen.x-ua.positionScreen.x)<0)){Fa=u[t]=u[t]||new THREE.RenderableFace3;t++;o=Fa;o.v1.copy(ua);o.v2.copy(qa);o.v3.copy(ja)}else continue}else if(za instanceof THREE.Face4){ua=m[za.a];qa=m[za.b];ja=m[za.c];Fa=m[za.d];if(ua.visible&&qa.visible&&ja.visible&&Fa.visible&&(ha.doubleSided||ha.flipSided!=((Fa.positionScreen.x-ua.positionScreen.x)*
(qa.positionScreen.y-ua.positionScreen.y)-(Fa.positionScreen.y-ua.positionScreen.y)*(qa.positionScreen.x-ua.positionScreen.x)<0||(qa.positionScreen.x-ja.positionScreen.x)*(Fa.positionScreen.y-ja.positionScreen.y)-(qa.positionScreen.y-ja.positionScreen.y)*(Fa.positionScreen.x-ja.positionScreen.x)<0))){R=p[w]=p[w]||new THREE.RenderableFace4;w++;o=R;o.v1.copy(ua);o.v2.copy(qa);o.v3.copy(ja);o.v4.copy(Fa)}else continue}o.normalWorld.copy(za.normal);Ja.multiplyVector3(o.normalWorld);o.centroidWorld.copy(za.centroid);
va.multiplyVector3(o.centroidWorld);o.centroidScreen.copy(o.centroidWorld);Q.multiplyVector3(o.centroidScreen);ja=za.vertexNormals;ua=0;for(qa=ja.length;ua<qa;ua++){Fa=o.vertexNormalsWorld[ua];Fa.copy(ja[ua]);Ja.multiplyVector3(Fa)}ua=0;for(qa=O.length;ua<qa;ua++)if(R=O[ua][na]){ja=0;for(Fa=R.length;ja<Fa;ja++)o.uvs[ua][ja]=R[ja]}o.meshMaterials=Sa;o.faceMaterials=za.materials;o.overdraw=Wa;o.z=o.centroidScreen.z;sa.push(o)}}else if(ha instanceof THREE.Line){ka.multiply(Q,va);na=ha.geometry.vertices;
ua=b();ua.positionScreen.copy(na[0].position);ka.multiplyVector4(ua.positionScreen);fa=1;for(za=na.length;fa<za;fa++){ua=b();ua.positionScreen.copy(na[fa].position);ka.multiplyVector4(ua.positionScreen);qa=m[k-2];pa.copy(ua.positionScreen);aa.copy(qa.positionScreen);if(c(pa,aa)){pa.multiplyScalar(1/pa.w);aa.multiplyScalar(1/aa.w);va=F[G]=F[G]||new THREE.RenderableLine;G++;z=va;z.v1.positionScreen.copy(pa);z.v2.positionScreen.copy(aa);z.z=Math.max(pa.z,aa.z);z.materials=ha.materials;sa.push(z)}}}else if(ha instanceof
THREE.Particle){P.set(ha.matrixWorld.n14,ha.matrixWorld.n24,ha.matrixWorld.n34,1);Q.multiplyVector4(P);P.z/=P.w;if(P.z>0&&P.z<1){va=C[T]=C[T]||new THREE.RenderableParticle;T++;B=va;B.x=P.x/P.w;B.y=P.y/P.w;B.z=P.z;B.rotation=ha.rotation.z;B.scale.x=ha.scale.x*Math.abs(B.x-(P.x+e.projectionMatrix.n11)/(P.w+e.projectionMatrix.n14));B.scale.y=ha.scale.y*Math.abs(B.y-(P.y+e.projectionMatrix.n22)/(P.w+e.projectionMatrix.n24));B.materials=ha.materials;sa.push(B)}}}}xa&&sa.sort(d);return sa}};
THREE.DOMRenderer=function(){THREE.Renderer.call(this);var b=null,d=new THREE.Projector,c,f,g,h;this.domElement=document.createElement("div");this.setSize=function(j,k){c=j;f=k;g=c/2;h=f/2};this.render=function(j,k){var m,o,t,u,w,p,z,G;b=d.projectScene(j,k);m=0;for(o=b.length;m<o;m++){w=b[m];if(w instanceof THREE.RenderableParticle){z=w.x*g+g;G=w.y*h+h;t=0;for(u=w.material.length;t<u;t++){p=w.material[t];if(p instanceof THREE.ParticleDOMMaterial){p=p.domElement;p.style.left=z+"px";p.style.top=G+"px"}}}}}};
THREE.CanvasRenderer=function(){function b(ma){if(F!=ma)p.globalAlpha=F=ma}function d(ma){if(B!=ma){switch(ma){case THREE.NormalBlending:p.globalCompositeOperation="source-over";break;case THREE.AdditiveBlending:p.globalCompositeOperation="lighter";break;case THREE.SubtractiveBlending:p.globalCompositeOperation="darker"}B=ma}}function c(ma){if(T!=ma.hex){T=ma.hex;p.strokeStyle="#"+g(T.toString(16))}}function f(ma){if(C!=ma.hex){C=ma.hex;p.fillStyle="#"+g(C.toString(16))}}function g(ma){for(;ma.length<
6;)ma="0"+ma;return ma}var h=this,j=null,k=new THREE.Projector,m=document.createElement("canvas"),o,t,u,w,p=m.getContext("2d"),z=new THREE.Color(0),G=0,F=1,B=0,T=null,C=null,V=null,P=null,Q=null,ka,ea,pa,aa,oa=new THREE.RenderableVertex,e=new THREE.RenderableVertex,xa,sa,Ba,ga,ra,fa,za,na,ua,qa,ja,Fa,Aa=new THREE.Color(0),ha=new THREE.Color(0),va=new THREE.Color(0),Ja=new THREE.Color(0),Sa=new THREE.Color(0),Wa,O,Z,R,S,Ma,bb,n,D,y,x=new THREE.Rectangle,A=new THREE.Rectangle,K=new THREE.Rectangle,
M=!1,I=new THREE.Color,N=new THREE.Color,H=new THREE.Color,L=new THREE.Color,J=new THREE.Vector3,$,X,Ca,Ha,Da,La,Xa=16;$=document.createElement("canvas");$.width=$.height=2;X=$.getContext("2d");X.fillStyle="rgba(0,0,0,1)";X.fillRect(0,0,2,2);Ca=X.getImageData(0,0,2,2);Ha=Ca.data;Da=document.createElement("canvas");Da.width=Da.height=Xa;La=Da.getContext("2d");La.translate(-Xa/2,-Xa/2);La.scale(Xa,Xa);Xa--;this.domElement=m;this.autoClear=!0;this.sortObjects=!0;this.sortElements=!0;this.data={vertices:0,
faces:0};this.setSize=function(ma,ya){o=ma;t=ya;u=o/2;w=t/2;m.width=o;m.height=t;x.set(-u,-w,u,w);F=1;B=0;Q=P=V=C=T=null};this.setClearColor=function(ma,ya){z=ma;G=ya};this.setClearColorHex=function(ma,ya){z.setHex(ma);G=ya};this.clear=function(){p.setTransform(1,0,0,-1,u,w);if(!A.isEmpty()){A.inflate(1);A.minSelf(x);if(z.hex==0&&G==0)p.clearRect(A.getX(),A.getY(),A.getWidth(),A.getHeight());else{d(THREE.NormalBlending);b(1);p.fillStyle="rgba("+Math.floor(z.r*255)+","+Math.floor(z.g*255)+","+Math.floor(z.b*
255)+","+G+")";p.fillRect(A.getX(),A.getY(),A.getWidth(),A.getHeight())}A.empty()}};this.render=function(ma,ya){function Ga(U){var la,ia,ca,wa=U.lights;N.setRGB(0,0,0);H.setRGB(0,0,0);L.setRGB(0,0,0);U=0;for(la=wa.length;U<la;U++){ia=wa[U];ca=ia.color;if(ia instanceof THREE.AmbientLight){N.r+=ca.r;N.g+=ca.g;N.b+=ca.b}else if(ia instanceof THREE.DirectionalLight){H.r+=ca.r;H.g+=ca.g;H.b+=ca.b}else if(ia instanceof THREE.PointLight){L.r+=ca.r;L.g+=ca.g;L.b+=ca.b}}}function Pa(U,la,ia,ca){var wa,Na,
ta,W,Ka=U.lights;U=0;for(wa=Ka.length;U<wa;U++){Na=Ka[U];ta=Na.color;if(Na instanceof THREE.DirectionalLight){W=ia.dot(Na.position);if(!(W<=0)){W*=Na.intensity;ca.r+=ta.r*W;ca.g+=ta.g*W;ca.b+=ta.b*W}}else if(Na instanceof THREE.PointLight){W=ia.dot(J.sub(Na.position,la).normalize());if(!(W<=0)){W*=Na.distance==0?1:1-Math.min(la.distanceTo(Na.position)/Na.distance,1);if(W!=0){W*=Na.intensity;ca.r+=ta.r*W;ca.g+=ta.g*W;ca.b+=ta.b*W}}}}}function E(U,la,ia){b(ia.opacity);d(ia.blending);var ca,wa,Na,ta,
W,Ka;if(ia instanceof THREE.ParticleBasicMaterial){if(ia.map){ta=ia.map.image;W=ta.width>>1;Ka=ta.height>>1;ia=la.scale.x*u;Na=la.scale.y*w;ca=ia*W;wa=Na*Ka;K.set(U.x-ca,U.y-wa,U.x+ca,U.y+wa);if(x.instersects(K)){p.save();p.translate(U.x,U.y);p.rotate(-la.rotation);p.scale(ia,-Na);p.translate(-W,-Ka);p.drawImage(ta,0,0);p.restore()}}}else if(ia instanceof THREE.ParticleCanvasMaterial){ca=la.scale.x*u;wa=la.scale.y*w;K.set(U.x-ca,U.y-wa,U.x+ca,U.y+wa);if(x.instersects(K)){c(ia.color);f(ia.color);p.save();
p.translate(U.x,U.y);p.rotate(-la.rotation);p.scale(ca,wa);ia.program(p);p.restore()}}}function da(U,la,ia,ca){b(ca.opacity);d(ca.blending);p.beginPath();p.moveTo(U.positionScreen.x,U.positionScreen.y);p.lineTo(la.positionScreen.x,la.positionScreen.y);p.closePath();if(ca instanceof THREE.LineBasicMaterial){U=ca.linewidth;if(V!=U)p.lineWidth=V=U;U=ca.linecap;if(P!=U)p.lineCap=P=U;U=ca.linejoin;if(Q!=U)p.lineJoin=Q=U;c(ca.color);p.stroke();K.inflate(ca.linewidth*2)}}function v(U,la,ia,ca,wa,Na,ta,W,
Ka){h.data.vertices+=3;h.data.faces++;b(W.opacity);d(W.blending);xa=U.positionScreen.x;sa=U.positionScreen.y;Ba=la.positionScreen.x;ga=la.positionScreen.y;ra=ia.positionScreen.x;fa=ia.positionScreen.y;gb(xa,sa,Ba,ga,ra,fa);if(W instanceof THREE.MeshBasicMaterial)if(W.map){if(W.map.mapping instanceof THREE.UVMapping){R=ta.uvs[0];db(xa,sa,Ba,ga,ra,fa,W.map.image,R[ca].u,R[ca].v,R[wa].u,R[wa].v,R[Na].u,R[Na].v)}}else if(W.envMap){if(W.envMap.mapping instanceof THREE.SphericalReflectionMapping){U=ya.matrixWorldInverse;
J.copy(ta.vertexNormalsWorld[0]);S=(J.x*U.n11+J.y*U.n12+J.z*U.n13)*0.5+0.5;Ma=-(J.x*U.n21+J.y*U.n22+J.z*U.n23)*0.5+0.5;J.copy(ta.vertexNormalsWorld[1]);bb=(J.x*U.n11+J.y*U.n12+J.z*U.n13)*0.5+0.5;n=-(J.x*U.n21+J.y*U.n22+J.z*U.n23)*0.5+0.5;J.copy(ta.vertexNormalsWorld[2]);D=(J.x*U.n11+J.y*U.n12+J.z*U.n13)*0.5+0.5;y=-(J.x*U.n21+J.y*U.n22+J.z*U.n23)*0.5+0.5;db(xa,sa,Ba,ga,ra,fa,W.envMap.image,S,Ma,bb,n,D,y)}}else W.wireframe?Ta(W.color,W.wireframeLinewidth,W.wireframeLinecap,W.wireframeLinejoin):fb(W.color);
else if(W instanceof THREE.MeshLambertMaterial){if(W.map&&!W.wireframe){if(W.map.mapping instanceof THREE.UVMapping){R=ta.uvs[0];db(xa,sa,Ba,ga,ra,fa,W.map.image,R[ca].u,R[ca].v,R[wa].u,R[wa].v,R[Na].u,R[Na].v)}d(THREE.SubtractiveBlending)}if(M)if(!W.wireframe&&W.shading==THREE.SmoothShading&&ta.vertexNormalsWorld.length==3){ha.r=va.r=Ja.r=N.r;ha.g=va.g=Ja.g=N.g;ha.b=va.b=Ja.b=N.b;Pa(Ka,ta.v1.positionWorld,ta.vertexNormalsWorld[0],ha);Pa(Ka,ta.v2.positionWorld,ta.vertexNormalsWorld[1],va);Pa(Ka,ta.v3.positionWorld,
ta.vertexNormalsWorld[2],Ja);Sa.r=(va.r+Ja.r)*0.5;Sa.g=(va.g+Ja.g)*0.5;Sa.b=(va.b+Ja.b)*0.5;Z=$a(ha,va,Ja,Sa);db(xa,sa,Ba,ga,ra,fa,Z,0,0,1,0,0,1)}else{I.r=N.r;I.g=N.g;I.b=N.b;Pa(Ka,ta.centroidWorld,ta.normalWorld,I);Aa.r=Math.max(0,Math.min(W.color.r*I.r,1));Aa.g=Math.max(0,Math.min(W.color.g*I.g,1));Aa.b=Math.max(0,Math.min(W.color.b*I.b,1));Aa.updateHex();W.wireframe?Ta(Aa,W.wireframeLinewidth,W.wireframeLinecap,W.wireframeLinejoin):fb(Aa)}else W.wireframe?Ta(W.color,W.wireframeLinewidth,W.wireframeLinecap,
W.wireframeLinejoin):fb(W.color)}else if(W instanceof THREE.MeshDepthMaterial){Wa=ya.near;O=ya.far;ha.r=ha.g=ha.b=1-Za(U.positionScreen.z,Wa,O);va.r=va.g=va.b=1-Za(la.positionScreen.z,Wa,O);Ja.r=Ja.g=Ja.b=1-Za(ia.positionScreen.z,Wa,O);Sa.r=(va.r+Ja.r)*0.5;Sa.g=(va.g+Ja.g)*0.5;Sa.b=(va.b+Ja.b)*0.5;Z=$a(ha,va,Ja,Sa);db(xa,sa,Ba,ga,ra,fa,Z,0,0,1,0,0,1)}else if(W instanceof THREE.MeshNormalMaterial){Aa.r=Oa(ta.normalWorld.x);Aa.g=Oa(ta.normalWorld.y);Aa.b=Oa(ta.normalWorld.z);Aa.updateHex();W.wireframe?
Ta(Aa,W.wireframeLinewidth,W.wireframeLinecap,W.wireframeLinejoin):fb(Aa)}}function ab(U,la,ia,ca,wa,Na,ta,W,Ka){h.data.vertices+=4;h.data.faces++;b(W.opacity);d(W.blending);if(W.map||W.envMap){v(U,la,ca,0,1,3,ta,W,Ka);v(wa,ia,Na,1,2,3,ta,W,Ka)}else{xa=U.positionScreen.x;sa=U.positionScreen.y;Ba=la.positionScreen.x;ga=la.positionScreen.y;ra=ia.positionScreen.x;fa=ia.positionScreen.y;za=ca.positionScreen.x;na=ca.positionScreen.y;ua=wa.positionScreen.x;qa=wa.positionScreen.y;ja=Na.positionScreen.x;
Fa=Na.positionScreen.y;if(W instanceof THREE.MeshBasicMaterial){Ua(xa,sa,Ba,ga,ra,fa,za,na);W.wireframe?Ta(W.color,W.wireframeLinewidth,W.wireframeLinecap,W.wireframeLinejoin):fb(W.color)}else if(W instanceof THREE.MeshLambertMaterial)if(M)if(!W.wireframe&&W.shading==THREE.SmoothShading&&ta.vertexNormalsWorld.length==4){ha.r=va.r=Ja.r=Sa.r=N.r;ha.g=va.g=Ja.g=Sa.g=N.g;ha.b=va.b=Ja.b=Sa.b=N.b;Pa(Ka,ta.v1.positionWorld,ta.vertexNormalsWorld[0],ha);Pa(Ka,ta.v2.positionWorld,ta.vertexNormalsWorld[1],va);
Pa(Ka,ta.v4.positionWorld,ta.vertexNormalsWorld[3],Ja);Pa(Ka,ta.v3.positionWorld,ta.vertexNormalsWorld[2],Sa);Z=$a(ha,va,Ja,Sa);gb(xa,sa,Ba,ga,za,na);db(xa,sa,Ba,ga,za,na,Z,0,0,1,0,0,1);gb(ua,qa,ra,fa,ja,Fa);db(ua,qa,ra,fa,ja,Fa,Z,1,0,1,1,0,1)}else{I.r=N.r;I.g=N.g;I.b=N.b;Pa(Ka,ta.centroidWorld,ta.normalWorld,I);Aa.r=Math.max(0,Math.min(W.color.r*I.r,1));Aa.g=Math.max(0,Math.min(W.color.g*I.g,1));Aa.b=Math.max(0,Math.min(W.color.b*I.b,1));Aa.updateHex();Ua(xa,sa,Ba,ga,ra,fa,za,na);W.wireframe?Ta(Aa,
W.wireframeLinewidth,W.wireframeLinecap,W.wireframeLinejoin):fb(Aa)}else{Ua(xa,sa,Ba,ga,ra,fa,za,na);W.wireframe?Ta(W.color,W.wireframeLinewidth,W.wireframeLinecap,W.wireframeLinejoin):fb(W.color)}else if(W instanceof THREE.MeshNormalMaterial){Aa.r=Oa(ta.normalWorld.x);Aa.g=Oa(ta.normalWorld.y);Aa.b=Oa(ta.normalWorld.z);Aa.updateHex();Ua(xa,sa,Ba,ga,ra,fa,za,na);W.wireframe?Ta(Aa,W.wireframeLinewidth,W.wireframeLinecap,W.wireframeLinejoin):fb(Aa)}else if(W instanceof THREE.MeshDepthMaterial){Wa=ya.near;
O=ya.far;ha.r=ha.g=ha.b=1-Za(U.positionScreen.z,Wa,O);va.r=va.g=va.b=1-Za(la.positionScreen.z,Wa,O);Ja.r=Ja.g=Ja.b=1-Za(ca.positionScreen.z,Wa,O);Sa.r=Sa.g=Sa.b=1-Za(ia.positionScreen.z,Wa,O);Z=$a(ha,va,Ja,Sa);gb(xa,sa,Ba,ga,za,na);db(xa,sa,Ba,ga,za,na,Z,0,0,1,0,0,1);gb(ua,qa,ra,fa,ja,Fa);db(ua,qa,ra,fa,ja,Fa,Z,1,0,1,1,0,1)}}}function gb(U,la,ia,ca,wa,Na){p.beginPath();p.moveTo(U,la);p.lineTo(ia,ca);p.lineTo(wa,Na);p.lineTo(U,la);p.closePath()}function Ua(U,la,ia,ca,wa,Na,ta,W){p.beginPath();p.moveTo(U,
la);p.lineTo(ia,ca);p.lineTo(wa,Na);p.lineTo(ta,W);p.lineTo(U,la);p.closePath()}function Ta(U,la,ia,ca){if(V!=la)p.lineWidth=V=la;if(P!=ia)p.lineCap=P=ia;if(Q!=ca)p.lineJoin=Q=ca;c(U);p.stroke();K.inflate(la*2)}function fb(U){f(U);p.fill()}function db(U,la,ia,ca,wa,Na,ta,W,Ka,kb,Ra,ib,mb){var eb,jb;eb=ta.width-1;jb=ta.height-1;W*=eb;Ka*=jb;kb*=eb;Ra*=jb;ib*=eb;mb*=jb;ia-=U;ca-=la;wa-=U;Na-=la;kb-=W;Ra-=Ka;ib-=W;mb-=Ka;eb=kb*mb-ib*Ra;if(eb!=0){jb=1/eb;eb=(mb*ia-Ra*wa)*jb;Ra=(mb*ca-Ra*Na)*jb;ia=(kb*
wa-ib*ia)*jb;ca=(kb*Na-ib*ca)*jb;U=U-eb*W-ia*Ka;la=la-Ra*W-ca*Ka;p.save();p.transform(eb,Ra,ia,ca,U,la);p.clip();p.drawImage(ta,0,0);p.restore()}}function $a(U,la,ia,ca){var wa=~~(U.r*255),Na=~~(U.g*255);U=~~(U.b*255);var ta=~~(la.r*255),W=~~(la.g*255);la=~~(la.b*255);var Ka=~~(ia.r*255),kb=~~(ia.g*255);ia=~~(ia.b*255);var Ra=~~(ca.r*255),ib=~~(ca.g*255);ca=~~(ca.b*255);Ha[0]=wa<0?0:wa>255?255:wa;Ha[1]=Na<0?0:Na>255?255:Na;Ha[2]=U<0?0:U>255?255:U;Ha[4]=ta<0?0:ta>255?255:ta;Ha[5]=W<0?0:W>255?255:W;
Ha[6]=la<0?0:la>255?255:la;Ha[8]=Ka<0?0:Ka>255?255:Ka;Ha[9]=kb<0?0:kb>255?255:kb;Ha[10]=ia<0?0:ia>255?255:ia;Ha[12]=Ra<0?0:Ra>255?255:Ra;Ha[13]=ib<0?0:ib>255?255:ib;Ha[14]=ca<0?0:ca>255?255:ca;X.putImageData(Ca,0,0);La.drawImage($,0,0);return Da}function Za(U,la,ia){U=(U-la)/(ia-la);return U*U*(3-2*U)}function Oa(U){U=(U+1)*0.5;return U<0?0:U>1?1:U}function Ya(U,la){var ia=la.x-U.x,ca=la.y-U.y,wa=1/Math.sqrt(ia*ia+ca*ca);ia*=wa;ca*=wa;la.x+=ia;la.y+=ca;U.x-=ia;U.y-=ca}var Va,Y,Ea,Qa,hb,lb,cb,Ia;this.autoClear?
this.clear():p.setTransform(1,0,0,-1,u,w);h.data.vertices=0;h.data.faces=0;j=k.projectScene(ma,ya,this.sortElements);(M=ma.lights.length>0)&&Ga(ma);Va=0;for(Y=j.length;Va<Y;Va++){Ea=j[Va];K.empty();if(Ea instanceof THREE.RenderableParticle){ka=Ea;ka.x*=u;ka.y*=w;Qa=0;for(hb=Ea.materials.length;Qa<hb;){Ia=Ea.materials[Qa++];Ia.opacity!=0&&E(ka,Ea,Ia,ma)}}else if(Ea instanceof THREE.RenderableLine){ka=Ea.v1;ea=Ea.v2;ka.positionScreen.x*=u;ka.positionScreen.y*=w;ea.positionScreen.x*=u;ea.positionScreen.y*=
w;K.addPoint(ka.positionScreen.x,ka.positionScreen.y);K.addPoint(ea.positionScreen.x,ea.positionScreen.y);if(x.instersects(K)){Qa=0;for(hb=Ea.materials.length;Qa<hb;){Ia=Ea.materials[Qa++];Ia.opacity!=0&&da(ka,ea,Ea,Ia,ma)}}}else if(Ea instanceof THREE.RenderableFace3){ka=Ea.v1;ea=Ea.v2;pa=Ea.v3;ka.positionScreen.x*=u;ka.positionScreen.y*=w;ea.positionScreen.x*=u;ea.positionScreen.y*=w;pa.positionScreen.x*=u;pa.positionScreen.y*=w;if(Ea.overdraw){Ya(ka.positionScreen,ea.positionScreen);Ya(ea.positionScreen,
pa.positionScreen);Ya(pa.positionScreen,ka.positionScreen)}K.add3Points(ka.positionScreen.x,ka.positionScreen.y,ea.positionScreen.x,ea.positionScreen.y,pa.positionScreen.x,pa.positionScreen.y);if(x.instersects(K)){Qa=0;for(hb=Ea.meshMaterials.length;Qa<hb;){Ia=Ea.meshMaterials[Qa++];if(Ia instanceof THREE.MeshFaceMaterial){lb=0;for(cb=Ea.faceMaterials.length;lb<cb;)(Ia=Ea.faceMaterials[lb++])&&Ia.opacity!=0&&v(ka,ea,pa,0,1,2,Ea,Ia,ma)}else Ia.opacity!=0&&v(ka,ea,pa,0,1,2,Ea,Ia,ma)}}}else if(Ea instanceof
THREE.RenderableFace4){ka=Ea.v1;ea=Ea.v2;pa=Ea.v3;aa=Ea.v4;ka.positionScreen.x*=u;ka.positionScreen.y*=w;ea.positionScreen.x*=u;ea.positionScreen.y*=w;pa.positionScreen.x*=u;pa.positionScreen.y*=w;aa.positionScreen.x*=u;aa.positionScreen.y*=w;oa.positionScreen.copy(ea.positionScreen);e.positionScreen.copy(aa.positionScreen);if(Ea.overdraw){Ya(ka.positionScreen,ea.positionScreen);Ya(ea.positionScreen,aa.positionScreen);Ya(aa.positionScreen,ka.positionScreen);Ya(pa.positionScreen,oa.positionScreen);
Ya(pa.positionScreen,e.positionScreen)}K.addPoint(ka.positionScreen.x,ka.positionScreen.y);K.addPoint(ea.positionScreen.x,ea.positionScreen.y);K.addPoint(pa.positionScreen.x,pa.positionScreen.y);K.addPoint(aa.positionScreen.x,aa.positionScreen.y);if(x.instersects(K)){Qa=0;for(hb=Ea.meshMaterials.length;Qa<hb;){Ia=Ea.meshMaterials[Qa++];if(Ia instanceof THREE.MeshFaceMaterial){lb=0;for(cb=Ea.faceMaterials.length;lb<cb;)(Ia=Ea.faceMaterials[lb++])&&Ia.opacity!=0&&ab(ka,ea,pa,aa,oa,e,Ea,Ia,ma)}else Ia.opacity!=
0&&ab(ka,ea,pa,aa,oa,e,Ea,Ia,ma)}}}A.addRectangle(K)}p.setTransform(1,0,0,1,0,0)}};
THREE.SVGRenderer=function(){function b(fa,za,na){var ua,qa,ja,Fa;ua=0;for(qa=fa.lights.length;ua<qa;ua++){ja=fa.lights[ua];if(ja instanceof THREE.DirectionalLight){Fa=za.normalWorld.dot(ja.position)*ja.intensity;if(Fa>0){na.r+=ja.color.r*Fa;na.g+=ja.color.g*Fa;na.b+=ja.color.b*Fa}}else if(ja instanceof THREE.PointLight){oa.sub(ja.position,za.centroidWorld);oa.normalize();Fa=za.normalWorld.dot(oa)*ja.intensity;if(Fa>0){na.r+=ja.color.r*Fa;na.g+=ja.color.g*Fa;na.b+=ja.color.b*Fa}}}}function d(fa,za,
na,ua,qa,ja){j.data.vertices+=3;j.data.faces++;sa=f(Ba++);sa.setAttribute("d","M "+fa.positionScreen.x+" "+fa.positionScreen.y+" L "+za.positionScreen.x+" "+za.positionScreen.y+" L "+na.positionScreen.x+","+na.positionScreen.y+"z");if(qa instanceof THREE.MeshBasicMaterial)P.hex=qa.color.hex;else if(qa instanceof THREE.MeshLambertMaterial)if(V){Q.r=ka.r;Q.g=ka.g;Q.b=ka.b;b(ja,ua,Q);P.r=Math.max(0,Math.min(qa.color.r*Q.r,1));P.g=Math.max(0,Math.min(qa.color.g*Q.g,1));P.b=Math.max(0,Math.min(qa.color.b*
Q.b,1));P.updateHex()}else P.hex=qa.color.hex;else if(qa instanceof THREE.MeshDepthMaterial){aa=1-qa.__2near/(qa.__farPlusNear-ua.z*qa.__farMinusNear);P.setRGB(aa,aa,aa)}else qa instanceof THREE.MeshNormalMaterial&&P.setRGB(g(ua.normalWorld.x),g(ua.normalWorld.y),g(ua.normalWorld.z));qa.wireframe?sa.setAttribute("style","fill: none; stroke: #"+h(P.hex.toString(16))+"; stroke-width: "+qa.wireframeLinewidth+"; stroke-opacity: "+qa.opacity+"; stroke-linecap: "+qa.wireframeLinecap+"; stroke-linejoin: "+
qa.wireframeLinejoin):sa.setAttribute("style","fill: #"+h(P.hex.toString(16))+"; fill-opacity: "+qa.opacity);o.appendChild(sa)}function c(fa,za,na,ua,qa,ja,Fa){j.data.vertices+=4;j.data.faces++;sa=f(Ba++);sa.setAttribute("d","M "+fa.positionScreen.x+" "+fa.positionScreen.y+" L "+za.positionScreen.x+" "+za.positionScreen.y+" L "+na.positionScreen.x+","+na.positionScreen.y+" L "+ua.positionScreen.x+","+ua.positionScreen.y+"z");if(ja instanceof THREE.MeshBasicMaterial)P.hex=ja.color.hex;else if(ja instanceof
THREE.MeshLambertMaterial)if(V){Q.r=ka.r;Q.g=ka.g;Q.b=ka.b;b(Fa,qa,Q);P.r=Math.max(0,Math.min(ja.color.r*Q.r,1));P.g=Math.max(0,Math.min(ja.color.g*Q.g,1));P.b=Math.max(0,Math.min(ja.color.b*Q.b,1));P.updateHex()}else P.hex=ja.color.hex;else if(ja instanceof THREE.MeshDepthMaterial){aa=1-ja.__2near/(ja.__farPlusNear-qa.z*ja.__farMinusNear);P.setRGB(aa,aa,aa)}else ja instanceof THREE.MeshNormalMaterial&&P.setRGB(g(qa.normalWorld.x),g(qa.normalWorld.y),g(qa.normalWorld.z));ja.wireframe?sa.setAttribute("style",
"fill: none; stroke: #"+h(P.hex.toString(16))+"; stroke-width: "+ja.wireframeLinewidth+"; stroke-opacity: "+ja.opacity+"; stroke-linecap: "+ja.wireframeLinecap+"; stroke-linejoin: "+ja.wireframeLinejoin):sa.setAttribute("style","fill: #"+h(P.hex.toString(16))+"; fill-opacity: "+ja.opacity);o.appendChild(sa)}function f(fa){if(e[fa]==null){e[fa]=document.createElementNS("http://www.w3.org/2000/svg","path");ra==0&&e[fa].setAttribute("shape-rendering","crispEdges")}return e[fa]}function g(fa){fa=(fa+
1)*0.5;return fa<0?0:fa>1?1:fa}function h(fa){for(;fa.length<6;)fa="0"+fa;return fa}var j=this,k=null,m=new THREE.Projector,o=document.createElementNS("http://www.w3.org/2000/svg","svg"),t,u,w,p,z,G,F,B,T=new THREE.Rectangle,C=new THREE.Rectangle,V=!1,P=new THREE.Color(16777215),Q=new THREE.Color(16777215),ka=new THREE.Color(0),ea=new THREE.Color(0),pa=new THREE.Color(0),aa,oa=new THREE.Vector3,e=[],xa=[],sa,Ba,ga,ra=1;this.domElement=o;this.autoClear=!0;this.sortObjects=!0;this.sortElements=!0;this.data=
{vertices:0,faces:0};this.setQuality=function(fa){switch(fa){case "high":ra=1;break;case "low":ra=0}};this.setSize=function(fa,za){t=fa;u=za;w=t/2;p=u/2;o.setAttribute("viewBox",-w+" "+-p+" "+t+" "+u);o.setAttribute("width",t);o.setAttribute("height",u);T.set(-w,-p,w,p)};this.clear=function(){for(;o.childNodes.length>0;)o.removeChild(o.childNodes[0])};this.render=function(fa,za){var na,ua,qa,ja,Fa,Aa,ha,va;this.autoClear&&this.clear();j.data.vertices=0;j.data.faces=0;k=m.projectScene(fa,za,this.sortElements);
ga=Ba=0;if(V=fa.lights.length>0){ha=fa.lights;ka.setRGB(0,0,0);ea.setRGB(0,0,0);pa.setRGB(0,0,0);na=0;for(ua=ha.length;na<ua;na++){qa=ha[na];ja=qa.color;if(qa instanceof THREE.AmbientLight){ka.r+=ja.r;ka.g+=ja.g;ka.b+=ja.b}else if(qa instanceof THREE.DirectionalLight){ea.r+=ja.r;ea.g+=ja.g;ea.b+=ja.b}else if(qa instanceof THREE.PointLight){pa.r+=ja.r;pa.g+=ja.g;pa.b+=ja.b}}}na=0;for(ua=k.length;na<ua;na++){ha=k[na];C.empty();if(ha instanceof THREE.RenderableParticle){z=ha;z.x*=w;z.y*=-p;qa=0;for(ja=
ha.materials.length;qa<ja;)qa++}else if(ha instanceof THREE.RenderableLine){z=ha.v1;G=ha.v2;z.positionScreen.x*=w;z.positionScreen.y*=-p;G.positionScreen.x*=w;G.positionScreen.y*=-p;C.addPoint(z.positionScreen.x,z.positionScreen.y);C.addPoint(G.positionScreen.x,G.positionScreen.y);if(T.instersects(C)){qa=0;for(ja=ha.materials.length;qa<ja;)if((va=ha.materials[qa++])&&va.opacity!=0){Fa=z;Aa=G;var Ja=ga++;if(xa[Ja]==null){xa[Ja]=document.createElementNS("http://www.w3.org/2000/svg","line");ra==0&&xa[Ja].setAttribute("shape-rendering",
"crispEdges")}sa=xa[Ja];sa.setAttribute("x1",Fa.positionScreen.x);sa.setAttribute("y1",Fa.positionScreen.y);sa.setAttribute("x2",Aa.positionScreen.x);sa.setAttribute("y2",Aa.positionScreen.y);if(va instanceof THREE.LineBasicMaterial){sa.setAttribute("style","fill: none; stroke: ##"+h(va.color.hex.toString(16))+"; stroke-width: "+va.linewidth+"; stroke-opacity: "+va.opacity+"; stroke-linecap: "+va.linecap+"; stroke-linejoin: "+va.linejoin);o.appendChild(sa)}}}}else if(ha instanceof THREE.RenderableFace3){z=
ha.v1;G=ha.v2;F=ha.v3;z.positionScreen.x*=w;z.positionScreen.y*=-p;G.positionScreen.x*=w;G.positionScreen.y*=-p;F.positionScreen.x*=w;F.positionScreen.y*=-p;C.addPoint(z.positionScreen.x,z.positionScreen.y);C.addPoint(G.positionScreen.x,G.positionScreen.y);C.addPoint(F.positionScreen.x,F.positionScreen.y);if(T.instersects(C)){qa=0;for(ja=ha.meshMaterials.length;qa<ja;){va=ha.meshMaterials[qa++];if(va instanceof THREE.MeshFaceMaterial){Fa=0;for(Aa=ha.faceMaterials.length;Fa<Aa;)(va=ha.faceMaterials[Fa++])&&
va.opacity!=0&&d(z,G,F,ha,va,fa)}else va&&va.opacity!=0&&d(z,G,F,ha,va,fa)}}}else if(ha instanceof THREE.RenderableFace4){z=ha.v1;G=ha.v2;F=ha.v3;B=ha.v4;z.positionScreen.x*=w;z.positionScreen.y*=-p;G.positionScreen.x*=w;G.positionScreen.y*=-p;F.positionScreen.x*=w;F.positionScreen.y*=-p;B.positionScreen.x*=w;B.positionScreen.y*=-p;C.addPoint(z.positionScreen.x,z.positionScreen.y);C.addPoint(G.positionScreen.x,G.positionScreen.y);C.addPoint(F.positionScreen.x,F.positionScreen.y);C.addPoint(B.positionScreen.x,
B.positionScreen.y);if(T.instersects(C)){qa=0;for(ja=ha.meshMaterials.length;qa<ja;){va=ha.meshMaterials[qa++];if(va instanceof THREE.MeshFaceMaterial){Fa=0;for(Aa=ha.faceMaterials.length;Fa<Aa;)(va=ha.faceMaterials[Fa++])&&va.opacity!=0&&c(z,G,F,B,ha,va,fa)}else va&&va.opacity!=0&&c(z,G,F,B,ha,va,fa)}}}}}};
THREE.ShaderChunk={fog_pars_fragment:"#ifdef USE_FOG\nuniform vec3 fogColor;\n#ifdef FOG_EXP2\nuniform float fogDensity;\n#else\nuniform float fogNear;\nuniform float fogFar;\n#endif\n#endif",fog_fragment:"#ifdef USE_FOG\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n#ifdef FOG_EXP2\nconst float LOG2 = 1.442695;\nfloat fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\nfogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n#else\nfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n#endif\ngl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n#endif",
envmap_pars_fragment:"#ifdef USE_ENVMAP\nvarying vec3 vReflect;\nuniform float reflectivity;\nuniform samplerCube envMap;\nuniform int combine;\n#endif",envmap_fragment:"#ifdef USE_ENVMAP\nvec4 cubeColor = textureCube( envMap, vec3( -vReflect.x, vReflect.yz ) );\nif ( combine == 1 ) {\ngl_FragColor = vec4( mix( gl_FragColor.xyz, cubeColor.xyz, reflectivity ), opacity );\n} else {\ngl_FragColor = gl_FragColor * cubeColor;\n}\n#endif",envmap_pars_vertex:"#ifdef USE_ENVMAP\nvarying vec3 vReflect;\nuniform float refractionRatio;\nuniform bool useRefract;\n#endif",
envmap_vertex:"#ifdef USE_ENVMAP\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvec3 nWorld = mat3( objectMatrix[0].xyz, objectMatrix[1].xyz, objectMatrix[2].xyz ) * normal;\nif ( useRefract ) {\nvReflect = refract( normalize( mPosition.xyz - cameraPosition ), normalize( nWorld.xyz ), refractionRatio );\n} else {\nvReflect = reflect( normalize( mPosition.xyz - cameraPosition ), normalize( nWorld.xyz ) );\n}\n#endif",map_particle_pars_fragment:"#ifdef USE_MAP\nuniform sampler2D map;\n#endif",
map_particle_fragment:"#ifdef USE_MAP\ngl_FragColor = gl_FragColor * texture2D( map, gl_PointCoord );\n#endif",map_pars_fragment:"#ifdef USE_MAP\nvarying vec2 vUv;\nuniform sampler2D map;\n#endif",map_pars_vertex:"#ifdef USE_MAP\nvarying vec2 vUv;\n#endif",map_fragment:"#ifdef USE_MAP\ngl_FragColor = gl_FragColor * texture2D( map, vUv );\n#endif",map_vertex:"#ifdef USE_MAP\nvUv = uv;\n#endif",lightmap_pars_fragment:"#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\nuniform sampler2D lightMap;\n#endif",lightmap_pars_vertex:"#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\n#endif",
lightmap_fragment:"#ifdef USE_LIGHTMAP\ngl_FragColor = gl_FragColor * texture2D( lightMap, vUv2 );\n#endif",lightmap_vertex:"#ifdef USE_LIGHTMAP\nvUv2 = uv2;\n#endif",lights_pars_vertex:"uniform bool enableLighting;\nuniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#ifdef PHONG\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\n#endif",
lights_vertex:"if ( !enableLighting ) {\nvLightWeighting = vec3( 1.0 );\n} else {\nvLightWeighting = ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nfor( int i = 0; i < MAX_DIR_LIGHTS; i++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nfloat directionalLightWeighting = max( dot( transformedNormal, normalize( lDirection.xyz ) ), 0.0 );\nvLightWeighting += directionalLightColor[ i ] * directionalLightWeighting;\n}\n#endif\n#if MAX_POINT_LIGHTS > 0\nfor( int i = 0; i < MAX_POINT_LIGHTS; i++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\nfloat pointLightWeighting = max( dot( transformedNormal, lVector ), 0.0 );\nvLightWeighting += pointLightColor[ i ] * pointLightWeighting * lDistance;\n#ifdef PHONG\nvPointLight[ i ] = vec4( lVector, lDistance );\n#endif\n}\n#endif\n}",
lights_pars_fragment:"#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;",lights_fragment:"vec3 normal = normalize( vNormal );\nvec3 viewPosition = normalize( vViewPosition );\nvec4 mColor = vec4( diffuse, opacity );\nvec4 mSpecular = vec4( specular, opacity );\n#if MAX_POINT_LIGHTS > 0\nvec4 pointDiffuse  = vec4( 0.0 );\nvec4 pointSpecular = vec4( 0.0 );\nfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec3 pointVector = normalize( vPointLight[ i ].xyz );\nvec3 pointHalfVector = normalize( vPointLight[ i ].xyz + vViewPosition );\nfloat pointDistance = vPointLight[ i ].w;\nfloat pointDotNormalHalf = dot( normal, pointHalfVector );\nfloat pointDiffuseWeight = max( dot( normal, pointVector ), 0.0 );\nfloat pointSpecularWeight = 0.0;\nif ( pointDotNormalHalf >= 0.0 )\npointSpecularWeight = pow( pointDotNormalHalf, shininess );\npointDiffuse  += mColor * pointDiffuseWeight * pointDistance;\npointSpecular += mSpecular * pointSpecularWeight * pointDistance;\n}\n#endif\n#if MAX_DIR_LIGHTS > 0\nvec4 dirDiffuse  = vec4( 0.0 );\nvec4 dirSpecular = vec4( 0.0 );\nfor( int i = 0; i < MAX_DIR_LIGHTS; i++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nvec3 dirHalfVector = normalize( lDirection.xyz + vViewPosition );\nfloat dirDotNormalHalf = dot( normal, dirHalfVector );\nfloat dirDiffuseWeight = max( dot( normal, dirVector ), 0.0 );\nfloat dirSpecularWeight = 0.0;\nif ( dirDotNormalHalf >= 0.0 )\ndirSpecularWeight = pow( dirDotNormalHalf, shininess );\ndirDiffuse  += mColor * dirDiffuseWeight;\ndirSpecular += mSpecular * dirSpecularWeight;\n}\n#endif\nvec4 totalLight = vec4( ambient, opacity );\n#if MAX_DIR_LIGHTS > 0\ntotalLight += dirDiffuse + dirSpecular;\n#endif\n#if MAX_POINT_LIGHTS > 0\ntotalLight += pointDiffuse + pointSpecular;\n#endif\ngl_FragColor = gl_FragColor * totalLight;",
color_pars_fragment:"#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",color_fragment:"#ifdef USE_COLOR\ngl_FragColor = gl_FragColor * vec4( vColor, opacity );\n#endif",color_pars_vertex:"#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",color_vertex:"#ifdef USE_COLOR\nvColor = color;\n#endif",skinning_pars_vertex:"#ifdef USE_SKINNING\nuniform mat4 boneGlobalMatrices[ MAX_BONES ];\n#endif",skinning_vertex:"#ifdef USE_SKINNING\ngl_Position  = ( boneGlobalMatrices[ int( skinIndex.x ) ] * skinVertexA ) * skinWeight.x;\ngl_Position += ( boneGlobalMatrices[ int( skinIndex.y ) ] * skinVertexB ) * skinWeight.y;\ngl_Position  = projectionMatrix * viewMatrix * objectMatrix * gl_Position;\n#endif",
morphtarget_pars_vertex:"#ifdef USE_MORPHTARGETS\nuniform float morphTargetInfluences[ 8 ];\n#endif",morphtarget_vertex:"#ifdef USE_MORPHTARGETS\nvec3 morphed = vec3( 0.0, 0.0, 0.0 );\nmorphed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\nmorphed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\nmorphed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\nmorphed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\nmorphed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\nmorphed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\nmorphed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\nmorphed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\nmorphed += position;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( morphed, 1.0 );\n#endif",
default_vertex:"#ifndef USE_MORPHTARGETS\n#ifndef USE_SKINNING\ngl_Position = projectionMatrix * mvPosition;\n#endif\n#endif"};THREE.UniformsUtils={merge:function(b){var d,c,f,g={};for(d=0;d<b.length;d++){f=this.clone(b[d]);for(c in f)g[c]=f[c]}return g},clone:function(b){var d,c,f,g={};for(d in b){g[d]={};for(c in b[d]){f=b[d][c];g[d][c]=f instanceof THREE.Color||f instanceof THREE.Vector3||f instanceof THREE.Texture?f.clone():f}}return g}};
THREE.UniformsLib={common:{diffuse:{type:"c",value:new THREE.Color(15658734)},opacity:{type:"f",value:1},map:{type:"t",value:0,texture:null},lightMap:{type:"t",value:2,texture:null},envMap:{type:"t",value:1,texture:null},useRefract:{type:"i",value:0},reflectivity:{type:"f",value:1},refractionRatio:{type:"f",value:0.98},combine:{type:"i",value:0},fogDensity:{type:"f",value:2.5E-4},fogNear:{type:"f",value:1},fogFar:{type:"f",value:2E3},fogColor:{type:"c",value:new THREE.Color(16777215)},morphTargetInfluences:{type:"f",
value:0}},lights:{enableLighting:{type:"i",value:1},ambientLightColor:{type:"fv",value:[]},directionalLightDirection:{type:"fv",value:[]},directionalLightColor:{type:"fv",value:[]},pointLightColor:{type:"fv",value:[]},pointLightPosition:{type:"fv",value:[]},pointLightDistance:{type:"fv1",value:[]}},particle:{psColor:{type:"c",value:new THREE.Color(15658734)},opacity:{type:"f",value:1},size:{type:"f",value:1},scale:{type:"f",value:1},map:{type:"t",value:0,texture:null},fogDensity:{type:"f",value:2.5E-4},
fogNear:{type:"f",value:1},fogFar:{type:"f",value:2E3},fogColor:{type:"c",value:new THREE.Color(16777215)}}};
THREE.ShaderLib={lensFlareVertexTexture:{vertexShader:"uniform \tvec3 \tscreenPosition;\nuniform\tvec2\tscale;\nuniform\tfloat\trotation;\nuniform    int     renderType;\nuniform\tsampler2D\tocclusionMap;\nattribute \tvec2 \tposition;\nattribute  vec2\tUV;\nvarying\tvec2\tvUV;\nvarying\tfloat\tvVisibility;\nvoid main(void)\n{\nvUV = UV;\nvec2 pos = position;\nif( renderType == 2 ) {\nvec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 )) +\ntexture2D( occlusionMap, vec2( 0.5, 0.1 )) +\ntexture2D( occlusionMap, vec2( 0.9, 0.1 )) +\ntexture2D( occlusionMap, vec2( 0.9, 0.5 )) +\ntexture2D( occlusionMap, vec2( 0.9, 0.9 )) +\ntexture2D( occlusionMap, vec2( 0.5, 0.9 )) +\ntexture2D( occlusionMap, vec2( 0.1, 0.9 )) +\ntexture2D( occlusionMap, vec2( 0.1, 0.5 )) +\ntexture2D( occlusionMap, vec2( 0.5, 0.5 ));\nvVisibility = (       visibility.r / 9.0 ) *\n( 1.0 - visibility.g / 9.0 ) *\n(       visibility.b / 9.0 ) *\n( 1.0 - visibility.a / 9.0 );\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4(( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",fragmentShader:"#ifdef GL_ES\nprecision highp float;\n#endif\nuniform\tsampler2D\tmap;\nuniform\tfloat\t\topacity;\nuniform    int         renderType;\nvarying\tvec2\t\tvUV;\nvarying\tfloat\t\tvVisibility;\nvoid main( void )\n{\nif( renderType == 0 ) {\ngl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nvec4 color = texture2D( map, vUV );\ncolor.a *= opacity * vVisibility;\ngl_FragColor = color;\n}\n}"},
lensFlare:{vertexShader:"uniform \tvec3 \tscreenPosition;\nuniform\tvec2\tscale;\nuniform\tfloat\trotation;\nuniform    int     renderType;\nattribute \tvec2 \tposition;\nattribute  vec2\tUV;\nvarying\tvec2\tvUV;\nvoid main(void)\n{\nvUV = UV;\nvec2 pos = position;\nif( renderType == 2 ) {\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4(( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",
fragmentShader:"#ifdef GL_ES\nprecision highp float;\n#endif\nuniform\tsampler2D\tmap;\nuniform\tsampler2D\tocclusionMap;\nuniform\tfloat\t\topacity;\nuniform    int         renderType;\nvarying\tvec2\t\tvUV;\nvoid main( void )\n{\nif( renderType == 0 ) {\ngl_FragColor = vec4( texture2D( map, vUV ).rgb, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nfloat visibility = texture2D( occlusionMap, vec2( 0.5, 0.1 )).a +\ntexture2D( occlusionMap, vec2( 0.9, 0.5 )).a +\ntexture2D( occlusionMap, vec2( 0.5, 0.9 )).a +\ntexture2D( occlusionMap, vec2( 0.1, 0.5 )).a;\nvisibility = ( 1.0 - visibility / 4.0 );\nvec4 color = texture2D( map, vUV );\ncolor.a *= opacity * visibility;\ngl_FragColor = color;\n}\n}"},
sprite:{vertexShader:"uniform\tint\t\tuseScreenCoordinates;\nuniform    int     affectedByDistance;\nuniform\tvec3\tscreenPosition;\nuniform \tmat4 \tmodelViewMatrix;\nuniform \tmat4 \tprojectionMatrix;\nuniform    float   rotation;\nuniform    vec2    scale;\nuniform    vec2    alignment;\nuniform    vec2    uvOffset;\nuniform\tvec2    uvScale;\nattribute \tvec2 \tposition;\nattribute  vec2\tuv;\nvarying\tvec2\tvUV;\nvoid main(void)\n{\nvUV = uvOffset + uv * uvScale;\nvec2 alignedPosition = position + alignment;\nvec2 rotatedPosition;\nrotatedPosition.x = ( cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y ) * scale.x;\nrotatedPosition.y = ( sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y ) * scale.y;\nvec4 finalPosition;\nif( useScreenCoordinates != 0 ) {\nfinalPosition = vec4( screenPosition.xy + rotatedPosition, screenPosition.z, 1.0 );\n} else {\nfinalPosition = projectionMatrix * modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\nfinalPosition.xy += rotatedPosition * ( affectedByDistance == 1 ? 1.0 : finalPosition.z );\n}\ngl_Position = finalPosition;\n}",
fragmentShader:"#ifdef GL_ES\nprecision highp float;\n#endif\nuniform\tsampler2D\tmap;\nuniform\tfloat\t\topacity;\nvarying\tvec2\t\tvUV;\nvoid main( void )\n{\nvec4 color = texture2D( map, vUV );\ncolor.a *= opacity;\ngl_FragColor = color;\n}"},shadowPost:{vertexShader:"uniform \tmat4 \tprojectionMatrix;\nattribute \tvec3 \tposition;\nvoid main(void)\n{\ngl_Position = projectionMatrix * vec4( position, 1.0 );\n}",fragmentShader:"#ifdef GL_ES\nprecision highp float;\n#endif\nuniform \tfloat \tdarkness;\nvoid main( void )\n{\ngl_FragColor = vec4( 0, 0, 0, darkness );\n}"},
shadowVolumeDynamic:{uniforms:{directionalLightDirection:{type:"fv",value:[]}},vertexShader:"uniform \tvec3 \tdirectionalLightDirection;\nvoid main() {\nvec4 pos      = objectMatrix * vec4( position, 1.0 );\nvec3 norm     = mat3( objectMatrix[0].xyz, objectMatrix[1].xyz, objectMatrix[2].xyz ) * normal;\nvec4 extruded = vec4( directionalLightDirection * 5000.0 * step( 0.0, dot( directionalLightDirection, norm )), 0.0 );\ngl_Position   = projectionMatrix * viewMatrix * ( pos + extruded );\n}",fragmentShader:"void main() {\ngl_FragColor = vec4( 1.0 );\n}"},
depth:{uniforms:{mNear:{type:"f",value:1},mFar:{type:"f",value:2E3},opacity:{type:"f",value:1}},fragmentShader:"uniform float mNear;\nuniform float mFar;\nuniform float opacity;\nvoid main() {\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\nfloat color = 1.0 - smoothstep( mNear, mFar, depth );\ngl_FragColor = vec4( vec3( color ), opacity );\n}",vertexShader:"void main() {\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}"},normal:{uniforms:{opacity:{type:"f",value:1}},
fragmentShader:"uniform float opacity;\nvarying vec3 vNormal;\nvoid main() {\ngl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, opacity );\n}",vertexShader:"varying vec3 vNormal;\nvoid main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvNormal = normalize( normalMatrix * normal );\ngl_Position = projectionMatrix * mvPosition;\n}"},basic:{uniforms:THREE.UniformsLib.common,fragmentShader:["uniform vec3 diffuse;\nuniform float opacity;",THREE.ShaderChunk.color_pars_fragment,THREE.ShaderChunk.map_pars_fragment,
THREE.ShaderChunk.lightmap_pars_fragment,THREE.ShaderChunk.envmap_pars_fragment,THREE.ShaderChunk.fog_pars_fragment,"void main() {\ngl_FragColor = vec4( diffuse, opacity );",THREE.ShaderChunk.map_fragment,THREE.ShaderChunk.lightmap_fragment,THREE.ShaderChunk.color_fragment,THREE.ShaderChunk.envmap_fragment,THREE.ShaderChunk.fog_fragment,"}"].join("\n"),vertexShader:[THREE.ShaderChunk.map_pars_vertex,THREE.ShaderChunk.lightmap_pars_vertex,THREE.ShaderChunk.envmap_pars_vertex,THREE.ShaderChunk.color_pars_vertex,
THREE.ShaderChunk.skinning_pars_vertex,THREE.ShaderChunk.morphtarget_pars_vertex,"void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",THREE.ShaderChunk.map_vertex,THREE.ShaderChunk.lightmap_vertex,THREE.ShaderChunk.envmap_vertex,THREE.ShaderChunk.color_vertex,THREE.ShaderChunk.skinning_vertex,THREE.ShaderChunk.morphtarget_vertex,THREE.ShaderChunk.default_vertex,"}"].join("\n")},lambert:{uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib.common,THREE.UniformsLib.lights]),
fragmentShader:["uniform vec3 diffuse;\nuniform float opacity;\nvarying vec3 vLightWeighting;",THREE.ShaderChunk.color_pars_fragment,THREE.ShaderChunk.map_pars_fragment,THREE.ShaderChunk.lightmap_pars_fragment,THREE.ShaderChunk.envmap_pars_fragment,THREE.ShaderChunk.fog_pars_fragment,"void main() {\ngl_FragColor = vec4( diffuse, opacity );\ngl_FragColor = gl_FragColor * vec4( vLightWeighting, 1.0 );",THREE.ShaderChunk.map_fragment,THREE.ShaderChunk.lightmap_fragment,THREE.ShaderChunk.color_fragment,
THREE.ShaderChunk.envmap_fragment,THREE.ShaderChunk.fog_fragment,"}"].join("\n"),vertexShader:["varying vec3 vLightWeighting;",THREE.ShaderChunk.map_pars_vertex,THREE.ShaderChunk.lightmap_pars_vertex,THREE.ShaderChunk.envmap_pars_vertex,THREE.ShaderChunk.lights_pars_vertex,THREE.ShaderChunk.color_pars_vertex,THREE.ShaderChunk.skinning_pars_vertex,THREE.ShaderChunk.morphtarget_pars_vertex,"void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",THREE.ShaderChunk.map_vertex,THREE.ShaderChunk.lightmap_vertex,
THREE.ShaderChunk.envmap_vertex,THREE.ShaderChunk.color_vertex,"vec3 transformedNormal = normalize( normalMatrix * normal );",THREE.ShaderChunk.lights_vertex,THREE.ShaderChunk.skinning_vertex,THREE.ShaderChunk.morphtarget_vertex,THREE.ShaderChunk.default_vertex,"}"].join("\n")},phong:{uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib.common,THREE.UniformsLib.lights,{ambient:{type:"c",value:new THREE.Color(328965)},specular:{type:"c",value:new THREE.Color(1118481)},shininess:{type:"f",value:30}}]),
fragmentShader:["uniform vec3 diffuse;\nuniform float opacity;\nuniform vec3 ambient;\nuniform vec3 specular;\nuniform float shininess;\nvarying vec3 vLightWeighting;",THREE.ShaderChunk.color_pars_fragment,THREE.ShaderChunk.map_pars_fragment,THREE.ShaderChunk.lightmap_pars_fragment,THREE.ShaderChunk.envmap_pars_fragment,THREE.ShaderChunk.fog_pars_fragment,THREE.ShaderChunk.lights_pars_fragment,"void main() {\ngl_FragColor = vec4( vLightWeighting, 1.0 );",THREE.ShaderChunk.lights_fragment,THREE.ShaderChunk.map_fragment,
THREE.ShaderChunk.lightmap_fragment,THREE.ShaderChunk.color_fragment,THREE.ShaderChunk.envmap_fragment,THREE.ShaderChunk.fog_fragment,"}"].join("\n"),vertexShader:["#define PHONG\nvarying vec3 vLightWeighting;\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;",THREE.ShaderChunk.map_pars_vertex,THREE.ShaderChunk.lightmap_pars_vertex,THREE.ShaderChunk.envmap_pars_vertex,THREE.ShaderChunk.lights_pars_vertex,THREE.ShaderChunk.color_pars_vertex,THREE.ShaderChunk.skinning_pars_vertex,THREE.ShaderChunk.morphtarget_pars_vertex,
"void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",THREE.ShaderChunk.map_vertex,THREE.ShaderChunk.lightmap_vertex,THREE.ShaderChunk.envmap_vertex,THREE.ShaderChunk.color_vertex,"#ifndef USE_ENVMAP\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\n#endif\nvViewPosition = cameraPosition - mPosition.xyz;\nvec3 transformedNormal = normalize( normalMatrix * normal );\nvNormal = transformedNormal;",THREE.ShaderChunk.lights_vertex,THREE.ShaderChunk.skinning_vertex,THREE.ShaderChunk.morphtarget_vertex,
THREE.ShaderChunk.default_vertex,"}"].join("\n")},particle_basic:{uniforms:THREE.UniformsLib.particle,fragmentShader:["uniform vec3 psColor;\nuniform float opacity;",THREE.ShaderChunk.color_pars_fragment,THREE.ShaderChunk.map_particle_pars_fragment,THREE.ShaderChunk.fog_pars_fragment,"void main() {\ngl_FragColor = vec4( psColor, opacity );",THREE.ShaderChunk.map_particle_fragment,THREE.ShaderChunk.color_fragment,THREE.ShaderChunk.fog_fragment,"}"].join("\n"),vertexShader:["uniform float size;\nuniform float scale;",
THREE.ShaderChunk.color_pars_vertex,"void main() {",THREE.ShaderChunk.color_vertex,"vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n#ifdef USE_SIZEATTENUATION\ngl_PointSize = size * ( scale / length( mvPosition.xyz ) );\n#else\ngl_PointSize = size;\n#endif\ngl_Position = projectionMatrix * mvPosition;\n}"].join("\n")}};
THREE.WebGLRenderer=function(b){function d(n,D,y){var x,A,K,M=n.vertices,I=M.length,N=n.colors,H=N.length,L=n.__vertexArray,J=n.__colorArray,$=n.__sortArray,X=n.__dirtyVertices,Ca=n.__dirtyColors;if(y.sortParticles){va.multiplySelf(y.matrixWorld);for(x=0;x<I;x++){A=M[x].position;Wa.copy(A);va.multiplyVector3(Wa);$[x]=[Wa.z,x]}$.sort(function(Ha,Da){return Da[0]-Ha[0]});for(x=0;x<I;x++){A=M[$[x][1]].position;K=x*3;L[K]=A.x;L[K+1]=A.y;L[K+2]=A.z}for(x=0;x<H;x++){K=x*3;color=N[$[x][1]];J[K]=color.r;
J[K+1]=color.g;J[K+2]=color.b}}else{if(X)for(x=0;x<I;x++){A=M[x].position;K=x*3;L[K]=A.x;L[K+1]=A.y;L[K+2]=A.z}if(Ca)for(x=0;x<H;x++){color=N[x];K=x*3;J[K]=color.r;J[K+1]=color.g;J[K+2]=color.b}}if(X||y.sortParticles){e.bindBuffer(e.ARRAY_BUFFER,n.__webglVertexBuffer);e.bufferData(e.ARRAY_BUFFER,L,D)}if(Ca||y.sortParticles){e.bindBuffer(e.ARRAY_BUFFER,n.__webglColorBuffer);e.bufferData(e.ARRAY_BUFFER,J,D)}}function c(n,D,y,x,A){x.program||oa.initMaterial(x,D,y,A);var K=x.program,M=K.uniforms,I=x.uniforms;
if(K!=Ba){e.useProgram(K);Ba=K}e.uniformMatrix4fv(M.projectionMatrix,!1,Ja);if(y&&(x instanceof THREE.MeshBasicMaterial||x instanceof THREE.MeshLambertMaterial||x instanceof THREE.MeshPhongMaterial||x instanceof THREE.LineBasicMaterial||x instanceof THREE.ParticleBasicMaterial||x.fog)){I.fogColor.value=y.color;if(y instanceof THREE.Fog){I.fogNear.value=y.near;I.fogFar.value=y.far}else if(y instanceof THREE.FogExp2)I.fogDensity.value=y.density}if(x instanceof THREE.MeshPhongMaterial||x instanceof THREE.MeshLambertMaterial||
x.lights){var N,H,L=0,J=0,$=0,X,Ca,Ha,Da,La=O,Xa=La.directional.colors,ma=La.directional.positions,ya=La.point.colors,Ga=La.point.positions,Pa=La.point.distances,E=0,da=0;y=H=Da=0;for(N=D.length;y<N;y++){H=D[y];X=H.color;Ca=H.position;Ha=H.intensity;Da=H.distance;if(H instanceof THREE.AmbientLight){L+=X.r;J+=X.g;$+=X.b}else if(H instanceof THREE.DirectionalLight){Da=E*3;Xa[Da]=X.r*Ha;Xa[Da+1]=X.g*Ha;Xa[Da+2]=X.b*Ha;ma[Da]=Ca.x;ma[Da+1]=Ca.y;ma[Da+2]=Ca.z;E+=1}else if(H instanceof THREE.PointLight){H=
da*3;ya[H]=X.r*Ha;ya[H+1]=X.g*Ha;ya[H+2]=X.b*Ha;Ga[H]=Ca.x;Ga[H+1]=Ca.y;Ga[H+2]=Ca.z;Pa[da]=Da;da+=1}}for(y=E*3;y<Xa.length;y++)Xa[y]=0;for(y=da*3;y<ya.length;y++)ya[y]=0;La.point.length=da;La.directional.length=E;La.ambient[0]=L;La.ambient[1]=J;La.ambient[2]=$;y=O;I.enableLighting.value=y.directional.length+y.point.length;I.ambientLightColor.value=y.ambient;I.directionalLightColor.value=y.directional.colors;I.directionalLightDirection.value=y.directional.positions;I.pointLightColor.value=y.point.colors;
I.pointLightPosition.value=y.point.positions;I.pointLightDistance.value=y.point.distances}if(x instanceof THREE.MeshBasicMaterial||x instanceof THREE.MeshLambertMaterial||x instanceof THREE.MeshPhongMaterial){I.diffuse.value=x.color;I.opacity.value=x.opacity;I.map.texture=x.map;I.lightMap.texture=x.lightMap;I.envMap.texture=x.envMap;I.reflectivity.value=x.reflectivity;I.refractionRatio.value=x.refractionRatio;I.combine.value=x.combine;I.useRefract.value=x.envMap&&x.envMap.mapping instanceof THREE.CubeRefractionMapping}if(x instanceof
THREE.LineBasicMaterial){I.diffuse.value=x.color;I.opacity.value=x.opacity}else if(x instanceof THREE.ParticleBasicMaterial){I.psColor.value=x.color;I.opacity.value=x.opacity;I.size.value=x.size;I.scale.value=xa.height/2;I.map.texture=x.map}else if(x instanceof THREE.MeshPhongMaterial){I.ambient.value=x.ambient;I.specular.value=x.specular;I.shininess.value=x.shininess}else if(x instanceof THREE.MeshDepthMaterial){I.mNear.value=n.near;I.mFar.value=n.far;I.opacity.value=x.opacity}else if(x instanceof
THREE.MeshNormalMaterial)I.opacity.value=x.opacity;for(var v in I)if(J=K.uniforms[v]){N=I[v];L=N.type;y=N.value;if(L=="i")e.uniform1i(J,y);else if(L=="f")e.uniform1f(J,y);else if(L=="fv1")e.uniform1fv(J,y);else if(L=="fv")e.uniform3fv(J,y);else if(L=="v2")e.uniform2f(J,y.x,y.y);else if(L=="v3")e.uniform3f(J,y.x,y.y,y.z);else if(L=="v4")e.uniform4f(J,y.x,y.y,y.z,y.w);else if(L=="c")e.uniform3f(J,y.r,y.g,y.b);else if(L=="t"){e.uniform1i(J,y);if(N=N.texture)if(N.image instanceof Array&&N.image.length==
6){if(N.image.length==6){if(N.needsUpdate){if(N.__webglInit){e.bindTexture(e.TEXTURE_CUBE_MAP,N.image.__webglTextureCube);for(L=0;L<6;++L)e.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+L,0,0,0,e.RGBA,e.UNSIGNED_BYTE,N.image[L])}else{N.image.__webglTextureCube=e.createTexture();e.bindTexture(e.TEXTURE_CUBE_MAP,N.image.__webglTextureCube);for(L=0;L<6;++L)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+L,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,N.image[L]);N.__webglInit=!0}P(e.TEXTURE_CUBE_MAP,N,N.image[0]);e.bindTexture(e.TEXTURE_CUBE_MAP,
null);N.needsUpdate=!1}e.activeTexture(e.TEXTURE0+y);e.bindTexture(e.TEXTURE_CUBE_MAP,N.image.__webglTextureCube)}}else Q(N,y)}}e.uniformMatrix4fv(M.modelViewMatrix,!1,A._modelViewMatrixArray);e.uniformMatrix3fv(M.normalMatrix,!1,A._normalMatrixArray);(x instanceof THREE.MeshShaderMaterial||x instanceof THREE.MeshPhongMaterial||x.envMap)&&M.cameraPosition!==null&&e.uniform3f(M.cameraPosition,n.position.x,n.position.y,n.position.z);(x instanceof THREE.MeshShaderMaterial||x.envMap||x.skinning)&&M.objectMatrix!==
null&&e.uniformMatrix4fv(M.objectMatrix,!1,A._objectMatrixArray);(x instanceof THREE.MeshPhongMaterial||x instanceof THREE.MeshLambertMaterial||x instanceof THREE.MeshShaderMaterial||x.skinning)&&M.viewMatrix!==null&&e.uniformMatrix4fv(M.viewMatrix,!1,Sa);if(x instanceof THREE.ShadowVolumeDynamicMaterial){n=I.directionalLightDirection.value;n[0]=-D[1].position.x;n[1]=-D[1].position.y;n[2]=-D[1].position.z;e.uniform3fv(M.directionalLightDirection,n);e.uniformMatrix4fv(M.objectMatrix,!1,A._objectMatrixArray);
e.uniformMatrix4fv(M.viewMatrix,!1,Sa)}if(x.skinning){e.uniformMatrix4fv(M.cameraInverseMatrix,!1,Sa);e.uniformMatrix4fv(M.boneGlobalMatrices,!1,A.boneMatrices)}return K}function f(n,D,y,x,A,K){if(x.opacity!=0){var M;n=c(n,D,y,x,K).attributes;if(!x.morphTargets&&n.position>=0){e.bindBuffer(e.ARRAY_BUFFER,A.__webglVertexBuffer);e.vertexAttribPointer(n.position,3,e.FLOAT,!1,0,0)}else{D=x.program.attributes;if(K.morphTargetBase!==-1){e.bindBuffer(e.ARRAY_BUFFER,A.__webglMorphTargetsBuffers[K.morphTargetBase]);
e.vertexAttribPointer(D.position,3,e.FLOAT,!1,0,0)}else if(D.position>=0){e.bindBuffer(e.ARRAY_BUFFER,A.__webglVertexBuffer);e.vertexAttribPointer(D.position,3,e.FLOAT,!1,0,0)}if(K.morphTargetForcedOrder.length){y=0;for(var I=K.morphTargetForcedOrder,N=K.morphTargetInfluences;y<x.numSupportedMorphTargets&&y<I.length;){e.bindBuffer(e.ARRAY_BUFFER,A.__webglMorphTargetsBuffers[I[y]]);e.vertexAttribPointer(D["morphTarget"+y],3,e.FLOAT,!1,0,0);K.__webglMorphTargetInfluences[y]=N[I[y]];y++}}else{I=[];var H=
-1,L=0;N=K.morphTargetInfluences;var J,$=N.length;y=0;for(K.morphTargetBase!==-1&&(I[K.morphTargetBase]=!0);y<x.numSupportedMorphTargets;){for(J=0;J<$;J++)if(!I[J]&&N[J]>H){L=J;H=N[L]}e.bindBuffer(e.ARRAY_BUFFER,A.__webglMorphTargetsBuffers[L]);e.vertexAttribPointer(D["morphTarget"+y],3,e.FLOAT,!1,0,0);K.__webglMorphTargetInfluences[y]=H;I[L]=1;H=-1;y++}}x.program.uniforms.morphTargetInfluences!==null&&e.uniform1fv(x.program.uniforms.morphTargetInfluences,K.__webglMorphTargetInfluences)}if(x.attributes)for(M in x.attributes)if(n[M]>=
0){D=x.attributes[M];e.bindBuffer(e.ARRAY_BUFFER,D.buffer);e.vertexAttribPointer(n[M],D.size,e.FLOAT,!1,0,0)}if(n.color>=0){e.bindBuffer(e.ARRAY_BUFFER,A.__webglColorBuffer);e.vertexAttribPointer(n.color,3,e.FLOAT,!1,0,0)}if(n.normal>=0){e.bindBuffer(e.ARRAY_BUFFER,A.__webglNormalBuffer);e.vertexAttribPointer(n.normal,3,e.FLOAT,!1,0,0)}if(n.tangent>=0){e.bindBuffer(e.ARRAY_BUFFER,A.__webglTangentBuffer);e.vertexAttribPointer(n.tangent,4,e.FLOAT,!1,0,0)}if(n.uv>=0)if(A.__webglUVBuffer){e.bindBuffer(e.ARRAY_BUFFER,
A.__webglUVBuffer);e.vertexAttribPointer(n.uv,2,e.FLOAT,!1,0,0);e.enableVertexAttribArray(n.uv)}else e.disableVertexAttribArray(n.uv);if(n.uv2>=0)if(A.__webglUV2Buffer){e.bindBuffer(e.ARRAY_BUFFER,A.__webglUV2Buffer);e.vertexAttribPointer(n.uv2,2,e.FLOAT,!1,0,0);e.enableVertexAttribArray(n.uv2)}else e.disableVertexAttribArray(n.uv2);if(x.skinning&&n.skinVertexA>=0&&n.skinVertexB>=0&&n.skinIndex>=0&&n.skinWeight>=0){e.bindBuffer(e.ARRAY_BUFFER,A.__webglSkinVertexABuffer);e.vertexAttribPointer(n.skinVertexA,
4,e.FLOAT,!1,0,0);e.bindBuffer(e.ARRAY_BUFFER,A.__webglSkinVertexBBuffer);e.vertexAttribPointer(n.skinVertexB,4,e.FLOAT,!1,0,0);e.bindBuffer(e.ARRAY_BUFFER,A.__webglSkinIndicesBuffer);e.vertexAttribPointer(n.skinIndex,4,e.FLOAT,!1,0,0);e.bindBuffer(e.ARRAY_BUFFER,A.__webglSkinWeightsBuffer);e.vertexAttribPointer(n.skinWeight,4,e.FLOAT,!1,0,0)}if(K instanceof THREE.Mesh){if(x.wireframe){e.lineWidth(x.wireframeLinewidth);e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,A.__webglLineBuffer);e.drawElements(e.LINES,
A.__webglLineCount,e.UNSIGNED_SHORT,0)}else{e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,A.__webglFaceBuffer);e.drawElements(e.TRIANGLES,A.__webglFaceCount,e.UNSIGNED_SHORT,0)}oa.data.vertices+=A.__webglFaceCount;oa.data.faces+=A.__webglFaceCount/3;oa.data.drawCalls++}else if(K instanceof THREE.Line){K=K.type==THREE.LineStrip?e.LINE_STRIP:e.LINES;e.lineWidth(x.linewidth);e.drawArrays(K,0,A.__webglLineCount);oa.data.drawCalls++}else if(K instanceof THREE.ParticleSystem){e.drawArrays(e.POINTS,0,A.__webglParticleCount);
oa.data.drawCalls++}else if(K instanceof THREE.Ribbon){e.drawArrays(e.TRIANGLE_STRIP,0,A.__webglVertexCount);oa.data.drawCalls++}}}function g(n,D,y){if(!n.__webglVertexBuffer)n.__webglVertexBuffer=e.createBuffer();if(!n.__webglNormalBuffer)n.__webglNormalBuffer=e.createBuffer();if(n.hasPos){e.bindBuffer(e.ARRAY_BUFFER,n.__webglVertexBuffer);e.bufferData(e.ARRAY_BUFFER,n.positionArray,e.DYNAMIC_DRAW);e.enableVertexAttribArray(D.attributes.position);e.vertexAttribPointer(D.attributes.position,3,e.FLOAT,
!1,0,0)}if(n.hasNormal){e.bindBuffer(e.ARRAY_BUFFER,n.__webglNormalBuffer);if(y==THREE.FlatShading){var x,A,K,M,I,N,H,L,J,$,X=n.count*3;for($=0;$<X;$+=9){y=n.normalArray;x=y[$];A=y[$+1];K=y[$+2];M=y[$+3];N=y[$+4];L=y[$+5];I=y[$+6];H=y[$+7];J=y[$+8];x=(x+M+I)/3;A=(A+N+H)/3;K=(K+L+J)/3;y[$]=x;y[$+1]=A;y[$+2]=K;y[$+3]=x;y[$+4]=A;y[$+5]=K;y[$+6]=x;y[$+7]=A;y[$+8]=K}}e.bufferData(e.ARRAY_BUFFER,n.normalArray,e.DYNAMIC_DRAW);e.enableVertexAttribArray(D.attributes.normal);e.vertexAttribPointer(D.attributes.normal,
3,e.FLOAT,!1,0,0)}e.drawArrays(e.TRIANGLES,0,n.count);n.count=0}function h(n){if(fa!=n.doubleSided){n.doubleSided?e.disable(e.CULL_FACE):e.enable(e.CULL_FACE);fa=n.doubleSided}if(za!=n.flipSided){n.flipSided?e.frontFace(e.CW):e.frontFace(e.CCW);za=n.flipSided}}function j(n){if(ua!=n){n?e.enable(e.DEPTH_TEST):e.disable(e.DEPTH_TEST);ua=n}}function k(n){ha[0].set(n.n41-n.n11,n.n42-n.n12,n.n43-n.n13,n.n44-n.n14);ha[1].set(n.n41+n.n11,n.n42+n.n12,n.n43+n.n13,n.n44+n.n14);ha[2].set(n.n41+n.n21,n.n42+n.n22,
n.n43+n.n23,n.n44+n.n24);ha[3].set(n.n41-n.n21,n.n42-n.n22,n.n43-n.n23,n.n44-n.n24);ha[4].set(n.n41-n.n31,n.n42-n.n32,n.n43-n.n33,n.n44-n.n34);ha[5].set(n.n41+n.n31,n.n42+n.n32,n.n43+n.n33,n.n44+n.n34);var D;for(n=0;n<6;n++){D=ha[n];D.divideScalar(Math.sqrt(D.x*D.x+D.y*D.y+D.z*D.z))}}function m(n){for(var D=n.matrixWorld,y=-n.geometry.boundingSphere.radius*Math.max(n.scale.x,Math.max(n.scale.y,n.scale.z)),x=0;x<6;x++){n=ha[x].x*D.n14+ha[x].y*D.n24+ha[x].z*D.n34+ha[x].w;if(n<=y)return!1}return!0}function o(n,
D){n.list[n.count]=D;n.count+=1}function t(n){var D,y,x=n.object,A=n.opaque,K=n.transparent;K.count=0;n=A.count=0;for(D=x.materials.length;n<D;n++){y=x.materials[n];y.transparent?o(K,y):o(A,y)}}function u(n){var D,y,x,A,K=n.object,M=n.buffer,I=n.opaque,N=n.transparent;N.count=0;n=I.count=0;for(x=K.materials.length;n<x;n++){D=K.materials[n];if(D instanceof THREE.MeshFaceMaterial){D=0;for(y=M.materials.length;D<y;D++)(A=M.materials[D])&&(A.transparent?o(N,A):o(I,A))}else(A=D)&&(A.transparent?o(N,A):
o(I,A))}}function w(n,D){return D.z-n.z}function p(n){e.enable(e.POLYGON_OFFSET_FILL);e.polygonOffset(0.1,1);e.enable(e.STENCIL_TEST);e.enable(e.DEPTH_TEST);e.depthMask(!1);e.colorMask(!1,!1,!1,!1);e.stencilFunc(e.ALWAYS,1,255);e.stencilOpSeparate(e.BACK,e.KEEP,e.INCR,e.KEEP);e.stencilOpSeparate(e.FRONT,e.KEEP,e.DECR,e.KEEP);var D,y=n.lights.length,x,A=n.lights,K=[],M,I,N,H,L,J=n.__webglShadowVolumes.length;for(D=0;D<y;D++){x=n.lights[D];if(x instanceof THREE.DirectionalLight&&x.castShadow){K[0]=
-x.position.x;K[1]=-x.position.y;K[2]=-x.position.z;for(L=0;L<J;L++){x=n.__webglShadowVolumes[L].object;M=n.__webglShadowVolumes[L].buffer;I=x.materials[0];I.program||oa.initMaterial(I,A,undefined,x);I=I.program;N=I.uniforms;H=I.attributes;if(Ba!==I){e.useProgram(I);Ba=I;e.uniformMatrix4fv(N.projectionMatrix,!1,Ja);e.uniformMatrix4fv(N.viewMatrix,!1,Sa);e.uniform3fv(N.directionalLightDirection,K)}x.matrixWorld.flattenToArray(x._objectMatrixArray);e.uniformMatrix4fv(N.objectMatrix,!1,x._objectMatrixArray);
e.bindBuffer(e.ARRAY_BUFFER,M.__webglVertexBuffer);e.vertexAttribPointer(H.position,3,e.FLOAT,!1,0,0);e.bindBuffer(e.ARRAY_BUFFER,M.__webglNormalBuffer);e.vertexAttribPointer(H.normal,3,e.FLOAT,!1,0,0);e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,M.__webglFaceBuffer);e.cullFace(e.FRONT);e.drawElements(e.TRIANGLES,M.__webglFaceCount,e.UNSIGNED_SHORT,0);e.cullFace(e.BACK);e.drawElements(e.TRIANGLES,M.__webglFaceCount,e.UNSIGNED_SHORT,0)}}}e.disable(e.POLYGON_OFFSET_FILL);e.colorMask(!0,!0,!0,!0);e.stencilFunc(e.NOTEQUAL,
0,255);e.stencilOp(e.KEEP,e.KEEP,e.KEEP);e.disable(e.DEPTH_TEST);na="";Ba=R.program;e.useProgram(R.program);e.uniformMatrix4fv(R.projectionLocation,!1,Ja);e.uniform1f(R.darknessLocation,R.darkness);e.bindBuffer(e.ARRAY_BUFFER,R.vertexBuffer);e.vertexAttribPointer(R.vertexLocation,3,e.FLOAT,!1,0,0);e.enableVertexAttribArray(R.vertexLocation);e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA);e.blendEquation(e.FUNC_ADD);e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,R.elementBuffer);e.drawElements(e.TRIANGLES,6,e.UNSIGNED_SHORT,
0);e.disable(e.STENCIL_TEST);e.enable(e.DEPTH_TEST);e.depthMask(ra)}function z(n,D){var y,x,A;y=_sprite.attributes;var K=_sprite.uniforms,M=Aa/Fa,I,N=[],H=Fa*0.5,L=Aa*0.5,J=!0;e.useProgram(_sprite.program);Ba=_sprite.program;na="";if(!bb){e.enableVertexAttribArray(_sprite.attributes.position);e.enableVertexAttribArray(_sprite.attributes.uv);bb=!0}e.disable(e.CULL_FACE);e.enable(e.BLEND);e.depthMask(!0);e.bindBuffer(e.ARRAY_BUFFER,_sprite.vertexBuffer);e.vertexAttribPointer(y.position,2,e.FLOAT,!1,
16,0);e.vertexAttribPointer(y.uv,2,e.FLOAT,!1,16,8);e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,_sprite.elementBuffer);e.uniformMatrix4fv(K.projectionMatrix,!1,Ja);e.activeTexture(e.TEXTURE0);e.uniform1i(K.map,0);y=0;for(x=n.__webglSprites.length;y<x;y++){A=n.__webglSprites[y];if(A.useScreenCoordinates)A.z=-A.position.z;else{A._modelViewMatrix.multiplyToArray(D.matrixWorldInverse,A.matrixWorld,A._modelViewMatrixArray);A.z=-A._modelViewMatrix.n34}}n.__webglSprites.sort(w);y=0;for(x=n.__webglSprites.length;y<
x;y++){A=n.__webglSprites[y];if(A.material===undefined&&A.map&&A.map.image&&A.map.image.width){if(A.useScreenCoordinates){e.uniform1i(K.useScreenCoordinates,1);e.uniform3f(K.screenPosition,(A.position.x-H)/H,(L-A.position.y)/L,Math.max(0,Math.min(1,A.position.z)))}else{e.uniform1i(K.useScreenCoordinates,0);e.uniform1i(K.affectedByDistance,A.affectedByDistance?1:0);e.uniformMatrix4fv(K.modelViewMatrix,!1,A._modelViewMatrixArray)}I=A.map.image.width/(A.affectedByDistance?1:Aa);N[0]=I*M*A.scale.x;N[1]=
I*A.scale.y;e.uniform2f(K.uvScale,A.uvScale.x,A.uvScale.y);e.uniform2f(K.uvOffset,A.uvOffset.x,A.uvOffset.y);e.uniform2f(K.alignment,A.alignment.x,A.alignment.y);e.uniform1f(K.opacity,A.opacity);e.uniform1f(K.rotation,A.rotation);e.uniform2fv(K.scale,N);if(A.mergeWith3D&&!J){e.enable(e.DEPTH_TEST);J=!0}else if(!A.mergeWith3D&&J){e.disable(e.DEPTH_TEST);J=!1}V(A.blending);Q(A.map,0);e.drawElements(e.TRIANGLES,6,e.UNSIGNED_SHORT,0)}}e.enable(e.CULL_FACE);e.enable(e.DEPTH_TEST);e.depthMask(ra)}function G(n,
D){var y,x,A=n.__webglLensFlares.length,K,M,I,N=new THREE.Vector3,H=Aa/Fa,L=Fa*0.5,J=Aa*0.5,$=16/Aa,X=[$*H,$],Ca=[1,1,0],Ha=[1,1],Da=S.uniforms;y=S.attributes;e.useProgram(S.program);Ba=S.program;na="";if(!Ma){e.enableVertexAttribArray(S.attributes.vertex);e.enableVertexAttribArray(S.attributes.uv);Ma=!0}e.uniform1i(Da.occlusionMap,0);e.uniform1i(Da.map,1);e.bindBuffer(e.ARRAY_BUFFER,S.vertexBuffer);e.vertexAttribPointer(y.vertex,2,e.FLOAT,!1,16,0);e.vertexAttribPointer(y.uv,2,e.FLOAT,!1,16,8);e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,
S.elementBuffer);e.disable(e.CULL_FACE);e.depthMask(!1);e.activeTexture(e.TEXTURE0);e.bindTexture(e.TEXTURE_2D,S.occlusionTexture);e.activeTexture(e.TEXTURE1);for(x=0;x<A;x++){y=n.__webglLensFlares[x].object;N.set(y.matrixWorld.n14,y.matrixWorld.n24,y.matrixWorld.n34);D.matrixWorldInverse.multiplyVector3(N);D.projectionMatrix.multiplyVector3(N);Ca[0]=N.x;Ca[1]=N.y;Ca[2]=N.z;Ha[0]=Ca[0]*L+L;Ha[1]=Ca[1]*J+J;if(S.hasVertexTexture||Ha[0]>0&&Ha[0]<Fa&&Ha[1]>0&&Ha[1]<Aa){e.bindTexture(e.TEXTURE_2D,S.tempTexture);
e.copyTexImage2D(e.TEXTURE_2D,0,e.RGB,Ha[0]-8,Ha[1]-8,16,16,0);e.uniform1i(Da.renderType,0);e.uniform2fv(Da.scale,X);e.uniform3fv(Da.screenPosition,Ca);e.disable(e.BLEND);e.enable(e.DEPTH_TEST);e.drawElements(e.TRIANGLES,6,e.UNSIGNED_SHORT,0);e.bindTexture(e.TEXTURE_2D,S.occlusionTexture);e.copyTexImage2D(e.TEXTURE_2D,0,e.RGBA,Ha[0]-8,Ha[1]-8,16,16,0);e.uniform1i(Da.renderType,1);e.disable(e.DEPTH_TEST);e.bindTexture(e.TEXTURE_2D,S.tempTexture);e.drawElements(e.TRIANGLES,6,e.UNSIGNED_SHORT,0);y.positionScreen.x=
Ca[0];y.positionScreen.y=Ca[1];y.positionScreen.z=Ca[2];y.customUpdateCallback?y.customUpdateCallback(y):y.updateLensFlares();e.uniform1i(Da.renderType,2);e.enable(e.BLEND);K=0;for(M=y.lensFlares.length;K<M;K++){I=y.lensFlares[K];if(I.opacity>0.001&&I.scale>0.001){Ca[0]=I.x;Ca[1]=I.y;Ca[2]=I.z;$=I.size*I.scale/Aa;X[0]=$*H;X[1]=$;e.uniform3fv(Da.screenPosition,Ca);e.uniform2fv(Da.scale,X);e.uniform1f(Da.rotation,I.rotation);e.uniform1f(Da.opacity,I.opacity);V(I.blending);Q(I.texture,1);e.drawElements(e.TRIANGLES,
6,e.UNSIGNED_SHORT,0)}}}}e.enable(e.CULL_FACE);e.enable(e.DEPTH_TEST);e.depthMask(ra)}function F(n,D){n._modelViewMatrix.multiplyToArray(D.matrixWorldInverse,n.matrixWorld,n._modelViewMatrixArray);THREE.Matrix4.makeInvert3x3(n._modelViewMatrix).transposeIntoArray(n._normalMatrixArray)}function B(n){var D,y,x,A,K;if(n instanceof THREE.Mesh){y=n.geometry;for(D in y.geometryGroups){x=y.geometryGroups[D];K=!1;for(A in x.__webglCustomAttributes)if(x.__webglCustomAttributes[A].needsUpdate){K=!0;break}if(y.__dirtyVertices||
y.__dirtyMorphTargets||y.__dirtyElements||y.__dirtyUvs||y.__dirtyNormals||y.__dirtyColors||y.__dirtyTangents||K){K=e.DYNAMIC_DRAW;var M=void 0,I=void 0,N=void 0,H=void 0;N=void 0;var L=void 0,J=void 0,$=void 0,X=void 0,Ca=void 0,Ha=void 0,Da=void 0,La=void 0,Xa=void 0,ma=void 0,ya=void 0,Ga=void 0,Pa=void 0;J=void 0;$=void 0;H=void 0;X=void 0;H=void 0;var E=void 0,da=void 0;J=void 0;E=void 0;da=void 0;var v=void 0,ab=void 0;E=void 0;da=void 0;v=void 0;ab=void 0;E=void 0;da=void 0;v=void 0;ab=void 0;
E=void 0;da=void 0;v=void 0;H=void 0;X=void 0;L=void 0;N=void 0;N=void 0;E=void 0;da=void 0;v=void 0;var gb=void 0,Ua=0,Ta=0,fb=0,db=0,$a=0,Za=0,Oa=0,Ya=0,Va=0,Y=0,Ea=0;da=E=0;var Qa=x.__vertexArray,hb=x.__uvArray,lb=x.__uv2Array,cb=x.__normalArray,Ia=x.__tangentArray,U=x.__colorArray,la=x.__skinVertexAArray,ia=x.__skinVertexBArray,ca=x.__skinIndexArray,wa=x.__skinWeightArray,Na=x.__morphTargetsArrays,ta=x.__webglCustomAttributes;v=void 0;var W=x.__faceArray,Ka=x.__lineArray,kb=x.__needsSmoothNormals;
Ha=x.__vertexColorType;Ca=x.__uvType;Da=x.__normalType;var Ra=n.geometry,ib=Ra.__dirtyVertices,mb=Ra.__dirtyElements,eb=Ra.__dirtyUvs,jb=Ra.__dirtyNormals,tb=Ra.__dirtyTangents,ub=Ra.__dirtyColors,vb=Ra.__dirtyMorphTargets,pb=Ra.vertices,wb=x.faces,zb=Ra.faces,xb=Ra.faceVertexUvs[0],yb=Ra.faceVertexUvs[1],qb=Ra.skinVerticesA,rb=Ra.skinVerticesB,sb=Ra.skinIndices,nb=Ra.skinWeights,ob=n instanceof THREE.ShadowVolume?Ra.edgeFaces:undefined;morphTargets=Ra.morphTargets;if(ta)for(gb in ta){ta[gb].offset=
0;ta[gb].offsetSrc=0}M=0;for(I=wb.length;M<I;M++){N=wb[M];H=zb[N];xb&&(La=xb[N]);yb&&(Xa=yb[N]);N=H.vertexNormals;L=H.normal;J=H.vertexColors;$=H.color;X=H.vertexTangents;if(H instanceof THREE.Face3){if(ib){ma=pb[H.a].position;ya=pb[H.b].position;Ga=pb[H.c].position;Qa[Ta]=ma.x;Qa[Ta+1]=ma.y;Qa[Ta+2]=ma.z;Qa[Ta+3]=ya.x;Qa[Ta+4]=ya.y;Qa[Ta+5]=ya.z;Qa[Ta+6]=Ga.x;Qa[Ta+7]=Ga.y;Qa[Ta+8]=Ga.z;Ta+=9}if(ta)for(gb in ta){v=ta[gb];if(v.needsUpdate){E=v.offset;da=v.offsetSrc;if(v.size===1){if(v.boundTo===undefined||
v.boundTo==="vertices"){v.array[E+0]=v.value[H.a];v.array[E+1]=v.value[H.b];v.array[E+2]=v.value[H.c]}else if(v.boundTo==="faces"){v.array[E+0]=v.value[da];v.array[E+1]=v.value[da];v.array[E+2]=v.value[da];v.offsetSrc++}else if(v.boundTo==="faceVertices"){v.array[E+0]=v.value[da+0];v.array[E+1]=v.value[da+1];v.array[E+2]=v.value[da+2];v.offsetSrc+=3}v.offset+=3}else{if(v.boundTo===undefined||v.boundTo==="vertices"){ma=v.value[H.a];ya=v.value[H.b];Ga=v.value[H.c]}else if(v.boundTo==="faces"){ma=v.value[da];
ya=v.value[da];Ga=v.value[da];v.offsetSrc++}else if(v.boundTo==="faceVertices"){ma=v.value[da+0];ya=v.value[da+1];Ga=v.value[da+2];v.offsetSrc+=3}if(v.size===2){v.array[E+0]=ma.x;v.array[E+1]=ma.y;v.array[E+2]=ya.x;v.array[E+3]=ya.y;v.array[E+4]=Ga.x;v.array[E+5]=Ga.y;v.offset+=6}else if(v.size===3){if(v.type==="c"){v.array[E+0]=ma.r;v.array[E+1]=ma.g;v.array[E+2]=ma.b;v.array[E+3]=ya.r;v.array[E+4]=ya.g;v.array[E+5]=ya.b;v.array[E+6]=Ga.r;v.array[E+7]=Ga.g;v.array[E+8]=Ga.b}else{v.array[E+0]=ma.x;
v.array[E+1]=ma.y;v.array[E+2]=ma.z;v.array[E+3]=ya.x;v.array[E+4]=ya.y;v.array[E+5]=ya.z;v.array[E+6]=Ga.x;v.array[E+7]=Ga.y;v.array[E+8]=Ga.z}v.offset+=9}else{v.array[E+0]=ma.x;v.array[E+1]=ma.y;v.array[E+2]=ma.z;v.array[E+3]=ma.w;v.array[E+4]=ya.x;v.array[E+5]=ya.y;v.array[E+6]=ya.z;v.array[E+7]=ya.w;v.array[E+8]=Ga.x;v.array[E+9]=Ga.y;v.array[E+10]=Ga.z;v.array[E+11]=Ga.w;v.offset+=12}}}}if(vb){E=0;for(da=morphTargets.length;E<da;E++){ma=morphTargets[E].vertices[H.a].position;ya=morphTargets[E].vertices[H.b].position;
Ga=morphTargets[E].vertices[H.c].position;v=Na[E];v[Ea+0]=ma.x;v[Ea+1]=ma.y;v[Ea+2]=ma.z;v[Ea+3]=ya.x;v[Ea+4]=ya.y;v[Ea+5]=ya.z;v[Ea+6]=Ga.x;v[Ea+7]=Ga.y;v[Ea+8]=Ga.z}Ea+=9}if(nb.length){E=nb[H.a];da=nb[H.b];v=nb[H.c];wa[Y]=E.x;wa[Y+1]=E.y;wa[Y+2]=E.z;wa[Y+3]=E.w;wa[Y+4]=da.x;wa[Y+5]=da.y;wa[Y+6]=da.z;wa[Y+7]=da.w;wa[Y+8]=v.x;wa[Y+9]=v.y;wa[Y+10]=v.z;wa[Y+11]=v.w;E=sb[H.a];da=sb[H.b];v=sb[H.c];ca[Y]=E.x;ca[Y+1]=E.y;ca[Y+2]=E.z;ca[Y+3]=E.w;ca[Y+4]=da.x;ca[Y+5]=da.y;ca[Y+6]=da.z;ca[Y+7]=da.w;ca[Y+8]=
v.x;ca[Y+9]=v.y;ca[Y+10]=v.z;ca[Y+11]=v.w;E=qb[H.a];da=qb[H.b];v=qb[H.c];la[Y]=E.x;la[Y+1]=E.y;la[Y+2]=E.z;la[Y+3]=1;la[Y+4]=da.x;la[Y+5]=da.y;la[Y+6]=da.z;la[Y+7]=1;la[Y+8]=v.x;la[Y+9]=v.y;la[Y+10]=v.z;la[Y+11]=1;E=rb[H.a];da=rb[H.b];v=rb[H.c];ia[Y]=E.x;ia[Y+1]=E.y;ia[Y+2]=E.z;ia[Y+3]=1;ia[Y+4]=da.x;ia[Y+5]=da.y;ia[Y+6]=da.z;ia[Y+7]=1;ia[Y+8]=v.x;ia[Y+9]=v.y;ia[Y+10]=v.z;ia[Y+11]=1;Y+=12}if(ub&&Ha){if(J.length==3&&Ha==THREE.VertexColors){H=J[0];E=J[1];da=J[2]}else da=E=H=$;U[Va]=H.r;U[Va+1]=H.g;
U[Va+2]=H.b;U[Va+3]=E.r;U[Va+4]=E.g;U[Va+5]=E.b;U[Va+6]=da.r;U[Va+7]=da.g;U[Va+8]=da.b;Va+=9}if(tb&&Ra.hasTangents){J=X[0];$=X[1];H=X[2];Ia[Oa]=J.x;Ia[Oa+1]=J.y;Ia[Oa+2]=J.z;Ia[Oa+3]=J.w;Ia[Oa+4]=$.x;Ia[Oa+5]=$.y;Ia[Oa+6]=$.z;Ia[Oa+7]=$.w;Ia[Oa+8]=H.x;Ia[Oa+9]=H.y;Ia[Oa+10]=H.z;Ia[Oa+11]=H.w;Oa+=12}if(jb&&Da)if(N.length==3&&kb)for(X=0;X<3;X++){L=N[X];cb[Za]=L.x;cb[Za+1]=L.y;cb[Za+2]=L.z;Za+=3}else for(X=0;X<3;X++){cb[Za]=L.x;cb[Za+1]=L.y;cb[Za+2]=L.z;Za+=3}if(eb&&La!==undefined&&Ca)for(X=0;X<3;X++){N=
La[X];hb[fb]=N.u;hb[fb+1]=N.v;fb+=2}if(eb&&Xa!==undefined&&Ca)for(X=0;X<3;X++){N=Xa[X];lb[db]=N.u;lb[db+1]=N.v;db+=2}if(mb){W[$a]=Ua;W[$a+1]=Ua+1;W[$a+2]=Ua+2;$a+=3;Ka[Ya]=Ua;Ka[Ya+1]=Ua+1;Ka[Ya+2]=Ua;Ka[Ya+3]=Ua+2;Ka[Ya+4]=Ua+1;Ka[Ya+5]=Ua+2;Ya+=6;Ua+=3}}else if(H instanceof THREE.Face4){if(ib){ma=pb[H.a].position;ya=pb[H.b].position;Ga=pb[H.c].position;Pa=pb[H.d].position;Qa[Ta]=ma.x;Qa[Ta+1]=ma.y;Qa[Ta+2]=ma.z;Qa[Ta+3]=ya.x;Qa[Ta+4]=ya.y;Qa[Ta+5]=ya.z;Qa[Ta+6]=Ga.x;Qa[Ta+7]=Ga.y;Qa[Ta+8]=Ga.z;
Qa[Ta+9]=Pa.x;Qa[Ta+10]=Pa.y;Qa[Ta+11]=Pa.z;Ta+=12}if(ta)for(gb in ta){v=ta[gb];if(v.needsUpdate){E=v.offset;da=v.offsetSrc;if(v.size===1){if(v.boundTo===undefined||v.boundTo==="vertices"){v.array[E+0]=v.value[H.a];v.array[E+1]=v.value[H.b];v.array[E+2]=v.value[H.c];v.array[E+3]=v.value[H.d]}else if(v.boundTo==="faces"){v.array[E+0]=v.value[da];v.array[E+1]=v.value[da];v.array[E+2]=v.value[da];v.array[E+3]=v.value[da];v.offsetSrc++}else if(v.boundTo==="faceVertices"){v.array[E+0]=v.value[da+0];v.array[E+
1]=v.value[da+1];v.array[E+2]=v.value[da+2];v.array[E+3]=v.value[da+3];v.offsetSrc+=4}v.offset+=4}else{if(v.boundTo===undefined||v.boundTo==="vertices"){ma=v.value[H.a];ya=v.value[H.b];Ga=v.value[H.c];Pa=v.value[H.d]}else if(v.boundTo==="faces"){ma=v.value[da];ya=v.value[da];Ga=v.value[da];Pa=v.value[da];v.offsetSrc++}else if(v.boundTo==="faceVertices"){ma=v.value[da+0];ya=v.value[da+1];Ga=v.value[da+2];Pa=v.value[da+3];v.offsetSrc+=4}if(v.size===2){v.array[E+0]=ma.x;v.array[E+1]=ma.y;v.array[E+2]=
ya.x;v.array[E+3]=ya.y;v.array[E+4]=Ga.x;v.array[E+5]=Ga.y;v.array[E+6]=Pa.x;v.array[E+7]=Pa.y;v.offset+=8}else if(v.size===3){if(v.type==="c"){v.array[E+0]=ma.r;v.array[E+1]=ma.g;v.array[E+2]=ma.b;v.array[E+3]=ya.r;v.array[E+4]=ya.g;v.array[E+5]=ya.b;v.array[E+6]=Ga.r;v.array[E+7]=Ga.g;v.array[E+8]=Ga.b;v.array[E+9]=Pa.r;v.array[E+10]=Pa.g;v.array[E+11]=Pa.b}else{v.array[E+0]=ma.x;v.array[E+1]=ma.y;v.array[E+2]=ma.z;v.array[E+3]=ya.x;v.array[E+4]=ya.y;v.array[E+5]=ya.z;v.array[E+6]=Ga.x;v.array[E+
7]=Ga.y;v.array[E+8]=Ga.z;v.array[E+9]=Pa.x;v.array[E+10]=Pa.y;v.array[E+11]=Pa.z}v.offset+=12}else{v.array[E+0]=ma.x;v.array[E+1]=ma.y;v.array[E+2]=ma.z;v.array[E+3]=ma.w;v.array[E+4]=ya.x;v.array[E+5]=ya.y;v.array[E+6]=ya.z;v.array[E+7]=ya.w;v.array[E+8]=Ga.x;v.array[E+9]=Ga.y;v.array[E+10]=Ga.z;v.array[E+11]=Ga.w;v.array[E+12]=Pa.x;v.array[E+13]=Pa.y;v.array[E+14]=Pa.z;v.array[E+15]=Pa.w;v.offset+=16}}}}if(vb){E=0;for(da=morphTargets.length;E<da;E++){ma=morphTargets[E].vertices[H.a].position;ya=
morphTargets[E].vertices[H.b].position;Ga=morphTargets[E].vertices[H.c].position;Pa=morphTargets[E].vertices[H.d].position;v=Na[E];v[Ea+0]=ma.x;v[Ea+1]=ma.y;v[Ea+2]=ma.z;v[Ea+3]=ya.x;v[Ea+4]=ya.y;v[Ea+5]=ya.z;v[Ea+6]=Ga.x;v[Ea+7]=Ga.y;v[Ea+8]=Ga.z;v[Ea+9]=Pa.x;v[Ea+10]=Pa.y;v[Ea+11]=Pa.z}Ea+=12}if(nb.length){E=nb[H.a];da=nb[H.b];v=nb[H.c];ab=nb[H.d];wa[Y]=E.x;wa[Y+1]=E.y;wa[Y+2]=E.z;wa[Y+3]=E.w;wa[Y+4]=da.x;wa[Y+5]=da.y;wa[Y+6]=da.z;wa[Y+7]=da.w;wa[Y+8]=v.x;wa[Y+9]=v.y;wa[Y+10]=v.z;wa[Y+11]=v.w;wa[Y+
12]=ab.x;wa[Y+13]=ab.y;wa[Y+14]=ab.z;wa[Y+15]=ab.w;E=sb[H.a];da=sb[H.b];v=sb[H.c];ab=sb[H.d];ca[Y]=E.x;ca[Y+1]=E.y;ca[Y+2]=E.z;ca[Y+3]=E.w;ca[Y+4]=da.x;ca[Y+5]=da.y;ca[Y+6]=da.z;ca[Y+7]=da.w;ca[Y+8]=v.x;ca[Y+9]=v.y;ca[Y+10]=v.z;ca[Y+11]=v.w;ca[Y+12]=ab.x;ca[Y+13]=ab.y;ca[Y+14]=ab.z;ca[Y+15]=ab.w;E=qb[H.a];da=qb[H.b];v=qb[H.c];ab=qb[H.d];la[Y]=E.x;la[Y+1]=E.y;la[Y+2]=E.z;la[Y+3]=1;la[Y+4]=da.x;la[Y+5]=da.y;la[Y+6]=da.z;la[Y+7]=1;la[Y+8]=v.x;la[Y+9]=v.y;la[Y+10]=v.z;la[Y+11]=1;la[Y+12]=ab.x;la[Y+13]=
ab.y;la[Y+14]=ab.z;la[Y+15]=1;E=rb[H.a];da=rb[H.b];v=rb[H.c];H=rb[H.d];ia[Y]=E.x;ia[Y+1]=E.y;ia[Y+2]=E.z;ia[Y+3]=1;ia[Y+4]=da.x;ia[Y+5]=da.y;ia[Y+6]=da.z;ia[Y+7]=1;ia[Y+8]=v.x;ia[Y+9]=v.y;ia[Y+10]=v.z;ia[Y+11]=1;ia[Y+12]=H.x;ia[Y+13]=H.y;ia[Y+14]=H.z;ia[Y+15]=1;Y+=16}if(ub&&Ha){if(J.length==4&&Ha==THREE.VertexColors){H=J[0];E=J[1];da=J[2];J=J[3]}else J=da=E=H=$;U[Va]=H.r;U[Va+1]=H.g;U[Va+2]=H.b;U[Va+3]=E.r;U[Va+4]=E.g;U[Va+5]=E.b;U[Va+6]=da.r;U[Va+7]=da.g;U[Va+8]=da.b;U[Va+9]=J.r;U[Va+10]=J.g;U[Va+
11]=J.b;Va+=12}if(tb&&Ra.hasTangents){J=X[0];$=X[1];H=X[2];X=X[3];Ia[Oa]=J.x;Ia[Oa+1]=J.y;Ia[Oa+2]=J.z;Ia[Oa+3]=J.w;Ia[Oa+4]=$.x;Ia[Oa+5]=$.y;Ia[Oa+6]=$.z;Ia[Oa+7]=$.w;Ia[Oa+8]=H.x;Ia[Oa+9]=H.y;Ia[Oa+10]=H.z;Ia[Oa+11]=H.w;Ia[Oa+12]=X.x;Ia[Oa+13]=X.y;Ia[Oa+14]=X.z;Ia[Oa+15]=X.w;Oa+=16}if(jb&&Da)if(N.length==4&&kb)for(X=0;X<4;X++){L=N[X];cb[Za]=L.x;cb[Za+1]=L.y;cb[Za+2]=L.z;Za+=3}else for(X=0;X<4;X++){cb[Za]=L.x;cb[Za+1]=L.y;cb[Za+2]=L.z;Za+=3}if(eb&&La!==undefined&&Ca)for(X=0;X<4;X++){N=La[X];hb[fb]=
N.u;hb[fb+1]=N.v;fb+=2}if(eb&&Xa!==undefined&&Ca)for(X=0;X<4;X++){N=Xa[X];lb[db]=N.u;lb[db+1]=N.v;db+=2}if(mb){W[$a]=Ua;W[$a+1]=Ua+1;W[$a+2]=Ua+3;W[$a+3]=Ua+1;W[$a+4]=Ua+2;W[$a+5]=Ua+3;$a+=6;Ka[Ya]=Ua;Ka[Ya+1]=Ua+1;Ka[Ya+2]=Ua;Ka[Ya+3]=Ua+3;Ka[Ya+4]=Ua+1;Ka[Ya+5]=Ua+2;Ka[Ya+6]=Ua+2;Ka[Ya+7]=Ua+3;Ya+=8;Ua+=4}}}if(ob){M=0;for(I=ob.length;M<I;M++){W[$a]=ob[M].a;W[$a+1]=ob[M].b;W[$a+2]=ob[M].c;W[$a+3]=ob[M].a;W[$a+4]=ob[M].c;W[$a+5]=ob[M].d;$a+=6}}if(ib){e.bindBuffer(e.ARRAY_BUFFER,x.__webglVertexBuffer);
e.bufferData(e.ARRAY_BUFFER,Qa,K)}if(ta)for(gb in ta){v=ta[gb];if(v.needsUpdate){e.bindBuffer(e.ARRAY_BUFFER,v.buffer);e.bufferData(e.ARRAY_BUFFER,v.array,K);v.needsUpdate=!1}}if(vb){E=0;for(da=morphTargets.length;E<da;E++){e.bindBuffer(e.ARRAY_BUFFER,x.__webglMorphTargetsBuffers[E]);e.bufferData(e.ARRAY_BUFFER,Na[E],K)}}if(ub&&Va>0){e.bindBuffer(e.ARRAY_BUFFER,x.__webglColorBuffer);e.bufferData(e.ARRAY_BUFFER,U,K)}if(jb){e.bindBuffer(e.ARRAY_BUFFER,x.__webglNormalBuffer);e.bufferData(e.ARRAY_BUFFER,
cb,K)}if(tb&&Ra.hasTangents){e.bindBuffer(e.ARRAY_BUFFER,x.__webglTangentBuffer);e.bufferData(e.ARRAY_BUFFER,Ia,K)}if(eb&&fb>0){e.bindBuffer(e.ARRAY_BUFFER,x.__webglUVBuffer);e.bufferData(e.ARRAY_BUFFER,hb,K)}if(eb&&db>0){e.bindBuffer(e.ARRAY_BUFFER,x.__webglUV2Buffer);e.bufferData(e.ARRAY_BUFFER,lb,K)}if(mb){e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,x.__webglFaceBuffer);e.bufferData(e.ELEMENT_ARRAY_BUFFER,W,K);e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,x.__webglLineBuffer);e.bufferData(e.ELEMENT_ARRAY_BUFFER,
Ka,K)}if(Y>0){e.bindBuffer(e.ARRAY_BUFFER,x.__webglSkinVertexABuffer);e.bufferData(e.ARRAY_BUFFER,la,K);e.bindBuffer(e.ARRAY_BUFFER,x.__webglSkinVertexBBuffer);e.bufferData(e.ARRAY_BUFFER,ia,K);e.bindBuffer(e.ARRAY_BUFFER,x.__webglSkinIndicesBuffer);e.bufferData(e.ARRAY_BUFFER,ca,K);e.bindBuffer(e.ARRAY_BUFFER,x.__webglSkinWeightsBuffer);e.bufferData(e.ARRAY_BUFFER,wa,K)}}}y.__dirtyVertices=!1;y.__dirtyMorphTargets=!1;y.__dirtyElements=!1;y.__dirtyUvs=!1;y.__dirtyNormals=!1;y.__dirtyTangents=!1;y.__dirtyColors=
!1}else if(n instanceof THREE.Ribbon){y=n.geometry;if(y.__dirtyVertices||y.__dirtyColors){n=y;D=e.DYNAMIC_DRAW;Ha=n.vertices;x=n.colors;Da=Ha.length;K=x.length;La=n.__vertexArray;M=n.__colorArray;Xa=n.__dirtyColors;if(n.__dirtyVertices){for(I=0;I<Da;I++){Ca=Ha[I].position;A=I*3;La[A]=Ca.x;La[A+1]=Ca.y;La[A+2]=Ca.z}e.bindBuffer(e.ARRAY_BUFFER,n.__webglVertexBuffer);e.bufferData(e.ARRAY_BUFFER,La,D)}if(Xa){for(I=0;I<K;I++){color=x[I];A=I*3;M[A]=color.r;M[A+1]=color.g;M[A+2]=color.b}e.bindBuffer(e.ARRAY_BUFFER,
n.__webglColorBuffer);e.bufferData(e.ARRAY_BUFFER,M,D)}}y.__dirtyVertices=!1;y.__dirtyColors=!1}else if(n instanceof THREE.Line){y=n.geometry;if(y.__dirtyVertices||y.__dirtyColors){n=y;D=e.DYNAMIC_DRAW;Ha=n.vertices;x=n.colors;Da=Ha.length;K=x.length;La=n.__vertexArray;M=n.__colorArray;Xa=n.__dirtyColors;if(n.__dirtyVertices){for(I=0;I<Da;I++){Ca=Ha[I].position;A=I*3;La[A]=Ca.x;La[A+1]=Ca.y;La[A+2]=Ca.z}e.bindBuffer(e.ARRAY_BUFFER,n.__webglVertexBuffer);e.bufferData(e.ARRAY_BUFFER,La,D)}if(Xa){for(I=
0;I<K;I++){color=x[I];A=I*3;M[A]=color.r;M[A+1]=color.g;M[A+2]=color.b}e.bindBuffer(e.ARRAY_BUFFER,n.__webglColorBuffer);e.bufferData(e.ARRAY_BUFFER,M,D)}}y.__dirtyVertices=!1;y.__dirtyColors=!1}else if(n instanceof THREE.ParticleSystem){y=n.geometry;(y.__dirtyVertices||y.__dirtyColors||n.sortParticles)&&d(y,e.DYNAMIC_DRAW,n);y.__dirtyVertices=!1;y.__dirtyColors=!1}}function T(n){function D($){var X=[];y=0;for(x=$.length;y<x;y++)$[y]==undefined?X.push("undefined"):X.push($[y].id);return X.join("_")}
var y,x,A,K,M,I,N,H,L={},J=n.morphTargets!==undefined?n.morphTargets.length:0;n.geometryGroups={};A=0;for(K=n.faces.length;A<K;A++){M=n.faces[A];I=M.materials;N=D(I);L[N]==undefined&&(L[N]={hash:N,counter:0});H=L[N].hash+"_"+L[N].counter;n.geometryGroups[H]==undefined&&(n.geometryGroups[H]={faces:[],materials:I,vertices:0,numMorphTargets:J});M=M instanceof THREE.Face3?3:4;if(n.geometryGroups[H].vertices+M>65535){L[N].counter+=1;H=L[N].hash+"_"+L[N].counter;n.geometryGroups[H]==undefined&&(n.geometryGroups[H]=
{faces:[],materials:I,vertices:0,numMorphTargets:J})}n.geometryGroups[H].faces.push(A);n.geometryGroups[H].vertices+=M}}function C(n,D,y){n.push({buffer:D,object:y,opaque:{list:[],count:0},transparent:{list:[],count:0}})}function V(n){if(n!=na){switch(n){case THREE.AdditiveBlending:e.blendEquation(e.FUNC_ADD);e.blendFunc(e.SRC_ALPHA,e.ONE);break;case THREE.SubtractiveBlending:e.blendEquation(e.FUNC_ADD);e.blendFunc(e.ZERO,e.ONE_MINUS_SRC_COLOR);break;case THREE.MultiplyBlending:e.blendEquation(e.FUNC_ADD);
e.blendFunc(e.ZERO,e.SRC_COLOR);break;default:e.blendEquationSeparate(e.FUNC_ADD,e.FUNC_ADD);e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA)}na=n}}function P(n,D,y){if((y.width&y.width-1)==0&&(y.height&y.height-1)==0){e.texParameteri(n,e.TEXTURE_WRAP_S,aa(D.wrapS));e.texParameteri(n,e.TEXTURE_WRAP_T,aa(D.wrapT));e.texParameteri(n,e.TEXTURE_MAG_FILTER,aa(D.magFilter));e.texParameteri(n,e.TEXTURE_MIN_FILTER,aa(D.minFilter));e.generateMipmap(n)}else{e.texParameteri(n,
e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE);e.texParameteri(n,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);e.texParameteri(n,e.TEXTURE_MAG_FILTER,pa(D.magFilter));e.texParameteri(n,e.TEXTURE_MIN_FILTER,pa(D.minFilter))}}function Q(n,D){if(n.needsUpdate){if(n.__webglInit){e.bindTexture(e.TEXTURE_2D,n.__webglTexture);e.texSubImage2D(e.TEXTURE_2D,0,0,0,e.RGBA,e.UNSIGNED_BYTE,n.image)}else{n.__webglTexture=e.createTexture();e.bindTexture(e.TEXTURE_2D,n.__webglTexture);e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,
n.image);n.__webglInit=!0}P(e.TEXTURE_2D,n,n.image);e.bindTexture(e.TEXTURE_2D,null);n.needsUpdate=!1}e.activeTexture(e.TEXTURE0+D);e.bindTexture(e.TEXTURE_2D,n.__webglTexture)}function ka(n){if(n&&!n.__webglFramebuffer){if(n.depthBuffer===undefined)n.depthBuffer=!0;if(n.stencilBuffer===undefined)n.stencilBuffer=!0;n.__webglFramebuffer=e.createFramebuffer();n.__webglRenderbuffer=e.createRenderbuffer();n.__webglTexture=e.createTexture();e.bindTexture(e.TEXTURE_2D,n.__webglTexture);e.texParameteri(e.TEXTURE_2D,
e.TEXTURE_WRAP_S,aa(n.wrapS));e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,aa(n.wrapT));e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,aa(n.magFilter));e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,aa(n.minFilter));e.texImage2D(e.TEXTURE_2D,0,aa(n.format),n.width,n.height,0,aa(n.format),aa(n.type),null);e.bindRenderbuffer(e.RENDERBUFFER,n.__webglRenderbuffer);e.bindFramebuffer(e.FRAMEBUFFER,n.__webglFramebuffer);e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n.__webglTexture,
0);if(n.depthBuffer&&!n.stencilBuffer){e.renderbufferStorage(e.RENDERBUFFER,e.DEPTH_COMPONENT16,n.width,n.height);e.framebufferRenderbuffer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.RENDERBUFFER,n.__webglRenderbuffer)}else if(n.depthBuffer&&n.stencilBuffer){e.renderbufferStorage(e.RENDERBUFFER,e.DEPTH_STENCIL,n.width,n.height);e.framebufferRenderbuffer(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.RENDERBUFFER,n.__webglRenderbuffer)}else e.renderbufferStorage(e.RENDERBUFFER,e.RGBA4,n.width,n.height);e.bindTexture(e.TEXTURE_2D,
null);e.bindRenderbuffer(e.RENDERBUFFER,null);e.bindFramebuffer(e.FRAMEBUFFER,null)}var D,y;if(n){D=n.__webglFramebuffer;y=n.width;n=n.height}else{D=null;y=Fa;n=Aa}if(D!=ga){e.bindFramebuffer(e.FRAMEBUFFER,D);e.viewport(qa,ja,y,n);ga=D}}function ea(n,D){var y;if(n=="fragment")y=e.createShader(e.FRAGMENT_SHADER);else n=="vertex"&&(y=e.createShader(e.VERTEX_SHADER));e.shaderSource(y,D);e.compileShader(y);if(!e.getShaderParameter(y,e.COMPILE_STATUS)){console.error(e.getShaderInfoLog(y));console.error(D);
return null}return y}function pa(n){switch(n){case THREE.NearestFilter:case THREE.NearestMipMapNearestFilter:case THREE.NearestMipMapLinearFilter:return e.NEAREST;default:return e.LINEAR}}function aa(n){switch(n){case THREE.RepeatWrapping:return e.REPEAT;case THREE.ClampToEdgeWrapping:return e.CLAMP_TO_EDGE;case THREE.MirroredRepeatWrapping:return e.MIRRORED_REPEAT;case THREE.NearestFilter:return e.NEAREST;case THREE.NearestMipMapNearestFilter:return e.NEAREST_MIPMAP_NEAREST;case THREE.NearestMipMapLinearFilter:return e.NEAREST_MIPMAP_LINEAR;
case THREE.LinearFilter:return e.LINEAR;case THREE.LinearMipMapNearestFilter:return e.LINEAR_MIPMAP_NEAREST;case THREE.LinearMipMapLinearFilter:return e.LINEAR_MIPMAP_LINEAR;case THREE.ByteType:return e.BYTE;case THREE.UnsignedByteType:return e.UNSIGNED_BYTE;case THREE.ShortType:return e.SHORT;case THREE.UnsignedShortType:return e.UNSIGNED_SHORT;case THREE.IntType:return e.INT;case THREE.UnsignedShortType:return e.UNSIGNED_INT;case THREE.FloatType:return e.FLOAT;case THREE.AlphaFormat:return e.ALPHA;
case THREE.RGBFormat:return e.RGB;case THREE.RGBAFormat:return e.RGBA;case THREE.LuminanceFormat:return e.LUMINANCE;case THREE.LuminanceAlphaFormat:return e.LUMINANCE_ALPHA}return 0}var oa=this,e,xa=document.createElement("canvas"),sa=[],Ba=null,ga=null,ra=!0,fa=null,za=null,na=null,ua=null,qa=0,ja=0,Fa=0,Aa=0,ha=[new THREE.Vector4,new THREE.Vector4,new THREE.Vector4,new THREE.Vector4,new THREE.Vector4,new THREE.Vector4],va=new THREE.Matrix4,Ja=new Float32Array(16),Sa=new Float32Array(16),Wa=new THREE.Vector4,
O={ambient:[0,0,0],directional:{length:0,colors:[],positions:[]},point:{length:0,colors:[],positions:[],distances:[]}};b=b||{};stencil=b.stencil!==undefined?b.stencil:!0;antialias=b.antialias!==undefined?b.antialias:!1;clearColor=b.clearColor!==undefined?new THREE.Color(b.clearColor):new THREE.Color(0);clearAlpha=b.clearAlpha!==undefined?b.clearAlpha:0;this.data={vertices:0,faces:0,drawCalls:0};this.maxMorphTargets=8;this.domElement=xa;this.autoClear=!0;this.sortObjects=!0;(function(n,D,y,x){try{if(!(e=
xa.getContext("experimental-webgl",{antialias:n,stencil:x})))throw"Error creating WebGL context.";}catch(A){console.error(A)}console.log(navigator.userAgent+" | "+e.getParameter(e.VERSION)+" | "+e.getParameter(e.VENDOR)+" | "+e.getParameter(e.RENDERER)+" | "+e.getParameter(e.SHADING_LANGUAGE_VERSION));e.clearColor(0,0,0,1);e.clearDepth(1);e.enable(e.DEPTH_TEST);e.depthFunc(e.LEQUAL);e.frontFace(e.CCW);e.cullFace(e.BACK);e.enable(e.CULL_FACE);e.enable(e.BLEND);e.blendEquation(e.FUNC_ADD);e.blendFunc(e.SRC_ALPHA,
e.ONE_MINUS_SRC_ALPHA);e.clearColor(D.r,D.g,D.b,y)})(antialias,clearColor,clearAlpha,stencil);this.context=e;var Z=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS)>0;if(stencil){var R={};R.vertices=new Float32Array(12);R.faces=new Uint16Array(6);R.darkness=0.5;R.vertices[0]=-20;R.vertices[1]=-20;R.vertices[2]=-1;R.vertices[3]=20;R.vertices[4]=-20;R.vertices[5]=-1;R.vertices[6]=20;R.vertices[7]=20;R.vertices[8]=-1;R.vertices[9]=-20;R.vertices[10]=20;R.vertices[11]=-1;R.faces[0]=0;R.faces[1]=1;R.faces[2]=
2;R.faces[3]=0;R.faces[4]=2;R.faces[5]=3;R.vertexBuffer=e.createBuffer();R.elementBuffer=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,R.vertexBuffer);e.bufferData(e.ARRAY_BUFFER,R.vertices,e.STATIC_DRAW);e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,R.elementBuffer);e.bufferData(e.ELEMENT_ARRAY_BUFFER,R.faces,e.STATIC_DRAW);R.program=e.createProgram();e.attachShader(R.program,ea("fragment",THREE.ShaderLib.shadowPost.fragmentShader));e.attachShader(R.program,ea("vertex",THREE.ShaderLib.shadowPost.vertexShader));
e.linkProgram(R.program);R.vertexLocation=e.getAttribLocation(R.program,"position");R.projectionLocation=e.getUniformLocation(R.program,"projectionMatrix");R.darknessLocation=e.getUniformLocation(R.program,"darkness")}var S={};S.vertices=new Float32Array(16);S.faces=new Uint16Array(6);b=0;S.vertices[b++]=-1;S.vertices[b++]=-1;S.vertices[b++]=0;S.vertices[b++]=0;S.vertices[b++]=1;S.vertices[b++]=-1;S.vertices[b++]=1;S.vertices[b++]=0;S.vertices[b++]=1;S.vertices[b++]=1;S.vertices[b++]=1;S.vertices[b++]=
1;S.vertices[b++]=-1;S.vertices[b++]=1;S.vertices[b++]=0;S.vertices[b++]=1;b=0;S.faces[b++]=0;S.faces[b++]=1;S.faces[b++]=2;S.faces[b++]=0;S.faces[b++]=2;S.faces[b++]=3;S.vertexBuffer=e.createBuffer();S.elementBuffer=e.createBuffer();S.tempTexture=e.createTexture();S.occlusionTexture=e.createTexture();e.bindBuffer(e.ARRAY_BUFFER,S.vertexBuffer);e.bufferData(e.ARRAY_BUFFER,S.vertices,e.STATIC_DRAW);e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,S.elementBuffer);e.bufferData(e.ELEMENT_ARRAY_BUFFER,S.faces,e.STATIC_DRAW);
e.bindTexture(e.TEXTURE_2D,S.tempTexture);e.texImage2D(e.TEXTURE_2D,0,e.RGB,16,16,0,e.RGB,e.UNSIGNED_BYTE,null);e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE);e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST);e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST);e.bindTexture(e.TEXTURE_2D,S.occlusionTexture);e.texImage2D(e.TEXTURE_2D,0,e.RGBA,16,16,0,e.RGBA,e.UNSIGNED_BYTE,null);e.texParameteri(e.TEXTURE_2D,
e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE);e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST);e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST);if(e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS)<=0){S.hasVertexTexture=!1;S.program=e.createProgram();e.attachShader(S.program,ea("fragment",THREE.ShaderLib.lensFlare.fragmentShader));e.attachShader(S.program,ea("vertex",THREE.ShaderLib.lensFlare.vertexShader))}else{S.hasVertexTexture=
!0;S.program=e.createProgram();e.attachShader(S.program,ea("fragment",THREE.ShaderLib.lensFlareVertexTexture.fragmentShader));e.attachShader(S.program,ea("vertex",THREE.ShaderLib.lensFlareVertexTexture.vertexShader))}e.linkProgram(S.program);S.attributes={};S.uniforms={};S.attributes.vertex=e.getAttribLocation(S.program,"position");S.attributes.uv=e.getAttribLocation(S.program,"UV");S.uniforms.renderType=e.getUniformLocation(S.program,"renderType");S.uniforms.map=e.getUniformLocation(S.program,"map");
S.uniforms.occlusionMap=e.getUniformLocation(S.program,"occlusionMap");S.uniforms.opacity=e.getUniformLocation(S.program,"opacity");S.uniforms.scale=e.getUniformLocation(S.program,"scale");S.uniforms.rotation=e.getUniformLocation(S.program,"rotation");S.uniforms.screenPosition=e.getUniformLocation(S.program,"screenPosition");var Ma=!1;_sprite={};_sprite.vertices=new Float32Array(16);_sprite.faces=new Uint16Array(6);b=0;_sprite.vertices[b++]=-1;_sprite.vertices[b++]=-1;_sprite.vertices[b++]=0;_sprite.vertices[b++]=
0;_sprite.vertices[b++]=1;_sprite.vertices[b++]=-1;_sprite.vertices[b++]=1;_sprite.vertices[b++]=0;_sprite.vertices[b++]=1;_sprite.vertices[b++]=1;_sprite.vertices[b++]=1;_sprite.vertices[b++]=1;_sprite.vertices[b++]=-1;_sprite.vertices[b++]=1;_sprite.vertices[b++]=0;_sprite.vertices[b++]=1;b=0;_sprite.faces[b++]=0;_sprite.faces[b++]=1;_sprite.faces[b++]=2;_sprite.faces[b++]=0;_sprite.faces[b++]=2;_sprite.faces[b++]=3;_sprite.vertexBuffer=e.createBuffer();_sprite.elementBuffer=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,
_sprite.vertexBuffer);e.bufferData(e.ARRAY_BUFFER,_sprite.vertices,e.STATIC_DRAW);e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,_sprite.elementBuffer);e.bufferData(e.ELEMENT_ARRAY_BUFFER,_sprite.faces,e.STATIC_DRAW);_sprite.program=e.createProgram();e.attachShader(_sprite.program,ea("fragment",THREE.ShaderLib.sprite.fragmentShader));e.attachShader(_sprite.program,ea("vertex",THREE.ShaderLib.sprite.vertexShader));e.linkProgram(_sprite.program);_sprite.attributes={};_sprite.uniforms={};_sprite.attributes.position=
e.getAttribLocation(_sprite.program,"position");_sprite.attributes.uv=e.getAttribLocation(_sprite.program,"uv");_sprite.uniforms.uvOffset=e.getUniformLocation(_sprite.program,"uvOffset");_sprite.uniforms.uvScale=e.getUniformLocation(_sprite.program,"uvScale");_sprite.uniforms.rotation=e.getUniformLocation(_sprite.program,"rotation");_sprite.uniforms.scale=e.getUniformLocation(_sprite.program,"scale");_sprite.uniforms.alignment=e.getUniformLocation(_sprite.program,"alignment");_sprite.uniforms.map=
e.getUniformLocation(_sprite.program,"map");_sprite.uniforms.opacity=e.getUniformLocation(_sprite.program,"opacity");_sprite.uniforms.useScreenCoordinates=e.getUniformLocation(_sprite.program,"useScreenCoordinates");_sprite.uniforms.affectedByDistance=e.getUniformLocation(_sprite.program,"affectedByDistance");_sprite.uniforms.screenPosition=e.getUniformLocation(_sprite.program,"screenPosition");_sprite.uniforms.modelViewMatrix=e.getUniformLocation(_sprite.program,"modelViewMatrix");_sprite.uniforms.projectionMatrix=
e.getUniformLocation(_sprite.program,"projectionMatrix");var bb=!1;this.setSize=function(n,D){xa.width=n;xa.height=D;this.setViewport(0,0,xa.width,xa.height)};this.setViewport=function(n,D,y,x){qa=n;ja=D;Fa=y;Aa=x;e.viewport(qa,ja,Fa,Aa)};this.setScissor=function(n,D,y,x){e.scissor(n,D,y,x)};this.enableScissorTest=function(n){n?e.enable(e.SCISSOR_TEST):e.disable(e.SCISSOR_TEST)};this.enableDepthBufferWrite=function(n){ra=n;e.depthMask(n)};this.setClearColorHex=function(n,D){var y=new THREE.Color(n);
e.clearColor(y.r,y.g,y.b,D)};this.setClearColor=function(n,D){e.clearColor(n.r,n.g,n.b,D)};this.clear=function(){e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT|e.STENCIL_BUFFER_BIT)};this.setStencilShadowDarkness=function(n){R.darkness=n};this.getContext=function(){return e};this.initMaterial=function(n,D,y,x){var A,K,M;if(n instanceof THREE.MeshDepthMaterial)M="depth";else if(n instanceof THREE.ShadowVolumeDynamicMaterial)M="shadowVolumeDynamic";else if(n instanceof THREE.MeshNormalMaterial)M="normal";
else if(n instanceof THREE.MeshBasicMaterial)M="basic";else if(n instanceof THREE.MeshLambertMaterial)M="lambert";else if(n instanceof THREE.MeshPhongMaterial)M="phong";else if(n instanceof THREE.LineBasicMaterial)M="basic";else n instanceof THREE.ParticleBasicMaterial&&(M="particle_basic");if(M){var I=THREE.ShaderLib[M];n.uniforms=THREE.UniformsUtils.clone(I.uniforms);n.vertexShader=I.vertexShader;n.fragmentShader=I.fragmentShader}var N,H,L;N=L=I=0;for(H=D.length;N<H;N++){K=D[N];K instanceof THREE.DirectionalLight&&
L++;K instanceof THREE.PointLight&&I++}if(I+L<=4)D=L;else{D=Math.ceil(4*L/(I+L));I=4-D}K={directional:D,point:I};L=50;if(x!==undefined&&x instanceof THREE.SkinnedMesh)L=x.bones.length;var J;a:{N=n.fragmentShader;H=n.vertexShader;I=n.uniforms;D=n.attributes;y={map:!!n.map,envMap:!!n.envMap,lightMap:!!n.lightMap,vertexColors:n.vertexColors,fog:y,sizeAttenuation:n.sizeAttenuation,skinning:n.skinning,morphTargets:n.morphTargets,maxMorphTargets:this.maxMorphTargets,maxDirLights:K.directional,maxPointLights:K.point,
maxBones:L};var $;K=[];if(M)K.push(M);else{K.push(N);K.push(H)}for($ in y){K.push($);K.push(y[$])}M=K.join();$=0;for(K=sa.length;$<K;$++)if(sa[$].code==M){J=sa[$].program;break a}$=e.createProgram();prefix_fragment=["#ifdef GL_ES\nprecision highp float;\n#endif","#define MAX_DIR_LIGHTS "+y.maxDirLights,"#define MAX_POINT_LIGHTS "+y.maxPointLights,y.fog?"#define USE_FOG":"",y.fog instanceof THREE.FogExp2?"#define FOG_EXP2":"",y.map?"#define USE_MAP":"",y.envMap?"#define USE_ENVMAP":"",y.lightMap?"#define USE_LIGHTMAP":
"",y.vertexColors?"#define USE_COLOR":"","uniform mat4 viewMatrix;\nuniform vec3 cameraPosition;\n"].join("\n");prefix_vertex=[Z?"#define VERTEX_TEXTURES":"","#define MAX_DIR_LIGHTS "+y.maxDirLights,"#define MAX_POINT_LIGHTS "+y.maxPointLights,"#define MAX_BONES "+y.maxBones,y.map?"#define USE_MAP":"",y.envMap?"#define USE_ENVMAP":"",y.lightMap?"#define USE_LIGHTMAP":"",y.vertexColors?"#define USE_COLOR":"",y.skinning?"#define USE_SKINNING":"",y.morphTargets?"#define USE_MORPHTARGETS":"",y.sizeAttenuation?
"#define USE_SIZEATTENUATION":"","uniform mat4 objectMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 cameraPosition;\nuniform mat4 cameraInverseMatrix;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\nattribute vec2 uv2;\n#ifdef USE_COLOR\nattribute vec3 color;\n#endif\n#ifdef USE_MORPHTARGETS\nattribute vec3 morphTarget0;\nattribute vec3 morphTarget1;\nattribute vec3 morphTarget2;\nattribute vec3 morphTarget3;\nattribute vec3 morphTarget4;\nattribute vec3 morphTarget5;\nattribute vec3 morphTarget6;\nattribute vec3 morphTarget7;\n#endif\n#ifdef USE_SKINNING\nattribute vec4 skinVertexA;\nattribute vec4 skinVertexB;\nattribute vec4 skinIndex;\nattribute vec4 skinWeight;\n#endif\n"].join("\n");
e.attachShader($,ea("fragment",prefix_fragment+N));e.attachShader($,ea("vertex",prefix_vertex+H));e.linkProgram($);e.getProgramParameter($,e.LINK_STATUS)||console.error("Could not initialise shader\nVALIDATE_STATUS: "+e.getProgramParameter($,e.VALIDATE_STATUS)+", gl error ["+e.getError()+"]");$.uniforms={};$.attributes={};var X;N=["viewMatrix","modelViewMatrix","projectionMatrix","normalMatrix","objectMatrix","cameraPosition","cameraInverseMatrix","boneGlobalMatrices","morphTargetInfluences"];for(X in I)N.push(X);
X=N;I=0;for(N=X.length;I<N;I++){H=X[I];$.uniforms[H]=e.getUniformLocation($,H)}N=["position","normal","uv","uv2","tangent","color","skinVertexA","skinVertexB","skinIndex","skinWeight"];for(X=0;X<y.maxMorphTargets;X++)N.push("morphTarget"+X);for(J in D)N.push(J);J=N;X=0;for(D=J.length;X<D;X++){y=J[X];$.attributes[y]=e.getAttribLocation($,y)}sa.push({program:$,code:M});J=$}n.program=J;J=n.program.attributes;e.enableVertexAttribArray(J.position);J.color>=0&&e.enableVertexAttribArray(J.color);J.normal>=
0&&e.enableVertexAttribArray(J.normal);J.tangent>=0&&e.enableVertexAttribArray(J.tangent);if(n.skinning&&J.skinVertexA>=0&&J.skinVertexB>=0&&J.skinIndex>=0&&J.skinWeight>=0){e.enableVertexAttribArray(J.skinVertexA);e.enableVertexAttribArray(J.skinVertexB);e.enableVertexAttribArray(J.skinIndex);e.enableVertexAttribArray(J.skinWeight)}for(A in n.attributes)J[A]>=0&&e.enableVertexAttribArray(J[A]);if(n.morphTargets){n.numSupportedMorphTargets=0;if(J.morphTarget0>=0){e.enableVertexAttribArray(J.morphTarget0);
n.numSupportedMorphTargets++}if(J.morphTarget1>=0){e.enableVertexAttribArray(J.morphTarget1);n.numSupportedMorphTargets++}if(J.morphTarget2>=0){e.enableVertexAttribArray(J.morphTarget2);n.numSupportedMorphTargets++}if(J.morphTarget3>=0){e.enableVertexAttribArray(J.morphTarget3);n.numSupportedMorphTargets++}if(J.morphTarget4>=0){e.enableVertexAttribArray(J.morphTarget4);n.numSupportedMorphTargets++}if(J.morphTarget5>=0){e.enableVertexAttribArray(J.morphTarget5);n.numSupportedMorphTargets++}if(J.morphTarget6>=
0){e.enableVertexAttribArray(J.morphTarget6);n.numSupportedMorphTargets++}if(J.morphTarget7>=0){e.enableVertexAttribArray(J.morphTarget7);n.numSupportedMorphTargets++}x.__webglMorphTargetInfluences=new Float32Array(this.maxMorphTargets);n=0;for(A=this.maxMorphTargets;n<A;n++)x.__webglMorphTargetInfluences[n]=0}};this.render=function(n,D,y,x){var A,K,M,I,N,H,L,J,$=n.lights,X=n.fog;oa.data.vertices=0;oa.data.faces=0;oa.data.drawCalls=0;D.matrixAutoUpdate&&D.update(undefined,!0);n.update(undefined,!1,
D);D.matrixWorldInverse.flattenToArray(Sa);D.projectionMatrix.flattenToArray(Ja);va.multiply(D.projectionMatrix,D.matrixWorldInverse);k(va);this.initWebGLObjects(n);ka(y);(this.autoClear||x)&&this.clear();N=n.__webglObjects.length;for(x=0;x<N;x++){A=n.__webglObjects[x];L=A.object;if(L.visible)if(!(L instanceof THREE.Mesh)||m(L)){L.matrixWorld.flattenToArray(L._objectMatrixArray);F(L,D);u(A);A.render=!0;if(this.sortObjects){Wa.copy(L.position);va.multiplyVector3(Wa);A.z=Wa.z}}else A.render=!1;else A.render=
!1}this.sortObjects&&n.__webglObjects.sort(w);H=n.__webglObjectsImmediate.length;for(x=0;x<H;x++){A=n.__webglObjectsImmediate[x];L=A.object;if(L.visible){L.matrixAutoUpdate&&L.matrixWorld.flattenToArray(L._objectMatrixArray);F(L,D);t(A)}}V(THREE.NormalBlending);for(x=0;x<N;x++){A=n.__webglObjects[x];if(A.render){L=A.object;J=A.buffer;M=A.opaque;h(L);for(A=0;A<M.count;A++){I=M.list[A];j(I.depthTest);f(D,$,X,I,J,L)}}}for(x=0;x<H;x++){A=n.__webglObjectsImmediate[x];L=A.object;if(L.visible){M=A.opaque;
h(L);for(A=0;A<M.count;A++){I=M.list[A];j(I.depthTest);K=c(D,$,X,I,L);L.render(function(Ca){g(Ca,K,I.shading)})}}}for(x=0;x<N;x++){A=n.__webglObjects[x];if(A.render){L=A.object;J=A.buffer;M=A.transparent;h(L);for(A=0;A<M.count;A++){I=M.list[A];V(I.blending);j(I.depthTest);f(D,$,X,I,J,L)}}}for(x=0;x<H;x++){A=n.__webglObjectsImmediate[x];L=A.object;if(L.visible){M=A.transparent;h(L);for(A=0;A<M.count;A++){I=M.list[A];V(I.blending);j(I.depthTest);K=c(D,$,X,I,L);L.render(function(Ca){g(Ca,K,I.shading)})}}}n.__webglSprites.length&&
z(n,D);stencil&&n.__webglShadowVolumes.length&&n.lights.length&&p(n);n.__webglLensFlares.length&&G(n,D);if(y&&y.minFilter!==THREE.NearestFilter&&y.minFilter!==THREE.LinearFilter){e.bindTexture(e.TEXTURE_2D,y.__webglTexture);e.generateMipmap(e.TEXTURE_2D);e.bindTexture(e.TEXTURE_2D,null)}};this.initWebGLObjects=function(n){if(!n.__webglObjects){n.__webglObjects=[];n.__webglObjectsImmediate=[];n.__webglShadowVolumes=[];n.__webglLensFlares=[];n.__webglSprites=[]}for(;n.__objectsAdded.length;){var D=
n.__objectsAdded[0],y=n,x=void 0,A=void 0,K=void 0;if(D._modelViewMatrix==undefined){D._modelViewMatrix=new THREE.Matrix4;D._normalMatrixArray=new Float32Array(9);D._modelViewMatrixArray=new Float32Array(16);D._objectMatrixArray=new Float32Array(16);D.matrixWorld.flattenToArray(D._objectMatrixArray)}if(D instanceof THREE.Mesh){A=D.geometry;A.geometryGroups==undefined&&T(A);for(x in A.geometryGroups){K=A.geometryGroups[x];if(!K.__webglVertexBuffer){var M=K;M.__webglVertexBuffer=e.createBuffer();M.__webglNormalBuffer=
e.createBuffer();M.__webglTangentBuffer=e.createBuffer();M.__webglColorBuffer=e.createBuffer();M.__webglUVBuffer=e.createBuffer();M.__webglUV2Buffer=e.createBuffer();M.__webglSkinVertexABuffer=e.createBuffer();M.__webglSkinVertexBBuffer=e.createBuffer();M.__webglSkinIndicesBuffer=e.createBuffer();M.__webglSkinWeightsBuffer=e.createBuffer();M.__webglFaceBuffer=e.createBuffer();M.__webglLineBuffer=e.createBuffer();if(M.numMorphTargets){var I=void 0,N=void 0;M.__webglMorphTargetsBuffers=[];I=0;for(N=
M.numMorphTargets;I<N;I++)M.__webglMorphTargetsBuffers.push(e.createBuffer())}M=K;I=D;var H=void 0,L=void 0,J=void 0;J=void 0;var $=void 0,X=void 0,Ca=void 0,Ha=Ca=N=0;L=void 0;J=void 0;var Da=void 0;H=void 0;L=void 0;$=I.geometry;Da=$.faces;X=M.faces;H=0;for(L=X.length;H<L;H++){J=X[H];J=Da[J];if(J instanceof THREE.Face3){N+=3;Ca+=1;Ha+=3}else if(J instanceof THREE.Face4){N+=4;Ca+=2;Ha+=4}}H=M;L=I;Da=void 0;X=void 0;var La=void 0,Xa=void 0;La=void 0;J=[];Da=0;for(X=L.materials.length;Da<X;Da++){La=
L.materials[Da];if(La instanceof THREE.MeshFaceMaterial){La=0;for(l=H.materials.length;La<l;La++)(Xa=H.materials[La])&&J.push(Xa)}else(Xa=La)&&J.push(Xa)}H=J;a:{L=void 0;Da=void 0;X=H.length;for(L=0;L<X;L++){Da=H[L];if(Da.map||Da.lightMap||Da instanceof THREE.MeshShaderMaterial){L=!0;break a}}L=!1}a:{Da=H;X=void 0;J=void 0;La=Da.length;for(X=0;X<La;X++){J=Da[X];if(!(J instanceof THREE.MeshBasicMaterial&&!J.envMap||J instanceof THREE.MeshDepthMaterial)){Da=J&&J.shading!=undefined&&J.shading==THREE.SmoothShading?
THREE.SmoothShading:THREE.FlatShading;break a}}Da=!1}a:{X=void 0;J=void 0;La=H.length;for(X=0;X<La;X++){J=H[X];if(J.vertexColors){J=J.vertexColors;break a}}J=!1}M.__vertexArray=new Float32Array(N*3);if(Da)M.__normalArray=new Float32Array(N*3);if($.hasTangents)M.__tangentArray=new Float32Array(N*4);if(J)M.__colorArray=new Float32Array(N*3);if(L){if($.faceUvs.length>0||$.faceVertexUvs.length>0)M.__uvArray=new Float32Array(N*2);if($.faceUvs.length>1||$.faceVertexUvs.length>1)M.__uv2Array=new Float32Array(N*
2)}if(I.geometry.skinWeights.length&&I.geometry.skinIndices.length){M.__skinVertexAArray=new Float32Array(N*4);M.__skinVertexBArray=new Float32Array(N*4);M.__skinIndexArray=new Float32Array(N*4);M.__skinWeightArray=new Float32Array(N*4)}M.__faceArray=new Uint16Array(Ca*3+(I.geometry.edgeFaces?I.geometry.edgeFaces.length*6:0));M.__lineArray=new Uint16Array(Ha*2);if(M.numMorphTargets){M.__morphTargetsArrays=[];$=0;for(X=M.numMorphTargets;$<X;$++)M.__morphTargetsArrays.push(new Float32Array(N*3))}M.__needsSmoothNormals=
Da==THREE.SmoothShading;M.__uvType=L;M.__vertexColorType=J;M.__normalType=Da;M.__webglFaceCount=Ca*3+(I.geometry.edgeFaces?I.geometry.edgeFaces.length*6:0);M.__webglLineCount=Ha*2;$=0;for(X=H.length;$<X;$++)if(H[$].attributes){M.__webglCustomAttributes={};for(a in H[$].attributes){L=H[$].attributes[a];if(!L.__webglInitialized||L.createUniqueBuffers){L.__webglInitialized=!0;Ca=1;if(L.type==="v2")Ca=2;else if(L.type==="v3")Ca=3;else if(L.type==="v4")Ca=4;else L.type==="c"&&(Ca=3);L.size=Ca;L.needsUpdate=
!0;L.array=new Float32Array(N*Ca);L.buffer=e.createBuffer();L.buffer.belongsToAttribute=a}M.__webglCustomAttributes[a]=L}}A.__dirtyVertices=!0;A.__dirtyMorphTargets=!0;A.__dirtyElements=!0;A.__dirtyUvs=!0;A.__dirtyNormals=!0;A.__dirtyTangents=!0;A.__dirtyColors=!0}D instanceof THREE.ShadowVolume?C(y.__webglShadowVolumes,K,D):C(y.__webglObjects,K,D)}}else if(D instanceof THREE.LensFlare)C(y.__webglLensFlares,undefined,D);else if(D instanceof THREE.Ribbon){A=D.geometry;if(!A.__webglVertexBuffer){x=
A;x.__webglVertexBuffer=e.createBuffer();x.__webglColorBuffer=e.createBuffer();x=A;K=x.vertices.length;x.__vertexArray=new Float32Array(K*3);x.__colorArray=new Float32Array(K*3);x.__webglVertexCount=K;A.__dirtyVertices=!0;A.__dirtyColors=!0}C(y.__webglObjects,A,D)}else if(D instanceof THREE.Line){A=D.geometry;if(!A.__webglVertexBuffer){x=A;x.__webglVertexBuffer=e.createBuffer();x.__webglColorBuffer=e.createBuffer();x=A;K=x.vertices.length;x.__vertexArray=new Float32Array(K*3);x.__colorArray=new Float32Array(K*
3);x.__webglLineCount=K;A.__dirtyVertices=!0;A.__dirtyColors=!0}C(y.__webglObjects,A,D)}else if(D instanceof THREE.ParticleSystem){A=D.geometry;if(!A.__webglVertexBuffer){x=A;x.__webglVertexBuffer=e.createBuffer();x.__webglColorBuffer=e.createBuffer();x=A;K=x.vertices.length;x.__vertexArray=new Float32Array(K*3);x.__colorArray=new Float32Array(K*3);x.__sortArray=[];x.__webglParticleCount=K;A.__dirtyVertices=!0;A.__dirtyColors=!0}C(y.__webglObjects,A,D)}else if(THREE.MarchingCubes!==undefined&&D instanceof
THREE.MarchingCubes)y.__webglObjectsImmediate.push({object:D,opaque:{list:[],count:0},transparent:{list:[],count:0}});else D instanceof THREE.Sprite&&y.__webglSprites.push(D);n.__objectsAdded.splice(0,1)}for(;n.__objectsRemoved.length;){D=n.__objectsRemoved[0];y=n;A=void 0;x=void 0;if(D instanceof THREE.Mesh)for(A=y.__webglObjects.length-1;A>=0;A--){x=y.__webglObjects[A].object;if(D==x){y.__webglObjects.splice(A,1);break}}else if(D instanceof THREE.Sprite)for(A=y.__webglSprites.length-1;A>=0;A--){x=
y.__webglSprites[A];if(D==x){y.__webglSprites.splice(A,1);break}}n.__objectsRemoved.splice(0,1)}D=0;for(y=n.__webglObjects.length;D<y;D++)B(n.__webglObjects[D].object,n);D=0;for(y=n.__webglShadowVolumes.length;D<y;D++)B(n.__webglShadowVolumes[D].object,n);D=0;for(y=n.__webglLensFlares.length;D<y;D++)B(n.__webglLensFlares[D].object,n)};this.setFaceCulling=function(n,D){if(n){!D||D=="ccw"?e.frontFace(e.CCW):e.frontFace(e.CW);if(n=="back")e.cullFace(e.BACK);else n=="front"?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK);
e.enable(e.CULL_FACE)}else e.disable(e.CULL_FACE)};this.supportsVertexTextures=function(){return Z}};
THREE.WebGLRenderTarget=function(b,d,c){this.width=b;this.height=d;c=c||{};this.wrapS=c.wrapS!==undefined?c.wrapS:THREE.ClampToEdgeWrapping;this.wrapT=c.wrapT!==undefined?c.wrapT:THREE.ClampToEdgeWrapping;this.magFilter=c.magFilter!==undefined?c.magFilter:THREE.LinearFilter;this.minFilter=c.minFilter!==undefined?c.minFilter:THREE.LinearMipMapLinearFilter;this.format=c.format!==undefined?c.format:THREE.RGBAFormat;this.type=c.type!==undefined?c.type:THREE.UnsignedByteType;this.depthBuffer=c.depthBuffer!==
undefined?c.depthBuffer:!0;this.stencilBuffer=c.stencilBuffer!==undefined?c.stencilBuffer:!0};
THREE.SoundRenderer=function(){this.volume=1;this.domElement=document.createElement("div");this.domElement.id="THREESound";this.cameraPosition=new THREE.Vector3;this.soundPosition=new THREE.Vector3;this.render=function(b,d,c){c&&b.update(undefined,!1,d);c=b.sounds;var f,g=c.length;for(f=0;f<g;f++){b=c[f];this.soundPosition.set(b.matrixWorld.n14,b.matrixWorld.n24,b.matrixWorld.n34);this.soundPosition.subSelf(d.position);if(b.isPlaying&&b.isLoaded){b.isAddedToDOM||b.addToDOM(this.domElement);b.calculateVolumeAndPan(this.soundPosition)}}}};
THREE.RenderableVertex=function(){this.positionWorld=new THREE.Vector3;this.positionScreen=new THREE.Vector4;this.visible=!0};THREE.RenderableVertex.prototype.copy=function(b){this.positionWorld.copy(b.positionWorld);this.positionScreen.copy(b.positionScreen)};
THREE.RenderableFace3=function(){this.v1=new THREE.RenderableVertex;this.v2=new THREE.RenderableVertex;this.v3=new THREE.RenderableVertex;this.centroidWorld=new THREE.Vector3;this.centroidScreen=new THREE.Vector3;this.normalWorld=new THREE.Vector3;this.vertexNormalsWorld=[new THREE.Vector3,new THREE.Vector3,new THREE.Vector3];this.faceMaterials=this.meshMaterials=null;this.overdraw=!1;this.uvs=[[]];this.z=null};
THREE.RenderableFace4=function(){this.v1=new THREE.RenderableVertex;this.v2=new THREE.RenderableVertex;this.v3=new THREE.RenderableVertex;this.v4=new THREE.RenderableVertex;this.centroidWorld=new THREE.Vector3;this.centroidScreen=new THREE.Vector3;this.normalWorld=new THREE.Vector3;this.vertexNormalsWorld=[new THREE.Vector3,new THREE.Vector3,new THREE.Vector3,new THREE.Vector3];this.faceMaterials=this.meshMaterials=null;this.overdraw=!1;this.uvs=[[]];this.z=null};
THREE.RenderableObject=function(){this.z=this.object=null};THREE.RenderableParticle=function(){this.rotation=this.z=this.y=this.x=null;this.scale=new THREE.Vector2;this.materials=null};THREE.RenderableLine=function(){this.z=null;this.v1=new THREE.RenderableVertex;this.v2=new THREE.RenderableVertex;this.materials=null};
THREE.AnimationHandler=function(){var b=[],d={},c={};c.update=function(g){for(var h=0;h<b.length;h++)b[h].update(g)};c.addToUpdate=function(g){b.indexOf(g)===-1&&b.push(g)};c.removeFromUpdate=function(g){g=b.indexOf(g);g!==-1&&b.splice(g,1)};c.add=function(g){d[g.name]!==undefined&&console.log("THREE.AnimationHandler.add: Warning! "+g.name+" already exists in library. Overwriting.");d[g.name]=g;if(g.initialized!==!0){for(var h=0;h<g.hierarchy.length;h++){for(var j=0;j<g.hierarchy[h].keys.length;j++){if(g.hierarchy[h].keys[j].time<
0)g.hierarchy[h].keys[j].time=0;if(g.hierarchy[h].keys[j].rot!==undefined&&!(g.hierarchy[h].keys[j].rot instanceof THREE.Quaternion)){var k=g.hierarchy[h].keys[j].rot;g.hierarchy[h].keys[j].rot=new THREE.Quaternion(k[0],k[1],k[2],k[3])}}if(g.hierarchy[h].keys[0].morphTargets!==undefined){k={};for(j=0;j<g.hierarchy[h].keys.length;j++)for(var m=0;m<g.hierarchy[h].keys[j].morphTargets.length;m++){var o=g.hierarchy[h].keys[j].morphTargets[m];k[o]=-1}g.hierarchy[h].usedMorphTargets=k;for(j=0;j<g.hierarchy[h].keys.length;j++){var t=
{};for(o in k){for(m=0;m<g.hierarchy[h].keys[j].morphTargets.length;m++)if(g.hierarchy[h].keys[j].morphTargets[m]===o){t[o]=g.hierarchy[h].keys[j].morphTargetsInfluences[m];break}m===g.hierarchy[h].keys[j].morphTargets.length&&(t[o]=0)}g.hierarchy[h].keys[j].morphTargetsInfluences=t}}for(j=1;j<g.hierarchy[h].keys.length;j++)if(g.hierarchy[h].keys[j].time===g.hierarchy[h].keys[j-1].time){g.hierarchy[h].keys.splice(j,1);j--}for(j=1;j<g.hierarchy[h].keys.length;j++)g.hierarchy[h].keys[j].index=j}j=parseInt(g.length*
g.fps,10);g.JIT={};g.JIT.hierarchy=[];for(h=0;h<g.hierarchy.length;h++)g.JIT.hierarchy.push(Array(j));g.initialized=!0}};c.get=function(g){if(typeof g==="string")if(d[g])return d[g];else{console.log("THREE.AnimationHandler.get: Couldn't find animation "+g);return null}};c.parse=function(g){var h=[];if(g instanceof THREE.SkinnedMesh)for(var j=0;j<g.bones.length;j++)h.push(g.bones[j]);else f(g,h);return h};var f=function(g,h){h.push(g);for(var j=0;j<g.children.length;j++)f(g.children[j],h)};c.LINEAR=
0;c.CATMULLROM=1;c.CATMULLROM_FORWARD=2;return c}();THREE.Animation=function(b,d,c,f){this.root=b;this.data=THREE.AnimationHandler.get(d);this.hierarchy=THREE.AnimationHandler.parse(b);this.currentTime=0;this.timeScale=1;this.isPlaying=!1;this.isPaused=!0;this.loop=!0;this.interpolationType=c!==undefined?c:THREE.AnimationHandler.LINEAR;this.JITCompile=f!==undefined?f:!0;this.points=[];this.target=new THREE.Vector3};
THREE.Animation.prototype.play=function(b,d){if(!this.isPlaying){this.isPlaying=!0;this.loop=b!==undefined?b:!0;this.currentTime=d!==undefined?d:0;var c,f=this.hierarchy.length,g;for(c=0;c<f;c++){g=this.hierarchy[c];if(this.interpolationType!==THREE.AnimationHandler.CATMULLROM_FORWARD)g.useQuaternion=!0;g.matrixAutoUpdate=!0;if(g.animationCache===undefined){g.animationCache={};g.animationCache.prevKey={pos:0,rot:0,scl:0};g.animationCache.nextKey={pos:0,rot:0,scl:0};g.animationCache.originalMatrix=
g instanceof THREE.Bone?g.skinMatrix:g.matrix}var h=g.animationCache.prevKey;g=g.animationCache.nextKey;h.pos=this.data.hierarchy[c].keys[0];h.rot=this.data.hierarchy[c].keys[0];h.scl=this.data.hierarchy[c].keys[0];g.pos=this.getNextKeyWith("pos",c,1);g.rot=this.getNextKeyWith("rot",c,1);g.scl=this.getNextKeyWith("scl",c,1)}this.update(0)}this.isPaused=!1;THREE.AnimationHandler.addToUpdate(this)};
THREE.Animation.prototype.pause=function(){this.isPaused?THREE.AnimationHandler.addToUpdate(this):THREE.AnimationHandler.removeFromUpdate(this);this.isPaused=!this.isPaused};
THREE.Animation.prototype.stop=function(){this.isPlaying=!1;this.isPaused=!1;THREE.AnimationHandler.removeFromUpdate(this);for(var b=0;b<this.hierarchy.length;b++)if(this.hierarchy[b].animationCache!==undefined){if(this.hierarchy[b]instanceof THREE.Bone)this.hierarchy[b].skinMatrix=this.hierarchy[b].animationCache.originalMatrix;else this.hierarchy[b].matrix=this.hierarchy[b].animationCache.originalMatrix;delete this.hierarchy[b].animationCache}};
THREE.Animation.prototype.update=function(b){if(this.isPlaying){var d=["pos","rot","scl"],c,f,g,h,j,k,m,o,t=this.data.JIT.hierarchy,u,w;this.currentTime+=b*this.timeScale;w=this.currentTime;u=this.currentTime%=this.data.length;o=parseInt(Math.min(u*this.data.fps,this.data.length*this.data.fps),10);for(var p=0,z=this.hierarchy.length;p<z;p++){b=this.hierarchy[p];m=b.animationCache;if(this.JITCompile&&t[p][o]!==undefined)if(b instanceof THREE.Bone){b.skinMatrix=t[p][o];b.matrixAutoUpdate=!1;b.matrixWorldNeedsUpdate=
!1}else{b.matrix=t[p][o];b.matrixAutoUpdate=!1;b.matrixWorldNeedsUpdate=!0}else{if(this.JITCompile)if(b instanceof THREE.Bone)b.skinMatrix=b.animationCache.originalMatrix;else b.matrix=b.animationCache.originalMatrix;for(var G=0;G<3;G++){c=d[G];j=m.prevKey[c];k=m.nextKey[c];if(k.time<=w){if(u<w)if(this.loop){j=this.data.hierarchy[p].keys[0];for(k=this.getNextKeyWith(c,p,1);k.time<u;){j=k;k=this.getNextKeyWith(c,p,k.index+1)}}else{this.stop();return}else{do{j=k;k=this.getNextKeyWith(c,p,k.index+1)}while(k.time<
u)}m.prevKey[c]=j;m.nextKey[c]=k}b.matrixAutoUpdate=!0;b.matrixWorldNeedsUpdate=!0;f=(u-j.time)/(k.time-j.time);g=j[c];h=k[c];if(f<0||f>1){console.log("THREE.Animation.update: Warning! Scale out of bounds:"+f+" on bone "+p);f=f<0?0:1}if(c==="pos"){c=b.position;if(this.interpolationType===THREE.AnimationHandler.LINEAR){c.x=g[0]+(h[0]-g[0])*f;c.y=g[1]+(h[1]-g[1])*f;c.z=g[2]+(h[2]-g[2])*f}else if(this.interpolationType===THREE.AnimationHandler.CATMULLROM||this.interpolationType===THREE.AnimationHandler.CATMULLROM_FORWARD){this.points[0]=
this.getPrevKeyWith("pos",p,j.index-1).pos;this.points[1]=g;this.points[2]=h;this.points[3]=this.getNextKeyWith("pos",p,k.index+1).pos;f=f*0.33+0.33;g=this.interpolateCatmullRom(this.points,f);c.x=g[0];c.y=g[1];c.z=g[2];if(this.interpolationType===THREE.AnimationHandler.CATMULLROM_FORWARD){f=this.interpolateCatmullRom(this.points,f*1.01);this.target.set(f[0],f[1],f[2]);this.target.subSelf(c);this.target.y=0;this.target.normalize();f=Math.atan2(this.target.x,this.target.z);b.rotation.set(0,f,0)}}}else if(c===
"rot")THREE.Quaternion.slerp(g,h,b.quaternion,f);else if(c==="scl"){c=b.scale;c.x=g[0]+(h[0]-g[0])*f;c.y=g[1]+(h[1]-g[1])*f;c.z=g[2]+(h[2]-g[2])*f}}}}if(this.JITCompile&&t[0][o]===undefined){this.hierarchy[0].update(undefined,!0);for(p=0;p<this.hierarchy.length;p++)t[p][o]=this.hierarchy[p]instanceof THREE.Bone?this.hierarchy[p].skinMatrix.clone():this.hierarchy[p].matrix.clone()}}};
THREE.Animation.prototype.interpolateCatmullRom=function(b,d){var c=[],f=[],g,h,j,k,m,o;g=(b.length-1)*d;h=Math.floor(g);g-=h;c[0]=h==0?h:h-1;c[1]=h;c[2]=h>b.length-2?h:h+1;c[3]=h>b.length-3?h:h+2;h=b[c[0]];k=b[c[1]];m=b[c[2]];o=b[c[3]];c=g*g;j=g*c;f[0]=this.interpolate(h[0],k[0],m[0],o[0],g,c,j);f[1]=this.interpolate(h[1],k[1],m[1],o[1],g,c,j);f[2]=this.interpolate(h[2],k[2],m[2],o[2],g,c,j);return f};
THREE.Animation.prototype.interpolate=function(b,d,c,f,g,h,j){b=(c-b)*0.5;f=(f-d)*0.5;return(2*(d-c)+b+f)*j+(-3*(d-c)-2*b-f)*h+b*g+d};THREE.Animation.prototype.getNextKeyWith=function(b,d,c){var f=this.data.hierarchy[d].keys;if(this.interpolationType===THREE.AnimationHandler.CATMULLROM||this.interpolationType===THREE.AnimationHandler.CATMULLROM_FORWARD)c=c<f.length-1?c:f.length-1;else c%=f.length;for(;c<f.length;c++)if(f[c][b]!==undefined)return f[c];return this.data.hierarchy[d].keys[0]};
THREE.Animation.prototype.getPrevKeyWith=function(b,d,c){var f=this.data.hierarchy[d].keys;for(c=this.interpolationType===THREE.AnimationHandler.CATMULLROM||this.interpolationType===THREE.AnimationHandler.CATMULLROM_FORWARD?c>0?c:0:c>=0?c:c+f.length;c>=0;c--)if(f[c][b]!==undefined)return f[c];return this.data.hierarchy[d].keys[f.length-1]};
THREE.ColorUtils={adjustHSV:function(b,d,c,f){var g=THREE.ColorUtils.__hsv;THREE.ColorUtils.rgbToHsv(b,g);g.h=THREE.ColorUtils.clamp(g.h+d,0,1);g.s=THREE.ColorUtils.clamp(g.s+c,0,1);g.v=THREE.ColorUtils.clamp(g.v+f,0,1);b.setHSV(g.h,g.s,g.v)},rgbToHsv:function(b,d){var c=b.r,f=b.g,g=b.b,h=Math.max(Math.max(c,f),g),j=Math.min(Math.min(c,f),g);if(j==h)j=c=0;else{var k=h-j;j=k/h;c=c==h?(f-g)/k:f==h?2+(g-c)/k:4+(c-f)/k;c/=6;c<0&&(c+=1);c>1&&(c-=1)}d===undefined&&(d={h:0,s:0,v:0});d.h=c;d.s=j;d.v=h;return d},
clamp:function(b,d,c){return b<d?d:b>c?c:b}};THREE.ColorUtils.__hsv={h:0,s:0,v:0};
var GeometryUtils={merge:function(b,d){var c=d instanceof THREE.Mesh,f=b.vertices.length,g=c?d.geometry:d,h=b.vertices,j=g.vertices,k=b.faces,m=g.faces,o=b.faceVertexUvs[0];g=g.faceVertexUvs[0];c&&d.matrixAutoUpdate&&d.updateMatrix();for(var t=0,u=j.length;t<u;t++){var w=new THREE.Vertex(j[t].position.clone());c&&d.matrix.multiplyVector3(w.position);h.push(w)}t=0;for(u=m.length;t<u;t++){j=m[t];var p,z,G=j.vertexNormals;w=j.vertexColors;if(j instanceof THREE.Face3)p=new THREE.Face3(j.a+f,j.b+f,j.c+
f);else j instanceof THREE.Face4&&(p=new THREE.Face4(j.a+f,j.b+f,j.c+f,j.d+f));p.normal.copy(j.normal);c=0;for(h=G.length;c<h;c++){z=G[c];p.vertexNormals.push(z.clone())}p.color.copy(j.color);c=0;for(h=w.length;c<h;c++){z=w[c];p.vertexColors.push(z.clone())}p.materials=j.materials.slice();p.centroid.copy(j.centroid);k.push(p)}t=0;for(u=g.length;t<u;t++){f=g[t];k=[];c=0;for(h=f.length;c<h;c++)k.push(new THREE.UV(f[c].u,f[c].v));o.push(k)}}};
THREE.ImageUtils={loadTexture:function(b,d,c){var f=new Image,g=new THREE.Texture(f,d);f.onload=function(){g.needsUpdate=!0;c&&c(this)};f.src=b;return g},loadTextureCube:function(b,d,c){var f,g=[],h=new THREE.Texture(g,d);d=g.loadCount=0;for(f=b.length;d<f;++d){g[d]=new Image;g[d].onload=function(){g.loadCount+=1;if(g.loadCount==6)h.needsUpdate=!0;c&&c(this)};g[d].src=b[d]}return h}};
THREE.SceneUtils={addMesh:function(b,d,c,f,g,h,j,k,m,o){d=new THREE.Mesh(d,o);d.scale.x=d.scale.y=d.scale.z=c;d.position.x=f;d.position.y=g;d.position.z=h;d.rotation.x=j;d.rotation.y=k;d.rotation.z=m;b.addObject(d);return d},addPanoramaCubeWebGL:function(b,d,c){var f=THREE.ShaderUtils.lib.cube;f.uniforms.tCube.texture=c;c=new THREE.MeshShaderMaterial({fragmentShader:f.fragmentShader,vertexShader:f.vertexShader,uniforms:f.uniforms});d=new THREE.Mesh(new THREE.Cube(d,d,d,1,1,1,null,!0),c);b.addObject(d);
return d},addPanoramaCube:function(b,d,c){var f=[];f.push(new THREE.MeshBasicMaterial({map:new THREE.Texture(c[0])}));f.push(new THREE.MeshBasicMaterial({map:new THREE.Texture(c[1])}));f.push(new THREE.MeshBasicMaterial({map:new THREE.Texture(c[2])}));f.push(new THREE.MeshBasicMaterial({map:new THREE.Texture(c[3])}));f.push(new THREE.MeshBasicMaterial({map:new THREE.Texture(c[4])}));f.push(new THREE.MeshBasicMaterial({map:new THREE.Texture(c[5])}));d=new THREE.Mesh(new THREE.Cube(d,d,d,1,1,f,!0),
new THREE.MeshFaceMaterial);b.addObject(d);return d},addPanoramaCubePlanes:function(b,d,c){var f=d/2;d=new THREE.Plane(d,d);var g=Math.PI,h=Math.PI/2;THREE.SceneUtils.addMesh(b,d,1,0,0,-f,0,0,0,new THREE.MeshBasicMaterial({map:new THREE.Texture(c[5])}));THREE.SceneUtils.addMesh(b,d,1,-f,0,0,0,h,0,new THREE.MeshBasicMaterial({map:new THREE.Texture(c[0])}));THREE.SceneUtils.addMesh(b,d,1,f,0,0,0,-h,0,new THREE.MeshBasicMaterial({map:new THREE.Texture(c[1])}));THREE.SceneUtils.addMesh(b,d,1,0,f,0,h,
0,g,new THREE.MeshBasicMaterial({map:new THREE.Texture(c[2])}));THREE.SceneUtils.addMesh(b,d,1,0,-f,0,-h,0,g,new THREE.MeshBasicMaterial({map:new THREE.Texture(c[3])}))},showHierarchy:function(b,d){THREE.SceneUtils.traverseHierarchy(b,function(c){c.visible=d})},traverseHierarchy:function(b,d){var c,f,g=b.children.length;for(f=0;f<g;f++){c=b.children[f];d(c);THREE.SceneUtils.traverseHierarchy(c,d)}}};
THREE.ShaderUtils={lib:{fresnel:{uniforms:{mRefractionRatio:{type:"f",value:1.02},mFresnelBias:{type:"f",value:0.1},mFresnelPower:{type:"f",value:2},mFresnelScale:{type:"f",value:1},tCube:{type:"t",value:1,texture:null}},fragmentShader:"uniform samplerCube tCube;\nvarying vec3 vReflect;\nvarying vec3 vRefract[3];\nvarying float vReflectionFactor;\nvoid main() {\nvec4 reflectedColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );\nvec4 refractedColor = vec4( 1.0, 1.0, 1.0, 1.0 );\nrefractedColor.r = textureCube( tCube, vec3( -vRefract[0].x, vRefract[0].yz ) ).r;\nrefractedColor.g = textureCube( tCube, vec3( -vRefract[1].x, vRefract[1].yz ) ).g;\nrefractedColor.b = textureCube( tCube, vec3( -vRefract[2].x, vRefract[2].yz ) ).b;\nrefractedColor.a = 1.0;\ngl_FragColor = mix( refractedColor, reflectedColor, clamp( vReflectionFactor, 0.0, 1.0 ) );\n}",
vertexShader:"uniform float mRefractionRatio;\nuniform float mFresnelBias;\nuniform float mFresnelScale;\nuniform float mFresnelPower;\nvarying vec3 vReflect;\nvarying vec3 vRefract[3];\nvarying float vReflectionFactor;\nvoid main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvec3 nWorld = normalize ( mat3( objectMatrix[0].xyz, objectMatrix[1].xyz, objectMatrix[2].xyz ) * normal );\nvec3 I = mPosition.xyz - cameraPosition;\nvReflect = reflect( I, nWorld );\nvRefract[0] = refract( normalize( I ), nWorld, mRefractionRatio );\nvRefract[1] = refract( normalize( I ), nWorld, mRefractionRatio * 0.99 );\nvRefract[2] = refract( normalize( I ), nWorld, mRefractionRatio * 0.98 );\nvReflectionFactor = mFresnelBias + mFresnelScale * pow( 1.0 + dot( normalize( I ), nWorld ), mFresnelPower );\ngl_Position = projectionMatrix * mvPosition;\n}"},
normal:{uniforms:{enableAO:{type:"i",value:0},enableDiffuse:{type:"i",value:0},enableSpecular:{type:"i",value:0},tDiffuse:{type:"t",value:0,texture:null},tNormal:{type:"t",value:2,texture:null},tSpecular:{type:"t",value:3,texture:null},tAO:{type:"t",value:4,texture:null},uNormalScale:{type:"f",value:1},tDisplacement:{type:"t",value:5,texture:null},uDisplacementBias:{type:"f",value:-0.5},uDisplacementScale:{type:"f",value:2.5},uPointLightPos:{type:"v3",value:new THREE.Vector3},uPointLightColor:{type:"c",
value:new THREE.Color(15658734)},uDirLightPos:{type:"v3",value:new THREE.Vector3},uDirLightColor:{type:"c",value:new THREE.Color(15658734)},uAmbientLightColor:{type:"c",value:new THREE.Color(328965)},uDiffuseColor:{type:"c",value:new THREE.Color(15658734)},uSpecularColor:{type:"c",value:new THREE.Color(1118481)},uAmbientColor:{type:"c",value:new THREE.Color(328965)},uShininess:{type:"f",value:30}},fragmentShader:"uniform vec3 uDirLightPos;\nuniform vec3 uAmbientLightColor;\nuniform vec3 uDirLightColor;\nuniform vec3 uPointLightColor;\nuniform vec3 uAmbientColor;\nuniform vec3 uDiffuseColor;\nuniform vec3 uSpecularColor;\nuniform float uShininess;\nuniform bool enableDiffuse;\nuniform bool enableSpecular;\nuniform bool enableAO;\nuniform sampler2D tDiffuse;\nuniform sampler2D tNormal;\nuniform sampler2D tSpecular;\nuniform sampler2D tAO;\nuniform float uNormalScale;\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nvarying vec3 vPointLightVector;\nvarying vec3 vViewPosition;\nvoid main() {\nvec3 diffuseTex = vec3( 1.0, 1.0, 1.0 );\nvec3 aoTex = vec3( 1.0, 1.0, 1.0 );\nvec3 specularTex = vec3( 1.0, 1.0, 1.0 );\nvec3 normalTex = texture2D( tNormal, vUv ).xyz * 2.0 - 1.0;\nnormalTex.xy *= uNormalScale;\nnormalTex = normalize( normalTex );\nif( enableDiffuse )\ndiffuseTex = texture2D( tDiffuse, vUv ).xyz;\nif( enableAO )\naoTex = texture2D( tAO, vUv ).xyz;\nif( enableSpecular )\nspecularTex = texture2D( tSpecular, vUv ).xyz;\nmat3 tsb = mat3( vTangent, vBinormal, vNormal );\nvec3 finalNormal = tsb * normalTex;\nvec3 normal = normalize( finalNormal );\nvec3 viewPosition = normalize( vViewPosition );\nvec4 pointDiffuse  = vec4( 0.0, 0.0, 0.0, 0.0 );\nvec4 pointSpecular = vec4( 0.0, 0.0, 0.0, 0.0 );\nvec3 pointVector = normalize( vPointLightVector );\nvec3 pointHalfVector = normalize( vPointLightVector + vViewPosition );\nfloat pointDotNormalHalf = dot( normal, pointHalfVector );\nfloat pointDiffuseWeight = max( dot( normal, pointVector ), 0.0 );\nfloat pointSpecularWeight = 0.0;\nif ( pointDotNormalHalf >= 0.0 )\npointSpecularWeight = specularTex.r * pow( pointDotNormalHalf, uShininess );\npointDiffuse  += vec4( uDiffuseColor, 1.0 ) * pointDiffuseWeight;\npointSpecular += vec4( uSpecularColor, 1.0 ) * pointSpecularWeight * pointDiffuseWeight;\nvec4 dirDiffuse  = vec4( 0.0, 0.0, 0.0, 0.0 );\nvec4 dirSpecular = vec4( 0.0, 0.0, 0.0, 0.0 );\nvec4 lDirection = viewMatrix * vec4( uDirLightPos, 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nvec3 dirHalfVector = normalize( lDirection.xyz + vViewPosition );\nfloat dirDotNormalHalf = dot( normal, dirHalfVector );\nfloat dirDiffuseWeight = max( dot( normal, dirVector ), 0.0 );\nfloat dirSpecularWeight = 0.0;\nif ( dirDotNormalHalf >= 0.0 )\ndirSpecularWeight = specularTex.r * pow( dirDotNormalHalf, uShininess );\ndirDiffuse  += vec4( uDiffuseColor, 1.0 ) * dirDiffuseWeight;\ndirSpecular += vec4( uSpecularColor, 1.0 ) * dirSpecularWeight * dirDiffuseWeight;\nvec4 totalLight = vec4( uAmbientLightColor * uAmbientColor, 1.0 );\ntotalLight += vec4( uDirLightColor, 1.0 ) * ( dirDiffuse + dirSpecular );\ntotalLight += vec4( uPointLightColor, 1.0 ) * ( pointDiffuse + pointSpecular );\ngl_FragColor = vec4( totalLight.xyz * aoTex * diffuseTex, 1.0 );\n}",
vertexShader:"attribute vec4 tangent;\nuniform vec3 uPointLightPos;\n#ifdef VERTEX_TEXTURES\nuniform sampler2D tDisplacement;\nuniform float uDisplacementScale;\nuniform float uDisplacementBias;\n#endif\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nvarying vec3 vPointLightVector;\nvarying vec3 vViewPosition;\nvoid main() {\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvViewPosition = cameraPosition - mPosition.xyz;\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvNormal = normalize( normalMatrix * normal );\nvTangent = normalize( normalMatrix * tangent.xyz );\nvBinormal = cross( vNormal, vTangent ) * tangent.w;\nvBinormal = normalize( vBinormal );\nvUv = uv;\nvec4 lPosition = viewMatrix * vec4( uPointLightPos, 1.0 );\nvPointLightVector = normalize( lPosition.xyz - mvPosition.xyz );\n#ifdef VERTEX_TEXTURES\nvec3 dv = texture2D( tDisplacement, uv ).xyz;\nfloat df = uDisplacementScale * dv.x + uDisplacementBias;\nvec4 displacedPosition = vec4( vNormal.xyz * df, 0.0 ) + mvPosition;\ngl_Position = projectionMatrix * displacedPosition;\n#else\ngl_Position = projectionMatrix * mvPosition;\n#endif\n}"},
cube:{uniforms:{tCube:{type:"t",value:1,texture:null}},vertexShader:"varying vec3 vViewPosition;\nvoid main() {\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvViewPosition = cameraPosition - mPosition.xyz;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",fragmentShader:"uniform samplerCube tCube;\nvarying vec3 vViewPosition;\nvoid main() {\nvec3 wPos = cameraPosition - vViewPosition;\ngl_FragColor = textureCube( tCube, vec3( - wPos.x, wPos.yz ) );\n}"},convolution:{uniforms:{tDiffuse:{type:"t",
value:0,texture:null},uImageIncrement:{type:"v2",value:new THREE.Vector2(0.001953125,0)},cKernel:{type:"fv1",value:[]}},vertexShader:"varying vec2 vUv;\nuniform vec2 uImageIncrement;\nvoid main(void) {\nvUv = uv - ((KERNEL_SIZE - 1.0) / 2.0) * uImageIncrement;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",fragmentShader:"varying vec2 vUv;\nuniform sampler2D tDiffuse;\nuniform vec2 uImageIncrement;\nuniform float cKernel[KERNEL_SIZE];\nvoid main(void) {\nvec2 imageCoord = vUv;\nvec4 sum = vec4( 0.0, 0.0, 0.0, 0.0 );\nfor( int i=0; i<KERNEL_SIZE; ++i ) {\nsum += texture2D( tDiffuse, imageCoord ) * cKernel[i];\nimageCoord += uImageIncrement;\n}\ngl_FragColor = sum;\n}"},
film:{uniforms:{tDiffuse:{type:"t",value:0,texture:null},time:{type:"f",value:0},nIntensity:{type:"f",value:0.5},sIntensity:{type:"f",value:0.05},sCount:{type:"f",value:4096},grayscale:{type:"i",value:1}},vertexShader:"varying vec2 vUv;\nvoid main() {\nvUv = vec2( uv.x, 1.0 - uv.y );\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",fragmentShader:"varying vec2 vUv;\nuniform sampler2D tDiffuse;\nuniform float time;\nuniform bool grayscale;\nuniform float nIntensity;\nuniform float sIntensity;\nuniform float sCount;\nvoid main() {\nvec4 cTextureScreen = texture2D( tDiffuse, vUv );\nfloat x = vUv.x * vUv.y * time *  1000.0;\nx = mod( x, 13.0 ) * mod( x, 123.0 );\nfloat dx = mod( x, 0.01 );\nvec3 cResult = cTextureScreen.rgb + cTextureScreen.rgb * clamp( 0.1 + dx * 100.0, 0.0, 1.0 );\nvec2 sc = vec2( sin( vUv.y * sCount ), cos( vUv.y * sCount ) );\ncResult += cTextureScreen.rgb * vec3( sc.x, sc.y, sc.x ) * sIntensity;\ncResult = cTextureScreen.rgb + clamp( nIntensity, 0.0,1.0 ) * ( cResult - cTextureScreen.rgb );\nif( grayscale ) {\ncResult = vec3( cResult.r * 0.3 + cResult.g * 0.59 + cResult.b * 0.11 );\n}\ngl_FragColor =  vec4( cResult, cTextureScreen.a );\n}"},
screen:{uniforms:{tDiffuse:{type:"t",value:0,texture:null},opacity:{type:"f",value:1}},vertexShader:"varying vec2 vUv;\nvoid main() {\nvUv = vec2( uv.x, 1.0 - uv.y );\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",fragmentShader:"varying vec2 vUv;\nuniform sampler2D tDiffuse;\nuniform float opacity;\nvoid main() {\nvec4 texel = texture2D( tDiffuse, vUv );\ngl_FragColor = opacity * texel;\n}"},basic:{uniforms:{},vertexShader:"void main() {\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
fragmentShader:"void main() {\ngl_FragColor = vec4( 1.0, 0.0, 0.0, 0.5 );\n}"}},buildKernel:function(b){var d,c,f,g,h=2*Math.ceil(b*3)+1;h>25&&(h=25);g=(h-1)*0.5;c=Array(h);for(d=f=0;d<h;++d){c[d]=Math.exp(-((d-g)*(d-g))/(2*b*b));f+=c[d]}for(d=0;d<h;++d)c[d]/=f;return c}};
THREE.QuakeCamera=function(b){function d(c,f){return function(){f.apply(c,arguments)}}THREE.Camera.call(this,b.fov,b.aspect,b.near,b.far,b.target);this.movementSpeed=1;this.lookSpeed=0.005;this.noFly=!1;this.lookVertical=!0;this.autoForward=!1;this.activeLook=!0;this.heightSpeed=!1;this.heightCoef=1;this.heightMin=0;this.constrainVertical=!1;this.verticalMin=0;this.verticalMax=3.14;this.domElement=document;this.lastUpdate=(new Date).getTime();this.tdiff=0;if(b){if(b.movementSpeed!==undefined)this.movementSpeed=
b.movementSpeed;if(b.lookSpeed!==undefined)this.lookSpeed=b.lookSpeed;if(b.noFly!==undefined)this.noFly=b.noFly;if(b.lookVertical!==undefined)this.lookVertical=b.lookVertical;if(b.autoForward!==undefined)this.autoForward=b.autoForward;if(b.activeLook!==undefined)this.activeLook=b.activeLook;if(b.heightSpeed!==undefined)this.heightSpeed=b.heightSpeed;if(b.heightCoef!==undefined)this.heightCoef=b.heightCoef;if(b.heightMin!==undefined)this.heightMin=b.heightMin;if(b.heightMax!==undefined)this.heightMax=
b.heightMax;if(b.constrainVertical!==undefined)this.constrainVertical=b.constrainVertical;if(b.verticalMin!==undefined)this.verticalMin=b.verticalMin;if(b.verticalMax!==undefined)this.verticalMax=b.verticalMax;if(b.domElement!==undefined)this.domElement=b.domElement}this.theta=this.phi=this.lon=this.lat=this.mouseY=this.mouseX=this.autoSpeedFactor=0;this.moveForward=!1;this.moveBackward=!1;this.moveLeft=!1;this.moveRight=!1;this.freeze=!1;this.mouseDragOn=!1;this.windowHalfX=window.innerWidth/2;this.windowHalfY=
window.innerHeight/2;this.onMouseDown=function(c){c.preventDefault();c.stopPropagation();if(this.activeLook)switch(c.button){case 0:this.moveForward=!0;break;case 2:this.moveBackward=!0}this.mouseDragOn=!0};this.onMouseUp=function(c){c.preventDefault();c.stopPropagation();if(this.activeLook)switch(c.button){case 0:this.moveForward=!1;break;case 2:this.moveBackward=!1}this.mouseDragOn=!1};this.onMouseMove=function(c){this.mouseX=c.clientX-this.windowHalfX;this.mouseY=c.clientY-this.windowHalfY};this.onKeyDown=
function(c){switch(c.keyCode){case 38:case 87:this.moveForward=!0;break;case 37:case 65:this.moveLeft=!0;break;case 40:case 83:this.moveBackward=!0;break;case 39:case 68:this.moveRight=!0;break;case 81:this.freeze=!this.freeze}};this.onKeyUp=function(c){switch(c.keyCode){case 38:case 87:this.moveForward=!1;break;case 37:case 65:this.moveLeft=!1;break;case 40:case 83:this.moveBackward=!1;break;case 39:case 68:this.moveRight=!1}};this.update=function(){var c=(new Date).getTime();this.tdiff=(c-this.lastUpdate)/
1E3;this.lastUpdate=c;if(!this.freeze){this.autoSpeedFactor=this.heightSpeed?this.tdiff*((this.position.y<this.heightMin?this.heightMin:this.position.y>this.heightMax?this.heightMax:this.position.y)-this.heightMin)*this.heightCoef:0;var f=this.tdiff*this.movementSpeed;(this.moveForward||this.autoForward&&!this.moveBackward)&&this.translateZ(-(f+this.autoSpeedFactor));this.moveBackward&&this.translateZ(f);this.moveLeft&&this.translateX(-f);this.moveRight&&this.translateX(f);f=this.tdiff*this.lookSpeed;
this.activeLook||(f=0);this.lon+=this.mouseX*f;this.lookVertical&&(this.lat-=this.mouseY*f);this.lat=Math.max(-85,Math.min(85,this.lat));this.phi=(90-this.lat)*Math.PI/180;this.theta=this.lon*Math.PI/180;c=this.target.position;var g=this.position;c.x=g.x+100*Math.sin(this.phi)*Math.cos(this.theta);c.y=g.y+100*Math.cos(this.phi);c.z=g.z+100*Math.sin(this.phi)*Math.sin(this.theta)}this.lon+=this.mouseX*f;this.lookVertical&&(this.lat-=this.mouseY*f);this.lat=Math.max(-85,Math.min(85,this.lat));this.phi=
(90-this.lat)*Math.PI/180;this.theta=this.lon*Math.PI/180;if(this.constrainVertical)this.phi=(this.phi-0)*(this.verticalMax-this.verticalMin)/3.14+this.verticalMin;c=this.target.position;g=this.position;c.x=g.x+100*Math.sin(this.phi)*Math.cos(this.theta);c.y=g.y+100*Math.cos(this.phi);c.z=g.z+100*Math.sin(this.phi)*Math.sin(this.theta);this.supr.update.call(this)};this.domElement.addEventListener("contextmenu",function(c){c.preventDefault()},!1);this.domElement.addEventListener("mousemove",d(this,
this.onMouseMove),!1);this.domElement.addEventListener("mousedown",d(this,this.onMouseDown),!1);this.domElement.addEventListener("mouseup",d(this,this.onMouseUp),!1);this.domElement.addEventListener("keydown",d(this,this.onKeyDown),!1);this.domElement.addEventListener("keyup",d(this,this.onKeyUp),!1)};THREE.QuakeCamera.prototype=new THREE.Camera;THREE.QuakeCamera.prototype.constructor=THREE.QuakeCamera;THREE.QuakeCamera.prototype.supr=THREE.Camera.prototype;
THREE.QuakeCamera.prototype.translate=function(b,d){this.matrix.rotateAxis(d);if(this.noFly)d.y=0;this.position.addSelf(d.multiplyScalar(b));this.target.position.addSelf(d.multiplyScalar(b))};
THREE.PathCamera=function(b){function d(o,t,u,w){var p={name:u,fps:0.6,length:w,hierarchy:[]},z,G=t.getControlPointsArray(),F=t.getLength(),B=G.length,T=0;z=B-1;t={parent:-1,keys:[]};t.keys[0]={time:0,pos:G[0],rot:[0,0,0,1],scl:[1,1,1]};t.keys[z]={time:w,pos:G[z],rot:[0,0,0,1],scl:[1,1,1]};for(z=1;z<B-1;z++){T=w*F.chunks[z]/F.total;t.keys[z]={time:T,pos:G[z]}}p.hierarchy[0]=t;THREE.AnimationHandler.add(p);return new THREE.Animation(o,u,THREE.AnimationHandler.CATMULLROM_FORWARD,!1)}function c(o,t){var u,
w,p=new THREE.Geometry;for(u=0;u<o.points.length*t;u++){w=u/(o.points.length*t);w=o.getPoint(w);p.vertices[u]=new THREE.Vertex(new THREE.Vector3(w.x,w.y,w.z))}return p}function f(o,t){var u=c(t,10),w=c(t,10),p=new THREE.LineBasicMaterial({color:16711680,linewidth:3});lineObj=new THREE.Line(u,p);particleObj=new THREE.ParticleSystem(w,new THREE.ParticleBasicMaterial({color:16755200,size:3}));lineObj.scale.set(1,1,1);o.addChild(lineObj);particleObj.scale.set(1,1,1);o.addChild(particleObj);w=new THREE.Sphere(1,
16,8);p=new THREE.MeshBasicMaterial({color:65280});for(i=0;i<t.points.length;i++){u=new THREE.Mesh(w,p);u.position.copy(t.points[i]);u.updateMatrix();o.addChild(u)}}THREE.Camera.call(this,b.fov,b.aspect,b.near,b.far,b.target);this.id="PathCamera"+THREE.PathCameraIdCounter++;this.duration=1E4;this.waypoints=[];this.useConstantSpeed=!0;this.resamplingCoef=50;this.debugPath=new THREE.Object3D;this.debugDummy=new THREE.Object3D;this.animationParent=new THREE.Object3D;this.lookSpeed=0.005;this.lookVertical=
!0;this.lookHorizontal=!0;this.verticalAngleMap={srcRange:[0,6.28],dstRange:[0,6.28]};this.horizontalAngleMap={srcRange:[0,6.28],dstRange:[0,6.28]};this.domElement=document;if(b){if(b.duration!==undefined)this.duration=b.duration*1E3;if(b.waypoints!==undefined)this.waypoints=b.waypoints;if(b.useConstantSpeed!==undefined)this.useConstantSpeed=b.useConstantSpeed;if(b.resamplingCoef!==undefined)this.resamplingCoef=b.resamplingCoef;if(b.createDebugPath!==undefined)this.createDebugPath=b.createDebugPath;
if(b.createDebugDummy!==undefined)this.createDebugDummy=b.createDebugDummy;if(b.lookSpeed!==undefined)this.lookSpeed=b.lookSpeed;if(b.lookVertical!==undefined)this.lookVertical=b.lookVertical;if(b.lookHorizontal!==undefined)this.lookHorizontal=b.lookHorizontal;if(b.verticalAngleMap!==undefined)this.verticalAngleMap=b.verticalAngleMap;if(b.horizontalAngleMap!==undefined)this.horizontalAngleMap=b.horizontalAngleMap;if(b.domElement!==undefined)this.domElement=b.domElement}this.theta=this.phi=this.lon=
this.lat=this.mouseY=this.mouseX=0;this.windowHalfX=window.innerWidth/2;this.windowHalfY=window.innerHeight/2;var g=Math.PI*2,h=Math.PI/180;this.update=function(o,t,u){var w,p;this.lookHorizontal&&(this.lon+=this.mouseX*this.lookSpeed);this.lookVertical&&(this.lat-=this.mouseY*this.lookSpeed);this.lon=Math.max(0,Math.min(360,this.lon));this.lat=Math.max(-85,Math.min(85,this.lat));this.phi=(90-this.lat)*h;this.theta=this.lon*h;w=this.phi%g;this.phi=w>=0?w:w+g;w=this.verticalAngleMap.srcRange;p=this.verticalAngleMap.dstRange;
this.phi=(this.phi-w[0])*(p[1]-p[0])/(w[1]-w[0])+p[0];w=this.horizontalAngleMap.srcRange;p=this.horizontalAngleMap.dstRange;this.theta=(this.theta-w[0])*(p[1]-p[0])/(w[1]-w[0])+p[0];w=this.target.position;w.x=100*Math.sin(this.phi)*Math.cos(this.theta);w.y=100*Math.cos(this.phi);w.z=100*Math.sin(this.phi)*Math.sin(this.theta);this.supr.update.call(this,o,t,u)};this.onMouseMove=function(o){this.mouseX=o.clientX-this.windowHalfX;this.mouseY=o.clientY-this.windowHalfY};this.spline=new THREE.Spline;this.spline.initFromArray(this.waypoints);
this.useConstantSpeed&&this.spline.reparametrizeByArcLength(this.resamplingCoef);if(this.createDebugDummy){b=new THREE.MeshLambertMaterial({color:30719});var j=new THREE.MeshLambertMaterial({color:65280}),k=new THREE.Cube(10,10,20),m=new THREE.Cube(2,2,10);this.animationParent=new THREE.Mesh(k,b);b=new THREE.Mesh(m,j);b.position.set(0,10,0);this.animation=d(this.animationParent,this.spline,this.id,this.duration);this.animationParent.addChild(this);this.animationParent.addChild(this.target);this.animationParent.addChild(b)}else{this.animation=
d(this.animationParent,this.spline,this.id,this.duration);this.animationParent.addChild(this.target);this.animationParent.addChild(this)}this.createDebugPath&&f(this.debugPath,this.spline);this.domElement.addEventListener("mousemove",function(o,t){return function(){t.apply(o,arguments)}}(this,this.onMouseMove),!1)};THREE.PathCamera.prototype=new THREE.Camera;THREE.PathCamera.prototype.constructor=THREE.PathCamera;THREE.PathCamera.prototype.supr=THREE.Camera.prototype;THREE.PathCameraIdCounter=0;
THREE.FlyCamera=function(b){function d(c,f){return function(){f.apply(c,arguments)}}THREE.Camera.call(this,b.fov,b.aspect,b.near,b.far,b.target);this.tmpQuaternion=new THREE.Quaternion;this.movementSpeed=1;this.rollSpeed=0.005;this.dragToLook=!1;this.autoForward=!1;this.domElement=document;if(b){if(b.movementSpeed!==undefined)this.movementSpeed=b.movementSpeed;if(b.rollSpeed!==undefined)this.rollSpeed=b.rollSpeed;if(b.dragToLook!==undefined)this.dragToLook=b.dragToLook;if(b.autoForward!==undefined)this.autoForward=
b.autoForward;if(b.domElement!==undefined)this.domElement=b.domElement}this.useTarget=!1;this.useQuaternion=!0;this.mouseStatus=0;this.moveState={up:0,down:0,left:0,right:0,forward:0,back:0,pitchUp:0,pitchDown:0,yawLeft:0,yawRight:0,rollLeft:0,rollRight:0};this.moveVector=new THREE.Vector3(0,0,0);this.rotationVector=new THREE.Vector3(0,0,0);this.lastUpdate=-1;this.tdiff=0;this.handleEvent=function(c){if(typeof this[c.type]=="function")this[c.type](c)};this.keydown=function(c){if(!c.altKey){switch(c.keyCode){case 16:this.movementSpeedMultiplier=
0.1;break;case 87:this.moveState.forward=1;break;case 83:this.moveState.back=1;break;case 65:this.moveState.left=1;break;case 68:this.moveState.right=1;break;case 82:this.moveState.up=1;break;case 70:this.moveState.down=1;break;case 38:this.moveState.pitchUp=1;break;case 40:this.moveState.pitchDown=1;break;case 37:this.moveState.yawLeft=1;break;case 39:this.moveState.yawRight=1;break;case 81:this.moveState.rollLeft=1;break;case 69:this.moveState.rollRight=1}this.updateMovementVector();this.updateRotationVector()}};
this.keyup=function(c){switch(c.keyCode){case 16:this.movementSpeedMultiplier=1;break;case 87:this.moveState.forward=0;break;case 83:this.moveState.back=0;break;case 65:this.moveState.left=0;break;case 68:this.moveState.right=0;break;case 82:this.moveState.up=0;break;case 70:this.moveState.down=0;break;case 38:this.moveState.pitchUp=0;break;case 40:this.moveState.pitchDown=0;break;case 37:this.moveState.yawLeft=0;break;case 39:this.moveState.yawRight=0;break;case 81:this.moveState.rollLeft=0;break;
case 69:this.moveState.rollRight=0}this.updateMovementVector();this.updateRotationVector()};this.mousedown=function(c){c.preventDefault();c.stopPropagation();if(this.dragToLook)this.mouseStatus++;else switch(c.button){case 0:this.moveForward=!0;break;case 2:this.moveBackward=!0}};this.mousemove=function(c){if(!this.dragToLook||this.mouseStatus>0){var f=this.getContainerDimensions(),g=f.size[0]/2,h=f.size[1]/2;this.moveState.yawLeft=-(c.clientX-f.offset[0]-g)/g;this.moveState.pitchDown=(c.clientY-
f.offset[1]-h)/h;this.updateRotationVector()}};this.mouseup=function(c){c.preventDefault();c.stopPropagation();if(this.dragToLook){this.mouseStatus--;this.moveState.yawLeft=this.moveState.pitchDown=0}else switch(c.button){case 0:this.moveForward=!1;break;case 2:this.moveBackward=!1}this.updateRotationVector()};this.update=function(){var c=(new Date).getTime();if(this.lastUpdate==-1)this.lastUpdate=c;this.tdiff=(c-this.lastUpdate)/1E3;this.lastUpdate=c;c=this.tdiff*this.movementSpeed;var f=this.tdiff*
this.rollSpeed;this.translateX(this.moveVector.x*c);this.translateY(this.moveVector.y*c);this.translateZ(this.moveVector.z*c);this.tmpQuaternion.set(this.rotationVector.x*f,this.rotationVector.y*f,this.rotationVector.z*f,1).normalize();this.quaternion.multiplySelf(this.tmpQuaternion);this.matrix.setPosition(this.position);this.matrix.setRotationFromQuaternion(this.quaternion);this.matrixWorldNeedsUpdate=!0;this.supr.update.call(this)};this.updateMovementVector=function(){var c=this.moveState.forward||
this.autoForward&&!this.moveState.back?1:0;this.moveVector.x=-this.moveState.left+this.moveState.right;this.moveVector.y=-this.moveState.down+this.moveState.up;this.moveVector.z=-c+this.moveState.back};this.updateRotationVector=function(){this.rotationVector.x=-this.moveState.pitchDown+this.moveState.pitchUp;this.rotationVector.y=-this.moveState.yawRight+this.moveState.yawLeft;this.rotationVector.z=-this.moveState.rollRight+this.moveState.rollLeft};this.getContainerDimensions=function(){return this.domElement!=
document?{size:[this.domElement.offsetWidth,this.domElement.offsetHeight],offset:[this.domElement.offsetLeft,this.domElement.offsetTop]}:{size:[window.innerWidth,window.innerHeight],offset:[0,0]}};this.domElement.addEventListener("mousemove",d(this,this.mousemove),!1);this.domElement.addEventListener("mousedown",d(this,this.mousedown),!1);this.domElement.addEventListener("mouseup",d(this,this.mouseup),!1);window.addEventListener("keydown",d(this,this.keydown),!1);window.addEventListener("keyup",d(this,
this.keyup),!1);this.updateMovementVector();this.updateRotationVector()};THREE.FlyCamera.prototype=new THREE.Camera;THREE.FlyCamera.prototype.constructor=THREE.FlyCamera;THREE.FlyCamera.prototype.supr=THREE.Camera.prototype;
THREE.RollCamera=function(b,d,c,f){THREE.Camera.call(this,b,d,c,f);this.mouseLook=!0;this.autoForward=!1;this.rollSpeed=this.movementSpeed=this.lookSpeed=1;this.constrainVertical=[-0.9,0.9];this.domElement=document;this.useTarget=!1;this.matrixAutoUpdate=!1;this.forward=new THREE.Vector3(0,0,1);this.roll=0;this.lastUpdate=-1;this.delta=0;var g=new THREE.Vector3,h=new THREE.Vector3,j=new THREE.Vector3,k=new THREE.Matrix4,m=!1,o=1,t=0,u=0,w=0,p=0,z=0,G=window.innerWidth/2,F=window.innerHeight/2;this.update=
function(){var B=(new Date).getTime();if(this.lastUpdate==-1)this.lastUpdate=B;this.delta=(B-this.lastUpdate)/1E3;this.lastUpdate=B;if(this.mouseLook){B=this.delta*this.lookSpeed;this.rotateHorizontally(B*p);this.rotateVertically(B*z)}B=this.delta*this.movementSpeed;this.translateZ(B*(t>0||this.autoForward&&!(t<0)?1:t));this.translateX(B*u);this.translateY(B*w);m&&(this.roll+=this.rollSpeed*this.delta*o);if(this.forward.y>this.constrainVertical[1]){this.forward.y=this.constrainVertical[1];this.forward.normalize()}else if(this.forward.y<
this.constrainVertical[0]){this.forward.y=this.constrainVertical[0];this.forward.normalize()}j.copy(this.forward);h.set(0,1,0);g.cross(h,j).normalize();h.cross(j,g).normalize();this.matrix.n11=g.x;this.matrix.n12=h.x;this.matrix.n13=j.x;this.matrix.n21=g.y;this.matrix.n22=h.y;this.matrix.n23=j.y;this.matrix.n31=g.z;this.matrix.n32=h.z;this.matrix.n33=j.z;k.identity();k.n11=Math.cos(this.roll);k.n12=-Math.sin(this.roll);k.n21=Math.sin(this.roll);k.n22=Math.cos(this.roll);this.matrix.multiplySelf(k);
this.matrixWorldNeedsUpdate=!0;this.matrix.n14=this.position.x;this.matrix.n24=this.position.y;this.matrix.n34=this.position.z;this.supr.update.call(this)};this.translateX=function(B){this.position.x+=this.matrix.n11*B;this.position.y+=this.matrix.n21*B;this.position.z+=this.matrix.n31*B};this.translateY=function(B){this.position.x+=this.matrix.n12*B;this.position.y+=this.matrix.n22*B;this.position.z+=this.matrix.n32*B};this.translateZ=function(B){this.position.x-=this.matrix.n13*B;this.position.y-=
this.matrix.n23*B;this.position.z-=this.matrix.n33*B};this.rotateHorizontally=function(B){g.set(this.matrix.n11,this.matrix.n21,this.matrix.n31);g.multiplyScalar(B);this.forward.subSelf(g);this.forward.normalize()};this.rotateVertically=function(B){h.set(this.matrix.n12,this.matrix.n22,this.matrix.n32);h.multiplyScalar(B);this.forward.addSelf(h);this.forward.normalize()};this.domElement.addEventListener("contextmenu",function(B){B.preventDefault()},!1);this.domElement.addEventListener("mousemove",
function(B){p=(B.clientX-G)/window.innerWidth;z=(B.clientY-F)/window.innerHeight},!1);this.domElement.addEventListener("mousedown",function(B){B.preventDefault();B.stopPropagation();switch(B.button){case 0:t=1;break;case 2:t=-1}},!1);this.domElement.addEventListener("mouseup",function(B){B.preventDefault();B.stopPropagation();switch(B.button){case 0:t=0;break;case 2:t=0}},!1);this.domElement.addEventListener("keydown",function(B){switch(B.keyCode){case 38:case 87:t=1;break;case 37:case 65:u=-1;break;
case 40:case 83:t=-1;break;case 39:case 68:u=1;break;case 81:m=!0;o=1;break;case 69:m=!0;o=-1;break;case 82:w=1;break;case 70:w=-1}},!1);this.domElement.addEventListener("keyup",function(B){switch(B.keyCode){case 38:case 87:t=0;break;case 37:case 65:u=0;break;case 40:case 83:t=0;break;case 39:case 68:u=0;break;case 81:m=!1;break;case 69:m=!1;break;case 82:w=0;break;case 70:w=0}},!1)};THREE.RollCamera.prototype=new THREE.Camera;THREE.RollCamera.prototype.constructor=THREE.RollCamera;
THREE.RollCamera.prototype.supr=THREE.Camera.prototype;
THREE.Cube=function(b,d,c,f,g,h,j,k,m){function o(F,B,T,C,V,P,Q,ka){var ea,pa,aa=f||1,oa=g||1,e=V/2,xa=P/2,sa=t.vertices.length;if(F=="x"&&B=="y"||F=="y"&&B=="x")ea="z";else if(F=="x"&&B=="z"||F=="z"&&B=="x"){ea="y";oa=h||1}else if(F=="z"&&B=="y"||F=="y"&&B=="z"){ea="x";aa=h||1}var Ba=aa+1,ga=oa+1;V/=aa;var ra=P/oa;for(pa=0;pa<ga;pa++)for(P=0;P<Ba;P++){var fa=new THREE.Vector3;fa[F]=(P*V-e)*T;fa[B]=(pa*ra-xa)*C;fa[ea]=Q;t.vertices.push(new THREE.Vertex(fa))}for(pa=0;pa<oa;pa++)for(P=0;P<aa;P++){t.faces.push(new THREE.Face4(P+
Ba*pa+sa,P+Ba*(pa+1)+sa,P+1+Ba*(pa+1)+sa,P+1+Ba*pa+sa,null,null,ka));t.faceVertexUvs[0].push([new THREE.UV(P/aa,pa/oa),new THREE.UV(P/aa,(pa+1)/oa),new THREE.UV((P+1)/aa,(pa+1)/oa),new THREE.UV((P+1)/aa,pa/oa)])}}THREE.Geometry.call(this);var t=this,u=b/2,w=d/2,p=c/2;k=k?-1:1;if(j!==undefined)if(j instanceof Array)this.materials=j;else{this.materials=[];for(var z=0;z<6;z++)this.materials.push([j])}else this.materials=[];this.sides={px:!0,nx:!0,py:!0,ny:!0,pz:!0,nz:!0};if(m!=undefined)for(var G in m)this.sides[G]!=
undefined&&(this.sides[G]=m[G]);this.sides.px&&o("z","y",1*k,-1,c,d,-u,this.materials[0]);this.sides.nx&&o("z","y",-1*k,-1,c,d,u,this.materials[1]);this.sides.py&&o("x","z",1*k,1,b,c,w,this.materials[2]);this.sides.ny&&o("x","z",1*k,-1,b,c,-w,this.materials[3]);this.sides.pz&&o("x","y",1*k,-1,b,d,p,this.materials[4]);this.sides.nz&&o("x","y",-1*k,-1,b,d,-p,this.materials[5]);(function(){for(var F=[],B=[],T=0,C=t.vertices.length;T<C;T++){for(var V=t.vertices[T],P=!1,Q=0,ka=F.length;Q<ka;Q++){var ea=
F[Q];if(V.position.x==ea.position.x&&V.position.y==ea.position.y&&V.position.z==ea.position.z){B[T]=Q;P=!0;break}}if(!P){B[T]=F.length;F.push(new THREE.Vertex(V.position.clone()))}}T=0;for(C=t.faces.length;T<C;T++){V=t.faces[T];V.a=B[V.a];V.b=B[V.b];V.c=B[V.c];V.d=B[V.d]}t.vertices=F})();this.computeCentroids();this.computeFaceNormals()};THREE.Cube.prototype=new THREE.Geometry;THREE.Cube.prototype.constructor=THREE.Cube;
THREE.Cylinder=function(b,d,c,f,g,h){function j(w,p,z){k.vertices.push(new THREE.Vertex(new THREE.Vector3(w,p,z)))}THREE.Geometry.call(this);var k=this,m,o=Math.PI*2,t=f/2;for(m=0;m<b;m++)j(Math.sin(o*m/b)*d,Math.cos(o*m/b)*d,-t);for(m=0;m<b;m++)j(Math.sin(o*m/b)*c,Math.cos(o*m/b)*c,t);for(m=0;m<b;m++)k.faces.push(new THREE.Face4(m,m+b,b+(m+1)%b,(m+1)%b));if(c>0){j(0,0,-t-(h||0));for(m=b;m<b+b/2;m++)k.faces.push(new THREE.Face4(2*b,(2*m-2*b)%b,(2*m-2*b+1)%b,(2*m-2*b+2)%b))}if(d>0){j(0,0,t+(g||0));
for(m=b+b/2;m<2*b;m++)k.faces.push(new THREE.Face4(2*b+1,(2*m-2*b+2)%b+b,(2*m-2*b+1)%b+b,(2*m-2*b)%b+b))}m=0;for(b=this.faces.length;m<b;m++){d=[];c=this.faces[m];g=this.vertices[c.a];h=this.vertices[c.b];t=this.vertices[c.c];var u=this.vertices[c.d];d.push(new THREE.UV(0.5+Math.atan2(g.position.x,g.position.y)/o,0.5+g.position.z/f));d.push(new THREE.UV(0.5+Math.atan2(h.position.x,h.position.y)/o,0.5+h.position.z/f));d.push(new THREE.UV(0.5+Math.atan2(t.position.x,t.position.y)/o,0.5+t.position.z/
f));c instanceof THREE.Face4&&d.push(new THREE.UV(0.5+Math.atan2(u.position.x,u.position.y)/o,0.5+u.position.z/f));this.faceVertexUvs[0].push(d)}this.computeCentroids();this.computeFaceNormals()};THREE.Cylinder.prototype=new THREE.Geometry;THREE.Cylinder.prototype.constructor=THREE.Cylinder;
THREE.Icosahedron=function(b){function d(u,w,p){var z=Math.sqrt(u*u+w*w+p*p);return g.vertices.push(new THREE.Vertex(new THREE.Vector3(u/z,w/z,p/z)))-1}function c(u,w,p,z){z.faces.push(new THREE.Face3(u,w,p))}function f(u,w){var p=g.vertices[u].position,z=g.vertices[w].position;return d((p.x+z.x)/2,(p.y+z.y)/2,(p.z+z.z)/2)}var g=this,h=new THREE.Geometry,j;this.subdivisions=b||0;THREE.Geometry.call(this);b=(1+Math.sqrt(5))/2;d(-1,b,0);d(1,b,0);d(-1,-b,0);d(1,-b,0);d(0,-1,b);d(0,1,b);d(0,-1,-b);d(0,
1,-b);d(b,0,-1);d(b,0,1);d(-b,0,-1);d(-b,0,1);c(0,11,5,h);c(0,5,1,h);c(0,1,7,h);c(0,7,10,h);c(0,10,11,h);c(1,5,9,h);c(5,11,4,h);c(11,10,2,h);c(10,7,6,h);c(7,1,8,h);c(3,9,4,h);c(3,4,2,h);c(3,2,6,h);c(3,6,8,h);c(3,8,9,h);c(4,9,5,h);c(2,4,11,h);c(6,2,10,h);c(8,6,7,h);c(9,8,1,h);for(b=0;b<this.subdivisions;b++){j=new THREE.Geometry;for(var k in h.faces){var m=f(h.faces[k].a,h.faces[k].b),o=f(h.faces[k].b,h.faces[k].c),t=f(h.faces[k].c,h.faces[k].a);c(h.faces[k].a,m,t,j);c(h.faces[k].b,o,m,j);c(h.faces[k].c,
t,o,j);c(m,o,t,j)}h.faces=j.faces}g.faces=h.faces;delete h;delete j;this.computeCentroids();this.computeFaceNormals();this.computeVertexNormals()};THREE.Icosahedron.prototype=new THREE.Geometry;THREE.Icosahedron.prototype.constructor=THREE.Icosahedron;
THREE.Lathe=function(b,d,c){THREE.Geometry.call(this);this.steps=d||12;this.angle=c||2*Math.PI;d=this.angle/this.steps;c=[];for(var f=[],g=[],h=[],j=(new THREE.Matrix4).setRotationZ(d),k=0;k<b.length;k++){this.vertices.push(new THREE.Vertex(b[k]));c[k]=b[k].clone();f[k]=this.vertices.length-1}for(var m=0;m<=this.angle+0.001;m+=d){for(k=0;k<c.length;k++)if(m<this.angle){c[k]=j.multiplyVector3(c[k].clone());this.vertices.push(new THREE.Vertex(c[k]));g[k]=this.vertices.length-1}else g=h;m==0&&(h=f);
for(k=0;k<f.length-1;k++){this.faces.push(new THREE.Face4(g[k],g[k+1],f[k+1],f[k]));this.faceVertexUvs[0].push([new THREE.UV(1-m/this.angle,k/b.length),new THREE.UV(1-m/this.angle,(k+1)/b.length),new THREE.UV(1-(m-d)/this.angle,(k+1)/b.length),new THREE.UV(1-(m-d)/this.angle,k/b.length)])}f=g;g=[]}this.computeCentroids();this.computeFaceNormals();this.computeVertexNormals()};THREE.Lathe.prototype=new THREE.Geometry;THREE.Lathe.prototype.constructor=THREE.Lathe;
THREE.Plane=function(b,d,c,f){THREE.Geometry.call(this);var g,h=b/2,j=d/2;c=c||1;f=f||1;var k=c+1,m=f+1;b/=c;var o=d/f;for(g=0;g<m;g++)for(d=0;d<k;d++)this.vertices.push(new THREE.Vertex(new THREE.Vector3(d*b-h,-(g*o-j),0)));for(g=0;g<f;g++)for(d=0;d<c;d++){this.faces.push(new THREE.Face4(d+k*g,d+k*(g+1),d+1+k*(g+1),d+1+k*g));this.faceVertexUvs[0].push([new THREE.UV(d/c,g/f),new THREE.UV(d/c,(g+1)/f),new THREE.UV((d+1)/c,(g+1)/f),new THREE.UV((d+1)/c,g/f)])}this.computeCentroids();this.computeFaceNormals()};
THREE.Plane.prototype=new THREE.Geometry;THREE.Plane.prototype.constructor=THREE.Plane;
THREE.Sphere=function(b,d,c){THREE.Geometry.call(this);var f,g=Math.PI,h=Math.max(3,d||8),j=Math.max(2,c||6);d=[];for(c=0;c<j+1;c++){f=c/j;var k=b*Math.cos(f*g),m=b*Math.sin(f*g),o=[],t=0;for(f=0;f<h;f++){var u=2*f/h,w=m*Math.sin(u*g);u=m*Math.cos(u*g);(c==0||c==j)&&f>0||(t=this.vertices.push(new THREE.Vertex(new THREE.Vector3(u,k,w)))-1);o.push(t)}d.push(o)}var p,z,G;g=d.length;for(c=0;c<g;c++){h=d[c].length;if(c>0)for(f=0;f<h;f++){o=f==h-1;j=d[c][o?0:f+1];k=d[c][o?h-1:f];m=d[c-1][o?h-1:f];o=d[c-
1][o?0:f+1];w=c/(g-1);p=(c-1)/(g-1);z=(f+1)/h;u=f/h;t=new THREE.UV(1-z,w);w=new THREE.UV(1-u,w);u=new THREE.UV(1-u,p);var F=new THREE.UV(1-z,p);if(c<d.length-1){p=this.vertices[j].position.clone();z=this.vertices[k].position.clone();G=this.vertices[m].position.clone();p.normalize();z.normalize();G.normalize();this.faces.push(new THREE.Face3(j,k,m,[new THREE.Vector3(p.x,p.y,p.z),new THREE.Vector3(z.x,z.y,z.z),new THREE.Vector3(G.x,G.y,G.z)]));this.faceVertexUvs[0].push([t,w,u])}if(c>1){p=this.vertices[j].position.clone();
z=this.vertices[m].position.clone();G=this.vertices[o].position.clone();p.normalize();z.normalize();G.normalize();this.faces.push(new THREE.Face3(j,m,o,[new THREE.Vector3(p.x,p.y,p.z),new THREE.Vector3(z.x,z.y,z.z),new THREE.Vector3(G.x,G.y,G.z)]));this.faceVertexUvs[0].push([t,u,F])}}}this.computeCentroids();this.computeFaceNormals();this.computeVertexNormals();this.boundingSphere={radius:b}};THREE.Sphere.prototype=new THREE.Geometry;THREE.Sphere.prototype.constructor=THREE.Sphere;
THREE.Torus=function(b,d,c,f){THREE.Geometry.call(this);this.radius=b||100;this.tube=d||40;this.segmentsR=c||8;this.segmentsT=f||6;b=[];for(d=0;d<=this.segmentsR;++d)for(c=0;c<=this.segmentsT;++c){f=c/this.segmentsT*2*Math.PI;var g=d/this.segmentsR*2*Math.PI;this.vertices.push(new THREE.Vertex(new THREE.Vector3((this.radius+this.tube*Math.cos(g))*Math.cos(f),(this.radius+this.tube*Math.cos(g))*Math.sin(f),this.tube*Math.sin(g))));b.push([c/this.segmentsT,1-d/this.segmentsR])}for(d=1;d<=this.segmentsR;++d)for(c=
1;c<=this.segmentsT;++c){f=(this.segmentsT+1)*d+c;g=(this.segmentsT+1)*d+c-1;var h=(this.segmentsT+1)*(d-1)+c-1,j=(this.segmentsT+1)*(d-1)+c;this.faces.push(new THREE.Face4(f,g,h,j));this.faceVertexUvs[0].push([new THREE.UV(b[f][0],b[f][1]),new THREE.UV(b[g][0],b[g][1]),new THREE.UV(b[h][0],b[h][1]),new THREE.UV(b[j][0],b[j][1])])}delete b;this.computeCentroids();this.computeFaceNormals();this.computeVertexNormals()};THREE.Torus.prototype=new THREE.Geometry;THREE.Torus.prototype.constructor=THREE.Torus;
THREE.TorusKnot=function(b,d,c,f,g,h,j){function k(u,w,p,z,G,F){w=p/z*u;p=Math.cos(w);return new THREE.Vector3(G*(2+p)*0.5*Math.cos(u),G*(2+p)*Math.sin(u)*0.5,F*G*Math.sin(w)*0.5)}THREE.Geometry.call(this);this.radius=b||200;this.tube=d||40;this.segmentsR=c||64;this.segmentsT=f||8;this.p=g||2;this.q=h||3;this.heightScale=j||1;this.grid=Array(this.segmentsR);c=new THREE.Vector3;f=new THREE.Vector3;h=new THREE.Vector3;for(b=0;b<this.segmentsR;++b){this.grid[b]=Array(this.segmentsT);for(d=0;d<this.segmentsT;++d){var m=
b/this.segmentsR*2*this.p*Math.PI;j=d/this.segmentsT*2*Math.PI;g=k(m,j,this.q,this.p,this.radius,this.heightScale);m=k(m+0.01,j,this.q,this.p,this.radius,this.heightScale);c.x=m.x-g.x;c.y=m.y-g.y;c.z=m.z-g.z;f.x=m.x+g.x;f.y=m.y+g.y;f.z=m.z+g.z;h.cross(c,f);f.cross(h,c);h.normalize();f.normalize();m=-this.tube*Math.cos(j);j=this.tube*Math.sin(j);g.x+=m*f.x+j*h.x;g.y+=m*f.y+j*h.y;g.z+=m*f.z+j*h.z;this.grid[b][d]=this.vertices.push(new THREE.Vertex(new THREE.Vector3(g.x,g.y,g.z)))-1}}for(b=0;b<this.segmentsR;++b)for(d=
0;d<this.segmentsT;++d){f=(b+1)%this.segmentsR;h=(d+1)%this.segmentsT;g=this.grid[b][d];c=this.grid[f][d];f=this.grid[f][h];h=this.grid[b][h];j=new THREE.UV(b/this.segmentsR,d/this.segmentsT);m=new THREE.UV((b+1)/this.segmentsR,d/this.segmentsT);var o=new THREE.UV((b+1)/this.segmentsR,(d+1)/this.segmentsT),t=new THREE.UV(b/this.segmentsR,(d+1)/this.segmentsT);this.faces.push(new THREE.Face4(g,c,f,h));this.faceVertexUvs[0].push([j,m,o,t])}this.computeCentroids();this.computeFaceNormals();this.computeVertexNormals()};
THREE.TorusKnot.prototype=new THREE.Geometry;THREE.TorusKnot.prototype.constructor=THREE.TorusKnot;THREE.Loader=function(b){this.statusDomElement=(this.showStatus=b)?THREE.Loader.prototype.addStatusElement():null;this.onLoadStart=function(){};this.onLoadProgress=function(){};this.onLoadComplete=function(){}};
THREE.Loader.prototype={addStatusElement:function(){var b=document.createElement("div");b.style.position="absolute";b.style.right="0px";b.style.top="0px";b.style.fontSize="0.8em";b.style.textAlign="left";b.style.background="rgba(0,0,0,0.25)";b.style.color="#fff";b.style.width="120px";b.style.padding="0.5em 0.5em 0.5em 0.5em";b.style.zIndex=1E3;b.innerHTML="Loading ...";return b},updateProgress:function(b){var d="Loaded ";d+=b.total?(100*b.loaded/b.total).toFixed(0)+"%":(b.loaded/1E3).toFixed(2)+" KB";
this.statusDomElement.innerHTML=d},extractUrlbase:function(b){b=b.split("/");b.pop();return b.join("/")},init_materials:function(b,d,c){b.materials=[];for(var f=0;f<d.length;++f)b.materials[f]=[THREE.Loader.prototype.createMaterial(d[f],c)]},createMaterial:function(b,d){function c(k){k=Math.log(k)/Math.LN2;return Math.floor(k)==k}function f(k,m){var o=new Image;o.onload=function(){if(!c(this.width)||!c(this.height)){var t=Math.pow(2,Math.round(Math.log(this.width)/Math.LN2)),u=Math.pow(2,Math.round(Math.log(this.height)/
Math.LN2));k.image.width=t;k.image.height=u;k.image.getContext("2d").drawImage(this,0,0,t,u)}else k.image=this;k.needsUpdate=!0};o.src=m}var g,h,j;g="MeshLambertMaterial";h={color:15658734,opacity:1,map:null,lightMap:null,wireframe:b.wireframe};if(b.shading)if(b.shading=="Phong")g="MeshPhongMaterial";else b.shading=="Basic"&&(g="MeshBasicMaterial");if(b.blending)if(b.blending=="Additive")h.blending=THREE.AdditiveBlending;else if(b.blending=="Subtractive")h.blending=THREE.SubtractiveBlending;else if(b.blending==
"Multiply")h.blending=THREE.MultiplyBlending;if(b.transparent!==undefined||b.opacity<1)h.transparent=b.transparent;if(b.depthTest!==undefined)h.depthTest=b.depthTest;if(b.vertexColors!==undefined)if(b.vertexColors=="face")h.vertexColors=THREE.FaceColors;else if(b.vertexColors)h.vertexColors=THREE.VertexColors;if(b.mapDiffuse&&d){j=document.createElement("canvas");h.map=new THREE.Texture(j);h.map.sourceFile=b.mapDiffuse;f(h.map,d+"/"+b.mapDiffuse)}else if(b.colorDiffuse){j=(b.colorDiffuse[0]*255<<
16)+(b.colorDiffuse[1]*255<<8)+b.colorDiffuse[2]*255;h.color=j;h.opacity=b.transparency}else if(b.DbgColor)h.color=b.DbgColor;if(b.mapLightmap&&d){j=document.createElement("canvas");h.lightMap=new THREE.Texture(j);h.lightMap.sourceFile=b.mapLightmap;f(h.lightMap,d+"/"+b.mapLightmap)}return new THREE[g](h)}};THREE.JSONLoader=function(b){THREE.Loader.call(this,b)};THREE.JSONLoader.prototype=new THREE.Loader;THREE.JSONLoader.prototype.constructor=THREE.JSONLoader;THREE.JSONLoader.prototype.supr=THREE.Loader.prototype;
THREE.JSONLoader.prototype.load=function(b){var d=this,c=b.model,f=b.callback,g=b.texture_path?b.texture_path:this.extractUrlbase(c);b=new Worker(c);b.onmessage=function(h){d.createModel(h.data,f,g);d.onLoadComplete()};this.onLoadStart();b.postMessage((new Date).getTime())};
THREE.JSONLoader.prototype.createModel=function(b,d,c){var f=new THREE.Geometry,g=b.scale!==undefined?1/b.scale:1;this.init_materials(f,b.materials,c);(function(h){if(b.version===undefined||b.version!=2)console.error("Deprecated file format.");else{var j,k,m,o,t,u,w,p,z,G,F,B,T,C,V=b.faces;u=b.vertices;var P=b.normals,Q=b.colors,ka=0;for(j=0;j<b.uvs.length;j++)b.uvs[j].length&&ka++;for(j=0;j<ka;j++){f.faceUvs[j]=[];f.faceVertexUvs[j]=[]}o=0;for(t=u.length;o<t;){w=new THREE.Vertex;w.position.x=u[o++]*
h;w.position.y=u[o++]*h;w.position.z=u[o++]*h;f.vertices.push(w)}o=0;for(t=V.length;o<t;){h=V[o++];u=h&1;m=h&2;j=h&4;k=h&8;p=h&16;w=h&32;G=h&64;h&=128;if(u){F=new THREE.Face4;F.a=V[o++];F.b=V[o++];F.c=V[o++];F.d=V[o++];u=4}else{F=new THREE.Face3;F.a=V[o++];F.b=V[o++];F.c=V[o++];u=3}if(m){m=V[o++];F.materials=f.materials[m]}m=f.faces.length;if(j)for(j=0;j<ka;j++){B=b.uvs[j];z=V[o++];C=B[z*2];z=B[z*2+1];f.faceUvs[j][m]=new THREE.UV(C,z)}if(k)for(j=0;j<ka;j++){B=b.uvs[j];T=[];for(k=0;k<u;k++){z=V[o++];
C=B[z*2];z=B[z*2+1];T[k]=new THREE.UV(C,z)}f.faceVertexUvs[j][m]=T}if(p){p=V[o++]*3;k=new THREE.Vector3;k.x=P[p++];k.y=P[p++];k.z=P[p];F.normal=k}if(w)for(j=0;j<u;j++){p=V[o++]*3;k=new THREE.Vector3;k.x=P[p++];k.y=P[p++];k.z=P[p];F.vertexNormals.push(k)}if(G){w=V[o++];w=new THREE.Color(Q[w]);F.color=w}if(h)for(j=0;j<u;j++){w=V[o++];w=new THREE.Color(Q[w]);F.vertexColors.push(w)}f.faces.push(F)}}})(g);(function(){var h,j,k,m;if(b.skinWeights){h=0;for(j=b.skinWeights.length;h<j;h+=2){k=b.skinWeights[h];
m=b.skinWeights[h+1];f.skinWeights.push(new THREE.Vector4(k,m,0,0))}}if(b.skinIndices){h=0;for(j=b.skinIndices.length;h<j;h+=2){k=b.skinIndices[h];m=b.skinIndices[h+1];f.skinIndices.push(new THREE.Vector4(k,m,0,0))}}f.bones=b.bones;f.animation=b.animation})();(function(h){if(b.morphTargets!==undefined){var j,k,m,o,t,u,w,p,z;j=0;for(k=b.morphTargets.length;j<k;j++){f.morphTargets[j]={};f.morphTargets[j].name=b.morphTargets[j].name;f.morphTargets[j].vertices=[];p=f.morphTargets[j].vertices;z=b.morphTargets[j].vertices;
m=0;for(o=z.length;m<o;m+=3){t=z[m]*h;u=z[m+1]*h;w=z[m+2]*h;p.push(new THREE.Vertex(new THREE.Vector3(t,u,w)))}}}if(b.morphColors!==undefined){j=0;for(k=b.morphColors.length;j<k;j++){f.morphColors[j]={};f.morphColors[j].name=b.morphColors[j].name;f.morphColors[j].colors=[];o=f.morphColors[j].colors;t=b.morphColors[j].colors;h=0;for(m=t.length;h<m;h+=3){u=new THREE.Color(16755200);u.setRGB(t[h],t[h+1],t[h+2]);o.push(u)}}}})(g);(function(){if(b.edges!==undefined){var h,j,k;for(h=0;h<b.edges.length;h+=
2){j=b.edges[h];k=b.edges[h+1];f.edges.push(new THREE.Edge(f.vertices[j],f.vertices[k],j,k))}}})();f.computeFaceNormals();d(f)};THREE.BinaryLoader=function(b){THREE.Loader.call(this,b)};THREE.BinaryLoader.prototype=new THREE.Loader;THREE.BinaryLoader.prototype.constructor=THREE.BinaryLoader;THREE.BinaryLoader.prototype.supr=THREE.Loader.prototype;
THREE.BinaryLoader.prototype={load:function(b){var d=b.model,c=b.callback,f=b.texture_path?b.texture_path:THREE.Loader.prototype.extractUrlbase(d),g=b.bin_path?b.bin_path:THREE.Loader.prototype.extractUrlbase(d);b=(new Date).getTime();d=new Worker(d);var h=this.showProgress?THREE.Loader.prototype.updateProgress:null;d.onmessage=function(j){THREE.BinaryLoader.prototype.loadAjaxBuffers(j.data.buffers,j.data.materials,c,g,f,h)};d.onerror=function(j){alert("worker.onerror: "+j.message+"\n"+j.data);j.preventDefault()};
d.postMessage(b)},loadAjaxBuffers:function(b,d,c,f,g,h){var j=new XMLHttpRequest,k=f+"/"+b,m=0;j.onreadystatechange=function(){if(j.readyState==4)j.status==200||j.status==0?THREE.BinaryLoader.prototype.createBinModel(j.responseText,c,g,d):alert("Couldn't load ["+k+"] ["+j.status+"]");else if(j.readyState==3){if(h){m==0&&(m=j.getResponseHeader("Content-Length"));h({total:m,loaded:j.responseText.length})}}else j.readyState==2&&(m=j.getResponseHeader("Content-Length"))};j.open("GET",k,!0);j.overrideMimeType("text/plain; charset=x-user-defined");
j.setRequestHeader("Content-Type","text/plain");j.send(null)},createBinModel:function(b,d,c,f){var g=function(h){function j(O,Z){var R=t(O,Z),S=t(O,Z+1),Ma=t(O,Z+2),bb=t(O,Z+3),n=(bb<<1&255|Ma>>7)-127;R|=(Ma&127)<<16|S<<8;if(R==0&&n==-127)return 0;return(1-2*(bb>>7))*(1+R*Math.pow(2,-23))*Math.pow(2,n)}function k(O,Z){var R=t(O,Z),S=t(O,Z+1),Ma=t(O,Z+2);return(t(O,Z+3)<<24)+(Ma<<16)+(S<<8)+R}function m(O,Z){var R=t(O,Z);return(t(O,Z+1)<<8)+R}function o(O,Z){var R=t(O,Z);return R>127?R-256:R}function t(O,
Z){return O.charCodeAt(Z)&255}function u(O){var Z,R,S;Z=k(b,O);R=k(b,O+Q);S=k(b,O+ka);O=m(b,O+ea);THREE.BinaryLoader.prototype.f3(B,Z,R,S,O)}function w(O){var Z,R,S,Ma,bb,n;Z=k(b,O);R=k(b,O+Q);S=k(b,O+ka);Ma=m(b,O+ea);bb=k(b,O+pa);n=k(b,O+aa);O=k(b,O+oa);THREE.BinaryLoader.prototype.f3n(B,V,Z,R,S,Ma,bb,n,O)}function p(O){var Z,R,S,Ma;Z=k(b,O);R=k(b,O+e);S=k(b,O+xa);Ma=k(b,O+sa);O=m(b,O+Ba);THREE.BinaryLoader.prototype.f4(B,Z,R,S,Ma,O)}function z(O){var Z,R,S,Ma,bb,n,D,y;Z=k(b,O);R=k(b,O+e);S=k(b,
O+xa);Ma=k(b,O+sa);bb=m(b,O+Ba);n=k(b,O+ga);D=k(b,O+ra);y=k(b,O+fa);O=k(b,O+za);THREE.BinaryLoader.prototype.f4n(B,V,Z,R,S,Ma,bb,n,D,y,O)}function G(O){var Z,R;Z=k(b,O);R=k(b,O+na);O=k(b,O+ua);THREE.BinaryLoader.prototype.uv3(B.faceVertexUvs[0],P[Z*2],P[Z*2+1],P[R*2],P[R*2+1],P[O*2],P[O*2+1])}function F(O){var Z,R,S;Z=k(b,O);R=k(b,O+qa);S=k(b,O+ja);O=k(b,O+Fa);THREE.BinaryLoader.prototype.uv4(B.faceVertexUvs[0],P[Z*2],P[Z*2+1],P[R*2],P[R*2+1],P[S*2],P[S*2+1],P[O*2],P[O*2+1])}var B=this,T=0,C,V=[],
P=[],Q,ka,ea,pa,aa,oa,e,xa,sa,Ba,ga,ra,fa,za,na,ua,qa,ja,Fa,Aa,ha,va,Ja,Sa,Wa;THREE.Geometry.call(this);THREE.Loader.prototype.init_materials(B,f,h);C={signature:b.substr(T,8),header_bytes:t(b,T+8),vertex_coordinate_bytes:t(b,T+9),normal_coordinate_bytes:t(b,T+10),uv_coordinate_bytes:t(b,T+11),vertex_index_bytes:t(b,T+12),normal_index_bytes:t(b,T+13),uv_index_bytes:t(b,T+14),material_index_bytes:t(b,T+15),nvertices:k(b,T+16),nnormals:k(b,T+16+4),nuvs:k(b,T+16+8),ntri_flat:k(b,T+16+12),ntri_smooth:k(b,
T+16+16),ntri_flat_uv:k(b,T+16+20),ntri_smooth_uv:k(b,T+16+24),nquad_flat:k(b,T+16+28),nquad_smooth:k(b,T+16+32),nquad_flat_uv:k(b,T+16+36),nquad_smooth_uv:k(b,T+16+40)};T+=C.header_bytes;Q=C.vertex_index_bytes;ka=C.vertex_index_bytes*2;ea=C.vertex_index_bytes*3;pa=C.vertex_index_bytes*3+C.material_index_bytes;aa=C.vertex_index_bytes*3+C.material_index_bytes+C.normal_index_bytes;oa=C.vertex_index_bytes*3+C.material_index_bytes+C.normal_index_bytes*2;e=C.vertex_index_bytes;xa=C.vertex_index_bytes*
2;sa=C.vertex_index_bytes*3;Ba=C.vertex_index_bytes*4;ga=C.vertex_index_bytes*4+C.material_index_bytes;ra=C.vertex_index_bytes*4+C.material_index_bytes+C.normal_index_bytes;fa=C.vertex_index_bytes*4+C.material_index_bytes+C.normal_index_bytes*2;za=C.vertex_index_bytes*4+C.material_index_bytes+C.normal_index_bytes*3;na=C.uv_index_bytes;ua=C.uv_index_bytes*2;qa=C.uv_index_bytes;ja=C.uv_index_bytes*2;Fa=C.uv_index_bytes*3;h=C.vertex_index_bytes*3+C.material_index_bytes;Wa=C.vertex_index_bytes*4+C.material_index_bytes;
Aa=C.ntri_flat*h;ha=C.ntri_smooth*(h+C.normal_index_bytes*3);va=C.ntri_flat_uv*(h+C.uv_index_bytes*3);Ja=C.ntri_smooth_uv*(h+C.normal_index_bytes*3+C.uv_index_bytes*3);Sa=C.nquad_flat*Wa;h=C.nquad_smooth*(Wa+C.normal_index_bytes*4);Wa=C.nquad_flat_uv*(Wa+C.uv_index_bytes*4);T+=function(O){for(var Z,R,S,Ma=C.vertex_coordinate_bytes*3,bb=O+C.nvertices*Ma;O<bb;O+=Ma){Z=j(b,O);R=j(b,O+C.vertex_coordinate_bytes);S=j(b,O+C.vertex_coordinate_bytes*2);THREE.BinaryLoader.prototype.v(B,Z,R,S)}return C.nvertices*
Ma}(T);T+=function(O){for(var Z,R,S,Ma=C.normal_coordinate_bytes*3,bb=O+C.nnormals*Ma;O<bb;O+=Ma){Z=o(b,O);R=o(b,O+C.normal_coordinate_bytes);S=o(b,O+C.normal_coordinate_bytes*2);V.push(Z/127,R/127,S/127)}return C.nnormals*Ma}(T);T+=function(O){for(var Z,R,S=C.uv_coordinate_bytes*2,Ma=O+C.nuvs*S;O<Ma;O+=S){Z=j(b,O);R=j(b,O+C.uv_coordinate_bytes);P.push(Z,R)}return C.nuvs*S}(T);Aa=T+Aa;ha=Aa+ha;va=ha+va;Ja=va+Ja;Sa=Ja+Sa;h=Sa+h;Wa=h+Wa;(function(O){var Z,R=C.vertex_index_bytes*3+C.material_index_bytes,
S=R+C.uv_index_bytes*3,Ma=O+C.ntri_flat_uv*S;for(Z=O;Z<Ma;Z+=S){u(Z);G(Z+R)}return Ma-O})(ha);(function(O){var Z,R=C.vertex_index_bytes*3+C.material_index_bytes+C.normal_index_bytes*3,S=R+C.uv_index_bytes*3,Ma=O+C.ntri_smooth_uv*S;for(Z=O;Z<Ma;Z+=S){w(Z);G(Z+R)}return Ma-O})(va);(function(O){var Z,R=C.vertex_index_bytes*4+C.material_index_bytes,S=R+C.uv_index_bytes*4,Ma=O+C.nquad_flat_uv*S;for(Z=O;Z<Ma;Z+=S){p(Z);F(Z+R)}return Ma-O})(h);(function(O){var Z,R=C.vertex_index_bytes*4+C.material_index_bytes+
C.normal_index_bytes*4,S=R+C.uv_index_bytes*4,Ma=O+C.nquad_smooth_uv*S;for(Z=O;Z<Ma;Z+=S){z(Z);F(Z+R)}return Ma-O})(Wa);(function(O){var Z,R=C.vertex_index_bytes*3+C.material_index_bytes,S=O+C.ntri_flat*R;for(Z=O;Z<S;Z+=R)u(Z);return S-O})(T);(function(O){var Z,R=C.vertex_index_bytes*3+C.material_index_bytes+C.normal_index_bytes*3,S=O+C.ntri_smooth*R;for(Z=O;Z<S;Z+=R)w(Z);return S-O})(Aa);(function(O){var Z,R=C.vertex_index_bytes*4+C.material_index_bytes,S=O+C.nquad_flat*R;for(Z=O;Z<S;Z+=R)p(Z);return S-
O})(Ja);(function(O){var Z,R=C.vertex_index_bytes*4+C.material_index_bytes+C.normal_index_bytes*4,S=O+C.nquad_smooth*R;for(Z=O;Z<S;Z+=R)z(Z);return S-O})(Sa);this.computeCentroids();this.computeFaceNormals()};g.prototype=new THREE.Geometry;g.prototype.constructor=g;d(new g(c))},v:function(b,d,c,f){b.vertices.push(new THREE.Vertex(new THREE.Vector3(d,c,f)))},f3:function(b,d,c,f,g){b.faces.push(new THREE.Face3(d,c,f,null,null,b.materials[g]))},f4:function(b,d,c,f,g,h){b.faces.push(new THREE.Face4(d,
c,f,g,null,null,b.materials[h]))},f3n:function(b,d,c,f,g,h,j,k,m){h=b.materials[h];var o=d[k*3],t=d[k*3+1];k=d[k*3+2];var u=d[m*3],w=d[m*3+1];m=d[m*3+2];b.faces.push(new THREE.Face3(c,f,g,[new THREE.Vector3(d[j*3],d[j*3+1],d[j*3+2]),new THREE.Vector3(o,t,k),new THREE.Vector3(u,w,m)],null,h))},f4n:function(b,d,c,f,g,h,j,k,m,o,t){j=b.materials[j];var u=d[m*3],w=d[m*3+1];m=d[m*3+2];var p=d[o*3],z=d[o*3+1];o=d[o*3+2];var G=d[t*3],F=d[t*3+1];t=d[t*3+2];b.faces.push(new THREE.Face4(c,f,g,h,[new THREE.Vector3(d[k*
3],d[k*3+1],d[k*3+2]),new THREE.Vector3(u,w,m),new THREE.Vector3(p,z,o),new THREE.Vector3(G,F,t)],null,j))},uv3:function(b,d,c,f,g,h,j){var k=[];k.push(new THREE.UV(d,c));k.push(new THREE.UV(f,g));k.push(new THREE.UV(h,j));b.push(k)},uv4:function(b,d,c,f,g,h,j,k,m){var o=[];o.push(new THREE.UV(d,c));o.push(new THREE.UV(f,g));o.push(new THREE.UV(h,j));o.push(new THREE.UV(k,m));b.push(o)}};
THREE.SceneLoader=function(){this.onLoadStart=function(){};this.onLoadProgress=function(){};this.onLoadComplete=function(){};this.callbackSync=function(){};this.callbackProgress=function(){}};
THREE.SceneLoader.prototype={load:function(b,d){var c=this,f=new Worker(b);f.postMessage(0);var g=THREE.Loader.prototype.extractUrlbase(b);f.onmessage=function(h){function j(na,ua){return ua=="relativeToHTML"?na:g+"/"+na}function k(){for(p in aa.objects)if(!ga.objects[p]){T=aa.objects[p];if(T.geometry!==undefined){if(Q=ga.geometries[T.geometry]){pa=[];for(za=0;za<T.materials.length;za++)pa[za]=ga.materials[T.materials[za]];C=T.position;r=T.rotation;q=T.quaternion;s=T.scale;q=0;pa.length==0&&(pa[0]=
new THREE.MeshFaceMaterial);pa.length>1&&(pa=[new THREE.MeshFaceMaterial]);object=new THREE.Mesh(Q,pa);object.name=p;object.position.set(C[0],C[1],C[2]);if(q){object.quaternion.set(q[0],q[1],q[2],q[3]);object.useQuaternion=!0}else object.rotation.set(r[0],r[1],r[2]);object.scale.set(s[0],s[1],s[2]);object.visible=T.visible;ga.scene.addObject(object);ga.objects[p]=object;if(T.meshCollider){var na=THREE.CollisionUtils.MeshColliderWBox(object);ga.scene.collisions.colliders.push(na)}if(T.castsShadow){na=
new THREE.ShadowVolume(Q);ga.scene.addChild(na);na.position=object.position;na.rotation=object.rotation;na.scale=object.scale}if(T.trigger&&T.trigger.toLowerCase()!="none"){na={type:T.trigger,object:T};ga.triggers[object.name]=na}}}else{C=T.position;r=T.rotation;q=T.quaternion;s=T.scale;q=0;object=new THREE.Object3D;object.name=p;object.position.set(C[0],C[1],C[2]);if(q){object.quaternion.set(q[0],q[1],q[2],q[3]);object.useQuaternion=!0}else object.rotation.set(r[0],r[1],r[2]);object.scale.set(s[0],
s[1],s[2]);object.visible=T.visible!==undefined?T.visible:!1;ga.scene.addObject(object);ga.objects[p]=object;ga.empties[p]=object;if(T.trigger&&T.trigger.toLowerCase()!="none"){na={type:T.trigger,object:T};ga.triggers[object.name]=na}}}}function m(na){return function(ua){ga.geometries[na]=ua;k();e-=1;c.onLoadComplete();t()}}function o(na){return function(ua){ga.geometries[na]=ua}}function t(){c.callbackProgress({totalModels:sa,totalTextures:Ba,loadedModels:sa-e,loadedTextures:Ba-xa},ga);c.onLoadProgress();
e==0&&xa==0&&d(ga)}var u,w,p,z,G,F,B,T,C,V,P,Q,ka,ea,pa,aa,oa,e,xa,sa,Ba,ga;aa=h.data;h=new THREE.BinaryLoader;oa=new THREE.JSONLoader;xa=e=0;ga={scene:new THREE.Scene,geometries:{},materials:{},textures:{},objects:{},cameras:{},lights:{},fogs:{},triggers:{},empties:{}};var ra=!1;for(p in aa.objects){T=aa.objects[p];if(T.meshCollider){ra=!0;break}}if(ra)ga.scene.collisions=new THREE.CollisionSystem;if(aa.transform){ra=aa.transform.position;V=aa.transform.rotation;var fa=aa.transform.scale;ra&&ga.scene.position.set(ra[0],
ra[1],ra[2]);V&&ga.scene.rotation.set(V[0],V[1],V[2]);fa&&ga.scene.scale.set(fa[0],fa[1],fa[2]);(ra||V||fa)&&ga.scene.updateMatrix()}ra=function(){xa-=1;t();c.onLoadComplete()};for(G in aa.cameras){V=aa.cameras[G];if(V.type=="perspective")ka=new THREE.Camera(V.fov,V.aspect,V.near,V.far);else if(V.type=="ortho"){ka=new THREE.Camera;ka.projectionMatrix=THREE.Matrix4.makeOrtho(V.left,V.right,V.top,V.bottom,V.near,V.far)}C=V.position;V=V.target;ka.position.set(C[0],C[1],C[2]);ka.target.position.set(V[0],
V[1],V[2]);ga.cameras[G]=ka}for(z in aa.lights){G=aa.lights[z];ka=G.color!==undefined?G.color:16777215;V=G.intensity!==undefined?G.intensity:1;if(G.type=="directional"){C=G.direction;light=new THREE.DirectionalLight(ka,V);light.position.set(C[0],C[1],C[2]);light.position.normalize()}else if(G.type=="point"){C=G.position;light=new THREE.PointLight(ka,V);light.position.set(C[0],C[1],C[2])}ga.scene.addLight(light);ga.lights[z]=light}for(F in aa.fogs){z=aa.fogs[F];if(z.type=="linear")ea=new THREE.Fog(0,
z.near,z.far);else z.type=="exp2"&&(ea=new THREE.FogExp2(0,z.density));V=z.color;ea.color.setRGB(V[0],V[1],V[2]);ga.fogs[F]=ea}if(ga.cameras&&aa.defaults.camera)ga.currentCamera=ga.cameras[aa.defaults.camera];if(ga.fogs&&aa.defaults.fog)ga.scene.fog=ga.fogs[aa.defaults.fog];V=aa.defaults.bgcolor;ga.bgColor=new THREE.Color;ga.bgColor.setRGB(V[0],V[1],V[2]);ga.bgColorAlpha=aa.defaults.bgalpha;for(u in aa.geometries){F=aa.geometries[u];if(F.type=="bin_mesh"||F.type=="ascii_mesh"){e+=1;c.onLoadStart()}}sa=
e;for(u in aa.geometries){F=aa.geometries[u];if(F.type=="cube"){Q=new THREE.Cube(F.width,F.height,F.depth,F.segmentsWidth,F.segmentsHeight,F.segmentsDepth,null,F.flipped,F.sides);ga.geometries[u]=Q}else if(F.type=="plane"){Q=new THREE.Plane(F.width,F.height,F.segmentsWidth,F.segmentsHeight);ga.geometries[u]=Q}else if(F.type=="sphere"){Q=new THREE.Sphere(F.radius,F.segmentsWidth,F.segmentsHeight);ga.geometries[u]=Q}else if(F.type=="cylinder"){Q=new THREE.Cylinder(F.numSegs,F.topRad,F.botRad,F.height,
F.topOffset,F.botOffset);ga.geometries[u]=Q}else if(F.type=="torus"){Q=new THREE.Torus(F.radius,F.tube,F.segmentsR,F.segmentsT);ga.geometries[u]=Q}else if(F.type=="icosahedron"){Q=new THREE.Icosahedron(F.subdivisions);ga.geometries[u]=Q}else if(F.type=="bin_mesh")h.load({model:j(F.url,aa.urlBaseType),callback:m(u)});else if(F.type=="ascii_mesh")oa.load({model:j(F.url,aa.urlBaseType),callback:m(u)});else if(F.type=="embedded_mesh")(F=aa.embeds[F.id])&&oa.createModel(F,o(u),"")}for(B in aa.textures){u=
aa.textures[B];if(u.url instanceof Array){xa+=u.url.length;for(h=0;h<u.url.length;h++)c.onLoadStart()}else{xa+=1;c.onLoadStart()}}Ba=xa;for(B in aa.textures){u=aa.textures[B];if(u.mapping!=undefined&&THREE[u.mapping]!=undefined)u.mapping=new THREE[u.mapping];if(u.url instanceof Array){h=[];for(var za=0;za<u.url.length;za++)h[za]=j(u.url[za],aa.urlBaseType);h=THREE.ImageUtils.loadTextureCube(h,u.mapping,ra)}else{h=THREE.ImageUtils.loadTexture(j(u.url,aa.urlBaseType),u.mapping,ra);if(THREE[u.minFilter]!=
undefined)h.minFilter=THREE[u.minFilter];if(THREE[u.magFilter]!=undefined)h.magFilter=THREE[u.magFilter]}ga.textures[B]=h}for(w in aa.materials){B=aa.materials[w];for(P in B.parameters)if(P=="envMap"||P=="map"||P=="lightMap")B.parameters[P]=ga.textures[B.parameters[P]];else if(P=="shading")B.parameters[P]=B.parameters[P]=="flat"?THREE.FlatShading:THREE.SmoothShading;else if(P=="blending")B.parameters[P]=THREE[B.parameters[P]]?THREE[B.parameters[P]]:THREE.NormalBlending;else if(P=="combine")B.parameters[P]=
B.parameters[P]=="MixOperation"?THREE.MixOperation:THREE.MultiplyOperation;else if(P=="vertexColors")if(B.parameters[P]=="face")B.parameters[P]=THREE.FaceColors;else if(B.parameters[P])B.parameters[P]=THREE.VertexColors;if(B.parameters.opacity!==undefined&&B.parameters.opacity<1)B.parameters.transparent=!0;B=new THREE[B.type](B.parameters);ga.materials[w]=B}k();c.callbackSync(ga)}}};
THREE.MarchingCubes=function(b,d){THREE.Object3D.call(this);this.materials=d instanceof Array?d:[d];this.init=function(c){this.isolation=80;this.size=c;this.size2=this.size*this.size;this.size3=this.size2*this.size;this.halfsize=this.size/2;this.delta=2/this.size;this.yd=this.size;this.zd=this.size2;this.field=new Float32Array(this.size3);this.normal_cache=new Float32Array(this.size3*3);this.vlist=new Float32Array(36);this.nlist=new Float32Array(36);this.firstDraw=!0;this.maxCount=4096;this.count=
0;this.hasPos=!1;this.hasNormal=!1;this.positionArray=new Float32Array(this.maxCount*3);this.normalArray=new Float32Array(this.maxCount*3)};this.lerp=function(c,f,g){return c+(f-c)*g};this.VIntX=function(c,f,g,h,j,k,m,o,t,u){j=(j-t)/(u-t);t=this.normal_cache;f[h]=k+j*this.delta;f[h+1]=m;f[h+2]=o;g[h]=this.lerp(t[c],t[c+3],j);g[h+1]=this.lerp(t[c+1],t[c+4],j);g[h+2]=this.lerp(t[c+2],t[c+5],j)};this.VIntY=function(c,f,g,h,j,k,m,o,t,u){j=(j-t)/(u-t);t=this.normal_cache;f[h]=k;f[h+1]=m+j*this.delta;f[h+
2]=o;f=c+this.yd*3;g[h]=this.lerp(t[c],t[f],j);g[h+1]=this.lerp(t[c+1],t[f+1],j);g[h+2]=this.lerp(t[c+2],t[f+2],j)};this.VIntZ=function(c,f,g,h,j,k,m,o,t,u){j=(j-t)/(u-t);t=this.normal_cache;f[h]=k;f[h+1]=m;f[h+2]=o+j*this.delta;f=c+this.zd*3;g[h]=this.lerp(t[c],t[f],j);g[h+1]=this.lerp(t[c+1],t[f+1],j);g[h+2]=this.lerp(t[c+2],t[f+2],j)};this.compNorm=function(c){var f=c*3;if(this.normal_cache[f]==0){this.normal_cache[f]=this.field[c-1]-this.field[c+1];this.normal_cache[f+1]=this.field[c-this.yd]-
this.field[c+this.yd];this.normal_cache[f+2]=this.field[c-this.zd]-this.field[c+this.zd]}};this.polygonize=function(c,f,g,h,j,k){var m=h+1,o=h+this.yd,t=h+this.zd,u=m+this.yd,w=m+this.zd,p=h+this.yd+this.zd,z=m+this.yd+this.zd,G=0,F=this.field[h],B=this.field[m],T=this.field[o],C=this.field[u],V=this.field[t],P=this.field[w],Q=this.field[p],ka=this.field[z];F<j&&(G|=1);B<j&&(G|=2);T<j&&(G|=8);C<j&&(G|=4);V<j&&(G|=16);P<j&&(G|=32);Q<j&&(G|=128);ka<j&&(G|=64);var ea=THREE.edgeTable[G];if(ea==0)return 0;
var pa=this.delta,aa=c+pa,oa=f+pa;pa=g+pa;if(ea&1){this.compNorm(h);this.compNorm(m);this.VIntX(h*3,this.vlist,this.nlist,0,j,c,f,g,F,B)}if(ea&2){this.compNorm(m);this.compNorm(u);this.VIntY(m*3,this.vlist,this.nlist,3,j,aa,f,g,B,C)}if(ea&4){this.compNorm(o);this.compNorm(u);this.VIntX(o*3,this.vlist,this.nlist,6,j,c,oa,g,T,C)}if(ea&8){this.compNorm(h);this.compNorm(o);this.VIntY(h*3,this.vlist,this.nlist,9,j,c,f,g,F,T)}if(ea&16){this.compNorm(t);this.compNorm(w);this.VIntX(t*3,this.vlist,this.nlist,
12,j,c,f,pa,V,P)}if(ea&32){this.compNorm(w);this.compNorm(z);this.VIntY(w*3,this.vlist,this.nlist,15,j,aa,f,pa,P,ka)}if(ea&64){this.compNorm(p);this.compNorm(z);this.VIntX(p*3,this.vlist,this.nlist,18,j,c,oa,pa,Q,ka)}if(ea&128){this.compNorm(t);this.compNorm(p);this.VIntY(t*3,this.vlist,this.nlist,21,j,c,f,pa,V,Q)}if(ea&256){this.compNorm(h);this.compNorm(t);this.VIntZ(h*3,this.vlist,this.nlist,24,j,c,f,g,F,V)}if(ea&512){this.compNorm(m);this.compNorm(w);this.VIntZ(m*3,this.vlist,this.nlist,27,j,
aa,f,g,B,P)}if(ea&1024){this.compNorm(u);this.compNorm(z);this.VIntZ(u*3,this.vlist,this.nlist,30,j,aa,oa,g,C,ka)}if(ea&2048){this.compNorm(o);this.compNorm(p);this.VIntZ(o*3,this.vlist,this.nlist,33,j,c,oa,g,T,Q)}G<<=4;for(j=h=0;THREE.triTable[G+j]!=-1;){c=G+j;f=c+1;g=c+2;this.posnormtriv(this.vlist,this.nlist,3*THREE.triTable[c],3*THREE.triTable[f],3*THREE.triTable[g],k);j+=3;h++}return h};this.posnormtriv=function(c,f,g,h,j,k){var m=this.count*3;this.positionArray[m]=c[g];this.positionArray[m+
1]=c[g+1];this.positionArray[m+2]=c[g+2];this.positionArray[m+3]=c[h];this.positionArray[m+4]=c[h+1];this.positionArray[m+5]=c[h+2];this.positionArray[m+6]=c[j];this.positionArray[m+7]=c[j+1];this.positionArray[m+8]=c[j+2];this.normalArray[m]=f[g];this.normalArray[m+1]=f[g+1];this.normalArray[m+2]=f[g+2];this.normalArray[m+3]=f[h];this.normalArray[m+4]=f[h+1];this.normalArray[m+5]=f[h+2];this.normalArray[m+6]=f[j];this.normalArray[m+7]=f[j+1];this.normalArray[m+8]=f[j+2];this.hasPos=!0;this.hasNormal=
!0;this.count+=3;this.count>=this.maxCount-3&&k(this)};this.begin=function(){this.count=0;this.hasPos=!1;this.hasNormal=!1};this.end=function(c){if(this.count!=0){for(var f=this.count*3;f<this.positionArray.length;f++)this.positionArray[f]=0;c(this)}};this.addBall=function(c,f,g,h,j){var k=this.size*Math.sqrt(h/j),m=g*this.size,o=f*this.size,t=c*this.size,u=Math.floor(m-k);u<1&&(u=1);m=Math.floor(m+k);m>this.size-1&&(m=this.size-1);var w=Math.floor(o-k);w<1&&(w=1);o=Math.floor(o+k);o>this.size-1&&
(o=this.size-1);var p=Math.floor(t-k);p<1&&(p=1);k=Math.floor(t+k);k>this.size-1&&(k=this.size-1);for(var z,G,F,B,T,C;u<m;u++){t=this.size2*u;G=u/this.size-g;T=G*G;for(G=w;G<o;G++){F=t+this.size*G;z=G/this.size-f;C=z*z;for(z=p;z<k;z++){B=z/this.size-c;B=h/(1.0E-6+B*B+C+T)-j;B>0&&(this.field[F+z]+=B)}}}};this.addPlaneX=function(c,f){var g,h,j,k,m,o=this.size,t=this.yd,u=this.zd,w=this.field,p=o*Math.sqrt(c/f);p>o&&(p=o);for(g=0;g<p;g++){h=g/o;h*=h;k=c/(1.0E-4+h)-f;if(k>0)for(h=0;h<o;h++){m=g+h*t;for(j=
0;j<o;j++)w[u*j+m]+=k}}};this.addPlaneY=function(c,f){var g,h,j,k,m,o,t=this.size,u=this.yd,w=this.zd,p=this.field,z=t*Math.sqrt(c/f);z>t&&(z=t);for(h=0;h<z;h++){g=h/t;g*=g;k=c/(1.0E-4+g)-f;if(k>0){m=h*u;for(g=0;g<t;g++){o=m+g;for(j=0;j<t;j++)p[w*j+o]+=k}}}};this.addPlaneZ=function(c,f){var g,h,j,k,m,o;size=this.size;yd=this.yd;zd=this.zd;field=this.field;dist=size*Math.sqrt(c/f);dist>size&&(dist=size);for(j=0;j<dist;j++){g=j/size;g*=g;k=c/(1.0E-4+g)-f;if(k>0){m=zd*j;for(h=0;h<size;h++){o=m+h*yd;
for(g=0;g<size;g++)field[o+g]+=k}}}};this.reset=function(){var c;for(c=0;c<this.size3;c++){this.normal_cache[c*3]=0;this.field[c]=0}};this.render=function(c){this.begin();var f,g,h,j,k,m,o,t,u,w=this.size-2;for(j=1;j<w;j++){u=this.size2*j;o=(j-this.halfsize)/this.halfsize;for(h=1;h<w;h++){t=u+this.size*h;m=(h-this.halfsize)/this.halfsize;for(g=1;g<w;g++){k=(g-this.halfsize)/this.halfsize;f=t+g;this.polygonize(k,m,o,f,this.isolation,c)}}}this.end(c)};this.generateGeometry=function(){var c=0,f=new THREE.Geometry,
g=[];this.render(function(h){var j,k,m,o,t,u,w,p;for(j=0;j<h.count;j++){w=j*3;t=w+1;p=w+2;k=h.positionArray[w];m=h.positionArray[t];o=h.positionArray[p];u=new THREE.Vector3(k,m,o);k=h.normalArray[w];m=h.normalArray[t];o=h.normalArray[p];w=new THREE.Vector3(k,m,o);w.normalize();t=new THREE.Vertex(u);f.vertices.push(t);g.push(w)}nfaces=h.count/3;for(j=0;j<nfaces;j++){w=(c+j)*3;t=w+1;p=w+2;u=g[w];k=g[t];m=g[p];w=new THREE.Face3(w,t,p,[u,k,m]);f.faces.push(w)}c+=nfaces;h.count=0});return f};this.init(b)};
THREE.MarchingCubes.prototype=new THREE.Object3D;THREE.MarchingCubes.prototype.constructor=THREE.MarchingCubes;
THREE.edgeTable=new Int32Array([0,265,515,778,1030,1295,1541,1804,2060,2309,2575,2822,3082,3331,3593,3840,400,153,915,666,1430,1183,1941,1692,2460,2197,2975,2710,3482,3219,3993,3728,560,825,51,314,1590,1855,1077,1340,2620,2869,2111,2358,3642,3891,3129,3376,928,681,419,170,1958,1711,1445,1196,2988,2725,2479,2214,4010,3747,3497,3232,1120,1385,1635,1898,102,367,613,876,3180,3429,3695,3942,2154,2403,2665,2912,1520,1273,2035,1786,502,255,1013,764,3580,3317,4095,3830,2554,2291,3065,2800,1616,1881,1107,
1370,598,863,85,348,3676,3925,3167,3414,2650,2899,2137,2384,1984,1737,1475,1226,966,719,453,204,4044,3781,3535,3270,3018,2755,2505,2240,2240,2505,2755,3018,3270,3535,3781,4044,204,453,719,966,1226,1475,1737,1984,2384,2137,2899,2650,3414,3167,3925,3676,348,85,863,598,1370,1107,1881,1616,2800,3065,2291,2554,3830,4095,3317,3580,764,1013,255,502,1786,2035,1273,1520,2912,2665,2403,2154,3942,3695,3429,3180,876,613,367,102,1898,1635,1385,1120,3232,3497,3747,4010,2214,2479,2725,2988,1196,1445,1711,1958,170,
419,681,928,3376,3129,3891,3642,2358,2111,2869,2620,1340,1077,1855,1590,314,51,825,560,3728,3993,3219,3482,2710,2975,2197,2460,1692,1941,1183,1430,666,915,153,400,3840,3593,3331,3082,2822,2575,2309,2060,1804,1541,1295,1030,778,515,265,0]);
THREE.triTable=new Int32Array([-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,1,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,8,3,9,8,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,1,2,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,2,10,0,2,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,8,3,2,10,8,10,9,8,-1,-1,-1,-1,-1,-1,-1,3,11,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,11,2,8,11,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,9,0,2,3,11,-1,-1,-1,-1,-1,
-1,-1,-1,-1,-1,1,11,2,1,9,11,9,8,11,-1,-1,-1,-1,-1,-1,-1,3,10,1,11,10,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,10,1,0,8,10,8,11,10,-1,-1,-1,-1,-1,-1,-1,3,9,0,3,11,9,11,10,9,-1,-1,-1,-1,-1,-1,-1,9,8,10,10,8,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,7,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,3,0,7,3,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,1,9,8,4,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,1,9,4,7,1,7,3,1,-1,-1,-1,-1,-1,-1,-1,1,2,10,8,4,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,4,7,3,0,4,1,2,10,-1,-1,-1,-1,-1,-1,-1,9,2,10,9,0,2,8,4,7,
-1,-1,-1,-1,-1,-1,-1,2,10,9,2,9,7,2,7,3,7,9,4,-1,-1,-1,-1,8,4,7,3,11,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,4,7,11,2,4,2,0,4,-1,-1,-1,-1,-1,-1,-1,9,0,1,8,4,7,2,3,11,-1,-1,-1,-1,-1,-1,-1,4,7,11,9,4,11,9,11,2,9,2,1,-1,-1,-1,-1,3,10,1,3,11,10,7,8,4,-1,-1,-1,-1,-1,-1,-1,1,11,10,1,4,11,1,0,4,7,11,4,-1,-1,-1,-1,4,7,8,9,0,11,9,11,10,11,0,3,-1,-1,-1,-1,4,7,11,4,11,9,9,11,10,-1,-1,-1,-1,-1,-1,-1,9,5,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,5,4,0,8,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,5,4,1,5,0,-1,-1,-1,-1,-1,-1,
-1,-1,-1,-1,8,5,4,8,3,5,3,1,5,-1,-1,-1,-1,-1,-1,-1,1,2,10,9,5,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,0,8,1,2,10,4,9,5,-1,-1,-1,-1,-1,-1,-1,5,2,10,5,4,2,4,0,2,-1,-1,-1,-1,-1,-1,-1,2,10,5,3,2,5,3,5,4,3,4,8,-1,-1,-1,-1,9,5,4,2,3,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,11,2,0,8,11,4,9,5,-1,-1,-1,-1,-1,-1,-1,0,5,4,0,1,5,2,3,11,-1,-1,-1,-1,-1,-1,-1,2,1,5,2,5,8,2,8,11,4,8,5,-1,-1,-1,-1,10,3,11,10,1,3,9,5,4,-1,-1,-1,-1,-1,-1,-1,4,9,5,0,8,1,8,10,1,8,11,10,-1,-1,-1,-1,5,4,0,5,0,11,5,11,10,11,0,3,-1,-1,-1,-1,5,4,8,5,
8,10,10,8,11,-1,-1,-1,-1,-1,-1,-1,9,7,8,5,7,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,3,0,9,5,3,5,7,3,-1,-1,-1,-1,-1,-1,-1,0,7,8,0,1,7,1,5,7,-1,-1,-1,-1,-1,-1,-1,1,5,3,3,5,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,7,8,9,5,7,10,1,2,-1,-1,-1,-1,-1,-1,-1,10,1,2,9,5,0,5,3,0,5,7,3,-1,-1,-1,-1,8,0,2,8,2,5,8,5,7,10,5,2,-1,-1,-1,-1,2,10,5,2,5,3,3,5,7,-1,-1,-1,-1,-1,-1,-1,7,9,5,7,8,9,3,11,2,-1,-1,-1,-1,-1,-1,-1,9,5,7,9,7,2,9,2,0,2,7,11,-1,-1,-1,-1,2,3,11,0,1,8,1,7,8,1,5,7,-1,-1,-1,-1,11,2,1,11,1,7,7,1,5,-1,-1,-1,-1,-1,-1,
-1,9,5,8,8,5,7,10,1,3,10,3,11,-1,-1,-1,-1,5,7,0,5,0,9,7,11,0,1,0,10,11,10,0,-1,11,10,0,11,0,3,10,5,0,8,0,7,5,7,0,-1,11,10,5,7,11,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,10,6,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,5,10,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,0,1,5,10,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,8,3,1,9,8,5,10,6,-1,-1,-1,-1,-1,-1,-1,1,6,5,2,6,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,6,5,1,2,6,3,0,8,-1,-1,-1,-1,-1,-1,-1,9,6,5,9,0,6,0,2,6,-1,-1,-1,-1,-1,-1,-1,5,9,8,5,8,2,5,2,6,3,2,8,-1,-1,-1,-1,2,3,11,10,6,
5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,0,8,11,2,0,10,6,5,-1,-1,-1,-1,-1,-1,-1,0,1,9,2,3,11,5,10,6,-1,-1,-1,-1,-1,-1,-1,5,10,6,1,9,2,9,11,2,9,8,11,-1,-1,-1,-1,6,3,11,6,5,3,5,1,3,-1,-1,-1,-1,-1,-1,-1,0,8,11,0,11,5,0,5,1,5,11,6,-1,-1,-1,-1,3,11,6,0,3,6,0,6,5,0,5,9,-1,-1,-1,-1,6,5,9,6,9,11,11,9,8,-1,-1,-1,-1,-1,-1,-1,5,10,6,4,7,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,3,0,4,7,3,6,5,10,-1,-1,-1,-1,-1,-1,-1,1,9,0,5,10,6,8,4,7,-1,-1,-1,-1,-1,-1,-1,10,6,5,1,9,7,1,7,3,7,9,4,-1,-1,-1,-1,6,1,2,6,5,1,4,7,8,-1,-1,-1,-1,
-1,-1,-1,1,2,5,5,2,6,3,0,4,3,4,7,-1,-1,-1,-1,8,4,7,9,0,5,0,6,5,0,2,6,-1,-1,-1,-1,7,3,9,7,9,4,3,2,9,5,9,6,2,6,9,-1,3,11,2,7,8,4,10,6,5,-1,-1,-1,-1,-1,-1,-1,5,10,6,4,7,2,4,2,0,2,7,11,-1,-1,-1,-1,0,1,9,4,7,8,2,3,11,5,10,6,-1,-1,-1,-1,9,2,1,9,11,2,9,4,11,7,11,4,5,10,6,-1,8,4,7,3,11,5,3,5,1,5,11,6,-1,-1,-1,-1,5,1,11,5,11,6,1,0,11,7,11,4,0,4,11,-1,0,5,9,0,6,5,0,3,6,11,6,3,8,4,7,-1,6,5,9,6,9,11,4,7,9,7,11,9,-1,-1,-1,-1,10,4,9,6,4,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,10,6,4,9,10,0,8,3,-1,-1,-1,-1,-1,-1,-1,
10,0,1,10,6,0,6,4,0,-1,-1,-1,-1,-1,-1,-1,8,3,1,8,1,6,8,6,4,6,1,10,-1,-1,-1,-1,1,4,9,1,2,4,2,6,4,-1,-1,-1,-1,-1,-1,-1,3,0,8,1,2,9,2,4,9,2,6,4,-1,-1,-1,-1,0,2,4,4,2,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,3,2,8,2,4,4,2,6,-1,-1,-1,-1,-1,-1,-1,10,4,9,10,6,4,11,2,3,-1,-1,-1,-1,-1,-1,-1,0,8,2,2,8,11,4,9,10,4,10,6,-1,-1,-1,-1,3,11,2,0,1,6,0,6,4,6,1,10,-1,-1,-1,-1,6,4,1,6,1,10,4,8,1,2,1,11,8,11,1,-1,9,6,4,9,3,6,9,1,3,11,6,3,-1,-1,-1,-1,8,11,1,8,1,0,11,6,1,9,1,4,6,4,1,-1,3,11,6,3,6,0,0,6,4,-1,-1,-1,-1,-1,-1,-1,
6,4,8,11,6,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,10,6,7,8,10,8,9,10,-1,-1,-1,-1,-1,-1,-1,0,7,3,0,10,7,0,9,10,6,7,10,-1,-1,-1,-1,10,6,7,1,10,7,1,7,8,1,8,0,-1,-1,-1,-1,10,6,7,10,7,1,1,7,3,-1,-1,-1,-1,-1,-1,-1,1,2,6,1,6,8,1,8,9,8,6,7,-1,-1,-1,-1,2,6,9,2,9,1,6,7,9,0,9,3,7,3,9,-1,7,8,0,7,0,6,6,0,2,-1,-1,-1,-1,-1,-1,-1,7,3,2,6,7,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,3,11,10,6,8,10,8,9,8,6,7,-1,-1,-1,-1,2,0,7,2,7,11,0,9,7,6,7,10,9,10,7,-1,1,8,0,1,7,8,1,10,7,6,7,10,2,3,11,-1,11,2,1,11,1,7,10,6,1,6,7,1,-1,-1,-1,-1,
8,9,6,8,6,7,9,1,6,11,6,3,1,3,6,-1,0,9,1,11,6,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,8,0,7,0,6,3,11,0,11,6,0,-1,-1,-1,-1,7,11,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,6,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,0,8,11,7,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,1,9,11,7,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,1,9,8,3,1,11,7,6,-1,-1,-1,-1,-1,-1,-1,10,1,2,6,11,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,10,3,0,8,6,11,7,-1,-1,-1,-1,-1,-1,-1,2,9,0,2,10,9,6,11,7,-1,-1,-1,-1,-1,-1,-1,6,11,7,2,10,3,10,8,3,10,9,8,-1,-1,-1,-1,7,
2,3,6,2,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,0,8,7,6,0,6,2,0,-1,-1,-1,-1,-1,-1,-1,2,7,6,2,3,7,0,1,9,-1,-1,-1,-1,-1,-1,-1,1,6,2,1,8,6,1,9,8,8,7,6,-1,-1,-1,-1,10,7,6,10,1,7,1,3,7,-1,-1,-1,-1,-1,-1,-1,10,7,6,1,7,10,1,8,7,1,0,8,-1,-1,-1,-1,0,3,7,0,7,10,0,10,9,6,10,7,-1,-1,-1,-1,7,6,10,7,10,8,8,10,9,-1,-1,-1,-1,-1,-1,-1,6,8,4,11,8,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,6,11,3,0,6,0,4,6,-1,-1,-1,-1,-1,-1,-1,8,6,11,8,4,6,9,0,1,-1,-1,-1,-1,-1,-1,-1,9,4,6,9,6,3,9,3,1,11,3,6,-1,-1,-1,-1,6,8,4,6,11,8,2,10,1,-1,-1,-1,
-1,-1,-1,-1,1,2,10,3,0,11,0,6,11,0,4,6,-1,-1,-1,-1,4,11,8,4,6,11,0,2,9,2,10,9,-1,-1,-1,-1,10,9,3,10,3,2,9,4,3,11,3,6,4,6,3,-1,8,2,3,8,4,2,4,6,2,-1,-1,-1,-1,-1,-1,-1,0,4,2,4,6,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,9,0,2,3,4,2,4,6,4,3,8,-1,-1,-1,-1,1,9,4,1,4,2,2,4,6,-1,-1,-1,-1,-1,-1,-1,8,1,3,8,6,1,8,4,6,6,10,1,-1,-1,-1,-1,10,1,0,10,0,6,6,0,4,-1,-1,-1,-1,-1,-1,-1,4,6,3,4,3,8,6,10,3,0,3,9,10,9,3,-1,10,9,4,6,10,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,9,5,7,6,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,4,9,5,11,7,6,
-1,-1,-1,-1,-1,-1,-1,5,0,1,5,4,0,7,6,11,-1,-1,-1,-1,-1,-1,-1,11,7,6,8,3,4,3,5,4,3,1,5,-1,-1,-1,-1,9,5,4,10,1,2,7,6,11,-1,-1,-1,-1,-1,-1,-1,6,11,7,1,2,10,0,8,3,4,9,5,-1,-1,-1,-1,7,6,11,5,4,10,4,2,10,4,0,2,-1,-1,-1,-1,3,4,8,3,5,4,3,2,5,10,5,2,11,7,6,-1,7,2,3,7,6,2,5,4,9,-1,-1,-1,-1,-1,-1,-1,9,5,4,0,8,6,0,6,2,6,8,7,-1,-1,-1,-1,3,6,2,3,7,6,1,5,0,5,4,0,-1,-1,-1,-1,6,2,8,6,8,7,2,1,8,4,8,5,1,5,8,-1,9,5,4,10,1,6,1,7,6,1,3,7,-1,-1,-1,-1,1,6,10,1,7,6,1,0,7,8,7,0,9,5,4,-1,4,0,10,4,10,5,0,3,10,6,10,7,3,7,10,
-1,7,6,10,7,10,8,5,4,10,4,8,10,-1,-1,-1,-1,6,9,5,6,11,9,11,8,9,-1,-1,-1,-1,-1,-1,-1,3,6,11,0,6,3,0,5,6,0,9,5,-1,-1,-1,-1,0,11,8,0,5,11,0,1,5,5,6,11,-1,-1,-1,-1,6,11,3,6,3,5,5,3,1,-1,-1,-1,-1,-1,-1,-1,1,2,10,9,5,11,9,11,8,11,5,6,-1,-1,-1,-1,0,11,3,0,6,11,0,9,6,5,6,9,1,2,10,-1,11,8,5,11,5,6,8,0,5,10,5,2,0,2,5,-1,6,11,3,6,3,5,2,10,3,10,5,3,-1,-1,-1,-1,5,8,9,5,2,8,5,6,2,3,8,2,-1,-1,-1,-1,9,5,6,9,6,0,0,6,2,-1,-1,-1,-1,-1,-1,-1,1,5,8,1,8,0,5,6,8,3,8,2,6,2,8,-1,1,5,6,2,1,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
1,3,6,1,6,10,3,8,6,5,6,9,8,9,6,-1,10,1,0,10,0,6,9,5,0,5,6,0,-1,-1,-1,-1,0,3,8,5,6,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,10,5,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,5,10,7,5,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,5,10,11,7,5,8,3,0,-1,-1,-1,-1,-1,-1,-1,5,11,7,5,10,11,1,9,0,-1,-1,-1,-1,-1,-1,-1,10,7,5,10,11,7,9,8,1,8,3,1,-1,-1,-1,-1,11,1,2,11,7,1,7,5,1,-1,-1,-1,-1,-1,-1,-1,0,8,3,1,2,7,1,7,5,7,2,11,-1,-1,-1,-1,9,7,5,9,2,7,9,0,2,2,11,7,-1,-1,-1,-1,7,5,2,7,2,11,5,9,2,3,2,8,9,8,2,-1,2,5,10,2,3,5,3,7,5,-1,-1,
-1,-1,-1,-1,-1,8,2,0,8,5,2,8,7,5,10,2,5,-1,-1,-1,-1,9,0,1,5,10,3,5,3,7,3,10,2,-1,-1,-1,-1,9,8,2,9,2,1,8,7,2,10,2,5,7,5,2,-1,1,3,5,3,7,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,7,0,7,1,1,7,5,-1,-1,-1,-1,-1,-1,-1,9,0,3,9,3,5,5,3,7,-1,-1,-1,-1,-1,-1,-1,9,8,7,5,9,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,5,8,4,5,10,8,10,11,8,-1,-1,-1,-1,-1,-1,-1,5,0,4,5,11,0,5,10,11,11,3,0,-1,-1,-1,-1,0,1,9,8,4,10,8,10,11,10,4,5,-1,-1,-1,-1,10,11,4,10,4,5,11,3,4,9,4,1,3,1,4,-1,2,5,1,2,8,5,2,11,8,4,5,8,-1,-1,-1,-1,0,4,11,0,11,3,4,5,11,
2,11,1,5,1,11,-1,0,2,5,0,5,9,2,11,5,4,5,8,11,8,5,-1,9,4,5,2,11,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,5,10,3,5,2,3,4,5,3,8,4,-1,-1,-1,-1,5,10,2,5,2,4,4,2,0,-1,-1,-1,-1,-1,-1,-1,3,10,2,3,5,10,3,8,5,4,5,8,0,1,9,-1,5,10,2,5,2,4,1,9,2,9,4,2,-1,-1,-1,-1,8,4,5,8,5,3,3,5,1,-1,-1,-1,-1,-1,-1,-1,0,4,5,1,0,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,4,5,8,5,3,9,0,5,0,3,5,-1,-1,-1,-1,9,4,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,11,7,4,9,11,9,10,11,-1,-1,-1,-1,-1,-1,-1,0,8,3,4,9,7,9,11,7,9,10,11,-1,-1,-1,-1,1,10,11,1,11,
4,1,4,0,7,4,11,-1,-1,-1,-1,3,1,4,3,4,8,1,10,4,7,4,11,10,11,4,-1,4,11,7,9,11,4,9,2,11,9,1,2,-1,-1,-1,-1,9,7,4,9,11,7,9,1,11,2,11,1,0,8,3,-1,11,7,4,11,4,2,2,4,0,-1,-1,-1,-1,-1,-1,-1,11,7,4,11,4,2,8,3,4,3,2,4,-1,-1,-1,-1,2,9,10,2,7,9,2,3,7,7,4,9,-1,-1,-1,-1,9,10,7,9,7,4,10,2,7,8,7,0,2,0,7,-1,3,7,10,3,10,2,7,4,10,1,10,0,4,0,10,-1,1,10,2,8,7,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,9,1,4,1,7,7,1,3,-1,-1,-1,-1,-1,-1,-1,4,9,1,4,1,7,0,8,1,8,7,1,-1,-1,-1,-1,4,0,3,7,4,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,8,7,-1,-1,-1,
-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,10,8,10,11,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,0,9,3,9,11,11,9,10,-1,-1,-1,-1,-1,-1,-1,0,1,10,0,10,8,8,10,11,-1,-1,-1,-1,-1,-1,-1,3,1,10,11,3,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,11,1,11,9,9,11,8,-1,-1,-1,-1,-1,-1,-1,3,0,9,3,9,11,1,2,9,2,11,9,-1,-1,-1,-1,0,2,11,8,0,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,2,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,3,8,2,8,10,10,8,9,-1,-1,-1,-1,-1,-1,-1,9,10,2,0,9,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,3,8,2,8,10,0,1,8,1,10,8,-1,-1,-1,-1,1,10,
2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,3,8,9,1,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,9,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,3,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]);
THREE.Trident=function(b){function d(h){return new THREE.Mesh(new THREE.Cylinder(30,0.1,b.length/20,b.length/5),new THREE.MeshBasicMaterial({color:h}))}function c(h,j){var k=new THREE.Geometry;k.vertices=[new THREE.Vertex,new THREE.Vertex(h)];return new THREE.Line(k,new THREE.LineBasicMaterial({color:j}))}THREE.Object3D.call(this);var f=Math.PI/2,g;b=b||THREE.Trident.defaultParams;if(b!==THREE.Trident.defaultParams)for(g in THREE.Trident.defaultParams)b.hasOwnProperty(g)||(b[g]=THREE.Trident.defaultParams[g]);
this.scale=new THREE.Vector3(b.scale,b.scale,b.scale);this.addChild(c(new THREE.Vector3(b.length,0,0),b.xAxisColor));this.addChild(c(new THREE.Vector3(0,b.length,0),b.yAxisColor));this.addChild(c(new THREE.Vector3(0,0,b.length),b.zAxisColor));if(b.showArrows){g=d(b.xAxisColor);g.rotation.y=-f;g.position.x=b.length;this.addChild(g);g=d(b.yAxisColor);g.rotation.x=f;g.position.y=b.length;this.addChild(g);g=d(b.zAxisColor);g.rotation.y=Math.PI;g.position.z=b.length;this.addChild(g)}};
THREE.Trident.prototype=new THREE.Object3D;THREE.Trident.prototype.constructor=THREE.Trident;THREE.Trident.defaultParams={xAxisColor:16711680,yAxisColor:65280,zAxisColor:255,showArrows:!0,length:100,scale:1};THREE.PlaneCollider=function(b,d){this.point=b;this.normal=d};THREE.SphereCollider=function(b,d){this.center=b;this.radius=d;this.radiusSq=d*d};THREE.BoxCollider=function(b,d){this.min=b;this.max=d;this.dynamic=!0;this.normal=new THREE.Vector3};
THREE.MeshCollider=function(b,d,c,f){this.vertices=b;this.faces=d;this.normals=c;this.box=f;this.numFaces=this.faces.length;this.normal=new THREE.Vector3};THREE.CollisionSystem=function(){this.collisionNormal=new THREE.Vector3;this.colliders=[];this.hits=[]};THREE.Collisions=new THREE.CollisionSystem;THREE.CollisionSystem.prototype.merge=function(b){this.colliders=this.colliders.concat(b.colliders);this.hits=this.hits.concat(b.hits)};
THREE.CollisionSystem.prototype.rayCastAll=function(b){b.direction.normalize();this.hits.length=0;var d,c,f,g,h=0;d=0;for(c=this.colliders.length;d<c;d++){g=this.colliders[d];f=this.rayCast(b,g);if(f<Number.MAX_VALUE){g.distance=f;f>h?this.hits.push(g):this.hits.unshift(g);h=f}}return this.hits};
THREE.CollisionSystem.prototype.rayCastNearest=function(b){var d=this.rayCastAll(b);if(d.length==0)return null;for(var c=0;d[c]instanceof THREE.MeshCollider;){var f=this.rayMesh(b,d[c]);if(f<Number.MAX_VALUE){d[c].distance=f;break}c++}if(c>d.length)return null;return d[c]};
THREE.CollisionSystem.prototype.rayCast=function(b,d){if(d instanceof THREE.PlaneCollider)return this.rayPlane(b,d);else if(d instanceof THREE.SphereCollider)return this.raySphere(b,d);else if(d instanceof THREE.BoxCollider)return this.rayBox(b,d);else if(d instanceof THREE.MeshCollider&&d.box)return this.rayBox(b,d.box)};
THREE.CollisionSystem.prototype.rayMesh=function(b,d){for(var c=this.makeRayLocal(b,d.mesh),f=Number.MAX_VALUE,g=0;g<d.numFaces/3;g++){var h=g*3;h=this.rayTriangle(c,d.vertices[d.faces[h+0]],d.vertices[d.faces[h+1]],d.vertices[d.faces[h+2]],f,this.collisionNormal);if(h<f){f=h;d.normal.copy(this.collisionNormal);d.normal.normalize()}}return f};
THREE.CollisionSystem.prototype.rayTriangle=function(b,d,c,f,g,h){var j=THREE.CollisionSystem.__v1,k=THREE.CollisionSystem.__v2;h.set(0,0,0);j.sub(c,d);k.sub(f,c);h.cross(j,k);k=h.dot(b.direction);if(!(k<0))return Number.MAX_VALUE;j=h.dot(d)-h.dot(b.origin);if(!(j<=0))return Number.MAX_VALUE;if(!(j>=k*g))return Number.MAX_VALUE;j/=k;k=THREE.CollisionSystem.__v3;k.copy(b.direction);k.multiplyScalar(j);k.addSelf(b.origin);if(Math.abs(h.x)>Math.abs(h.y))if(Math.abs(h.x)>Math.abs(h.z)){b=k.y-d.y;h=c.y-
d.y;g=f.y-d.y;k=k.z-d.z;c=c.z-d.z;f=f.z-d.z}else{b=k.x-d.x;h=c.x-d.x;g=f.x-d.x;k=k.y-d.y;c=c.y-d.y;f=f.y-d.y}else if(Math.abs(h.y)>Math.abs(h.z)){b=k.x-d.x;h=c.x-d.x;g=f.x-d.x;k=k.z-d.z;c=c.z-d.z;f=f.z-d.z}else{b=k.x-d.x;h=c.x-d.x;g=f.x-d.x;k=k.y-d.y;c=c.y-d.y;f=f.y-d.y}d=h*f-c*g;if(d==0)return Number.MAX_VALUE;d=1/d;f=(b*f-k*g)*d;if(!(f>=0))return Number.MAX_VALUE;d*=h*k-c*b;if(!(d>=0))return Number.MAX_VALUE;if(!(1-f-d>=0))return Number.MAX_VALUE;return j};
THREE.CollisionSystem.prototype.makeRayLocal=function(b,d){var c=THREE.CollisionSystem.__m;THREE.Matrix4.makeInvert(d.matrixWorld,c);var f=THREE.CollisionSystem.__r;f.origin.copy(b.origin);f.direction.copy(b.direction);c.multiplyVector3(f.origin);c.rotateAxis(f.direction);f.direction.normalize();return f};
THREE.CollisionSystem.prototype.rayBox=function(b,d){var c;if(d.dynamic&&d.mesh&&d.mesh.matrixWorld)c=this.makeRayLocal(b,d.mesh);else{c=THREE.CollisionSystem.__r;c.origin.copy(b.origin);c.direction.copy(b.direction)}var f=0,g=0,h=0,j=0,k=0,m=0,o=!0;if(c.origin.x<d.min.x){f=d.min.x-c.origin.x;f/=c.direction.x;o=!1;j=-1}else if(c.origin.x>d.max.x){f=d.max.x-c.origin.x;f/=c.direction.x;o=!1;j=1}if(c.origin.y<d.min.y){g=d.min.y-c.origin.y;g/=c.direction.y;o=!1;k=-1}else if(c.origin.y>d.max.y){g=d.max.y-
c.origin.y;g/=c.direction.y;o=!1;k=1}if(c.origin.z<d.min.z){h=d.min.z-c.origin.z;h/=c.direction.z;o=!1;m=-1}else if(c.origin.z>d.max.z){h=d.max.z-c.origin.z;h/=c.direction.z;o=!1;m=1}if(o)return-1;o=0;if(g>f){o=1;f=g}if(h>f){o=2;f=h}switch(o){case 0:k=c.origin.y+c.direction.y*f;if(k<d.min.y||k>d.max.y)return Number.MAX_VALUE;c=c.origin.z+c.direction.z*f;if(c<d.min.z||c>d.max.z)return Number.MAX_VALUE;d.normal.set(j,0,0);break;case 1:j=c.origin.x+c.direction.x*f;if(j<d.min.x||j>d.max.x)return Number.MAX_VALUE;
c=c.origin.z+c.direction.z*f;if(c<d.min.z||c>d.max.z)return Number.MAX_VALUE;d.normal.set(0,k,0);break;case 2:j=c.origin.x+c.direction.x*f;if(j<d.min.x||j>d.max.x)return Number.MAX_VALUE;k=c.origin.y+c.direction.y*f;if(k<d.min.y||k>d.max.y)return Number.MAX_VALUE;d.normal.set(0,0,m)}return f};THREE.CollisionSystem.prototype.rayPlane=function(b,d){var c=b.direction.dot(d.normal),f=d.point.dot(d.normal);if(c<0)c=(f-b.origin.dot(d.normal))/c;else return Number.MAX_VALUE;return c>0?c:Number.MAX_VALUE};
THREE.CollisionSystem.prototype.raySphere=function(b,d){var c=d.center.clone().subSelf(b.origin);if(c.lengthSq<d.radiusSq)return-1;var f=c.dot(b.direction.clone());if(f<=0)return Number.MAX_VALUE;c=d.radiusSq-(c.lengthSq()-f*f);if(c>=0)return Math.abs(f)-Math.sqrt(c);return Number.MAX_VALUE};THREE.CollisionSystem.__v1=new THREE.Vector3;THREE.CollisionSystem.__v2=new THREE.Vector3;THREE.CollisionSystem.__v3=new THREE.Vector3;THREE.CollisionSystem.__nr=new THREE.Vector3;THREE.CollisionSystem.__m=new THREE.Matrix4;
THREE.CollisionSystem.__r=new THREE.Ray;THREE.CollisionUtils={};THREE.CollisionUtils.MeshOBB=function(b){b.geometry.computeBoundingBox();var d=b.geometry.boundingBox,c=new THREE.Vector3(d.x[0],d.y[0],d.z[0]);d=new THREE.Vector3(d.x[1],d.y[1],d.z[1]);c=new THREE.BoxCollider(c,d);c.mesh=b;return c};THREE.CollisionUtils.MeshAABB=function(b){var d=THREE.CollisionUtils.MeshOBB(b);d.min.addSelf(b.position);d.max.addSelf(b.position);d.dynamic=!1;return d};
THREE.CollisionUtils.MeshColliderWBox=function(b){for(var d=b.geometry.vertices,c=d.length,f=b.geometry.faces,g=f.length,h=[],j=[],k=[],m=0;m<c;m++)h.push(new THREE.Vector3(d[m].position.x,d[m].position.y,d[m].position.z));for(m=0;m<g;m++){j.push(f[m].a,f[m].b,f[m].c);k.push(new THREE.Vector3(f[m].normal.x,f[m].normal.y,f[m].normal.z))}d=new THREE.MeshCollider(h,j,k,THREE.CollisionUtils.MeshOBB(b));d.mesh=b;return d};

var LoadingBar = function ( callback ) {

	var domElement, loadBar, loadVal,
	totalItems = 0, doneItems = 0, maxProgress = 0;

	domElement = document.createElement( 'div' );

	loadBar = document.createElement( 'div' );
	loadBar.style.position = 'absolute';
	loadBar.style.display = 'block';
	loadBar.style.width = '300px';
	loadBar.style.height = '8px';
	loadBar.style.borderStyle = 'solid';
	loadBar.style.borderColor = 'rgba(255,255,255,0.5)';
	//loadBar.style.background = 'rgba(255,255,255,0.15)';
	loadBar.style.borderWidth = '1px';
	loadBar.style.borderRadius = '5px';
	domElement.appendChild( loadBar );

	loadVal = document.createElement( 'div' );
	loadVal.style.position = 'absolute';
	loadVal.style.height = '10px';
	loadVal.style.width = '0px';
	loadVal.style.background = '#fff';
	loadVal.style.borderRadius = '5px';
	domElement.appendChild( loadVal );
	
	domElement.style.margin = "30px 0 0 0";

	function updateProgress() {

		var progress = doneItems / totalItems;

		if ( progress > maxProgress ) {

			maxProgress = progress;
			loadVal.style.width = progress * 300 + "px";

		}

	};

	this.addItem  = function () {

		totalItems ++;
		updateProgress();

	};

	this.completeItem = function () {

		doneItems ++;

		updateProgress();

		if ( totalItems != 0 && totalItems == doneItems ) {

			callback();

		}

	};

	this.getDomElement = function () {

		return domElement;

	};

}

/**
 * Provides requestAnimationFrame in a cross browser way.
 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 */

if ( !window.requestAnimationFrame ) {

	window.requestAnimationFrame = ( function() {

		return window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame || // comment out if FF4 is slow (it caps framerate at ~30fps: https://bugzilla.mozilla.org/show_bug.cgi?id=630127)
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {

			window.setTimeout( callback, 1000 / 60 );

		};

	} )();

}

/**
 * @author mr.doob / http://mrdoob.com/
 */

var Sequencer = function () {

	var _item,
	_items = [],
	_itemsActive = [],
	_itemsToRemove = [],

	_nextItem = 0,
	_nextItemToRemove = 0,
	_time = 0,

	_layersNeedSorting = false;

	this.add = function ( item, start, end, layer ) {

		item.__active = false;
		item.__start = start;
		item.__duration = end - start;
		item.__end = end;
		item.__layer = layer;

		item.init();

		_items.push( item );
		_items.sort( function ( a, b ) { return a.__start - b.__start; } );

		_itemsToRemove.push( item );
		_itemsToRemove.sort( function ( a, b ) { return a.__end - b.__end; } );

	};

	this.update = function ( time ) {

		if ( time < _time ) {

			this.clear();
			_time = time;

		}

		while ( _items[ _nextItem ] ) {

			_item = _items[ _nextItem ];

			if ( _item.__start > time ) {

				break;

			}

			if ( !_item.__active && _item.__end > time ) {

				_item.show( ( time - _item.__start ) / _item.__duration );
				_item.__active = true;

				_itemsActive.push( _item );

				_layersNeedSorting = true;

			}

			_nextItem ++;

		}

		while ( _itemsToRemove[ _nextItemToRemove ] ) {

			_item = _itemsToRemove[ _nextItemToRemove ];

			if ( _item.__end > time ) {

				break;

			}

			if ( _item.__active ) {

				_item.hide();
				_item.__active = false;

				var i = _itemsActive.indexOf( _item );

				if ( i !== -1 ) {

					_itemsActive.splice( i, 1 );

				}

			}

			_nextItemToRemove ++;

		}

		if ( _layersNeedSorting ) {

			_itemsActive.sort( function ( a, b ) { return a.__layer - b.__layer; } );
			_layersNeedSorting = false;

		}

		for ( var i = 0, l = _itemsActive.length; i < l; i ++ ) {

			_item = _itemsActive[ i ];
			_item.update( ( time - _item.__start ) / _item.__duration, time - _time, time );

		}

		_time = time;

	};

	this.clear = function () {

		_nextItem = 0;
		_nextItemToRemove = 0;

		while ( _itemsActive.length ) {

			_item = _itemsActive[ 0 ];
			_item.__active = false;
			_item.hide();
			_itemsActive.splice( 0, 1 );

		}

	};

};

var SequencerItem = function () {};

SequencerItem.prototype = {

	init: function () {},
	load: function () {},
	show: function ( progress ) {},
	hide: function () {},
	update: function ( progress, delta, time ) {}

}

var Tune = function ( audio ) {

	var _audio = audio,
	_bpm, _rows, _ms;

	this.getCurrentTime = function() {

		return _audio.currentTime * 1000;

	};

	this.setBPM = function ( bpm ) {

		_bpm = bpm;
		_ms = ( 1 / _bpm ) * 60000;

	};

	this.getBPM = function() {

		return _bpm;

	};

	this.setMS = function ( ms ) {

		_ms = ms;
		_bpm = ( 1 / _ms ) * 60000;

	};

	this.getMS = function () {

		return _ms;

	};

	this.setRows = function ( rows ) {

		_rows = rows;

	};

	this.getRows = function () {

		return _rows;

	};

	this.getBeatMS = function ( beat ) {

		return _ms * beat;
	};

	this.getPatternMS = function ( pattern ) {

		return _ms * _rows * pattern;

	};

}

var UgcHandler = function () {

	var base_url = '/ugc/objects';

	this.getLatestUGOs = function ( callback ) {

		var url = base_url + '/latest';

		var request = new XMLHttpRequest();
		request.open( 'GET', url, true );

		request.onreadystatechange = function () {

			if ( request.readyState == 4 ) {

				if ( request.status == 200 ) {

					callback( JSON.parse( request.responseText ) );

				} else {

					console.log( 'Unable to load latest User Generated Content' );

				}

			}

		}

		request.send( null );

	};

	this.submitUGO = function ( title, email, type, data, image, callback ) {

		var url = base_url;

		var params = 'title=' + title + '&email=' + email + '&type=' + type + '&data=' + data + '&image=' + image;

		console.log( data );

		var request = new XMLHttpRequest();
		request.open( 'POST', url, true );
		request.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded' );
//		request.setRequestHeader( 'Content-length', params.length );
//		request.setRequestHeader( 'Connection', 'close' );

		request.onreadystatechange = function () {

			if ( request.readyState == 4 ) {

				if ( request.status == 200 ) {

					callback( request.responseText );

				} else {

					console.log( 'Submission of model failed' );

				}

			}

		}

		request.send( params );

	};

};

function preInitModel( geometry, renderer, scene, object ) {
	
	// pre-initialize buffers

	renderer.initWebGLObjects( scene );

	// this makes videos black

	// pre-initialize shaders

	var i, material;
	
	for( i = 0; i < geometry.materials.length; i++ ) {

		material = geometry.materials[ i ][ 0 ];

		if ( ! ( material instanceof THREE.MeshFaceMaterial ) ) {

			if( !material.program ) {

				// dirty hack, otherwise some textures stay black
				
				//setTimeout( function() { renderer.initMaterial( material, scene.lights, scene.fog, object ); }, 250 );
				
			}

		}

	}


};

function preInitScene( result, renderer ) {

	renderer.initWebGLObjects( result.scene );
	
	var m, material;

	for ( m in result.materials ) {

		material = result.materials[ m ];
		if ( ! ( material instanceof THREE.MeshFaceMaterial ) ) {

			if( !material.program ) {

				// dirty hack, otherwise some textures stay black

				setTimeout( function() { renderer.initMaterial( material, result.scene.lights, result.scene.fog ); }, 250 );

			}

		}

	}

};

function preinitAnimal( animal, renderer, scene ) {
	
	//console.log( animal );
	
	renderer.initWebGLObjects( scene );
	
	// this makes weird things
	
	//var material = animal.mesh.materials[ 0 ];
	//setTimeout( function() { renderer.initMaterial( material, scene.lights, scene.fog, animal.mesh ); }, 100 );

};

function initLensFlares( where, position, sx, sy ) {

	var texture0 = THREE.ImageUtils.loadTexture( "files/textures/lensflare0.png" );
	var texture1 = THREE.ImageUtils.loadTexture( "files/textures/lensflare2.png" );
	var texture2 = THREE.ImageUtils.loadTexture( "files/textures/lensflare3.png" );
	
	where.lensFlare = new THREE.LensFlare( texture0, 700, 0.0, THREE.AdditiveBlending );

	where.lensFlare.add( texture1, 512, 0.0, THREE.AdditiveBlending );
	where.lensFlare.add( texture1, 512, 0.0, THREE.AdditiveBlending );
	where.lensFlare.add( texture1, 512, 0.0, THREE.AdditiveBlending );

	where.lensFlare.add( texture2,  60, 0.6, THREE.AdditiveBlending );
	where.lensFlare.add( texture2,  70, 0.7, THREE.AdditiveBlending );
	where.lensFlare.add( texture2, 120, 0.9, THREE.AdditiveBlending );
	where.lensFlare.add( texture2,  70, 1.0, THREE.AdditiveBlending );

	where.lensFlare.customUpdateCallback = lensFlareUpdateCallback;
	where.lensFlare.position.copy( position );

	where.lensFlareRotate = new THREE.Object3D();
	where.lensFlareRotate.addChild( where.lensFlare );

	where.lensFlareRotate.rotation.x = sx * Math.PI / 180;
	where.lensFlareRotate.rotation.y = sy * Math.PI / 180;

	where.scene.addChild( where.lensFlareRotate );

	return where.lensFlareRotate;
};


function lensFlareUpdateCallback( object ) {

	var flare, f, fl = object.lensFlares.length;
	var vecX = -object.positionScreen.x * 2;
	var vecY = -object.positionScreen.y * 2; 

	for( f = 0; f < fl; f++ ) {
   
		flare = object.lensFlares[ f ];
   
		flare.x = object.positionScreen.x + vecX * flare.distance;
		flare.y = object.positionScreen.y + vecY * flare.distance;

		flare.rotation = 0;

	}

	// hard coded stuff

	object.lensFlares[ 2 ].y += 0.025;
	object.lensFlares[ 3 ].rotation = object.positionScreen.x * 0.5 + 45 * Math.PI / 180;

};

function makeSceneStatic( scene ) {

	var i, l, object;
	
	for ( i = 0, l = scene.objects.length; i < l; i ++ ) {

		object = scene.objects[ i ];
		object.matrixAutoUpdate = false;
		object.updateMatrix();

	}

};

function hideColliders( scene ) {
	
	var i, l, mesh;

	for( i = 0, l = scene.collisions.colliders.length; i < l; i++ ) {

		mesh = scene.collisions.colliders[ i ].mesh;
		mesh.visible = false;
	}

};

function applyMaterial( result, ids, material ) {
	
	var i, id, n, l = ids.length;

	for ( i = 0; i < l; i++ ) {
		
		id = ids[ i ][ 0 ];
		n = ids[ i ][ 1 ];
		
		if ( result.objects[ id ] ) {
			
			result.objects[ id ].geometry.materials[ n ][ 0 ] = material;

		}
		
	}
	
};

/*
 * gee.js - http://georgealways.github.com/gee
 * 
 * George Michael Brower - http://georgemichaelbrower.com
 * Jono Brandel - http://jonobr1.com
 */
 // ==ClosureCompiler==
 // @output_file_name gee.min.js
 // @compilation_level ADVANCED_OPTIMIZATIONS
 // ==/ClosureCompiler==
 window['GEE'] = function(params) {

 	if ( !params ) {
 		params = {};
 	}

 	// Do we support canvas?
 	if ( !document.createElement('canvas').getContext ) {
 		if ( params.fallback ) { 
 			params.fallback();
 		}
 		return;
 	}	

 	var _this = this,
 		_keysDown = {},
 		_privateParts = 
 		 {
 			'ctx':		    undefined,
 			'domElement':   undefined,
 			'width':	    undefined,
 			'height':	    undefined,
 			'desiredFrameTime':    1E3/60,
 			'frameCount':   0,
 			'key':	        undefined,
 			'keyCode':      undefined,
 			'mouseX':       0,
 			'mouseY':       0,
 			'pmouseX':	    undefined,
 			'pmouseY':	    undefined,
 			'mousePressed': false
 		},
 		_actualFrameTime = undefined,
 		d; // shorthand for the dom element

 	var getOffset = function() {
 		var obj = d;
 		var x = 0, y = 0;
 		while (obj) {
 			y += obj.offsetTop;
 			x += obj.offsetLeft;
 			obj = obj.offsetParent;
 		}
 		offset = { x:x, y:y };
 	};

 	// Default parameters

 	if ( !params['context'] ) {
 		params['context'] = '2d';
 	}

 	if ( !params['width'] ) {
 		params['width'] = 500;
 	}

 	if ( !params['height'] ) {
 		params['height'] = 500;
 	}

 	// Create domElement, grab context

 	d = _privateParts['domElement'] = document.createElement('canvas');
 	_privateParts['ctx'] = d.getContext( params['context'] );

 	// Are we capable of this context?

 	if ( _privateParts['ctx'] == null) {
 		if ( params.fallback ) { 
 			params.fallback();
 		}
 		return;
 	}

 	// Set up width and height setters / listeners

 	if ( params['fullscreen'] ) {

 		var onResize = function() {
 			getOffset();
 			_privateParts['width'] = d['width'] = window.innerWidth;
 			_privateParts['height'] = d['height'] = window.innerHeight-4;
 		};
 		window.addEventListener( 'resize', onResize, false );
 		onResize();

 		if ( !params['container'] ) {
 			params['container'] = document['body'];
 		}
 		document.body.style.margin = '0px';
 		document.body.style.padding = '0px';

 	} else { 

 		getOffset();
 		_this.__defineSetter__('width', function(v) {
 			_privateParts['width'] = d['width'] = v;
 		});

 		_this.__defineSetter__('height', function(v) {
 			_privateParts['height'] = d['height'] = v;
 		});

 		_this['width'] = params['width'];
 		_this['height'] = params['height'];

 	}

 	// Put it where we talked about (if we talked about it).

 	if ( params['container'] ) {
 		params['container'].appendChild(d);
 		getOffset();
 	}	


 	var getter = function(n) {
 		_this.__defineGetter__(n, function() {
 			return _privateParts[n];
 		});
 	};

 	// Would love to reduce this to params.

 	getter('ctx');
 	getter('width');
 	getter('height');
 	getter('frameCount');
 	getter('key');
 	getter('keyCode');
 	getter('mouseX');
 	getter('mouseY');
 	getter('pmouseX');
 	getter('pmouseY');
 	getter('mousePressed');

 	var n = function() {};

 	// TODO: Ensure data type
 	_this['loop'] = true;

 	// TODO: Ensure data type
 	_this['keyup'] = n;
 	_this['keydown'] = n;
 	_this['draw'] = n;
 	_this['mousedown'] = n;
 	_this['mouseup'] = n;
 	_this['mousemove'] = n;
 	_this['mousedrag'] = n;

 	// Custom Getters & Setters

 	_this.__defineGetter__('frameRate', function(v) {
 		return 1E3/_actualFrameTime;
 	});

 	_this.__defineGetter__('frameTime', function(v) {
 		return _actualFrameTime;
 	});

 	_this.__defineGetter__('keyPressed', function(v) {
 		for (var i in _keysDown) {
 			if (_keysDown[i]) {
 				return true;
 			}
 		}
 		return false;
 	});

 	_this.__defineSetter__('frameTime', function(v) {
 		_privateParts['desiredFrameTime'] = v;
 	});

 	_this.__defineSetter__('frameRate', function(v) {
 		_privateParts['desiredFrameTime'] = k/v;
 	});

 	// Listeners

 	d.addEventListener('mouseenter', function(e) {
 		getOffset();
 	}, false);

 	var fireMouseMove = function(e) {
 		_this['mousemove']();
 	};

 	var updateMousePosition = function(e) {
 		var x = e.pageX - offset.x;
 		var y = e.pageY - offset.y;
 		if (_privateParts['pmouseX'] == undefined) {
 			_privateParts['pmouseX'] = x;
 			_privateParts['pmouseY'] = y;
 		} else { 
 			_privateParts['pmouseX'] = _privateParts['mouseX'];
 			_privateParts['pmouseY'] = _privateParts['mouseY'];
 		}
 		_privateParts['mouseX'] = x;
 		_privateParts['mouseY'] = y;
 	}

 	window.addEventListener('mousemove', updateMousePosition, false);
 	window.addEventListener('mousemove', fireMouseMove, false);

 	d.addEventListener('mousedown', function() {
 		_privateParts['mousePressed'] = true;
 		_this['mousedown']();
 		d.addEventListener('mousemove', _this['mousedrag'], false);
 		d.removeEventListener('mousemove', fireMouseMove, false);
 	}, false);

 	d.addEventListener('mouseup', function() {
 		_privateParts['mousePressed'] = false;
 		_this['mouseup']();
 		d['removeEventListener']('mousemove', _this['mousedrag'], false);
 		d.addEventListener('mousemove', fireMouseMove, false);
 	}, false);

 	window.addEventListener('keydown', function(e) {
 		var kc = e.keyCode;
 		_privateParts['key'] = String.fromCharCode(kc); // Kinda busted.
 		_privateParts['keyCode'] = kc;
 		_keysDown[kc] = true;
 		_this['keydown']();
 	}, false);

 	window.addEventListener('keyup', function(e) {
 		var kc = e.keyCode;
 		_privateParts['key'] = String.fromCharCode(kc); // Kinda busted.
 		_privateParts['keyCode'] = kc;
 		_keysDown[kc] = false;
 		_this['keyup']();
 	}, false);

 	// Internal loop.

 	var requestAnimationFrame = (function() {
       return  window.requestAnimationFrame       || 
               window.webkitRequestAnimationFrame || 
               window.mozRequestAnimationFrame    || 
               window.oRequestAnimationFrame      || 
               window.msRequestAnimationFrame     || 
               function (callback) {
                 window.setTimeout(callback, _actualFrameTime);
               };
     })();

 	_idraw = function() {

 		if ( _this['loop'] ) {
 			requestAnimationFrame( _idraw );
 		}

 		_privateParts['frameCount']++;
 		var prev = new Date().getTime();

 		_this['draw']();

 		var delta = new Date().getTime() - prev;

 		if (delta > _privateParts['desiredFrameTime']) { 
 			_actualFrameTime = delta;
 		} else {
 			_actualFrameTime = _privateParts['desiredFrameTime'];
 		}

 	};

 	_idraw();

 }
/**
 * @author george michael brower / http://georgemichaelbrower.com/
 * @author jonobr1 / http://jonobr1.com/
 * 
 * Heavily modified
 */

function loadSVG(location, success, fail) {

	var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange=function() {

			if(xmlhttp.readyState == 4) {
				if(xmlhttp.status == 200) {
					if(xmlhttp.responseXML == null) {
						if(fail != undefined) fail.call(this, location);
					} else {
						var node = xmlhttp.responseXML.getElementsByTagName("svg").item(0);
						var svg = new SVG(node);
						svg.filename = location;
						success.call(this, svg, location);
					}
				} else {
					if(fail != undefined) fail.call(this, location);
				}
			}
		}
	xmlhttp.open("GET", location, true);
	xmlhttp.send(null);
}

var SVG = function(node) {

	this.filename = "";
	this.children = [];
	
	// TODO interpret things other than pixels.
	
	var w = node.getAttribute("width");
	var h = node.getAttribute("height");
	
	this.width = w == null ? 0 : parseFloat(w.replace("px", ""));
	this.height = h == null ? 0 : parseFloat(h.replace("px", "")); 
	
	for (var i in node.childNodes) {

		if (!node.childNodes.item(i).getAttribute) continue;

		var toAdd;
		if (node.childNodes.item(i).nodeName == "g") {
			toAdd = new SVG(node.childNodes.item(i)); 
		} else {
			toAdd = new Path(node.childNodes.item(i));
		}

		this.children.push(toAdd);
	}

	// Draws every path in this SVG to the specified context.
	this.draw = function(context) {
		for(var i in this.children) {
			this.children[i].draw(context);
		}
	};

	this.__defineGetter__('path', function() {
		
	});
}

var Path = function(element) {

	this.element = element;
	this.commands = commands(element);
	this.lineWidth = parseLineWidth(element);
	this.strokeStyle = parseStrokeStyle(element);
	this.fillStyle = parseFillStyle(element);

	// for at
	this.totalLength = 0;
	this.lengths = [];
	this.tlengths = [];

	var turtle = function() {
		this.x;
		this.y;
		this.x1;
		this.y1;
		this.x2;
		this.y2;
		this.reset = function() {
			this.x = this.y = this.x1 = this.y1 = this.x2 = this.y2 = 0;
		}
		this.reset();
	}

	// Draws this entire path to the specified context.
	this.draw = function(context) {
		this.style(context);
		context.beginPath();
		this.shape(context);
		this.end(context);
		
	};

	// Returns all anchor points in an array
	this.getAnchorPoints = function() {
		var anchors = [];
		for(var i in this.commands) {
			anchors.push(this.commands[i].getAnchorPoints(turtle));
		}
		return anchors;
	};

	// Calls canvas shape methods such as moveTo(), lineTo(), bezierCurveTo() based on the commands in this path.
	this.shape = function(context) {
		for(var i in this.commands) {
			this.commands[i].shape(turtle, context);
		}
	};
	
	this.lerp = function(a,b,c,d,t) {
			var t1 = 1.0 - t;
			return a*t1*t1*t1 + 3*b*t*t1*t1 + 3*c*t*t*t1 + d*t*t*t;
	};

	this.at = function(t, c) {
		
		var rx, ry;
		if(this.lengths.length == 0) {
			this.calcLengths(c);
		}

		var tt = this.tlengths[0];
		var i = 0;

		while(t > tt) {
			i++;
			tt += this.tlengths[i];
		}

		pt = tt - this.tlengths[i];

		var it = this.map(t, pt, tt, 0, 1);

		for(var j = 0; j <= i; j++) {
			this.commands[j].shape(turtle, c);
		}
		var px = turtle.x;
		var py = turtle.y;

		this.commands[i+1].shape(turtle, c);

		rx = this.lerp(px, turtle.x1, turtle.x2, turtle.x, it);
		ry = this.lerp(py, turtle.y1, turtle.y2, turtle.y, it);

		return { x:rx, y:ry };	
	};

	this.map = function(v, i1, i2, o1, o2) {
		return o1 + (o2 - o1) * ((v - i1) / (i2 - i1));
	}

	this.calcLengths = function(c) {

		var rx,ry;
		var prx, pry;

		// go through and get the length of the entire path
		// as well as the lengths of each indiv. path

		var curLength = 0;

		var lengthAccuracy = 0.001;

		this.commands[0].shape(turtle, c);

		var px = prx = turtle.x;
		var py = pry = turtle.y;

		for (var i = 1; i < this.commands.length; i++) {

			curLength = 0;
			px = turtle.x;
			py = turtle.y;
			this.commands[i].shape(turtle, c);

			for (var tt = 0; tt <=1; tt+= lengthAccuracy) {

				rx = this.lerp(px, turtle.x1, turtle.x2, turtle.x, tt);
				ry = this.lerp(py, turtle.y1, turtle.y2, turtle.y, tt);

				curLength += this.dist(rx, ry, prx, pry);

				prx = rx;
				pry = ry;
			}

			this.lengths.push(curLength);
			this.totalLength += curLength;

		}

		for (var j = 0; j < this.lengths.length; j++) {
			this.tlengths.push(this.lengths[j]/this.totalLength);
		}
	}

	this.dist = function (x, y, xx, yy) {
		return Math.sqrt((x - xx) * (x - xx) + (y - yy) * (y - yy));
	};

	// Sets the drawing style of the canvas context based on the styles in this Path.
	this.style = function(context) {

		if (this.lineWidth != null) {
			context.lineWidth = this.lineWidth;
		} 

		if (this.strokeStyle != null) {
			context.strokeStyle = this.strokeStyle;
			if (this.lineWidth == undefined) {
			context.lineWidth = 1;
			}
		}

		if (this.fillStyle != null) {
			context.fillStyle = this.fillStyle;
		}

	};
	
	// Calls context.fill() and/or context.stroke() depending on the styles in this Path.
	this.end = function(context) {
		if (this.fillStyle != null) context.fill();
		if (this.strokeStyle != null) context.stroke();
	}

}

var parseLineWidth = function(element) {
	var a = element.attributes.getNamedItem("stroke-width");
	return a == null ? null : parseFloat(a.nodeValue);
}

var parseStrokeStyle = function(element) {
	 var a = element.attributes.getNamedItem("stroke");
	 return a == null ? null : a.nodeValue;
}

var parseFillStyle = function(element) {

	var a = element.attributes.getNamedItem("fill");
	if (a == null) { 
		var s = element.attributes.getNamedItem("stroke");
		if (s != null) {
			return null;
		} else { 
			return "#000000";
		}
	} else { 
		if (a.nodeValue == "none") return null;
		return a.nodeValue;
	}
}

var Command = function(type, data) {

	this.type = type;
	this.data = data;
	this.debug = false;

	// Calls context shape methods such as moveTo(), lineTo(), bezierCurveTo(), etc.
	this.shape = function(turtle, c) {

		var px = turtle.x;
		var py = turtle.y;

		if (this.type == "M") {
		
			turtle.x = this.data[0];
			turtle.y = this.data[1];
			if (c) c.moveTo(turtle.x, turtle.y);

		} else if (this.type == "C") {

			turtle.x = this.data[4];
			turtle.y = this.data[5];
			if (c) c.bezierCurveTo(turtle.x1 = this.data[0],
								   turtle.y1 = this.data[1],
								   turtle.x2 = this.data[2],
								   turtle.y2 = this.data[3],
								   turtle.x,
								   turtle.y);

		} else if (this.type == "c") {

			if (c) c.bezierCurveTo(turtle.x1 = turtle.x+this.data[0],
								   turtle.y1 = turtle.y+this.data[1],
								   turtle.x2 = turtle.x+this.data[2],
								   turtle.y2 = turtle.y+this.data[3],
								   turtle.x += this.data[4],
								   turtle.y += this.data[5]);

		} else if (this.type == "S") {

			turtle.x = this.data[2];
			turtle.y = this.data[3];
			var dx = turtle.x - turtle.x2;
			var dy = turtle.y - turtle.y2;
			if (c) c.bezierCurveTo(turtle.x1 = turtle.x+dx,
								   turtle.y1 = turtle.y+dy,
								   turtle.x2 = this.data[0],
								   turtle.y2 = this.data[1],
								   turtle.x,
								   turtle.y);

		} else if (this.type == "s") {

			var dx = turtle.x - turtle.x2;
			var dy = turtle.y - turtle.y2;
			if (c) c.bezierCurveTo(turtle.x1 = turtle.x+dx, 
								   turtle.y1 = turtle.y+dy, 
								   turtle.x2 = turtle.x+this.data[0], 
								   turtle.y2 = turtle.y+this.data[1], 
								   turtle.x += this.data[2], 
								   turtle.y += this.data[3]);

		} else if (this.type == "L") {

			turtle.x1 = turtle.x;
			turtle.y1 = turtle.y;
			if (c) c.lineTo(turtle.x = this.data[0], turtle.y = this.data[1]);
			turtle.x2 = turtle.x;
			turtle.y2 = turtle.y;

		} else if (this.type == "l") {

			turtle.x1 = turtle.x;
			turtle.y1 = turtle.y;
			if (c) c.lineTo(turtle.x += this.data[0], turtle.y += this.data[1]);
			turtle.x2 = turtle.x;
			turtle.y2 = turtle.y;

		} else if (this.type == "H") {

			turtle.x1 = turtle.x;
			turtle.y1 = turtle.y;
			if (c) c.lineTo(turtle.x = this.data[0], turtle.y)
			turtle.x2 = turtle.x;
			turtle.y2 = turtle.y;

		} else if (this.type == "h") {

			turtle.x1 = turtle.x;
			turtle.y1 = turtle.y;
			if (c) c.lineTo(turtle.x += this.data[0], turtle.y)		
			turtle.x2 = turtle.x;
			turtle.y2 = turtle.y;

		} else if (this.type == "V") {

			turtle.x1 = turtle.x;
			turtle.y1 = turtle.y;
			if (c) c.lineTo(turtle.x, turtle.y = this.data[0]);
			turtle.x2 = turtle.x;
			turtle.y2 = turtle.y;

		} else if (this.type == "v") {

			turtle.x1 = turtle.x;
			turtle.y1 = turtle.y;
			if (c) c.lineTo(turtle.x, turtle.y += this.data[0]); 
			turtle.x2 = turtle.x;
			turtle.y2 = turtle.y;

		} else if (this.type == "z") {

			c.closePath();

		} else {

			if(console) console.log("unrecognized command " + this.type);

		}

		if (c){ 
			c.strokeStyle = "#000000";
			c.lineWidth = 1;
			if (this.debug) {
				c.strokeRect(turtle.x - 1.5, turtle.y - 1.5, 3, 3);
				c.beginPath();
				c.moveTo(turtle.px, turtle.py);
				c.lineTo(turtle.x1, turtle.y1);
				c.closePath();
				c.stroke();
			}
		}	
	}
}

// Utility functions
var commands = function(element) {

	if (element.nodeName.toLowerCase() == "path") {
		return commandsFromD(element.getAttribute("d"));
	}

	if (element.nodeName.toLowerCase() == "polygon") {
		return commandsFromPoints(element.getAttribute("points"));
	}

	if (element.nodeName.toLowerCase() == "line") {
		return commandsFromLine(element);
	}

	if (element.nodeName.toLowerCase() == "rect") {
		return commandsFromRect(element);
	}

	return [];

}

// Returns an array of commands as interpreted by the "d" attribute of a path.
var commandsFromD = function(d) {

	var toReturn = [];
	var commands = d.match(/[a-zA-Z][0-9\.\-\,]+/g);

	for (var i = 0; i < commands.length; i++) {

		var type = commands[i].charAt(0);

		// Dirty time.
		var commandData = commands[i].substr(1);
			commandData = commandData.replace(/\-/g, ",-")

		if (commandData.charAt(0) == ",") {
			commandData = commandData.substr(1);
		}

			commandData = commandData.split(",");

		for (var j = 0; j < commandData.length; j++) {
			commandData[j] = parseFloat(commandData[j]);
		}

		toReturn.push(new Command(type, commandData));

	}

	return toReturn;
}

var commandsFromLine = function(element) {

	var toReturn = [];
	var x1 = parseFloat(element.getAttribute("x1"));
	var x2 = parseFloat(element.getAttribute("x2"));
	var y1 = parseFloat(element.getAttribute("y1"));
	var y2 = parseFloat(element.getAttribute("y2"));
	toReturn.push(new Command("M", [x1,y1]));
	toReturn.push(new Command("L", [x2,y2]));
	return toReturn;
}

// Returns an array of commands as interpreted by the "points" attribute of a polygon.
var commandsFromPoints = function(pointAttribute) {
	//pointAttribute = pointAttribute.replace(/\,\-/g, "-");

	var shouldBeComma = true;
	if (pointAttribute.indexOf(",") == -1) {
		for (var i = 0; i < pointAttribute.length; i++) {
			var c = pointAttribute.charAt(i);
			if (c == " ") {
				if (shouldBeComma) {
					pointAttribute = pointAttribute.setCharAt(i, ",");
				}
				shouldBeComma = !shouldBeComma;
			}
		}
	}

	pointAttribute = "M"+pointAttribute;
	pointAttribute = pointAttribute.replace(/ /g, "L") + "z";
	var toReturn = commandsFromD(pointAttribute);
	return toReturn;
}

String.prototype.setCharAt = function(index,chr) {

	if(index > this.length-1) return str;
	return this.substr(0,index) + chr + this.substr(index+1);
}

var commandsFromRect = function(element) {

	var toReturn = [];
	var x = parseFloat(element.getAttribute("x"));
	var y = parseFloat(element.getAttribute("y"));
	var w = parseFloat(element.getAttribute("width"));
	var h = parseFloat(element.getAttribute("height"));
	toReturn.push(new Command("M", [x,y]));
	toReturn.push(new Command("h", [w]));
	toReturn.push(new Command("v", [h]));
	toReturn.push(new Command("h", [-w]));
	toReturn.push(new Command("v", [-h]));
	return toReturn;
}
/**
 * @author jonobr1 / http://jonobr1.com/
 * For js/sections/LastPageSection.js
 */

var WonderWall = WonderWall || {};
WonderWall.Point = function(gee, x, y) {

  // Private variables
  var that = this;
  var g = gee.ctx;
  var ox = x;
  var oy = y;
  var angle = 0;

  // Public variables
  this.x = x;
  this.y = y;
  this.r = .15;
  this.threshold = 0.1;
  this.easing = 0.125;
  this.updating = false;
  this.angle = 0;

  this.update = function() {

    if(this.updating) {
      
      var dx = gee.mouseX - ox;
      var dy = gee.mouseY - oy;
      var d = Math.sqrt(dx * dx + dy * dy);

        var s = dx;
        var c = dy;

        x = ox + (s * this.r);
        y = oy + (c * this.r);

        this.easing = .0625;
        
    } else {

      x = ox;
      y = oy;
      angle = 0;

      this.easing = 0.125;
    }

    this.x = this.ease(this.x, x, this.easing);
    this.y = this.ease(this.y, y, this.easing);
    this.angle = this.ease(this.angle, angle, this.easing);
  };

  this.setPosition = function(x, y) {
    ox = x;
    oy = y;
  };
  this.getOriginPosition = function() {
    return { x: ox, y: oy };
  };

  this.getPoint = function() {
    return { x: this.x, y: this.y };
  };
};
WonderWall.Point.prototype.ease = function(cur, tar, inc) {
  var dif = tar - cur;
  if(Math.abs(dif) < (inc / 100.0)) cur = tar;
  else cur += dif * inc;
  return cur;
};

WonderWall.Pentagon = function(gee, x, y, r) {

  var that = this;
  var g = gee.ctx;

  this.separate = false;
  this.showFill = true;
  this.showStroke = true;
  this.insides = false;

  this.x = x;
  this.y = y;
  if(this.x == undefined || this.x == null || this.x == NaN) {
    this.x = gee.width / 2.0;
  }
  if(this.y == undefined || this.y == null || this.y == NaN) {
    this.y = gee.height / 2.0;
  }

  var coords = this.generatePoints(this.x, this.y, r, 5);
  var points = [];

  for(var i = 0; i < coords.length; i++) {
    var coord = coords[i];
    points.push(new WonderWall.Point(gee, coord.x, coord.y));
  }

  this.update = function() {

    this.x = gee.width / 2.0;
    this.y = gee.height / 2.0;

    var coords = this.generatePoints(this.x, this.y, r, 5)

    if(!this.separate) this.separate = true;
    for(var i = 0; i < points.length; i++) {
      var point = points[i];
      var coord = coords[i];
      point.update();
      var op = point.getOriginPosition();
      if(coord.x != op.x || coord.y != op.y) {
        point.setPosition(coord.x, coord.y);
      }
    }
    return this;
  };

  this.render = function() {

    if(this.insides && this.showStroke) {
      for(var i = 0; i < points.length; i++) {
        var point = points[i];
        if(!this.separate) {
          point.update();
        }
        g.beginPath();
        g.moveTo(this.x, this.y);
        g.lineTo(point.x, point.y);
        g.stroke();
      }
    }

    g.beginPath();
    for(var i = 0; i < points.length; i++) {
      var point = points[i];
      if(!this.separate) {
        point.update();
      }
      if(i < 1) {
        g.moveTo(point.x, point.y);
      } else {
        g.lineTo(point.x, point.y);
      }
    }
    g.closePath();
    if(this.showFill) g.fill();
    if(this.showStroke) g.stroke();
  };

  this.setUpdate = function(b) {
    for(var i = 0; i < points.length; i++) {
      var point = points[i];
      point.updating = b;
    }
  };

  this.setUpdatePoint = function(b, n) {
    var point = points[n];
    point.updating = b;
  }

  this.setRadius = function(r) {
    for(var i = 0; i < points.length; i++) {
      var point = points[i];
      point.r = r;
    }
  };

  this.getPoints = function() {
    return points;
  };

};
WonderWall.Pentagon.prototype.generatePoints = function(x, y, a, l) {
  var points = [];
  for(var i = 0; i < l; i++) {
    var xpos = a * Math.sin(i / l * 2.0 * Math.PI) + x;
    var ypos = -a * Math.cos(i / l * 2.0 * Math.PI) + y;
    points.push({x: xpos, y: ypos});
  }
  return points;
};
/**
 * @author jonobr1 / http://jonobr1.com/
 * For js/sections/LastPageSection.js
 */

// Dependent on swell.js
function Heart(gee, src, x, y) {

  // Heart can have drips or boils

  var that = this;
  var g = gee.ctx;

  // Public variables
  this.x = x;
  this.y = y;
  if(this.x == undefined || this.x == null || this.x || this == NaN) {
    this.x = gee.width / 2.0;
  }
  if(this.y == undefined || this.y == null || this.y || this == NaN) {
    this.y = gee.height / 2.0;
  }

  // Private vars
  var svg;
  var ready = false;

  this.update = function() {
    return this;
  }

  this.render = function() {
    if(ready) {
      g.save();
      g.translate(this.x, this.y);
      g.save();
      g.translate(-this.width / 2.0, -this.height / 2.0)
      svg.draw(g);
      g.restore();
      g.restore();
    }
  };

  var success = function(s, location) {
    svg = s;
    that.source = location;
    that.width = svg.width;
    that.height = svg.height;
    ready = true;
  }
  var fail = function() {
    // doh!
  }

  loadSVG(src, success, fail);
}
var ClearEffect = function ( shared ) {

	SequencerItem.call( this );

	var camera, scene,
	renderer = shared.renderer, renderTarget = shared.renderTarget;

	this.init = function( callback ) {

		camera = new THREE.Camera( 60, 1, 1, 10000 );
		camera.position.z = 2;

		scene = new THREE.Scene();

		// renderer.initMaterial( material, scene.lights, scene.fog, object );

	};

	this.update = function ( progress, delta, time ) {

		renderer.clear();

		var gl = renderer.getContext();

		gl.bindFramebuffer( gl.FRAMEBUFFER, renderTarget.__webglFramebuffer );
		gl.viewport( 0, 0, renderTarget.width, renderTarget.height );
		gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT );

		//renderer.render( scene, camera, renderTarget, true );

	};

};

ClearEffect.prototype = new SequencerItem();
ClearEffect.prototype.constructor = ClearEffect;

var FadeInEffect = function ( hex, shared ) {

	SequencerItem.call( this );

	var camera, scene, material, object,
	renderer = shared.renderer, renderTarget = shared.renderTarget;

	this.init = function( callback ) {

		camera = new THREE.Camera( 60, 1, 1, 10000 );
		camera.position.z = 2;

		scene = new THREE.Scene();

		material = new THREE.MeshBasicMaterial( { color: hex, opacity: 0, depthTest: false } );

		object = new THREE.Mesh( new THREE.Plane( 3, 3 ), material );
		scene.addObject( object );

		// renderer.initMaterial( material, scene.lights, scene.fog, object );

	};

	this.update = function ( progress, delta, time ) {

		material.opacity = 1 - progress;
		renderer.render( scene, camera, renderTarget );

	};

};

FadeInEffect.prototype = new SequencerItem();
FadeInEffect.prototype.constructor = FadeInEffect;

var FadeOutEffect = function ( hex, shared ) {

	SequencerItem.call( this );

	var camera, scene, material, object,
	renderer = shared.renderer, renderTarget = shared.renderTarget;

	this.init = function( callback ) {

		camera = new THREE.Camera( 60, 1, 1, 10000 );
		camera.position.z = 2;

		scene = new THREE.Scene();

		material = new THREE.MeshBasicMaterial( { color: hex, opacity: 1, depthTest: false } );

		object = new THREE.Mesh( new THREE.Plane( 3, 3 ), material );
		scene.addObject( object );

		// renderer.initMaterial( material, scene.lights, scene.fog, object );

	};

	this.update = function ( progress, delta, time ) {

		material.opacity = progress;
		renderer.render( scene, camera, renderTarget );

	};

};

FadeOutEffect.prototype = new SequencerItem();
FadeOutEffect.prototype.constructor = FadeOutEffect;

var RenderEffect = function ( shared ) {

	SequencerItem.call( this );

	var camera, scene, object,
	renderer = shared.renderer, renderTarget = shared.renderTarget;

	this.init = function () {

		camera = new THREE.Camera();
		camera.position.z = 200;
		camera.projectionMatrix = THREE.Matrix4.makeOrtho( shared.baseWidth / - 2, shared.baseWidth / 2, shared.baseHeight / 2, shared.baseHeight / - 2, - 10000, 10000 );

		scene = new THREE.Scene();

		var material = new THREE.MeshBasicMaterial( { map: renderTarget, depthTest: false } );
		object = new THREE.Mesh( new THREE.Plane( shared.baseWidth, shared.baseHeight ), material );
		object.scale.y = - 1; // TODO: HACK
		object.doubleSided = true;
		scene.addObject( object );

		// renderer.initMaterial( material, scene.lights, scene.fog, object );

	};

	this.update = function ( progress, delta, time ) {

		renderer.render( scene, camera );

	};

};

RenderEffect.prototype = new SequencerItem();
RenderEffect.prototype.constructor = RenderEffect;

var NoiseEffect = function ( shared, nIntensity, sIntensity, sCount ) {

	SequencerItem.call( this );

	var camera, scene, material, shader, uniforms,
	renderer = shared.renderer, renderTarget = shared.renderTarget;

	this.init = function () {

		camera = new THREE.Camera();
		camera.projectionMatrix = THREE.Matrix4.makeOrtho( shared.baseWidth / - 2, shared.baseWidth / 2, shared.baseHeight / 2, shared.baseHeight / - 2, - 10000, 10000 );
		camera.position.z = 100;

		scene = new THREE.Scene();

		shader = THREE.ShaderUtils.lib[ "film" ];

		uniforms = THREE.UniformsUtils.clone( shader.uniforms );
		uniforms[ "tDiffuse" ].texture = renderTarget;

		material = new THREE.MeshShaderMaterial( {
			uniforms: uniforms,
			vertexShader: shader.vertexShader,
			fragmentShader: shader.fragmentShader
		} );

		uniforms.grayscale.value = 0;
		if ( nIntensity !== undefined ) uniforms.nIntensity.value = nIntensity;
		if ( sIntensity !== undefined ) uniforms.sIntensity.value = sIntensity;
		if ( sCount !== undefined ) uniforms.sCount.value = sCount;

		var quad = new THREE.Mesh( new THREE.Plane( shared.baseWidth, shared.baseHeight ), material );
		quad.position.z = - 500;
		scene.addObject( quad );

		// renderer.initMaterial( material, scene.lights, scene.fog, quad );

	};

	this.update = function ( progress, delta, time ) {

		uniforms.time.value = ( time * 0.01 ) % 10000;
		renderer.render( scene, camera, renderTarget, false );

	};

}

NoiseEffect.prototype = new SequencerItem();
NoiseEffect.prototype.constructor = NoiseEffect;

var BloomEffect = function ( shared, strength ) {

	SequencerItem.call( this );

	var camera, scene, materialScreen, shader, 
	screenUniforms, convolutionUniforms,
	materialScreen, materialConvolution,
	renderTarget2, renderTarget3,
	quad,
	blurx, blury,
	renderer = shared.renderer, 
	renderTarget = shared.renderTarget;

	this.init = function () {

		camera = new THREE.Camera();
		camera.projectionMatrix = THREE.Matrix4.makeOrtho( shared.baseWidth / - 2, shared.baseWidth / 2, shared.baseHeight / 2, shared.baseHeight / - 2, - 10000, 10000 );
		camera.position.z = 100;

		scene = new THREE.Scene();

		var pars = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBFormat };
		renderTarget2 = new THREE.WebGLRenderTarget( 256, 512, pars );
		renderTarget3 = new THREE.WebGLRenderTarget( 512, 256, pars );

		var screenShader = THREE.ShaderUtils.lib[ "screen" ];
		screenUniforms = THREE.UniformsUtils.clone( screenShader.uniforms );

		screenUniforms[ "tDiffuse" ].texture = renderTarget;
		screenUniforms[ "opacity" ].value = ( strength !== undefined ) ? strength : 1;

		materialScreen = new THREE.MeshShaderMaterial( {

			uniforms: screenUniforms,
			vertexShader: screenShader.vertexShader,
			fragmentShader: screenShader.fragmentShader,
			blending: THREE.AdditiveBlending,
			transparent: true

		} );

		var convolutionShader = THREE.ShaderUtils.lib[ "convolution" ];
		convolutionUniforms = THREE.UniformsUtils.clone( convolutionShader.uniforms );

		blurx = new THREE.Vector2( 0.001953125, 0.0 ),
		blury = new THREE.Vector2( 0.0, 0.001953125 );

		convolutionUniforms[ "tDiffuse" ].texture = renderTarget;
		convolutionUniforms[ "uImageIncrement" ].value = blurx;
		convolutionUniforms[ "cKernel" ].value = THREE.ShaderUtils.buildKernel( 4.0 );

		materialConvolution = new THREE.MeshShaderMaterial( {

			uniforms: convolutionUniforms,
			vertexShader:   "#define KERNEL_SIZE 25.0\n" + convolutionShader.vertexShader,
			fragmentShader: "#define KERNEL_SIZE 25\n"   + convolutionShader.fragmentShader

		} );

		quad = new THREE.Mesh( new THREE.Plane( shared.baseWidth, shared.baseHeight ), materialConvolution );
		quad.position.z = -500;
		scene.addObject( quad );

		// renderer.initMaterial( materialScreen, scene.lights, scene.fog, quad );
		// renderer.initMaterial( materialConvolution, scene.lights, scene.fog, quad );

	};

	this.update = function ( progress, delta, time ) {

		// Render quad with blured scene into texture (convolution pass 1)

		quad.materials[ 0 ] = materialConvolution;

		convolutionUniforms.tDiffuse.texture = renderTarget;
		convolutionUniforms.uImageIncrement.value = blurx;

		renderer.render( scene, camera, renderTarget2, true );

		// Render quad with blured scene into texture (convolution pass 2)

		convolutionUniforms.tDiffuse.texture = renderTarget2;
		convolutionUniforms.uImageIncrement.value = blury;

		renderer.render( scene, camera, renderTarget3, true );

		// Render original scene with superimposed blur to texture

		quad.materials[ 0 ] = materialScreen;

		materialScreen.blending = THREE.AdditiveBlending;
		screenUniforms.tDiffuse.texture = renderTarget3;

		renderer.render( scene, camera, renderTarget, false );

	};

}

BloomEffect.prototype = new SequencerItem();
BloomEffect.prototype.constructor = BloomEffect;

var HeatEffect = function ( shared ) {

	SequencerItem.call( this );

	var camera, scene, material, shader, uniforms,
	renderer = shared.renderer, renderTarget = shared.renderTarget;

	this.init = function () {

		camera = new THREE.Camera();
		camera.projectionMatrix = THREE.Matrix4.makeOrtho( shared.baseWidth / - 2, shared.baseWidth / 2, shared.baseHeight / 2, shared.baseHeight / - 2, - 10000, 10000 );
		camera.position.z = 100;

		scene = new THREE.Scene();

		uniforms = {

			"time": { type: "f", value:0 },
			"map": { type: "t", value:0, texture: renderTarget },
			"sampleDistance": { type: "f", value: 1 / shared.baseWidth }

		};

		material = new THREE.MeshShaderMaterial( {

			uniforms: uniforms,
			vertexShader: [

				"varying vec2 vUv;",

				"void main() {",

					"vUv = vec2( uv.x, 1.0 - uv.y );",
					"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

				"}"

			].join("\n"),
			fragmentShader: [

				"uniform sampler2D map;",
				"varying vec2 vUv;",

				"void main() {",

					"vec4 color, tmp, add;",

					// "vec2 uv = vUv + vec2( sin( vUv.y * 100.0 ), sin( vUv.x * 100.0 )) * 0.0005;",
					"vec2 uv = vUv;",

					"color = texture2D( map, uv );",

					"float param1 = 0.0009;",
					"float param2 = 0.001;",

					"add = tmp = texture2D( map, uv + vec2( param1, param1 ));", 
					"if( tmp.r < color.r ) color = tmp;",

					"add += tmp = texture2D( map, uv + vec2( -param1, param1 ));",
					"if( tmp.r < color.r ) color = tmp;",

					"add += tmp = texture2D( map, uv + vec2( -param1, -param1 ));",
					"if( tmp.r < color.r ) color = tmp;",

					"add += tmp = texture2D( map, uv + vec2( param1, -param1 ));",
					"if( tmp.r < color.r ) color = tmp;",

					"add += tmp = texture2D( map, uv + vec2( param2, 0.0 ));",
					"if( tmp.r < color.r ) color = tmp;",

					"add += tmp = texture2D( map, uv + vec2( -param2, 0.0 ));",
					"if( tmp.r < color.r ) color = tmp;",

					"add += tmp = texture2D( map, uv + vec2( 0, param2 ));",
					"if( tmp.r < color.r ) color = tmp;",

					"add += tmp = texture2D( map, uv + vec2( 0, -param2 ));",
					"if( tmp.r < color.r ) color = tmp;",


					"gl_FragColor = color * color + add * 0.5 / 8.0;",

					// "gl_FragColor = texture2D( map, uv );",

				"}"

				].join("\n")

		} );


		var quad = new THREE.Mesh( new THREE.Plane( shared.baseWidth, shared.baseHeight ), material );
		quad.position.z = - 500;
		scene.addObject( quad );

		// renderer.initMaterial( material, scene.lights, scene.fog, quad );

	};

	this.update = function ( progress, delta, time ) {

		uniforms.time.value = time * 0.01;
		renderer.render( scene, camera, renderTarget, false );

	};

}

HeatEffect.prototype = new SequencerItem();
HeatEffect.prototype.constructor = HeatEffect;

var PaintEffect = function ( shared ) {

	SequencerItem.call( this );

	var camera, scene, material, shader, uniforms,
	renderer = shared.renderer, renderTarget = shared.renderTarget;

	this.init = function () {

		camera = new THREE.Camera();
		camera.projectionMatrix = THREE.Matrix4.makeOrtho( shared.baseWidth / - 2, shared.baseWidth / 2, shared.baseHeight / 2, shared.baseHeight / - 2, - 10000, 10000 );
		camera.position.z = 100;

		scene = new THREE.Scene();

		this.uniforms = {

			"map": { type: "t", value:0, texture: renderTarget },
			"screenWidth": { type: "f", value:shared.baseWidth },
			"screenHeight": { type: "f", value:shared.baseHeight },
			"vingenettingOffset": { type: "f", value: 0.87 },
			"vingenettingDarkening": { type: "f", value: 0.61 },
			"colorOffset": { type: "f", value: 0.95 },
			"colorFactor": { type: "f", value: 0 },
			"colorBrightness": { type: "f", value: 0 },
			"sampleDistance": { type: "f", value: 0.54 },
			"waveFactor": { type: "f", value: 0.00127 },
			"colorA": { type: "v3", value: new THREE.Vector3( 1, 1, 1 ) },
			"colorB": { type: "v3", value: new THREE.Vector3( 1, 1, 1 ) },
			"colorC": { type: "v3", value: new THREE.Vector3( 1, 1, 1 ) }
			
		};

		material = new THREE.MeshShaderMaterial( {

			uniforms: this.uniforms,
			vertexShader: [

			"varying vec2 vUv;",

			"void main() {",

				"vUv = vec2( uv.x, 1.0 - uv.y );",
				"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

			"}"

			].join("\n"),

			fragmentShader: [

				"uniform float screenWidth;",
				"uniform float screenHeight;",
				"uniform float vingenettingOffset;",
				"uniform float vingenettingDarkening;",
				"uniform float colorOffset;",
				"uniform float colorFactor;",
				"uniform float sampleDistance;",
				"uniform float colorBrightness;",
				"uniform float waveFactor;",
				"uniform vec3 colorA;",
				
				
				"uniform sampler2D map;",
				"varying vec2 vUv;",
	
				"void main() {",
	
					"vec4 color, org, tmp, add;",
					"float sample_dist, f;",
					"vec2 vin;",				
					"vec2 uv = vUv;",
					
					"add += color = org = texture2D( map, uv );",

					"vin = (uv - vec2(0.5)) * vec2( 1.4 /*vingenettingOffset * 2.0*/);",
					"sample_dist =(dot( vin, vin ) * 2.0);",
					
					"f = (waveFactor * 100.0 + sample_dist) * sampleDistance * 4.0;",
	
					"vec2 sampleSize = vec2(  1.0 / screenWidth, 1.0 / screenHeight ) * vec2(f);",
	
					"add += tmp = texture2D( map, uv + vec2(0.111964, 0.993712) * sampleSize);", 
					"if( tmp.b < color.b ) color = tmp;",
	
					"add += tmp = texture2D( map, uv + vec2(0.846724, 0.532032) * sampleSize);",
					"if( tmp.b < color.b ) color = tmp;",
	
					"add += tmp = texture2D( map, uv + vec2(0.943883, -0.330279) * sampleSize);",
					"if( tmp.b < color.b ) color = tmp;",
	
					"add += tmp = texture2D( map, uv + vec2(0.330279, -0.943883) * sampleSize);",
					"if( tmp.b < color.b ) color = tmp;",
	
					"add += tmp = texture2D( map, uv + vec2(-0.532032, -0.846724) * sampleSize);",
					"if( tmp.b < color.b ) color = tmp;",
	
					"add += tmp = texture2D( map, uv + vec2(-0.993712, -0.111964) * sampleSize);",
					"if( tmp.b < color.b ) color = tmp;",
	
					"add += tmp = texture2D( map, uv + vec2(-0.707107, 0.707107) * sampleSize);",
					"if( tmp.b < color.b ) color = tmp;",
	
					"uv = (uv - vec2(0.5)) * vec2( vingenettingOffset );",
					"color = color * vec4(2.0) - (add / vec4(8.0));",
					"color = color + (add / vec4(8.0) - color) * (vec4(1.0) - vec4(sample_dist * 0.5));",
					//"color = color + (add / vec4(8.0) - color) * (-vec4(sample_dist * 0.5));",
					"gl_FragColor = vec4( mix(color.rgb * color.rgb * vec3(colorOffset) + color.rgb, color.ggg * colorFactor - vec3( vingenettingDarkening ), vec3( dot( uv, uv ))), 1.0 );",
				"}"

				].join("\n")

		} );


		var quad = new THREE.Mesh( new THREE.Plane( shared.baseWidth, shared.baseHeight ), material );
		quad.position.z = - 500;
		scene.addObject( quad );

		// renderer.initMaterial( material, scene.lights, scene.fog, quad );

	};

	this.update = function ( progress, delta, time ) {

		renderer.render( scene, camera );

	};

};

PaintEffect.prototype = new SequencerItem();
PaintEffect.prototype.constructor = PaintEffect;

var PaintEffectPrairie = function ( shared ) {

	SequencerItem.call( this );

	var camera, scene, material, shader, uniforms,
	renderer = shared.renderer, renderTarget = shared.renderTarget;

	this.init = function () {

		camera = new THREE.Camera();
		camera.projectionMatrix = THREE.Matrix4.makeOrtho( shared.baseWidth / - 2, shared.baseWidth / 2, shared.baseHeight / 2, shared.baseHeight / - 2, - 10000, 10000 );
		camera.position.z = 100;

		scene = new THREE.Scene();

		this.uniforms = {

			"map": { type: "t", value:0, texture: renderTarget },
			"screenWidth": { type: "f", value:shared.baseWidth },
			"screenHeight": { type: "f", value:shared.baseHeight },
			"vingenettingOffset": { type: "f", value: 0.94 },
			"vingenettingDarkening": { type: "f", value: 0.36 },
			"colorOffset": { type: "f", value: 0 },
			"colorFactor": { type: "f", value: 0 },
			"colorBrightness": { type: "f", value: 0 },
			"sampleDistance": { type: "f", value: 0.49 },
			"waveFactor": { type: "f", value: 0.00161 },
			"colorA": { type: "v3", value: new THREE.Vector3( 1, 1, 1 ) },
			"colorB": { type: "v3", value: new THREE.Vector3( 1, 1, 1 ) },
			"colorC": { type: "v3", value: new THREE.Vector3( 1, 1, 1 ) }
			
		};

		material = new THREE.MeshShaderMaterial( {

			uniforms: this.uniforms,
			vertexShader: [

			"varying vec2 vUv;",

			"void main() {",

				"vUv = vec2( uv.x, 1.0 - uv.y );",
				"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

			"}"

			].join("\n"),

			fragmentShader: [

				"uniform float screenWidth;",
				"uniform float screenHeight;",
				"uniform float vingenettingOffset;",
				"uniform float vingenettingDarkening;",
				"uniform float colorOffset;",
				"uniform float colorFactor;",
				"uniform float sampleDistance;",
				"uniform float colorBrightness;",
				"uniform float waveFactor;",
				"uniform vec3 colorA;",
				
				
				"uniform sampler2D map;",
				"varying vec2 vUv;",
	
				"void main() {",
					"vec4 color, org, tmp, add;",
					"float sample_dist, f;",
					"vec2 vin;",				
					"vec2 uv = vUv;",
					
					"add += color = org = texture2D( map, uv );",


					"vin = (uv - vec2(0.5)) * vec2( 1.55 /*vingenettingOffset * 2.0*/);",
					"sample_dist =(dot( vin, vin ) * 2.0);",
					"f = (waveFactor * 100.0 + sample_dist) * sampleDistance * 4.0;",

				//	"vin = (uv - vec2(0.5)) * vec2(4.0);",
				//	"sample_dist = (dot( vin, vin ) * 2.0);",
					
				//	"f = (1.86 + sample_dist) * sampleDistance * 0.5;",
	
					"vec2 sampleSize = vec2(  1.0 / screenWidth, 1.0 / screenHeight ) * vec2(f);",
	
					"add += tmp = texture2D( map, uv + vec2(0.111964, 0.993712) * sampleSize);", 
					"if( tmp.g > color.g ) color = tmp;",
	
					"add += tmp = texture2D( map, uv + vec2(0.846724, 0.532032) * sampleSize);",
					"if( tmp.g > color.g ) color = tmp;",
	
					"add += tmp = texture2D( map, uv + vec2(0.943883, -0.330279) * sampleSize);",
					"if( tmp.g > color.g ) color = tmp;",
	
					"add += tmp = texture2D( map, uv + vec2(0.330279, -0.943883) * sampleSize);",
					"if( tmp.g > color.g ) color = tmp;",
	
					"add += tmp = texture2D( map, uv + vec2(-0.532032, -0.846724) * sampleSize);",
					"if( tmp.g > color.g ) color = tmp;",
	
					"add += tmp = texture2D( map, uv + vec2(-0.993712, -0.111964) * sampleSize);",
					"if( tmp.g > color.g ) color = tmp;",
	
					"add += tmp = texture2D( map, uv + vec2(-0.707107, 0.707107) * sampleSize);",
					"if( tmp.g > color.g ) color = tmp;",
	

					"uv = (uv - vec2(0.5)) * vec2( vingenettingOffset );",
					/* Blob */ 
					//"color = color * vec4(2.0) - (add / vec4(8.0));",
					//"color = color + (add / vec4(8.0) - color) * (vec4(1.0) - vec4(sample_dist * 0.5));",

					/* Blob and blur */ 
					"color = color + (add / vec4(8.0) - color) * (vec4(1.0) - vec4(sample_dist * 0.5));",
					/* Blur */ 
					//"color = (add / vec4(8.0));",
					"gl_FragColor = vec4( mix(color.rgb * color.rgb * vec3(colorOffset) + color.rgb, color.ggg * colorFactor - vec3( vingenettingDarkening ), vec3( dot( uv, uv ))), 1.0 );",
					"gl_FragColor = vec4(1.0) - (vec4(1.0) - gl_FragColor) * (vec4(1.0) - gl_FragColor);",
				"}"

				].join("\n")

		} );


		var quad = new THREE.Mesh( new THREE.Plane( shared.baseWidth, shared.baseHeight ), material );
		quad.position.z = - 500;
		scene.addObject( quad );

		// renderer.initMaterial( material, scene.lights, scene.fog, quad );

	};

	this.update = function ( progress, delta, time ) {

		renderer.render( scene, camera );

	};

};

PaintEffectPrairie.prototype = new SequencerItem();
PaintEffectPrairie.prototype.constructor = PaintEffectPrairie;

var PaintEffectDunes = function ( shared ) {

	SequencerItem.call( this );

	var camera, scene, material, shader, uniforms,
	renderer = shared.renderer, renderTarget = shared.renderTarget;

	this.init = function () {

		camera = new THREE.Camera();
		camera.projectionMatrix = THREE.Matrix4.makeOrtho( shared.baseWidth / - 2, shared.baseWidth / 2, shared.baseHeight / 2, shared.baseHeight / - 2, - 10000, 10000 );
		camera.position.z = 100;

		scene = new THREE.Scene();

		this.uniforms = {

			"map": { type: "t", value:0, texture: renderTarget },
			"screenWidth": { type: "f", value:shared.baseWidth },
			"screenHeight": { type: "f", value:shared.baseHeight },
			"vingenettingOffset": { type: "f", value: 1.2 },
			"vingenettingDarkening": { type: "f", value: 0.64 },
			"colorOffset": { type: "f", value: 0 },
			"colorFactor": { type: "f", value: 0 },
			"colorBrightness": { type: "f", value: 0 },
			"sampleDistance": { type: "f", value: 0.4 },
			"waveFactor": { type: "f", value: 0.00756 },
			"colorA": { type: "v3", value: new THREE.Vector3( 1, 1, 1 ) },
			"colorB": { type: "v3", value: new THREE.Vector3( 1, 1, 1 ) },
			"colorC": { type: "v3", value: new THREE.Vector3( 1, 1, 1 ) }
			
		};

		material = new THREE.MeshShaderMaterial( {

			uniforms: this.uniforms,
			vertexShader: [

			"varying vec2 vUv;",

			"void main() {",

				"vUv = vec2( uv.x, 1.0 - uv.y );",
				"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

			"}"

			].join("\n"),

			fragmentShader: [

				"uniform float screenWidth;",
				"uniform float screenHeight;",
				"uniform float vingenettingOffset;",
				"uniform float vingenettingDarkening;",
				"uniform float colorOffset;",
				"uniform float colorFactor;",
				"uniform float sampleDistance;",
				"uniform float colorBrightness;",
				"uniform float waveFactor;",
				"uniform vec3 colorA;",
				
				
				"uniform sampler2D map;",
				"varying vec2 vUv;",
	
				"void main() {",
	
						"vec4 color, org, tmp, add;",
					"float sample_dist, f;",
					"vec2 vin;",				
					"vec2 uv = vUv;",
					
					"add += color = org = texture2D( map, uv );",

					"vin = (uv - vec2(0.5)) * vec2(4.0);",
					"sample_dist =(dot( vin, vin ) * 2.0);",
					
					"f = (1.86 + sample_dist) * sampleDistance * 0.5;",
	
					"vec2 sampleSize = vec2(  1.0 / screenWidth, 1.0 / screenHeight ) * vec2(f);",
	
					"add += tmp = texture2D( map, uv + vec2(0.111964, 0.993712) * sampleSize);", 
					"if( tmp.b < color.b ) color = tmp;",
	
					"add += tmp = texture2D( map, uv + vec2(0.846724, 0.532032) * sampleSize);",
					"if( tmp.b < color.b ) color = tmp;",
	
					"add += tmp = texture2D( map, uv + vec2(0.943883, -0.330279) * sampleSize);",
					"if( tmp.b < color.b ) color = tmp;",
	
					"add += tmp = texture2D( map, uv + vec2(0.330279, -0.943883) * sampleSize);",
					"if( tmp.b < color.b ) color = tmp;",
	
					"add += tmp = texture2D( map, uv + vec2(-0.532032, -0.846724) * sampleSize);",
					"if( tmp.b < color.b ) color = tmp;",
	
					"add += tmp = texture2D( map, uv + vec2(-0.993712, -0.111964) * sampleSize);",
					"if( tmp.b < color.b ) color = tmp;",
	
					"add += tmp = texture2D( map, uv + vec2(-0.707107, 0.707107) * sampleSize);",
					"if( tmp.b < color.b ) color = tmp;",
	

					"uv = (uv - vec2(0.5)) * vec2( 0.94/* vingenettingOffset*/ );",
				//	"color = color + (add / vec4(8.0) - color) * (vec4(1.0) - vec4(sample_dist * 0.1));",
					"color = (add / vec4(8.0));",
					"gl_FragColor = vec4( mix(color.rgb, color.ggg * colorFactor - vec3( vingenettingDarkening ), vec3( dot( uv, uv ))), 1.0 );",
					"gl_FragColor = vec4(1.0) - (vec4(1.0) - gl_FragColor) * (vec4(1.0) - gl_FragColor);",
				"}"

				].join("\n")

		} );


		var quad = new THREE.Mesh( new THREE.Plane( shared.baseWidth, shared.baseHeight ), material );
		quad.position.z = - 500;
		scene.addObject( quad );

		// renderer.initMaterial( material, scene.lights, scene.fog, quad );

	};

	this.update = function ( progress, delta, time ) {

		renderer.render( scene, camera );

	};

};

PaintEffectDunes.prototype = new SequencerItem();
PaintEffectDunes.prototype.constructor = PaintEffectDunes;

var PaintDarkEffect = function ( shared ) {

	SequencerItem.call( this );

	var camera, scene, material, shader, uniforms,
	renderer = shared.renderer, renderTarget = shared.renderTarget;

	this.init = function () {

		camera = new THREE.Camera();
		camera.projectionMatrix = THREE.Matrix4.makeOrtho( shared.baseWidth / - 2, shared.baseWidth / 2, shared.baseHeight / 2, shared.baseHeight / - 2, - 10000, 10000 );
		camera.position.z = 100;

		scene = new THREE.Scene();

		uniforms = {

			"map": { type: "t", value:0, texture: renderTarget }

		};

		material = new THREE.MeshShaderMaterial( {

			uniforms: uniforms,
			vertexShader: [

			"varying vec2 vUv;",

			"void main() {",

				"vUv = vec2( uv.x, 1.0 - uv.y );",
				"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

			"}"

			].join("\n"),

			fragmentShader: [

				"uniform sampler2D map;",
				"varying vec2 vUv;",

				"void main() {",

					"vec4 color, tmp, add;",
					
					"vec2 uv = vUv + vec2( sin( vUv.y * 100.0 ), sin( vUv.x * 100.0 )) * 0.0005;",
					
					"color = texture2D( map, uv );",

					"add = tmp = texture2D( map, uv + vec2( 0.0015, 0.0015 ));", 
					"if( tmp.r < color.r ) color = tmp;",

					"add += tmp = texture2D( map, uv + vec2( -0.0015, 0.0015 ));",
					"if( tmp.r < color.r ) color = tmp;",

					"add += tmp = texture2D( map, uv + vec2( -0.0015, -0.0015 ));",
					"if( tmp.r < color.r ) color = tmp;",

					"add += tmp = texture2D( map, uv + vec2( 0.0015, -0.0015 ));",
					"if( tmp.r < color.r ) color = tmp;",

					"add += tmp = texture2D( map, uv + vec2( 0.002, 0.0 ));",
					"if( tmp.r < color.r ) color = tmp;",

					"add += tmp = texture2D( map, uv + vec2( -0.002, 0.0 ));",
					"if( tmp.r < color.r ) color = tmp;",

					"add += tmp = texture2D( map, uv + vec2( 0, 0.002 ));",
					"if( tmp.r < color.r ) color = tmp;",

					"add += tmp = texture2D( map, uv + vec2( 0, -0.002 ));",
					"if( tmp.r < color.r ) color = tmp;",

					"uv = (uv - vec2(0.5)) * vec2(0.7);",
					"gl_FragColor = vec4(mix(color.rgb * color.rgb * vec3(1.8), color.ggg * color.ggg - vec3(0.4), vec3(dot(uv, uv))), 1.0);",
					
				"}"

				].join("\n")

		} );


		var quad = new THREE.Mesh( new THREE.Plane( shared.baseWidth, shared.baseHeight ), material );
		quad.position.z = - 500;
		scene.addObject( quad );

		// renderer.initMaterial( material, scene.lights, scene.fog, quad );

	};

	this.update = function ( progress, delta, time ) {

		renderer.render( scene, camera, renderTarget, false );

	};

};

PaintDarkEffect.prototype = new SequencerItem();
PaintDarkEffect.prototype.constructor = PaintDarkEffect;

var OverlayEffect = function ( shared, texture ) {

	SequencerItem.call( this );

	var camera, scene, material, texture, object,
	renderer = shared.renderer, renderTarget = shared.renderTarget;

	this.init = function( callback ) {

		camera = new THREE.Camera( 60, 1, 1, 10000 );
		camera.position.z = 2;

		scene = new THREE.Scene();

		this.material = new THREE.MeshBasicMaterial( { color: 0xffffff, map: texture, transparent: true } );

		object = new THREE.Mesh( new THREE.Plane( 3, 3 ), this.material );
		scene.addObject( object );

		// renderer.initMaterial( material, scene.lights, scene.fog, object );

	};

	this.update = function ( progress, delta, time ) {

		//material.opacity = 1 - progress;
		this.material.opacity = 0.25;
		renderer.render( scene, camera, renderTarget );

	};

};

OverlayEffect.prototype = new SequencerItem();
OverlayEffect.prototype.constructor = OverlayEffect;

var PointerEffect = function ( shared, visible ) {

	SequencerItem.call( this );

	this.show = function ( progress ) {

		document.body.style.cursor = visible ? 'url("files/pointer.png"), auto' : 'none';

	};

};

PointerEffect.prototype = new SequencerItem();
PointerEffect.prototype.constructor = PointerEffect;

var CityWorld = function ( shared ) {

	var that = this;
	var ENABLE_LENSFLARES = true;

	this.scene = new THREE.Scene();
	this.scene.collisions = new THREE.CollisionSystem();
	
	// Portal

	var portal = new THREE.Vector3( 1094.090, -99.358, 246.713  );	

	// Fog

	this.scene.fog = new THREE.FogExp2( 0x535758, 0.000047 );
	
	// Lights

	var ambientLight = new THREE.AmbientLight( 0x334433 );
	this.scene.addLight( ambientLight );

	var directionalLight1 = new THREE.DirectionalLight( 0xffffff );
	directionalLight1.castShadow = false;
	this.scene.addLight( directionalLight1 );

	var directionalLight2 = new THREE.DirectionalLight( 0xffffff );
	directionalLight2.castShadow = false;
	this.scene.addLight( directionalLight2 );

	// Set up settings
   
	var settings = { "fogDensity": 0.0000264, "fogColor": {  "h": 0,  "s": 0.3235,  "v": 0.347 }, "ambientLight": {  "h": 0.465,  "s": 0.494,  "v": 0 }, "directionalLight1": {  "h": 0.565,  "s": 0.329,  "v": 0.841,  "x": 0.5176767580772196,  "y": 0.7138857482214859,  "z": -0.4715696264952919,  "phi": 0.7757647058823531,  "theta": -0.7388235294117651 }, "directionalLight2": {  "h": 0,  "s": 0,  "v": 0.18235294117647058,  "x": -0.8372195027957865,  "y": -0.4114343306911316,  "z": -0.3602572631705248,  "phi": -1.9948235294117649,  "theta": 0.4063529411764706 }, "effectEnabled": true, "effectType": "noise", "postprocessingNoise": {  "nIntensity": 0.2411764705882353,  "sIntensity": 0,  "sCount": 4096 }, "postprocessingBloom": {  "opacity": 1 }, "flarex": 18.52941176470588, "flarey": 358, "flyCamera": {  "position": {   "x": 16.574202591686277,   "y": 462.26953453589,   "z": -10184.707948888321  },  "target": {   "x": 13.49395371115724,   "y": 486.5924391778843,   "z": -10281.655916255411  } }, "sceneScale": 1};
	
	this.scene.fog.color.setHSV( settings.fogColor.h,  settings.fogColor.s, settings.fogColor.v );
	this.scene.fog.density = settings.fogDensity;

	//ambientLight.color.setHSV( settings.ambientLight.h, settings.ambientLight.s, settings.ambientLight.v );
	directionalLight1.color.setHSV( settings.directionalLight1.h, settings.directionalLight1.s, settings.directionalLight1.v );
	directionalLight2.color.setHSV( settings.directionalLight2.h, settings.directionalLight2.s, settings.directionalLight2.v );

	directionalLight1.position.set( settings.directionalLight1.x, settings.directionalLight1.y, settings.directionalLight1.z );
	directionalLight2.position.set( settings.directionalLight2.x, settings.directionalLight2.y, settings.directionalLight2.z );
	
	// Lens flares

	if ( ENABLE_LENSFLARES ) {

		this.lensFlare = null;
		this.lensFlareRotate = null;

		var flaresPosition = new THREE.Vector3( 0, 0, -5000 );
		var sx = 20, sy = 358;
		initLensFlares( that, flaresPosition, sx, sy );		

	}

	// Scene

	var loader = new THREE.SceneLoader();

	loader.onLoadStart = function () { shared.signals.loadItemAdded.dispatch() };
	loader.onLoadComplete = function () { shared.signals.loadItemCompleted.dispatch() };

	function sceneLoaded( result ) {

		var i, l, scene = result.scene;

		hideColliders( scene );
		makeSceneStatic( scene );
		preInitScene( result, shared.renderer );

		scene.scale.set( 0.1, 0.1, 0.1 );
		scene.updateMatrix();
		that.scene.addChild( scene );
		
		if ( scene.collisions ) {
		
			that.scene.collisions.merge( scene.collisions );
			
		}
		
		TriggerUtils.setupCityTriggers( result );

		// fix texture wrapping for skydome
		
		result.objects[ "Backdrop_City" ].materials[ 0 ].map.wrapS = THREE.RepeatWrapping;
		result.objects[ "Backdrop_City" ].materials[ 0 ].map.wrapT = THREE.RepeatWrapping;
		
		// setup custom materials

		var excludeIds = [ "Backdrop_City" ];
		applyCityShader( result, excludeIds );

		that.scene.update( undefined, true );
		
	};


	if ( !shared.debug ) {

		loader.load( "files/models/city/City.js", sceneLoaded );

	}
	
	var cameraPosition,  d;

	this.update = function ( delta, camera, portalsActive ) {
		
		cameraPosition = camera.matrixWorld.getPosition();		

		TriggerUtils.effectorRadius = 300;
		TriggerUtils.update();

		updateCityShader( delta );

		
		if ( portalsActive ) {
			
			d = portal.distanceTo( cameraPosition );
			
			if ( d < 100 ) {
				
				shared.signals.startexploration.dispatch( "dunes" );

			}
			
		}
		
	};

};


var PrairieWorld = function ( shared, camera ) {

	var that = this;

	var ENABLE_LENSFLARES = true;

	this.scene = new THREE.Scene();
	this.scene.collisions = new THREE.CollisionSystem();

	// Portal

	var portal = new THREE.Vector3( 1094.090, -99.358, 246.713  );

	// Fog

	this.scene.fog = new THREE.FogExp2( 0xffffff, 0.0 );
	this.scene.fog.color.setHSV( 0.559, 0.741, 0.588 );

	// Lights

	this.ambient = new THREE.AmbientLight( 0x221100 );
	this.ambient.color.setHSV( 0.235,  0.341,  0.141 );
	this.scene.addLight( this.ambient );

	this.directionalLight1 = new THREE.DirectionalLight( 0xffeedd );	
	this.directionalLight1.position.set( 0.19587102348124588,  0.9325398992514422,  -0.30332141115410777  );
	this.directionalLight1.color.setHSV( 0,  0,  0.8764705882352941 );
	this.scene.addLight( this.directionalLight1 );

	this.directionalLight2 = new THREE.DirectionalLight( 0xffeedd );	
	this.directionalLight2.position.set( 0.19122302057716462,  -0.30810803127799236,  -0.9319351895187481 );
	this.directionalLight2.color.setHSV( 0.34705882352941175,  0.5058823529411764,  0.13529411764705881 );						
	this.scene.addLight( this.directionalLight2 );

	// Settings

//	this.settings = { "fogDensity": 0.000015, "fogColor": {  "h": 0.20588235294117646,  "s": 0,  "v": 0.11176470588235295 }, "ambientLight": {  "h": 0,  "s": 0,  "v": 0.1 }, "directionalLight1": {  "h": 0,  "s": 0,  "v": 1,  "x": 0.7648718326037581,  "y": -0.5885011172553458,  "z": 0.2619876231400604,  "phi": 2.2,  "theta": 0.33 }, "directionalLight2": {  "h": 0,  "s": 0,  "v": 0.1,  "x": -0.4535568600884794,  "y": 0.8775825618903728,  "z": -0.1553545034191468,  "phi": -0.5,  "theta": 0.33 }, "effectEnabled": false, "effectType": "noise", "postprocessingNoise": {  "nIntensity": 0.4,  "sIntensity": 0,  "sCount": 2502.164705882353 }, "postprocessingBloom": {  "opacity": 0.74 }, "flyCamera": {  "position": {   "x": 500.3406904001187,   "y": -13.38580435178904,   "z": -125.9765343862682  },  "target": {   "x": 595.0671532021266,   "y": -11.009849442629537,   "z": -94.01949942854021  } }, "sceneScale": 1};
	this.settings = { "fogDensity": 0.00002058823529411765, "fogColor": {  "h": 0.5235294117647059,  "s": 0.5,  "v": 1 }, "ambientLight": {  "h": 0.465,  "s": 0,  "v": 0 }, "directionalLight1": {  "h": 0.565,  "s": 0,  "v": 0.5058823529411764,  "x": 0.7648718326037581,  "y": -0.5885011172553458,  "z": 0.2619876231400604,  "phi": 0.6649411764705881,  "theta": 0.9235294117647057 }, "directionalLight2": {  "h": 0,  "s": 0,  "v": 0.4235294117647059,  "x": -0.4535568600884794,  "y": 0.8775825618903728,  "z": -0.1553545034191468,  "phi": -1.588470588235294,  "theta": 0.6279999999999997 }, "effectEnabled": true, "effectType": "bloom", "postprocessingNoise": {  "nIntensity": 1,  "sIntensity": 0.05,  "sCount": 4096 }, "postprocessingBloom": {  "opacity": 1 }, "flarex": 12.176470588235293, "flarey": 304.94117647058823, "flyCamera": {  "position": {   "x": 225.04246271915372,   "y": 2.9824761744404835,   "z": -95.92308075145283  },  "target": {   "x": 318.61355381056615,   "y": -32.161822413807094,   "z": -92.86870868788631  } }, "sceneScale": 1};	
	
	this.scene.fog.color.setHSV( this.settings.fogColor.h, this.settings.fogColor.s, this.settings.fogColor.v );
	this.scene.fog.density = this.settings.fogDensity;
	this.directionalLight1.color.setHSV( this.settings.directionalLight1.h, this.settings.directionalLight1.s, this.settings.directionalLight1.v );
	this.directionalLight2.color.setHSV( this.settings.directionalLight2.h, this.settings.directionalLight2.s, this.settings.directionalLight2.v );

	this.directionalLight1.position.set( this.settings.directionalLight1.x, this.settings.directionalLight1.y, this.settings.directionalLight1.z );
	this.directionalLight2.position.set( this.settings.directionalLight2.x, this.settings.directionalLight2.y, this.settings.directionalLight2.z );
	
	// Lens flares

	if ( ENABLE_LENSFLARES ) {

		this.lensFlare = null;
		this.lensFlareRotate = null;

		var flaresPosition = new THREE.Vector3( 0, 0, -3000 );
		var sx = 142, sy = 284;
		initLensFlares( that, flaresPosition, sx, sy );		

	}

	// Trail

	var markTexture = THREE.ImageUtils.loadTexture( "files/textures/trailMarkTexture.jpg" );

	// Scene

	var loader = new THREE.SceneLoader();

	loader.onLoadStart = function () { shared.signals.loadItemAdded.dispatch() };
	loader.onLoadComplete = function () { shared.signals.loadItemCompleted.dispatch() };

	function prairieLoaded( result ) {

		var i, l, object, scene = result.scene;

		hideColliders( scene );
		makeSceneStatic( scene );

		var groundMesh = result.objects[ "Ground" ];

		ROME.TrailShaderUtils.setMaterials( [ groundMesh ], 2048, markTexture, shared.renderer );

		TriggerUtils.setupPrairieTriggers( result );

		that.scene.addChild( scene );

		result.objects[ "Backdrop" ].materials[ 0 ].map.wrapS = THREE.RepeatWrapping;
		result.objects[ "Backdrop" ].materials[ 0 ].map.wrapT = THREE.RepeatWrapping;

		preInitScene( result, shared.renderer );
		
		if ( scene.collisions ) {

			that.scene.collisions.merge( scene.collisions );

		}

		var train  = result.objects[ "Train" ],
			cargo1 = result.objects[ "cargo1" ],
			cargo2 = result.objects[ "cargo2" ];

		//train.materials[ 0 ].wireframe = true;

/*		train.position.set( -0.5, -6, 11 );
		train.rotation.set( -1.57, 0, 3.14  );
		train.updateMatrix();
		camera.animationParent.addChild( train );

		cargo1.position.set( -0.5, -6, 0 );
		cargo1.rotation.set( -1.57, 0, 3.14  );
		cargo1.updateMatrix();
		camera.animationParent.addChild( cargo1 );

		cargo2.position.set( 0, -6, -11 );
		cargo2.rotation.set( -1.57, 0, 3.14  );
		cargo2.updateMatrix();
		camera.animationParent.addChild( cargo2 );
*/		

		var jloader = new THREE.JSONLoader();
		
		jloader.onLoadStart = function () { shared.signals.loadItemAdded.dispatch() };
		jloader.onLoadComplete = function () { shared.signals.loadItemCompleted.dispatch() };
		
		//jloader.load( { model: 'files/models/Smoke.js', callback: function( geo ) { addSmoke( geo, 100 ); } } );
		
		that.scene.update( undefined, true );

	};

	function addSmoke( geo, n ) {
		
		var i, x, y, z, cs,
			scale = 3,
			cloudMesh, cloudMaterial = new THREE.MeshFaceMaterial();
		
		for( i = 0; i < n; i ++ ) {
		
			cloudMesh = new THREE.Mesh( geo, cloudMaterial );
			x = 20 * ( 0.5 - Math.random() );
			y = 0 + 0 * ( 0.5 - Math.random() );
			z = 20 * ( 0.5 - Math.random() );
			cloudMesh.position.set( x, y, z );
			
			cs = scale * ( 1 + 0.5 * Math.random() );
			cloudMesh.scale.set( cs, cs, cs );
			
			cloudMesh.rotation.y = 0.5 * Math.random();
			
			cloudMesh.matrixAutoUpdate = false;
			cloudMesh.updateMatrix();
			
			that.scene.addChild( cloudMesh );

		}
		
	};
	
	loader.load( "files/models/prairie/Prairie.js", prairieLoaded );

	this.update = function ( delta, camera, portalsActive ) {
		
		ROME.TrailShaderUtils.updateLava( delta * 0.0001, shared.lavatrailx, -shared.lavatrailz );
		ROME.TrailShaderUtils.setMarkAtWorldPosition( shared.lavatrailx, -shared.lavatrailz );
		
		TriggerUtils.effectorRadius = 50;
		TriggerUtils.update();
		
		if ( portalsActive ) {
			
			var currentPosition = camera.matrixWorld.getPosition();
			
			var d = portal.distanceTo( currentPosition );
			
			if ( d < 100 ) {
				
				shared.signals.startexploration.dispatch( "dunes" );

			}
			
		}

	};


};

var DunesWorld = function ( shared ) {

	// vars

	var that = this;
	var	SCALE = 0.20;
	var TILE_SIZE = 30000 * SCALE;
	var scenePrairie, sceneCity, sceneWalk;
	
	shared.influenceSpheres = [];
	shared.cameraSlowDown = false;


	// create scene

	that.scene = new THREE.Scene();
	that.scene.collisions = new THREE.CollisionSystem();
	that.scene.fog = new THREE.FogExp2( 0xffffff, 0.00000275 );
	that.scene.fog.color.setHSV( 0.576,  0.382,  0.9  );

	// Lights

	var ambient = new THREE.AmbientLight( 0x221100 );
	var directionalLight1 = new THREE.DirectionalLight( 0xffeedd );
	var directionalLight2 = new THREE.DirectionalLight( 0xffeedd );

	ambient.color.setHSV( 0, 0, 0.1 );

	directionalLight1.position.set( 0.8085776615544399,  0.30962281305702444,  -0.500335766130914 );
	directionalLight1.color.setHSV( 0.08823529411764706,  0,  1 );

	directionalLight2.position.set( 0.09386404300915006,  0.9829903100365339,  0.15785940518149455 );
	directionalLight2.color.setHSV( 0,  0,  0.8647058823529412 );

	that.scene.addLight( ambient );
	that.scene.addLight( directionalLight1 );
	that.scene.addLight( directionalLight2 );
	

	// Lens flares

	that.lensFlare = null;
	that.lensFlareRotate = null;

	initLensFlares( that, new THREE.Vector3( 0, 0, -10000 ), 70, 292 );		



	// generate base grid (rotations depend on where the grid is in space)
	// 0-3 = tiles
	// 4 = walk
	// 5 = prairie
	// 6 = city

	var tileMeshes = [[],[],[],[],[],[],[]];
	var tileColliders = [];
	var numTileInstances = [ 0, 0, 0, 0, 1, 1, 1 ];
	var tileGrid = [];
	var tileGridSize = 5;		// must be uneven number
	var numTilesLoaded = 0;
	var z, x, tileRow, tileNumber;
	
	for( z = 0; z < tileGridSize; z++ ) {
		
		tileRow = [];
		tileGrid.push( tileRow );
		
		for( x = 0; x < tileGridSize; x++ ) {

			// place city, prairie and walk

			if( x === 0 && z === 0 ) {
				
				tileRow.push( 4 );										// walk
				
			} else if( x === 0 && z === 4 ) {
				
				tileRow.push( 5 );										// prairie
				
			} else if( x === 1 && z === 3 ) {
				
				tileRow.push( 6 );										// city
				
			} else {
				
				tileNumber = Math.floor( Math.random() * 3.99999 );		// random tile
				tileRow.push( tileNumber );
				numTileInstances[ tileNumber ]++;
				
			}

		}
		
	}


	// create skydome
	
	var skydome = new THREE.Mesh( new THREE.Cube( 50000, 50000, 50000 ), undefined );
	skydome.flipSided = true;
	applyDunesShader( { objects: { skydome: skydome } } );

	that.scene.addChild( skydome );


	// start loading

	var loader = new THREE.SceneLoader();

	loader.onLoadStart = function () { shared.signals.loadItemAdded.dispatch() };
	loader.onLoadComplete = function () { shared.signals.loadItemCompleted.dispatch() };

	loader.load( "files/models/dunes/D_tile_walk.js", walkLoaded );
	loader.load( "files/models/dunes/D_tile_prairie.js", prairieLoaded );
	loader.load( "files/models/dunes/D_tile_city.js", cityLoaded );

	loader.load( "files/models/dunes/D_tile_1.js", tileLoaded );
	loader.load( "files/models/dunes/D_tile_2.js", tileLoaded );
	loader.load( "files/models/dunes/D_tile_3.js", tileLoaded );
	loader.load( "files/models/dunes/D_tile_1.js", tileLoaded );



	// UGC - TODO: Temp implementation

/*	var ugcHandler = new UgcHandler();

	ugcHandler.getLatestUGOs( function ( objects ) {

		var geometry = new THREE.Cube( 50, 50, 50 );
		var material = new THREE.MeshLambertMaterial( { color: 0xffffff } );

		for ( var i = 0, l = objects.length; i < l; i ++ ) {

			var data = eval( objects[ i ] );

			if ( data instanceof Array ) {

				var group = new THREE.Object3D();
				group.position.x = Math.random() * 10000 - 5000;
				group.position.z = Math.random() * 10000 - 5000;

				for ( var j = 0, jl = data.length; j < jl; j += 4 ) {

					var voxel = new THREE.Mesh( geometry, material );
					voxel.position.x = data[ j ];
					voxel.position.y = data[ j + 1 ];
					voxel.position.z = data[ j + 2 ];
					voxel.matrixAutoUpdate = false;
					voxel.updateMatrix();
					voxel.update();

					group.addChild( voxel );

				}

				that.scene.addObject( group );

			}

		}

	} );
*/


	//--- walk loaded ---

	function walkLoaded( result ) {

		applyDunesShader( result );
		tileMeshes[ 4 ][ 0 ] = addDunesPart( result );

	};


	//--- prairie loaded ---

	function prairieLoaded( result ) {

		applyDunesShader( result, { "D_tile_Prairie_Collis": true, "D_tile_Prairie_Island": true }, { "D_tile_Prairie_Is.000": -1.0 } );
		tileMeshes[ 5 ][ 0 ] = addDunesPart( result );
		
		addInfluenceSphere( { name: "prairiePortal", object: result.empties.Prairie_Portal, radius: 2000, type: 0, destination: "prairie" } );
		addInfluenceSphere( { name: "prairieSlowDown", object: result.empties.Prairie_Center, radius: 8000, type: 1 } );
	};
	
	
	//--- city loaded ---

	function cityLoaded( result ) {

		applyDunesShader( result, { "D_tile_City_Collision":true, "D_tile_City_Island_Co": true }, { "D_tile_City_Island": -1.0 } );
		tileMeshes[ 6 ][ 0 ] = addDunesPart( result );

		addInfluenceSphere( { name: "cityPortal", object: result.empties.City_Portal, radius: 2000, type: 0, destination: "city" } );
		addInfluenceSphere( { name: "citySlowDown", object: result.empties.City_Center, radius: 10000, type: 1 } );
	};
	
	
	//--- tile loaded ---

	function tileLoaded( result ) {

		var scene = result.scene;

		applyDunesShader( result );
		markColliders( scene );
		showHierarchyNotColliders( scene, true );
		

		// get collider
		
		tileColliders[ numTilesLoaded ] = scene.collisions.colliders[ 0 ].mesh;
		tileColliders[ numTilesLoaded ].rotation.x = -90 * Math.PI / 180;
		tileColliders[ numTilesLoaded ].scale.set( SCALE, SCALE, SCALE );
		
		// shows collision meshes
		//tileColliders[ numTilesLoaded ].materials[ 0 ] = new THREE.MeshLambertMaterial( { color: 0xff00ff, opacity: 0.5 });
		//tileColliders[ numTilesLoaded ].visible= true;
		that.scene.addChild( tileColliders[ numTilesLoaded ] );
		that.scene.collisions.merge( scene.collisions );

		
		// duplicate gfx
		
		for( var i = 0; i < numTileInstances[ numTilesLoaded ]; i++ ) {
			
			tileMeshes[ numTilesLoaded ].push( duplicateMesh( scene ));

		}

		numTilesLoaded++;

	};
	
	
	//--- udpate ---
	
	that.update = function ( delta, camera, portalsActive ) {
		
		that.checkInfluenceSpheres( camera, portalsActive );
		that.updateTiles( camera ); 
		updateDunesShader( delta );
		
		skydome.position.copy( camera.matrixWorld.getPosition() );
		skydome.updateMatrix();

	};


	//--- check influence spheres ---
	
	that.checkInfluenceSpheres = function( camera, portalsActive ) {

		var i, il, distance, influenceSphere;
		
		var currentPosition = camera.matrixWorld.getPosition();

		for( i = 0, il = shared.influenceSpheres.length; i < il; i ++ ) {
			
			influenceSphere = shared.influenceSpheres[ i ];
			distance = influenceSphere.object.matrixWorld.getPosition().distanceTo( currentPosition );
			
			if( distance < influenceSphere.radius * SCALE ) {
				
				// portal
				
				if( influenceSphere.type === 0 && influenceSphere.state === 0 ) {
					
					console.log( "entered portal [" + influenceSphere.name + "]" );

					influenceSphere.state = 1;
					
					if( portalsActive ) {
						
						shared.signals.startexploration.dispatch( influenceSphere.destination );
						
					}
					
				// slow down

				} else if( influenceSphere.type == 1 ) {
					
					shared.cameraSlowDown = true;

				}
				
			} else {
			
				influenceSphere.state = 0;	
				shared.cameraSlowDown = false;

			}
			
		}
	
	}
	

	//--- update tiles ---

	that.updateTiles = function( camera ) {
		
		var halfGridSize = Math.floor( tileGridSize / 2 );
		var gridCenterPosition = camera.matrixWorld.getPosition();
		var camX = gridCenterPosition.x;
		var camZ = gridCenterPosition.z;
		

		gridCenterPosition.addSelf( camera.matrixWorld.getColumnZ().multiplyScalar( -TILE_SIZE * 1.5 ));

		var cameraTileGridX = Math.floor( gridCenterPosition.x / TILE_SIZE ) % tileGridSize;
		var cameraTileGridZ = Math.floor( gridCenterPosition.z / TILE_SIZE ) % tileGridSize;

		while( cameraTileGridX < 0 ) cameraTileGridX += tileGridSize;
		while( cameraTileGridZ < 0 ) cameraTileGridZ += tileGridSize;


		var x, z, tx, tz, px, pz, distance, tile, tileMesh;
		var currentNumberUsed = [ 0, 0, 0, 0, 0, 0, 0 ];
		var currentColliderDistances = [ -1, -1, -1, -1 ];
		
		for( z = -halfGridSize; z < halfGridSize + 1; z++ ) {
			
			for( x = -halfGridSize; x < halfGridSize + 1; x++ ) {
				
				px = ( Math.floor( gridCenterPosition.x / TILE_SIZE ) + x ) * TILE_SIZE;
				pz = ( Math.floor( gridCenterPosition.z / TILE_SIZE ) + z ) * TILE_SIZE;
				
				tx = ( cameraTileGridX + x ) % tileGridSize;
				tz = ( cameraTileGridZ + z ) % tileGridSize;
				
				while( tx < 0 ) tx += tileGridSize;
				while( tz < 0 ) tz += tileGridSize;
				
				tile = tileGrid[ tz ][ tx ];
				
				tileMesh = tileMeshes[ tile ][ currentNumberUsed[ tile ]++ ];

				if( tileMesh ) {
					
					tileMesh.position.x = px; 
					tileMesh.position.z = pz;
					tileMesh.rotation.z = getRotation( px, pz );
											
				}
				
				// set colliders around the user
				
				if( tile < 4 ) {
					
					tx = px - camX;
					tz = pz - camZ;
					
					distance = tx * tx + tz * tz;
					
					if( currentColliderDistances[ tile ] === -1 || distance < currentColliderDistances[ tile ] ) {

						currentColliderDistances[ tile ] = distance;
						
						tileMesh = tileColliders[ tile ];
						
						if( tileMesh ) {
							
							tileMesh.position.x = px; 
							tileMesh.position.z = pz;
							tileMesh.rotation.z = getRotation( px, pz );
							
						}
						
					}
					
				}
				
			}
			
		}
		
	}


	//--- helpers ---

	//--- duplicate mesh (dublicates the mesh of the tile) ---
	
	function duplicateMesh( scene ) {
		
		for( var c = 0; c < scene.children.length; c++ ) {
			
			if( !scene.children[ c ].__isCollider ) {
				
				var org  = scene.children[ c ];
				var mesh = new THREE.Mesh( org.geometry, org.materials );
				
				mesh.rotation.x = -90 * Math.PI / 180;
				mesh.scale.set( SCALE, SCALE, SCALE );
				
				that.scene.addChild( mesh );
						
				return mesh;
			}
		
		}
		
	};
	
	
	//--- add dunes part ---

	function addDunesPart( result ) {

		var scene = result.scene;

		scene.scale.set( SCALE, SCALE, SCALE );
		scene.matrixAutoUpdate = true;

		markColliders( scene );
		showHierarchyNotColliders( scene, true );
		preInitScene( result, shared.renderer );
		
		that.scene.addChild( scene );
		
		if ( scene.collisions ) {
		
			that.scene.collisions.merge( scene.collisions );

		}
		
		return scene;
	};


	
	function getRotation ( x, z ) {

		return Math.round( Math.sin( x * 0.001 ) * Math.cos( z * 0.005 ) * 4 ) * ( Math.PI / 2 );

	};

	function showHierarchyNotColliders( scene, visible ) {

		THREE.SceneUtils.traverseHierarchy( scene, function( node ) { 
			
			if ( ! node.__isCollider ) {

				node.visible = visible; 

			}
			
		} );
		
	};

	function markColliders( scene ) {

		THREE.SceneUtils.traverseHierarchy( scene, function( node ) { 
			
			var colliders = scene.collisions.colliders;

			for( var i = 0; i < colliders.length; i++ ) {

				if ( colliders[ i ].mesh == node ) {
				
					node.__isCollider = true; 

				}

			}
			
		} );
		
	};
	
	function addInfluenceSphere( info ) {
	
		info.state = 0;
		shared.influenceSpheres.push( info );

		if( false ) {
			
			var sphere = new THREE.Sphere( 1, 32, 32 );
			var sprite = THREE.ImageUtils.loadTexture( "files/textures/circle-outline.png" );
	
			var particleMaterial = new THREE.ParticleBasicMaterial( { size: 50, color:0xff7700, map: sprite, transparent: true } );
			var sphereObject = new THREE.ParticleSystem( sphere, particleMaterial );
			
			sphereObject.sortParticles = true;
			sphereObject.scale.set( info.radius, info.radius, info.radius );
			
			info.object.scale.set( 1, 1, 1 );
			info.object.addChild( sphereObject );
			info.object.update( info.object.parent, true );

			info.mesh = sphereObject;
				
		}
		
	}



};





/*
 * Positions of grass (xyzr)
 */

var CityShaderEffectors = [ new THREE.Vector4( 0, 0, -1000, 50 ), 
							new THREE.Vector4( -100, 0, -1500, 150 ), 
							new THREE.Vector4( 100, 0, -2000, 150 ), 
							new THREE.Vector4( 0, 0, -2500, 100 ) ];


/*
 * Shader
 */

var CityShader = {

	uniforms: {

		"grassImage": { type: "t", value: 0, texture: THREE.ImageUtils.loadTexture( 'files/textures/CityShader_Grass.jpg' ) },
		"surfaceImage": { type: "t", value: 1, texture: THREE.ImageUtils.loadTexture( 'files/textures/CityShader_Clouds.jpg' ) },

		"time": { type: "f", value:0.0 },

		"targets": { type: "fv", value: [] },
		"radiuses": { type: "fv1", value: [] }

	},

	vertexShader: [

		"varying vec3 vWorldPosition;",
		"varying vec3 vColor;",
		"varying vec3 vNormalsquare;",

		"void main() {",

			"vec3 transformedNormal = normalize( normalMatrix * normal );",
			"vNormalsquare = transformedNormal * transformedNormal;",
			
			"vColor = color;",

			"vWorldPosition = vec3( objectMatrix * vec4( position, 1.0 )).xyz;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join("\n"),

	fragmentShader: [

		"uniform sampler2D grassImage;",
		"uniform sampler2D surfaceImage;",

		"const 	 int  	NUMTARGETS = " + CityShaderEffectors.length + ";",
		"uniform vec3 	targets[ NUMTARGETS ];",
		"uniform float 	radiuses[ NUMTARGETS ];",

		"uniform float time;",

		"varying vec3 vWorldPosition;",
		"varying vec3 vColor;",
		"varying vec3 vNormalsquare;",

		"void main() {",

			"float distance = -9999999.0;",
			
			"for( int i = 0; i < NUMTARGETS; i++ ) {",
				"distance = max( distance, length( vWorldPosition - targets[ i ].xyz ) * -1.0 / radiuses[ i ] );",
			"}",

			"vec3 worldPosition = vWorldPosition * 0.0005;",
			"vec4 grass = texture2D( grassImage, worldPosition.yz * vec2(10.0)) * vNormalsquare.xxxx + ",
			             "texture2D( grassImage, worldPosition.xz * vec2(10.0)) * vNormalsquare.yyyy + ",
			             "texture2D( grassImage, worldPosition.xy * vec2(10.0)) * vNormalsquare.zzzz;",
			
			"distance += ( 0.5 + grass.g ) * texture2D( surfaceImage, worldPosition.zx * vec2( 3.0 )).g;",

			"vec3 surface = vec3( 0.15 * 2.0, 0.18 * 2.0, 0.2 * 2.0 );",

			"if( distance > 0.0 )",
				"surface = grass.rgb;",

			"float depth = ( gl_FragCoord.z / gl_FragCoord.w ) * 0.0001;",

			"gl_FragColor = vec4( surface * vColor * 2.0, 1.0 );",
//clouds:			"gl_FragColor = mix( gl_FragColor * texture2D( surfaceImage, worldPosition.zx * vec2( 0.4 ) + vec2( time )), gl_FragColor, 0.8 );",
			"gl_FragColor = vec4( mix( gl_FragColor.rgb, vec3( 0.64, 0.88, 1 ), depth ), 1.0 );",	
		"}"

	].join("\n")

};


/*
 * Utils
 */

function applyCityShader( result, exclude ) {
	
	var i, name, geometry, obj, mat;

	var excludeMap = {};
	
	for ( i = 0; i < exclude.length; i++ ) {
		
		excludeMap[ exclude[ i ] ] = true;
		
	}

	updateCityShader( 0 );

	var shaderParams = {

		uniforms: CityShader.uniforms,
		vertexShader: CityShader.vertexShader,
		fragmentShader: CityShader.fragmentShader,
		
		shading: THREE.FlatShading,
		vertexColors: THREE.VertexColors

	};

	shaderParams.uniforms[ 'grassImage' ].texture.wrapS = THREE.RepeatWrapping;
	shaderParams.uniforms[ 'grassImage' ].texture.wrapT = THREE.RepeatWrapping;
	shaderParams.uniforms[ 'surfaceImage' ].texture.wrapS = THREE.RepeatWrapping;
	shaderParams.uniforms[ 'surfaceImage' ].texture.wrapT = THREE.RepeatWrapping;
	
	mat = new THREE.MeshShaderMaterial( shaderParams );
	
	
	// set material to all geo chunks

	for( name in result.objects ) {

		obj = result.objects[ name ];
		
		if ( excludeMap[ name ] ) continue;

		if( obj.geometry && obj.geometry.morphTargets.length === 0 ) {
			
			geometry = obj.geometry;
			
			for( i = 0; i < geometry.materials.length; i++ ) {
				
				obj.materials[ 0 ] = mat;

			}
			
		}
		
	}
	
	return mat;
	
};


function updateCityShader( delta ) {
	
	var effector, e, el = CityShaderEffectors.length;
	var p, pos = CityShader.uniforms.targets.value;
	var r, rad = CityShader.uniforms.radiuses.value;
	
	for( p = 0, r = 0, e = 0; e < el; e++ ) {
		
		effector = CityShaderEffectors[ e ];
		
		pos[ p++ ] = effector.x;
		pos[ p++ ] = effector.y;
		pos[ p++ ] = effector.z;
		rad[ r++ ] = effector.w;
		
	}
	
	CityShader.uniforms.time.value += delta / 10000;

};


var DunesShaderEffectors = {
	
	position: [ new THREE.Vector3( 0, 0, -1000 ), 
  			 	new THREE.Vector3( -100, 0, -4500 ), 
				new THREE.Vector3( 100, 0, -8000 ), 
				new THREE.Vector3( 2000, 0, -2500 ) ],
	radius: [ 500, 500, 500, 500 ],
	darkness: [ 1.0, 0.5, 0.0, 0.0 ],

	positionFlat: [],
	materials: []
}


var DunesShader = {

	uniforms: {  

		"grassImage":     { type: "t", value: 0, texture: THREE.ImageUtils.loadTexture( 'files/textures/CityShader_Grass.jpg' ) },
		"surfaceImage":   { type: "t", value: 1, texture: THREE.ImageUtils.loadTexture( 'files/textures/CityShader_Clouds.jpg' ) },

		"time": { type: "f", value: 0.0 },

		"target": { type: "fv", value: [] },
		"radius": { type: "fv1", value: [] },
		"darkness": { type: "fv1", value: [] },
		
		"dunesOpacity" : { type: "f", value: 1.0 },
		"invertLightY" : { type: "f", value: 1.0 },
		
		"fogColor": { type: "c", value: new THREE.Color() },
		"fogDensity": { type: "f", value: 0 },

		"enableLighting" : 				{ type: "i", value: 1 },
		"ambientLightColor" : 			{ type: "fv", value: [] },
		"directionalLightDirection" : 	{ type: "fv", value: [] },
		"directionalLightColor" : 		{ type: "fv", value: [] },
		"pointLightColor": 				{ type: "fv", value: [] },
		"pointLightPosition": 			{ type: "fv", value: [] },
		"pointLightDistance": 			{ type: "fv1", value: [] }

	},

	vertexShader: [

		"uniform vec3  ambientLightColor;",
		"uniform vec3  directionalLightColor[ MAX_DIR_LIGHTS ];",
		"uniform vec3  directionalLightDirection[ MAX_DIR_LIGHTS ];",
		"uniform float invertLightY;",
		
		"varying vec3 vWorldPosition;",
		"varying vec3 vColor;",
		"varying vec3 vNormalsquare;",
		"varying vec3 vLightWeighting;",
		"varying vec3 vWorldVector;",

		"void main() {",

			"vec3 transformedNormal = normalize( normalMatrix * normal );",
			"vNormalsquare = transformedNormal * transformedNormal;",
			
			"vColor = color;",

			"vLightWeighting = ambientLightColor;",

			
			"vec3 lightDir = directionalLightDirection[ 0 ];",
			"lightDir.y *= invertLightY;",
			
			"vec4 lDirection = viewMatrix * vec4( lightDir, 0.0 );",
			"float directionalLightWeighting = max( dot( transformedNormal, normalize( lDirection.xyz ) ), 0.0 );",
			"vLightWeighting += directionalLightColor[ 0 ] * directionalLightWeighting;",
			
			
			"lightDir = directionalLightDirection[ 1 ];",
			"lightDir.y *= invertLightY;",

			"lDirection = viewMatrix * vec4( lightDir, 0.0 );",
			"directionalLightWeighting = max( dot( transformedNormal, normalize( lDirection.xyz ) ), 0.0 );",
			"vLightWeighting += directionalLightColor[ 1 ] * directionalLightWeighting;",
			
			
			"vWorldPosition = vec3( objectMatrix * vec4( position, 1.0 )).xyz;",
			"vWorldVector = (vWorldPosition - cameraPosition) * vec3(0.01, 0.02, 0.01);",

			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join("\n"),

	fragmentShader: [


		"const   vec3 	skyBlue = vec3( -0.37, -0.05, 0.15 );",
		"const 	 vec3 	cloudMix = vec3( 0.83 * 0.83, 0.69 * 0.69, 0.51 * 0.51 );",
		"const 	 int  	NUMTARGETS = " + DunesShaderEffectors.position.length + ";",

		"uniform vec3 	target[ NUMTARGETS ];",
		"uniform float 	radius[ NUMTARGETS ];",
		"uniform float 	darkness[ NUMTARGETS ];",

		"uniform sampler2D grassImage;",
		"uniform sampler2D surfaceImage;",

		"uniform float time;",

		"uniform float dunesOpacity;",

		"uniform vec3 fogColor;",
		"uniform float fogDensity;",

		"varying vec3 vColor;",
		"varying vec3 vLightWeighting;",
		"varying vec3 vNormalsquare;",
		"varying vec3 vWorldPosition;",
		"varying vec3 vWorldVector;",

		"void main() {",

			"float f;",
			"vec3 normal;",
			"vec3 sky_color;",
			"vec4 surface;",
			"vec4 grass;",
			

			// surface color

			"float distance = -9999999.0;",
			"float fragmentDarkness = 1.0;",
			
			"for( int i = 0; i < NUMTARGETS; i++ ) {",
				"distance = max( distance, length( vWorldPosition - target[ i ].xyz ) * -1.0 / radius[ i ] );",
				"fragmentDarkness = min( fragmentDarkness, 1.0 - darkness[ i ] );",
			"}",
			
			"vec3 worldPosition = vWorldPosition * 0.0005;",
			"grass = texture2D( grassImage, worldPosition.yz * vec2(10.0)) * vNormalsquare.x + ",
			        "texture2D( grassImage, worldPosition.xz * vec2(10.0)) * vNormalsquare.y + ",
			        "texture2D( grassImage, worldPosition.xy * vec2(10.0)) * vNormalsquare.z;",

			"distance += (0.5 + grass.g) * texture2D(surfaceImage, worldPosition.zx * vec2(3.0)).g;",
			"surface = vec4( vColor, 1.0 );",

			"if(distance > 0.0)",
				"surface = vec4( grass.rgb * fragmentDarkness, grass.w );",


			// clouds

			"gl_FragColor = mix( surface * texture2D( surfaceImage, worldPosition.zx * vec2( 0.4 ) + vec2(time)), surface, vec4( cloudMix, 0.1 ));",
	

			// lights
			
			"gl_FragColor = gl_FragColor * vec4( vLightWeighting, 1.0 );",


			// fog
			
			"const float LOG2 = 1.442695;",
			"float depth = ( gl_FragCoord.z / gl_FragCoord.w ) * 50.0;",
			"float fogFactor = exp2( -fogDensity * fogDensity * depth * depth * LOG2 );",
			"fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );",


			// mix sky color and fog

			"f = max( 0.0, normalize( vWorldVector ).y + cameraPosition.y * 0.0002 - 0.255 );",
			"sky_color = mix( vec3( 1.0 ), skyBlue, f );",

			"gl_FragColor = mix( gl_FragColor, vec4( sky_color, gl_FragColor.w ), fogFactor );",
			"gl_FragColor.a = dunesOpacity;",
		"}"

	].join("\n")

};


function applyDunesShader( result, excludeMap, invertLightY ) {

	var i, name, geometry, obj, mat;

	invertLightY = invertLightY !== undefined ? invertLightY : {};
	excludeMap   = excludeMap   !== undefined ? excludeMap   : {};

	var shaderParams = {

		uniforms: DunesShader.uniforms,
		vertexShader: DunesShader.vertexShader,
		fragmentShader: DunesShader.fragmentShader,

		shading: THREE.FlatShading,
		lights: true,
		fog: true,
		vertexColors: THREE.VertexColors

	};

	shaderParams.uniforms[ 'grassImage' ].texture.wrapS = THREE.RepeatWrapping;
	shaderParams.uniforms[ 'grassImage' ].texture.wrapT = THREE.RepeatWrapping;
	shaderParams.uniforms[ 'surfaceImage' ].texture.wrapS = THREE.RepeatWrapping;
	shaderParams.uniforms[ 'surfaceImage' ].texture.wrapT = THREE.RepeatWrapping;

	function createDunesMaterial( invLight ) {

		mat = new THREE.MeshShaderMaterial( shaderParams );

		mat.uniforms = THREE.UniformsUtils.clone( shaderParams.uniforms );

		mat.uniforms.target.value = DunesShaderEffectors.positionFlat;
		mat.uniforms.radius.value = DunesShaderEffectors.radius;
		mat.uniforms.darkness.value = DunesShaderEffectors.darkness;
		mat.uniforms.grassImage.texture   = shaderParams.uniforms.grassImage.texture;
		mat.uniforms.surfaceImage.texture = shaderParams.uniforms.surfaceImage.texture;
		mat.uniforms.invertLightY.value = invLight;
		
		var opacity = 1.0;
		
		if( obj.materials[ 0 ] !== undefined && !( obj.materials[ 0 ] instanceof THREE.MeshFaceMaterial )) {
			
			opacity = obj.materials[ 0 ].opacity;
			
		} else if( obj.geometry.materials && obj.geometry.materials[ 0 ] && obj.geometry.materials[ 0 ][ 0 ] ) {
			
			opacity = obj.geometry.materials[ 0 ][ 0 ].opacity;
		}
		
		mat.uniforms.dunesOpacity.value = opacity;

		obj.materials[ 0 ] = mat;
		DunesShaderEffectors.materials.push( mat );

	}


	// set materials

	var invertLightYOnThisObject = 1.0;

	for( name in result.objects ) {

		if( excludeMap[ name ] ) continue;

		obj = result.objects[ name ];
		
		if( invertLightY[ name ] ) {
			
			invertLightYOnThisObject = invertLightY[ name ];
			
		} else {
			
			invertLightYOnThisObject = 1.0;	
		}

		if( obj.geometry && obj.geometry.morphTargets.length === 0 ) {

			createDunesMaterial( invertLightYOnThisObject );

		}

	}

};


function updateDunesShader( delta ) {

	// update effectors

	var effector, e, el = DunesShaderEffectors.position.length;
	var p, pos = DunesShaderEffectors.positionFlat;
	
	for( p = 0, e = 0; e < el; e++ ) {
		
		effector = DunesShaderEffectors.position[ e ];
		
		pos[ p++ ] = effector.x;
		pos[ p++ ] = effector.y;
		pos[ p++ ] = effector.z;
	}


	// update time

	var time = DunesShader.uniforms.time.value += delta * 0.00001;
	
	for( e = 0, el = DunesShaderEffectors.materials.length; e < el; e++ ) {
		
		DunesShaderEffectors.materials[ e ].uniforms.time.value = time;
	}
	

};

var CloudsShader = {

	colors:{
	
		colorA: new THREE.Vector3( 1, 1, 1 ),
		colorB: new THREE.Vector3( 1, 1, 1 ),
		colorC: new THREE.Vector3( 1, 1, 1 )

	},
	
	uniforms: {

		"grassImage": { type: "t", value: 0, texture: THREE.ImageUtils.loadTexture( 'files/textures/CityShader_Grass.jpg' ) },
		"surfaceImage": { type: "t", value: 1, texture: THREE.ImageUtils.loadTexture( 'files/textures/CityShader_Clouds.jpg' ) },
		"map": { type: "t", value:2, texture:null },
		"map2": { type: "t", value:3, texture:null },
		"map3": { type: "t", value:4, texture:null },

		"time": { type: "f", value:0.0 },

		"targetStart": { type: "v3", value: new THREE.Vector3() },
		"targetEnd": { type: "v3", value: new THREE.Vector3() },
		
		"fogColor": { type: "c", value: new THREE.Color() },
		"fogDensity": { type: "f", value: 0 },

		"enableLighting" : { type: "i", value: 1 },
		"ambientLightColor" : { type: "fv", value: [] },
		"directionalLightDirection" : { type: "fv", value: [] },
		"directionalLightColor" : { type: "fv", value: [] },
		"pointLightColor" : { type: "fv", value: [] },
		"pointLightPosition" : { type: "fv", value: [] },
		"pointLightDistance" : { type: "fv1", value: [] },

		"colorA": { type: "v3", value: new THREE.Vector3() },
		"colorB": { type: "v3", value: new THREE.Vector3() },
		"colorC": { type: "v3", value: new THREE.Vector3() }

	},

	vertexShader: [

		"uniform vec3 ambientLightColor;",
		"uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];",
		"uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];",

		"uniform vec3 targetStart;",
		"uniform vec3 targetEnd;",
		
		"varying vec3 vWorldPosition;",
		"varying vec3 vColor;",
		"varying vec3 vNormal;",
		"varying vec3 vNormalsquare;",
		"varying vec3 vLightWeighting;",
		"varying vec3 worldVector;",

		"void main() {",

			"vec3 transformedNormal = normalize( normalMatrix * normal );",
			"vNormalsquare = transformedNormal * transformedNormal;",
			"vNormal = transformedNormal;",
			
			"vColor = color;",

			"vLightWeighting = ambientLightColor;",

			"vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ 0 ], 0.0 );",
			"float directionalLightWeighting = max( dot( transformedNormal, normalize( lDirection.xyz ) ), 0.0 );",
			"vLightWeighting += directionalLightColor[ 0 ] * directionalLightWeighting;",
			
			"lDirection = viewMatrix * vec4( directionalLightDirection[ 1 ], 0.0 );",
		//	"directionalLightWeighting = max( dot( transformedNormal, normalize( lDirection.xyz ) ), 0.0 );",
			"directionalLightWeighting = dot( transformedNormal, normalize( lDirection.xyz ) ) * 0.5 + 0.5;",
			"vLightWeighting += directionalLightColor[ 1 ] * directionalLightWeighting;",
			
			//"vLightWeighting = vLightWeighting * vec3(0.5, 0.55, 0.45) + vec3(0.5, 0.45, 0.55);",

			"vWorldPosition = vec3( objectMatrix * vec4( position, 1.0 )).xyz;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
			"worldVector = (vWorldPosition - cameraPosition) * vec3(0.01, 0.02, 0.01);",

		"}"

	].join("\n"),

	fragmentShader: [

		"uniform sampler2D grassImage;",
		"uniform sampler2D surfaceImage;",
		"uniform sampler2D map;",
		"uniform sampler2D map2;",
		"uniform sampler2D map3;",
		"uniform vec3 targetStart;",
		"uniform vec3 targetEnd;",

		"uniform float time;",

		"uniform vec3 fogColor;",
		"uniform float fogDensity;",

		"varying vec3 vWorldPosition;",
		"varying vec3 vColor;",
		"varying vec3 vNormal;",
		"varying vec3 vNormalsquare;",
		"varying vec3 vLightWeighting;",
		"uniform vec3 vectorA;",
		"uniform vec3 vectorB;",
		"uniform vec3 vectorC;",

		"varying vec3 worldVector;",

		"void main() {",

			"float distance, f;",
			"vec3 normal;",
			"vec3 sky_color;",
			"vec4 surface;",
			"vec4 grass;",
			"f = normalize(worldVector).y;",
			"f = max(f, 0.0);",
			"sky_color = mix(vectorA, vectorB, f);",			
			"vec3 worldPosition = vWorldPosition * 0.0005;",

			"surface = vec4( vec3( 0.5 ), 1.0 );",

			"float depth = gl_FragCoord.z / gl_FragCoord.w;",
			"depth *= 0.0001;",

			"gl_FragColor = vec4( vColor, 1.0 ) + vec4(2.0);",
			"gl_FragColor = mix(gl_FragColor * texture2D(surfaceImage, worldPosition.zx * vec2(0.4) + vec2(time)), gl_FragColor, vec4(vectorC.rgb, 0.1));",
			//"gl_FragColor = mix(vec4(gl_FragColor.rgb, 1.0), vec4(/*colorB*/0.64, 0.88, 1, 1.0), vec4(depth));",	


			// lights
			
			"gl_FragColor = gl_FragColor + vec4( vLightWeighting, 1.0 );",

			// fog
			
			"depth = gl_FragCoord.z / gl_FragCoord.w;",
			"depth *= 50.0;",
			"const float LOG2 = 1.442695;",
			"float fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );",
			"fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );",


			"gl_FragColor = mix( gl_FragColor, vec4( sky_color, gl_FragColor.w ), fogFactor/*min(length(worldVector) * 0.02, 1.0) */);",
			//"gl_FragColor = vec4( gl_FragColor.rgb * vectorA * vectorB * vectorC, 1.0 );",

			//"gl_FragColor = vec4(distance, distance, distance, 1.0);",
			//"gl_FragColor *= vec4( 0.0, 1.0, 0.0, 1.0 );",

			/*time laps only*/
			//"gl_FragColor = texture2D(surfaceImage, worldPosition.zx * vec2(0.4) + vec2(time));",

			/*grass only*/
			//"gl_FragColor = grass;",

			/*grass only*/
			//"gl_FragColor = texture2D( grassImage, worldPosition.zx * vec2(10.0));",
			//"gl_FragColor = vec4(vNormalsquare.yyy, 1.0);",
			
			"gl_FragColor = vec4(vec3(vLightWeighting) * vec3(0.9, 0.5, 0.3) + vec3(0.7, 0.6, 0.6), vLightWeighting * 0.9 + 0.1);",

		"}"

	].join("\n")

};

function applyCloudsShader( obj, shader, start, end, materials ) {

	var shaderParams = {

		uniforms: shader.uniforms,
		vertexShader: shader.vertexShader,
		fragmentShader: shader.fragmentShader,
		
		shading: THREE.FlatShading,
		lights: true,
		fog: true,
		vertexColors: THREE.VertexColors

	};

		
	var mat = new THREE.MeshShaderMaterial( shaderParams );

	mat.uniforms = THREE.UniformsUtils.clone( shaderParams.uniforms );
	
	mat.uniforms[ 'targetStart'  ].value   = start;
	mat.uniforms[ 'targetEnd'    ].value   = end;
	mat.uniforms[ 'grassImage'   ].texture = shaderParams.uniforms[ 'grassImage'   ].texture;
	mat.uniforms[ 'surfaceImage' ].texture = shaderParams.uniforms[ 'surfaceImage' ].texture;

	mat.uniforms.colorA.value = shader.colors.colorA;
	mat.uniforms.colorB.value = shader.colors.colorB;
	mat.uniforms.colorC.value = shader.colors.colorC;
	
	obj.materials[ 0 ] = mat;
	materials.push( mat );
	
	shaderParams.uniforms[ 'grassImage' ].texture.wrapS = THREE.RepeatWrapping;
	shaderParams.uniforms[ 'grassImage' ].texture.wrapT = THREE.RepeatWrapping;
	shaderParams.uniforms[ 'surfaceImage' ].texture.wrapS = THREE.RepeatWrapping;
	shaderParams.uniforms[ 'surfaceImage' ].texture.wrapT = THREE.RepeatWrapping;
	
	
};


/**
 * Trigger (uniform)
 * @author Mikael Emtinger
 */

Trigger = function( geometry, wantedDarkness ) {
	
	// setup materials
	
	var that = {};
	var material = new THREE.MeshShaderMaterial( {
		
		uniforms: TriggerShader.uniforms(),
		vertexShader: TriggerShader.vertexShader,
		fragmentShader: TriggerShader.fragmentShader, 
		
		shading: THREE.FlatShading,
		lights: true,
		fog: true,
		morphTargets: true,
		vertexColors: 1,
		map: geometry.materials[ 0 ].map
		
	} );



	// create mesh and hide

	that.mesh = new THREE.Mesh( geometry, material );


	// setup internals

	var timeScale = 1;
	var currentTime = 0;
	var wantedDarkness = wantedDarkness !== undefined ? wantedDarkness : 0;
	var morphTargetOrder = that.mesh.morphTargetForcedOrder;
	var lengthInMS = ( geometry.morphTargets.length - 1 ) * 1000;

	morphTargetOrder[ 0 ] = 0;
	morphTargetOrder[ 1 ] = 1;


	//--- play ---

	that.play = function( _timeScale ) {
	
		timeScale = _timeScale || 1;
		currentTime = 0;

		that.mesh.visible = true;

		THREE.AnimationHandler.addToUpdate( that );
		that.update( 0 );
	} 


	//--- update ---
	
	that.update = function( deltaTimeMS ) {
		
		currentTime += deltaTimeMS * timeScale;
		
		if( currentTime >= lengthInMS ) {
			
			morphTargetOrder[ 0 ] = 0;
			morphTargetOrder[ 1 ] = that.mesh.geometry.morphTargets.length - 1;
			
			material.uniforms.morph.value = 1;
			material.uniforms.darkness.value = wantedDarkness;
			
			THREE.AnimationHandler.removeFromUpdate( that );
			
		
		} else {
			
			var elasticTime = elastic( currentTime / lengthInMS ) * lengthInMS;

			if( elasticTime < lengthInMS ) {
				
				morphTargetOrder[ 0 ] = Math.floor( elasticTime / 1000 );
				morphTargetOrder[ 1 ] = Math.ceil( elasticTime / 1000 );
							
				
			} else {
				
				morphTargetOrder[ 0 ] = that.mesh.geometry.morphTargets.length - 2;
				morphTargetOrder[ 1 ] = that.mesh.geometry.morphTargets.length - 1;
				
			}

			material.uniforms.morph.value = elasticTime / lengthInMS;
			material.uniforms.darkness.value = wantedDarkness * currentTime / lengthInMS;
			
		}
		
	}

	
	//--- elastic easout copied from TWEEN ---

	var elastic = function( k ) {

	    var s, a = 0.1, p = 0.7;
	    if ( k == 0 ) return 0; if ( k == 1 ) return 1; if ( !p ) p = 0.3;
	    if ( !a || a < 1 ) { a = 1; s = p / 4; }
	    else s = p / ( 2 * Math.PI ) * Math.asin( 1 / a );
	    return ( a * Math.pow( 2, - 10 * k) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) + 1 );

	}



	//--- public ---

	return that;
	
}


/*
 * Trigger big
 * @author Mikael Emtinger
 */

var TriggerBig = function( geometry ) {
	
	// setup materials
	
	var that = {};
	var material = new THREE.MeshShaderMaterial( {
		
		uniforms: TriggerBigShader.uniforms(),
		vertexShader: TriggerBigShader.vertexShader(),
		fragmentShader: TriggerBigShader.fragmentShader, 
		
		shading: THREE.FlatShading,
		lights: true,
		fog: true,
		morphTargets: true,
		vertexColors: 1
		
	} );

	
	// setup mesh

	that.mesh = new THREE.Mesh( geometry, material );
	that.mesh.doubleSided = true;


	// setup interal

	var timeScale = 0.1;
	var currentTime = 0;
	var lengthInMS = ( geometry.morphTargets.length - 1 ) * 1000;
	var morphTargetOrder = that.mesh.morphTargetForcedOrder;

	morphTargetOrder[ 0 ] = 0;
	morphTargetOrder[ 1 ] = 1;


	//--- play ---

	that.play = function( _timeScale ) {
	
		timeScale = _timeScale || 1;
		currentTime = 0;

		THREE.AnimationHandler.addToUpdate( that );
		that.update( 0 );

	} 


	//--- update ---
	
	that.update = function( deltaTimeMS ) {
		
		currentTime += deltaTimeMS * timeScale;
		
		if( currentTime >= lengthInMS ) {
			
			morphTargetOrder[ 0 ] = 0;
			morphTargetOrder[ 1 ] = that.mesh.geometry.morphTargets.length - 1;
			
			material.uniforms.morph.value = 1;
			
			THREE.AnimationHandler.removeFromUpdate( that );
			
		
		} else {
			
			var time = ( currentTime / lengthInMS ) * lengthInMS;

			if( time < lengthInMS ) {
				
				morphTargetOrder[ 0 ] = Math.floor( time / 1000 );
				morphTargetOrder[ 1 ] = Math.ceil( time / 1000 );
							
				
			} else {
				
				morphTargetOrder[ 0 ] = that.mesh.geometry.morphTargets.length - 2;
				morphTargetOrder[ 1 ] = that.mesh.geometry.morphTargets.length - 1;
				
			}

			material.uniforms.morph.value = time / lengthInMS;
			
		}
		
	}

	//--- public ---

	return that;
	
}


/*
 * Utils
 */

var TriggerUtils = (function() {
	
	var that = {};
	that.effectors = [ 0, 0, 20000 ];		// xyz xyz for each effector (remeber to change const in shader, too)
	that.effectorRadius = 300;

	var smallTriggersCity = [];
	var bigTriggersCity = [];
	var smallTriggersPrairie = [];
	
	
	//--- city ---
	
	that.setupCityTriggers = function( loadedSceneResult ) {
		
		if( !loadedSceneResult.triggers ) return;
		
		var t, tl, name, trigger, triggers = loadedSceneResult.triggers;
		var triggerGeometries = [];

		// collect geometry and remove from scene graph
		
		for( name in triggers ) {
			
			if( name.indexOf( "TriggerMesh" ) !== -1 ) {
				
				trigger = triggers[ name ];
				trigger.name = name.slice( name.indexOf( "_" ) + 1 );
				trigger.geometry = loadedSceneResult.geometries[ trigger.object.geometry ];
								
				triggerGeometries.push( trigger );
				
				loadedSceneResult.objects[ name ].parent.removeChild( loadedSceneResult.objects[ name ] );
				loadedSceneResult.objects[ name ].visible = false;
				delete triggers[ name ];
				
			}
		
		}
		
		
		// assign originals to marked objects
		
		smallTriggersCity = [];
		bigTriggersCity = [];
		
		for( name in triggers ) {
			
			for( t = 0, tl = triggerGeometries.length; t < tl; t++ ) {
				
				if( name.indexOf( triggerGeometries[ t ].name ) !== -1 ) {
					
					if( triggerGeometries[ t ].geometry.morphTargets.length ) {
						
						if( triggers[ name ].type === "Small" ) {
							
							trigger = new Trigger( triggerGeometries[ t ].geometry );
							loadedSceneResult.objects[ name ].addChild( trigger.mesh );
							trigger.mesh.visible = false;
							
							smallTriggersCity.push( trigger );
							
						} else {
							
							trigger = new TriggerBig( triggerGeometries[ t ].geometry );
							loadedSceneResult.objects[ name ].addChild( trigger.mesh );
	
							bigTriggersCity.push( trigger );
							
						}
	 					
						trigger.mesh.rotation.x = 90 * Math.PI / 180;
						
					}
					
				}
				
			}
			
		}
		
	}
	
	
	//--- Prairie ---
	
	that.setupPrairieTriggers = function( loadedSceneResult ) {
		
		var name, geometry, geometries = loadedSceneResult.geometries;
		var m, ml;
		var v, vl, vertices;
		var pos, tmp;
		
		
		// switch morph target y and z (as morph targets been copy-pasted from OBJ and not exported from Blender)
		
		for( name in geometries ) {
			
			geometry = geometries[ name ];
			
			if( geometry.morphTargets.length ) {
				
				for( m = 0, ml = geometry.morphTargets.length; m < ml; m++ ) {
					
					vertices = geometry.morphTargets[ m ].vertices;
					
					for( v = 0, vl = vertices.length; v < vl; v++ ) {
						
						pos = vertices[ v ].position;
						
						tmp = pos.y;
						pos.y = -pos.z;
						pos.z = tmp;
						
					}
					
				}
				
			}
			
		}	
		
		
		
		
		// setup triggers

		var trigger, triggers = loadedSceneResult.triggers;
		var objects = loadedSceneResult.objects;

		smallTriggersPrairie = [];

		for( name in objects ) {
			
			if( objects[ name ].geometry ) {
				
				if( objects[ name ].geometry.morphTargets.length ) {
					
					trigger = new Trigger( objects[ name ].geometry, Math.random() * 0.25 + 0.5 );
					
					objects[ name ].addChild( trigger.mesh );			
					objects[ name ].visible = false;
					
					smallTriggersPrairie.push( trigger );
					
				}
				
			}
			
		}

	}
	
	
	//--- update ---
	
	that.update = function() {
		
		var s, sl, pos;
		var e, el, effectors = that.effectors;
		var x, y, z;
		var manhattanRadius = that.effectorRadius * 1.5;
		
		for( s = 0, sl = smallTriggersCity.length; s < sl; s++ ) {
			
			pos = smallTriggersCity[ s ].mesh.matrixWorld.getPosition();
			
			for( e = 0, el = effectors.length; e < el; e += 3 ) {
				
				x = Math.abs( effectors[ e + 0 ] - pos.x );
				y = Math.abs( effectors[ e + 1 ] - pos.y ); 
				z = Math.abs( effectors[ e + 2 ] - pos.z ); 
				
				if( x + y + z < manhattanRadius ) {
					
					smallTriggersCity[ s ].play( 0.1 + Math.random() * 0.05 );
					smallTriggersCity.splice( s, 1 );
					s--;
					sl--;
					
					break;
					
				}
				
			}
			
		}

		
		for( s = 0, sl = bigTriggersCity.length; s < sl; s++ ) {
			
			pos = bigTriggersCity[ s ].mesh.matrixWorld.getPosition();
			
			for( e = 0, el = effectors.length; e < el; e += 3 ) {
				
				x = Math.abs( effectors[ e + 0 ] - pos.x );
				y = Math.abs( effectors[ e + 1 ] - pos.y ); 
				z = Math.abs( effectors[ e + 2 ] - pos.z ); 
				
				if( x + y + z < manhattanRadius ) {
					
					bigTriggersCity[ s ].play( 0.2 + Math.random() * 0.1 );
					bigTriggersCity.splice( s, 1 );
					s--;
					sl--;
					
					break;
					
				}
				
			}

		}
		
		

		for( s = 0, sl = smallTriggersPrairie.length; s < sl; s++ ) {
			
			pos = smallTriggersPrairie[ s ].mesh.matrixWorld.getPosition();
			
			for( e = 0, el = effectors.length; e < el; e += 3 ) {
				
				x = Math.abs( effectors[ e + 0 ] - pos.x );
				y = Math.abs( effectors[ e + 1 ] - pos.y ); 
				z = Math.abs( effectors[ e + 2 ] - pos.z ); 
				
				if( x + y + z < manhattanRadius ) {
					
					smallTriggersPrairie[ s ].play( 0.1 + Math.random() * 0.05 );
					smallTriggersPrairie.splice( s, 1 );
					s--;
					sl--;
					
					break;
					
				}
				
			}
			
		}
		
	}
	
	
	return that;
	
	
}());


/*
 * Trigger shader (uniform)
 */

TriggerShader = {

	uniforms: function () {

		return {

				"morph": 						{ type: "f", value: 0.0 },
				"darkness": 					{ type: "f", value: 0.0 },

				"diffuse":                      { type: "c", value: new THREE.Color( 0xffffff ) },

				"fogColor": 					{ type: "c", value: new THREE.Color() },
				"fogDensity": 					{ type: "f", value: 0 },

				"enableLighting": 				{ type: "i", value: 1 },
				"ambientLightColor": 			{ type: "fv", value: [] },
				"directionalLightDirection": 	{ type: "fv", value: [] },
				"directionalLightColor": 		{ type: "fv", value: [] },
				"pointLightColor": 				{ type: "fv", value: [] },
				"pointLightPosition": 			{ type: "fv", value: [] },
				"pointLightDistance": 			{ type: "fv1", value: [] }

		   }
	},


	vertexShader: [

		"uniform float	morph;",

		THREE.ShaderChunk[ "map_pars_vertex" ],
		THREE.ShaderChunk[ "lights_pars_vertex" ],
		THREE.ShaderChunk[ "color_pars_vertex" ],
		THREE.ShaderChunk[ "morphtarget_pars_vertex" ],

		"varying vec3 vLightWeighting;",

		"void main() {",

			"vec4 mvPosition = modelViewMatrix * vec4( mix( morphTarget0, morphTarget1, morph ), 1.0 );",

			THREE.ShaderChunk[ "map_vertex" ],
			THREE.ShaderChunk[ "color_vertex" ],

			"vec3 transformedNormal = normalize( normalMatrix * normal );",

			THREE.ShaderChunk[ "lights_vertex" ],

			"gl_Position = projectionMatrix * mvPosition;",

		"}"

	].join("\n"),

	fragmentShader: [

		"uniform float  darkness;",
		"uniform vec3 	diffuse;",
		"uniform float 	opacity;",

		"varying vec3 vLightWeighting;",

		THREE.ShaderChunk[ "color_pars_fragment" ],
		THREE.ShaderChunk[ "map_pars_fragment" ],
		THREE.ShaderChunk[ "fog_pars_fragment" ],

		"void main() {",

			"gl_FragColor = vec4( diffuse, opacity );",
			"gl_FragColor = gl_FragColor * vec4( vLightWeighting, 1.0 );",

			THREE.ShaderChunk[ "map_fragment" ],
			THREE.ShaderChunk[ "color_fragment" ],

			"gl_FragColor = vec4( gl_FragColor.rgb * ( 1.0 - darkness ), 1.0 );",

			THREE.ShaderChunk[ "fog_fragment" ],

		"}"

	].join("\n")

}



/*
 * Trigger Big Shader
 */

TriggerBigShader = {

	uniforms: function () {

		return {

				"effectors": 					{ type: "fv", value: TriggerUtils.effectors },
				"morph": 						{ type: "f", value: 0.0 },
				"darkness": 					{ type: "f", value: 0.0 },

				"diffuse":                      { type: "c", value: new THREE.Color( 0xffffff ) },

				"fogColor": 					{ type: "c", value: new THREE.Color() },
				"fogDensity": 					{ type: "f", value: 0 },

				"enableLighting": 				{ type: "i", value: 1 },
				"ambientLightColor": 			{ type: "fv", value: [] },
				"directionalLightDirection": 	{ type: "fv", value: [] },
				"directionalLightColor": 		{ type: "fv", value: [] },
				"pointLightColor": 				{ type: "fv", value: [] },
				"pointLightPosition": 			{ type: "fv", value: [] },
				"pointLightDistance": 			{ type: "fv1", value: [] }

		   }
	},


	vertexShader: function() { return [

		"const 		int		NUMEFFECTORS = " + (TriggerUtils.effectors.length / 3) + ";",
		"uniform 	vec3 	effectors[ NUMEFFECTORS ];",
		"uniform 	float	morph;",
		
		THREE.ShaderChunk[ "map_pars_vertex" ],
		THREE.ShaderChunk[ "lights_pars_vertex" ],
		THREE.ShaderChunk[ "color_pars_vertex" ],
		THREE.ShaderChunk[ "morphtarget_pars_vertex" ],

		"varying vec3 vLightWeighting;",

		"float elastic( float k ) {",
		
		    "float s;",
		    "float a = 0.8;",
		    "float p = 0.7;",
		    "if ( k == 0.0 ) return 0.0; if ( k == 1.0 ) return 1.0; if ( p == 0.0 ) p = 0.3;",
		    "if ( a == 0.0 || a < 1.0 ) { a = 1.0; s = p / 4.0; }",
		    "else s = p / ( 2.0 * 3.14159265 ) * asin( 1.0 / a );",
		    "return ( a * pow( 2.0, -10.0 * k ) * sin( ( k - s ) * ( 2.0 * 3.14159265 ) / p ) + 1.0 );",
		
		"}",

		"void main() {",

			"float distanceMorph = 0.0;",

			"if( morph < 1.0 ) { ",

				"vec3 worldPosition = ( objectMatrix * vec4( morphTarget0, 1.0 )).xyz;",
				
				"for( int i = 0; i < NUMEFFECTORS; i++ ) {",
				
					"distanceMorph = max( distanceMorph, smoothstep( 0.0, 0.4, 1.0 - distance( worldPosition, effectors[ i ] ) / " + TriggerUtils.effectorRadius + ".0 ));",
				
				"}",
				
				"distanceMorph = elastic( max( morph, distanceMorph ));",

			"} else {",

				"distanceMorph = 1.0;",

			"}",
						
			"vec4 mvPosition = modelViewMatrix * vec4( mix( morphTarget0, morphTarget1, distanceMorph ), 1.0 );",

			THREE.ShaderChunk[ "map_vertex" ],
			THREE.ShaderChunk[ "color_vertex" ],

			"vec3 transformedNormal = normalize( normalMatrix * normal );",

			THREE.ShaderChunk[ "lights_vertex" ],

			"gl_Position = projectionMatrix * mvPosition;",

		"}"
		
		
	].join("\n") },

	fragmentShader: [

		"uniform float  darkness;",
		"uniform vec3 	diffuse;",
		"uniform float 	opacity;",

		"varying vec3 vLightWeighting;",

		THREE.ShaderChunk[ "color_pars_fragment" ],
		THREE.ShaderChunk[ "map_pars_fragment" ],
		THREE.ShaderChunk[ "fog_pars_fragment" ],

		"void main() {",

			"gl_FragColor = vec4( diffuse, opacity );",
			"gl_FragColor = gl_FragColor * vec4( vLightWeighting, 1.0 );",

			THREE.ShaderChunk[ "map_fragment" ],
			THREE.ShaderChunk[ "color_fragment" ],

			"gl_FragColor = vec4( gl_FragColor.rgb * ( 1.0 - darkness ), 1.0 );",

			THREE.ShaderChunk[ "fog_fragment" ],

		"}"

	].join("\n")

}

var CitySoup = function ( camera, scene, shared ) {

	var that = this;
	that.camera = camera,
	renderer = shared.renderer;

	// init
	var noiseCount = 0;
	shared.camPos = new THREE.Vector3( 0, 0, -300 );
	
	var loader = new THREE.JSONLoader();
	loader.onLoadStart = function () { shared.signals.loadItemAdded.dispatch() };
	loader.onLoadComplete = function () { shared.signals.loadItemCompleted.dispatch() };

	shared.trigger = new THREE.Vector3( 0, 0, 0 );

	var shake = 0;

	/*var pointLight = new THREE.PointLight( 0xeeffee, 3, 200 );
	pointLight.position.x = camPos.x;
	pointLight.position.y = camPos.y;
	pointLight.position.z = camPos.z;
	scene.addLight( pointLight, 1.0 );
	*/
	// refactoring

	// setup the different parts of the soup

	// collision scene

	var collisionScene = new CollisionScene( that.camera, scene, 0.1, shared, 500, true );

	collisionScene.settings.maxSpeedDivider = 2;
	collisionScene.settings.capBottom = 3;
	collisionScene.settings.capTop = 1000;
	collisionScene.settings.shootRayDown = false;
	collisionScene.settings.allowFlying = false;
	collisionScene.settings.emitterDivider = 5;
	collisionScene.settings.normalOffsetAmount = 8;
	collisionScene.settings.minDistance = 100;
	collisionScene.settings.keepEmitterFollowDown = true;

	collisionScene.emitter.position.z = -100;
	collisionScene.emitterFollow.position.z = -100;
	collisionScene.cameraTarget.position.z = -100;


	loader.load( { model: "files/models/city/collision/City.Collision_Big.js", callback: mesh0LoadedProxy } );
	loader.load( { model: "files/models/city/collision/City.Collision_Big.001.js", callback: mesh1LoadedProxy } );
	loader.load( { model: "files/models/city/collision/City.Collision_Big.002.js", callback: mesh2LoadedProxy } );
	loader.load( { model: "files/models/city/collision/City.Collision_Big.003.js", callback: mesh3LoadedProxy } );

	camera.target = collisionScene.cameraTarget;

	function mesh0LoadedProxy( geometry ) {

		var scale = 0.1;
		var rotation = new THREE.Vector3( -1.570796,0,3.141591 );
		var position = new THREE.Vector3();

		collisionScene.addLoaded( geometry, scale, rotation, position, scene );

	}

	function mesh1LoadedProxy( geometry ) {

		var scale = 0.1;
		var rotation = new THREE.Vector3( -1.570796,0,0 );
		var position = new THREE.Vector3();
		collisionScene.addLoaded( geometry, scale, rotation, position, scene );

	}

	function mesh2LoadedProxy( geometry ) {

		var scale = 0.1;
		var rotation = new THREE.Vector3(-1.570796,0,0);
		var position = new THREE.Vector3();
		collisionScene.addLoaded( geometry, scale, rotation, position, scene );

	}

	function mesh3LoadedProxy( geometry ) {

		var scale = 0.1;
		var rotation = new THREE.Vector3(-1.570796,0,1.570797);
		var position = new THREE.Vector3();
		collisionScene.addLoaded( geometry, scale, rotation, position, scene );

	}


	// vector trail

	var startPosition = new THREE.Vector3( 0,0,100 );
	var vectors = new Vectors( 50,2,2,startPosition );

	//vectors.settings.divider = 4;
	//vectors.settings.normaldivider = 4;
	//vectors.settings.absoluteTrail = true;

	// ribbons

/*	var ribbonMaterials = [
			new THREE.MeshLambertMaterial( { color:0x888888, opacity: 0.1 } ),
			new THREE.MeshLambertMaterial( { color:0x444444, opacity: 0.1 } ),
			new THREE.MeshLambertMaterial( { color:0x888888, opacity: 0.1 } ),
			new THREE.MeshLambertMaterial( { color:0x444444, opacity: 0.1 } ),
	];

	var ribbons = new Ribbons(4, vectors.array, scene, ribbonMaterials);

	ribbons.settings.ribbonPulseMultiplier_1 = 15;
	ribbons.settings.ribbonPulseMultiplier_2 = 0;
	ribbons.settings.ribbonMin = 0.2;
	ribbons.settings.ribbonMax = 0.2;
*/
	// particles

	var sprite0 = THREE.ImageUtils.loadTexture( "files/textures/particle_0.png" );
	var sprite1 = THREE.ImageUtils.loadTexture( "files/textures/particle_1.png" );
	var sprite2 = THREE.ImageUtils.loadTexture( "files/textures/particle_2.png" );
	var sprite3 = THREE.ImageUtils.loadTexture( "files/textures/particle_3.png" );
	var sprite4 = THREE.ImageUtils.loadTexture( "files/textures/particle_4.png" );

	var particleSprites = [sprite0,sprite1,sprite2,sprite3,sprite4];

	var particles = new Particles( 22, scene, 5, particleSprites, 15, 50, THREE.AdditiveBlending );
	particles.settings.gravitateTowardsCamera = true;

	// stragglers
	var stragglers = new Stragglers( 4, scene, vectors.array );
	//stragglers.settings.constantSpeed = 0.7;
	stragglers.settings.capy = 0;

/*	loader.load( { model: "files/models/soup/animals_A_life.js", callback: stragglerLoadedProxy } );
	
	function stragglerLoadedProxy( geometry ) {
		var morphArray = [5,6,9,2];
		stragglers.addAnimal( geometry, null, 1.7, morphArray );
	}*/


	// running animals

	var runningAnimals = new AnimalSwarm( 30, scene, vectors.array );

	runningAnimals.settings.addaptiveSpeed = true;
	runningAnimals.settings.capy = 0;
	runningAnimals.settings.startPosition = startPosition;
	runningAnimals.settings.constantSpeed = 0.75;
	//runningAnimals.settings.switchPosition = true;

	// preoccupy slots for specific animals - hack...

	runningAnimals.array[0] = "moose";
	runningAnimals.array[10] = "elk";
	runningAnimals.array[20] = "elk";
	runningAnimals.array[1] = "elk";
	runningAnimals.array[4] = "moose";
	runningAnimals.array[14] = "moose";
	runningAnimals.array[8] = "fish";
	runningAnimals.array[16] = "fish";
	runningAnimals.array[24] = "fish";
	//runningAnimals.array[15] = "sock";


	loader.load( { model: "files/models/soup/animals_A_life.js", callback: animalLoadedProxy } );
	loader.load( { model: "files/models/soup/elk_life.js", callback: elkLoadedProxy } );
	loader.load( { model: "files/models/soup/moose_life.js", callback: mooseLoadedProxy } );
	loader.load( { model: "files/models/soup/fish_life.js", callback: fishLoadedProxy } );
	//loader.load( { model: "files/models/soup/sock_jump_life.js", callback: sockLoadedProxy } );

	function animalLoadedProxy( geometry ) {

		// regular

		var morphArray = [0,0,4,3,2,1,0,5,2,7,8,9,10,0,0,3,3,9,2,3];
		var speedArray = [6.5, 13.12, 9.76, 7.47, 4.74, 4.94, 0.777, 6.252, 3.412, 5.52, 5.576];
		
		runningAnimals.addAnimal( geometry, null, 1.5, morphArray, speedArray );
		// stragglers
		morphArray = [5,6,9,2];
		
		var animal = stragglers.addAnimal( geometry, null, 1.8, morphArray, speedArray );
		preinitAnimal( animal, renderer, scene );

	}

	function elkLoadedProxy( geometry ) {
		
		var animal = runningAnimals.addAnimal( geometry, "elk", 2.2, null, [6] );
		preinitAnimal( animal, renderer, scene );

	}

	function mooseLoadedProxy( geometry ) {

		var animal = runningAnimals.addAnimal( geometry, "moose", 1.1, null, [13.964] );
		preinitAnimal( animal, renderer, scene );

	}

	function fishLoadedProxy( geometry ) {

		var morphArray = [0,1,2,3];

		var animal = runningAnimals.addAnimal( geometry, "fish", 1.6, morphArray, [2] );
		preinitAnimal( animal, renderer, scene );

	}

	/*function sockLoadedProxy( geometry ) {
	
		var animal = runningAnimals.addAnimal( geometry, "sock", 1.5, null );
		preinitAnimal( animal, renderer, scene );
	
	}*/


	// flying animals
	var flyingAnimals = new AnimalSwarm( 10, scene, vectors.array );

	flyingAnimals.settings.flying = true;
	flyingAnimals.settings.flyingDistance = 45;

	for (var i=0; i<10; ++i ) {

		var odd = i%2;
		if ( odd == 0 ) {

			flyingAnimals.array[i] = "b";
		}

	}

	loader.load( { model: "files/models/soup/birds_A_life.js", callback: birdsALoadedProxy } );
	loader.load( { model: "files/models/soup/birds_B_life.js", callback: birdsBLoadedProxy } );
	
	function birdsALoadedProxy( geometry ) {

		var morphArray = [0,1,2,3,0,1,2,3,0,1];
		var speedArray = [4.848, 7, 7.5, 3.5];

		var animal = flyingAnimals.addAnimal( geometry, null, 1.3, morphArray, speedArray );
		preinitAnimal( animal, renderer, scene );

	}

	function birdsBLoadedProxy( geometry ) {

		var morphArray = [1,1,0,0,1,0,0,1,0,0];
		var speedArray = [8.5, 8.623];

		var animal = flyingAnimals.addAnimal( geometry, "b", 1.3, morphArray, speedArray );
		preinitAnimal( animal, renderer, scene );

	}


	// flying animals 2
/*	var flyingAnimals2 = new AnimalSwarm(70, scene, vectors.array);
	flyingAnimals2.settings.flying = true;
	flyingAnimals2.settings.divider = 1;
	flyingAnimals2.settings.flyingDistance = 30;
	flyingAnimals2.settings.xPositionMultiplier = 20;
	flyingAnimals2.settings.zPositionMultiplier = 20;
	flyingAnimals2.settings.constantSpeed = 2.0;
	flyingAnimals2.settings.butterfly = true;
	//flyingAnimals2.settings.switchPosition = true;


	loader.load( { model: "files/models/soup/butterfly_low.js", callback: flying2LoadedProxy } );
	
	function flying2LoadedProxy( geometry ) {
		var morphArray = [0,1,2,3];
		flyingAnimals2.addAnimal( geometry, null, 5, morphArray, 5, null, true );
	}
*/

	// butterflys

	var butterflysD = new AnimalInFrontOfCamera( 15, scene );
	loader.load( { model: "files/models/soup/butterfly_hiD.js", callback: butterflysD.addAnimal } );

	var butterflysC = new AnimalInFrontOfCamera( 15, scene );
	loader.load( { model: "files/models/soup/butterfly_hiC.js", callback: butterflysC.addAnimal } );
	
	// trail - of grass/trees/etc

	var trail = new Trail( 80, scene );
	trail.settings.freeRotation = false;

	// preoccupy for differnt grass

	for ( i = 0; i < 80; ++i ) {

		var type = i%4;
		trail.array[i] = "0" + ( type + 1 );

	}

	// preoccupy slots for trees and lighthouse

	for ( i = 0; i < 80; i += 8 ) {

		var type = (i/8)%4;
		trail.array[i] = "tree"+(type+1);

	}
	
	trail.array[4] = "light";

	loader.load( { model: "files/models/soup/grass01.js", callback: grass01LoadedProxy } );
	loader.load( { model: "files/models/soup/grass02.js", callback: grass02LoadedProxy } );
	loader.load( { model: "files/models/soup/grass03.js", callback: grass03LoadedProxy } );
	loader.load( { model: "files/models/soup/grass04.js", callback: grass04LoadedProxy } );
	loader.load( { model: "files/models/soup/grass05.js", callback: grass05LoadedProxy } );
	
	loader.load( { model: "files/models/soup/evergreen_low.js", callback: treeALoadedProxy } );
	loader.load( { model: "files/models/soup/evergreen_high.js", callback: treeBLoadedProxy } );
	loader.load( { model: "files/models/soup/treeGeneric.js", callback: treeCLoadedProxy } );
	loader.load( { model: "files/models/soup/treeGenericLower.js", callback: treeDLoadedProxy } );
	loader.load( { model: "files/models/soup/treeOrange.js", callback: treeELoadedProxy } );

	// lighthouse
	loader.load( { model: "files/models/soup/lighthouse.js", callback: ligthhouseLoadedProxy } );

	function grass01LoadedProxy( geometry ) {

		var object = trail.addInstance( geometry, "01", false );

	}

	function grass02LoadedProxy( geometry ) {

		var object = trail.addInstance( geometry, "02", false );
		preInitModel( geometry, renderer, scene, object );

	}

	function grass03LoadedProxy( geometry ) {

		var object = trail.addInstance( geometry, "03", false );
		preInitModel( geometry, renderer, scene, object );

	}

	function grass04LoadedProxy( geometry ) {

		var object = trail.addInstance( geometry, "04", false );
		preInitModel( geometry, renderer, scene, object );

	}

	function grass05LoadedProxy( geometry ) {

		var object = trail.addInstance( geometry, "05", false );
		preInitModel( geometry, renderer, scene, object );

	}

	function treeALoadedProxy( geometry ) {

		var object = trail.addInstance( geometry, "tree1", true );
		preInitModel( geometry, renderer, scene, object );

	}

	function treeBLoadedProxy( geometry ) {

		var object = trail.addInstance( geometry, "tree2", true );
		preInitModel( geometry, renderer, scene, object );

	}

	function treeCLoadedProxy( geometry ) {

		var object = trail.addInstance( geometry, "tree3", true );
		preInitModel( geometry, renderer, scene, object );

	}

	function treeDLoadedProxy( geometry ) {

		var object = trail.addInstance( geometry, "tree4", true );
		preInitModel( geometry, renderer, scene, object );

	}

	function treeELoadedProxy( geometry ) {

		var object = trail.addInstance( geometry, "tree5", true );
		preInitModel( geometry, renderer, scene, object );

	}

	function ligthhouseLoadedProxy( geometry ) {
		
		var object = trail.addInstance( geometry, "light", false, true );
		preInitModel( geometry, renderer, scene, object );

		trail.array[4].maxHeight = 12;

	}

	
	this.update = function ( delta ) {

		if (isNaN(delta) || delta > 1000 || delta == 0 ) {
			//delta = 1000/60;
			return;
		}
		//var optimal = 1000/60;
		//var percent = delta/optimal;
		//console.log(optimal+" | "+delta+" | "+percent);

		// update to reflect _real_ camera position
		shared.camPos.x = camera.matrixWorld.n14;
		shared.camPos.y = camera.matrixWorld.n24;
		shared.camPos.z = camera.matrixWorld.n34;

		// temp reset
		if (shared.camPos.z <= -3290 || shared.camPos.x > 1640 || shared.camPos.x < -1640) {
			reset();
		}
		
		// straggler test
		if (shake%50 == 49) {
			stragglers.create(collisionScene.emitterFollow.position, collisionScene.currentNormal, collisionScene.emitter.position);
		}

		// camera roll hack...
		var dx = camera.position.x-collisionScene.cameraTarget.position.x;
		var dz = camera.position.z-collisionScene.cameraTarget.position.z;

		var angleRad = Math.atan2(dz, dx);
		camera.up.x = ( ((angleRad-Math.PI/2)/4)*-1 );

		// camera shake hack...
		++shake;
		var xshake = 0;
		if (shake%4 == 0) {
			xshake = (Math.random()-0.5)*0.6;
			camera.up.x += (Math.random()-0.5)*0.01;
		}
		if (shake%2 == 0) {
			camera.position.y = 18+(Math.random()-0.5)*0.6;
		}

		noiseCount += Math.random();
		var noise = Math.sin(noiseCount/15)*30;
		camera.position.x = 0+noise+xshake+( ((angleRad-Math.PI/2)*30)*-1 );

		var zoom = collisionScene.cameraTarget.position.y/25;
		camera.fov = 60-zoom;
		camera.updateProjectionMatrix();

		// spawn animal test
		if (shake%3 == 2) {
			//runningAnimals.create(collisionScene.emitterFollow.position, collisionScene.currentNormal, collisionScene.emitterFollow.position);
			runningAnimals.create(vectors.array[1].position, collisionScene.currentNormal);
			//flyingAnimals.create(collisionScene.emitterFollow.position, collisionScene.currentNormal, collisionScene.emitterFollow.position);
			flyingAnimals.create(vectors.array[1].position, collisionScene.currentNormal);
		}

		// update the soup parts
		collisionScene.update(shared.camPos, delta);
		vectors.update(collisionScene.emitterFollow.position, collisionScene.currentNormal);
		//ribbons.update(collisionScene.emitterFollow.position);

		particles.update(delta, vectors.array[0].position, shared.camPos);
		//runningAnimals.update(delta, camPos, collisionScene.emitterFollow.position, collisionScene.currentNormal);
		runningAnimals.update(delta, shared.camPos);
		stragglers.update(delta, shared.camPos);
		//flyingAnimals.update(delta, camPos, collisionScene.emitterFollow.position, collisionScene.currentNormal);
		flyingAnimals.update(delta, shared.camPos);
		//flyingAnimals2.update();
		//butterflys.update(camPos, that.camera.theta, delta);
		butterflysC.update(shared.camPos, angleRad, delta);
		butterflysD.update(shared.camPos, angleRad, delta, true);
		trail.update(collisionScene.emitter.position, collisionScene.emitterNormal, shared.camPos, delta);
		TWEEN.update();

		shared.trigger.copy(vectors.array[10].position);

		// pointlight
		/*pointLight.position.x = collisionScene.emitterFollow.position.x + collisionScene.currentNormal.x*100;
		pointLight.position.y = collisionScene.emitterFollow.position.y + collisionScene.currentNormal.y*100;
		pointLight.position.z = collisionScene.emitterFollow.position.z + collisionScene.currentNormal.z*100;
		*/
	}

	this.changeCamera = function ( camera ) {

		that.camera = camera;
		collisionScene.settings.camera = camera;

	}


	function reset () {

		camPos = new THREE.Vector3( 0, 20, 50 );

		collisionScene.reset(shared.camPos.x,shared.camPos.y,shared.camPos.z);
		vectors.reset(shared.camPos.x,shared.camPos.y,shared.camPos.z);
		runningAnimals.reset(shared.camPos.x,shared.camPos.y,shared.camPos.z);
		flyingAnimals.reset(shared.camPos.x,shared.camPos.y,shared.camPos.z);
		//flyingAnimals2.reset(shared.camPos.x,shared.camPos.y,shared.camPos.z);
		particles.reset(shared.camPos.x,shared.camPos.y,shared.camPos.z);
		stragglers.reset(shared.camPos.x,shared.camPos.y,shared.camPos.z);

	}


	this.destruct = function () {

	}

}

var PrairieSoup = function ( camera, scene, shared ) {

	var that = this;

	// init

	shared.camPos = new THREE.Vector3( 302.182, -9.045, -105.662 );

	var loader = new THREE.JSONLoader();
	loader.onLoadStart = function () { shared.signals.loadItemAdded.dispatch() };
	loader.onLoadComplete = function () { shared.signals.loadItemCompleted.dispatch() };

/*	var pointLight = new THREE.PointLight( 0x999999, -1.25, 400 );
	pointLight.position.x = shared.camPos.x;
	pointLight.position.y = shared.camPos.y;
	pointLight.position.z = shared.camPos.z;
	scene.addLight( pointLight, 1.0 );
*/
	// setup the different parts of the soup

	var spawnAnimal = 0;
	var spawnBird = 0;

	var vectors;
	var ribbons;
	var trail;
	var runningAnimals;
	var flyingAnimals;
	var particles;

	// collision scene
	
	var collisionScene = new CollisionScene( camera, scene, 1.0, shared, 1100 );

	collisionScene.settings.maxSpeedDivider = 1;
	collisionScene.settings.allowFlying = false;
	collisionScene.settings.emitterDivider = 2;
	collisionScene.settings.shootRayDown = false;
	collisionScene.settings.keepEmitterFollowDown = true;
	collisionScene.settings.normalOffsetAmount = 7;
	collisionScene.settings.minDistance = 0;

	collisionScene.emitter.position.set( shared.camPos.x + 40, shared.camPos.y, shared.camPos.z + 20 );
	collisionScene.emitterFollow.position.set( shared.camPos.x + 40, shared.camPos.y, shared.camPos.z + 20 );

	var emitterDistance = collisionScene.distance;

	// vector trail
	var startPosition = new THREE.Vector3( shared.camPos.x - 10, shared.camPos.y, shared.camPos.z + 30 );
	vectors = new Vectors( 30, 1, 1, startPosition );
	vectors.absoluteTrail = true;
	// ribbons

	/*var ribbonMaterials = [

		new THREE.MeshLambertMaterial( { color:0x000000 } ),
		new THREE.MeshLambertMaterial( { color:0x555555 } ),
		new THREE.MeshLambertMaterial( { color:0x000000 } ),
		new THREE.MeshLambertMaterial( { color:0x555555 } ),
		new THREE.MeshLambertMaterial( { color:0x000000 } ),
		new THREE.MeshLambertMaterial( { color:0x555555 } )

	];

	ribbons = new Ribbons( 6, vectors.array, scene, ribbonMaterials );
	ribbons.settings.ribbonPulseMultiplier_1 = 4;
	ribbons.settings.ribbonPulseMultiplier_2 = 4;
	ribbons.settings.ribbonMin = 0.2;
	ribbons.settings.ribbonMax = 0.2;
	*/

	// particles

	var sprite0 = THREE.ImageUtils.loadTexture( "files/textures/dark_0.png" );
	var sprite1 = THREE.ImageUtils.loadTexture( "files/textures/dark_1.png" );
	var sprite2 = THREE.ImageUtils.loadTexture( "files/textures/dark_2.png" );
	var sprite3 = THREE.ImageUtils.loadTexture( "files/textures/dark_3.png" );
	var sprite4 = THREE.ImageUtils.loadTexture( "files/textures/dark_4.png" );

	var particleSprites = [sprite0,sprite1,sprite2,sprite3,sprite4];
	particles = new Particles(20, scene, 1.5, particleSprites, 25, 40);
	particles.settings.zeroAlphaStart = false;
	particles.settings.aliveDivider = 2;

	// running animals

	runningAnimals = new AnimalSwarm( 40, scene, vectors.array );
	runningAnimals.settings.xPositionMultiplier = 22;
	runningAnimals.settings.zPositionMultiplier = 18;
	runningAnimals.settings.shootRayDown = true;
	//runningAnimals.settings.constantSpeed = 1.5
	runningAnimals.settings.adaptiveSpeed = true;
	runningAnimals.settings.divider = 1;
	runningAnimals.settings.startPosition = startPosition;

	// preoccupy slots for specific animals - hack...

	runningAnimals.array[0] = "gator";
	runningAnimals.array[10] = "gator";
	runningAnimals.array[5] = "goat";
	runningAnimals.array[18] = "goat";
	runningAnimals.array[25] = "goat";
	runningAnimals.array[2] = "octo";
	runningAnimals.array[7] = "octo";
	runningAnimals.array[32] = "octo";
	runningAnimals.array[38] = "octo";

	runningAnimals.array[3] = "animal";
	runningAnimals.array[4] = "animal";
	runningAnimals.array[6] = "animal";
	runningAnimals.array[8] = "animal";
	runningAnimals.array[10] = "animal";
	runningAnimals.array[12] = "animal";
	runningAnimals.array[15] = "animal";
	runningAnimals.array[16] = "animal";
	runningAnimals.array[19] = "animal";
	runningAnimals.array[20] = "animal";
	runningAnimals.array[21] = "animal";
	runningAnimals.array[23] = "animal";
	runningAnimals.array[24] = "animal";
	runningAnimals.array[25] = "animal";
	runningAnimals.array[28] = "animal";
	runningAnimals.array[29] = "animal";
	runningAnimals.array[31] = "animal";
	runningAnimals.array[33] = "animal";
	runningAnimals.array[22] = "shadow";
	runningAnimals.array[1] = "shadow";
	runningAnimals.array[17] = "arm";
	runningAnimals.array[30] = "arm";


	loader.load( { model: "files/models/soup/taruffalo_black.js", callback: taruffaloLoadedProxy } );
	loader.load( { model: "files/models/soup/animals_A_black.js", callback: animalsLoadedProxy } );
	loader.load( { model: "files/models/soup/gator_black.js", callback: gatorLoadedProxy } );
	loader.load( { model: "files/models/soup/goat_black.js", callback: goatLoadedProxy } );
	loader.load( { model: "files/models/soup/shdw2.js", callback: shadowLoadedProxy } );
	loader.load( { model: "files/models/soup/arm_black.js", callback: armLoadedProxy } );
	loader.load( { model: "files/models/soup/octo_black.js", callback: octoLoadedProxy } );

	function animalsLoadedProxy( geometry ) {

		var animal, 
			morphArray = [0,0,1,2,1,2,0,2,3];
		var speedArray = [13.12, 9.73, 6.7, 3.06];
		
		animal = runningAnimals.addAnimal( geometry, "animal", 0.35, morphArray, speedArray );
		preinitAnimal( animal, shared.renderer, scene );

	};

	function taruffaloLoadedProxy( geometry ) {
		
		var animal,
			morphArray = [0,1,0,1];
		var speedArray = [9.2, 14.2];
		animal = runningAnimals.addAnimal( geometry, null, 0.3, morphArray, speedArray );
		preinitAnimal( animal, shared.renderer, scene );

	};

	function gatorLoadedProxy( geometry ) {

		var animal;

		animal = runningAnimals.addAnimal( geometry, "gator", 0.35, null, [4.5] );
		preinitAnimal( animal, shared.renderer, scene );

	};

	function goatLoadedProxy( geometry ) {
		
		var animal;
		
		animal = runningAnimals.addAnimal( geometry, "goat", 0.45, null, [5.2] );
		preinitAnimal( animal, shared.renderer, scene );

	};

	function shadowLoadedProxy( geometry ) {
		
		var animal;

		animal = runningAnimals.addAnimal( geometry, "shadow", 0.7, null, [3.5] );
		preinitAnimal( animal, shared.renderer, scene );

	};

	function armLoadedProxy( geometry ) {
		
		var animal;

		animal = runningAnimals.addAnimal( geometry, "arm", 1.5, null, [2.5] );
		preinitAnimal( animal, shared.renderer, scene );

	};

	function octoLoadedProxy( geometry ) {

		var animal,
			morphArray = [0,0,0,2];
		var speedArray = [1.629, 3, 1.7];

		animal = runningAnimals.addAnimal( geometry, "octo", 0.55, morphArray, speedArray );
		preinitAnimal( animal, shared.renderer, scene );

	};


	// flying animals

	flyingAnimals = new AnimalSwarm( 10, scene, vectors.array );
	flyingAnimals.settings.flying = true;
	flyingAnimals.settings.xPositionMultiplier = 24;
	flyingAnimals.settings.zPositionMultiplier = 12;
	flyingAnimals.settings.constantSpeed = 2.0;
	flyingAnimals.settings.divider = 4;
	flyingAnimals.settings.flyingDistance = 0;

	loader.load( { model: "files/models/soup/birds_A_black.js", callback: birdsALoadedProxy } );
	
	function birdsALoadedProxy( geometry ) {
		
		var animal,
			morphArray = [1,1,0,0,1,0,0,1,0,0];
		var speedArray = [12, 14];

		animal = flyingAnimals.addAnimal( geometry, null, 0.4, morphArray, speedArray );
		preinitAnimal( animal, shared.renderer, scene );
		
	};
	
	// trail - of grass/trees/etc
	var trailMaterials = [new THREE.MeshLambertMaterial( { color: 0x000000 } ),
					 new THREE.MeshLambertMaterial( { color: 0x170202 } ),
					 new THREE.MeshLambertMaterial( { color: 0x030303 } ),
					 new THREE.MeshLambertMaterial( { color: 0x080808 } ),
					 new THREE.MeshLambertMaterial( { color: 0x171302 } ),
					 new THREE.MeshLambertMaterial( { color: 0x030303 } ),
					 new THREE.MeshLambertMaterial( { color: 0x080808 } ),
					 new THREE.MeshLambertMaterial( { color: 0x030303 } ),
					 new THREE.MeshLambertMaterial( { color: 0x080808 } )
	];

	var trail = new Trail( 80, scene );

	// preoccupy for differnt grass
	for ( i=0; i<80; ++i ) {

		var type = i%2;
		trail.array[i] = "0"+(type+1);
		trail.array[i] = "04";

	}

	trail.settings.spread = 10;
	trail.settings.aliveDivider = 40;
	trail.settings.tweenTime = 400;
	trail.settings.scale = 5.0;
	trail.settings.offsetAmount = 10;

	/*loader.load( { model: "files/models/soup/darkBlob1.js", callback: blob01LoadedProxy } );
	loader.load( { model: "files/models/soup/darkBlob2.js", callback: blob02LoadedProxy } );
	loader.load( { model: "files/models/soup/darkBlob3.js", callback: blob03LoadedProxy } );*/
	loader.load( { model: "files/models/soup/darkBlob4.js", callback: blob04LoadedProxy } );

/*	function blob01LoadedProxy( geometry ) {

		var object = trail.addInstance( geometry, "01", false, false );
		preInitModel( geometry, renderer, scene, object );

	}

	function blob02LoadedProxy( geometry ) {

		var object = trail.addInstance( geometry, "02", false, false );
		preInitModel( geometry, renderer, scene, object );

	}

	function blob03LoadedProxy( geometry ) {

		var object = trail.addInstance( geometry, "03", false, false );
		preInitModel( geometry, renderer, scene, object );

	}*/

	function blob04LoadedProxy( geometry ) {

		var object = trail.addInstance( geometry, "04", false, false, trailMaterials );
		preInitModel( geometry, renderer, scene, object );

	}


	this.update = function ( delta ) {

		// update to reflect _real_ camera position

		shared.camPos.x = camera.matrixWorld.n14;
		shared.camPos.y = camera.matrixWorld.n24;
		shared.camPos.z = camera.matrixWorld.n34;

		// temp reset

		if ( shared.camPos.x > 1090 ) {

			reset();

		}

		spawnAnimal += delta;
		spawnBird += delta;

		// update the soup parts	

		collisionScene.update( shared.camPos, delta );
		vectors.update( collisionScene.emitterFollow.position, collisionScene.currentNormal );
		//ribbons.update( collisionScene.emitterFollow.position );
		particles.update( delta, vectors.array[0].position );
		//runningAnimals.update();
		//flyingAnimals.update();
		runningAnimals.update( delta, shared.camPos );
		flyingAnimals.update( delta, shared.camPos );

		trail.update( collisionScene.emitter.position, collisionScene.emitterNormal, shared.camPos, delta );

		// spawn animal test
		if ( spawnAnimal >= 100 ) {

			//runningAnimals.create(vectors.array[1].position, collisionScene.currentNormal);
			var rndx = (Math.random()*20)-10;
			var rndz = (Math.random()*20)-10;
			var pos1 = new THREE.Vector3();
			var pos2 = new THREE.Vector3();
			pos1.copy(collisionScene.emitterFollow.position);
			pos2.copy(collisionScene.emitter.position);
			pos1.x += rndx;
			pos2.x += rndx;
			pos1.z += rndz;
			pos2.z += rndz;
			runningAnimals.create(pos1, collisionScene.currentNormal, pos2);
			spawnAnimal = 0;

		}

		if ( spawnBird >= 500 ) {

			//flyingAnimals.create(vectors.array[1].position, collisionScene.currentNormal);
			flyingAnimals.create( collisionScene.emitterFollow.position, collisionScene.currentNormal, collisionScene.emitter.position );
			spawnBird = 0;

		}			

		TWEEN.update();




/*		var moveDistance = (collisionScene.distance-emitterDistance)/40;
		emitterDistance += moveDistance;
		var zoom = emitterDistance/15;
		zoom = Math.min(30, zoom);
		camera.fov = 60-zoom;
		camera.updateProjectionMatrix();
*/
		TriggerUtils.effectors[ 0 ] = vectors.array[5].position.x;
		TriggerUtils.effectors[ 1 ] = vectors.array[5].position.y;
		TriggerUtils.effectors[ 2 ] = vectors.array[5].position.z;
		
		//ROME.TrailShader.uniforms.lavaHeadPosition.value.set( vectors.array[15].position.x, 0, -vectors.array[15].position.z );
		ROME.TrailShader.uniforms.lavaHeadPosition.value.set( 0, 0, 0 );

		// pointlight

/*		pointLight.position.x = vectors.array[0].position.x;
		pointLight.position.y = vectors.array[0].position.y + 30;
		pointLight.position.z = vectors.array[0].position.z;
*/
		shared.lavatrailx = vectors.array[5].position.x;
		shared.lavatrailz = vectors.array[5].position.z;

	};



	function reset () {

		shared.camPos.set( 302.182, -9.045, -105.662 );

		collisionScene.reset( shared.camPos.x, shared.camPos.y, shared.camPos.z );
		vectors.reset( shared.camPos.x, shared.camPos.y, shared.camPos.z );
		runningAnimals.reset( shared.camPos.x, shared.camPos.y, shared.camPos.z );
		flyingAnimals.reset( shared.camPos.x, shared.camPos.y, shared.camPos.z );
		particles.reset( shared.camPos.x, shared.camPos.y, shared.camPos.z );

	};

	this.destruct = function () {

	};

};

var DunesSoup = function ( camera, scene, shared ) {

	var that = this;

	shared.camPos = new THREE.Vector3( 0, 150, 0 );

	var loader = new THREE.JSONLoader();
	loader.onLoadStart = function () { shared.signals.loadItemAdded.dispatch() };
	loader.onLoadComplete = function () { shared.signals.loadItemCompleted.dispatch() };
	
	// setup the different parts of the soup

	// collision scene
	
	var collisionScene = new CollisionScene( camera, scene, 0.15, shared, 3000 );
	collisionScene.settings.emitterDivider = 4;
	collisionScene.settings.maxSpeedDivider = 0.5;
	//collisionScene.settings.capBottom = 50;
	collisionScene.settings.allowFlying = true;
	//collisionScene.settings.normalOffsetAmount = 50;

	// vector trail

	var vectors = new Vectors();
	vectors.settings.divider = 3;

	// ribbons
	
	var ribbonMaterials = [
	
		new THREE.MeshBasicMaterial( { color:0xd9f3fb, opacity: 0.25 } ),
		new THREE.MeshBasicMaterial( { color:0xe4f1f5, opacity: 0.25 } ),
		new THREE.MeshBasicMaterial( { color:0xffffff, opacity: 0.25 } ),
		new THREE.MeshBasicMaterial( { color:0xeeeeee, opacity: 0.25 } ),
		new THREE.MeshBasicMaterial( { color:0xdcf3fa, opacity: 0.25 } ),
		new THREE.MeshBasicMaterial( { color:0xd2f3fc, opacity: 0.25 } )

	];

	var ribbons = new Ribbons( 6, vectors.array, scene, ribbonMaterials );

	ribbons.settings.ribbonPulseMultiplier_1 = 20;
	ribbons.settings.ribbonPulseMultiplier_2 = 0.01;
	ribbons.settings.ribbonMin = 0.05;
	ribbons.settings.ribbonMax = 0.1;

	// particles
/*	var sprite0 = THREE.ImageUtils.loadTexture( "files/textures/particle_0.png" );
	var sprite1 = THREE.ImageUtils.loadTexture( "files/textures/particle_1.png" );
	var sprite2 = THREE.ImageUtils.loadTexture( "files/textures/particle_2.png" );
	var sprite3 = THREE.ImageUtils.loadTexture( "files/textures/particle_3.png" );
	var sprite4 = THREE.ImageUtils.loadTexture( "files/textures/particle_4.png" );

	var particleSprites = [sprite0,sprite1,sprite2,sprite3,sprite4];

	var particles = new Particles(50, scene, 12, particleSprites, 80, 150);
	//particles.zeroAlphaStart = false;
	particles.settings.aliveDivider = 2.0;
*/

	// flying animals

	var flyingAnimals = new AnimalSwarm( 20, scene, vectors.array );
	flyingAnimals.settings.flying = true;
	flyingAnimals.settings.flyingDistance = 10;
	flyingAnimals.settings.divider = 10;
	flyingAnimals.settings.constantSpeed = 0.8;
	flyingAnimals.settings.respawn = false;

	for ( var i=0; i<20; ++i ) {

		var odd = i%2;
		if (odd == 0) {

			flyingAnimals.array[i] = "b";

		}

	}

	loader.load( { model: "files/models/soup/birds_A_life.js", callback: birdsALoadedProxy } );
	loader.load( { model: "files/models/soup/birds_B_life.js", callback: birdsBLoadedProxy } );
	
	function birdsALoadedProxy( geometry ) {

		var animal,
			morphArray = [1,1,0,0,1,0,0,1,0,0];

		animal = flyingAnimals.addAnimal( geometry, null, 2.8, morphArray, 0.8 );
		preinitAnimal( animal, shared.renderer, scene );

	};

	function birdsBLoadedProxy( geometry ) {
		
		var animal,
			morphArray = [1,1,0,0,1,0,0,1,0,0];
		
		animal = flyingAnimals.addAnimal( geometry, "b", 2.8, morphArray, 0.8 );
		preinitAnimal( animal, shared.renderer, scene );

	};

	this.update = function ( delta ) {

		// update to reflect _real_ camera position

		shared.camPos.x = camera.matrixWorld.n14;
		shared.camPos.y = camera.matrixWorld.n24;
		shared.camPos.z = camera.matrixWorld.n34;

		flyingAnimals.create(vectors.array[1].position, collisionScene.currentNormal);

		// update the soup parts

		collisionScene.update( shared.camPos, delta );
		vectors.update( collisionScene.emitterFollow.position, collisionScene.currentNormal );
		ribbons.update( collisionScene.emitterFollow.position );
		//flyingAnimals.update();
		flyingAnimals.update(delta, shared.camPos);
		//particles.update(delta, vectors.array[0].position);
		
	}


	this.destruct = function () {

	}

};

var Ribbon = function (in_length, in_height, in_segments) {

	var scope = this;

	var length = in_length || 100;
	var height = in_height || 10;
	var segments = in_segments || 10;

	THREE.Geometry.call(this);

	var halfHeight = height/2;
	var segmentWidth = length/segments;
	var tempVertices = [];

	// vertices
	for (var i=0; i<(segments+2); ++i ) {
		var x = i*segmentWidth
		var y_up = halfHeight;
		var y_down = -halfHeight;
		var z = 0;
		tempVertices.push(v(x,y_up,z));
		tempVertices.push(v(x,y_down,z));
	}

	// faces
	for (var i=0; i<segments*2; i+=2 ) {
		//face 1
		f3( tempVertices[i], tempVertices[i+2], tempVertices[i+1] );
		//face 2
		f3( tempVertices[i+2], tempVertices[i+3], tempVertices[i+1] );
	}

	this.computeCentroids();
	this.computeFaceNormals();
	this.computeVertexNormals();
	//this.sortFacesByMaterial();

	function v( x, y, z ) {
		var i = scope.vertices.push( new THREE.Vertex( new THREE.Vector3( x, y, z ) ) );
		return i-1;
	}

	function f3( a, b, c ) {
		scope.faces.push( new THREE.Face3( a, b, c ) );
	}

}

Ribbon.prototype = new THREE.Geometry();
Ribbon.prototype.constructor = Ribbon;
/**
 * @author Mikael Emtinger
 */


ROME = {};


// animal

ROME.Animal = function( geometry, parseMorphTargetsNames ) {

	var result = ROME.AnimalAnimationData.init( geometry, parseMorphTargetsNames );

	var that = {};
	that.morph = 0.0;
	that.animalA = { frames: undefined, currentFrame: 0, lengthInFrames: 0, currentTime: 0, lengthInMS: 0, timeScale: 1.0, name: "" };
	that.animalB = { frames: undefined, currentFrame: 0, lengthInFrames: 0, currentTime: 0, lengthInMS: 0, timeScale: 1.0, name: "" };
	that.availableAnimals = result.availableAnimals;
	that.mesh = new THREE.Mesh( geometry, result.material );

	var isPlaying = false;
	var morphTargetOrder = that.mesh.morphTargetForcedOrder;
	var material = result.material;

	
	//--- play ---

	that.play = function( animalA, animalB, morph, startTimeAnimalA, startTimeAnimalB ) {
		
		if( !isPlaying ) {

			isPlaying = true;
			that.morph = 0;

			THREE.AnimationHandler.addToUpdate( that );

		}
		
		animalB = animalB !== undefined ? animalB : animalA;
		morph = morph !== undefined ? morph : 0;
		
		setAnimalData( animalA, that.animalA );
		setAnimalData( animalB, that.animalB );
		
		that.animalA.currentTime = startTimeAnimalA ? startTimeAnimalA : 0;
		that.animalB.currentTime = startTimeAnimalB ? startTimeAnimalB : 0;
		
		that.update( 0 );

	};


	//--- update ---
	
	that.update = function( deltaTimeMS ) {
		
		if( that.mesh._modelViewMatrix ) {
			
			var data, dataNames = [ "animalA", "animalB" ];
			var d, dl;
			var f, fl;
			var frame, nextFrame;
			var time, nextTime;
			var unloopedTime;
			var lengthInMS;
			var lenghtInFrames;
			var morphTarget;
			var scale;
			
			for( d = 0, dl = dataNames.length, morphTarget = 0; d < dl; d++ ) {
				
				data = that[ dataNames[ d ] ];
				
				unloopedTime = data.currentTime;
				data.currentTime = ( data.currentTime + deltaTimeMS * data.timeScale ) % data.lengthInMS;
	
	
				// did we loop?
	
				if( unloopedTime > data.currentTime ) {
	
					data.currentFrame = 0;				
	
				}
	
	
				// find frame/nextFrame
				
	
				frame = 0;
				
				for( f = data.currentFrame, fl = data.lengthInFrames - 1; f < fl; f++ ) {
					
					if( data.currentTime >= data.frames[ f ].time && data.currentTime < data.frames[ f + 1 ].time ) {
						
						frame = f;
						break;
					}
				}
	
				data.currentFrame = frame;
				nextFrame = frame + 1 < fl ? frame + 1 : 0;
	

				morphTargetOrder[ morphTarget++ ] = data.frames[ frame     ].index;
				morphTargetOrder[ morphTarget++ ] = data.frames[ nextFrame ].index;

				
				time     = data.frames[ frame     ].time;
				nextTime = data.frames[ nextFrame ].time > time ? data.frames[ nextFrame ].time : data.frames[ nextFrame ].time + data.lengthInMS; 
				
				scale = ( data.currentTime - time ) / ( nextTime - time ) ;
				
				material.uniforms[ dataNames[ d ] + "Interpolation" ].value = scale;
	
			}
	
			material.uniforms.animalMorphValue.value = that.morph;
			
			if( material.attributes[ that.animalA.name ] !== undefined ) {
				
				material.attributes.colorAnimalA.buffer = material.attributes[ that.animalA.name ].buffer;
				
			}

			if( material.attributes[ that.animalB.name ] !== undefined ) {
				
				material.attributes.colorAnimalB.buffer = material.attributes[ that.animalB.name ].buffer;
				
			}
			
		}
		
	};


	//--- set new target animal ---
	
	that.setNewTargetAnimal = function( animal, startTimeAnimalB ) {
		
		if( that.morph === 1 ) {
			
			// switch so B -> A
			
			for( var property in that.animalA ) {
				
				that.animalA[ property ] = that.animalB[ property ];
				
			}
			
			
			// set new B and change morph
			
			that.animalB.currentTime = startTimeAnimalB ? startTimeAnimalB : 0;
			setAnimalData( animal, that.animalB );
			setFrame( that.animalB );
			that.morph = 0;
			
		} else {
			
			console.log( "Error: Cannot change animal target if morph != 1. Skipping." );

		}
		
	};


	//--- set animal data ---

	var setAnimalData = function( name, data ) {
		
		if( ROME.AnimalAnimationData[ name ] !== undefined ) {
			
			data.frames         = ROME.AnimalAnimationData[ name ];
			data.lengthInFrames = data.frames.length;
			data.lengthInMS     = data.frames[ data.lengthInFrames - 1 ].time;
			data.name           = name.toLowerCase();
			data.normalsOffset  = Math.floor( data.frames.length * 0.5, 10 );

		} else {
			
			console.log( "Error: Couldn't find data for animal " + name );
			
		}
		
	};
	
	
	//--- set frame ---
	
	var setFrame = function( data ) {
		
		var f, fl;
		var currentTime = data.currentTime;
		var frames = data.frames;
		
		for( f = 0, fl < frames.length; f < fl; f++ ) {
			
			if( currentTime >= frames[ f ].time ) {
				
				data.currentFrame = f;
				return;
				
			}
			
		}
		
	};


	//--- set current frame ---
	
	var setCurrentFrame = function( data ) {

	};

	
	//--- return public ---
	
	return that;

};



// shader

ROME.AnimalShader = {
	
	uniforms: function () {

		return THREE.UniformsUtils.merge( [ THREE.UniformsLib[ "common" ],
										    THREE.UniformsLib[ "lights" ], {
					"animalAInterpolation": 		{ type: "f", value: 0.0 },
					"animalBInterpolation": 		{ type: "f", value: 0.0 },
					"animalMorphValue" :    		{ type: "f", value: 0.0 },					

					"lightScale"  :    { type: "f", value: 1.0 },
					"lightOffset" :    { type: "v3", value: new THREE.Vector3( 0.0, 0.0, 0.0 ) }

			   } ] );
	},
	
	attributes: function() {
		
		return {
			
			"colorAnimalA": 	{ type: "c", boundTo: "faces", value: [] },
			"colorAnimalB": 	{ type: "c", boundTo: "faces", value: [] }
			
		}
		
	},

	vertexShader: [

		"uniform 	float	animalAInterpolation;",
		"uniform 	float	animalBInterpolation;",
		"uniform 	float	animalMorphValue;",

		"attribute	vec3	colorAnimalA;",
		"attribute	vec3	colorAnimalB;",

		"varying vec3 vColor;",
		"varying vec3 vLightWeighting;",
	
		THREE.ShaderChunk[ "lights_pars_vertex" ],

		"uniform float lightScale;",
		"uniform vec3 lightOffset;",

		"void main() {",
			
			"vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
			"vColor = mix( colorAnimalA, colorAnimalB, animalMorphValue );",

			"vec3 animalA = mix( morphTarget0, morphTarget1, animalAInterpolation );",
			"vec3 animalB = mix( morphTarget2, morphTarget3, animalBInterpolation );",
			"vec3 morphed = mix( animalA,      animalB,      animalMorphValue );",
			
			"vec3 transformedNormal = normalize( normalMatrix * normal );",

			//THREE.ShaderChunk[ "lights_vertex" ],
			
			// separate lights for animals
			// ( ambient + one directional )

			"vLightWeighting = vec3( 0.2 );",

			"vec4 lDirection = viewMatrix * vec4( vec3( 0.0, 1.0, 1.0 ), 0.0 );",
			"float directionalLightWeighting = dot( transformedNormal, normalize( lDirection.xyz ) ) * 0.5 + 0.5;",
			"vLightWeighting += vec3( 1.0 ) * directionalLightWeighting;",
			
			/*
			"vec4 lDirection = viewMatrix * vec4( vec3( 0.0, 1.0, 1.0 ), 0.0 );",
			"float directionalLightWeighting = max( dot( transformedNormal, normalize( lDirection.xyz ) ), 0.0 );",
			"vLightWeighting += vec3( 1.0 ) * directionalLightWeighting;",
			*/
			
			// tweak lighting
			
			//"vLightWeighting = lightScale * vLightWeighting + lightOffset;",

			"gl_Position = projectionMatrix * modelViewMatrix * vec4( morphed, 1.0 );",

		"}"

	].join("\n"),

	fragmentShader: [

		"uniform vec3 diffuse;",
		"uniform float opacity;",
		
		THREE.ShaderChunk[ "fog_pars_fragment" ],
		THREE.ShaderChunk[ "lights_pars_fragment" ],

		"varying vec3 vLightWeighting;",
		"varying vec3 vColor;",

		"void main() {",

			//"gl_FragColor = vec4( 1.0 );",

			"gl_FragColor = vec4( vLightWeighting, 1.0 );",
			//"gl_FragColor = gl_FragColor * vec4( diffuse, opacity );",

			//"gl_FragColor = gl_FragColor * vec4( vColor, 1.0 );",
			
			"gl_FragColor = gl_FragColor * vec4( vColor, 1.0 ) * vec4( 0.9, 0.85, 0.8, 1.0 );",
			
			THREE.ShaderChunk[ "fog_fragment" ],

		"}"

	].join("\n")
}


// animation data

ROME.AnimalAnimationData = {

	// static animal names (please fill in as it's faster than parsing through the geometry.morphTargets

	//animalNames: [ "scorp", "tarbuffalo", "horse", "bear", "mountainlion", "deer", "fox", "goldenRetreiver", "seal", "chow", "raccoon", "bunny", "frog", "elk", "moose", "fishA", "fishB", "fishC", "fishD", "sockPuppet", "shdw2", "blackWidow", "crab", "goat", "gator", "tarbuffalo_runB", "tarbuffalo_runA", "wolf", "toad", "parrot", "eagle", "owl", "hummingBird", "flamingo", "stork", "butterflyA", "butterflyD", "butterflyLow", "vulture", "raven", "bison", "sickle" ],
	animalNames: [ "tarbuffalo", "horse", "bearbrown", "mountainlion", "deer", "goldenRetreiver", "fox", "seal", "chow", "raccoon", "bunny", "frog", "elk", "moose", "fishA", "fishB", "fishC", "fish", "sockPuppet", "shdw2", "blackWidow", "crab", "scorp", "goat", "gator", "tarbuffalo_runB", "tarbuffalo", "bearblack", "panther", "wolf", "toad", "eagle", "owl", "parrot", "hummingBird", "flamingo", "stork", "butterflyA", "butterflyB", "butterflyC", "butterflyD", "butterflyLowA", "butterflyLowB", "butterflyLowC", "butterflyLowD", "raven", "vulture", "bison", "sickle", "armHand" ],
	
	colorVariations: {
		
	"armhand": { hRange:  0.02, sRange:  0.10,  vRange: 0.05,
			     hOffset: 0.00, sOffset: 0.0,   vOffset: -0.1 },
			  
	   
	"bearBlack": { hRange:  0.00, sRange:   0.10, vRange:  0.075,
			      hOffset: 0.00, sOffset:  0.00, vOffset: -0.10 },
				  
	"bearBrown": { hRange:  0.02, sRange:   0.15, vRange:  0.15,
			       hOffset: -0.01, sOffset:  0.05, vOffset: -0.15 },				  

	"blackWidow": { hRange:  0.02, sRange:  0.10,  vRange: 0.05,
			     hOffset: 0.00, sOffset: 0.0,   vOffset: -0.1 },
			  
				   
	"bunny": { hRange:  0.05, sRange:  0.125, vRange:  0.20,
			  hOffset: 0.00, sOffset:  -0.05, vOffset: 0.00 },				   
			  
	"butterflyA": { hRange:  0.02, sRange:  0.10, vRange:  0.15,
			        hOffset: 0.00, sOffset: 0.00, vOffset: 0.0 },

	"butterflyB": { hRange:  0.02, sRange:  0.10, vRange:  0.15,
			        hOffset: 0.00, sOffset: 0.00, vOffset: 0.0 },

	"butterflyC": { hRange:  0.02, sRange:  0.10, vRange:  0.15,
			        hOffset: 0.00, sOffset: 0.00, vOffset: 0.0 },

	"butterflyD": { hRange:  0.02, sRange:  0.10, vRange:  0.15,
			        hOffset: 0.00, sOffset: 0.00, vOffset: 0.0 },

	"centipede": { hRange: 0.05, sRange:  0.00, vRange:  0.55,
		           hOffset: 0.00, sOffset: 0.10, vOffset: -0.45 },
					
	"chow": { hRange:  0.025, sRange:   0.15, vRange:  0.10,
			  hOffset: 0.00, sOffset:  -0.1,  vOffset: -0.1 },

	"cow": { hRange:  0.00, sRange:   0.00, vRange:  0.20,
			 hOffset: 0.00, sOffset:  0.05, vOffset: -0.25 },

	"cowCarcass": { hRange:  0.00, sRange:   0.00, vRange:  0.00,
			        hOffset: 0.00, sOffset:  -0.10, vOffset: 0.00 },
			  
	"crab": { hRange: 0.07, sRange:  0.00, vRange:  0.15,
			  hOffset: -0.025, sOffset: 0.15, vOffset: -0.16 },
			   
	"deer": { hRange:  0.03, sRange:   0.15, vRange:  0.25,
			  hOffset: -0.012, sOffset:  0.05, vOffset: 0.00 },

	"eagle": { hRange: 0.075, sRange:  0.10, vRange:  0.25,
			   hOffset: 0.00, sOffset:  0.1, vOffset: -0.05 },
			  
	"elk": { hRange:  0.03, sRange:   0.10, vRange:  0.30,
			 hOffset: -0.0075, sOffset:  0.00, vOffset: -0.2 },
			   
	"fish": { hRange:  0.00, sRange:   0.00, vRange:  0.20,
			  hOffset: 0.00, sOffset:  0.00, vOffset: 0.00 },
			 
	"flamingo": { hRange:  0.1, sRange:  0.15, vRange:  0.25,
				  hOffset: -0.03, sOffset: 0.1, vOffset: -0.15 },

	"fox": { hRange:  0.03, sRange:   0.15, vRange:  0.25,
			 hOffset: -0.012, sOffset:  0.05, vOffset: 0.00 },
				  
	"frog": { hRange:  0.05, sRange:   0.10, vRange:  0.25,
			  hOffset: 0.01, sOffset:  0.05, vOffset: -0.10 },
			  
	"gator": { hRange:  0.05, sRange:   0.00, vRange:  0.20,
			   hOffset: -0.05, sOffset:  0.00, vOffset: -0.26 },
			  
	"goat": { hRange:  0.02, sRange:   0.07, vRange:  0.1,
			  hOffset: 0.00, sOffset:  0.00, vOffset: -0.20 },			  

	"goldenRetreiver": { hRange:  0.025, sRange:   0.2, vRange:  0.05,
						 hOffset: 0.00, sOffset:  -0.1, vOffset: 0.015 },

	"horse": { hRange:   0.025, sRange:  0.1, vRange:  0.25,
		       hOffset: -0.005, sOffset:  0.00, vOffset: -0.10	},
						 
	"hummingbird": { hRange:  0.05, sRange:   0.10, vRange:  0.3,
			         hOffset: -0.02, sOffset:  0.1, vOffset: -0.30 },

	"moose": { hRange:  0.07, sRange:  0.05, vRange:  0.1,
		       hOffset: 0.00, sOffset: -0.0, vOffset: -0.2 },

	"mountainlion": { hRange:  0.02, sRange:  0.10,  vRange: 0.15,
			          hOffset: 0.00, sOffset:  0.10, vOffset: -0.05 },
			   
	"owl": { hRange:   0.025, sRange:  0.4, vRange:  0.15,
			 hOffset: -0.005, sOffset:  -0.3, vOffset: -0.10 },

	"panther": { hRange:  0.00, sRange:  0.10, vRange:  0.075,
			     hOffset: 0.00, sOffset:  0.00, vOffset: -0.16 },

			 
	"parrot": { hRange:  0.05, sRange:   0.10, vRange:  0.3,
			    hOffset: -0.025, sOffset:  0.1, vOffset: -0.10 },

	"raccoon": { hRange:  0.00, sRange:   0.10, vRange:  0.25,
			     hOffset: 0.6, sOffset:  -0.10, vOffset: -0.2 },			  

	"raven": { hRange:  0.02, sRange:  0.10,  vRange: 0.1,
			  hOffset: 0.00, sOffset:  0.0, vOffset: -0.1 },

	"scorp": { hRange:  0.00, sRange:   0.10, vRange:  0.075,
			      hOffset: 0.00, sOffset:  0.00, vOffset: -0.15 },
			   
	"seal": { hRange:  0.00, sRange:  0.00, vRange:  0.05,
			  hOffset: 0.00, sOffset: 0.05, vOffset: -0.10 },
	
	"shdw2": { hRange:  0.00, sRange:   0.10, vRange:  0.06,
			      hOffset: 0.00, sOffset:  -0.05, vOffset: -0.15 },
			   
	"sickle": { hRange:  0.04, sRange:  0.00, vRange:  0.1,
		       hOffset: 0.00, sOffset: -0.20, vOffset: -0.30 },

	"stork": { hRange:  0.00, sRange:   0.10, vRange:  0.20,
			   hOffset: 0.02, sOffset:  -0.05, vOffset: -0.05 },
			   
	"tarbuffalo": { hRange:  0.04, sRange:  0.10,  vRange:  0.1,
		            hOffset: -0.015, sOffset: 0.0, vOffset: -0.175 },
			  
	"toad": { hRange:  0.07, sRange:   0.00, vRange:  0.1,
			  hOffset: -0.02,  sOffset:  0.0, vOffset: -0.25 },			  
			  
	"vulture": { hRange:  0.01, sRange:   0.25, vRange:  0.08,
			     hOffset: 0.0, sOffset:  -0.10, vOffset: -0.16 },

	"wolf": { hRange:  0.00,  sRange:   0.2, vRange:  0.06,
			  hOffset: -0.05, sOffset:  -0.15, vOffset: -0.10 },

	"zero": { hRange:  0.00, sRange:   0.00, vRange:  0.00,
			  hOffset: 0.00, sOffset:  0.00, vOffset: 0.00 }		  

	},
	
	animalVariationMap: {

		"armhand" : "armhand",

		"bearbrown"   : "bearBrown",
		"bearblack"   : "bearBlack",
		
		"blackwidow"   : "blackWidow",

		"bunny" 	: "bunny",
		
		"butterflya" : "butterflyA",
		"butterflyb" : "butterflyB",
		"butterflyc" : "butterflyC",
		"butterflyd" : "butterflyD",
		
		"centipede" : "centipede",
		"chow"		: "chow",
		
		"cow" : "cow",
		"cowcarcass" : "cowCarcass",
		
		"crab"		: "crab",
		"deer"		: "deer",
		"eagle"		: "eagle",
		"elk"		: "elk",

		"fisha" : "fish",
		"fishb" : "fish",
		"fishc" : "fish",
		"fishd" : "fish",

		"flamingo"	: "flamingo",
		"fox"		: "fox",
		"frog" 		: "frog",
		"gator" 	: "gator",
		"goat"		: "goat",
		"goldenretreiver": "goldenRetreiver",
		"horse"		: "horse",
		"hummingbird": "hummingbird",
		"moose"		: "moose",
		
		"mountainlion" 		: "mountainlion",
		"mountainlionblack" : "panther",
		
		"owl"		: "owl",
		"parrot"	: "parrot",
		"raccoon"   : "raccoon",
		"raven"		: "raven",
		"scorpion"	: "scorp",
		"seal"		: "seal",
		
		"shdw" 	 : "shdw2",		
		"sickle" : "sickle",		
		"stork"  : "stork",
		
		"tarbuffalo": "tarbuffalo",	
		"toad" 		: "toad",
		"vulture"   : "vulture",
		"wolf" 		: "wolf",
		
		"bison"		: "tarbuffalo"

	},

	// init frame times and indices
	
	init: function( geometry, parseMorphTargetNames ) {
		
		if( !geometry.initialized ) {
			
			geometry.initialized = true;
			
			var availableAnimals = [];
			var animal, animalName;
			var charCode, morphTargetName, morphTarget, morphTargets = geometry.morphTargets;
			var a, al, m, ml, currentTime;
			
			// add animal names to static list?
			
			if( parseMorphTargetNames ) {
				
				for( m = 0, ml = morphTargets.length; m < ml; m++ ) {

					// check so not already exists
					
					for( a = 0, al = this.animalNames.length; a < al; a++ ) {
						
						animalName = this.animalNames[ a ];
						
						if( morphTargets[ m ].name.indexOf( animalName ) !== -1 ) {
							
							break;

						}
						
					}
					
					
					// did not exist?
					
					if( a === al ) {
						
						morphTargetName = morphTargets[ m ].name;
						
						for( a = 0; a < morphTargetName.length; a++ ) {
					
							charCode = morphTargetName.charCodeAt( a );
							
							if(! (( charCode >= 65 && charCode <= 90  ) ||
							      ( charCode >= 97 && charCode <= 122 ))) {
							      	
								break;      	
	
							} 
							
						}
						
						this.animalNames.push( morphTargetName.slice( 0, a ));
						
					}
					
				}
				
			}
					
			// parse out the names
			
			for( a = 0, al = this.animalNames.length; a < al; a++ ) {
				
				animalName  = this.animalNames[ a ];
				animal      = this[ animalName ];
				currentTime = 0;
				
				if( animal === undefined || animal.length === 0 ) {
					
					animal = this[ animalName ] = [];
					
					for( m = 0, ml = morphTargets.length; m < ml; m++ ) {
		
						if( morphTargets[ m ].name.indexOf( animalName ) !== -1 ) {
	
							animal.push( { index: m, time: currentTime } );
							currentTime += parseInt( 1000 / 24, 10 );		// 24 fps			
							
		
							if( availableAnimals.indexOf( animalName ) === -1 ) {
								
								availableAnimals.push( animalName );
								
							}
							
						}
						
					}
	
				} else {
					
					for( m = 0, ml = morphTargets.length; m < ml; m++ ) {
						
						if( availableAnimals.indexOf( animalName ) === -1 && morphTargets[ m ].name.indexOf( animalName ) !== -1 ) {
							
							availableAnimals.push( animalName );
							
						}
						
					}
					
				}
				 
			}
	
	
			// create material
	
			var material = new THREE.MeshShaderMaterial( {
				
				uniforms: ROME.AnimalShader.uniforms(),
				attributes: ROME.AnimalShader.attributes(),
				vertexShader: ROME.AnimalShader.vertexShader,
				fragmentShader: ROME.AnimalShader.fragmentShader,

				lights: true,
				morphTargets: true,
				vertexColors: THREE.VertexColors
				
			} );
			
	
			// set animal-specific light params

			//console.log( attributes.colorAnimalA.value );
			//console.log( availableAnimals );			

			// init custom attributes
			
			var c, cl, morphColor, morphColors = geometry.morphColors;
			var attributes = material.attributes;
			
			if( geometry.morphColors && geometry.morphColors.length ) {
				
				for( c = 0, cl = morphColors.length; c < cl; c++ ) {
					
					morphColor = morphColors[ c ];
					morphTargetName = morphColor.name;
					
					for( a = 0; a < morphTargetName.length; a++ ) {
				
						charCode = morphTargetName.charCodeAt( a );
						
						if(! (( charCode >= 65 && charCode <= 90  ) ||
						      ( charCode >= 97 && charCode <= 122 ))) {
						      	
							break;   

						} 

					}

					morphTargetName = morphTargetName.slice( 0, a ).toLowerCase();
					attributes[ morphTargetName ] = { type: "c", boundTo: "faces", value: morphColor.colors };
					
					// color variations per morph color

					var variations = this.colorVariations[ "zero" ];
					
					if ( this.animalVariationMap[ morphTargetName ] !== undefined ) {
						
						variations = this.colorVariations[  this.animalVariationMap[ morphTargetName ] ];
						//console.log( morphColor.name, morphTargetName );

					}
					
					if ( variations.lScale ) {
					
						material.uniforms.lightScale.value = variations.lScale;
						
					} else {
						
						material.uniforms.lightScale.value = 0.5;

					}

					if ( variations.lOffset ) {
					
						material.uniforms.lightOffset.value.set( variations.lOffset[ 0 ], variations.lOffset[ 1 ], variations.lOffset[ 2 ] );
						
					} else {
						
						material.uniforms.lightOffset.value.set( 0.6, 0.6, 0.6 );

					}		
					
					//console.log( morphTargetName );

					randomizeColors( attributes[ morphTargetName ].value, variations );
					
				}
				
				attributes.colorAnimalA.value = morphColors[ 0 ].colors;
				attributes.colorAnimalB.value = morphColors[ 0 ].colors;
				
				
				// check so each animal has a morph color
		
				for( a = 0, al = availableAnimals.length; a < al; a++ ) {
					
					animalName = availableAnimals[ a ].toLowerCase();
						
					for( c = 0, cl = morphColors.length; c < cl; c++ ) {
						
						morphColor = morphColors[ c ].name.toLowerCase();
						
						if( morphColor.indexOf( animalName ) !== -1 ) {
							
							break;
							
						}
						
					}
					
					// didn't exist?
					
					if( c === cl ) {
						
						console.error( "Animal.constructor: Morph Color missing for animal " + animalName + ". Deploying backup plan." );

						attributes[ animalName ] = { type: "c", boundTo: "faces", value: [] };
						
						for( c = 0, cl = geometry.faces.length; c < cl; c++ ) {
							
							attributes[ animalName ].value.push( new THREE.Color( 0xff0000 ));

						}
						
					}

				}

			} else {
				
				console.error( "Animal.constructor: Morph Colors doesn't exist, deploying fallback!" );
				
				for( c = 0, cl = geometry.faces.length; c < cl; c++ ) {
					
					attributes.colorAnimalA.value.push( new THREE.Color( 0xff00ff ) );
					
				}
				
				attributes.colorAnimalB.value = attributes.colorAnimalA.value;

				for( a = 0, al = availableAnimals; a < al; a++ ) {
					
					attributes[ availableAnimals[ a ] ] = { type: "c", boundTo: "faces", value: attributes.colorAnimalA.value };
					
				}
	
			}	

			//randomizeColors( attributes.colorAnimalA.value, variations );
			//randomizeColors( attributes.colorAnimalB.value, variations );

			
			// set return values
	
			geometry.availableAnimals = availableAnimals;
			geometry.customAttributes = material.attributes;

		} else {
			
			// create material
			
			var material = new THREE.MeshShaderMaterial( {
				
				uniforms: ROME.AnimalShader.uniforms(),
				attributes: {},
				vertexShader: ROME.AnimalShader.vertexShader,
				fragmentShader: ROME.AnimalShader.fragmentShader,
				
				fog: true,
				lights: true,
				morphTargets: true
				
			} );
			
			
			// copy custom attributes

			for( var a in geometry.customAttributes ) {

				var srcAttribute = geometry.customAttributes[ a ];
				
				if( a === "colorAnimalA" || a === "colorAnimalB" ) {
					
					material.attributes[ a ] = { 
						
						type: "c", 
						size: 3,
						boundTo: srcAttribute.boundTo, 
						value: srcAttribute.value, 
						array: undefined,
						buffer: undefined,
						needsUpdate: false,
						__webglInitialized: true

					};
					
				} else {
					
					material.attributes[ a ] = srcAttribute;
					
				}
				
			}
			
		}

		return {
			
			availableAnimals: geometry.availableAnimals,
			material: material
			
		};

	}

};

function randomizeColors( colors, variations ) {
	
	var i, il, c, hd, sd, vd;
	
	for( i = 0, il = colors.length; i < il; i++ ) {
		
		c = colors[ i ];

		hd = variations.hRange * Math.random() + variations.hOffset;
		sd = variations.sRange * Math.random() + variations.sOffset;
		vd = variations.vRange * Math.random() + variations.vOffset;

		THREE.ColorUtils.adjustHSV( c, hd, sd, vd );
		
	}

};

var Ribbons = function ( numOfRibbons, vectorArray, scene, ribbonMaterials ) {
	
	var that = this;

	var ribbonArray = [];
	var ribbonMeshArray = [];
	var scene = scene;

	that.initSettings = {
		numOfRibbons : numOfRibbons || 6
	}

	that.settings = {
		ribbonPulseMultiplier_1 : 5.5,
		ribbonPulseMultiplier_2 : 5.5,
		ribbonMin : 1.5,
		ribbonMax : 3,
		visible : true
	}
	
	var r = 0;
	var i;

	for ( i = 0; i < that.initSettings.numOfRibbons; ++i ) {

		var ribbon = new Ribbon( 15, 6, vectorArray.length - 35 );
		var ribbonMesh = new THREE.Mesh( ribbon, ribbonMaterials[ i % ribbonMaterials.length ] );
		ribbonMesh.doubleSided = true;
		scene.addObject( ribbonMesh );

		var offset = 3+Math.floor( Math.random()*10 );

		var obj = {r:ribbon, rm:ribbonMesh, offset:offset}

		ribbonArray.push(obj);
		ribbonMeshArray.push(ribbonMesh);

	}

	this.update = function (position) {

		r += 0.1;

		for (i=0; i<vectorArray.length; ++i ) {
			
			var x = vectorArray[i].position.x;
			var y = vectorArray[i].position.y;
			var z = vectorArray[i].position.z;

			// ribbons
			for (var k=0; k<numOfRibbons; ++k ) {
				var ribbon = ribbonArray[k].r;
				var offset = ribbonArray[k].offset;

				if (i < offset) {
					continue;
				}

				var pulse = Math.cos((i-r*10)/10)*that.settings.ribbonPulseMultiplier_1;

				var pulse2 = Math.cos((i-r*10)/8)*that.settings.ribbonPulseMultiplier_2;

				var inc = (Math.PI*2)/ribbonArray.length;
				var thisinc = k*inc;
				var offsetz = Math.cos(thisinc+((i-r*10)/8))*pulse;
				var offsety = Math.sin(thisinc+((i-r*10)/8))*pulse;

				for (var j=0; j<2; ++j ) {
					var index = ((i-offset)*2)+j;

					if (ribbon.vertices[index] == undefined) {
						continue;
						break;
					}

					// for twister
					var adder = i-(r*2);
					var w = Math.max(that.settings.ribbonMin, i/(10+pulse2));
					w = Math.min(w, that.settings.ribbonMax);
					var extrax = Math.cos(adder/3)*w;
					var extray = Math.sin(adder/3)*w;

					ribbon.vertices[index].position.x = x - position.x+extrax+offsetz;
					if (j==0) {
						ribbon.vertices[index].position.y = y+extray+offsety - position.y;
						ribbon.vertices[index].position.z = z+extrax+offsetz - position.z;
					} else {
						ribbon.vertices[index].position.y = y-extray+offsety - position.y;
						ribbon.vertices[index].position.z = z-extrax+offsetz - position.z;
					}
				}

			}
		}

		for (i=0; i<ribbonArray.length; ++i ) {
			var ribbonMesh = ribbonArray[i].rm;
			ribbonMesh.position = position;
			var ribbon = ribbonArray[i].r;
			ribbon.__dirtyVertices = true;

			ribbonMesh.visible = that.settings.visible;
		}

	}

}

var Vectors = function ( length, divider, normaldivider, startPos ) {
	
	var that = this;

	that.array = [];
	var i;

	that.initSettings = {
		length : length || 50
	}

	that.settings = {
		divider : divider || 4,
		normaldivider : normaldivider || 10,
		absoluteTrail : false,
		startPosition : startPos || new THREE.Vector3(0,0,0)
	}	

	// vectors
	for ( i = 0; i < that.initSettings.length; ++i ) {

		var position = new THREE.Vector3(0,0,0);
		position.copy(that.settings.startPosition);

		var obj = { position: position, lastposition: new THREE.Vector3(0,0,0), normal: new THREE.Vector3(0,1,0), scale: 1 };
		that.array.push(obj);

	}

	this.update = function (position, normal) {

		for (i=0; i < that.initSettings.length; ++i ) {
			var obj = that.array[i];

			if (i == 0) {

				var tox = position.x;
				var toy = position.y;
				var toz = position.z;

				var tonormalx = normal.x;
				var tonormaly = normal.y;
				var tonormalz = normal.z;

			} else {
				
				var tox = that.array[i-1].lastposition.x;
				var toy = that.array[i-1].lastposition.y;
				var toz = that.array[i-1].lastposition.z;

				var tonormalx = that.array[i-1].normal.x;
				var tonormaly = that.array[i-1].normal.y;
				var tonormalz = that.array[i-1].normal.z;

			}

			that.array[i].lastposition.x = obj.position.x;
			that.array[i].lastposition.y = obj.position.y;
			that.array[i].lastposition.z = obj.position.z;

			if (that.settings.absoluteTrail) {

				obj.position.x = tox;
				obj.position.y = toy;
				obj.position.z = toz;

				obj.normal.x = tonormalx;
				obj.normal.y = tonormaly;
				obj.normal.z = tonormalz;

			} else {

				var moveX = (tox-obj.position.x)/that.settings.divider;
				var moveY = (toy-obj.position.y)/that.settings.divider;
				var moveZ = (toz-obj.position.z)/that.settings.divider;

				obj.position.x += moveX;
				obj.position.y += moveY;
				obj.position.z += moveZ;

				var moveNormalX = (tonormalx-obj.normal.x)/that.settings.normaldivider;
				var moveNormalY = (tonormaly-obj.normal.y)/that.settings.normaldivider;
				var moveNormalZ = (tonormalz-obj.normal.z)/that.settings.normaldivider;

				obj.normal.x += moveNormalX;
				obj.normal.y += moveNormalY;
				obj.normal.z += moveNormalZ;

			}

			//console.log(obj.position.z);

		}

	}

	this.reset = function ( x,y,z ) {

		for (var i=0; i<that.array.length; ++i ) {
			var obj = that.array[i];
			obj.position.x = x;
			obj.position.y = y;
			obj.position.z = z;
		}

	}

}

var Particles = function ( numOfParticleSystems, scene, particleSize, spriteArray, numInSystem, spread, blendMode ) {
	
	var that = this;

	var particleArray = [];
	var scene = scene;
	var blendMode = blendMode || THREE.NormalBlending;

	that.initSettings = {
		numOfParticleSystems : numOfParticleSystems || 25,
		numInSystem : numInSystem || 60,
		spread : spread || 50,
		particleSize : particleSize || 8
	}

	that.settings = {
		aliveDivider : 3,
		zeroAlphaStart : true,
		visible : true,
		gravitateTowardsCamera : false
	}

	var i;

	
	var geometry = new THREE.Geometry();

	for (i = 0; i < that.initSettings.numInSystem; i++) {
		var vector = new THREE.Vector3( Math.random() * that.initSettings.spread - (that.initSettings.spread/2), Math.random() * that.initSettings.spread - (that.initSettings.spread/2), Math.random() * that.initSettings.spread - (that.initSettings.spread/2) );
		geometry.vertices.push( new THREE.Vertex( vector ) );
	}

	for (var i = 0; i < that.initSettings.numOfParticleSystems; i++) {

		//var particleMaterial = new THREE.ParticleBasicMaterial( { size: particleSize, map: spriteArray[i%spriteArray.length], transparent: true, depthTest: false, blending: THREE.AdditiveBlending } );
		var particleMaterial = new THREE.ParticleBasicMaterial( { size: that.initSettings.particleSize, map: spriteArray[i%spriteArray.length], transparent: true, depthTest: true, blending: blendMode } );
		//var particleMaterial = new THREE.ParticleBasicMaterial( { size: that.initSettings.particleSize, map: spriteArray[i%spriteArray.length], transparent: true, depthTest: true, blending: THREE.NormalBlending } );

		var particles = new THREE.ParticleSystem( geometry, particleMaterial );

		particles.rotation.x = Math.random() * Math.PI;
		particles.rotation.y = Math.random() * Math.PI;
		particles.rotation.z = Math.random() * Math.PI;

		var obj = {c:particles, alivetime:i};
		particleArray.push(obj);

		scene.addObject( particles );

	}

	this.update = function (delta, position, camPos) {

		if (isNaN(delta) || delta > 1000 ) {
			delta = 1000/60;
		}		

		var multiplier = delta/60;

		for (i=0; i<numOfParticleSystems; ++i ) {
			
			var particles = particleArray[i].c;

			particleArray[i].alivetime += (multiplier/that.settings.aliveDivider);

			if (particleArray[i].alivetime >= numOfParticleSystems) {
				particleArray[i].alivetime = 0;
				particles.scale.x = particles.scale.y = particles.scale.z = 0.1;
				particles.position.x = position.x;
				particles.position.y = position.y;
				particles.position.z = position.z;

				if (that.settings.gravitateTowardsCamera) {
					
					var extrax = -100;
					if (position.x > camPos.x) {
						extrax = 100;
					}

					particleArray[i].c.tox = position.x-extrax//camPos.x+extrax;
					particleArray[i].c.toy = 0;
					particleArray[i].c.toz = position.z-100;//camPos.z-400; // hack for in front of camera

					var dx = particles.position.x - particleArray[i].c.tox, dy = particles.position.y - particleArray[i].c.toy, dz = particles.position.z - particleArray[i].c.toz;
					var distance =  Math.abs(dx * dx + dy * dy + dz * dz);

					var time = 1000+(distance/25);
					
					particles.position.y = position.y+50;

					particles.rotation.x = Math.random() * Math.PI + (Math.PI/2);
					particles.rotation.y = Math.random() * Math.PI;
					particles.rotation.z = Math.random() * Math.PI + (Math.PI/2);

					particles.scale.x = particles.scale.y = particles.scale.z = 1.25;

					var fallTween = new TWEEN.Tween(particles.position)
								.to({x: particleArray[i].c.tox, y: particleArray[i].c.toy, z: particleArray[i].c.toz}, time)
								.easing(TWEEN.Easing.Linear.EaseNone);
					fallTween.start();

					var rotationTween = new TWEEN.Tween(particles.rotation)
								.to({x: 0, z: 0}, time)
								.easing(TWEEN.Easing.Quadratic.EaseIn);
					rotationTween.start();
	
					var scaleTween = new TWEEN.Tween(particles.scale)
								.to({x: 5, y: 0.05, z: 5}, time)
								.easing(TWEEN.Easing.Linear.EaseNone);
					scaleTween.start();
	
					/*var flattenTween = new TWEEN.Tween(particles.scale)
								.to({y: 0.05}, time+500)
								.easing(TWEEN.Easing.Linear.EaseNone)
					flattenTween.start();*/
	

				}

				if (that.settings.zeroAlphaStart) {
					particles.materials[0].opacity = 0;
				} else {
					particles.materials[0].opacity = 1;
				}
				continue;
			}

			var alivetime = particleArray[i].alivetime;

			if (!that.settings.gravitateTowardsCamera) {
			
				particles.position.y += 0.10;
				
				particles.rotation.y += 0.015;
				particles.rotation.z += 0.010;

				var scale = Math.max(alivetime/15, 1);
				//scale = Math.max(scale,0.05);
				particles.scale.x = particles.scale.y = particles.scale.z = 0.5+scale;	

			}



			if (that.settings.zeroAlphaStart) {
				var alpha = (alivetime/4);
			} else {
				var alpha = 1-(alivetime/(particleArray.length*2));
			}
			alpha = Math.min(alpha,1.0);
			particles.materials[0].opacity = alpha;

			//particles.visible = that.settings.visible;

		}

	}

	this.reset = function ( x,y,z ) {

		for (var i=0; i<particleArray.length; ++i ) {
			var obj = particleArray[i].c;
			obj.position.x = x;
			obj.position.y = y;
			obj.position.z = z;
		}

	}

}

var AnimalSwarm = function ( numOfAnimals, scene, vectorArray ) {
	
	var that = this;

	that.array = [];
	var scene = scene;
	var maxFollowIndex = 0;
	var followCount = 0;
	var lastFollowCount = 0;
	var lastFollowPos = new THREE.Vector3();
	var rayCount = 0;

	that.initSettings = {

		numOfAnimals : numOfAnimals || 30

	};

	that.settings = {

		divider : 2,
		flying : false,
		flyingDistance : 35,
		xPositionMultiplier : 30,
		zPositionMultiplier : 30,
		constantSpeed : null,
		visible : true,
		shootRayDown : false,
		addaptiveSpeed : false,
		capy : null,
		startPosition : new THREE.Vector3( 0, 0, 0 ),
		switchPosition : false,
		respawn : true,
		gravity : false
		//butterfly : false

	};
	
	var r = 0;
	var i;

	this.addAnimal = function( geometry, predefined, scale, morphArray, speedArray ) {
		
		var predefined = predefined || null;
		var scaleMultiplier = scale || 1.2;
		var morphArray = morphArray || null;
		var doubleSided = doubleSided || false;

		for ( i = 0; i < that.initSettings.numOfAnimals; ++i ) {
			
			if ((predefined == null && that.array[i] != undefined) || (predefined != that.array[i]) ) {
				continue;
			}

			if (speedArray == null) {
				speedArray = [1];
			}

			var animal = ROME.Animal( geometry, false );
			var mesh = animal.mesh;
			mesh.position.copy(that.settings.startPosition);

			// test shadow
			//mesh.addChild( new THREE.ShadowVolume( new THREE.Sphere( 60, 5, 5 )));

			var scale = 0.02+(Math.random()/8);
			if (i<2) {
				scale = 0.15;
			}

			scale = Math.max(scale, 0.1);

			mesh.matrixAutoUpdate = false;

			mesh.visible = false;
			//mesh.scale.x = mesh.scale.y = mesh.scale.z = scale * scaleMultiplier;

			scene.addChild( mesh );
			var startMorph = 0;
			var endMorph = 0;
			if (morphArray != null) {
				startMorph = morphArray[i%morphArray.length]%animal.availableAnimals.length;
				endMorph = startMorph+1;
				var rnd = Math.round(Math.random());
				if ((rnd == 1 && startMorph > 0) || endMorph > animal.availableAnimals.length-1) {
					endMorph = startMorph-1;
				}
				//endMorph = Math.floor(Math.random()*animal.availableAnimals.length);
			}

			var speeda = speedArray[startMorph];
			var speedb = speedArray[endMorph];

			animal.play( animal.availableAnimals[ startMorph ], animal.availableAnimals[ endMorph ], 0, Math.random(), Math.random() );

			var count = Math.random();
			if (i<2) {
				count = 0;
			}

			ray = new THREE.Ray();
			ray.direction = new THREE.Vector3(0, -1, 0);

			var obj = { c: mesh, a: animal, f: i, keepRunning: false, time: 0, lifetime: 0, dead: false, startMorph: startMorph, endMorph: endMorph, speeda: speeda, speedb: speedb, toPosition: new THREE.Vector3(0,0,0), active: false, normal: new THREE.Vector3(0, 1, 0), count: count, scale: scale * scaleMultiplier, origscale: scale * scaleMultiplier, ray: ray, rayIndex: i%4, lastToy: 0  };

			that.array[i] = obj;

		}

		return animal;

	}

	// remove animal test
	this.removeAnimal = function (geometry, morph) {
		for ( i = 0; i < that.initSettings.numOfAnimals; ++i ) {
			var a = that.array[i].a;
			if (a == undefined) {
				continue;
			}
			var startMorph = that.array[i].startMorph;
			var endMorph = that.array[i].endMorph;

			if (a.mesh.geometry == geometry && (morph == startMorph || morph == endMorph)) {
				//console.log("found match = "+i);
				scene.removeChild( that.array[i].c );
				
				delete that.array[i].a;
				that.array[i].active = false;

				break;
			}

		}
	}

	// switch animal test
	this.switchAnimal = function (geometry, scale, speed, morph, arrayIndex) {
		//console.log("adding on index = "+index);
	
		var scaleMultiplier = scale || 1.2;

		for ( i = 0; i < that.initSettings.numOfAnimals; ++i ) {
			if (arrayIndex != undefined) {
				i = arrayIndex;
			}

			var a = that.array[i].a;

			var startMorph = that.array[i].startMorph;
			var endMorph = that.array[i].endMorph;

			if (a != undefined && a.mesh.geometry == geometry && arrayIndex == undefined && (startMorph == morph || endMorph == morph)) {
				continue;
			}

			console.log("adding on "+i);

			var oldPosition = that.array[i].c.position;

			var animal = ROME.Animal( geometry, false );
			var mesh = animal.mesh;

			var scale = 0.02+(Math.random()/8);
			if (i<2) {
				scale = 0.15;
			}

			scale = Math.max(scale, 0.1);
			mesh.position = oldPosition;
			mesh.visible = false;
			mesh.scale.set(0.00001,0.00001,0.00001);

			mesh.updateMatrix();

			mesh.matrixAutoUpdate = false;
			
			scene.removeChild( that.array[i].c );
			scene.addChild( mesh );
			
			var speeda = speed;
			var speedb = speed;

			animal.play( animal.availableAnimals[ morph ], animal.availableAnimals[ morph ], 0, Math.random(), Math.random() );

			that.array[i].c = mesh;
			that.array[i].a = animal;
			that.array[i].scale = scale * scaleMultiplier;
			that.array[i].origscale = scale * scaleMultiplier;
			that.array[i].speeda = speed;
			that.array[i].speedb = speed;
			that.array[i].active = false;
			that.array[i].startMorph = morph;
			that.array[i].endMorph = morph;

			break;

		}
		
	}

	this.create = function (position, normal, toPosition) {
		for (i=0; i<that.initSettings.numOfAnimals; ++i ) {
			if (that.array[i].active || that.array[i].a == undefined) {
				continue;
			}

			that.array[i].active = true;
			that.array[i].c.position.copy(position);
			that.array[i].normal.copy(normal);
			that.array[i].c.visible = true;
			that.array[i].f = 0;
			that.array[i].time = 0;
			that.array[i].lifetime = 0;
			that.array[i].dead = false;
			that.array[i].scale = that.array[i].origscale;
			that.array[i].keepRunning = false;
			that.array[i].gravity = 0;

			if (that.settings.gravity) {
				that.array[i].c.matrixAutoUpdate = true;
				that.array[i].c.scale.set(that.array[i].scale,that.array[i].scale,that.array[i].scale);

				that.array[i].c.rotation.x = 0;
				that.array[i].c.rotation.y = Math.random()*Math.PI;
			}

			if (!that.settings.respawn) {
				that.array[i].f = i;
			}

			if (toPosition != undefined) {
				var pos = new THREE.Vector3();
				var toPos = new THREE.Vector3();
				pos.copy(position);
				toPos.copy(toPosition);
			
				that.array[i].keepRunning = true; 

				that.array[i].toPosition = toPos.subSelf(pos).normalize();

				// hack...
				if (that.array[i].toPosition.x < 0) {
					that.array[i].toPosition.x*= -1;
				}
				if (that.array[i].toPosition.x < 0.5) {
					that.array[i].toPosition.x += 0.5;
				}
				if (that.array[i].toPosition.z < 0) {
					that.array[i].toPosition.z += 0.5;
				}

			}


			// tween scale
			if (toPosition == undefined) {
			
				that.array[i].scale *= 0.25;
				var scaleTween = new TWEEN.Tween(that.array[i])
					.to({scale: that.array[i].origscale}, 2000)
					.easing(TWEEN.Easing.Elastic.EaseOut)
					.delay(200);
				scaleTween.start();

			}


			// tween popup
			var multiplier = 180;
			if (toPosition != undefined) {
				multiplier = 400;
			}
			
			var scale = that.array[i].scale;
			that.array[i].c.position.x -= (normal.x)*(scale*400);
			that.array[i].c.position.y -= (normal.y)*(scale*400);
			that.array[i].c.position.z -= (normal.z)*(scale*400);

			that.array[i].lastToy = that.array[i].c.position.y;

			//console.log(scale*200);
/*			var popupTween = new TWEEN.Tween(that.array[i].c.position)
				.to({x: position.x, y: position.y, z: position.z}, 3000)
				.easing(TWEEN.Easing.Elastic.EaseOut);
			popupTween.start();
*/

			//console.log("created animal- "+that.array[i].toVector.x+" | "+that.array[i].toVector.y+" | "+that.array[i].toVector.y);
			//console.log("created animal - "+i);
			break;
		}
	}

	this.update = function (delta, camPos) {

		if (isNaN(delta) || delta > 1000 || delta == 0 ) {
			delta = 1000/60;
		}

		++rayCount;

		for (i=0; i<that.initSettings.numOfAnimals; ++i ) {
			var obj =  that.array[i];
			var active = obj.active;
			if (!active) {
				continue;
			}


			var animal = obj.c;
			var anim = obj.a;
			var scale = obj.scale;
			var cNormal = obj.normal;
			var f = obj.f;

			var wasDead = that.array[i].dead;

			that.array[i].time += delta;
			that.array[i].lifetime += delta;

			if (that.array[i].lifetime > 2500 && that.settings.respawn) {
				that.array[i].dead = true;
			}

			// morph
			that.array[i].count += 0.04;
			var morph = Math.max(Math.cos(that.array[i].count),0);
			morph = Math.min(morph, 1)
			that.array[i].a.morph = morph;
		
			var animalSpeed = obj.speeda;
			if (Math.round(morph) == 1) {
				animalSpeed = obj.speedb;
			}

			
			if (!that.array[i].keepRunning) {

				// change follow index
				//var changeTime = Math.max(animalSpeed*18, 80);
				var changeTime = Math.max(animalSpeed*25, 80);
				//var changeTime = Math.max(animalSpeed*30, 110);

				//var dx = animal.position.x - vectorArray[f].position.x, dy = animal.position.y - vectorArray[f].position.y, dz = animal.position.z - vectorArray[f].position.z;
				//var distance =  Math.abs(dx * dx + dy * dy + dz * dz);

				if (that.array[i].time > changeTime && that.settings.respawn) {
				//if (distance > 200 && that.array[i].time > 200) {
					++that.array[i].f;
					
					if (that.array[i].f >= 40) {
						that.array[i].f = 40;
						that.array[i].dead = true;
						//that.array[i].active = false;
						//that.array[i].c.visible = false;
					}

					f = that.array[i].f;
					that.array[i].time = 0;
				}

				var inc = (Math.PI*2)/6;
				var thisinc = i*inc;
				var offsetx = Math.cos(thisinc+((i-r*2)/8))*that.settings.xPositionMultiplier;
				var offsetz = Math.sin(thisinc+((i-r*2)/8))*that.settings.zPositionMultiplier;
				var offsety = offsetz;
				
				var cNormal = vectorArray[f].normal;

				var amountx = 1-Math.abs(cNormal.x);
				var amountz = 1-Math.abs(cNormal.z);
				var amounty = 1-Math.abs(cNormal.y);

				var tox = vectorArray[f].position.x+(offsetx*amountx);
				var toy = vectorArray[f].position.y+(offsety*amounty);
				var toz = vectorArray[f].position.z+(offsetz*amountz);

			} else {
				var tox = animal.position.x+(that.array[i].toPosition.x*100);
				var toy = animal.position.y+(that.array[i].toPosition.y*100);
				var toz = animal.position.z+(that.array[i].toPosition.z*100);	
			}

			if (!that.array[i].keepRunning) {
				if (cNormal.y > 0.5) {
					toy = vectorArray[f].position.y - 10;
				}
			}

			if (that.settings.capy != null && toy < that.settings.capy) {
				toy = that.settings.capy;
			}

			// test
			/*if (toz > animal.position.z) {
				toz = animal.position.z;
			}*/

			// flying
			if (that.settings.flying) {
				//var pulse = Math.cos((i-r*10)/15)*10
				
				if (!that.array[i].keepRunning) {
				
					var flyAmount = that.settings.flyingDistance//+Math.abs(Math.sin((thisinc+pulse)/10)*30);			

					if (cNormal.x < -0.8) {
						tox -= flyAmount;
					}
					if (cNormal.x > 0.8) {
						tox += flyAmount;
					}
					if (cNormal.y < -0.8 || cNormal.y > 0.8) {
						toy += flyAmount;
					}
					if (cNormal.z < -0.8) {
						toz -= flyAmount;
					}
					if (cNormal.z > 0.8) {
						toz += flyAmount;
					}

				} else {
					
					toy = that.array[i].toPosition.y+that.settings.flyingDistance;

				}
			}


			if (that.settings.constantSpeed != null) {
				that.array[i].a.animalA.timeScale = that.settings.constantSpeed;
				that.array[i].a.animalB.timeScale = that.settings.constantSpeed;
			}


			if (that.settings.shootRayDown ) {

				if (that.array[i].rayIndex == rayCount%4) {
	
					var ray = obj.ray;
					//animal.position.y += 500;
					ray.origin.copy( animal.position );
					ray.origin.y += 500;

					var c = scene.collisions.rayCastNearest(ray);

					if(c) {

						// need scale setting...
						toy = ray.origin.y - ( ( c.distance * 1 ) + 3 );
						//toy = ray.origin.y - ( ( c.distance * 0.15 ) + 3 );
						cNormal = c.mesh.matrixRotationWorld.multiplyVector3( c.normal ).normalize();
					
						that.array[i].lastToy = toy;
						that.array[i].normal.copy(cNormal);

					}
				} else {
					toy = that.array[i].lastToy;
				}

			}

			if (that.settings.gravity) {
				that.array[i].gravity += 0.3;
				toy = animal.position.y -= that.array[i].gravity;
				toz = animal.position.z;
				tox = animal.position.x;

				animal.rotation.x += 0.04;
				animal.rotation.y += 0.02;

			}

			var divider = 7;
			var ydivider = divider;
			if (that.array[i].keepRunning) {
				divider = 4;

				if (Math.abs(toy-animal.position.y) > 10) {
					ydivider = divider/2;
				} else {
					ydivider = divider*2;
				}
				
			}

			if (that.settings.flying) {
				ydivider = 8;
			}

			var moveX = (tox-animal.position.x)/divider;
			var moveY = (toy-animal.position.y)/ydivider;
			var moveZ = (toz-animal.position.z)/divider;

			if (that.array[i].dead && !wasDead) {
				// tween scale
				var scaleTween = new TWEEN.Tween(that.array[i])
					.to({scale: that.array[i].scale*0.1}, 400)
					.easing(TWEEN.Easing.Quartic.EaseIn);
				scaleTween.start()
			}

			var scalecheck = 0.1;
			if (that.array[i].keepRunning) {
				scalecheck = 0.01;
			}

			if (that.array[i].dead && scale <= scalecheck) {
				that.array[i].active = false;
				that.array[i].c.visible = false;
				continue;
			}

			if (!that.array[i].keepRunning) {
				var falloffDivider = 2+(f/10);
				var maxSpeed = animalSpeed/falloffDivider;
			} else {
				var maxSpeed = animalSpeed/15;
				//var maxSpeed = animalSpeed/3;				
			}


			if (!that.array[i].keepRunning) {
				if ( moveY > maxSpeed )	moveY = maxSpeed;
				if ( moveY < -maxSpeed ) moveY = -maxSpeed;
			}

			if ( moveX > maxSpeed )	moveX = maxSpeed;
			if ( moveX < -maxSpeed ) moveX = -maxSpeed;

			if ( moveZ > maxSpeed )	moveZ = maxSpeed;
			if ( moveZ < -maxSpeed )moveZ = -maxSpeed;

			if (!that.settings.gravity) {
			
			var zvec = new THREE.Vector3(animal.position.x+moveX,animal.position.y+moveY,animal.position.z+moveZ);
			zvec.subSelf( animal.position ).normalize();

			var xvec = new THREE.Vector3();
			var yvec = new THREE.Vector3(cNormal.x*-1, cNormal.y*-1, cNormal.z*-1);
			if (that.settings.flying || that.settings.gravity) {
				yvec = new THREE.Vector3(0, -1, 0);
			}

			xvec.cross(zvec, yvec);
			yvec.cross(zvec, xvec);

			animal.matrixWorld.n11 = xvec.x*scale; animal.matrixWorld.n12 = yvec.x*scale; animal.matrixWorld.n13 = zvec.x*scale; animal.matrixWorld.n14 = animal.position.x;
			animal.matrixWorld.n21 = xvec.y*scale; animal.matrixWorld.n22 = yvec.y*scale; animal.matrixWorld.n23 = zvec.y*scale; animal.matrixWorld.n24 = animal.position.y;
			animal.matrixWorld.n31 = xvec.z*scale; animal.matrixWorld.n32 = yvec.z*scale; animal.matrixWorld.n33 = zvec.z*scale; animal.matrixWorld.n34 = animal.position.z;

			}

			/*if (that.settings.addaptiveSpeed) {
				var dx = animal.position.x - (animal.position.x+moveX), dy = animal.position.y - (animal.position.y+moveY), dz = animal.position.z - (animal.position.z+moveZ);
				var distance =  Math.abs(dx * dx + dy * dy + dz * dz);

				var speed = Math.max(distance/delta, 0.65);
				speed = Math.min(speed, 1.5);
				
				that.array[i].a.animalA.timeScale = speed;
				that.array[i].a.animalB.timeScale = speed;
			}*/

			animal.position.x += moveX;
			animal.position.y += moveY;
			animal.position.z += moveZ;
			

			/*if (animal.position.x < camPos.x+30 && animal.position.x > camPos.x-30 && animal.position.z < camPos.z+30 && animal.position.z > camPos.z-30) {
				that.array[i].active = false;
				that.array[i].c.visible = false;
			}

			// hack..
			if (animal.position.z > camPos.z+170) {
				that.array[i].active = false;
				that.array[i].c.visible = false;
			}*/

		}

	}



	this.reset = function ( x,y,z ) {

		for (var i=0; i<that.initSettings.numOfAnimals; ++i ) {
			var obj = that.array[i].c;
			obj.position.x = x;
			obj.position.y = y;
			obj.position.z = z;

			that.array[i].active = false;
		}

	}

}
var AnimalInFrontOfCamera = function ( numOfAnimals, scene ) {

	var that = this;

	var animalArray = [];
	var scene = scene;

	that.initSettings = {
		numOfAnimals : numOfAnimals || 30
	}

	that.settings = {

	}

	var r = 0;
	var i;

	var container = new THREE.Cube( 10, 10, 10 );
	var animalContainer = new THREE.Mesh( container );
	scene.addChild( animalContainer );

	this.addAnimal = function ( geometry ) {

		for ( var i = 0; i < that.initSettings.numOfAnimals; ++i ) {

			var animal = ROME.Animal( geometry, false );
			var mesh = animal.mesh;

			var scale = 0.02+(Math.random()/8);

			var x = (Math.random()*120)-60;
			var y = (i*(150/15))-10;
			var z = (Math.random()*120)-60;

			mesh.position.x = x;
			mesh.position.y = y;
			mesh.position.z = z;

			animalContainer.addChild( mesh );

			animal.animalA.timeScale = 0.8;
			animal.animalB.timeScale = 0.8;

			animal.play( animal.availableAnimals[ 0 ], animal.availableAnimals[ 0 ], 0, Math.random() );

			var obj = { c: mesh, x: x, y: y, z: z, a: animal, scale:scale * 1.5 };

			animalArray.push(obj);

		}

	}

	this.update = function (position, theta, delta, skipPosition) {

		r += 0.1;

			animalContainer.position = position;

		if (!skipPosition) {
			animalContainer.position.x -= Math.cos( theta )*110;
			animalContainer.position.z -= Math.sin( theta )*110;
		}
		if (isNaN(delta) || delta > 1000 ) {
			delta = 1000/60;
		}

		for (i=0; i<that.initSettings.numOfAnimals; ++i ) {
			var obj =  animalArray[i];
			var animal = obj.c;
			var x = obj.x;
			var y = obj.y;
			var z = obj.z;
			var scale = obj.scale;
		
			var offsetx = Math.cos(i-r);
			var offsetz = Math.sin(i-r);

			x += offsetx;
			y += 0.5*(delta/20);
			z += offsetz;

			if (y > 140 ) {
				y = -10;
			}

			animal.lookAt( new THREE.Vector3(x,y,z) );

			//animal.rotation.y -= 3.14;

			animal.position.x = x;
			animal.position.y = y;
			animal.position.z = z;

			animalArray[i].x = x;
			animalArray[i].y = y;
			animalArray[i].z = z;

		}

	}


}

var Trail = function ( numOfInstances, scene ) {
	
	var that = this;

	that.array = [];
	var scene = scene;

	that.initSettings = {

		numOfInstances : numOfInstances || 100

	};

	that.settings = {

		spread : 70,
		visible : true,
		aliveDivider: that.initSettings.numOfInstances,
		tweenTime: 2500,
		scale: 1,
		offsetAmount: 6,
		freeRotation: true

	};

	var i;

	this.addInstance = function( geometry, predefined, tree, lightHouse, materialArray ) {
		
		var predefined = predefined || null;
		var tree = tree || false;
		var lightHouse = lightHouse || false;

		for ( i = 0; i < that.initSettings.numOfInstances; ++i ) {
			
			if ((predefined == null && that.array[i] != undefined) || (predefined != that.array[i]) ) {
				continue;
			}

			if ( materialArray == undefined ) {

				var c = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial() );

			} else {

				var c = new THREE.Mesh( geometry, materialArray[i%materialArray.length] );	

			}

			c.scale.x = c.scale.y = c.scale.z = 0.00000001;
			
			var obj = { c:c, alivetime:i, normal:new THREE.Vector3(), tree:tree, lightHouse:lightHouse };
			
			scene.addObject(c);
			that.array[i] = obj;

		}
		
		return c;

	};

	this.update = function ( position, normal, camPos, delta ) {

		if (isNaN(delta) || delta > 1000 ) {
			delta = 1000/60;
		}

		var multiplier = delta/that.settings.aliveDivider;
		
		// grass

		for ( i=0; i<that.array.length; ++i ) {

			var obj = that.array[i];
			var c = obj.c;

			var alivetime = obj.alivetime;
			var tree = obj.tree;
			var lightHouse = obj.lightHouse;
			var maxHeight = obj.maxHeight;
			
			alivetime += multiplier;
			
			// respawn
			if (alivetime > that.initSettings.numOfInstances) {

				c.position.x = position.x;
				c.position.y = position.y;
				c.position.z = position.z;

				c.rotation.x = 0;
				c.rotation.z = 0;
				c.rotation.y = 0;

				var amount = that.settings.offsetAmount;

				if (tree) {
					amount = that.settings.offsetAmount+2;
				}

				var torotx = 0;
				var toroty = 0;
				var torotz = 0;

				if (that.settings.freeRotation) {

					c.position.x = position.x-(normal.x*amount);
					c.position.y = position.y-(normal.y*amount);
					c.position.z = position.z-(normal.z*amount);

					c.position.x += ((Math.random()*that.settings.spread)-(that.settings.spread/2))*(1-Math.abs(normal.x));
					c.position.z += ((Math.random()*that.settings.spread)-(that.settings.spread/2))*(1-Math.abs(normal.z));

					c.rotation.x = 0;
					c.rotation.z = 0;
					c.rotation.y = Math.random()*Math.PI;

					c.up.copy(normal);
					c.lookAt(c.position);

				} else {
	
					if (normal.x < -0.5) {
						c.position.x = position.x + amount/2;
						c.rotation.z = 1.57;
						c.rotation.x = Math.random()*Math.PI;
						if (tree) {
							torotz = c.rotation.z+(Math.random()-0.5);
							c.rotation.z = 0;
							torotx = c.rotation.x;
							toroty = c.rotation.y;
						}
						c.position.y += (Math.random()*that.settings.spread)-(that.settings.spread/2);
						c.position.z += (Math.random()*that.settings.spread)-(that.settings.spread/2);
					}
					if (normal.x > 0.5) {
						c.position.x = position.x - amount/2;
						c.rotation.z = -1.57;
						if (tree) {
							torotz = c.rotation.z +(Math.random()-0.5);
							c.rotation.z = 0;
							torotx = c.rotation.x;
							toroty = c.rotation.y;
						}
						c.rotation.x = Math.random()*Math.PI;

						c.position.y += (Math.random()*that.settings.spread)-(that.settings.spread/2);
						c.position.z += (Math.random()*that.settings.spread)-(that.settings.spread/2);
					}
					if (normal.y < -0.9) {
						c.position.y = position.y + amount;
						c.rotation.y = Math.random()*Math.PI;
						if (tree) {
							torotz = c.rotation.z+(Math.random()-0.5);
							c.rotation.z = 1.57;
							torotx = c.rotation.x;
							toroty = c.rotation.y;
						}
						c.position.x += (Math.random()*that.settings.spread)-(that.settings.spread/2);
						c.position.z += (Math.random()*that.settings.spread)-(that.settings.spread/2);
					}
					if (normal.y > 0.9) {
						c.position.y = position.y - amount;
						c.rotation.y = Math.random()*Math.PI;
						if (tree) {
							torotz += c.rotation.z+(Math.random()-0.5);
							c.rotation.z = 1.57;
							torotx = c.rotation.x;
							toroty = c.rotation.y;
						}
						
						c.position.x += (Math.random()*that.settings.spread)-(that.settings.spread/2);
						c.position.z += (Math.random()*that.settings.spread)-(that.settings.spread/2);
					}
					if (normal.z < -0.5) {
						c.position.z = position.z + amount/2;
						c.rotation.x = -1.57;
						c.rotation.y = Math.random()*Math.PI;
						if (tree) {
							torotx = c.rotation.x+(Math.random()-0.5);
							c.rotation.x = 0;
							torotz = c.rotation.z;
							toroty = c.rotation.y;
						}
						c.position.y += (Math.random()*that.settings.spread)-(that.settings.spread/2);;
						c.position.x += (Math.random()*that.settings.spread)-(that.settings.spread/2);
					}
					if (normal.z > 0.5) {
						c.position.z = position.z - amount/2;
						c.rotation.x = 1.57;
						c.rotation.y = Math.random()*Math.PI;
						if (tree) {
							torotx = c.rotation.x+(Math.random()-0.5);
							c.rotation.x = 0;
							torotz = c.rotation.z;
							toroty = c.rotation.y;
						}

						c.position.y += (Math.random()*that.settings.spread)-(that.settings.spread/2);
						c.position.x += (Math.random()*that.settings.spread)-(that.settings.spread/2);
					}

				}

				if (tree) {
					var treeRotateTween = new TWEEN.Tween(c.rotation)
								.to({x: torotx, y: toroty, z: torotz}, that.settings.tweenTime)
								.easing(TWEEN.Easing.Elastic.EaseOut);
					treeRotateTween.start();				
				}

				// keep away from camera path - hack
				if (tree && c.position.x < camPos.x+60 && c.position.x > camPos.x-60) {
					c.position.x = camPos.x+60;
					if (c.position.x < camPos.x) {
						c.position.x = camPos.x-60;
					}
				}


				c.scale.x = c.scale.y= c.scale.z = 0.001*that.settings.scale;
				var xscale = zscale = yscale = 0.1*that.settings.scale;
				if (lightHouse) {
					var xscale = zscale = yscale = 0.4*that.settings.scale;
					if (Math.abs(normal.y) < 0.9) {
						continue;
					}
				}
				if (!tree && !lightHouse) {
					yscale = 0.3*that.settings.scale;
					xscale = zscale = 0.4*that.settings.scale;
				}

				var easeType = TWEEN.Easing.Quintic.EaseOut;
				if (tree || lightHouse) {
					easeType = TWEEN.Easing.Elastic.EaseOut;
				}

				var growTween = new TWEEN.Tween(c.scale)
							.to({x: xscale, y: yscale, z: zscale}, that.settings.tweenTime)
							.easing(easeType);
				growTween.start();				


				alivetime = 0;
			}

			that.array[i].alivetime = alivetime;

			c.visible = that.settings.visible;

		}

	};


};

var CollisionScene = function ( camera, scene, scale, shared, collisionDistance, useOldRay ) {
	
	var that = this;
	that.currentNormal = new THREE.Vector3( 0, 1, 0 );
	that.emitterNormal = new THREE.Vector3( 0, 1, 0 );
	that.distance = 0;

	that.initSettings = {

	};

	that.settings = {

		useOldRay : useOldRay || false,
		maxSpeedDivider : 2,
		emitterDivider : 5,
		cameraTargetDivider : 10,
		capBottom : null,
		capTop : null,
		allowFlying : false,
		collisionDistance : collisionDistance || 400,
		scale : scale || 1.0,
		shootRayDown : false,
		keepEmitterFollowDown : false,
		normalOffsetAmount : 6,
		minDistance : 10,
		camera : camera

	};

	var mouse2d = new THREE.Vector3( 0, 0, 1 );

	var ray = new THREE.Ray();
	var matrix = new THREE.Matrix4();
	var matrix2 = new THREE.Matrix4();
	var positionVector = new THREE.Vector3();
	// useOldRay
	var projector = new THREE.Projector();
	var collisionScene = new THREE.Scene();

	var cube = new THREE.Cube( 5, 5, 5 );

	that.emitter = addMesh( cube, 1, shared.camPos.x, shared.camPos.y, shared.camPos.z, 0,0,0, new THREE.MeshBasicMaterial( { color: 0xFFFF33, opacity: 0.4 } ) );
	that.emitterFollow = addMesh( cube, 1, shared.camPos.x, shared.camPos.y, shared.camPos.z, 0,0,0, new THREE.MeshBasicMaterial( { color: 0x33FFFF, opacity: 0.4 } ) );
	if (that.settings.useOldRay) {
		that.cameraTarget = addMesh( cube, 1, shared.camPos.x, shared.camPos.y, shared.camPos.z, 0,0,0, new THREE.MeshBasicMaterial( { color: 0x33FF33, opacity: 0.4 } ) );
	}

	that.emitter.visible = false;
	that.emitterFollow.visible = false;

	// collision boxes

	var cube = new THREE.Cube( 50000,50000,10, 1,1,1 );
	var material = new THREE.MeshLambertMaterial( { color: 0x0000FF, opacity: 0.2 } );
	var front = new THREE.Mesh ( cube, material	);
	var back = new THREE.Mesh ( cube, material );
	var cube = new THREE.Cube( 10,50000,50000, 1,1,1 );
	var left = new THREE.Mesh ( cube, material );
	var right = new THREE.Mesh ( cube, material	);
	var cube = new THREE.Cube( 50000,10,50000, 1,1,1 );
	var top = new THREE.Mesh ( cube, material );
	var bottom = new THREE.Mesh ( cube, material );

	if (that.settings.useOldRay) {

		collisionScene.addObject( front );
		collisionScene.addObject( back );
		collisionScene.addObject( left );
		collisionScene.addObject( right );
		collisionScene.addObject( top );
		collisionScene.addObject( bottom );
	
	} else {
		
		scene.addObject( front );
		scene.addObject( back );
		scene.addObject( left );
		scene.addObject( right );
		scene.addObject( top );
		scene.addObject( bottom );

		scene.collisions.colliders.push( THREE.CollisionUtils.MeshOBB( front ) );
		scene.collisions.colliders.push( THREE.CollisionUtils.MeshOBB( back ) );
		scene.collisions.colliders.push( THREE.CollisionUtils.MeshOBB( left ) );
		scene.collisions.colliders.push( THREE.CollisionUtils.MeshOBB( right ) );
		scene.collisions.colliders.push( THREE.CollisionUtils.MeshOBB( top ) );
		scene.collisions.colliders.push( THREE.CollisionUtils.MeshOBB( bottom ) );

		front.visible = false;
		back.visible = false;
		left.visible = false;
		right.visible = false;
		top.visible = false;
		bottom.visible = false;
	}

	this.addLoaded = function ( geometry, scale, rotation, position, realscene ) {

		var material = new THREE.MeshLambertMaterial( { color: 0xFF0000, opacity: 0.5 } );

		var mesh = new THREE.Mesh( geometry, material );

		mesh.scale.x = mesh.scale.y = mesh.scale.z = scale;
		mesh.rotation = rotation || new THREE.Vector3();
		mesh.position = position || new THREE.Vector3();

		collisionScene.addObject( mesh );

	};

	this.update = function ( camPos, delta ) {
		right.position.x = camPos.x + that.settings.collisionDistance;
		left.position.x  = camPos.x - that.settings.collisionDistance;
		right.position.z = camPos.z;
		right.position.y = camPos.y;
		left.position.z  = camPos.z;
		left.position.y  = camPos.y;

		front.position.z = camPos.z - that.settings.collisionDistance;
		back.position.z  = camPos.z + that.settings.collisionDistance;
		front.position.x = camPos.x;
		front.position.y = camPos.y;
		back.position.x  = camPos.x;
		back.position.y  = camPos.y;

		bottom.position.y = camPos.y - that.settings.collisionDistance;
		top.position.y    = camPos.y + that.settings.collisionDistance;
		bottom.position.x = camPos.x;
		bottom.position.z = camPos.z;
		top.position.x    = camPos.x;
		top.position.z    = camPos.z;

		if ( that.settings.capBottom != null ) {

			if ( bottom.position.y < that.settings.capBottom ) {
				 bottom.position.y = that.settings.capBottom;
			}

		}

		if ( that.settings.capTop != null ) {

			if ( top.position.y < that.settings.capTop ) {
				 top.position.y = that.settings.capTop;
			}

		}

		if (!that.settings.useOldRay) {

			mouse2d.x = ( shared.mouse.x / shared.screenWidth ) * 2 - 1;
			mouse2d.y = - ( shared.mouse.y / shared.screenHeight ) * 2 + 1;
			mouse2d.z = 1;

			ray.origin.copy( mouse2d );

			matrix.copy( that.settings.camera.matrixWorld );
			matrix.multiplySelf( THREE.Matrix4.makeInvert( that.settings.camera.projectionMatrix, matrix2 ) );
			matrix.multiplyVector3( ray.origin );
			
			ray.direction.copy( ray.origin );
			ray.direction.subSelf( camPos );

			var c = scene.collisions.rayCastNearest( ray );

			if( c && c.distance > that.settings.minDistance ) {

				var distance = c.distance*that.settings.scale;

				if ( distance > that.settings.collisionDistance ) {

					distance = that.settings.collisionDistance;

				}

				that.distance = distance;

				positionVector.copy( ray.origin );
				positionVector.addSelf( ray.direction.multiplyScalar( distance ) );
				
				that.emitter.position = positionVector;
				
				if ( c.normal != undefined ) {

					var normal = c.mesh.matrixRotationWorld.multiplyVector3( c.normal ).normalize();
					that.currentNormal = normal;
					that.emitterNormal = normal;

				}

				if ( c.mesh == right || c.mesh == front || c.mesh == back || c.mesh == left || c.mesh == top || c.mesh == bottom ) {

					that.currentNormal.set( 0, 1, 0 );

					// not to be airborne

					if ( !that.settings.allowFlying && !that.settings.shootRayDown ) {

						that.emitter.position.y = bottom.position.y;
						
					}

					if ( that.settings.shootRayDown ) {

						ray.origin.copy( that.emitter.position );
						ray.direction.set( 0, -1, 0 );

						var c = scene.collisions.rayCastNearest( ray );
					
						that.emitter.position.y -= c.distance * that.settings.scale;

						var normal = c.mesh.matrixRotationWorld.multiplyVector3( c.normal ).normalize();
						that.currentNormal = normal;

					}

				}

				that.emitter.position.x += that.currentNormal.x * that.settings.normalOffsetAmount;
				that.emitter.position.y += that.currentNormal.y * that.settings.normalOffsetAmount;
				that.emitter.position.z += that.currentNormal.z * that.settings.normalOffsetAmount;
				
			} else {
			
				// no collsion

			}
		
		} else {
			
			// emitter
			var vector = new THREE.Vector3( ( shared.mouse.x / shared.screenWidth ) * 2 - 1, - ( shared.mouse.y / shared.screenHeight ) * 2 + 1, 0.5 );
			projector.unprojectVector( vector, camera );
			var rayOld = new THREE.Ray( camPos, vector.subSelf( camPos ).normalize() );
			var intersects = rayOld.intersectScene( collisionScene );

			//var emitterNormal = new THREE.Vector3(0,1,0);

			if ( intersects.length > 0 ) {

				for ( var i = 0; i < intersects.length; ++i ) {

					var check = vector.z < 0 ? intersects[i].point.z < camPos.z : intersects[i].point.z > camPos.z;

					if ( check && intersects[i].object != that.emitter && intersects[i].object != that.emitterFollow ) {

						that.emitter.position = intersects[i].point;

						var dx = camPos.x-that.emitter.position.x;
						var dz = camPos.z-that.emitter.position.z;

						var angleRad = Math.atan2(dz, dx);
						that.emitter.position.x -= Math.cos( angleRad )*that.settings.minDistance/10;
						that.emitter.position.z -= Math.sin( angleRad )*that.settings.minDistance;					

						// hack for now...
						if (that.emitter.position.z > camPos.z-20) {
							that.emitter.position.z = camPos.z-20;
						}

						var face = intersects[i].face;
						var object = intersects[i].object;
						var normal = object.matrixRotationWorld.multiplyVector3( face.normal.clone() );
						that.emitterNormal = normal;
						
						// walls
						if (intersects[i].object == right || intersects[i].object == front || intersects[i].object == back || intersects[i].object == left || intersects[i].object == top) {
							that.emitterNormal.x = 0;
							that.emitterNormal.y = 1;
							that.emitterNormal.z = 0;
							// not to be airbourne
							if (!that.settings.allowFlying) {
								that.emitter.position.y = bottom.position.y+5;					
							}
						}

						break;
					}
				}

			}

		}



		if ( isNaN(delta) || delta > 1000 || delta == 0 ) {
			delta = 1000 / 60;
		}

		var maxSpeed = delta / that.settings.maxSpeedDivider;

		var tox = that.emitter.position.x;
		var moveX = ( tox - that.emitterFollow.position.x ) / that.settings.emitterDivider;

		var toy = that.emitter.position.y;
		var moveY = ( toy - that.emitterFollow.position.y ) / that.settings.emitterDivider;

		var toz = that.emitter.position.z;
		var moveZ = ( toz - that.emitterFollow.position.z ) / that.settings.emitterDivider;

		if ( moveY > maxSpeed ) moveY = maxSpeed;
		if ( moveY < -maxSpeed ) moveY = -maxSpeed;

		if ( moveX > maxSpeed ) moveX = maxSpeed;
		if ( moveX < -maxSpeed ) moveX = -maxSpeed;

		if ( moveZ > maxSpeed )	moveZ = maxSpeed;
		if ( moveZ < -maxSpeed ) moveZ = -maxSpeed;

		that.emitterFollow.position.x += moveX;
		that.emitterFollow.position.y += moveY;
		that.emitterFollow.position.z += moveZ;	


		if ( that.settings.keepEmitterFollowDown && !that.settings.useOldRay ) {

			that.emitterFollow.position.y = that.emitter.position.y + that.settings.collisionDistance;

			ray.origin.copy( that.emitterFollow.position );
			ray.direction.set( 0, -1, 0 );

			var c = scene.collisions.rayCastNearest( ray );

			if ( c ) {

				that.emitterFollow.position.y -= ( c.distance * that.settings.scale ) - that.settings.normalOffsetAmount;

				var normal = c.mesh.matrixRotationWorld.multiplyVector3( c.normal ).normalize();
				that.currentNormal = normal;

			}

		}

		if (that.settings.useOldRay) {

			// shoot rays in all directions from emitterFollow, clamp in the direction of the shortest distance
			var direction = new THREE.Vector3();
			var rayOld = new THREE.Ray( that.emitterFollow.position, direction );
			var shortestDistance = 10000;
			var shortestPoint = that.emitterFollow.position;
			var shortestObject;
			var shortestFace;

			// x left
			direction.set(-1,0,0);
			rayOld.direction = direction;
			var intersects = rayOld.intersectScene( collisionScene );

			if ( intersects.length > 0 ) {
				for ( var i = 0; i < intersects.length; ++i ) {
					if ( intersects[i].object != that.emitter && intersects[i].object != left && intersects[i].object != right ) {
						if (intersects[i].distance < shortestDistance) {
							shortestDistance = intersects[i].distance;
							shortestPoint = intersects[i].point;
							shortestFace = intersects[i].face;
							shortestObject = intersects[i].object;
						}
						break;
					}
				}
			}

			// x right
			direction.set(1,0,0);
			rayOld.direction = direction;
			var intersects = rayOld.intersectScene( collisionScene );

			if ( intersects.length > 0 ) {
				for ( var i = 0; i < intersects.length; ++i ) {
					if ( intersects[i].object != that.emitter && intersects[i].object != left && intersects[i].object != right ) {
						if (intersects[i].distance < shortestDistance) {
							shortestDistance = intersects[i].distance;
							shortestPoint = intersects[i].point;
							shortestFace = intersects[i].face;
							shortestObject = intersects[i].object;
						}
						break;
					}
				}
			}


			// y down
			direction.set(0,-1,0);
			rayOld.direction = direction;
			var intersects = rayOld.intersectScene( collisionScene );

			if ( intersects.length > 0 ) {
				for ( var i = 0; i < intersects.length; ++i ) {
					if ( intersects[i].object != that.emitter && intersects[i].object != top ) {
						if (intersects[i].distance < shortestDistance) {
							shortestDistance = intersects[i].distance;
							shortestPoint = intersects[i].point;
							shortestFace = intersects[i].face;
							shortestObject = intersects[i].object;
						}
						break;
					}
				}
			}


			// z forward
			/*direction.set(0,0,-1);
			rayOld.direction = direction;
			var intersects = rayOld.intersectScene( collisionScene );

			if ( intersects.length > 0 ) {
				for ( var i = 0; i < intersects.length; ++i ) {
					if ( intersects[i].object != that.emitter && intersects[i].object != front && intersects[i].object != back ) {
						if (intersects[i].distance < shortestDistance) {
							shortestDistance = intersects[i].distance;
							shortestPoint = intersects[i].point;
							shortestFace = intersects[i].face;
							shortestObject = intersects[i].object;
						}
						break;
					}
				}
			}

			// z back
			direction.set(0,0,1);
			rayOld.direction = direction;
			var intersects = rayOld.intersectScene( collisionScene );

			if ( intersects.length > 0 ) {
				for ( var i = 0; i < intersects.length; ++i ) {
					if ( intersects[i].object != that.emitter && intersects[i].object != front && intersects[i].object != back ) {
						if (intersects[i].distance < shortestDistance) {
							shortestDistance = intersects[i].distance;
							shortestPoint = intersects[i].point;
							shortestFace = intersects[i].face;
							shortestObject = intersects[i].object;
						}
						break;
					}
				}
			}*/

			// clamp to the closest "hit"
			that.emitterFollow.position = shortestPoint;

			if (shortestObject != undefined) {
				var normal = shortestObject.matrixRotationWorld.multiplyVector3( shortestFace.normal.clone() );
				that.currentNormal = normal;
			}

			/*var amount = 5;

			that.emitterFollow.position.x += that.currentNormal.x*amount;
			that.emitterFollow.position.y += that.currentNormal.y*amount;
			that.emitterFollow.position.z += that.currentNormal.z*amount;
			*/

			var toy = that.emitterFollow.position.y;
			var moveY = ( toy - that.cameraTarget.position.y ) / that.settings.cameraTargetDivider;

			var tox = that.emitterFollow.position.x;
			var moveX = ( tox - that.cameraTarget.position.x ) / that.settings.cameraTargetDivider;

			var toz = that.emitterFollow.position.z;
			var moveZ = ( toz - that.cameraTarget.position.z ) / that.settings.cameraTargetDivider;

			var maxSpeed = 8;
			var maxSpeedY = 4;

			if ( moveY > maxSpeedY )	moveY = maxSpeedY;
			if ( moveY < -maxSpeedY ) moveY = -maxSpeedY;

			if ( moveX > maxSpeed )	moveX = maxSpeed;
			if ( moveX < -maxSpeed ) moveX = -maxSpeed;

			if ( moveZ > maxSpeed )	moveZ = maxSpeed;
			if ( moveZ < -maxSpeed )moveZ = -maxSpeed;

			that.cameraTarget.position.x += moveX;
			that.cameraTarget.position.y += moveY;
			that.cameraTarget.position.z += moveZ;

			// hack for now...
			if (that.cameraTarget.position.z > camPos.z-80) {
				that.cameraTarget.position.z = camPos.z-80;
			}

	/*		emitterReal.position = that.emitter.position;
			emitterFollowReal.position = that.emitterFollow.position;
			cameraTargetReal.position = that.cameraTarget.position;
	*/
			shared.renderer.render( collisionScene, camera );
			//shared.renderer.render( scene, camera, renderTarget );
			shared.renderer.clear();

		}

	};

	function addMesh( geometry, scale, x, y, z, rx, ry, rz, material ) {

		var mesh = new THREE.Mesh( geometry, material );

		mesh.scale.set( scale, scale, scale );
		mesh.position.set( x, y, z );
		mesh.rotation.set( rx, ry, rz );

		mesh.updateMatrix();
		if (that.settings.useOldRay) {
			collisionScene.addObject( mesh );
		} else {
			scene.addObject( mesh );
		}

		return mesh;

	};

	this.reset = function ( x, y, z ) {

		that.emitter.position.set( x, y, z );
		that.emitterFollow.position.set( x, y, z );
		if (that.settings.useOldRay) {
			that.cameraTarget.position.set( x, y, z );
		}

	};

};

ROME.TrailShaderUtils = ( function() {
	
	var that = {};
	var trailTexture;
	var markTexture;
	var trailTextureSize;
	var GL;
	var renderer;
	var maxX = -9999999, maxZ = -9999999, minX = 9999999, minZ = 9999999;
	var width, depth;
	
	
	//--- set materials ---
	
	that.setMaterials = function( meshes, trailTextureSizeIn, markTextureIn, rendererIn ) {

		// set params
		
		trailTextureSize = trailTextureSizeIn;
		markTexture = markTextureIn;
		renderer = rendererIn;
		GL = renderer.getContext();
		

		// init trail map
		
		trailTexture = GL.createTexture();
		
		GL.bindTexture( GL.TEXTURE_2D, trailTexture );
		GL.texImage2D( GL.TEXTURE_2D, 0, GL.RGB, trailTextureSize, trailTextureSize, 0, GL.RGB, GL.UNSIGNED_BYTE, null );
		GL.texParameteri( GL.TEXTURE_2D, GL.TEXTURE_WRAP_S, GL.CLAMP_TO_EDGE );
		GL.texParameteri( GL.TEXTURE_2D, GL.TEXTURE_WRAP_T, GL.CLAMP_TO_EDGE );
		GL.texParameteri( GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.LINEAR );
		GL.texParameteri( GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.NEAREST );

		ROME.TrailShader.textures.trailMap = new THREE.Texture();
		ROME.TrailShader.textures.trailMap.needsUpdate = false;
		ROME.TrailShader.textures.trailMap.__webglTexture = trailTexture;
				
				
		// find extremes
		
		var m, ml, mesh, positionX, positionZ;
		var x, z;
		var v, vl, vertices, vertex;
		
		for( m = 0, ml = meshes.length; m < ml; m++ ) {
			
			mesh = meshes[ m ];
			positionX = mesh.position.x;
			positionZ = mesh.position.y;
			vertices = mesh.geometry.vertices;
			
			for( v = 0, vl = vertices.length; v < vl; v++ ) {
				
				vertex = vertices[ v ].position;
				
				x = vertex.x + positionX;
				z = vertex.y + positionZ;
				
				maxX = Math.max( maxX, x );
				maxZ = Math.max( maxZ, z );
				minX = Math.min( minX, x );
				minZ = Math.min( minZ, z );
										
			}
			
		}
		
		width = maxX - minX;
		depth = maxZ - minZ;
		
		
		// create uv and materials

		var attributes, trailUV;
		var trailMaterial, material;

		for( m = 0; m < ml; m++ ) {

			mesh = meshes[ m ];
			positionX = mesh.position.x;
			positionZ = mesh.position.y;
			vertices = mesh.geometry.vertices;


			// create custom attributes

			attributes = ROME.TrailShader.attributes();
			trailUV = attributes.trailUV.value;


			// calc uv
			
			for( v = 0, vl = vertices.length; v < vl; v++ ) {
				
				vertex = vertices[ v ].position;
				
				trailUV.push( new THREE.Vector2(( vertex.x + positionX - minX ) / width, 
												( vertex.y + positionZ - minZ ) / depth ));
				
			}

			
			// create material
			
			trailMaterial = new THREE.MeshShaderMaterial( {
				
				uniforms: ROME.TrailShader.uniforms,
				attributes: attributes,
				vertexShader: ROME.TrailShader.vertexShader,
				fragmentShader: ROME.TrailShader.fragmentShader
				
			} );
			
			trailMaterial.fog = true;
			trailMaterial.lights = true;
			trailMaterial.vertexColors = 2;
			trailMaterial.uniforms.trailMap.texture = ROME.TrailShader.textures.trailMap;
			trailMaterial.uniforms.faceMap.texture = ROME.TrailShader.textures.faceMap;
			trailMaterial.uniforms.lavaMap.texture = ROME.TrailShader.textures.lavaMap;
			trailMaterial.uniforms.lavaNoiseMap.texture = ROME.TrailShader.textures.lavaNoiseMap;

			trailMaterial.uniforms.lavaMap.texture.wrapS = trailMaterial.uniforms.lavaMap.texture.wrapT = THREE.Repeat;
			trailMaterial.uniforms.lavaNoiseMap.texture.wrapS = trailMaterial.uniforms.lavaNoiseMap.texture.wrapT = THREE.Repeat;

			
			mesh.materials[ 0 ] = trailMaterial;
		}

	}


	//--- update lava ---

	that.updateLava = function( deltaTime, x, z ) {
		
		deltaTime = deltaTime !== undefined ? deltaTime : 1;
		
		ROME.TrailShader.uniforms.lavaHeadPosition.value.set( x !== undefined ? x : 0, 0, z != undefined ? z : 0 );

	//	ROME.TrailShader.uniforms.lavaTime.value += 0.000001 * deltaTime;
		ROME.TrailShader.uniforms.lavaTime.value += deltaTime;
		if(ROME.TrailShader.uniforms.lavaTime.value > 1.0)	
			ROME.TrailShader.uniforms.lavaTime.value = 0.0;	
		if(ROME.TrailShader.uniforms.lavaTime.value < 0.0)	
			ROME.TrailShader.uniforms.lavaTime.value = 0.0;	

	}
	
	
	//--- set mark at ---
	
	that.setMarkAtWorldPosition = function( worldX, worldZ ) {

		if( trailTextureSize ) {
			
			var u = (( worldX - minX ) / width ) * trailTextureSize;
			var v = (( worldZ - minZ ) / depth ) * trailTextureSize;
			
			if( u >= 0 && u < trailTextureSize - markTexture.image.width && 
				v >= 0 && v < trailTextureSize - markTexture.image.height ) {
					
				GL.bindTexture( GL.TEXTURE_2D, trailTexture );
				GL.texSubImage2D( GL.TEXTURE_2D, 0, u, v, GL.RGB, GL.UNSIGNED_BYTE, markTexture.image );
					
			}
			


		}

	}

	return that;	
	
} ());


ROME.TrailShader = {
	
	textures: {
		
		trailMap: undefined,		// set by code
		faceMap: THREE.ImageUtils.loadTexture( "files/textures/PaintDubs.jpg" ),
		lavaMap: THREE.ImageUtils.loadTexture( "files/textures/lava.jpg" ),
		/*lavaNoiseMap: THREE.ImageUtils.loadTexture( "files/textures/lavaNoise.png" )*/
		lavaNoiseMap: THREE.ImageUtils.loadTexture( "files/textures/Color_noise.jpg" )
		
	},
	
	uniforms: {

		"trailMap": 				 	{ type: "t", value: 0, texture: undefined },
		"faceMap": 					 	{ type: "t", value: 1, texture: undefined },
		"lavaMap": 					 	{ type: "t", value: 2, texture: undefined },
		"lavaNoiseMap": 			 	{ type: "t", value: 3, texture: undefined },
		"lavaHeadPosition":				{ type: "v3", value: new THREE.Vector3( 0, 0, 0 ) },
		"lavaTime": 					{ type: "f", value: 0 },
		"lavaUvScale": 					{ type: "v2", value: new THREE.Vector2( 50.0, 50.0 ) },

		"fogColor": 					{ type: "c", value: new THREE.Color() },
		"fogDensity": 					{ type: "f", value: 0 },

		"enableLighting": 				{ type: "i", value: 1 },
		"ambientLightColor": 			{ type: "fv", value: [] },
		"directionalLightDirection": 	{ type: "fv", value: [] },
		"directionalLightColor": 		{ type: "fv", value: [] },
		"pointLightColor": 				{ type: "fv", value: [] },
		"pointLightPosition": 			{ type: "fv", value: [] },
		"pointLightDistance": 			{ type: "fv1", value: [] }

	},
	
	attributes: function() { return {

			"trailUV": 	{ type: "v2", boundTo: "vertices", value:[] }

		}
	},

	vertexShader: [

		"#if MAX_DIR_LIGHTS > 0",
			"uniform vec3 		directionalLightColor    [ MAX_DIR_LIGHTS ];",
			"uniform vec3 		directionalLightDirection[ MAX_DIR_LIGHTS ];",
		"#endif",
	
		"#if MAX_POINT_LIGHTS > 0",
			"uniform vec3 		pointLightColor   [ MAX_POINT_LIGHTS ];",
			"uniform vec3 		pointLightPosition[ MAX_POINT_LIGHTS ];",
			"uniform float	 	pointLightDistance[ MAX_POINT_LIGHTS ];",
		"#endif",

		"uniform vec3 		ambientLightColor;",

		"attribute	vec2	trailUV;",

		"varying 	vec2	vUV;",
		"varying 	vec2	vPos;",
		"varying 	vec2	vTrailUV;",
		"varying	vec3	vColor;",
		"varying  	vec4	vLightWeighting;",

		"void main() {",

			"vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
			"vec3 transformedNormal = normalize( normalMatrix * normal );",
	
			"vLightWeighting = vec4( ambientLightColor, 1.0 );",
	
			"#if MAX_DIR_LIGHTS > 0",
	
				"for( int i = 0; i < MAX_DIR_LIGHTS; i++ ) {",
		
					"vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );",
					"float directionalLightWeighting = max( dot( transformedNormal, normalize( lDirection.xyz ) ), 0.0 );",
					"vLightWeighting.xyz += directionalLightColor[ i ] * directionalLightWeighting;",
		
				"}",
	
			"#endif",
	
			"#if MAX_POINT_LIGHTS > 0",
	
				/*"for( int i = 0; i < MAX_POINT_LIGHTS; i++ ) {",
	
					"vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );",
					"vec3 lVector = lPosition.xyz - mvPosition.xyz;",
					"float lDistance = 1.0;",
	
					"if ( pointLightDistance[ i ] > 0.0 )",
						"lDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );",
	
					"lVector = normalize( lVector );",
	
					"float pointLightWeighting = max( dot( transformedNormal, lVector ), 0.0 );",
					"vLightWeighting.xyz += pointLightColor[ i ] * pointLightWeighting * lDistance;",
	
				"}",*/
	
			"#endif",

			"vUV = uv;",
			"vTrailUV = trailUV;",
			"vColor = color;",
			"vPos = position.xy;",
			"gl_Position = projectionMatrix * mvPosition;",
		"}"

	].join("\n"),

	fragmentShader: [

		"uniform 	sampler2D 	faceMap;",
		"uniform 	sampler2D 	trailMap;",
		"uniform 	sampler2D 	lavaMap;",
		"uniform 	sampler2D 	lavaNoiseMap;",

		"uniform  	vec2		lavaUvScale;",
		"uniform  	float		lavaTime;",

		"uniform 	vec3 		lavaHeadPosition;",
		"uniform 	vec3 		fogColor;",
		"uniform 	float 		fogDensity;",

		"varying 	vec2		vUV;",
		"varying 	vec2		vPos;",
		"varying 	vec2		vTrailUV;",
		"varying	vec3		vColor;",
		"varying 	vec4 		vLightWeighting;",

		"void main() {",

			// fog

			"float depth = gl_FragCoord.z / gl_FragCoord.w;",
			"const float LOG2 = 1.442695;",
			
			"float fogFactor = exp2( -fogDensity * fogDensity * depth * depth * LOG2 );",
			"fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );",


			// lava

			"vec4 lavaColor;",
			"float mixValue, f;",
			
			"float offsetU = sin( lavaTime * 10.0 ) * 0.002;",
			"float offsetV = cos( lavaTime * 11.0 ) * 0.002;",
			"vec2 uvOffsetA = vec2( offsetU, offsetV );",
			"vec2 uvOffsetB = vec2( -offsetU, offsetV );",
			"vec2 lookup;",
			

			// grass
			
			"gl_FragColor = vec4( vColor, 1.0 ) * texture2D(faceMap, vUV);",
			"lookup = texture2D(lavaNoiseMap, vTrailUV * vec2(65.0)).rg;",
			"f = texture2D(trailMap, vTrailUV + vec2(0.01) * lookup).r;",
			"mixValue = f + max(1.0 - length(vec2(0.015) * vec2(vPos.xy - lavaHeadPosition.xz) + lookup * vec2(0.4)), 0.0);",
			//"mixValue = dot(vPos - lavaHeadPosition.xz,  vPos - lavaHeadPosition.xz);",
			"if(mixValue > 0.5)",
			"{",
				"gl_FragColor = gl_FragColor.gggg * vec4(0.27, 0.25, 0.3, 1.0) - vec4(0.1, 0.1, 0.1, 1.0);",
				"mixValue = abs((texture2D(lavaNoiseMap, vTrailUV.yx * vec2(40.0, -40.0)).r - 0.5));",
				"mixValue = max(max(1.0 - mixValue * 32.0, 0.0) * (lookup.r - 0.5) * 8.0, 0.0);",
				"gl_FragColor += vec4(mixValue) * texture2D( lavaMap, vTrailUV * vec2(200.0) - vec2( lavaTime * 2.5)) * texture2D(lavaNoiseMap, vTrailUV * vec2(10.0) - vec2( lavaTime * 2.5)).rrrr * vec4(2.0);",
			"}",



			// add up
			
			"gl_FragColor = gl_FragColor * vLightWeighting;", 
			//"gl_FragColor = lookup.rrrr;",
			"gl_FragColor.a = 1.0;",

		"}"

	].join("\n")
			
}


var Stragglers = function ( numOfAnimals, scene, vectorArray ) {
	
	var that = this;

	that.array = [];
	var scene = scene;

	that.initSettings = {
		numOfAnimals : numOfAnimals || 3
	}

	that.settings = {
		divider : 2,
		constantSpeed : null,
		addaptiveSpeed : false,
		capy : null
	}
	
	var i;

	this.addAnimal = function( geometry, predefined, scale, morphArray, speedArray ) {
		
		var predefined = predefined || null;
		var scaleMultiplier = scale || 1.2;
		var morphArray = morphArray || null;

		for ( i = 0; i < that.initSettings.numOfAnimals; ++i ) {
			
			if ((predefined == null && that.array[i] != undefined) || (predefined != that.array[i]) ) {
				continue;
			}

			if (speedArray == null) {
				speedArray = [1];
			}

			var animal = ROME.Animal( geometry, false );
			var mesh = animal.mesh;

			var scale = 0.02+(Math.random()/8);
			scale = Math.max(scale, 0.1);

			mesh.matrixAutoUpdate = false;
			mesh.visible = false;
			scene.addChild( mesh );

			var startMorph = 0;
			var endMorph = 0;
			if (morphArray != null) {
				startMorph = morphArray[i%morphArray.length]%animal.availableAnimals.length;
				endMorph = startMorph+1;
				var rnd = Math.round(Math.random());
				if ((rnd == 1 && startMorph > 0) || endMorph > animal.availableAnimals.length-1) {
					endMorph = startMorph-1;
				}
				//endMorph = Math.floor(Math.random()*animal.availableAnimals.length);
			}

			var speeda = speedArray[startMorph];
			var speedb = speedArray[endMorph];

			animal.play( animal.availableAnimals[ startMorph ], animal.availableAnimals[ endMorph ], 0, Math.random(), Math.random() );

			var count = Math.random();
			if (i<2) {
				count = 0;
			}
	
			var obj = { c: mesh, a: animal, active: false, startMorph: startMorph, speeda: speeda, speedb: speedb, normal: new THREE.Vector3(0,-1,0), position: new THREE.Vector3(0,0,0), toVector: new THREE.Vector3(0,0,0) , count: count, scale: scale * scaleMultiplier, origscale: scale * scaleMultiplier };

			that.array[i] = obj;

		}

	}

	this.create = function (position, normal, toPosition) {
		for (i=0; i<that.initSettings.numOfAnimals; ++i ) {
			if (that.array[i].active) {
				continue;
			}
			that.array[i].active = true;
			that.array[i].position.copy(position);
			that.array[i].normal.copy(normal);
			that.array[i].c.position.copy(position);
			that.array[i].c.visible = true;
			that.array[i].toVector = toPosition.subSelf(position).normalize();

			that.array[i].toVector.x *= 1-Math.abs(normal.x);
			that.array[i].toVector.y *= 1-Math.abs(normal.y);
			that.array[i].toVector.z *= 1-Math.abs(normal.z);
			
			// tween scale
			that.array[i].scale = 0.01;
			var scaleTween = new TWEEN.Tween(that.array[i])
				.to({scale: that.array[i].origscale}, 2500)
				.easing(TWEEN.Easing.Elastic.EaseOut);
			scaleTween.start();
			
			// tween popup
			var scale = that.array[i].scale;
			that.array[i].c.position.x -= (normal.x)*(scale*150);
			that.array[i].c.position.y -= (normal.y)*(scale*150);
			that.array[i].c.position.z -= (normal.z)*(scale*150);

			break;
		}
	}

	this.update = function (delta, camPos) {

		if (isNaN(delta) || delta > 1000 || delta == 0 ) {
			delta = 1000/60;
		}

		for (i=0; i<that.initSettings.numOfAnimals; ++i ) {
			var obj =  that.array[i];
			var active = obj.active;
			if (!active) {
				continue;
			}
			var animal = obj.c;
			var anim = obj.a;
			var scale = obj.scale;
			var normal = obj.normal;
			var position = obj.position;
			var toVector = obj.toVector;


			var tox = position.x+(toVector.x*10);
			var toy = position.y+(toVector.y*10);
			var toz = position.z+(toVector.z*10);
			
			if (normal.y > 0.5) {
				toy -= 10;
			}

			if (that.settings.capy != null && toy < that.settings.capy) {
				toy = that.settings.capy;
				normal.set(0,1,0);
			}

			// morph
			that.array[i].count += 0.05;
			var morph = Math.max(Math.cos(that.array[i].count),0);
			morph = Math.min(morph, 1)
			that.array[i].a.morph = morph;

			if (that.settings.constantSpeed != null) {
				that.array[i].a.animalA.timeScale = that.settings.constantSpeed;
				that.array[i].a.animalB.timeScale = that.settings.constantSpeed;
			}

			var animalSpeed = obj.speeda;
			if (Math.round(morph) == 1) {
				animalSpeed = obj.speedb;
			}

			//var divider = delta/10;
			var divider = 5;

			var moveX = (tox-animal.position.x)/divider;//that.settings.divider;
			var moveY = (toy-animal.position.y)/divider;//that.settings.divider;
			var moveZ = (toz-animal.position.z)/divider;//that.settings.divider;

			var maxSpeed = animalSpeed//12;

			if ( moveY > maxSpeed )	moveY = maxSpeed;
			if ( moveY < -maxSpeed ) moveY = -maxSpeed;

			if ( moveX > maxSpeed )	moveX = maxSpeed;
			if ( moveX < -maxSpeed ) moveX = -maxSpeed;

			if ( moveZ > maxSpeed )	moveZ = maxSpeed;
			if ( moveZ < -maxSpeed )moveZ = -maxSpeed;

			var zvec = new THREE.Vector3(tox,toy,toz);
			zvec.subSelf( animal.position ).normalize();

			var xvec = new THREE.Vector3();
			var yvec = new THREE.Vector3(normal.x*-1, normal.y*-1, normal.z*-1);

			xvec.cross(zvec, yvec);
			yvec.cross(zvec, xvec);

			animal.matrixWorld.n11 = xvec.x*scale; animal.matrixWorld.n12 = yvec.x*scale; animal.matrixWorld.n13 = zvec.x*scale; animal.matrixWorld.n14 = animal.position.x;
			animal.matrixWorld.n21 = xvec.y*scale; animal.matrixWorld.n22 = yvec.y*scale; animal.matrixWorld.n23 = zvec.y*scale; animal.matrixWorld.n24 = animal.position.y;
			animal.matrixWorld.n31 = xvec.z*scale; animal.matrixWorld.n32 = yvec.z*scale; animal.matrixWorld.n33 = zvec.z*scale; animal.matrixWorld.n34 = animal.position.z;

			animal.position.x += moveX;
			animal.position.y += moveY;
			animal.position.z += moveZ;

			that.array[i].position.copy(animal.position);

			// hack..
			if (animal.position.z > camPos.z+100) {
				that.array[i].active = false;
				that.array[i].c.visible = false;
			}

		}

	}

	this.reset = function ( x,y,z ) {

		for (var i=0; i<that.array.length; ++i ) {
			var obj = that.array[i].c;
			obj.position.x = x;
			obj.position.y = y;
			obj.position.z = z;

			that.array[i].active = false;
			that.array[i].c.visible = false;
		}

	}

}

var VideoPlane = function( shared, layer, conf ) {
	
	var video, texture, interval, shader, material, wireMaterial;
	var config = conf;
	var hasDistortion = false;
	var hasKey = false;
    
	VideoLoadRegister[ layer.path ] = 1;
	
    video = document.createElement( 'video' );
    video.src = layer.path;
	video.preload = true;
	video.load();
    
	shared.signals.loadItemAdded.dispatch();
	
	// emit loaded signal either at canplaythrough event
	// or after 5 seconds
	// (this is to get around occasional not firing of 
	//  canplaythrough event :/)

	video.addEventListener( "canplaythrough", function() { 	

		if ( VideoLoadRegister[ layer.path ] == 1 ) {
		
			shared.signals.loadItemCompleted.dispatch();
			VideoLoadRegister[ layer.path ] = 2;

		}

	}, false );
	
	setTimeout( function() { 
		
		if( VideoLoadRegister[ layer.path ] == 1 ) {

			shared.signals.loadItemCompleted.dispatch();
			VideoLoadRegister[ layer.path ] = 2;

		}

	}, 5000 );
	
    texture = new THREE.Texture(video);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    
    switch ( layer.shaderId ) {

        case VIDEO_OPAQUE:
            shader = VideoShaderSource.opaque;
            break;

		case VIDEO_OPAQUE_DISTORT:
            shader = VideoShaderSource.distortOpaque;
			hasDistortion = true;
            break;

		case VIDEO_KEYED_DISTORT:
            shader = VideoShaderSource.distortKeyed;
			hasDistortion = true;
			hasKey = true;
            break;

		case VIDEO_HALFALPHA:
            shader = VideoShaderSource.halfAlpha;
            break;

        case VIDEO_KEYED:
        default:
            shader = VideoShaderSource.keyed;
			hasKey = true;
            break;

    }
	
	var uniforms = THREE.UniformsUtils.clone( shader.uniforms ); // ? ######
    uniforms['map'].texture = texture;
	
	if ( hasDistortion ) {

		uniforms['mouseXY'].value = new THREE.Vector2( 0, 0 );
		uniforms['aspect'].value = config.aspect;

	}
	
	if ( hasKey ) {

		uniforms['colorScale'].value = layer.colorScale;
		uniforms['threshold'].value = layer.threshold;
		uniforms['alphaFadeout'].value = layer.alphaFadeout;

	}
	
	material = new THREE.MeshShaderMaterial({

        uniforms: uniforms,
        vertexShader: shader.vertexShader,
        fragmentShader: shader.fragmentShader,
		depthTest: false

    });
	
	//
	if( !layer.width ) layer.width = ( hasDistortion ) ? 1.104 : 1;
	if( !layer.height ) layer.height = ( hasDistortion ) ? 1.24 : 1;
    
    if( hasDistortion ) 
		this.mesh = new THREE.Mesh( config.grid, material );
	else 
		this.mesh = new THREE.Mesh( new THREE.Plane( 1,1,1,1 ), material );
		
	
	this.mesh.scale.x = layer.width;
	this.mesh.scale.y = layer.height;
    this.mesh.position.z = layer.z;
    this.mesh.scale.x *= Math.abs(layer.z) * config.adj * config.aspect;
    this.mesh.scale.y *= Math.abs(layer.z) * config.adj;
	
	
	if ( false ) { //hasDistortion) {

		wireMaterial = new THREE.MeshShaderMaterial( {
			uniforms: uniforms,
			vertexShader: VideoShaderSource.distortWire.vertexShader,
			fragmentShader: VideoShaderSource.distortWire.fragmentShader,
			blending: THREE.BillboardBlending,
			wireframe: true
		});
		
		this.wireMesh = new THREE.Mesh( config.grid, wireMaterial );
		this.wireMesh.scale.x = layer.width;
		this.wireMesh.scale.y = layer.height;
	    this.wireMesh.position.z = layer.z + 0.1;
	    this.wireMesh.scale.x *= Math.abs(layer.z) * config.adj * config.aspect;
	    this.wireMesh.scale.y *= Math.abs(layer.z) * config.adj;

	}
	
	this.start = function( t ) {
		
		video.currentTime = video.duration * t;
		video.play();
		
		interval = setInterval( function() {

	        if ( video.readyState === video.HAVE_ENOUGH_DATA ) {

	            texture.needsUpdate = true;

	        }

	    }, 1000 / 24);

	}
	
	this.stop = function() {
		
		video.pause();
		clearInterval( interval );

	}
	
	this.updateUniform = function(mouseX, mouseY) {

		if( !hasDistortion ) return;

		material.uniforms['mouseXY'].value.x = -mouseX * config.aspect;
		material.uniforms['mouseXY'].value.y = -mouseY;

	}

};

var VideoLoadRegister = {
};



var VIDEO_OPAQUE = 1;
var VIDEO_HALFALPHA = 2;
var VIDEO_OPAQUE_DISTORT = 3;
var VIDEO_KEYED = 4;
var VIDEO_KEYED_DISTORT = 5;

var VideoPlayer = function( shared, layers, conf ) {

	var that = this;
	
	SequencerItem.call( this );

	var config = {};
	var planes = [];
	var gridLoaded = false;
	
	var scene, camera;
	var renderer = shared.renderer, renderTarget = shared.renderTarget;
	
	var mouseX = 0, mouseY = 0;
	var targetPos;
	
	this.duration = layers[ 0 ].duration;
	
	this.init = function(){
		
		config.prx = conf.paralaxHorizontal || 0;
		config.pry = conf.paralaxVertical || 0;
		config.tgd = conf.targetDistance || 1500;
		
		onGrid = function(geometry){

			config.grid = geometry;
			that.onLoad();

		}
		
		gridLoader = new THREE.JSONLoader();
		gridLoader.load( { model: "files/models/VideoDistortGrid.js", callback: onGrid } );

	}
	
	this.onLoad = function() {

		gridLoaded = true;
	
	 	shared.signals.mousemoved.add(function(){

	 		mouseX = ( shared.mouse.x / shared.screenWidth ) * -2 + 1;
	 		mouseY = ( shared.mouse.y / shared.screenHeight ) * 2 - 1;

	 	});
		
		//document.addEventListener('mousemove', this.mouseMove, false);
		targetPos = new THREE.Vector2( 0, 0 );
		
		config.fov = 54;
		config.aspect = 2.35;
		config.adj = Math.tan( config.fov * Math.PI / 360 ) * 2;
		
		camera = new THREE.Camera( config.fov, config.aspect, 1, 100000 );
		camera.target.position = new THREE.Vector3( 0, 0, config.tgd * -1 );
		camera.updateMatrix();
		
		scene = new THREE.Scene();
		scene.addLight( new THREE.AmbientLight( 0x000000 ) );

		for(var i = 0; i < layers.length; i++) {			
			var p = new VideoPlane(shared, layers[i], config);
			planes.push(p);
			scene.addObject(p.mesh);
			if(p.wireMesh) scene.addObject(p.wireMesh);
		}
	}
	
	this.show = function( progress ) {

		for ( var i = 0; i < planes.length; i++ ) {

			planes[i].start( progress );

		}

	}
	
	this.hide = function(){

		for ( var i = 0; i < planes.length; i++ ) {

			planes[i].stop();

		}

	}
	
	this.update = function( progress, delta, time ) {

		if( !gridLoaded ) {

			return;

		}
		
		targetPos.x = mouseX * config.prx;
		targetPos.y = mouseY * config.pry;

		//camera.position.x += (targetPos.x - camera.position.x) / 2;
		//camera.position.y += (targetPos.y - camera.position.y) / 2;	
		
		camera.target.position.x += (targetPos.x - camera.target.position.x) / 2;
		camera.target.position.y += (targetPos.y - camera.target.position.y) / 2;	
				
		for ( var i = 0; i < planes.length; i++ ) {

			planes[i].updateUniform( mouseX, mouseY );

		}
		
		renderer.render( scene, camera, renderTarget );
		//renderer.render( scene, camera );
	}
	
	// #####
	//var windowHalfX = window.innerWidth >> 1;
	//var windowHalfY = window.innerHeight >> 1;
	//this.mouseMove = function(e){
	//	mouseX = (event.clientX - windowHalfX) / -windowHalfX;
	//	mouseY = (event.clientY - windowHalfY) / windowHalfY;
	//}
}


VideoPlayer.prototype = new SequencerItem();
VideoPlayer.prototype.constructor = VideoPlayer;

var DistortUniforms = {
      "aspect": { type: "f", value: 0 },
			"map": { type: "t", value: 0, texture: null },
			"colorScale": { type: "f", value: 1 },
			"threshold": { type: "f", value: 0.5 },
			"alphaFadeout": { type: "f", value: 0.5 },
      "mouseXY": { type: "v2", value: new THREE.Vector2() },
      "mouseSpeed": { type: "v2", value: new THREE.Vector2() },
      "mouseRad": { type: "f", value: 0 }
		};


var DistortShaderFragmentPars = [
      "uniform sampler2D map;",
			"uniform float colorScale;",
			"uniform float threshold;",
			"uniform float alphaFadeout;",

      "varying vec2 vUv;",
      "varying vec2 vUvPoly;",
      "varying float distancePoly;"].join("\n");

var DistortVertexShader = [
            "uniform vec2 mouseXY;",
            "uniform float aspect;",

            "varying vec2 vUv;",
            "varying vec2 vUvPoly;",
            "varying vec3 pos;",
            "varying vec3 posPoly;",
            "varying vec4 viewPos;",
            "varying vec4 viewPosPoly;",
            "varying vec2 projPos;",
            "varying vec2 projPosPoly;",
            "varying float distance;",
            "varying float distancePoly;",


			"void main() {",
				"vUv = uv;",
                "vUvPoly = uv+vec2(normal.x,normal.y);",

                "viewPos = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
                "viewPosPoly = projectionMatrix * modelViewMatrix * vec4( position-vec3(-normal.x,normal.y,0.), 1.0 );",

                "projPos = vec2(aspect,1.)*vec2(viewPos.x/viewPos.z,viewPos.y/viewPos.z);",
                "projPosPoly = vec2(aspect,1.)*vec2(viewPosPoly.x/viewPosPoly.z,viewPosPoly.y/viewPosPoly.z);",

                "distance = max(0.,1.0-length(projPos-vec2(mouseXY.x, mouseXY.y)));",

                "float distFade = normal.z*0.8+0.8;",

                "distancePoly = max(0.,distFade-length(projPosPoly-vec2(mouseXY.x, mouseXY.y)));",

                "viewPos.xy = viewPos.xy + normalize(projPos-vec2(mouseXY.x, mouseXY.y))*0.6*pow(distance,1.)*(viewPos.z/10.);",
                "gl_Position = viewPos;",

			"}"
		].join("\n");


var VideoShaderSource = {
	opaque: {

		uniforms: {
			"map" : { type: "t", value: 0, texture: null }
		},

		vertexShader: [
			"varying vec2 vUv;",

			"void main() {",
				"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
				"vUv = uv;",
			"}"
		].join("\n"),

		fragmentShader: [
			"uniform sampler2D map;",
			"varying vec2 vUv;",
			
			"void main() {",				
				"gl_FragColor = texture2D( map, vUv );",
			"}"
		].join("\n")

	},
	
	halfAlpha : {

		uniforms: {
			"map": { type: "t", value: 0, texture: null }
		},

		vertexShader: [

			"varying vec2 vUv;",

			"void main() {",
				"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
				"vUv = uv;",
			"}"

		].join("\n"),

		fragmentShader: [
			"uniform sampler2D map;",

			"varying vec2 vUv;",

			"void main() {",
				"vec4 c = texture2D( map, vec2( vUv.x * 0.5, vUv.y ) );",
				"vec4 a = texture2D( map, vec2( 0.5 + vUv.x * 0.5, vUv.y ) );",
				"gl_FragColor = vec4(c.rgb, a.r);",
			"}"

		].join("\n")

	},
	
	keyed: {

		uniforms: {
			"map" : { type: "t", value: 0, texture: null },
			"colorScale": { type: "f", value: 1 },
			"threshold": { type: "f", value: 0.5 },
			"alphaFadeout": { type: "f", value: 0.5 }
		},

		vertexShader: [
			"varying vec2 vUv;",
			"uniform bool flip;",

			"void main() {",
				"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
				"vUv = uv;",
			"}"
		].join("\n"),

		fragmentShader: [
			"uniform sampler2D map;",
			"uniform float colorScale;",
			"uniform float threshold;",
			"uniform float alphaFadeout;",
			
			"varying vec2 vUv;",

			"void main() {",
				"vec3 cd = vec3(1.0 - colorScale);",
				"vec3 cs = vec3(colorScale);",				
				"vec4 c = texture2D( map, vUv );",
				"float t = c.x + c.y + c.z;",
				"float alpha = 1.0;",
				"if( t < threshold )",
					"alpha = t / alphaFadeout;",
				"gl_FragColor = vec4( (c.xyz - cd) * cs, alpha );",
				//"gl_FragColor = vec4( c.xyz, alpha );",
			"}"
		].join("\n")
	},
	
	distortOpaque: {

		uniforms:DistortUniforms,

		vertexShader: DistortVertexShader,

		fragmentShader: [

      DistortShaderFragmentPars,

			"void main() {",
				"vec4 c = texture2D( map, vec2( vUv.x, vUv.y ) );",
                "vec4 cPoly = texture2D( map, vec2( vUvPoly.x, vUvPoly.y ) );",
                "if ((distancePoly)>0.7) c = cPoly; ",
                "if (c.a<=0.1) discard;",
                "else gl_FragColor = c;",
			"}"

		].join("\n")

	},
	
	distortKeyed : {

		uniforms: DistortUniforms,

		vertexShader: DistortVertexShader,

		fragmentShader: [
      DistortShaderFragmentPars,

			"void main() {",
				"vec4 c = texture2D( map, vec2( vUv.x, vUv.y ) );",
                "vec4 cPoly = texture2D( map, vec2( vUvPoly.x, vUvPoly.y ) );",
                "if ((distancePoly)>0.7) c = cPoly; ",
                "if (c.a<=0.1) {",
				"	discard;",
				"} else {",
				"	vec3 cd = vec3(1.0 - colorScale);",
				"	vec3 cs = vec3(colorScale);",
				"	float t = c.x + c.y + c.z;",
				"	float alpha = 1.0;",
				"	if( t < threshold )",
				"		alpha = t / alphaFadeout;",
				"	gl_FragColor = vec4( (c.xyz - cd) * cs, alpha );",
				"}",
			"}"

		].join("\n")

	},
	
	distortWire : {

		uniforms: DistortUniforms,

		vertexShader: DistortVertexShader,

		fragmentShader: [

      DistortShaderFragmentPars,

			"void main() {",
                "vec4 cPoly = texture2D( map, vec2( vUvPoly.x, vUvPoly.y ) );",
                "if ((distancePoly)>0.8 && cPoly.a>0.) cPoly = vec4(cPoly.rgb*2.,distancePoly/16.); ",
                "else cPoly = vec4(1.,1.,1.,0.); ",
                "gl_FragColor = cPoly;",
			"}"

		].join("\n")

	},

	distortWireKeyed : {

		uniforms: DistortUniforms,

		vertexShader: DistortVertexShader,

		fragmentShader: [

      DistortShaderFragmentPars,

			"void main() {",
                "vec4 cPoly = texture2D( map, vec2( vUvPoly.x, vUvPoly.y ) );",
                "if ((distancePoly)>0.8 && cPoly.a>0.) cPoly = vec4(1.,1.,1.,distancePoly/16.); ",
                "else cPoly = vec4(1.,1.,1.,0.); ",
                "gl_FragColor = cPoly;",
			"}"

		].join("\n")

	}
};


var VideoShots = {

    confParalax: {

        paralaxHorizontal: 40,
        paralaxVertical: 10

    },
    
    confStill: {

        paralaxHorizontal: 0,
        paralaxVertical: 0

    },
    
    introLayers: [{

        path: "files/videos/intro.webm",
        shaderId: VIDEO_OPAQUE,
        z: -1000,
		duration: 22000

    }],

	s01_01: [{
        path: "files/videos/city/s01_layer01.webm",
        shaderId: VIDEO_OPAQUE,
        z: -1000,
		duration: 3120
	}],
	
	s01_03: [{
        path: "files/videos/city/s03_layer03.webm",
        shaderId: VIDEO_OPAQUE,
        z: -900,
		duration: 8120
	},{
        path: "files/videos/city/s03_layer02.webm",
        shaderId: VIDEO_KEYED_DISTORT,
        z: -800,
        colorScale: .9,
        threshold: .28,
        alphaFadeout: .35,
		width: 2, height: 2
	},{
        path: "files/videos/city/s03_layer01.webm",
        shaderId: VIDEO_KEYED,
        z: -700,
        colorScale: .9,
        threshold: .28,
        alphaFadeout: .35
	}],
	
	s01_06: [{
        path: "files/videos/city/s06_layer02.webm",
        shaderId: VIDEO_OPAQUE,
        z: -1000,
		duration: 2030	
	},{
        path: "files/videos/city/s06_layer01.webm",
        shaderId: VIDEO_KEYED_DISTORT,
        z: -900,
		colorScale: .99,
        threshold: .45,
        alphaFadeout: .35	
	}],
	
	s01_09: [
		{       
		    path: "files/videos/city/s09_layer03.webm",
	        shaderId: VIDEO_KEYED_DISTORT,
	        z: -1000,
			duration: 8230,
			colorScale: .99,
	        threshold: .45,
	        alphaFadeout: .35	
		},{       
		    path: "files/videos/city/s09_layer02.webm",
	        shaderId: VIDEO_KEYED,
	        z: -900,
			colorScale: .99,
	        threshold: .45,
	        alphaFadeout: .35,
			width: 1.4, height: 1
		},{       
		    path: "files/videos/city/s09_layer01.webm",
	        shaderId: VIDEO_KEYED,
	        z: -700,
			colorScale: .99,
	        threshold: .45,
	        alphaFadeout: .35
		}
	],
   
    dunesLayers: [{

        path: "files/videos/transition_dunes.webm",
        shaderId: VIDEO_OPAQUE,
        z: -1000,
		duration: 20000

    }],
    
    
    s02_01: [{

        path: "files/videos/prairie/s01_layer04.webm",
        shaderId: VIDEO_OPAQUE_DISTORT,
        z: -1400,
		duration: 9230 // in millis

    }, {

        path: "files/videos/prairie/s01_layer03.webm",
        shaderId: VIDEO_KEYED,
        z: -1000,
        colorScale: .99,
        threshold: .45,
        alphaFadeout: .35

    }, {

        path: "files/videos/prairie/s01_layer02.webm",
        shaderId: VIDEO_KEYED,
        z: -50,
        colorScale: .91,
        threshold: .28,
        alphaFadeout: .7,
        width: 1.05,
        height: 1.05

    }, {

        path: "files/videos/prairie/s01_layer01.webm",
        shaderId: VIDEO_KEYED,
        z: -30,
        colorScale: .8,
        threshold: .28,
        alphaFadeout: .7,
        width: 1.05,
        height: 1.05

    }],
    
    s02_02: [{

        path: "files/videos/prairie/s02_layer03.webm",
        shaderId: VIDEO_OPAQUE,
        z: -1010,
		duration: 2020

    }, {

        path: "files/videos/prairie/s02_layer02.webm",
        shaderId: VIDEO_KEYED_DISTORT,
        z: -1000,
        colorScale: .99,
        threshold: .45,
        alphaFadeout: .35

    }, {

        path: "files/videos/prairie/s02_layer01.webm",
        shaderId: VIDEO_HALFALPHA,
        z: -990
		
    }],
    
    s02_03: [{
        path: "files/videos/prairie/s03_layer03.webm",
        shaderId: VIDEO_OPAQUE,
        z: -1010,
		duration: 2030
    }, {
        path: "files/videos/prairie/s03_layer02.webm",
        shaderId: VIDEO_KEYED_DISTORT,
        z: -1000,
        colorScale: .99,
        threshold: .45,
        alphaFadeout: .35
    }, {
        path: "files/videos/prairie/s03_layer01.webm",
        shaderId: VIDEO_HALFALPHA,
        z: -990
    }],
    
    s02_04: [{
        path: "files/videos/prairie/s04_layer03.webm",
        shaderId: VIDEO_OPAQUE,
        z: -1010,
		duration: 5000
    }, {
        path: "files/videos/prairie/s04_layer02.webm",
        shaderId: VIDEO_KEYED_DISTORT,
        z: -1000,
        colorScale: 1,
        threshold: .3,
        alphaFadeout: .3
    }, {
        path: "files/videos/prairie/s04_layer01.webm",
        shaderId: VIDEO_HALFALPHA,
        z: -990
    }],
    
    s02_06: [{
        path: "files/videos/prairie/s06_layer02.webm",
        shaderId: VIDEO_OPAQUE,
        z: -1010,
		duration: 6060
    }, {
        path: "files/videos/prairie/s06_layer01.webm",
        shaderId: VIDEO_KEYED_DISTORT,
        z: -1000,
        colorScale: 1,
        threshold: .3,
        alphaFadeout: .3
    }]
};














var City = function ( shared ) {

	var that = this;

	SequencerItem.call( this );

	// signals
	
	shared.signals.initscenes.add( initScene );
	
	// private variables
	
	var camera, startCamera, switchCamera, world, soup,
	renderer = shared.renderer, renderTarget = shared.renderTarget,
	waypointsA = [], waypointsB = [];
	var switchedCamera = false;

	// temp debug, start with ?debug=true

	shared.debug = false;

	if ( getParameterByName( "debug" ) == "true" ) {

		shared.debug = true;

	}
	
	function initScene () {
		
		console.log( "city initScene" );
		
		that.update( 0.001, 34.99, 45199 );

	};

	this.init = function () {

		//waypointsA = [ [ 0, 20, 0 ], [ 0, 20, -1210 ] ];
		//waypointsA = [ [ 0, 20, 0 ], [ 0, 20, -3350 ] ];

		/*
		startCamera = new THREE.PathCamera( {

			fov: 50, aspect: shared.viewportWidth / shared.viewportHeight, near: 1, far: 100000,
			waypoints: waypointsA, duration: 9.2, 
			useConstantSpeed: true, resamplingCoef: 30,
			createDebugPath: shared.debug, createDebugDummy: shared.debug,
			lookSpeed: 0.0020, lookVertical: true, lookHorizontal: true,
			verticalAngleMap:   { srcRange: [ 0.09, 3.05 ], dstRange: [ 1.0, 1.9 ] },
			horizontalAngleMap: { srcRange: [ 0.00, 6.28 ], dstRange: [ 0.4, Math.PI-0.4 ] }

		 } );
		*/


		/*
		startCamera = new THREE.PathCamera( {

			fov: 50, aspect: shared.viewportWidth / shared.viewportHeight, near: 1, far: 100000,
			waypoints: waypointsA, duration: 26, 
			useConstantSpeed: true, resamplingCoef: 30,
			createDebugPath: shared.debug, createDebugDummy: shared.debug,
			lookSpeed: 0.0020, lookVertical: true, lookHorizontal: true,
			verticalAngleMap:   { srcRange: [ 0.09, 3.05 ], dstRange: [ 1.0, 1.9 ] },
			horizontalAngleMap: { srcRange: [ 0.00, 6.28 ], dstRange: [ 0.4, Math.PI-0.4 ] }

		 } );

		startCamera.position.set( 0, 0, 0 );
		startCamera.lon = 90;

		camera = startCamera;
		*/

		/*
		camera = new THREE.QuakeCamera( {
		fov: 50, aspect: shared.viewportWidth / shared.viewportHeight, near: 1, far: 100000,
		movementSpeed: 100.0, lookSpeed: 0.25, noFly: false, lookVertical: true,
		autoForward: false
		} );

		gui.add( camera.position, 'x' ).name( 'Camera x' ).listen();
		gui.add( camera.position, 'y' ).name( 'Camera y' ).listen();
		gui.add( camera.position, 'z' ).name( 'Camera z' ).listen();
		*/

		camera = new THREE.Camera( 60, shared.viewportWidth / shared.viewportHeight, 1, 100000 );
		camera.position.set( 0, 20, -300 );

		world = new CityWorld( shared );
		soup = new CitySoup( camera, world.scene, shared );
		
		shared.worlds.city = world;
		shared.sequences.city = this;
		 
		/*
		if ( shared.debug ) {

			world.scene.addObject( camera.debugPath );

		}

		world.scene.addObject( camera.animationParent );
		*/
		
		console.log( "city init" );
		
	};

	this.resetCamera = function() {
		
		camera.position.set( 0, 20, -300 );
		//camera.animation.play( false, 0 );

		renderer.setClearColor( world.scene.fog.color );
		renderer.setStencilShadowDarkness( 0.7 );

	};
	
	this.show = function ( progress ) {

		this.resetCamera();

		shared.started.city = true;

		console.log( "show city" );

	};

	this.hide = function () {

	};

	this.update = function ( progress, delta, time ) {
		
		THREE.AnimationHandler.update( delta );

		soup.update( delta );

		camera.position.z -= 0.9 * delta / 8;

		if ( camera.position.z < -3300 ) {

			camera.position.z = -300;

		}

		// choose path
		/*
		var camz = camera.matrixWorld.n34;

		if (camz < -1200 && !switchedCamera ) {

			waypointsB = [ [ 0, 20, camz ], [ 0, 20, -3350 ] ];

			if (camera.theta < 1.2) {
				// turn left
				waypointsB = [ [ 0, 20, camz ], [ 0, 20, -1600 ], [ -110, 20, -1740 ], [ -1670, 20, -1740 ] ];
			}
			if (camera.theta > 1.8) {
				// turn right
				waypointsB = [ [ 0, 20, camz ], [ 0, 20, -1600 ], [ 110, 20, -1740 ], [ 1670, 20, -1740 ] ];
			}

			switchCamera = new THREE.PathCamera( {

				fov: 50, aspect: shared.viewportWidth / shared.viewportHeight, near: 1, far: 100000,
				waypoints: waypointsB, duration: 14.3, 
				useConstantSpeed: true, resamplingCoef: 5,
				createDebugPath: false, createDebugDummy: false,
				lookSpeed: 0.0020, lookVertical: true, lookHorizontal: true,
				verticalAngleMap:   { srcRange: [ 0.09, 3.05 ], dstRange: [ 1.0, 1.9 ] },
				horizontalAngleMap: { srcRange: [ 0.00, 6.28 ], dstRange: [ 0.4, Math.PI-0.4 ] }

			 } );
		
			switchCamera.lat = startCamera.lat;
			switchCamera.lon = startCamera.lon;

			world.scene.addObject( switchCamera.animationParent );
			switchCamera.animation.play( false, 0 );

			camera = switchCamera;
			soup.changeCamera(camera);

			startCamera.animation.stop();
			
			//console.log("switched camera");
			switchedCamera = true;

		}
		*/


		// slight camera roll

		/*
		if ( camera.animationParent ) {

			camera.animationParent.rotation.z = ( camera.target.position.x ) / 700;

		}
		*/

		renderer.render( world.scene, camera, renderTarget );

		world.update( delta, camera, false );
		
		shared.logger.log( "vertices: " + renderer.data.vertices );
		shared.logger.log( 'faces: ' + renderer.data.faces );
		shared.logger.log( 'draw calls: ' + renderer.data.drawCalls );

	};

	function getParameterByName(name) {

		var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);

		return match && decodeURIComponent(match[1].replace(/\+/g, ' '));

	}


};

City.prototype = new SequencerItem();
City.prototype.constructor = City;

var Prairie = function ( shared ) {

	var that = this;

	SequencerItem.call( this );

	// signals
	
	shared.signals.initscenes.add( initScene );
	
	// private variables
	
	var camera, world, soup,
	renderer = shared.renderer, 
	renderTarget = shared.renderTarget,
	cameraPath, waypoints = [];

	function initScene () {
		
		console.log( "prairie initScene" );
		
		that.update( 0.0009, 49.99, 90375 );

	};
	
	this.init = function () {

		waypoints = [
		[ 302.182, 105.662, -15.045 ],
		[ 352.207, 114.403, -16.674 ],
		[ 402.111, 120.122, -17.990 ],
		[ 452.904, 122.699, -19.151 ],
		[ 504.217, 120.952, -20.024 ],
		[ 553.975, 113.019, -20.361 ],
		[ 602.272, 99.086, -20.384 ],
		[ 649.469, 80.302, -20.309 ],
		[ 693.666, 56.337, -19.920 ],
		[ 736.849, 28.213, -19.488 ],
		[ 778.636, -1.415, -19.337 ],
		[ 819.084, -33.658, -19.508 ],
		[ 856.894, -66.605, -19.823 ],
		[ 895.344, -100.750, -20.237 ],
		[ 934.572, -133.462, -20.619 ],
		[ 974.512, -164.171, -20.174 ],
		[ 1014.980, -193.612, -21.554 ],
		[ 1055.660, -220.791, -32.133 ],
		[ 1085.890, -240.610, -66.939 ],
		[ 1094.090, -246.713, -99.358 ]
		];

		var i, x, y, z, t, d = 6;

		for( var i = 0; i < waypoints.length; i++ ) {

			t = waypoints[ i ][ 1 ];
			waypoints[ i ][ 1 ] = waypoints[ i ][ 2 ] + d;
			waypoints[ i ][ 2 ] = -t;

		}

		/*
		camera = new THREE.QuakeCamera( {
		fov: 60, aspect: WIDTH / HEIGHT, near: 1, far: 100000,
		movementSpeed: 100, lookSpeed: 0.25, noFly: false, lookVertical: true,
		autoForward: false
		} );
		*/

		cameraPath = new THREE.PathCamera( {

			fov: 60, aspect: shared.viewportWidth / shared.viewportHeight, near: 1, far: 1000000,
			waypoints: waypoints, duration: 25,
			useConstantSpeed: true, resamplingCoef: 1,
			createDebugPath: false, createDebugDummy: false,
			lookSpeed: 0.004, lookVertical: true, lookHorizontal: true,
			verticalAngleMap:   { srcRange: [ 0.00, 6.28 ], dstRange: [ 1.7, 3.0 ] },
			horizontalAngleMap: { srcRange: [ 0.00, 6.28 ], dstRange: [ 0.3, Math.PI-0.3 ] }

		 } );

		cameraPath.position.set( 0, 0, 0 );
		cameraPath.lon = 360;

		camera = cameraPath;

		world = new PrairieWorld( shared, camera );
		soup = new PrairieSoup( camera, world.scene, shared );

		shared.worlds.prairie = world;
		shared.sequences.prairie = this;

		//world.scene.addObject( cameraPath.debugPath );
		world.scene.addObject( cameraPath.animationParent );

		/*gui.add( camera.position, 'x' ).name( 'Camera x' ).listen();
		gui.add( camera.position, 'y' ).name( 'Camera y' ).listen();
		gui.add( camera.position, 'z' ).name( 'Camera z' ).listen();
		*/
		 
		 console.log( "prairie init" );

	};

	this.show = function ( progress ) {

		this.resetCamera();

		shared.started.prairie = true;
		
		console.log( "show prairie" );

	};

	this.hide = function () {

	};

	this.resetCamera = function() {
		
		camera.position.set( 0, 0, 0 );
		camera.lon = 360;

		camera.animation.play( true, 0 );

		renderer.setClearColor( world.scene.fog.color );

	};
	
	this.update = function ( progress, delta, time ) {
		
		if ( isNaN(delta) || delta > 1000 || delta == 0 ) {

			delta = 1000 / 60;

		}

		THREE.AnimationHandler.update( delta );

		// slight camera roll

		if ( camera.animationParent ) {

			camera.animationParent.rotation.z = camera.target.position.x / 300;

		}

		// slightly bumpy camera, since we're on a train // this feels like a horse or something... // lol ;)
		// camera.animationParent.position.y += Math.sin( time / 100 ) * 0.2;
		camera.animationParent.position.y += (Math.random()-0.5)*0.3;


		// make it darker towards the end
		/*var a =  Math.min(1, 1.2-(camera.animationParent.position.x/14000) );
		world.scene.lights[1].color.setRGB(a,a,a);
		world.scene.lights[2].color.setRGB(a,a,a);*/

		world.update( delta, camera, false );
		soup.update( delta );

		renderer.render( world.scene, camera, renderTarget );

		shared.logger.log( "vertices: " + renderer.data.vertices );
		shared.logger.log( 'faces: ' + renderer.data.faces );
		shared.logger.log( 'draw calls: ' + renderer.data.drawCalls );

	};

};

Prairie.prototype = new SequencerItem();
Prairie.prototype.constructor = Prairie;

var Dunes = function ( shared ) {

	var that = this;

	SequencerItem.call( this );

	// signals
	
	shared.signals.initscenes.add( initScene );

	var CAMERA_LOWEST_Y = 10;
	var CAMERA_LOWEST_Y_NULL_ATTENUATION = 200;
	var CAMERA_HIGHEST_Y = 4500;
	var CAMERA_FORWARD_SPEED = 10;
	var CAMERA_FORWARD_SPEED_MAX = 20;
	var CAMERA_FORWARD_SPEED_MAX_Y = 3000;
	var CAMERA_VERTICAL_FACTOR = 20;
	var CAMERA_VERTICAL_LIMIT = 50;
	var CAMERA_HORIZONTAL_FACTOR = 15;
	var CAMERA_INERTIA = 0.02;
	var CAMERA_ROLL_FACTOR = 0.4;
	var CAMERA_COLLISION_SLOWDOWN_DISTANCE = 50;
	var CAMERA_COLLISION_DISTANCE = 200;			// if this+slowdown > 280 there's a collision with a mysterious box collider
	var CAMERA_COLLISION_DISTANCE_SIDES = 40;
	var CAMERA_COLLISION_DISTANCE_DOWN = 50;
	var CAMERA_COLLISION_DISTANCE_UP = 40;
	var CAMERA_TARGET_ADJUSTMENT_FACTOR = 15;
	var CAMERA_LIFT_SPEED = 6;
	var CAMERA_START_LIFT = 0.29;
	var CAMERA_END_LIFT = 0.375;
	var CAMERA_DOWN_COLLISION_OFFSET = 100;

	// private variables
	
	var wantedCamera;
	var wantedCameraTarget;
	var wantedCameraDirection = new THREE.Vector3();
	var wantedCameraSpeedFactor = { forward: 1, left: 1, right: 1, up: 1, down: 1 };
	var cameraSpeedFactor = 0;
	var cameraCollisionSwitcher = 0;
	var camera, world, soup;
	var renderer = shared.renderer; 
	var renderTarget = shared.renderTarget;
	var ray = new THREE.Ray();



	//--- Init ---

	function initScene () {
		
		console.log( "dunes initScene" );
		
		that.update( 0.0009, 49.99, 90375 );

	};

	this.init = function () {

		camera = new THREE.Camera( 50, shared.viewportWidth / shared.viewportHeight, 1, 100000 );
		camera.target.position.set( 0, 0, -100 );

		wantedCamera = new THREE.Object3D();
		wantedCameraTarget = new THREE.Object3D();
		wantedCameraTarget.position.set( 0, 0, -100 );
		
		world = new DunesWorld( shared );
		soup = new DunesSoup( camera, world.scene, shared );
		//soup = new UgcSoup( camera, world.scene, shared );

		world.scene.addChild( camera );
		world.scene.addChild( camera.target );
		world.scene.addChild( wantedCamera );
		world.scene.addChild( wantedCameraTarget );

		shared.worlds.dunes = world;
		shared.sequences.dunes = this;
		
		console.log( "dunes init" );

	};


	//--- show & hide ---

	this.show = function ( progress ) {

		this.resetCamera();
		shared.started.dunes = true;
		
		console.log( "show dunes" );

	};

	this.hide = function () {

	};


	//--- reset camera ---

	this.resetCamera = function() {

		// look at prairie island
		
		wantedCamera.position.set( 0, 50, 0 );
		wantedCameraTarget.position.set( 0, 50, -500 );
		wantedCameraTarget.position.subSelf( wantedCamera.position ).normalize().multiplyScalar( CAMERA_COLLISION_DISTANCE ).addSelf( wantedCamera.position );
		
		camera.position.copy( wantedCamera.position );
		camera.target.position.copy( wantedCameraTarget.position );
		
		renderer.setClearColor( world.scene.fog.color );

	};
	

	//--- update ---

	this.update = function ( progress, delta, time ) {

		this.updateCamera( progress, delta, time );

		THREE.AnimationHandler.update( delta );

		world.update( delta, camera, false );
		soup.update( delta );

		renderer.render( world.scene, camera, renderTarget );

	};
	
	
	//--- update camera ---

	this.updateCamera = function( progress, delta, time ) {
		
		delta = delta * ( 1000 / 30 ) / 1000; 
		
		// check collision round-robin (can't afford to do all every frame)

		var minDistance, beginSlowDownDistance, direction;

		switch( cameraCollisionSwitcher ) {
			
			case 0:	
				
				direction = "forward";
				ray.origin.copy( wantedCamera.matrixWorld.getPosition());
				ray.direction.copy( camera.matrixWorld.getColumnZ().negate());
				
				minDistance = CAMERA_COLLISION_DISTANCE;
				beginSlowDownDistance = CAMERA_COLLISION_SLOWDOWN_DISTANCE;
				break;
			
			case 1:
				
				direction = "left";
				ray.origin.copy( wantedCamera.matrixWorld.getPosition());
				ray.direction.copy( camera.matrixWorld.getColumnX().negate());
				
				minDistance = CAMERA_COLLISION_DISTANCE_SIDES;
				beginSlowDownDistance = CAMERA_COLLISION_SLOWDOWN_DISTANCE;
				break;
			
			case 2:	
				
				direction = "right";
				ray.origin.copy( wantedCamera.matrixWorld.getPosition());
				ray.direction.copy( camera.matrixWorld.getColumnX());
				
				minDistance = CAMERA_COLLISION_DISTANCE_SIDES;
				beginSlowDownDistance = CAMERA_COLLISION_SLOWDOWN_DISTANCE;
				break;
			
			case 3:	
				
				direction = "down";
				ray.origin.copy( wantedCamera.matrixWorld.getPosition()).y += CAMERA_DOWN_COLLISION_OFFSET;
				ray.direction.copy( camera.matrixWorld.getColumnY().negate());
				
				minDistance = CAMERA_COLLISION_DISTANCE_DOWN;
				beginSlowDownDistance = CAMERA_COLLISION_SLOWDOWN_DISTANCE;
				break;
			
			case 4:
				
				direction = "up";
				ray.origin.copy( wantedCamera.matrixWorld.getPosition());
				ray.direction.copy( camera.matrixWorld.getColumnY());

				minDistance = CAMERA_COLLISION_DISTANCE_UP;
				beginSlowDownDistance = CAMERA_COLLISION_SLOWDOWN_DISTANCE;
				break;
			
		}


		cameraCollisionSwitcher++;
		
		if( cameraCollisionSwitcher > 4 ) {
			
			cameraCollisionSwitcher = 0;
			
		}


		// raycast and modulate camera speed factor

		wantedCameraSpeedFactor[ direction ] = 1;


		var c = world.scene.collisions.rayCastNearest( ray );
		var recalculatedDistance = -1;

		if( c && c.distance !== -1 ) {
			
			recalculatedDistance = c.distance * 0.1;
			
			if( direction !== "down" ) {
				
				if( recalculatedDistance < minDistance + beginSlowDownDistance ) {
					
					if( recalculatedDistance < minDistance ) {
						
						wantedCameraSpeedFactor[ direction ] = 0;
						
					} else {
						
						wantedCameraSpeedFactor[ direction ] = 1 - ( recalculatedDistance - minDistance ) / beginSlowDownDistance;
						
					}
					
				}
				
			}

		}


		// get mouse
		
		var mouseX = shared.mouse.x / shared.screenWidth - 0.5;
		var mouseY = shared.mouse.y / shared.screenHeight - 0.5;


		// special case if collision isn't forward (adjust target and bump up factor so you don't stop)

		if( direction !== "forward" && wantedCameraSpeedFactor[ direction ] < 1 ) {
			
			var adjust = new THREE.Vector3();
			adjust.copy( ray.direction ).negate().multiplyScalar(( 1 - wantedCameraSpeedFactor[ direction ] ) * CAMERA_TARGET_ADJUSTMENT_FACTOR );
			
			if( direction === "left" || direction === "right" ) {
				
				adjust.y = 0;
				
			} else {
				
				adjust.x = 0;
				adjust.z = 0;
				
			}
			
			wantedCameraTarget.position.addSelf( adjust );
			wantedCameraSpeedFactor[ direction ] = Math.max( wantedCameraSpeedFactor[ direction ], 0.3 );

			mouseX *= 0.1;
			mouseY *= 0.1;
		}


		// special case if collision is with ground (no speed attenuation)

		if( direction === "down" && recalculatedDistance < CAMERA_COLLISION_DISTANCE_DOWN ) {
			
			var oldY = wantedCamera.position.y;
			
			wantedCamera.position.y = ray.origin.addSelf( ray.direction.multiplyScalar( recalculatedDistance )).y + CAMERA_LOWEST_Y;
			wantedCameraTarget.position.y += ( wantedCamera.position.y - oldY );
			
		} else if( ray.origin.addSelf( ray.direction.multiplyScalar( recalculatedDistance )).y < CAMERA_LOWEST_Y_NULL_ATTENUATION ) {
			
			wantedCameraSpeedFactor[ direction ] = 1;
			
		}


		// calculate sum of all factors 

		var cameraSpeedFactor = wantedCameraSpeedFactor.forward *
							    wantedCameraSpeedFactor.up *
								wantedCameraSpeedFactor.down *
								wantedCameraSpeedFactor.right *
								wantedCameraSpeedFactor.left;



		// handle up/down (cap lowest, highest)

		if( Math.abs( wantedCameraTarget.position.y - wantedCamera.position.y ) < CAMERA_VERTICAL_LIMIT ) {
			
			wantedCameraTarget.position.y -= mouseY * CAMERA_VERTICAL_FACTOR;
			
		}

		wantedCameraTarget.position.y  = Math.max( wantedCameraTarget.position.y, CAMERA_LOWEST_Y );
		wantedCameraTarget.position.y  = Math.min( wantedCameraTarget.position.y, CAMERA_HIGHEST_Y );


		// handle left/right		

		wantedCameraDirection.sub( wantedCameraTarget.position, wantedCamera.position ).normalize();

		wantedCameraTarget.position.x = wantedCamera.position.x + wantedCameraDirection.x * CAMERA_COLLISION_DISTANCE - wantedCameraDirection.z * CAMERA_HORIZONTAL_FACTOR * mouseX * delta;
		wantedCameraTarget.position.z = wantedCamera.position.z + wantedCameraDirection.z * CAMERA_COLLISION_DISTANCE + wantedCameraDirection.x * CAMERA_HORIZONTAL_FACTOR * mouseX * delta;


		// handle walk
		
		if( progress < CAMERA_START_LIFT ) {
			
			cameraSpeed = CAMERA_FORWARD_SPEED * 0.3;
			shared.cameraSlowDown = true;
			wantedCameraDirection.y = 0;
			wantedCameraDirection.normalize();
			wantedCameraTarget.position.y = wantedCamera.position.y;
			
		} else {
			
			cameraSpeed = CAMERA_FORWARD_SPEED;
			
		}


		// calc camera speed (dependent on hight)
		
		if( !shared.cameraSlowDown )  {
			
			var cameraHightFactor = ( Math.min( Math.max( wantedCamera.position.y, CAMERA_LOWEST_Y ), CAMERA_FORWARD_SPEED_MAX_Y ) - CAMERA_LOWEST_Y ) / ( CAMERA_FORWARD_SPEED_MAX_Y - CAMERA_LOWEST_Y );
			cameraSpeed += ( CAMERA_FORWARD_SPEED_MAX - CAMERA_FORWARD_SPEED ) * cameraHightFactor;
			
		}
		

		// move forward

		wantedCamera.position.addSelf( wantedCameraDirection.multiplyScalar( cameraSpeed * cameraSpeedFactor * delta ));


		// lift off

		if( progress > CAMERA_START_LIFT && progress < CAMERA_END_LIFT ) {

			wantedCamera.position.y += CAMERA_LIFT_SPEED * delta;
			wantedCameraTarget.position.y += CAMERA_LIFT_SPEED * delta * 0.9;
	
		}


		// cap height

		wantedCamera.position.y = Math.max( wantedCamera.position.y, CAMERA_LOWEST_Y );
		wantedCamera.position.y = Math.min( wantedCamera.position.y, CAMERA_HIGHEST_Y );



		// position intertia

		camera.position.x += ( wantedCamera.position.x - camera.position.x ) * CAMERA_INERTIA * delta;
		camera.position.y += ( wantedCamera.position.y - camera.position.y ) * CAMERA_INERTIA * delta;
		camera.position.z += ( wantedCamera.position.z - camera.position.z ) * CAMERA_INERTIA * delta;

		camera.target.position.x += ( wantedCameraTarget.position.x - camera.target.position.x ) * CAMERA_INERTIA * delta;
		camera.target.position.y += ( wantedCameraTarget.position.y - camera.target.position.y ) * CAMERA_INERTIA * delta;
		camera.target.position.z += ( wantedCameraTarget.position.z - camera.target.position.z ) * CAMERA_INERTIA * delta;
		
		
		// roll
		
		var currentCameraZ = camera.matrixWorld.getColumnZ();
		
		wantedCameraDirection.normalize();
		wantedCameraDirection.y = currentCameraZ.y;
		wantedCameraDirection.subSelf( currentCameraZ ).normalize();
		wantedCameraDirection.multiplyScalar( CAMERA_ROLL_FACTOR * delta );
		
		wantedCamera.up.set( 0, 1, 0 );
		wantedCamera.up.subSelf( wantedCameraDirection ).normalize();
		
		camera.up.x += ( wantedCamera.up.x - camera.up.x ) * CAMERA_INERTIA;
		camera.up.y += ( wantedCamera.up.y - camera.up.y ) * CAMERA_INERTIA;
		camera.up.z += ( wantedCamera.up.z - camera.up.z ) * CAMERA_INERTIA;

	}

};

Dunes.prototype = new SequencerItem();
Dunes.prototype.constructor = Dunes;

var Section = function () {};

Section.prototype = {

	load: function () {},
	show: function () {},
	hide: function () {},
	resize: function ( width, height ) {},
	update: function () {},

	getDomElement: function () {}

}

var LauncherSection = function ( shared ) {

	Section.call( this );

	var domElement,
	canvas, context, gradient,
	clouds, title, buttonEnter, buttonStart,
	buttonEnterImg,
	loading, footer, footNav;

	domElement = document.createElement( 'div' );
	domElement.style.width = window.innerWidth + 'px';
	domElement.style.height = window.innerHeight + 'px';
	domElement.style.backgroundColor = '#4584b4';
	domElement.style.textAlign = 'center';

	var isLoading = false;
	
	this.load = function () {

		// Background

		canvas = document.createElement( 'canvas' );
		canvas.width = 32;
		canvas.height = window.innerHeight;

		context = canvas.getContext( '2d' );

		gradient = context.createLinearGradient( 0, 0, 0, canvas.height );
		gradient.addColorStop( 0, "#0e223a" );
		gradient.addColorStop( 0.5, "#4584b4" );

		context.fillStyle = gradient;
		context.fillRect( 0, 0, canvas.width, canvas.height );

		domElement.style.backgroundImage = 'url(' + canvas.toDataURL('image/png') + ')';
		domElement.style.backgroundRepeat = 'repeat-x';

		// Clouds

		clouds = new Clouds( shared );
		clouds.getDomElement().style.position = 'absolute';
		clouds.getDomElement().style.left = "0px";
		clouds.getDomElement().style.top = "0px";
		clouds.getDomElement().style.width = window.innerWidth+"px";
		clouds.getDomElement().style.height = window.innerHeight+"px";
		domElement.appendChild( clouds.getDomElement() );

		// UI

		title = document.createElement( 'div' );
		title.style.position = 'absolute';
		title.innerHTML = '<img src="files/logo_heart.png">';
		domElement.appendChild( title );

		function createRolloverButton( margin, imgIdle, imgRoll ) {
			
			var button = document.createElement( 'div' );
			button.style.position = 'absolute';
			button.style.cursor = 'pointer';
			button.style.margin = margin;
			
			var buttonImg = document.createElement( 'img' );
			buttonImg.src = imgIdle;
			
			button.appendChild( buttonImg );

			button.addEventListener( 'mouseout', function () {

				buttonImg.src = imgIdle;

			}, false );

			button.addEventListener( 'mouseover', function () {

				buttonImg.src = imgRoll;

			}, false );
			
			return button;
			
		};
		
		buttonEnter = createRolloverButton( "10px 0 0 85px", "files/enter_idle.png", "files/enter_rollover.png" );
		buttonEnter.addEventListener( 'click', function () {

			loading.getDomElement().style.display = 'block';
			buttonEnter.style.display = 'none';

			isLoading = true;
			
			shared.signals.load.dispatch();

		}, false );
		domElement.appendChild( buttonEnter );

		buttonStart = createRolloverButton( "10px 0 0 85px", "files/start_idle.png", "files/start_rollover.png" );
		buttonStart.style.display = 'none';
		buttonStart.addEventListener( 'click', function () {

			shared.signals.showfilm.dispatch();

			// Start in 1 second.

			setTimeout( function () {

				shared.signals.startfilm.dispatch( 0, 1 );

			}, 1000 );
			
		}, false );
		domElement.appendChild( buttonStart );
		
		loading = new LoadingBar( function () {
			
			loading.getDomElement().style.display = 'none';
			buttonStart.style.display = 'block';
			
			isLoading = false;
			
			shared.signals.initscenes.dispatch();

		} );

		loading.getDomElement().style.position = 'absolute';
		loading.getDomElement().style.display = 'none';

		domElement.appendChild( loading.getDomElement() );

		shared.signals.loadItemAdded.add( loading.addItem );
		shared.signals.loadItemCompleted.add( loading.completeItem );

		// Implemented Footer.js
		footer = document.createElement( 'div' );
		footer.style.position = 'absolute';
		footer.style.left = '0';
		footer.style.bottom = '0';
		footer.style.width = "100%";
		footNav = new Footer( footer );
		domElement.appendChild( footer );

	}

	this.show = function () {

		clouds.show();
		domElement.style.display = 'block';

	};

	this.resize = function ( width, height ) {

		clouds.resize( width, height );

		title.style.top = '60px';
		title.style.left = ( window.innerWidth - 358 ) / 2 + 'px';

		buttonEnter.style.top = buttonStart.style.top = '210px';
		buttonEnter.style.left = buttonStart.style.left = ( window.innerWidth - 358 ) / 2 + 'px';

		loading.getDomElement().style.top = '215px';
		loading.getDomElement().style.left = ( window.innerWidth - 300 ) / 2 + 'px';

		domElement.style.width = width + 'px';
		domElement.style.height = height + 'px';

	};

	this.hide = function () {

		clouds.hide();
		domElement.style.display = 'none';

	};

	this.update = function () {

		if ( ! isLoading ) {
		
			clouds.update();
			
		}

	};

	this.getDomElement = function () {

		return domElement;

	};

};

LauncherSection.prototype = new Section();
LauncherSection.prototype.constructor = LauncherSection;

var FilmSection = function ( shared ) {

	Section.call( this );

	var domElement, audio, tune, playing = false,
	sequencer, renderer, renderTarget;

	// init

	domElement = document.createElement( 'div' );
	domElement.style.display = 'none';

	// audio

	audio = document.createElement( 'audio' );
	audio.preload = true;
	domElement.appendChild( audio );

	source = document.createElement( 'source' );
	source.src = "files/Black.ogg";
	audio.appendChild( source );

	tune = new Tune( audio );
	tune.setBPM( 85 );
	tune.setRows( 4 );

	// renderer

	shared.baseWidth = 1024;
	shared.baseHeight = 436;
	shared.viewportWidth = shared.baseWidth * ( window.innerWidth / shared.baseWidth );
	shared.viewportHeight = shared.baseHeight * ( window.innerWidth / shared.baseWidth );

	renderer = new THREE.WebGLRenderer();
	renderer.domElement.style.position = 'absolute';
	renderer.setSize( shared.viewportWidth, shared.baseHeight );
	renderer.sortObjects = false;
	renderer.autoClear = false;

	renderTarget = new THREE.WebGLRenderTarget( shared.viewportWidth, shared.baseHeight );
	renderTarget.minFilter = THREE.LinearFilter;
	renderTarget.magFilter = THREE.LinearFilter;

	shared.renderer = renderer;
	shared.renderTarget = renderTarget;

	// signals

	shared.signals.startfilm.add( start );
	shared.signals.stopfilm.add( stop );

	// effects

	var overlayTexture = THREE.ImageUtils.loadTexture( "files/textures/fingerprints.png" );
	
	
	// Sequence
	var intro = new VideoPlayer( shared, VideoShots.introLayers, VideoShots.confStill );

	var s01_01 = new VideoPlayer( shared, VideoShots.s01_01, VideoShots.confStill );
	var s01_03 = new VideoPlayer( shared, VideoShots.s01_03, VideoShots.confParalax );
	var s01_06 = new VideoPlayer( shared, VideoShots.s01_06, VideoShots.confStill );
	var s01_09 = new VideoPlayer( shared, VideoShots.s01_09, VideoShots.confParalax );
	
	var s02_01 = new VideoPlayer( shared, VideoShots.s02_01, VideoShots.confParalax );
	var s02_02 = new VideoPlayer( shared, VideoShots.s02_02, VideoShots.confStill );
	var s02_03 = new VideoPlayer( shared, VideoShots.s02_03, VideoShots.confStill );
	var s02_04 = new VideoPlayer( shared, VideoShots.s02_04, VideoShots.confStill );
	var s02_06 = new VideoPlayer( shared, VideoShots.s02_06, VideoShots.confStill );
	
	var dunesAnimation = new VideoPlayer( shared, VideoShots.dunesLayers, VideoShots.confStill );

	sequencer = new Sequencer();

	sequencer.add( new ClearEffect( shared ), tune.getPatternMS( 0 ), tune.getPatternMS( 73.25 ), 0 );
	
	sequencer.add( intro, tune.getPatternMS( 0 ), tune.getPatternMS( 8 ), 1 );
	//sequencer.add( intro2, tune.getPatternMS( 0 ), tune.getPatternMS( 8 ), 1 );
	//sequencer.add( intro3, tune.getPatternMS( 0 ), tune.getPatternMS( 8 ), 1 );
	//sequencer.add( intro3, tune.getPatternMS( 0 ), tune.getPatternMS( 8 ), 1 );
	//sequencer.add( prairieParalax, tune.getPatternMS( 0 ), tune.getPatternMS( 8 ), 1 );
	//sequencer.add( new PaintEffect( shared ), tune.getPatternMS( 0 ), tune.getPatternMS( 8 ), 4 );

	var s01start = tune.getPatternMS( 8 );
	var s01end = tune.getPatternMS( 16 );
	
	sequencer.add( s01_01, s01start, s01start + s01_01.duration, 1 );
	s01start += s01_01.duration;
	
	sequencer.add( s01_03, s01start, s01start + s01_03.duration, 1 );
	s01start += s01_03.duration;
	
	sequencer.add( s01_06, s01start, s01start + s01_06.duration, 1 );
	s01start += s01_06.duration;
	
	sequencer.add( s01_09, s01start, s01end, 5 ); // must be rendered after city
	
	var cityStart = tune.getPatternMS( 16 ) - 3000;
	
	sequencer.add( new City( shared ), cityStart, tune.getPatternMS( 24 ), 1 );
	sequencer.add( new PaintEffect( shared ), cityStart, tune.getPatternMS( 24 ), 4 );
	//sequencer.add( new PaintEffectDunes( shared ), cityStart, tune.getPatternMS( 24 ), 4 );

	//sequencer.add( new NoiseEffect( shared, 0.16, 0.0, 4096 ), tune.getPatternMS( 16 ), tune.getPatternMS( 24 ), 3 );
	//sequencer.add( new HeatEffect( shared ), tune.getPatternMS( 16 ), tune.getPatternMS( 24 ), 4 );
	//sequencer.add( new PaintDarkEffect( shared ), tune.getPatternMS( 16 ), tune.getPatternMS( 24 ), 4 );
	//sequencer.add( new OverlayEffect( shared, overlayTexture ), tune.getPatternMS( 16 ), tune.getPatternMS( 24 ), 4 );

	var s02start = tune.getPatternMS( 24 );
	var s02end = tune.getPatternMS( 32 );
	
	sequencer.add( s02_01, s02start, s02start + s02_01.duration, 1 );
	s02start += s02_01.duration;
	
	sequencer.add( s02_02, s02start, s02start + s02_02.duration, 1 );
	s02start += s02_02.duration;
	
	sequencer.add( s02_03, s02start, s02start + s02_03.duration, 1 );
	s02start += s02_03.duration;
	
	sequencer.add( s02_04, s02start, s02start + s02_04.duration, 1 );
	s02start += s02_04.duration;
	
	sequencer.add( s02_06, s02start, s02end, 1 ); // 5);

	// should start at tune.getPatternMS( 32 ) - s02_06.duration
	sequencer.add( new Prairie( shared ), tune.getPatternMS( 32 ), tune.getPatternMS( 40 ), 1 );
	sequencer.add( new PaintEffectPrairie( shared ), tune.getPatternMS( 32 ), tune.getPatternMS( 40 ), 5 );
	//sequencer.add( new PaintEffectDunes( shared ), tune.getPatternMS( 32 ), tune.getPatternMS( 40 ), 5 );

	//sequencer.add( new NoiseEffect( shared, 0.18, 0.0, 4096 ), tune.getPatternMS( 32 ), tune.getPatternMS( 40 ), 3 );
	//sequencer.add( new HeatEffect( shared ), tune.getPatternMS( 32 ), tune.getPatternMS( 40 ), 4 );

	sequencer.add( dunesAnimation, tune.getPatternMS( 40 ), tune.getPatternMS( 48 ), 1 );

	sequencer.add( new Dunes( shared ), tune.getPatternMS( 48 ), tune.getPatternMS( 73.25 ), 1 );
	sequencer.add( new PaintEffectDunes( shared ), tune.getPatternMS( 48 ), tune.getPatternMS( 73.25 ), 4 );
	
	//sequencer.add( new NoiseEffect( shared, 0.094, 0.0, 4096 ), tune.getPatternMS( 48 ), tune.getPatternMS( 73.25 ), 3 );
	//sequencer.add( new HeatEffect( shared ), tune.getPatternMS( 48 ), tune.getPatternMS( 73.25 ), 4 );
	//sequencer.add( new PaintEffect( shared ), tune.getPatternMS( 48 ), tune.getPatternMS( 73.25 ), 4 );

	sequencer.add( new FadeOutEffect( 0x000000, shared ), tune.getPatternMS( 23.5 ), tune.getPatternMS( 24 ), 3 );  // Below painter effect which renders directly to screen
	sequencer.add( new FadeOutEffect( 0x000000, shared ), tune.getPatternMS( 39.5 ), tune.getPatternMS( 40 ), 3 );  // Below painter effect which renders directly to screen

	sequencer.add( new FadeOutEffect( 0x000000, shared ), tune.getPatternMS( 72 ), tune.getPatternMS( 73.25 ), 5 );

	sequencer.add( new PointerEffect( shared, false ), tune.getPatternMS( 0 ), tune.getPatternMS( 8 ), 1 );
	sequencer.add( new PointerEffect( shared, true ), tune.getPatternMS( 8 ), tune.getPatternMS( 73.25 ), 1 );

	sequencer.add( new RenderEffect( shared ), tune.getPatternMS( 0 ), tune.getPatternMS( 16 ), 6 );
	
	// !!!!!!!!! Here PaintEffect draws directly to frame buffer !!!!!!!!!!!!
	
	sequencer.add( new RenderEffect( shared ), tune.getPatternMS( 24 ), tune.getPatternMS( 32 ), 6 );
	
	// !!!!!!!!! Here PaintEffectPrairie draws directly to frame buffer !!!!!!!!!!!!
	
	sequencer.add( new RenderEffect( shared ), tune.getPatternMS( 40 ), tune.getPatternMS( 48 ), 6 );
	
	// !!!!!!!!! Here PaintEffectDunes draws directly to frame buffer !!!!!!!!!!!!

	//

	function start( pattern, volume ) {

		//console.log( renderer.domElement );

		domElement.appendChild( renderer.domElement );

		playing = true;

		audio.currentTime = tune.getPatternMS( pattern ) / 1000;
		audio.play();
		audio.volume = volume;

	};

	function stop() {

		playing = false;

		audio.pause();

	};

	function onDocumentKeyDown( event ) {

		switch ( event.keyCode ) {

			/* space */
			case 32:

				audio.paused ? audio.play() : audio.pause();
				break;

			case 37:

				audio.currentTime --;
				sequencer.clear();
				break;

			case 39:

				audio.currentTime ++;
				sequencer.clear();
				break;

			case 38:

				audio.playbackRate += 0.1;
				break;

			case 40:

				audio.playbackRate -= 0.1;
				break;

			/* m */
			case 77:

				audio.volume = audio.volume ? 0 : 1;
				break;

		}

	};

	this.getDomElement = function () {

		return domElement;

	};

	this.show = function () {

		domElement.style.display = 'block';

		shared.signals.keydown.add( onDocumentKeyDown );

	};

	this.hide = function () {

		domElement.style.display = 'none';

		shared.signals.keydown.remove( onDocumentKeyDown );

		stop();

	};

	this.resize = function ( width, height ) {

		shared.viewportWidth = shared.baseWidth * ( width / shared.baseWidth );
		shared.viewportHeight = shared.baseHeight * ( width / shared.baseWidth );

		renderer.setSize( shared.viewportWidth, shared.viewportHeight );

		// TODO: Hacky...

		renderTarget.width = shared.viewportWidth;
		renderTarget.height = shared.viewportHeight;
		delete renderTarget.__webglFramebuffer;

		renderer.domElement.style.left = '0px';
		renderer.domElement.style.top = ( ( height - shared.viewportHeight  ) / 2 ) + 'px';

	};

	this.update = function () {

		if ( ! playing ) return;

		if ( audio.currentTime == audio.duration ) {

			shared.signals.showrelauncher.dispatch();
			stop();

			return;

		}

		sequencer.update( audio.currentTime * 1000 );

	};

};

FilmSection.prototype = new Section();
FilmSection.prototype.constructor = FilmSection;

/**
 * @author / http://jonobr1.com/
 * Dependent on js/lib/Gee.js
 *					 Heart.js
 *					 Swell.js
 *					 WonderWall.js
 *					 Clouds.js
 *					 Three.js
 *					 files/eminating-heart.svg
 */

var RelauncherSection = function( shared ) {

	Section.call( this );

	var domElement = document.createElement( "div" );
	domElement.style.width = window.innerWidth + 'px';
	domElement.style.height = window.innerHeight + 'px';
	domElement.style.display = 'none';
	domElement.style.backgroundColor = '#ffffff';
	domElement.setAttribute( "id", "relauncher-section" );

	var navigation = {};
	var footer, footNav;

	// add css styling
	var rule = document.createTextNode( "#relauncher-section div.after-experience { position: absolute; height: 57px; overflow: hidden; cursor: pointer; } #relauncher-section div.after-experience img { display: block; } #relauncher-section div.after-experience:hover img { margin-top: -57px; }" );
	var head = document.getElementsByTagName( 'head' )[ 0 ];
	var style = document.createElement( "style" );
	style.type = "text/css";

	if( style.styleSheet ) {

		style.styleSheet.cssText = rule.nodeValue;

	} else {

		style.appendChild( rule );

	}

	head.appendChild( style );

	var clouds = new Clouds( shared, true );
	clouds.getDomElement().style.position = 'absolute';
	clouds.getDomElement().style.left = "0px";
	clouds.getDomElement().style.top = "0px";
	clouds.getDomElement().style.width = window.innerWidth+"px";
	clouds.getDomElement().style.height = window.innerHeight+"px";
	domElement.appendChild( clouds.getDomElement() );

	var container = document.createElement("div");
	container.setAttribute("id", "container");
	container.setAttribute("style", "position: absolute;");
	domElement.appendChild(container);

	var gee = new GEE({
		fullscreen: true,
		container: container,
		loop: false
	});
	var g = gee.ctx;

	// Implemented Footer.js
	footer = document.createElement( 'div' );
	footer.style.position = 'absolute';
	footer.style.width = "100%";
	footer.style.top = (window.innerHeight - 78) + "px";
	footer.style.left = "0";
	footNav = new Footer( footer );
	domElement.appendChild( footer );

	var core = new WonderWall.Pentagon( gee, gee.width * .5, gee.height * .5, 80 );
	var inner = new WonderWall.Pentagon( gee, gee.width * .5, gee.height * .5, 95 );
	var outer = new WonderWall.Pentagon( gee, gee.width * .5, gee.height * .5, 130, .25 );

	outer.showFill = false;
	outer.insides = true;
	inner.showFill = false;
	outer.setRadius(.19);
	core.setRadius(.12);

	var heart = {

		svg: new Heart (gee, "files/eminating-heart.svg", 0, 0 ),
		point: new WonderWall.Point( gee, gee.width * .5, gee.height * .5 + 6 )

	};
	heart.point.r = .0625;

	// Rome Colors
	var rome = rome || {};
	rome.color = {

		red: "#f15d22",
		black: "#30302e",
		white: "#f4f4ea"

	};

	// Handle dom elements
	navigation = initDomElements( domElement );
	for ( var i = 0; i < navigation.list.length; i++ ) {

		var dom = navigation.list[i];
		dom.addEventListener("mouseover", function(e) {

			var iterator = navigation.list.indexOf(this);
			core.setUpdatePoint(true, iterator);
			inner.setUpdatePoint(true, iterator);
			outer.setUpdatePoint(true, iterator);
			heart.point.updating = true;

		}, false);

		dom.addEventListener("mouseout", function(e) {

			var iterator = navigation.list.indexOf(this);
			core.setUpdatePoint(false, iterator);
			inner.setUpdatePoint(false, iterator);
			outer.setUpdatePoint(false, iterator);
			heart.point.updating = false;

		}, false);

	}

	updateDomElementsPosition();

	gee.draw = function() {

		inner.update();
		var points = inner.getPoints();

		g.clearRect(0, 0, gee.width, gee.height);

		g.globalCompositeOperation = "source-over";

		g.strokeStyle = rome.color.black;
		g.lineWidth = 0.5;
		outer.update().render();

		g.globalCompositeOperation = "destination-out";
		core.update().render();

		g.globalCompositeOperation = "xor";
		g.lineWidth = 24;
		inner.showStroke = true;
		inner.showFill = false;
		inner.render();
		g.globalCompositeOperation = "source-over";

		g.save();
		g.translate(gee.width / 2.0, gee.height / 2.0);
		heart.svg.render();
		g.restore();

	};

	function updateDomElementsPosition() {

		var points = inner.getPoints();
		for (var i = 0; i < points.length; i++) {

			var point = points[i].getOriginPosition();
			// these are the center points of the objects
			var navItem = navigation.list[i];
			var xpos = point.x;
			var ypos = point.y;

			if (i == 0) {
				xpos -= 113;
				ypos -= 162;
			} else if (i == 1) {
				xpos += 137;
				ypos -= 46;
			} else if (i == 2) {
				xpos += 106;
				ypos += 78;
			} else if (i == 3) {
				xpos -= 312;
				ypos += 75;
			} else {
				xpos -= 344;
				ypos -= 46;
			}
			navItem.style.left = xpos + "px";
			navItem.style.top = ypos + "px";

		}

	};

	function createDomElement( parent, element, id, zclass, contents ) {

		var dom = document.createElement( element );
		dom.setAttribute( "id", id );
		dom.setAttribute( "class", zclass );
		dom.innerHTML = contents;
		parent.appendChild( dom );
		return dom;

	};

	function initDomElements(container) {

		var navigation = {};

		var start = createDomElement(container, "div", "start-over", "after-experience", "<img src = 'files/relaunch_section/start_over.png' alt = 'Start Over' />");
		var technology = createDomElement(container, "div", "technology", "after-experience", "<img src = 'files/relaunch_section/technology.png' alt = 'Technology' />");
		var add = createDomElement(container, "div", "add-to-the-dream", "after-experience", "<img src = 'files/relaunch_section/add_dreams.png' alt = 'Add to the Dream' />");
		var otherDreams = createDomElement(container, "div", "explore-other-dreams", "after-experience", "<img src = 'files/relaunch_section/explore_dreams.png' alt = 'Explore Other Dreams' />");
		var explore = createDomElement(container, "div", "continue-to-explore", "after-experience", "<img src = 'files/relaunch_section/continue.png' alt = 'Continue To Explore' />");

		start.addEventListener("click", function(e) {

			e.preventDefault();
			shared.signals.showfilm.dispatch();
			shared.signals.startfilm.dispatch( 0, 1 );

		}, false);

		technology.addEventListener("click", function(e) {

			e.preventDefault();
			window.location = "/tech";

		}, false);

		add.addEventListener("click", function(e) {

			e.preventDefault();
			shared.signals.showugc.dispatch();

		}, false);

		otherDreams.addEventListener("click", function(e) {

			e.preventDefault();
			window.location = "/gallery";

		}, false);

		explore.addEventListener("click", function(e) {

			e.preventDefault();
			shared.signals.showexploration.dispatch();
			shared.signals.startexploration.dispatch( 'dunes' );

		}, false);

		navigation.start = start;
		navigation.technology = technology;
		navigation.add = add;
		navigation.otherDreams = otherDreams;
		navigation.explore = explore;

		navigation.list = [ explore, start, otherDreams, add, technology ];
		init = true;

		return navigation;

	};

	this.show = function() {

		clouds.show();
		updateDomElementsPosition();
		domElement.style.display = 'block';

	};

	this.resize = function( width, height ) {

		domElement.style.width = width + 'px';
		domElement.style.height = height + 'px';

		clouds.resize( width, height );
		footer.style.top = (window.innerHeight - 78) + "px";
		updateDomElementsPosition();

	};

	this.hide = function() {

		clouds.hide();
		domElement.style.display = "none";

	};

	this.getDomElement = function() {

		return domElement;

	};

	this.update = function() {

		clouds.update();
		gee.draw();

	};

};

RelauncherSection.prototype = new Section();
RelauncherSection.prototype.constructor = RelauncherSection;

var ExplorationSection = function ( shared ) {

	Section.call( this );

	var EXPLORE_FREE = true;

	var domElement = document.createElement( 'div' );
	domElement.style.display = 'none';

	var renderer = shared.renderer;
	renderTarget = shared.renderTarget;

	var camera, cameras = {};

	cameras.dunes = new THREE.RollCamera( 50, shared.viewportWidth / shared.viewportHeight, 1, 100000 );
	cameras.dunes.movementSpeed = 200;
	cameras.dunes.lookSpeed = 3;
	cameras.dunes.constrainVertical = [ -0.4, 0.4 ];
	cameras.dunes.autoForward = false;
	cameras.dunes.position.set( 0, 0, 0 );

	cameras.prairie = new THREE.RollCamera( 50, shared.viewportWidth / shared.viewportHeight, 1, 100000 );
	cameras.prairie.movementSpeed = 50;
	cameras.prairie.lookSpeed = 3;
	cameras.prairie.constrainVertical = [ -0.4, 0.4 ];
	cameras.prairie.autoForward = false;
	cameras.prairie.position.set( 0, 0, 0 );

	cameras.city = new THREE.RollCamera( 50, shared.viewportWidth / shared.viewportHeight, 1, 100000 );
	cameras.city.movementSpeed = 100;
	cameras.city.lookSpeed = 3;
	cameras.city.constrainVertical = [ -0.4, 0.4 ];
	cameras.city.autoForward = false;
	cameras.city.position.set( 0, 20, -300 );

	var cameraInitPos = {
		
		city	: new THREE.Vector3( 0, 20, -300 ),
		prairie	: new THREE.Vector3( 0, 0, 0 ),
		dunes	: new THREE.Vector3( 0, 0, 0 )

	};
	
	var sequence, world, scene,
	postEffect, clearEffect, heatEffect, paintEffect, paintEffectPrairie, paintEffectDunes,
	noiseEffect, renderEffect, overlayEffect;

	clearEffect = new ClearEffect( shared );
	clearEffect.init();

	heatEffect = new HeatEffect( shared );
	heatEffect.init();

	paintEffect = new PaintEffect( shared );
	paintEffect.init();

	paintEffectPrairie = new PaintEffectPrairie( shared );
	paintEffectPrairie.init();
	
	paintEffectDunes = new PaintEffectDunes( shared );
	paintEffectDunes.init();

	noiseEffect = new NoiseEffect( shared, 0.15, 0.0, 4096 );
	noiseEffect.init();

	overlayEffect = new OverlayEffect( shared, THREE.ImageUtils.loadTexture( "files/textures/fingerprints.png" ) );
	overlayEffect.init();

	renderEffect = new RenderEffect( shared );
	renderEffect.init();

	var progress = 0, start = 0, lastTime = 0;

	// signals

	shared.signals.startexploration.add( startExplore );
	// shared.signals.windowresized.add( updateViewportSize );

	function startExplore( worldId ) {

		domElement.appendChild( renderer.domElement );

		// updateViewportSize();

		world = shared.worlds[ worldId ];
		sequence = shared.sequences[ worldId ];
		
		scene = world.scene;
		camera = cameras[ worldId ];
		
		if ( worldId == "city" ) {
			
			postEffect = paintEffect;
			//postEffect = paintEffectDunes;
		
		} else if ( worldId == "prairie" ) {

			postEffect = paintEffect;
			
		} else if ( worldId == "dunes" ) {

			postEffect = paintEffectDunes;
			
		} else {
			
			postEffect = renderEffect;

		}
		
		if ( EXPLORE_FREE ) {

			scene.addChild( camera );			
			camera.position.copy( cameraInitPos[ worldId ] );

		} else {
			
			sequence.resetCamera();
			
		}

		// hide soup (if it wasn't yet activated)

		if ( !shared.started[ worldId ] ) {

			THREE.SceneUtils.traverseHierarchy( world.scene, function( node ) { 

				if ( ! ( node instanceof THREE.Mesh  || node instanceof THREE.Scene ) 
					|| ( node.geometry && node.geometry.morphTargets.length > 0 ) ) {

					var name = node.name.toLowerCase();

					if ( ! ( name && name.indexOf( "portal" ) >= 0 ) ) {

						node.visible = false;

					}

				}

			} );

		}

		start = lastTime = new Date().getTime();

	};

	function stop() {

	};

	function updateViewportSize() {

		var scale = window.innerWidth / shared.baseWidth;

		shared.viewportWidth = shared.baseWidth * scale;
		shared.viewportHeight = shared.baseHeight * scale

		renderer.setSize( shared.viewportWidth, shared.viewportHeight );

		// TODO: Hacky...

		renderTarget.width = shared.viewportWidth;
		renderTarget.height = shared.viewportHeight;
		delete renderTarget.__webglFramebuffer;

		renderer.domElement.style.left = '0px';
		renderer.domElement.style.top = ( ( window.innerHeight - shared.viewportHeight  ) / 2 ) + 'px';

	};

	this.getDomElement = function () {

		return domElement;

	};

	this.show = function () {

		domElement.style.display = 'block';

	};

	this.hide = function () {

		domElement.style.display = 'none';

	};

	this.resize = function ( width, height ) {

		// TODO

	};

	this.update = function () {

		// just flying around worlds using new RollCamera
		
		if ( EXPLORE_FREE ) {

			if ( world ) {

				time = new Date().getTime() - start;
				delta = time - lastTime;
				lastTime = time;

				world.update( delta, camera, true );

				clearEffect.update( progress, delta, time );

				renderer.setClearColor( world.scene.fog.color );
				renderer.render( world.scene, camera, renderTarget );

				shared.logger.log( "vertices: " + renderer.data.vertices );
				shared.logger.log( 'faces: ' + renderer.data.faces );

				postEffect.update( progress, delta, time );
			
				//heatEffect.update( progress, delta, time );
				//noiseEffect.update( progress, delta, time );
				//overlayEffect.update( progress, delta, time );
				//renderEffect.update( progress, delta, time );

			}

		// replay sequences

		} else {			
		
			if ( sequence ) {

				time = new Date().getTime() - start;
				delta = time - lastTime;
				lastTime = time;

				clearEffect.update( progress, delta, time );
				sequence.update( progress, delta, time );
				renderEffect.update( progress, delta, time );

			}

		}

	};

};

ExplorationSection.prototype = new Section();
ExplorationSection.prototype.constructor = ExplorationSection;

var UgcSection = function ( shared ) {

	var objectCreator, ui;

	var domElement = document.createElement( 'div' );
	domElement.style.display = 'none';

	this.getDomElement = function () {

		return domElement;

	};

	this.load = function () {

		var Signal = signals.Signal;

		shared.ugcSignals = {};
		shared.ugcSignals.submit = new Signal();

		objectCreator = new UgcObjectCreator( shared );
		domElement.appendChild( objectCreator.getDomElement() );

		ui = new UgcUI( shared );
		ui.getDomElement().style.position = 'absolute';
		ui.getDomElement().style.left = '100px';
		ui.getDomElement().style.top = '100px';
		domElement.appendChild( ui.getDomElement() );

	};

	this.show = function () {

		domElement.style.display = 'block';
		objectCreator.show();

	};

	this.hide = function () {

		domElement.style.display = 'none';
		objectCreator.hide();

	};

	this.resize = function ( width, height ) {

		objectCreator.resize( width, height );

	};

	this.update = function () {

		objectCreator.update();

	};

}

UgcSection.prototype = new Section();
UgcSection.prototype.constructor = UgcSection;

var Clouds = function ( shared, isRelaunch ) {

	/*
	var canvas = document.createElement( 'canvas' );
	canvas.width = 32;
	canvas.height = window.innerHeight;

	var context = canvas.getContext( '2d' );

	var gradient = context.createLinearGradient( 0, 0, 0, canvas.height );
	gradient.addColorStop(0, "#1e4877");
	gradient.addColorStop(0.5, "#4584b4");

	context.fillStyle = gradient;
	context.fillRect(0, 0, canvas.width, canvas.height);

	document.body.style.background = 'url(' + canvas.toDataURL('image/png') + ')';
	*/

	// Clouds

	//////////////////////////////////////////////////////////////////
	// BIRDS                                                        //
	//////////////////////////////////////////////////////////////////
	var boid, bird;
	var birds = [];
	var boids = [];
	var morphObject = [];
	//////////////////////////////////////////////////////////////////

	var mouse = { x: 0, y: 0 }, vector = { x: 0, y: 0, z: 0}, delta, time, oldTime = start_time = new Date().getTime(),
	camera, postCamera, scene, postScene, birdsScene, renderer, birdsGroup, mesh, mesh2, geometry, fog, material, postMaterial, renderTargetClouds, renderTargetFlamingos;
	
	fog = new THREE.Fog( 0x4584b4, - 100, 3000 );
  
	camera = new THREE.Camera( 30, window.innerWidth / window.innerHeight, 1, 3000 );
	camera.position.z = 6000;

	scene = new THREE.Scene();
	birdsScene = new THREE.Scene();
	birdsGroup = new THREE.Object3D();

	geometry = new THREE.Geometry();

	var texture = THREE.ImageUtils.loadTexture( 'files/cloud256.png', null, function () {

		material = new THREE.MeshShaderMaterial( {

			uniforms: {

				"map": { type: "t", value:2, texture: texture },
				"fogColor" : { type: "c", value: fog.color },
				"fogNear" : { type: "f", value: fog.near },
				"fogFar" : { type: "f", value: fog.far }

			},
			vertexShader: [

				"varying vec2 vUv;",

				"void main() {",

					"vUv = uv;",
					"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

				"}"

			].join("\n"),

			fragmentShader: [

				"uniform sampler2D map;",

				"uniform vec3 fogColor;",
				"uniform float fogNear;",
				"uniform float fogFar;",

				"varying vec2 vUv;",

				"void main() {",

					"float depth = gl_FragCoord.z / gl_FragCoord.w;",
					"float fogFactor = smoothstep( fogNear, fogFar, depth );",

					"gl_FragColor = texture2D( map, vUv );",
					"gl_FragColor.w *= pow( gl_FragCoord.z, 20.0 );",
					"gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );",

				"}"

			].join("\n"),

			depthTest: false

		} );

		var plane = new THREE.Mesh( new THREE.Plane( 64, 64 ) );

		for ( var i = 0; i < 4000; i++ ) {

			plane.position.x = Math.random() * 1000 - 500;
			if(isRelaunch) {
				plane.position.y = - Math.random() * Math.random() * 200 + 25;
			} else {
				plane.position.y = - Math.random() * Math.random() * 200 - 15;
			}
			plane.position.z = i;
			plane.rotation.z = Math.random() * Math.PI;
			plane.scale.x = plane.scale.y = Math.random() * Math.random() * 1.5 + 0.5;

			GeometryUtils.merge( geometry, plane );

		}

    mesh = new THREE.Mesh( geometry, material );
    mesh2 = new THREE.Mesh( geometry, material );

    var loader = new THREE.JSONLoader();
    loader.load( { model: "./files/models/soup/birds_B_life.js", callback: makeScene } );

	} );

	texture.magFilter = THREE.LinearMipMapLinearFilter;
	texture.minFilter = THREE.LinearMipMapLinearFilter;

	renderer = new THREE.WebGLRenderer({ antialias: false, clearColor: 0x000000, clearAlpha: 0 });
	renderer.domElement.style.position = 'absolute';
  renderer.domElement.style.left = '0px';
  renderer.domElement.style.top = '0px';

	renderer.sortObjects = false;
	renderer.autoClear = false;
  renderTargetClouds = new THREE.WebGLRenderTarget( window.innerWidth/2, window.innerHeight/2, { minFilter: THREE.NearestFilter, magFilter: THREE.LinearFilter } );
  renderTargetFlamingos = new THREE.WebGLRenderTarget( window.innerWidth*2, window.innerHeight*2, { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter } );

  window.renderTargetClouds = renderTargetClouds;
  postCamera = new THREE.Camera();
  postCamera.projectionMatrix = THREE.Matrix4.makeOrtho( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, -10000, 10000 );
  postScene = new THREE.Scene();

  var postUniforms = {
    "tClouds": { type: "t", value: 0, texture: renderTargetClouds },
    "tFlamingos": { type: "t", value: 1, texture: renderTargetFlamingos },
    "width": { type: "f", value: window.innerWidth },
    "height": { type: "f", value: window.innerHeight },
    "fogColor" : {type: "c", value: fog.color}
  };
  postMaterial = new THREE.MeshShaderMaterial( {
        uniforms: postUniforms,
        vertexShader: [
          "varying vec2 vUv;",

          "void main() {",
              "vUv = vec2( uv.x, 1.0 - uv.y );",
              "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
          "}"

        ].join("\n"),

        fragmentShader: [
          "uniform sampler2D tClouds;",
          "uniform sampler2D tFlamingos;",
          "uniform vec3 fogColor;",
          "uniform float width;",
          "uniform float height;",
          "varying vec2 vUv;",

          "void main() {",
              "vec4 flamingos = vec4(0.);",
              "if (vUv.y > 0.5) {",
                  "flamingos += texture2D( tFlamingos, vUv );",
                  "flamingos += texture2D( tFlamingos, vUv+vec2(1./width,0.) );",
                  "flamingos += texture2D( tFlamingos, vUv+vec2(.0,1./height) );",
                  "flamingos += texture2D( tFlamingos, vUv+vec2(1./width,1./height) );",
                  "flamingos *= 1./4.;",
                  "flamingos.rgb = mix(flamingos.rgb, vec3(fogColor), 0.15*flamingos.a);",
              "}",

              "vec4 clouds = texture2D( tClouds, vUv );",
              "gl_FragColor = mix(flamingos, clouds, clouds.a);",
              "gl_FragColor.rgb *= 1./gl_FragColor.a;",

          "}"

        ].join("\n")
      } );
  postScene.addObject( new THREE.Mesh( new THREE.Plane( window.innerWidth, window.innerHeight ), postMaterial ) );


  function onMouseMove () {
		if(!isRelaunch) {
			mouse.x = ( shared.mouse.x / shared.screenWidth ) * 100 - 50;
			mouse.y = ( shared.mouse.y / shared.screenHeight ) * 100 - 50;
			vector = new THREE.Vector3( shared.mouse.x - shared.screenWidth/2, - shared.mouse.y + shared.screenHeight/2, 0 );
		}
	}

  function makeScene(geometry){

    for ( var i = 0; i < 2; i ++ ) {
      /////Bioids
      boid = boids[ i ] = new Boid();
      boid.position.x = 320;
      boid.position.y = 20 + Math.random() * 10;
      boid.position.z = 200 + Math.random();
      boid.velocity.x = Math.random() * 2 - 1;
      boid.velocity.y = Math.random() * 2 - 1;
      boid.velocity.z = Math.random() * 2 - 1;
      boid.setAvoidWalls( true );
      boid.setWorldSize( 1000, 200, 400 );

      /////Birds
      morphObject[i] = new ROME.Animal( geometry, true );
      morphObject[i].timeOffset = Math.random()*100;
      bird = birds[i] = morphObject[i].mesh;
      bird.phase = Math.floor( Math.random() * 62.8);
      bird.rotation.set( 0, -0.5, 0 );
      bird.updateMatrix();
      bird.update();

      window.morphObject = morphObject[i];

      var nameA = morphObject[i].availableAnimals[ 0 ],
          nameB = morphObject[i].availableAnimals[ 0 ];

      morphObject[i].play( nameA, nameB );

      bird.position = boids[ i ].position;

      bird.doubleSided = false;
      bird.scale.x = bird.scale.y = bird.scale.z = 0.03+0.05*Math.random();
      birdsGroup.addChild( bird );
    }

    //Adding clouds
		mesh.position.z = - 4000;
		scene.addObject( mesh );

    mesh2.position.z = 0;
    scene.addObject( mesh2 );

    birdsScene.addObject( birdsGroup );
//    scene.addObject( birdsGroup );
  }

	this.getDomElement = function () {

		return renderer.domElement;

	};

	this.show = function () {

		shared.signals.mousemoved.add( onMouseMove );

	};

	this.hide = function () {

		shared.signals.mousemoved.remove( onMouseMove );

	};

	this.resize = function ( width, height ) {

		camera.aspect = width / height;
		camera.updateProjectionMatrix();

    renderer.setSize( width, height );

//    renderer.setViewport(0,0,width, height);
    renderer.domElement.style.width = width + 'px';
		renderer.domElement.style.height = height + 'px';

	};

	this.update = function () {

		position = ( ( new Date().getTime() - start_time ) * 0.03 ) % 4000;
    time = new Date().getTime();
    delta = time - oldTime;
    oldTime = time;

		camera.position.x += ( mouse.x - camera.target.position.x ) * 0.01;
		camera.position.y += ( - mouse.y - camera.target.position.y ) * 0.01;
		camera.position.z = - position + 4000;
    birdsGroup.position.z = camera.position.z - 500;
    birdsGroup.position.y = - 50;

		camera.target.position.x =  camera.position.x;
		camera.target.position.y = camera.position.y;
		camera.target.position.z = camera.position.z - 1000;

		renderer.clear();

		renderer.render( scene, camera, renderTargetClouds, true );
    renderer.render( birdsScene, camera, renderTargetFlamingos, true );

  	renderer.render( postScene, postCamera );

//    render.render( scene, camera );

    for ( var i = 0, il = birds.length; i < il; i++ ) {
      boid = boids[ i ];
      
			vector.z = boid.position.z;

			//boid.repulse( vector );

      boid.run( boids );
      bird = birds[ i ];

      bird.rotation.y = (Math.atan2( - boid.velocity.z, boid.velocity.x )+Math.PI/2);
      bird.rotation.z = (Math.asin( boid.velocity.y / boid.velocity.length()));

		  bird.phase = ( bird.phase + ( Math.max( 0, bird.rotation.z ) + 0.1 )  ) % 62.83;

      morphObject[i].update(delta*bird.phase/100);
    }
	};

};

var Boid = function() {

  var vector = new THREE.Vector3(),
  _acceleration, _width = 500, _height = 500, _depth = 200, _goal, _neighborhoodRadius = 3000,
  _maxSpeed = 1, _maxSteerForce = 0.03, _avoidWalls = false;

  this.position = new THREE.Vector3();
  this.velocity = new THREE.Vector3();
  _acceleration = new THREE.Vector3();

  this.setGoal = function ( target ) {

    _goal = target;

  };

  this.setAvoidWalls = function ( value ) {

    _avoidWalls = value;

  };

  this.setWorldSize = function ( width, height, depth ) {

    _width = width;
    _height = height;
    _depth = depth;

  };

  this.run = function ( boids ) {

    if ( _avoidWalls ) {

      vector.set( - _width*15, this.position.y, this.position.z );
      vector = this.avoid( vector );
      vector.multiplyScalar( 5 );
      _acceleration.addSelf( vector );

      vector.set( _width, this.position.y, this.position.z );
      vector = this.avoid( vector );
      vector.multiplyScalar( 5 );
      _acceleration.addSelf( vector );

      vector.set( this.position.x, 0, this.position.z );
      vector = this.avoid( vector );
      vector.multiplyScalar( 5 );
      _acceleration.addSelf( vector );

      vector.set( this.position.x, _height, this.position.z );
      vector = this.avoid( vector );
      vector.multiplyScalar( 5 );
      _acceleration.addSelf( vector );

      vector.set( this.position.x, this.position.y, - _depth );
      vector = this.avoid( vector );
      vector.multiplyScalar( 5 );
      _acceleration.addSelf( vector );

      vector.set( this.position.x, this.position.y, _depth );
      vector = this.avoid( vector );
      vector.multiplyScalar( 5 );
      _acceleration.addSelf( vector );

    }/* else {

      this.checkBounds();

    }
    */

    if ( Math.random() > 0.5 ) {

      this.flock( boids );

    }

    this.move();

  };

  this.flock = function ( boids ) {

    if ( _goal ) {

      _acceleration.addSelf( this.reach( _goal, 0.005 ) );

    }

    _acceleration.addSelf( this.alignment( boids ) );
    _acceleration.addSelf( this.cohesion( boids ) );
    _acceleration.addSelf( this.separation( boids ) );

  };

  this.move = function () {

    this.velocity.addSelf( _acceleration );

    var l = this.velocity.length();

    if ( l > _maxSpeed ) {

      this.velocity.divideScalar( l / _maxSpeed );

    }

    this.position.addSelf( this.velocity );
    _acceleration.set( 0, 0, 0 );

  };

  this.checkBounds = function () {

    if ( this.position.x >   _width ) this.position.x = - _width;
    if ( this.position.x < - _width ) this.position.x =   _width;
    if ( this.position.y >   _height ) this.position.y = - _height;
    if ( this.position.y < - _height ) this.position.y =  _height;
    if ( this.position.z >  _depth ) this.position.z = - _depth;
    if ( this.position.z < - _depth ) this.position.z =  _depth;

  };

  //

  this.avoid = function ( target ) {

    var steer = new THREE.Vector3();

    steer.copy( this.position );
    steer.subSelf( target );

    steer.multiplyScalar( 1 / this.position.distanceToSquared( target ) );

    return steer;

  };

  this.repulse = function ( target ) {

    var distance = this.position.distanceTo( target );

    if ( distance < 150 ) {

      var steer = new THREE.Vector3();

      steer.sub( this.position, target );
      steer.multiplyScalar( 0.5 / distance );

      _acceleration.addSelf( steer );

    }

  };

  this.reach = function ( target, amount ) {

    var steer = new THREE.Vector3();

    steer.sub( target, this.position );
    steer.multiplyScalar( amount );

    return steer;

  };

  this.alignment = function ( boids ) {

    var boid, velSum = new THREE.Vector3(),
    count = 0;

    for ( var i = 0, il = boids.length; i < il; i++ ) {

      if ( Math.random() > 0.6 ) continue;

      boid = boids[ i ];

      distance = boid.position.distanceTo( this.position );

      if ( distance > 0 && distance <= _neighborhoodRadius ) {

        velSum.addSelf( boid.velocity );
        count++;

      }

    }

    if ( count > 0 ) {

      velSum.divideScalar( count );

      var l = velSum.length();

      if ( l > _maxSteerForce ) {

        velSum.divideScalar( l / _maxSteerForce );

      }

    }

    return velSum;

  };

  this.cohesion = function ( boids ) {

    var boid, distance,
    posSum = new THREE.Vector3(),
    steer = new THREE.Vector3(),
    count = 0;

    for ( var i = 0, il = boids.length; i < il; i ++ ) {

      if ( Math.random() > 0.6 ) continue;

      boid = boids[ i ];
      distance = boid.position.distanceTo( this.position );

      if ( distance > 0 && distance <= _neighborhoodRadius ) {

        posSum.addSelf( boid.position );
        count++;

      }

    }

    if ( count > 0 ) {

      posSum.divideScalar( count );

    }

    steer.sub( posSum, this.position );

    var l = steer.length();

    if ( l > _maxSteerForce ) {

      steer.divideScalar( l / _maxSteerForce );

    }

    return steer;

  };

  this.separation = function ( boids ) {

    var boid, distance,
    posSum = new THREE.Vector3(),
    repulse = new THREE.Vector3();

    for ( var i = 0, il = boids.length; i < il; i ++ ) {

      if ( Math.random() > 0.6 ) continue;

      boid = boids[ i ];
      distance = boid.position.distanceTo( this.position );

      if ( distance > 0 && distance <= _neighborhoodRadius ) {

        repulse.sub( this.position, boid.position );
        repulse.normalize();
        repulse.divideScalar( distance );
        posSum.addSelf( repulse );

      }

    }

    return posSum;

  }

};

var UgcUI = function ( shared ) {

	var Button = function ( path ) {

		var PI2 = Math.PI * 2;

		var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		path.setAttribute( 'style', 'fill: white; fill-opacity: 0.5' );

		var d = 'M ' + Math.round( Math.cos( 0 ) * 32 + 32 ) + ',' + Math.round( Math.sin ( 0 ) * 32 + 32 ) + ' ';

		for ( var i = 0, j = 0; i < 6; i ++, j = ( i / 6 ) * PI2 ) {

			d += Math.round( Math.cos( j ) * 32 + 32 ) + ',' + Math.round( Math.sin ( j ) * 32 + 32 ) + ' ';

		}

		d += 'z';

		path.setAttribute( 'd', d );
		path.setAttribute( 'cursor', 'pointer' );

		path.addEventListener( 'mouseover', function () { this.setAttribute( 'style', 'fill: red; fill-opacity: 0.5' ); }, false );
		path.addEventListener( 'mouseout', function () { this.setAttribute( 'style', 'fill: white; fill-opacity: 0.5' ); }, false );

		return path;

	}

	var domElement = document.createElement( 'div' );

	// TODO: Temp implementation

	var button = document.createElement('button');
	button.addEventListener( 'click', function () {

		shared.ugcSignals.submit.dispatch();

	}, false );
	button.innerHTML = 'SAVE';
	domElement.appendChild( button );

	//

	var objectPanel = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	objectPanel.setAttribute( 'viewBox', '0 0 400 200' );
	objectPanel.setAttribute( 'width', 400 );
	objectPanel.setAttribute( 'height', 200 );
	domElement.appendChild( objectPanel );

	// brush
	var button = new Button();
	button.addEventListener( 'click', function () { alert( 'brush' ); }, false );
	objectPanel.appendChild( button );

	// mirror
	var button = new Button();
	button.setAttribute( 'transform', 'translate(0,58)' );
	button.addEventListener( 'click', function () { alert( 'mirror' ); }, false );
	objectPanel.appendChild( button );

	// color
	var button = new Button();
	button.setAttribute( 'transform', 'translate(0,116)' );
	button.addEventListener( 'click', function () { alert( 'color' ); }, false );
	objectPanel.appendChild( button );

	// zoom
	var button = new Button();
	button.setAttribute( 'transform', 'translate(50,29)' );
	button.addEventListener( 'click', function () { alert( 'zoom' ); }, false );
	objectPanel.appendChild( button );

	// view
	var button = new Button();
	button.setAttribute( 'transform', 'translate(50,87)' );
	button.addEventListener( 'click', function () { alert( 'view' ); }, false );
	objectPanel.appendChild( button );

	// smooth
	var button = new Button();
	button.setAttribute( 'transform', 'translate(50,145)' );
	button.addEventListener( 'click', function () { alert( 'smooth' ); }, false );
	objectPanel.appendChild( button );

	// erase
	var button = new Button();
	button.setAttribute( 'transform', 'translate(100,58)' );
	button.addEventListener( 'click', function () { alert( 'erase' ); }, false );
	objectPanel.appendChild( button );

	// size
	var button = new Button();
	button.setAttribute( 'transform', 'translate(100,116)' );
	button.addEventListener( 'click', function () { alert( 'size' ); }, false );
	objectPanel.appendChild( button );


	this.getDomElement = function () {

		return domElement;

	}

}

var UgcObjectCreator = function ( shared ) {

	var that = this;

	var domElement = document.createElement( 'div' );

	var USE_POSTPROCESS = true;
	var ENABLE_LENSFLARES = true;

	var DEG2RAD = Math.PI / 180,
	camera, light1, light2, loader,
	intersects, intersectedFace, intersectedObject,
	isDeleteMode = false, isRotateMode = false,
	isMouseDown = false, radius = 1500, theta = 45, phi = 15;

	camera = new THREE.Camera( 50, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.target.position.y = 200;

	// Background

	that.scene = new THREE.Scene();

	that.scene.fog = new THREE.FogExp2( 0xffffff, 0.000135 );
	that.scene.fog.color.setHSV( 0.576,  0.382,  0.9  );

	//this.scene.fog = new THREE.Fog( 0xffffff, 1000, 10000 );
	//this.scene.fog.color.setHSV( 0.6, 0.1235, 1 );

	light1 = new THREE.DirectionalLight( 0xffeedd, 1.5 );
	light1.position.set( 0.5, 0.75, 1 );
	light1.color.setHSV( 0, 0, 1 );
	that.scene.addLight( light1 );

	light2 = new THREE.DirectionalLight( 0xffeedd, 1.5 );
	light2.position.set( - 0.5, - 0.75, - 1 );
	light2.color.setHSV( 0, 0, 0.306 );
	that.scene.addLight( light2 );

	if ( ENABLE_LENSFLARES ) {

		that.lensFlare = null;
		that.lensFlareRotate = null;

		var flaresPosition = new THREE.Vector3( 0, 0, -7500 );
		var sx = 60, sy = 292;
		initLensFlares( that, flaresPosition, sx, sy );		

	}

	loader = new THREE.JSONLoader();
	loader.load( { model: "files/models/ugc/D_tile_1.D_tile_1.js", callback: function ( geometry ) {

		mesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial() );
		mesh.position.x = 1500;
		mesh.position.y = - 50;
		mesh.rotation.x = - 90 * Math.PI / 180;
		mesh.scale.x = mesh.scale.y = mesh.scale.z = 0.5;

		that.scene.addChild( mesh );

	} } );


	// Renderer

	if ( !shared.renderer ) {

		var renderer = new THREE.WebGLRenderer();
		renderer.domElement.style.position = 'absolute';
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.setClearColor( that.scene.fog.color );
		renderer.sortObjects = false;
		renderer.autoClear = false;

		shared.renderer = renderer;

	}

	// Postprocess

	if ( USE_POSTPROCESS ) {

		var offset = 0;

		shared.baseWidth = 1024;
		shared.baseHeight = 436;
		shared.viewportWidth = shared.baseWidth * ( window.innerWidth / shared.baseWidth );
		shared.viewportHeight = shared.baseHeight * ( window.innerWidth / shared.baseWidth );

		shared.renderer.setSize( shared.viewportWidth, shared.baseHeight );

		if ( !shared.renderTarget ) {

			var renderTarget = new THREE.WebGLRenderTarget( shared.viewportWidth, shared.baseHeight );
			renderTarget.minFilter = THREE.LinearFilter;
			renderTarget.magFilter = THREE.LinearFilter;

			shared.renderTarget = renderTarget;

		}

		var paintEffectDunes = new PaintEffectDunes( shared );
		paintEffectDunes.init();

	}	

	// Painter

	var painter = new VoxelPainter( camera );

	// TODO: Temp implementation

	var ugcHandler = new UgcHandler();

	shared.ugcSignals.submit.add( function () {

		var data = '', grid = painter.getGrid();

		for ( var item in grid ) {

			data += grid[ item ].position.x + ',' + grid[ item ].position.y + ',' + grid[ item ].position.z + ',16777215,';

		}

		data = '[' + data.slice( 0, - 1 ) + ']';

		var thumbnail = renderer.domElement.toDataURL('image/png');

		ugcHandler.submitUGO( 'this is a test', 'test@tes.com', 1, data, thumbnail, function ( json ) {

			console.log( json );

		} );

	} );

	function onMouseDown( event ) {

		painter.setMode( !isDeleteMode ? VoxelPainter.MODE_DRAW : VoxelPainter.MODE_ERASE );

	}

	function onMouseUp( event ) {

		painter.setMode( VoxelPainter.MODE_IDLE );

	}

	function onMouseMove( event ) {

		if ( USE_POSTPROCESS ) {

			painter.moveMouse( shared.mouse.x / shared.viewportWidth, ( shared.mouse.y - offset ) / shared.viewportHeight );

		} else {

			painter.moveMouse( shared.mouse.x / shared.screenWidth, shared.mouse.y / shared.screenHeight );

		}

	}

	function onMouseWheel( event ) {

		radius -= event.wheelDeltaY;

	}

	function onKeyDown( event ) {

		switch ( event.keyCode ) {

			case 16: isRotateMode = true; break;
			case 17: isDeleteMode = true; break;
			// case 18: isDeleteMode = true; break;

		}

	}

	function onKeyUp( event ) {

		switch ( event.keyCode ) {

			case 16: isRotateMode = false; break;
			case 17: isDeleteMode = false; break;
			// case 18: isDeleteMode = false; break;

		}
	}

	//

	this.getDomElement = function () {

		return domElement;

	};

	this.show = function () {

		shared.signals.mousedown.add( onMouseDown );
		shared.signals.mouseup.add( onMouseUp );
		shared.signals.mousemoved.add( onMouseMove );
		shared.signals.mousewheel.add( onMouseWheel );

		shared.signals.keydown.add( onKeyDown );
		shared.signals.keyup.add( onKeyUp );

		domElement.appendChild( shared.renderer.domElement );
		shared.renderer.setClearColor( that.scene.fog.color );

	};

	this.hide = function () {

		shared.signals.mousedown.remove( onMouseDown );
		shared.signals.mouseup.remove( onMouseUp );
		shared.signals.mousemoved.remove( onMouseMove );
		shared.signals.mousewheel.remove( onMouseWheel );

		shared.signals.keydown.remove( onKeyDown );
		shared.signals.keyup.remove( onKeyUp );

	};

	this.resize = function ( width, height ) {

		if ( USE_POSTPROCESS ) {

			camera.aspect = shared.viewportWidth / shared.viewportHeight;
			camera.updateProjectionMatrix();

			shared.viewportWidth = shared.baseWidth * ( width / shared.baseWidth );
			shared.viewportHeight = shared.baseHeight * ( width / shared.baseWidth );

			shared.renderer.setSize( shared.viewportWidth, shared.viewportHeight );

			// TODO: Hacky...

			shared.renderTarget.width = shared.viewportWidth;
			shared.renderTarget.height = shared.viewportHeight;
			delete shared.renderTarget.__webglFramebuffer;

			offset = ( ( height - shared.viewportHeight  ) / 2 );

			shared.renderer.domElement.style.left = '0px';
			shared.renderer.domElement.style.top = offset + 'px';

		} else {

			camera.aspect = width / height;
			camera.updateProjectionMatrix();

			shared.renderer.setSize( width, height );

		}

	};

	this.update = function () {

		if ( isRotateMode ) {

			theta += ( shared.mouse.x / shared.screenWidth ) * 2 - 1;

			phi -= ( shared.mouse.y / shared.screenHeight ) * 2 - 1;
			phi = phi > 90 ? 90 :
						phi < - 90 ? - 90 :
						phi;

		}

		camera.position.x = radius * Math.sin( theta * DEG2RAD ) * Math.cos( phi * DEG2RAD );
		camera.position.y = radius * Math.sin( phi * DEG2RAD );
		camera.position.z = radius * Math.cos( theta * DEG2RAD ) * Math.cos( phi * DEG2RAD );

		painter.update();

		shared.renderer.clear();

		if ( USE_POSTPROCESS ) {

			shared.renderer.render( that.scene, camera, shared.renderTarget, true );
			shared.renderer.render( painter.getScene(), camera, shared.renderTarget );
			paintEffectDunes.update( 0, 0, 0 );

		} else {

			shared.renderer.render( that.scene, camera );
			shared.renderer.render( painter.getScene(), camera );

		}

	};

};

var UgcSoupCreator = function ( shared ) {

	var camera, scene, renderer;

	domElement = document.createElement( 'div' );

	camera = new THREE.Camera( 30, window.innerWidth / window.innerHeight, 1, 3000 );
	camera.position.z = 6000;

	this.getDomElement = function () {

		return renderer.domElement;

	};

	this.show = function () {


	};

	this.hide = function () {



	};

	this.resize = function ( width, height ) {

		camera.aspect = width / height;
		camera.updateProjectionMatrix();

		renderer.setSize( width, height );

	};

	this.update = function () {

		renderer.clear();
		renderer.render( scene, camera );

	};

};

var VoxelPainter = function ( camera ) {

	var _intersectPoint, _intersectFace, _intersectObject;

	// Scene

	var _scene = new THREE.Scene();

	var _light1 = new THREE.DirectionalLight( 0xffeedd, 1.5 );
	_light1.position.set( 0.5, 0.75, 1 );
	_light1.color.setHSV( 0, 0, 1 );
	_scene.addLight( _light1 );

	var _light2 = new THREE.DirectionalLight( 0xffeedd, 1.5 );
	_light2.position.set( - 0.5, - 0.75, - 1 );
	_light2.color.setHSV( 0, 0, 0.306 );
	_scene.addLight( _light2 );

	// Colliders

	var _sceneCollider = new THREE.Scene();
	_scene.addObject( _sceneCollider );

	var _collider = new THREE.Object3D();
	_collider.visible = false;

	var _geometry = new THREE.Plane( 2000, 2000, 16, 16 );
	var _material = new THREE.MeshBasicMaterial( { color: 0x000000, opacity: 0.2, transparent: true, wireframe: true } );

	_plane = new THREE.Mesh( _geometry, _material );
	_plane.doubleSided = true;
	_plane.visible = _collider.visible;
	_collider.addChild( _plane );

	_plane = new THREE.Mesh( _geometry, _material );
	_plane.rotation.y = - 90 * Math.PI / 180;
	_plane.doubleSided = true;
	_plane.visible = _collider.visible;
	_collider.addChild( _plane );

	_collider.matrixAutoUpdate = false;
	_sceneCollider.addObject( _collider );

	// Mouse projection

	var projector, mouse2D, mouse3D, ray;

	projector = new THREE.Projector();

	mouse2D = new THREE.Vector3( 0, 0, 0.5 );
	ray = new THREE.Ray( camera.position, null );

	// Voxels

	var _sceneVoxels = new THREE.Scene();
	_scene.addObject( _sceneVoxels );

	var _ground = new THREE.Mesh( new THREE.Plane( 2000, 2000, 40, 40 ), new THREE.MeshBasicMaterial( { color: 0x000000, opacity: 0.1, transparency: true, wireframe: true } ) );
	_ground.position.x = - 25;
	_ground.position.y = - 25;
	_ground.position.z = - 25;
	_ground.rotation.x = - 90 * Math.PI / 180;
	_sceneVoxels.addObject( _ground );

	var _mode = VoxelPainter.MODE_IDLE, _size = 50, _grid = {};

	var _geometry = new THREE.Cube( _size, _size, _size );
	var _material = new THREE.MeshLambertMaterial( { color: 0xffffff } );

	// Preview

	var _preview = new THREE.Mesh( _geometry, new THREE.MeshLambertMaterial( { color: 0x00ff00, opacity: 0, transparent: true } ) );
	// _preview.doubleSided = true;
	_preview.matrixAutoUpdate = false;
	_scene.addObject( _preview );

	//

	addVoxel( new THREE.Vector3() );

	function toGridScale( value ) {

		return Math.round( value / _size );

	}

	function addVoxel( vector ) {

		var x = toGridScale( vector.x );
		var y = toGridScale( vector.y );
		var z = toGridScale( vector.z );

		if ( _grid[ x + "." + y + "." + z ] == null ) {

			var voxel = new THREE.Mesh( _geometry, _material );
			voxel.position.x = x * _size;
			voxel.position.y = y * _size;
			voxel.position.z = z * _size;
			voxel.matrixAutoUpdate = false;
			voxel.updateMatrix();
			voxel.update();
			_sceneVoxels.addObject( voxel );

			_grid[ x + "." + y + "." + z ] = voxel;

		}

	}

	function removeVoxel( voxel ) {

		var x = toGridScale( voxel.position.x );
		var y = toGridScale( voxel.position.y );
		var z = toGridScale( voxel.position.z );

		_grid[ x + "." + y + "." + z ] = null;

		_sceneVoxels.removeObject( voxel );
		_scene.removeObject( voxel ); // This shouldn't be needed :/

	}

	//

	this.setMode = function ( mode ) {

		_mode = mode;

	};

	this.moveMouse = function ( x, y ) {

		mouse2D.x = x * 2 - 1;
		mouse2D.y = - y * 2 + 1;

		mouse3D = projector.unprojectVector( mouse2D.clone(), camera );
		ray.direction = mouse3D.subSelf( camera.position ).normalize();


	};

	this.update = function () {

		var intersects;

		switch ( _mode ) {

			case VoxelPainter.MODE_IDLE:

				intersects = ray.intersectScene( _sceneVoxels );

				if ( intersects.length > 0 ) {

					_intersectPoint = intersects[ 0 ].point;
					_intersectObject = intersects[ 0 ].object;
					_intersectFace = intersects[ 0 ].face;

					_preview.materials[ 0 ].opacity = 0.5;

					_collider.position.copy( _intersectObject.matrixRotationWorld.multiplyVector3( _intersectFace.centroid.clone() ).addSelf( _intersectObject.position ) );
					_collider.position.addSelf( _intersectObject.matrixRotationWorld.multiplyVector3( _intersectFace.normal.clone() ) );
					_collider.updateMatrix();
					_collider.update();

					_preview.position.copy( _collider.position );
					_preview.position.x = toGridScale( _preview.position.x ) * _size;
					_preview.position.y = toGridScale( _preview.position.y ) * _size;
					_preview.position.z = toGridScale( _preview.position.z ) * _size;
					_preview.updateMatrix();
					_preview.update();

				} else {

					_preview.materials[ 0 ].opacity = 0;

					_intersectObject = null;
					_intersectFace = null;

				}

			break;

			case VoxelPainter.MODE_DRAW:

				_preview.materials[ 0 ].opacity = 0;

				intersects = ray.intersectScene( _sceneCollider );

				if ( _intersectFace && intersects.length > 0 ) {

					var point = intersects[ 0 ].point,
					centroidWorld = _intersectObject.matrixRotationWorld.multiplyVector3( _intersectFace.centroid.clone() ).addSelf( _intersectObject.position ),
					distance = centroidWorld.distanceTo( point ),
					pointInNormal = centroidWorld.addSelf( _intersectObject.matrixRotationWorld.multiplyVector3( _intersectFace.normal.clone() ).multiplyScalar( distance ) );

					addVoxel( pointInNormal );

				}

			break;

			case VoxelPainter.MODE_ERASE:

				intersects = ray.intersectScene( _sceneVoxels );

				if ( intersects.length > 0 && intersects[ 0 ].object != _ground ) {

					removeVoxel( intersects[ 0 ].object );

				}

			break;

		}

	};

	this.getScene = function () {

		return _scene;

	};

	this.getGrid = function () {

		return _grid;

	};

}

VoxelPainter.MODE_IDLE = 'VoxelPainter.MODE_IDLE';
VoxelPainter.MODE_DRAW = 'VoxelPainter.MODE_DRAW';
VoxelPainter.MODE_ERASE = 'VoxelPainter.MODE_ERASE';

// Add EMI content
var emiBuyButtonUrl = 'http://widgets.platform.emi.com/widget/1.0/';
var emiBuyButtonUuids = ["c9e456919b824bdeb2e3a326b122db43"];
var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
document.writeln(unescape("%3Cscript src='" + emiBuyButtonUrl + "js/emi_buy_button.js' type='text/javascript'%3E%3C/script%3E"));

function Footer( container, prefix ) {

	var path = prefix || "files/footer";
	var init = true;
	var emiButton;

	this.id = Footer.multipleInstances;
	var divReplacement = "rome_footer_buy_album-" + this.id;

	this.getDomElement = function() {

		return container;

	};

	window.addEventListener("load", function() {

		if(EMIBuyButton) {
			emiButton = new EMIBuyButton({

				buttonID: "c9e456919b824bdeb2e3a326b122db43",
				buttonImageUrl: path + "/buy_button-trans.png",
				useVendorImages: true

			}).replaceDiv( divReplacement );

			init = false;

		}

		return this;

	}, false);

	// Add html
	var html =  '';
			html += '<div class = "rome-footer">';
			html += '<div class = "shout-out">';
			html += '  <ul>';
			html += '    <li><a href = "http://chromeexperiments.com/"><img src = "' + path + '/chrome-trans.png" alt = "This is a Chrome Experiment" border = "0" /></a></li>';
			html += '    <li class = "divider">&nbsp;</li>';
			html += '    <li><a href = "http://google.com/"><img src = "' + path + '/google-trans.png" alt = "Made With Friends From Google" border = "0" /></a></li>';
			html += '    <li class = "clear">&nbsp;</li>';
			html += '  </ul>';
			html += '</div>';
			html += '';
			html += '<div class = "navigation">';
			html += '  <ul class = "primary">';
			html += '    <li class = "first"><a href = "http://ro.me/tech">Technology</a></li>';
			html += '    <li><a href = "http://ro.me/credits">Credits</a></li>';
			html += '    <li><a href = "http://ro.me/album">Rome Album</a></li>';
			html += '    <li id = "' + divReplacement + '" class = "rome_footer_buy_album">';
			html += '    </li>';
			html += '    <li class = "last">Share</li>';
			html += '    <li class = "last icons"><a href="http://www.facebook.com/sharer.php?u=http://ro.me" target="_blank"><img src = "' + path + '/fb-trans.png" alt = "facebook" border = "0"  /></a></li>';
			html += '    <li class = "last icons"><a href="http://twitter.com/share?text=“ROME”&amp;url=http://ro.me" target="_blank"><img src = "' + path + '/twitter-trans.png" alt = "twitter" border = "0" /></a></li>';
			html += '    <li class = "clear last">&nbsp;</li>';
			html += '  </ul>';
			html += '  <ul class = "secondary">';
			html += '    <li class = "first"><a href = "http://ro.me/terms">Terms</a></li>';
			html += '    <li class = "last"><a href = "http://ro.me/privacy">Privacy</a></li>';
			html += '    <li class = "clear last">&nbsp;</li>';
			html += '  </ul>';
			html += '</div>';
			html += '<div class = "clear">&nbsp;</div>';
			html += '</div>';
			html += '</div>';

	var css = '';
			css += '.rome-footer * {';
			css += '  margin: 0;';
			css += '  padding: 0;';
			css += '}';
			css += '.rome-footer {';
			css += '  font: 500 10px/18px "Futura", Arial, sans-serif;';
			css += '  color: #434343;';
			css += '  text-transform: uppercase;';
			css += '  letter-spacing: 1px;';
			css += '}';
			css += '.rome-footer .shout-out {';
			css += '  float: left;';
			css += '  margin: 0 0 0 18px;';
			css += '}';
			css += '.rome-footer .navigation {';
			css += '  float: right;';
			css += '  margin: 20px 26px 0 0;';
			css += '  vertical-align: middle;';
			css += '}';
			css += '.rome-footer ul li {';
			css += '  height: 16px;';
			css += '  border-right: 1px solid #a0a0a0;';
			css += '  padding: 0 10px 0 10px;';
			css += '  width: auto;';
			css += '  float: left;';
			css += '  list-style: none;';
			css += '}';
			css += '.rome-footer ul li.last,';
			css += '.rome-footer ul li.last li {';
			css += '  border: none;';
			css += '  padding: 0 0 0 10px;';
			css += '}';
			css += '.rome-footer .shout-out ul li {';
			css += '  margin: 0;';
			css += '  border: 0;';
			css += '}';
			css += '.rome-footer .shout-out li.divider {';
			css += '  margin: 15px 0 15px 15px;';
			css += '  height: 24px;';
			css += '  border-left: 1px solid #a0a0a0;';
			css += '}';
			css += '.rome-footer a img {';
			css += '  border: 0;';
			css += '}';
			css += '.rome-footer .secondary a:link, .rome-footer .secondary a:visited {';
			css += '  color: #777;';
			css += '}';
			css += '.rome-footer a:link, .rome-footer a:visited,';
			css += '.rome-footer .secondary a:hover, .rome-footer .secondary a:active {';
			css += '  color: #434343;';
			css += '  text-decoration: none;';
			css += '}';
			css += '.rome-footer a:hover, .rome-footer a:active {';
			css += '  color: #000;';
			css += '}';
			css += '.emi_buy_button_link {';
			css += '  margin-top: 2px;';
			css += '  height: 8px;';
			css += '  line-height: 8px;';
			css += '  overflow: hidden;';
			css += '}';
			css += '.rome-footer .rome_footer_buy_album img {';
			css += '  display: block;';
			css += '  margin-top: 0;';
			css += '}';
			css += '.rome-footer .rome_footer_buy_album a:hover img {';
			css += '  margin-top: -8px;';
			css += '}';
			css += '.emi_vendor_menu.using_image a:hover img {';
			css += '  margin-top: 0;';
			css += '}';
			css += '.emi_vendor_menu.using_image {';
			css += '  margin-top: -145px;';
			css += '  margin-left: -11px;';
			css += '  padding: 10px;';
			css += '}';
			css += '.emi_vendor_menu.using_image * {';
			css += '  text-transform: none;';
			css += '}';
			css += '.emi_vendor_menu.using_image .emi_vendor_link {';
			css += '  margin-top: 5px;';
			css += '}';
			css += '.rome-footer .secondary {';
			css += '  margin: 10px 0 0 0;';
			css += '  float: right;';
			css += '}';
			css += '.clear {';
			css += '  clear: both;';
			css += '  display: block;';
			css += '  overflow: hidden;';
			css += '  visibility: hidden;';
			css += '  width: 0;';
			css += '  height: 0;';
			css += '}';

	// Handle dom and html content
	container.innerHTML = html;

	// Append stylesheet
	if(Footer.multipleInstances < 1) {

		var rule  = document.createTextNode( css );
		var head  = document.getElementsByTagName( 'head' )[ 0 ];
		var style = document.createElement( 'style' );

		if( style.stylesheet ) {

			style.styleSheet.cssText = rule.nodeValue;

		} else {

			style.appendChild( rule );

		}

		head.appendChild( style );

	}

	Footer.multipleInstances++;
}
Footer.multipleInstances = 0;
var Shortcuts = function ( shared ) {

	var domElement = document.createElement( 'div' );
	domElement.style.position = "absolute";
	domElement.style.left = "0px";
	domElement.style.top = "0px";
	domElement.style.padding = "0.5em";
	domElement.style.fontSize = '10px';
	//domElement.style.display = "none";

	// Launcher

	addLauncherShortcut( 'Launcher' );
	addSeparator();

	// Demo

	addFilmShortcut( 'Intro', 0 );
	addSeparator();

	addFilmShortcut( 'Transition to City', 8 );
	addFilmShortcut( 'City', 16 );
	addSeparator();

	addFilmShortcut( 'Transition to Prairie', 24 );
	addFilmShortcut( 'Prairie', 32 );
	addSeparator();

	addFilmShortcut( 'Transition to Dunes', 40 );
	addFilmShortcut( 'Dunes', 48 );
	addSeparator();

	// Relauncher

	addRelauncherShortcut( 'Relauncher' );
	addSeparator();

	// Exploration

	addExplorationShortcut( 'Explore City', 'city' );
	addExplorationShortcut( 'Explore Prairie', 'prairie' );
	addExplorationShortcut( 'Explore Dunes', 'dunes' );
	addSeparator();

	// Tool

	addUgcShortcut( 'Ugc' );

	function addSeparator() {

		var element = document.createElement( 'span' )
		element.innerHTML = ' ';
		domElement.appendChild( element );

	};

	function addLink( text, callback ) {

		var element = document.createElement( 'span' );
		element.style.cursor = 'pointer';
		element.style.padding = "0.5em";
		element.style.marginRight = "4px";
		element.style.background = "rgba(255,255,255,0.15)";
		element.innerHTML = text;
		element.addEventListener( 'click', callback, false );
		domElement.appendChild( element );

	};

	function addLauncherShortcut( text ) {

		addLink( text, function () {

			shared.signals.showlauncher.dispatch();

		} );

	};

	function addFilmShortcut( text, pattern ) {

		addLink( text, function () {

			shared.signals.showfilm.dispatch();
			shared.signals.startfilm.dispatch( pattern, 1 );

		} );

	};

	function addRelauncherShortcut( text ) {

		addLink( text, function () {

			shared.signals.showrelauncher.dispatch();

		} );

	};

	function addExplorationShortcut( text, worldId ) {

		addLink( text, function () {

			shared.signals.showexploration.dispatch();
			shared.signals.startexploration.dispatch( worldId );

		} );

	};

	function addUgcShortcut( text ) {

		addLink( text, function () {

			shared.signals.showugc.dispatch();

		} );

	};


	this.getDomElement = function () {

		return domElement;

	};

};

( function () {

	var logger, stats, renderer, renderTarget, shared,
	Signal = signals.Signal, currentSection,
	launcher, film, relauncher, exploration, ugc,
	shortcuts;

	// debug

	logger = new Logger();
	logger.domElement.style.position = 'fixed';
	logger.domElement.style.right = '100px';
	logger.domElement.style.top = '0px';
	document.body.appendChild( logger.domElement );

	stats = new Stats();
	stats.domElement.style.position = 'fixed';
	stats.domElement.style.right = '0px';
	stats.domElement.style.top = '0px';
	document.body.appendChild( stats.domElement );

	shared = {

		logger : logger,

		mouse : { x: 0, y: 0 },

		screenWidth: window.innerWidth,
		screenHeight: window.innerHeight,

		signals : {

			mousedown : new Signal(),
			mouseup : new Signal(),
			mousemoved : new Signal(),
			mousewheel : new Signal(),

			keydown : new Signal(),
			keyup : new Signal(),

			windowresized : new Signal(),

			load : new Signal(),

			showlauncher : new Signal(),
			showfilm : new Signal(),
			showrelauncher : new Signal(),
			showexploration : new Signal(),
			showugc : new Signal(),

			loadBegin : new Signal(),
			loadItemAdded : new Signal(),
			loadItemCompleted : new Signal(),

			startfilm : new Signal(),
			stopfilm : new Signal(),

			startexploration: new Signal(),
			
			initscenes: new Signal()

		},

		worlds: {},
		sequences: {},
		started: { "city": false, "prairie": false, "dunes" : false }

	};

	launcher = new LauncherSection( shared );
	document.body.appendChild( launcher.getDomElement() );

	relauncher = new RelauncherSection( shared );
	document.body.appendChild( relauncher.getDomElement() );

	ugc = new UgcSection( shared );
	document.body.appendChild( ugc.getDomElement() );

	shortcuts = new Shortcuts( shared );
	document.body.appendChild( shortcuts.getDomElement() );

	shared.signals.load.add( function () {

		shared.signals.loadBegin.dispatch();

		film = new FilmSection( shared );
		document.body.appendChild( film.getDomElement() );

		exploration = new ExplorationSection( shared );
		document.body.appendChild( exploration.getDomElement() );

		shared.signals.showfilm.add( function () { setSection( film ); } );
		shared.signals.showexploration.add( function () { setSection( exploration ); } );

	} );

	shared.signals.showlauncher.add( function () { setSection( launcher ); } );
	shared.signals.showrelauncher.add( function () { setSection( relauncher ); } );
	shared.signals.showugc.add( function () { setSection( ugc ); } );

	document.addEventListener( 'mousedown', onDocumentMouseDown, false );
	document.addEventListener( 'mouseup', onDocumentMouseUp, false );
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'mousewheel', onDocumentMouseWheel, false );

	document.addEventListener( 'keydown', onDocumentKeyDown, false );
	document.addEventListener( 'keyup', onDocumentKeyUp, false );

	window.addEventListener( 'resize', onWindowResize, false );

	setSection( launcher );
	animate();

	//

	function setSection( section ) {

		if ( currentSection ) currentSection.hide();

		if ( ! section.__loaded ) {

			section.load();
			section.__loaded = true;

		}

		section.resize( window.innerWidth, window.innerHeight );
		section.show();

		currentSection = section;

	}

	function onDocumentMouseDown( event ) {

		shared.signals.mousedown.dispatch( event );

		event.preventDefault();
		event.stopPropagation();

	}

	function onDocumentMouseUp( event ) {

		shared.signals.mouseup.dispatch( event );

		event.preventDefault();
		event.stopPropagation();

	}

	function onDocumentMouseMove( event ) {

		shared.mouse.x = event.clientX;
		shared.mouse.y = event.clientY;

		shared.signals.mousemoved.dispatch( event );

	}

	function onDocumentMouseWheel( event ) {

		shared.signals.mousewheel.dispatch( event );

	}

	function onDocumentKeyDown( event ) {

		shared.signals.keydown.dispatch( event );

	}

	function onDocumentKeyUp( event ) {

		shared.signals.keyup.dispatch( event );

	}

	function onWindowResize( event ) {

		currentSection.resize( window.innerWidth, window.innerHeight );

		shared.screenWidth = window.innerWidth;
		shared.screenHeight = window.innerHeight;

		shared.signals.windowresized.dispatch();

	}

	function animate() {

		requestAnimationFrame( animate );

		logger.clear();
		currentSection.update();
		stats.update();

	}

} )();

