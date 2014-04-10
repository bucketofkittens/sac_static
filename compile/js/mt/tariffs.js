/*!
 * Draggabilly PACKAGED v1.1.0
 * Make that shiz draggable
 * http://draggabilly.desandro.com
 * MIT license
 */

(function(t){function e(t){return RegExp("(^|\\s+)"+t+"(\\s+|$)")}function n(t,e){var n=i(t,e)?r:o;n(t,e)}var i,o,r;"classList"in document.documentElement?(i=function(t,e){return t.classList.contains(e)},o=function(t,e){t.classList.add(e)},r=function(t,e){t.classList.remove(e)}):(i=function(t,n){return e(n).test(t.className)},o=function(t,e){i(t,e)||(t.className=t.className+" "+e)},r=function(t,n){t.className=t.className.replace(e(n)," ")});var s={hasClass:i,addClass:o,removeClass:r,toggleClass:n,has:i,add:o,remove:r,toggle:n};"function"==typeof define&&define.amd?define("classie/classie",s):t.classie=s})(window),function(){function t(){}function e(t,e){for(var n=t.length;n--;)if(t[n].listener===e)return n;return-1}function n(t){return function(){return this[t].apply(this,arguments)}}var i=t.prototype,o=this,r=o.EventEmitter;i.getListeners=function(t){var e,n,i=this._getEvents();if(t instanceof RegExp){e={};for(n in i)i.hasOwnProperty(n)&&t.test(n)&&(e[n]=i[n])}else e=i[t]||(i[t]=[]);return e},i.flattenListeners=function(t){var e,n=[];for(e=0;t.length>e;e+=1)n.push(t[e].listener);return n},i.getListenersAsObject=function(t){var e,n=this.getListeners(t);return n instanceof Array&&(e={},e[t]=n),e||n},i.addListener=function(t,n){var i,o=this.getListenersAsObject(t),r="object"==typeof n;for(i in o)o.hasOwnProperty(i)&&-1===e(o[i],n)&&o[i].push(r?n:{listener:n,once:!1});return this},i.on=n("addListener"),i.addOnceListener=function(t,e){return this.addListener(t,{listener:e,once:!0})},i.once=n("addOnceListener"),i.defineEvent=function(t){return this.getListeners(t),this},i.defineEvents=function(t){for(var e=0;t.length>e;e+=1)this.defineEvent(t[e]);return this},i.removeListener=function(t,n){var i,o,r=this.getListenersAsObject(t);for(o in r)r.hasOwnProperty(o)&&(i=e(r[o],n),-1!==i&&r[o].splice(i,1));return this},i.off=n("removeListener"),i.addListeners=function(t,e){return this.manipulateListeners(!1,t,e)},i.removeListeners=function(t,e){return this.manipulateListeners(!0,t,e)},i.manipulateListeners=function(t,e,n){var i,o,r=t?this.removeListener:this.addListener,s=t?this.removeListeners:this.addListeners;if("object"!=typeof e||e instanceof RegExp)for(i=n.length;i--;)r.call(this,e,n[i]);else for(i in e)e.hasOwnProperty(i)&&(o=e[i])&&("function"==typeof o?r.call(this,i,o):s.call(this,i,o));return this},i.removeEvent=function(t){var e,n=typeof t,i=this._getEvents();if("string"===n)delete i[t];else if(t instanceof RegExp)for(e in i)i.hasOwnProperty(e)&&t.test(e)&&delete i[e];else delete this._events;return this},i.removeAllListeners=n("removeEvent"),i.emitEvent=function(t,e){var n,i,o,r,s=this.getListenersAsObject(t);for(o in s)if(s.hasOwnProperty(o))for(i=s[o].length;i--;)n=s[o][i],n.once===!0&&this.removeListener(t,n.listener),r=n.listener.apply(this,e||[]),r===this._getOnceReturnValue()&&this.removeListener(t,n.listener);return this},i.trigger=n("emitEvent"),i.emit=function(t){var e=Array.prototype.slice.call(arguments,1);return this.emitEvent(t,e)},i.setOnceReturnValue=function(t){return this._onceReturnValue=t,this},i._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},i._getEvents=function(){return this._events||(this._events={})},t.noConflict=function(){return o.EventEmitter=r,t},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return t}):"object"==typeof module&&module.exports?module.exports=t:this.EventEmitter=t}.call(this),function(t){function e(e){var n=t.event;return n.target=n.target||n.srcElement||e,n}var n=document.documentElement,i=function(){};n.addEventListener?i=function(t,e,n){t.addEventListener(e,n,!1)}:n.attachEvent&&(i=function(t,n,i){t[n+i]=i.handleEvent?function(){var n=e(t);i.handleEvent.call(i,n)}:function(){var n=e(t);i.call(t,n)},t.attachEvent("on"+n,t[n+i])});var o=function(){};n.removeEventListener?o=function(t,e,n){t.removeEventListener(e,n,!1)}:n.detachEvent&&(o=function(t,e,n){t.detachEvent("on"+e,t[e+n]);try{delete t[e+n]}catch(i){t[e+n]=void 0}});var r={bind:i,unbind:o};"function"==typeof define&&define.amd?define("eventie/eventie",r):"object"==typeof exports?module.exports=r:t.eventie=r}(this),function(t){function e(t){if(t){if("string"==typeof i[t])return t;t=t.charAt(0).toUpperCase()+t.slice(1);for(var e,o=0,r=n.length;r>o;o++)if(e=n[o]+t,"string"==typeof i[e])return e}}var n="Webkit Moz ms Ms O".split(" "),i=document.documentElement.style;"function"==typeof define&&define.amd?define("get-style-property/get-style-property",[],function(){return e}):"object"==typeof exports?module.exports=e:t.getStyleProperty=e}(window),function(t){function e(t){var e=parseFloat(t),n=-1===t.indexOf("%")&&!isNaN(e);return n&&e}function n(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0,n=s.length;n>e;e++){var i=s[e];t[i]=0}return t}function i(t){function i(t){if("string"==typeof t&&(t=document.querySelector(t)),t&&"object"==typeof t&&t.nodeType){var i=r(t);if("none"===i.display)return n();var o={};o.width=t.offsetWidth,o.height=t.offsetHeight;for(var d=o.isBorderBox=!(!u||!i[u]||"border-box"!==i[u]),p=0,c=s.length;c>p;p++){var f=s[p],l=i[f];l=a(t,l);var g=parseFloat(l);o[f]=isNaN(g)?0:g}var v=o.paddingLeft+o.paddingRight,m=o.paddingTop+o.paddingBottom,y=o.marginLeft+o.marginRight,E=o.marginTop+o.marginBottom,x=o.borderLeftWidth+o.borderRightWidth,b=o.borderTopWidth+o.borderBottomWidth,L=d&&h,P=e(i.width);P!==!1&&(o.width=P+(L?0:v+x));var S=e(i.height);return S!==!1&&(o.height=S+(L?0:m+b)),o.innerWidth=o.width-(v+x),o.innerHeight=o.height-(m+b),o.outerWidth=o.width+y,o.outerHeight=o.height+E,o}}function a(t,e){if(o||-1===e.indexOf("%"))return e;var n=t.style,i=n.left,r=t.runtimeStyle,s=r&&r.left;return s&&(r.left=t.currentStyle.left),n.left=e,e=n.pixelLeft,n.left=i,s&&(r.left=s),e}var h,u=t("boxSizing");return function(){if(u){var t=document.createElement("div");t.style.width="200px",t.style.padding="1px 2px 3px 4px",t.style.borderStyle="solid",t.style.borderWidth="1px 2px 3px 4px",t.style[u]="border-box";var n=document.body||document.documentElement;n.appendChild(t);var i=r(t);h=200===e(i.width),n.removeChild(t)}}(),i}var o=t.getComputedStyle,r=o?function(t){return o(t,null)}:function(t){return t.currentStyle},s=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"];"function"==typeof define&&define.amd?define("get-size/get-size",["get-style-property/get-style-property"],i):"object"==typeof exports?module.exports=i(require("get-style-property")):t.getSize=i(t.getStyleProperty)}(window),function(t){function e(t,e){for(var n in e)t[n]=e[n];return t}function n(){}function i(i,o,s,u,d){function c(t,n){this.element="string"==typeof t?r.querySelector(t):t,this.options=e({},this.options),e(this.options,n),this._create()}function f(){return!1}function l(t,e){t.x=void 0!==e.pageX?e.pageX:e.clientX,t.y=void 0!==e.pageY?e.pageY:e.clientY}function g(t,e,n){return n=n||"round",e?Math[n](t/e)*e:t}var v=u("transform"),m=!!u("perspective");e(c.prototype,o.prototype),c.prototype.options={},c.prototype._create=function(){this.position={},this._getPosition(),this.startPoint={x:0,y:0},this.dragPoint={x:0,y:0},this.startPosition=e({},this.position);var t=a(this.element);"relative"!==t.position&&"absolute"!==t.position&&(this.element.style.position="relative"),this.enable(),this.setHandles()},c.prototype.setHandles=function(){this.handles=this.options.handle?this.element.querySelectorAll(this.options.handle):[this.element];for(var e=0,n=this.handles.length;n>e;e++){var i=this.handles[e];t.navigator.pointerEnabled?(s.bind(i,"pointerdown",this),i.style.touchAction="none"):t.navigator.msPointerEnabled?(s.bind(i,"MSPointerDown",this),i.style.msTouchAction="none"):(s.bind(i,"mousedown",this),s.bind(i,"touchstart",this),E(i))}};var y="attachEvent"in r.documentElement,E=y?function(t){"IMG"===t.nodeName&&(t.ondragstart=f);for(var e=t.querySelectorAll("img"),n=0,i=e.length;i>n;n++){var o=e[n];o.ondragstart=f}}:n;c.prototype._getPosition=function(){var t=a(this.element),e=parseInt(t.left,10),n=parseInt(t.top,10);this.position.x=isNaN(e)?0:e,this.position.y=isNaN(n)?0:n,this._addTransformPosition(t)},c.prototype._addTransformPosition=function(t){if(v){var e=t[v];if(0===e.indexOf("matrix")){var n=e.split(","),i=0===e.indexOf("matrix3d")?12:4,o=parseInt(n[i],10),r=parseInt(n[i+1],10);this.position.x+=o,this.position.y+=r}}},c.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},c.prototype.getTouch=function(t){for(var e=0,n=t.length;n>e;e++){var i=t[e];if(i.identifier===this.pointerIdentifier)return i}},c.prototype.onmousedown=function(t){var e=t.button;e&&0!==e&&1!==e||this.dragStart(t,t)},c.prototype.ontouchstart=function(t){this.isDragging||this.dragStart(t,t.changedTouches[0])},c.prototype.onMSPointerDown=c.prototype.onpointerdown=function(t){this.isDragging||this.dragStart(t,t)};var x={mousedown:["mousemove","mouseup"],touchstart:["touchmove","touchend","touchcancel"],pointerdown:["pointermove","pointerup","pointercancel"],MSPointerDown:["MSPointerMove","MSPointerUp","MSPointerCancel"]};c.prototype.dragStart=function(e,n){this.isEnabled&&(e.preventDefault?e.preventDefault():e.returnValue=!1,this.pointerIdentifier=void 0!==n.pointerId?n.pointerId:n.identifier,this._getPosition(),this.measureContainment(),l(this.startPoint,n),this.startPosition.x=this.position.x,this.startPosition.y=this.position.y,this.setLeftTop(),this.dragPoint.x=0,this.dragPoint.y=0,this._bindEvents({events:x[e.type],node:e.preventDefault?t:r}),i.add(this.element,"is-dragging"),this.isDragging=!0,this.emitEvent("dragStart",[this,e,n]),this.animate())},c.prototype._bindEvents=function(t){for(var e=0,n=t.events.length;n>e;e++){var i=t.events[e];s.bind(t.node,i,this)}this._boundEvents=t},c.prototype._unbindEvents=function(){var t=this._boundEvents;if(t&&t.events){for(var e=0,n=t.events.length;n>e;e++){var i=t.events[e];s.unbind(t.node,i,this)}delete this._boundEvents}},c.prototype.measureContainment=function(){var t=this.options.containment;if(t){this.size=d(this.element);var e=this.element.getBoundingClientRect(),n=h(t)?t:"string"==typeof t?r.querySelector(t):this.element.parentNode;this.containerSize=d(n);var i=n.getBoundingClientRect();this.relativeStartPosition={x:e.left-i.left,y:e.top-i.top}}},c.prototype.onmousemove=function(t){this.dragMove(t,t)},c.prototype.onMSPointerMove=c.prototype.onpointermove=function(t){t.pointerId===this.pointerIdentifier&&this.dragMove(t,t)},c.prototype.ontouchmove=function(t){var e=this.getTouch(t.changedTouches);e&&this.dragMove(t,e)},c.prototype.dragMove=function(t,e){l(this.dragPoint,e);var n=this.dragPoint.x-this.startPoint.x,i=this.dragPoint.y-this.startPoint.y,o=this.options.grid,r=o&&o[0],s=o&&o[1];n=g(n,r),i=g(i,s),n=this.containDrag("x",n,r),i=this.containDrag("y",i,s),n="y"===this.options.axis?0:n,i="x"===this.options.axis?0:i,this.position.x=this.startPosition.x+n,this.position.y=this.startPosition.y+i,this.dragPoint.x=n,this.dragPoint.y=i,this.emitEvent("dragMove",[this,t,e])},c.prototype.containDrag=function(t,e,n){if(!this.options.containment)return e;var i="x"===t?"width":"height",o=this.relativeStartPosition[t],r=g(-o,n,"ceil"),s=this.containerSize[i]-o-this.size[i];return s=g(s,n,"floor"),Math.min(s,Math.max(r,e))},c.prototype.onmouseup=function(t){this.dragEnd(t,t)},c.prototype.onMSPointerUp=c.prototype.onpointerup=function(t){t.pointerId===this.pointerIdentifier&&this.dragEnd(t,t)},c.prototype.ontouchend=function(t){var e=this.getTouch(t.changedTouches);e&&this.dragEnd(t,e)},c.prototype.dragEnd=function(t,e){this.isDragging=!1,delete this.pointerIdentifier,v&&(this.element.style[v]="",this.setLeftTop()),this._unbindEvents(),i.remove(this.element,"is-dragging"),this.emitEvent("dragEnd",[this,t,e])},c.prototype.onMSPointerCancel=c.prototype.onpointercancel=function(t){t.pointerId===this.pointerIdentifier&&this.dragEnd(t,t)},c.prototype.ontouchcancel=function(t){var e=this.getTouch(t.changedTouches);this.dragEnd(t,e)},c.prototype.animate=function(){if(this.isDragging){this.positionDrag();var t=this;p(function(){t.animate()})}};var b=m?function(t,e){return"translate3d( "+t+"px, "+e+"px, 0)"}:function(t,e){return"translate( "+t+"px, "+e+"px)"};return c.prototype.setLeftTop=function(){this.element.style.left=this.position.x+"px",this.element.style.top=this.position.y+"px"},c.prototype.positionDrag=v?function(){this.element.style[v]=b(this.dragPoint.x,this.dragPoint.y)}:c.prototype.setLeftTop,c.prototype.enable=function(){this.isEnabled=!0},c.prototype.disable=function(){this.isEnabled=!1,this.isDragging&&this.dragEnd()},c}for(var o,r=t.document,s=r.defaultView,a=s&&s.getComputedStyle?function(t){return s.getComputedStyle(t,null)}:function(t){return t.currentStyle},h="object"==typeof HTMLElement?function(t){return t instanceof HTMLElement}:function(t){return t&&"object"==typeof t&&1===t.nodeType&&"string"==typeof t.nodeName},u=0,d="webkit moz ms o".split(" "),p=t.requestAnimationFrame,c=t.cancelAnimationFrame,f=0;d.length>f&&(!p||!c);f++)o=d[f],p=p||t[o+"RequestAnimationFrame"],c=c||t[o+"CancelAnimationFrame"]||t[o+"CancelRequestAnimationFrame"];p&&c||(p=function(e){var n=(new Date).getTime(),i=Math.max(0,16-(n-u)),o=t.setTimeout(function(){e(n+i)},i);return u=n+i,o},c=function(e){t.clearTimeout(e)}),"function"==typeof define&&define.amd?define(["classie/classie","eventEmitter/EventEmitter","eventie/eventie","get-style-property/get-style-property","get-size/get-size"],i):t.Draggabilly=i(t.classie,t.EventEmitter,t.eventie,t.getStyleProperty,t.getSize)}(window);

