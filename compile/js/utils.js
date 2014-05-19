"use strict";(function(e){if(typeof exports==="object"){module.exports=e()}else if(typeof define==="function"&&define.amd){define(e)}else{window.WatchJS=e();window.watch=window.WatchJS.watch;window.unwatch=window.WatchJS.unwatch;window.callWatchers=window.WatchJS.callWatchers}})(function(){var e={noMore:false},t=[];var n=function(e){var t={};return e&&t.toString.call(e)=="[object Function]"};var r=function(e){return e%1===0};var i=function(e){return Object.prototype.toString.call(e)==="[object Array]"};var s=function(e,t){var n=[],r=[];if(!(typeof e=="string")&&!(typeof t=="string")){if(i(e)){for(var s=0;s<e.length;s++){if(t[s]===undefined)n.push(s)}}else{for(var s in e){if(e.hasOwnProperty(s)){if(t[s]===undefined){n.push(s)}}}}if(i(t)){for(var o=0;o<t.length;o++){if(e[o]===undefined)r.push(o)}}else{for(var o in t){if(t.hasOwnProperty(o)){if(e[o]===undefined){r.push(o)}}}}}return{added:n,removed:r}};var o=function(e){if(null==e||"object"!=typeof e){return e}var t=e.constructor();for(var n in e){t[n]=e[n]}return t};var u=function(e,t,n,r){try{Object.observe(e[t],function(e){r(e)})}catch(i){try{Object.defineProperty(e,t,{get:n,set:r,enumerable:true,configurable:true})}catch(s){try{Object.prototype.__defineGetter__.call(e,t,n);Object.prototype.__defineSetter__.call(e,t,r)}catch(o){throw new Error("watchJS error: browser not supported :/")}}}};var a=function(e,t,n){try{Object.defineProperty(e,t,{enumerable:false,configurable:true,writable:false,value:n})}catch(r){e[t]=n}};var f=function(){if(n(arguments[1])){l.apply(this,arguments)}else if(i(arguments[1])){c.apply(this,arguments)}else{h.apply(this,arguments)}};var l=function(e,t,n,r){if(typeof e=="string"||!(e instanceof Object)&&!i(e)){return}var s=[];if(i(e)){for(var o=0;o<e.length;o++){s.push(o)}}else{for(var u in e){if(e.hasOwnProperty(u)){s.push(u)}}}c(e,s,t,n,r);if(r){x(e,"$$watchlengthsubjectroot",t,n)}};var c=function(e,t,n,r,s){if(typeof e=="string"||!(e instanceof Object)&&!i(e)){return}for(var o in t){if(t.hasOwnProperty(o)){h(e,t[o],n,r,s)}}};var h=function(e,t,r,s,o){if(typeof e=="string"||!(e instanceof Object)&&!i(e)){return}if(n(e[t])){return}if(e[t]!=null&&(s===undefined||s>0)){l(e[t],r,s!==undefined?s-1:s)}m(e,t,r,s);if(o&&(s===undefined||s>0)){x(e,t,r,s)}};var p=function(){if(n(arguments[1])){d.apply(this,arguments)}else if(i(arguments[1])){v.apply(this,arguments)}else{E.apply(this,arguments)}};var d=function(e,t){if(e instanceof String||!(e instanceof Object)&&!i(e)){return}var n=[];if(i(e)){for(var r=0;r<e.length;r++){n.push(r)}}else{for(var s in e){if(e.hasOwnProperty(s)){n.push(s)}}}v(e,n,t)};var v=function(e,t,n){for(var r in t){if(t.hasOwnProperty(r)){E(e,t[r],n)}}};var m=function(t,n,r,i){var s=t[n];w(t,n);if(!t.watchers){a(t,"watchers",{})}if(!t.watchers[n]){t.watchers[n]=[]}for(var o=0;o<t.watchers[n].length;o++){if(t.watchers[n][o]===r){return}}t.watchers[n].push(r);var f=function(){return s};var c=function(o){var u=s;s=o;if(i!==0&&t[n]){l(t[n],r,i===undefined?i:i-1)}w(t,n);if(!e.noMore){if(u!==o){g(t,n,"set",o,u);e.noMore=false}}};u(t,n,f,c)};var g=function(e,t,n,r,i){if(t){for(var s=0;s<e.watchers[t].length;s++){e.watchers[t][s].call(e,t,n,r,i)}}else{for(var t in e){if(e.hasOwnProperty(t)){g(e,t,n,r,i)}}}};var y=["pop","push","reverse","shift","sort","slice","unshift"];var b=function(e,t,n,r){a(e[t],r,function(){var i=n.apply(e[t],arguments);h(e,e[t]);if(r!=="slice"){g(e,t,r,arguments)}return i})};var w=function(e,t){if(!e[t]||e[t]instanceof String||!i(e[t])){return}for(var n=y.length,r;n--;){r=y[n];b(e,t,e[t][r],r)}};var E=function(e,t,n){for(var r=0;r<e.watchers[t].length;r++){var i=e.watchers[t][r];if(i==n){e.watchers[t].splice(r,1)}}T(e,t,n)};var S=function(){for(var e=0;e<t.length;e++){var n=t[e];if(n.prop==="$$watchlengthsubjectroot"){var r=s(n.obj,n.actual);if(r.added.length||r.removed.length){if(r.added.length){c(n.obj,r.added,n.watcher,n.level-1,true)}n.watcher.call(n.obj,"root","differentattr",r,n.actual)}n.actual=o(n.obj)}else{var r=s(n.obj[n.prop],n.actual);if(r.added.length||r.removed.length){if(r.added.length){for(var i=0;i<n.obj.watchers[n.prop].length;i++){c(n.obj[n.prop],r.added,n.obj.watchers[n.prop][i],n.level-1,true)}}g(n.obj,n.prop,"differentattr",r,n.actual)}n.actual=o(n.obj[n.prop])}}};var x=function(e,n,r,i){var s;if(n==="$$watchlengthsubjectroot"){s=o(e)}else{s=o(e[n])}t.push({obj:e,prop:n,actual:s,watcher:r,level:i})};var T=function(e,n,r){for(var i=0;i<t.length;i++){var s=t[i];if(s.obj==e&&s.prop==n&&s.watcher==r){t.splice(i,1)}}};setInterval(S,50);e.watch=f;e.unwatch=p;e.callWatchers=g;return e})

// Модель наследования взята из Backbone.js
var extend = function(protoProps, staticProps) {
  var parent = this;
  var child;
  // The constructor function for the new subclass is either defined by you
  // (the "constructor" property in your `extend` definition), or defaulted
  // by us to simply call the parent's constructor.
  if (protoProps && _.has(protoProps, 'constructor')) {
    child = protoProps.constructor;
  } else {
    child = function(){ return parent.apply(this, arguments); };
  }
  // Add static properties to the constructor function, if supplied.
  _.extend(child, parent, staticProps);
  // Set the prototype chain to inherit from `parent`, without calling
  // `parent`'s constructor function.
  var Surrogate = function(){ this.constructor = child; };
  Surrogate.prototype = parent.prototype;
  child.prototype = new Surrogate;
  // Add prototype properties (instance properties) to the subclass,
  // if supplied.
  if (protoProps) _.extend(child.prototype, protoProps);
  // Set a convenience property in case the parent's prototype is needed
  // later.
  child.__super__ = parent.prototype;
  return child;
};
// Set up inheritance for the model, collection, router, view and history.
