(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(3),u=n.n(c),i=(n(9),n(1));var o=function(e){var t=r.a.useRef(null);return r.a.useEffect(function(){e.draw(t)}),r.a.createElement("canvas",{ref:t})};var l=function(e){return r.a.createElement("div",{className:"Plot"},r.a.createElement("h1",null,e.slider_value),r.a.createElement(o,{draw:e.draw}),r.a.createElement("input",{type:"range",min:"1",max:"100",onInput:e.onSliderChange}))};function s(e){var t=e.current.getContext("2d"),n=t.canvas.width,a=t.canvas.height;t.clearRect(0,0,n,a),t.beginPath()}function h(e,t){var n=e.current.getContext("2d"),a=n.canvas.width/2,r=n.canvas.height/2;n.beginPath(),n.lineWidth=3,n.strokeStyle="#FF00FF",n.arc(a,r,t,0,2*Math.PI),n.stroke()}function d(e){var t=Math.atan2(e.y,e.x),n=Math.sqrt(e.x*e.x+e.y*e.y),a=.1*n*Math.cos(10*t)+n;return t+=.1*n,{x:a*Math.cos(t),y:a*Math.sin(t)}}function f(e){return function(e,t,n){var a=Array(n).fill(null),r=(t-e)/(n-1);return a.map(function(t,n){return e+r*n})}(0,2*Math.PI,200).map(function(t){return{x:e*Math.cos(t),y:e*Math.sin(t)}})}var v=function(){var e=r.a.useState(50),t=Object(i.a)(e,2),n=t[0],a=t[1],c=r.a.useState(50),u=Object(i.a)(c,2),o=u[0],v=u[1],m=f(n).map(d);return r.a.createElement("div",{className:"App"},r.a.createElement(l,{slider_value:n,onSliderChange:function(e){return a(e.target.value)},draw:function(e){s(e),h(e,n)}}),r.a.createElement(l,{slider_value:o,onSliderChange:function(e){return v(e.target.value)},draw:function(e){s(e),function(e,t){var n=e.current.getContext("2d"),a=n.canvas.width,r=n.canvas.height,c=a/2,u=r/2;n.beginPath(),t.forEach(function(e){n.lineTo(e.x+c,e.y+u)}),n.lineWidth=3,n.strokeStyle="#0000FF",n.stroke(),n.closePath()}(e,m),h(e,n*o)}}))};u.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(v,null)),document.getElementById("root"))},4:function(e,t,n){e.exports=n(10)},9:function(e,t,n){}},[[4,1,2]]]);
//# sourceMappingURL=main.c6aceba6.chunk.js.map