// Example: w = new SceneInfoWidget(); w.show();

var TariffMainWidget = function(panel, options) {
    this.panel = panel;
    this.options = jQuery.extend({
        id: 'tariff-map',
        container: jQuery('#app', document),
    }, (options || {}));

    this.element = jQuery('<div id="'+this.options.id+'" class="hidden"></div>');
    this.innerElement = jQuery('<div class="widget-obscure"></div>');
    this.element.append(this.innerElement);
    this.element.addClass('widget widget-l');
    jQuery(this.options.container).append(this.element);

    this.init = function() {

    };

    this.create = function() {

    };  

    this.show = function() {
        this.element.removeClass('hidden');
        this.showMap();
    };

    this.hide = function() {
        this.element.addClass('hidden');
    };


    this.setContent = function (content) {
        this.innerElement.html(content);
        this.innerElement.removeClass('hidden');
        this.innerElement.siblings().addClass('hidden');
    };

    this.showMap = function (e) {
        if (e) e.preventDefault();
        var thisContainer = $('#tariff-main-map');
        if (thisContainer.length) {
            thisContainer.removeClass('hidden');
            thisContainer.siblings().addClass('hidden');
        } else {
            thisContainer = $('<div id="tariff-main-map" class="widget-obscure hidden hide-to-left">');
            this.element.append(thisContainer);
            $.get('/static/compile/mt/tariff-map.html', {}, function (data, status, jqxhr) {
                thisContainer.html(data);
                thisContainer.siblings().addClass('hidden');
                thisContainer.removeClass('hidden');
            }.bind(this));
        }
    };

};

