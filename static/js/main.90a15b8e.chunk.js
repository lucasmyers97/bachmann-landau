(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,t,n){e.exports={Plot:"Plot_Plot__1KTAS",Buttons:"Plot_Buttons__KMdqr",Canvas:"Plot_Canvas__3R-0c",BackgroundCanvas:"Plot_BackgroundCanvas__1_t0V"}},22:function(e,t,n){e.exports={canvas:"Canvas_canvas__1vaUu",Canvas:"Canvas_Canvas__33MS7"}},28:function(e,t,n){e.exports={App:"App_App__22zXa"}},29:function(e,t,n){e.exports={ClickDrag:"ClickDrag_ClickDrag__1_Q3u"}},32:function(e,t,n){e.exports=n(58)},37:function(e,t,n){},57:function(e,t){},58:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(27),c=n.n(r),u=(n(37),n(2)),l=n(21),s=n(60);function i(e,t,n){var a=Array(n).fill(null),o=(t-e)/(n-1);return a.map(function(t,n){return e+o*n})}function v(e){return i(0,2*Math.PI,200).map(function(t){return{x:e*Math.cos(t),y:e*Math.sin(t)}})}var f=n(28),m=n.n(f),x=n(12),_=n.n(x),p=n(22),d=n.n(p);var E=function(e){var t=o.a.useRef(null);return o.a.useEffect(function(){e.draw(t)},[e.draw]),o.a.createElement("div",{className:d.a.Canvas},o.a.createElement("canvas",{ref:t,width:"1000",height:"1000",className:d.a.canvas}))},h=n(29),b=n.n(h);var g=function(e){return o.a.createElement("div",{className:b.a.ClickDrag,onMouseDown:function(t){return function(t){e.onMouseDown(t)}(t)}},e.value)};function y(e,t,n,a){var o=function(e,t){var n=e.current.getContext("2d"),a=n.canvas.width,o=n.canvas.height,r=Math.min(a,o)/2;return t.map(function(e){return function(e,t,n,a){return{x:e.x*t+n/2,y:-e.y*t+a/2}}(e,r,a,o)})}(e,function(e,t){return e.map(function(e){return{x:e.x*t,y:e.y*t}})}(t,n));!function(e,t,n){var a=e.current.getContext("2d");a.beginPath(),t.forEach(function(e){a.lineTo(e.x,e.y)});for(var o=0,r=Object.entries(n);o<r.length;o++){var c=r[o],l=Object(u.a)(c,2),s=l[0],i=l[1];a[s]=i}a.stroke(),a.closePath()}(e,o,a)}function S(e,t,n,a){!function(e){var t=e.current.getContext("2d"),n=t.canvas.width,a=t.canvas.height;t.clearRect(0,0,n,a),t.beginPath(),t.closePath()}(e),t.forEach(function(t,o){y(e,t,n,a[o])})}function C(e,t){var n=function(e,t){var n=1/e,a=1/t;return Math.ceil(n*a)}(e,t),a=i(-n,n,2*n+1),o=e;return a.map(function(e){return e*o})}function j(e,t,n){var a=function(e,t){var n=C(e,t),a=n.length-1,o=n.map(function(e){return[{x:e,y:n[0]},{x:e,y:n[a]}]}),r=n.map(function(e){return[{x:n[0],y:e},{x:n[a],y:e}]});return o.concat(r)}(.2,t),o=a.length,r=Array(o);r.fill(n),S(e,a,t,r)}var O=function(e){var t=.01,n=0,a={strokeStyle:"#000000",lineWidth:1},r=o.a.useState(1),c=Object(u.a)(r,2),l=c[0],s=c[1],i=o.a.useState(1),v=Object(u.a)(i,2),f=v[0],m=v[1],x=o.a.useState(!1),p=Object(u.a)(x,2),d=p[0],h=p[1],b=o.a.useState({x:0,y:0}),y=Object(u.a)(b,2),C=y[0],O=y[1],w=o.a.useState(1),k=Object(u.a)(w,2),M=k[0],N=k[1],P=o.a.useState(1),D=Object(u.a)(P,2),T=D[0],A=D[1],B=o.a.useState(!1),F=Object(u.a)(B,2),X=F[0],K=F[1],R=o.a.useState({x:0,y:0}),W=Object(u.a)(R,2),Y=W[0],I=W[1];return o.a.useEffect(function(){if(d){var a=l+(e.mouse_pos.x-C.x)/100;a>t&&m(a)}if(X){var o=M+(e.mouse_pos.x-Y.x)/100;o>n&&(A(o),e.onScaleChange(T))}},[e.mouse_pos]),o.a.useEffect(function(){e.mouse_clicked||(h(!1),K(!1))},[e.mouse_clicked]),o.a.createElement("div",{className:_.a.Plot},o.a.createElement("div",{className:_.a.Buttons},o.a.createElement(g,{onMouseDown:function(t){h(!0),O(e.mouse_pos),s(f)},value:"Zoom: ".concat(Number(100*f).toFixed(0),"%")}),o.a.createElement(g,{onMouseDown:function(t){K(!0),I(e.mouse_pos),N(T)},value:"Scale: ".concat(Number(T).toExponential(2))})),o.a.createElement("div",{className:_.a.Canvas},o.a.createElement(E,{draw:function(t){return S(t,e.paths,f,e.line_props)}})),o.a.createElement("div",{className:_.a.BackgroundCanvas},o.a.createElement(E,{draw:function(e){j(e,f,a)}})))};var w=function(e){var t=e.onEnter,n=e.value;return o.a.createElement("div",null,o.a.createElement("input",{type:"text",onKeyDown:function(e){13===e.keyCode&&t(e)}}),o.a.createElement("p",null,n))};var k=function(e){var t=e.handleXTextboxEnter,n=e.handleYTextboxEnter,a=e.x_textbox_value,r=e.y_textbox_value;return o.a.createElement("div",null,o.a.createElement(w,{onEnter:t,value:a}),o.a.createElement(w,{onEnter:n,value:r}))};var M=function(){var e=o.a.useState(1),t=Object(u.a)(e,2),n=t[0],a=t[1],r=o.a.useState(1),c=Object(u.a)(r,2),i=c[0],f=c[1],x=o.a.useState({x:0,y:0}),_=Object(u.a)(x,2),p=_[0],d=_[1],E=o.a.useState(!1),h=Object(u.a)(E,2),b=h[0],g=h[1],y=o.a.useState(0),S=Object(u.a)(y,2),C=S[0],j=S[1],w=o.a.useState(0),M=Object(u.a)(w,2),N=M[0],P=M[1],D=v(n),T=D.map(function(e,t){var n=Object(s.a)(e),a=Object(s.a)(t);return function(e){return{x:n.evaluate(e),y:a.evaluate(e)}}}(C,N)),A=v(n*i),B=[{strokeStyle:"#0000FF",lineWidth:6},{strokeStyle:"#FF0000",lineWidth:6}];return o.a.createElement("div",{className:m.a.App,onMouseDown:function(e){g(!0)},onMouseUp:function(e){g(!1)},onMouseMove:function(e){d({x:e.pageX,y:e.pageY})}},o.a.createElement(k,{handleXTextboxEnter:function(e){j(e.target.value)},handleYTextboxEnter:function(e){P(e.target.value)},x_textbox_value:o.a.createElement(l.Node,null,Object(s.b)(C).toTex()),y_textbox_value:o.a.createElement(l.Node,null,Object(s.b)(N).toTex())}),o.a.createElement(O,{slider_value:n,onScaleChange:function(e){return a(e)},paths:[D],line_props:B,mouse_clicked:b,mouse_pos:p}),o.a.createElement(O,{slider_value:i,onScaleChange:function(e){return f(e)},paths:[T,A],line_props:B,mouse_clicked:b,mouse_pos:p}))};c.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(M,null)),document.getElementById("root"))}},[[32,2,1]]]);
//# sourceMappingURL=main.90a15b8e.chunk.js.map