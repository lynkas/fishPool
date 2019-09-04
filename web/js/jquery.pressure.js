// Pressure v2.1.2 | Created By Stuart Yamartino | MIT License | 2015 - 2017
!function(e,t){"function"==typeof define&&define.amd?define(["jquery"],t):"object"==typeof exports?module.exports=t(require("jquery")):e.jQuery__pressure=t(e.jQuery)}(this,function(e){"use strict";function t(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r=function(){function e(e,t){for(var s=0;s<t.length;s++){var n=t[s];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,s,n){return s&&e(t.prototype,s),n&&e(t,n),t}}();if(!e)throw new Error("Pressure jQuery requires jQuery to be loaded.");e.fn.pressure=function(e,t){return p(this,e,t),this},e.pressureConfig=function(e){d.set(e)},e.pressureMap=function(e,t,s,n,i){return f.apply(null,arguments)};var o=function(){function e(t,s,i){n(this,e),this.routeEvents(t,s,i),this.preventSelect(t,i)}return r(e,[{key:"routeEvents",value:function(e,t,s){var n=d.get("only",s);this.adapter=!v||"pointer"!==n&&null!==n?!P||"touch"!==n&&null!==n?!y||"mouse"!==n&&null!==n?new u(e,t).bindUnsupportedEvent():new h(e,t,s).bindEvents():new l(e,t,s).bindEvents():new c(e,t,s).bindEvents()}},{key:"preventSelect",value:function(e,t){d.get("preventSelect",t)&&(e.style.webkitTouchCallout="none",e.style.webkitUserSelect="none",e.style.khtmlUserSelect="none",e.style.MozUserSelect="none",e.style.msUserSelect="none",e.style.userSelect="none")}}]),e}(),u=function(){function e(t,s,i){n(this,e),this.el=t,this.block=s,this.options=i,this.pressed=!1,this.deepPressed=!1,this.nativeSupport=!1,this.runningPolyfill=!1,this.runKey=Math.random()}return r(e,[{key:"setPressed",value:function(e){this.pressed=e}},{key:"setDeepPressed",value:function(e){this.deepPressed=e}},{key:"isPressed",value:function(){return this.pressed}},{key:"isDeepPressed",value:function(){return this.deepPressed}},{key:"add",value:function(e,t){this.el.addEventListener(e,t,!1)}},{key:"runClosure",value:function(e){e in this.block&&this.block[e].apply(this.el,Array.prototype.slice.call(arguments,1))}},{key:"fail",value:function(e,t){d.get("polyfill",this.options)?this.runKey===t&&this.runPolyfill(e):this.runClosure("unsupported",e)}},{key:"bindUnsupportedEvent",value:function(){var e=this;this.add(P?"touchstart":"mousedown",function(t){return e.runClosure("unsupported",t)})}},{key:"_startPress",value:function(e){this.isPressed()===!1&&(this.runningPolyfill=!1,this.setPressed(!0),this.runClosure("start",e))}},{key:"_startDeepPress",value:function(e){this.isPressed()&&this.isDeepPressed()===!1&&(this.setDeepPressed(!0),this.runClosure("startDeepPress",e))}},{key:"_changePress",value:function(e,t){this.nativeSupport=!0,this.runClosure("change",e,t)}},{key:"_endDeepPress",value:function(){this.isPressed()&&this.isDeepPressed()&&(this.setDeepPressed(!1),this.runClosure("endDeepPress"))}},{key:"_endPress",value:function(){this.runningPolyfill===!1?(this.isPressed()&&(this._endDeepPress(),this.setPressed(!1),this.runClosure("end")),this.runKey=Math.random(),this.nativeSupport=!1):this.setPressed(!1)}},{key:"deepPress",value:function(e,t){e>=.5?this._startDeepPress(t):this._endDeepPress()}},{key:"runPolyfill",value:function(e){this.increment=0===d.get("polyfillSpeedUp",this.options)?1:10/d.get("polyfillSpeedUp",this.options),this.decrement=0===d.get("polyfillSpeedDown",this.options)?1:10/d.get("polyfillSpeedDown",this.options),this.setPressed(!0),this.runClosure("start",e),this.runningPolyfill===!1&&this.loopPolyfillForce(0,e)}},{key:"loopPolyfillForce",value:function(e,t){this.nativeSupport===!1&&(this.isPressed()?(this.runningPolyfill=!0,e=e+this.increment>1?1:e+this.increment,this.runClosure("change",e,t),this.deepPress(e,t),setTimeout(this.loopPolyfillForce.bind(this,e,t),10)):(e=e-this.decrement<0?0:e-this.decrement,e<.5&&this.isDeepPressed()&&(this.setDeepPressed(!1),this.runClosure("endDeepPress")),0===e?(this.runningPolyfill=!1,this.setPressed(!0),this._endPress()):(this.runClosure("change",e,t),this.deepPress(e,t),setTimeout(this.loopPolyfillForce.bind(this,e,t),10))))}}]),e}(),h=function(e){function i(e,s,r){return n(this,i),t(this,(i.__proto__||Object.getPrototypeOf(i)).call(this,e,s,r))}return s(i,e),r(i,[{key:"bindEvents",value:function(){this.add("webkitmouseforcewillbegin",this._startPress.bind(this)),this.add("mousedown",this.support.bind(this)),this.add("webkitmouseforcechanged",this.change.bind(this)),this.add("webkitmouseforcedown",this._startDeepPress.bind(this)),this.add("webkitmouseforceup",this._endDeepPress.bind(this)),this.add("mouseleave",this._endPress.bind(this)),this.add("mouseup",this._endPress.bind(this))}},{key:"support",value:function(e){this.isPressed()===!1&&this.fail(e,this.runKey)}},{key:"change",value:function(e){this.isPressed()&&e.webkitForce>0&&this._changePress(this.normalizeForce(e.webkitForce),e)}},{key:"normalizeForce",value:function(e){return this.reachOne(f(e,1,3,0,1))}},{key:"reachOne",value:function(e){return e>.995?1:e}}]),i}(u),l=function(e){function i(e,s,r){return n(this,i),t(this,(i.__proto__||Object.getPrototypeOf(i)).call(this,e,s,r))}return s(i,e),r(i,[{key:"bindEvents",value:function(){g?(this.add("touchforcechange",this.start.bind(this)),this.add("touchstart",this.support.bind(this,0)),this.add("touchend",this._endPress.bind(this))):(this.add("touchstart",this.startLegacy.bind(this)),this.add("touchend",this._endPress.bind(this)))}},{key:"start",value:function(e){e.touches.length>0&&(this._startPress(e),this.touch=this.selectTouch(e),this.touch&&this._changePress(this.touch.force,e))}},{key:"support",value:function(e,t){var s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:this.runKey;this.isPressed()===!1&&(e<=6?(e++,setTimeout(this.support.bind(this,e,t,s),10)):this.fail(t,s))}},{key:"startLegacy",value:function(e){this.initialForce=e.touches[0].force,this.supportLegacy(0,e,this.runKey,this.initialForce)}},{key:"supportLegacy",value:function(e,t,s,n){n!==this.initialForce?(this._startPress(t),this.loopForce(t)):e<=6?(e++,setTimeout(this.supportLegacy.bind(this,e,t,s,n),10)):this.fail(t,s)}},{key:"loopForce",value:function(e){this.isPressed()&&(this.touch=this.selectTouch(e),setTimeout(this.loopForce.bind(this,e),10),this._changePress(this.touch.force,e))}},{key:"selectTouch",value:function(e){if(1===e.touches.length)return this.returnTouch(e.touches[0],e);for(var t=0;t<e.touches.length;t++)if(e.touches[t].target===this.el||this.el.contains(e.touches[t].target))return this.returnTouch(e.touches[t],e)}},{key:"returnTouch",value:function(e,t){return this.deepPress(e.force,t),e}}]),i}(u),c=function(e){function i(e,s,r){return n(this,i),t(this,(i.__proto__||Object.getPrototypeOf(i)).call(this,e,s,r))}return s(i,e),r(i,[{key:"bindEvents",value:function(){this.add("pointerdown",this.support.bind(this)),this.add("pointermove",this.change.bind(this)),this.add("pointerup",this._endPress.bind(this)),this.add("pointerleave",this._endPress.bind(this))}},{key:"support",value:function(e){this.isPressed()===!1&&(0===e.pressure||.5===e.pressure||e.pressure>1?this.fail(e,this.runKey):(this._startPress(e),this._changePress(e.pressure,e)))}},{key:"change",value:function(e){this.isPressed()&&e.pressure>0&&.5!==e.pressure&&(this._changePress(e.pressure,e),this.deepPress(e.pressure,e))}}]),i}(u),d={polyfill:!0,polyfillSpeedUp:1e3,polyfillSpeedDown:0,preventSelect:!0,only:null,get:function(e,t){return t.hasOwnProperty(e)?t[e]:this[e]},set:function(e){for(var t in e)e.hasOwnProperty(t)&&this.hasOwnProperty(t)&&"get"!=t&&"set"!=t&&(this[t]=e[t])}},p=function(e,t){var s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if("string"==typeof e||e instanceof String)for(var n=document.querySelectorAll(e),i=0;i<n.length;i++)new o(n[i],t,s);else if(a(e))new o(e,t,s);else for(var i=0;i<e.length;i++)new o(e[i],t,s)},a=function(e){return"object"===("undefined"==typeof HTMLElement?"undefined":i(HTMLElement))?e instanceof HTMLElement:e&&"object"===(void 0===e?"undefined":i(e))&&null!==e&&1===e.nodeType&&"string"==typeof e.nodeName},f=function(e,t,s,n,i){return(e-t)*(i-n)/(s-t)+n},y=!1,P=!1,v=!1,b=!1,g=!1;if("undefined"!=typeof window){if("undefined"!=typeof Touch)try{(Touch.prototype.hasOwnProperty("force")||"force"in new Touch)&&(b=!0)}catch(e){}P="ontouchstart"in window.document&&b,y="onmousemove"in window.document&&!P,v="onpointermove"in window.document,g="ontouchforcechange"in window.document}});