var TariffListWidget = function(panel, options) {
    this.panel = panel;

    this.options = jQuery.extend({
        id: 'tariff-sidebar',
        container: jQuery('#app', document),
    }, (options || {}));

    this.element = jQuery('<div id="'+this.options.id+'" class="hidden"></div>');
    this.innerElement = jQuery('<div class="widget-obscure"></div>');
    this.element.append(this.innerElement);
    this.menuElement = jQuery('<menu><li data-side="tariffs">Тарифы</li></menu>');
    this.element.append(this.menuElement);
    this.element.addClass('widget widget-sidebar widget-sidebar-l');
    jQuery(this.options.container).append(this.element);

    self = this;
    this.menuElement.on('click', 'li', function(e) {
       var val = this.dataset.side;
       self.element[0].className = self.element[0].className.replace(/tab-\w*/g, '');
       self.element.addClass('tab-'+val);
       self['show'+val[0].toUpperCase() + val.slice(1)]();
    });

    this.init = function() {

    };

    this.create = function() {

    };
    
    this.show = function() {
        this.element.removeClass('hidden');
        this.showTariffs();
    };

    this.hide = function() {
        this.element.addClass('hidden');
    };

    this.setContent = function (content) {
        this.innerElement.html(content);
        this.innerElement.removeClass('hidden');
        this.innerElement.siblings('.widget-obscure').addClass('hidden');
    };

    this.showTariffs = function (e) {
        if (e) e.preventDefault();
        var thisContainer = $('#tariff-sidebar-tariffs');
        if (thisContainer.length) {
            thisContainer.removeClass('hidden');
            thisContainer.siblings('.widget-obscure').addClass('hidden');
        } else {
            thisContainer = $('<div id="tariff-sidebar-tariffs" class="widget-obscure hidden hide-to-left">');
            this.element.append(thisContainer);
            $.get('/static/compile/mt/tariff-sidebar-tariffs.html', {}, function (data, status, jqxhr) {
                thisContainer.html(data);
                thisContainer.siblings('.widget-obscure').addClass('hidden');
                thisContainer.removeClass('hidden');
            });
        }
    };

    $("body").on('click', '.decrease', function(e) {
        e.preventDefault();
        var input = $(this).parent().find('input');
        var val = parseFloat(input.val());
        val -= 0.5;
        if (val >= 0) {
            input.val(val);
            input.trigger('change');
        }
    });
    $("body").on('click', '.increase', function(e) {
        e.preventDefault();
        var input = $(this).parent().find('input');
        var val = parseFloat(input.val());
        input.val(val+0.5);
        input.trigger('change');
    });
    $("body").on('change', '#event-tariff-menu  input[type=text]', function() {
       var groupTag = $(this).closest('tbody');
       var base  = parseFloat(groupTag[0].dataset.cost);
       var day   = parseFloat(groupTag.find('input').first().val());
       var night = parseFloat(groupTag.find('input').last().val());
       var avg   = (day+night)/2;
       var load  = base/avg;
       var oldLoad = groupTag.find('tr:last td:last').text();
       var delta = (Math.round(load*100)-oldLoad)/4;
       
       groupTag.find('tr:last td:last').text(Math.round(load*100));

       _.each($('#event-tariff-menu tbody'), function(item) {
        console.log($(item).attr("id"));
        console.log($(groupTag).attr("id"));
        if($(item).attr("id") != $(groupTag).attr("id")) {
            $(item).find(".road-load").html(parseInt(parseInt($(item).find(".road-load").html())+delta));
        }
       });
    });
};

var ExWidget = {
    appId: "#app",
    navId: "",
    panel: null,
    template: null,

    create: function() {
        if(this.navId) {
            var self = this;
            $.get('/static/compile/mt/'+this.navId.replace("#", "")+'.html', {}, function(data, status, jqxhr) {
                self.template = data;
                data = self.beforeCreate_(self.template);
                $(self.appId).append(data);
                self.afterCreate_();
            });
        }
    },

    refresh: function() {
        this.destroy();
        data = this.beforeCreate_(this.template);
        $(this.appId).append(data);
        this.afterCreate_();
        this.show();
    },

    destroy: function(){
        $(this.navId).remove();
    },

    beforeCreate_: function(data) {
        return data;
    },

    afterCreate_: function() {

    },

    show: function() {
        $(this.navId).removeClass('hidden');
    },

    hide: function() {    
        $(this.navId).addClass('hidden');
    },

    init: function() { }
}

var TariffNavWidget = Object.create(ExWidget);

TariffNavWidget.navId = "#reference-nav";

TariffNavWidget.onNavClick_ = function(event) {
    var elm = $(event.target);
    if(event.target.tagName == "A") {
        elm = $(event.target).parent();
    }
    if(!elm.hasClass("current")) {
        $(this.navId+" li").removeClass("current");
        elm.addClass("current");
        this.panel.changeState(elm.attr("state"));    
    }
}

TariffNavWidget.clear = function() {
    $(this.navId + " li.current").removeClass("current");
    $(this.navId + " li:first-child").addClass("current");
}

TariffNavWidget.init = function() {
    $("body").on("click", this.navId+" li", $.proxy(this.onNavClick_, this));
}

var CurrentFrameWidget = Object.create(ExWidget);
CurrentFrameWidget.appId = "#current_frame";
CurrentFrameWidget.navId = "#event-main-ramp-info";
CurrentFrameWidget.frame = null;

CurrentFrameWidget.beforeCreate_ = function(data) {
    return _.template(data, { frame : this.frame});
}

var TariffCamersListWidget = Object.create(ExWidget);
TariffCamersListWidget.navId = "#camers-list";

TariffCamersListWidget.beforeCreate_ = function(data) {
    return _.template(data, { camers : window.AppData.camers});
}

TariffCamersListWidget.onAddClick_ = function(event) {
    this.panel.stateWidgets.cameras.main.showAdd();
}

TariffCamersListWidget.onItemClick_ = function(event) {
    $("#scene-info-map .tooltip").remove();
    var index = $(event.target).parents(".ramp-entry").attr("data-index");

    this.panel.stateWidgets.cameras.main.addTooltip_(index);
}
TariffCamersListWidget.init = function(data) {
    $("body").on("click", this.navId + " .add", $.proxy(this.onAddClick_, this));
    $("body").on("click", this.navId + " .ramp-entry", $.proxy(this.onItemClick_, this));
}
//rtsp://192.168.1.195/video.pro1

var TariffCamersMainWidget = Object.create(ExWidget);
TariffCamersMainWidget.navId = "#camers-main";
TariffCamersMainWidget.mapId = "#scene-info-map";
TariffCamersMainWidget.addBoxClass = ".addbox";
TariffCamersMainWidget.closeAddClass = ".close-add";
TariffCamersMainWidget.addButtonClass = ".add-button";

TariffCamersMainWidget.afterCreate_ = function() {
    this.drawCamers();
}

TariffCamersMainWidget.getCameraByIndex_ = function(index) {
    return positiveArr = window.AppData.camers.filter(function(item) {
        if(item.index == index) { return item; }
    })[0];
}

TariffCamersMainWidget.dragStart = function(instance, event, pointer) {
    $(this.navId + " .event-ramp-menu[data-index='"+$(instance.element).attr("data-index")+"']").remove();
}

TariffCamersMainWidget.onDragEnd = function(instance, event, pointer) {
    var camera = this.getCameraByIndex_($(instance.element).attr("data-index"));
    camera.position.left = instance.position.x;
    camera.position.top = instance.position.y;
}

TariffCamersMainWidget.createCamera = function(camera) {
    var el1 = document.createElement("div");

    el1.className = "camera";
    el1.style.left = camera.position.left+"px";
    el1.style.top = camera.position.top+"px";

    $(el1).attr("data-index", camera.index);

    var draggie = new Draggabilly(el1, {});
    draggie.on('dragEnd', $.proxy(this.onDragEnd, this));
    draggie.on('dragStart', $.proxy(this.dragStart, this));

    $(el1).click($.proxy(this.cameraClick_, this));

    $(this.navId + " " + this.mapId).append(el1);
}

TariffCamersMainWidget.showAdd = function() {
    $(this.navId + " " + this.addBoxClass).show();
}

TariffCamersMainWidget.drawCamers = function() {
    var self = this;
    $(this.navId + " " + ".camera").remove();
    _.each(window.AppData.camers, function(value, key) {
        self.createCamera(value);
    });
}

TariffCamersMainWidget.addCamera_ = function(event) {
    var newCamera = {
        index: window.AppData.frames.length + 1,
        position: {top: 385, left: 610},
        angle: 0,
        number: $("#new_camers_index").val(),
        adress: $("#new_camers_adress").val(),
        positionСoords: $("#new_camers_coords").val(),
        ip: $("#new_camers_ip").val(),
    };

    window.AppData.camers.push(newCamera);
    this.createCamera(newCamera);
    this.closeAdd();

    $("#new_camers_index").val("");
    $("#new_camers_adress").val("");
    $("#new_camers_coords").val("");
    $("#new_camers_ip").val("");

    this.panel.stateWidgets.cameras.list.refresh();
}

TariffCamersMainWidget.closeAdd = function() {
    $(this.navId + " " + this.addBoxClass).hide();
}

TariffCamersMainWidget.cameraClick_ = function(event) {
    var index = $(event.target).attr("data-index");

    if(!this.isTooltip(index)) {
        this.addTooltip_(index);    
    }
}

TariffCamersMainWidget.isTooltip = function(index) {
    return $(this.navId + " " + this.eventMapId + " .event-ramp-menu[data-index='"+index+"']").size();
}

TariffCamersMainWidget.onTooltipCloseClick_ = function(event) {
    console.log(event);
    $(event.target).parents(".tooltip").remove();
}

TariffCamersMainWidget.addTooltip_ = function(index) {
    $(".tooltip").remove();

    var camera = this.getCameraByIndex_(index);
    var html = $('<div class="tooltip bottom blue event-ramp-menu" data-index="'+camera.index+'"><span class="close"></span> <div class="tooltip-obscure"><div class="center"><p class="gosnumber">'+camera.number+'</p><p>'+camera.adress+'</p><p class="delete">Удалить</p></div></div></div>');
    
    if(camera.position.left > 800) {
        camera.position.left = 780;
    }
    $(html).css("left", (camera.position.left+15)+"px");
    $(html).css("top", (camera.position.top+65)+"px");

    $(html).find(".gosnumber").on("click", $.proxy(this.showEdit, this));
    
    $(this.navId + " " + this.mapId).append(html);
}

TariffCamersMainWidget.onTooltipCloseClick_ = function(event) {
    $(event.target).parents(".tooltip").remove();
}

TariffCamersMainWidget.onDeleteFrame_ = function(e) {
    var r = confirm("Вы уверены что хотите удалить камеру?");

    if (r == true) {
        var index = $(e.target).parents(".event-ramp-menu").attr("data-index");

        _.each(window.AppData.camers, function(item, key) {
            if(item.index == index) {
                window.AppData.camers.splice(key, 1);
            }
        });

        $(event.target).parents(".tooltip").remove();
        this.panel.stateWidgets.cameras.list.refresh();
        this.drawCamers();
    }
}

TariffCamersMainWidget.showEdit = function(e) {
    var camera = this.getCameraByIndex_($(e.target).parents(".event-ramp-menu").attr("data-index"));
    
    $(e.target).parents(".tooltip").remove();
    

    $("#in_cam_edit_camera embed").attr("target", showFakeCamera(camera.ip));

    $("#edit_camers_adress").val(camera.adress);
    $("#edit_camers_ip").val(camera.ip);
    $("#edit_camers_index").val(camera.number);
    $("#edit_camers_coords").val(camera.positionСoords);
    $("#edit_camers_index_old").val(camera.index);
    
    $(this.navId + " .editbox").show();
}

TariffCamersMainWidget.closeEdit = function() {
    $(this.navId + " .editbox").hide();
}

TariffCamersMainWidget.onUpdateFrame_ = function(e) {
    var index = $("#edit_camers_index_old").val();

    var keys = -1;

    _.each(window.AppData.camers, function(item, key) {
        if(item.index == index) {
            keys = key;
        }
    });

    window.AppData.camers[keys].number = $("#edit_camers_index").val();
    window.AppData.camers[keys].adress = $("#edit_camers_adress").val();
    window.AppData.camers[keys].positionСoords = $("#edit_camers_coords").val();
    window.AppData.camers[keys].ip = $("#edit_camers_ip").val();

    $(".tooltip").remove();

    this.panel.stateWidgets.cameras.list.refresh();
    this.drawCamers();

    $(this.navId + " .editbox").hide();
}

TariffCamersMainWidget.onCamera_ = function(e) {
    var ip = "";
    var enterIp = $("#new_camers_ip").val();

    ip = showFakeCamera(enterIp);
    html = getVideoTag(ip);
    $("#in_cam_add_camera").html(html);
}

TariffCamersMainWidget.onCameraEdit_ = function(e) {
    var ip = "";
    var enterIp = $("#edit_camers_ip").val();
    var index = $("#edit_camers_index_old").val();
    var camera = this.getCameraByIndex_(index);

    ip = showFakeCamera(enterIp);

    html = getVideoTag(ip);
    $("#in_cam_edit_camera").html(html);
    $(".camera-edit-view").hide();
    //$(".camera-add-view").attr("src", "rtsp://"+$(e.target).val()+"/video.pro1");
}

TariffCamersMainWidget.init = function(data) {
    $("body").on("click", this.navId + " " + this.closeAddClass, $.proxy(this.closeAdd, this));
    $("body").on("click", this.navId + " " + this.addButtonClass, $.proxy(this.addCamera_, this));

    $("body").on("click", this.navId + " " +" .close", $.proxy(this.onTooltipCloseClick_, this));

    $("body").on("click", this.navId + " .delete", $.proxy(this.onDeleteFrame_, this));

    $("body").on("click", this.navId + " " + ".close-edit", $.proxy(this.closeEdit, this));
    $("body").on("click", this.navId + " " + ".edit-button", $.proxy(this.onUpdateFrame_, this));

    $("body").on("click", this.navId + " " + "#check_camers", $.proxy(this.onCamera_, this));
    $("body").on("click", this.navId + " " + "#check_camers_edit", $.proxy(this.onCameraEdit_, this));
}

var TariffRamkListWidget = Object.create(ExWidget);
TariffRamkListWidget.navId = "#ramks-list";

TariffRamkListWidget.beforeCreate_ = function(data) {
    return _.template(data, { frames : window.AppData.frames});
}
TariffRamkListWidget.onAddClick_ = function(event) {
    this.panel.stateWidgets.ramks.main.showAdd();
}
TariffRamkListWidget.onItemClick_ = function(event) {
    $("#map-fake .tooltip").remove();
    var index = $(event.target).parents(".ramp-entry").attr("data-index");
    console.log(this.panel.stateWidgets);
    this.panel.stateWidgets.ramks.main.addTooltip_(index);
}
TariffRamkListWidget.init = function(data) {
    $("body").on("click", "#ramks-list .add", $.proxy(this.onAddClick_, this));
    $("body").on("click", "#ramks-list .ramp-entry", $.proxy(this.onItemClick_, this));

}

var TariffRamkMainWidget = Object.create(ExWidget);
TariffRamkMainWidget.navId = "#ramks-main";
TariffRamkMainWidget.eventMapId = "#map-fake";
TariffRamkMainWidget.addBoxClass = ".addbox";
TariffRamkMainWidget.closeAddClass = ".close-add";
TariffRamkMainWidget.addButtonClass = ".add-button";
TariffRamkMainWidget.currentFrameId = "#event-main-ramp-info";
TariffRamkMainWidget.eventMapsId = "#event-main-map";
TariffRamkMainWidget.closeClass = ".close-button";
TariffRamkMainWidget.currentFrameWidget = null;

TariffRamkMainWidget.afterCreate_ = function() {
    this.drawFrames();
}

TariffRamkMainWidget.frameClick_ = function(event) {
    var index = $(event.target).attr("data-index");

    if(!this.isTooltip(index)) {
        this.addTooltip_(index);    
    }
}

TariffRamkMainWidget.isTooltip = function(index) {
    return $(this.navId + " " + this.eventMapId + " .event-ramp-menu[data-index='"+index+"']").size();
}

TariffRamkMainWidget.onTooltipClick_ = function(event) {
    
}

TariffRamkMainWidget.onTooltipCloseClick_ = function(event) {
    $(event.target).parents(".tooltip").remove();
}

TariffRamkMainWidget.showCurrentFrame_ = function(index) {
}

TariffRamkMainWidget.closeCurrentFrame_ = function(index) {
    $(this.navId + " " + this.eventMapsId).show();

    if(TariffRamkMainWidget.currentFrameWidget) {
        TariffRamkMainWidget.currentFrameWidget.destroy();    
    }
}

TariffRamkMainWidget.addTooltip_ = function(index) {
    $(".tooltip").remove();

    var frame = this.getFrameByIndex_(index);
    var html = $('<div class="tooltip bottom blue event-ramp-menu" data-index="'+frame.index+'"><span class="close"></span> <div class="tooltip-obscure"><div class="center"><p class="gosnumber">'+frame.number+'</p><p>'+frame.positionName+'</p><p class="delete">Удалить</p></div></div></div>');
    
    $(html).css("left", (frame.position.left+15)+"px");
    $(html).css("top", (frame.position.top+35)+"px");

    $(html).find(".gosnumber").on("click", $.proxy(this.showEdit, this));

    $(".tooltip").remove();
    
    $(this.navId + " " + this.eventMapId).append(html);
}

TariffRamkMainWidget.getFrameByIndex_ = function(index) {
    return positiveArr = window.AppData.frames.filter(function(item) {
        if(item.index == index) { return item; }
    })[0];
}

TariffRamkMainWidget.addFrame_ = function(event) {
    var newFrame = {
        index: window.AppData.frames.length,
        position: {top: 385, left: 610},
        angle: 0,
        number: $("#new_frame_index").val(),
        positionName: $("#new_frame_adress").val(),
        positionСoords: $("#new_frame_coords").val(),
        ip: $("#new_frame_ip").val(),
        webcam: false
    };

    window.AppData.frames.push(newFrame);
    this.createFrame(newFrame);
    this.closeAdd();

    $("#new_frame_index").val("");
    $("#new_frame_adress").val("");
    $("#new_frame_coords").val("");
    $("#new_frame_ip").val("");

    this.panel.stateWidgets.ramks.list.refresh();
}

TariffRamkMainWidget.showEdit = function(e) {
    var frame = this.getFrameByIndex_($(e.target).parents(".event-ramp-menu").attr("data-index"));

    $("#in_cam_edit_ramkc").attr("target", showFakeCamera(frame.ip));


    $("#edit_frame_adress").val(frame.positionName);
    $("#edit_frame_ip").val(frame.ip);
    $("#edit_frame_index").val(frame.number);
    $("#edit_frame_coords").val(frame.positionСoords);
    $("#edit_frame_index_old").val(frame.index);
    
    $(this.navId + " .editbox").show();
}

TariffRamkMainWidget.closeEdit = function() {
    $(this.navId + " .editbox").hide();
}

TariffRamkMainWidget.showAdd = function() {
    $(this.navId + " " + this.addBoxClass).show();
}

TariffRamkMainWidget.closeAdd = function() {
    $(this.navId + " " + this.addBoxClass).hide();
}

TariffRamkMainWidget.onDeleteFrame_ = function(e) {
    var r = confirm("Вы уверены что хотите удалить рамку?");

    if (r == true) {
        var index = $(e.target).parents(".event-ramp-menu").attr("data-index");

        _.each(window.AppData.frames, function(item, key) {
            if(item.index == index) {
                window.AppData.frames.splice(key, 1);
            }
        });

        $(event.target).parents(".tooltip").remove();
        this.panel.stateWidgets.ramks.list.refresh();
        this.drawFrames();
    }
}

TariffRamkMainWidget.onUpdateFrame_ = function(e) {
    var index = $("#edit_frame_index_old").val();

    var keys = -1;

    _.each(window.AppData.frames, function(item, key) {
        if(item.index == index) {
            keys = key;
        }
    });

    window.AppData.frames[keys].number = $("#edit_frame_index").val();
    window.AppData.frames[keys].positionName = $("#edit_frame_adress").val();
    window.AppData.frames[keys].positionСoords = $("#edit_frame_coords").val();
    window.AppData.frames[keys].ip = $("#edit_frame_ip").val();

    $(".tooltip").remove();

    this.panel.stateWidgets.ramks.list.refresh();
    this.drawFrames();

    $(this.navId + " .editbox").hide();
}

TariffRamkMainWidget.init = function() {
    $("body").on("click", this.navId + " " + this.closeAddClass, $.proxy(this.closeAdd, this));
    $("body").on("click", this.navId + " " + this.addButtonClass, $.proxy(this.addFrame_, this));
    $("body").on("click", this.navId + " .delete", $.proxy(this.onDeleteFrame_, this));
    $("body").on("click", this.navId + " " + this.closeClass, $.proxy(this.closeCurrentFrame_, this));
    $("body").on("click", this.navId + " " + ".close", $.proxy(this.onTooltipCloseClick_, this));
    $("body").on("click", this.navId + " " + ".close-edit", $.proxy(this.closeEdit, this));
    $("body").on("click", this.navId + " " + ".edit-button", $.proxy(this.onUpdateFrame_, this));

    $("body").on("click", this.navId + " " + "#new_ramk_check", $.proxy(this.onCamera_, this));
    $("body").on("click", this.navId + " " + "#edit_ramk_check", $.proxy(this.onCameraEdit_, this));
}

TariffRamkMainWidget.onDragEnd = function(instance, event, pointer) {
    var frame = this.getFrameByIndex_($(instance.element).attr("data-index"));
    frame.position.left = instance.position.x;
    frame.position.top = instance.position.y;

    $(instance.element).css({
        "webkitTransform":"rotate("+frame.angle+"deg)",
        "MozTransform":"rotate("+frame.angle+"deg)",
        "msTransform":"rotate("+frame.angle+"deg)",
        "OTransform":"rotate("+frame.angle+"deg)",
        "transform":"rotate("+frame.angle+"deg)"
    });
}

TariffRamkMainWidget.dragStart = function(instance, event, pointer) {
    $(this.navId + " " + this.eventMapId + " .event-ramp-menu[data-index='"+$(instance.element).attr("data-index")+"']").remove();
}

TariffRamkMainWidget.createFrame = function(frame) {
    var el1 = document.createElement("div");

    el1.className = "ramp";
    el1.style.left = frame.position.left+"px";
    el1.style.top = frame.position.top+"px";

    $(el1).css({
        "webkitTransform":"rotate("+frame.angle+"deg)",
        "MozTransform":"rotate("+frame.angle+"deg)",
        "msTransform":"rotate("+frame.angle+"deg)",
        "OTransform":"rotate("+frame.angle+"deg)",
        "transform":"rotate("+frame.angle+"deg)"
    });
    $(el1).attr("data-index", frame.index);

    $(el1).click($.proxy(this.frameClick_, this));

    var draggie = new Draggabilly(el1, {});
    draggie.on('dragEnd', $.proxy(this.onDragEnd, this));
    draggie.on('dragStart', $.proxy(this.dragStart, this));

    $(this.navId + " " + this.eventMapId).append(el1);
}

TariffRamkMainWidget.drawFrames = function() {
    var self = this;

    $(this.navId + " .ramp").remove();

    _.each(window.AppData.frames, function(value, key) {
        self.createFrame(value);
    });
}

TariffRamkMainWidget.onCamera_ = function(e) {
    var ip = "";
    var enterIp = $("#new_frame_ip").val();

    ip = showFakeCamera(enterIp);
    html = getVideoTag(ip);

    $("#in_cam_add_ramk").html(html);
    //$(".camera-add-view").attr("src", "rtsp://"+$(e.target).val()+"/video.pro1");
}

TariffRamkMainWidget.onCameraEdit_ = function(e) {
    var ip = "";
    var enterIp = $("#edit_frame_ip").val();
    var index = $("#edit_frame_index_old").val();
    var frame = this.getFrameByIndex_(index);

    ip = showFakeCamera(enterIp);

    var html = getVideoTag(ip);
    $("#in_cam_edit_ramkc").remove();
    $("#innn").html("");
    $("#innn").append(html);
    //$(".camera-add-view").attr("src", "rtsp://"+$(e.target).val()+"/video.pro1");
}

var VideoMainWidget = Object.create(ExWidget);
VideoMainWidget.navId = "#video-main";

VideoMainWidget.show = function() {
    /*
    var video = document.querySelector("#current_video");
 
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
     
    if (navigator.getUserMedia) {       
        navigator.getUserMedia({video: true}, handleVideo);
    }
     
    function handleVideo(stream) {
        video.src = window.URL.createObjectURL(stream);
    }
    */
    $(this.navId).removeClass('hidden');
}


function showFakeCamera(enterIp) {
    var ip = null;
    _.each(window.AppData.fakeCameras, function(fake) {
        if(fake.ip == enterIp) {
            ip = fake.path;
        }
    });

    if(!ip) {
        ip = "rtsp://"+enterIp+"/video.pro1";
    }

    return ip;
}

function getVideoTag(ip) {
    var html = '<embed controls="false" class="ramp-frame  ramk-edit-view" id="#in_cam_edit_ramkc" toolbar="false" type="application/x-vlc-plugin" pluginspage="http://www.videolan.org" version="VideoLAN.VLCPlugin.2"  width="400px"  height="300px" id="vlc" loop="yes" autoplay="yes" target="'+ip+'" allowfullscreen="false" controls="false" toolbar="false"></embed>';
    return html;
}

