(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{10:function(e,t,n){e.exports=n(23)},22:function(e,t,n){},23:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(6),o=n.n(r),l=n(1),i=n(3),s=n(2),u=n(7),p=(n(15),n(9));n(21),n(22);function m(){var e=Object(a.useState)(null),t=Object(s.a)(e,2),n=t[0],r=t[1],o=Object(a.useState)(0),l=Object(s.a)(o,2),u=l[0],p=l[1],m=Object(a.useState)(0),d=Object(s.a)(m,2),b=d[0],v=d[1],g=Object(a.useState)({m:0,s:0}),O=Object(s.a)(g,2),j=O[0],E=O[1],h=Object(a.useState)(),S=Object(s.a)(h,2),y=S[0],I=S[1],k=Object(a.useState)(0),C=Object(s.a)(k,2),x=C[0],N=C[1];Object(a.useEffect)((function(){var e=localStorage.getItem("memorygamehighscore"),t=JSON.parse(e);t&&p(t)}),[]);var F=j.s,M=j.m,T=function(){F=0,M=0,B(),N(1),I(setInterval(B,1e3))},B=function(){return 60===F&&(M++,F=0),F++,E({m:M,s:F})},J=function(){clearInterval(y),N(2),E({m:0,s:0}),T()},w=function(){clearInterval(y),N(0),E({m:0,s:0})};return c.a.createElement("div",null,c.a.createElement("div",{className:"container"},c.a.createElement("h1",null,"Brain Smart"),c.a.createElement("div",null,"High Score: ",u),c.a.createElement("div",null,"Moves: ",b),c.a.createElement("div",null,"Time: ",j.m,":",j.s),c.a.createElement("div",null,null===n?c.a.createElement(c.a.Fragment,null,c.a.createElement("button",{onClick:function(){r(12),T()}},"Beginner"),c.a.createElement("button",{onClick:function(){r(16),T()}},"Intermediate"),c.a.createElement("button",{onClick:function(){r(20),T()}},"Expert")):c.a.createElement(c.a.Fragment,null,c.a.createElement("button",{onClick:function(){var e=n;v(0),r(null),J(),setTimeout((function(){r(e)}),5)}},"Restart"),c.a.createElement("button",{onClick:function(){r(null),w(),v(0)}},"Back")))),n?c.a.createElement(f,Object(i.a)({options:n,setOptions:r,highScore:u,setHighScore:p,moves:b,setMoves:v,status:x,reset:w,start:T,stop:J},"reset",w)):c.a.createElement("h2",null,"Select a Level to Play!"))}function f(e){var t=e.options,n=e.setOptions,r=e.highScore,o=e.setHighScore,i=e.moves,u=e.setMoves,m=e.stop,f=e.reset,b=Object(a.useState)([]),v=Object(s.a)(b,2),g=v[0],O=v[1],j=Object(a.useState)(0),E=Object(s.a)(j,2),h=E[0],S=E[1],y=Object(a.useState)([]),I=Object(s.a)(y,2),k=I[0],C=I[1],x=["./star.png","./circle.png","./cube.png","./triangle.png","./pentagon.png","./square.png","./pyramid.png","./diamond.png","./cross.png","./star_9.png","./cylinder.png","./cuboid.png"];if(Object(a.useEffect)((function(){for(var e=[],n=0;n<t/2;n++){var a={id:2*n,colorId:n,color:x[n],flipped:!1},c={id:2*n+1,colorId:n,color:x[n],flipped:!1};e.push(a),e.push(c)}var r=e.sort((function(){return Math.random()-.5}));O(r)}),[]),Object(a.useEffect)((function(){!g.some((function(e){return!e.flipped}))&&g.length>0&&setTimeout((function(){var e,a=g.length;12===t?e=5:16===t?e=2.5:20===t&&(e=1);var c,l=e*(.6*h-a);if((c=l<100?(c=100-l).toPrecision(2):0)>r){o(c);var i=JSON.stringify(c);localStorage.setItem("memorygamehighscore",i)}Object(p.confirmAlert)({title:"SCORE: "+c+" New Game?",buttons:[{label:"Yes",onClick:function(){var e=g.length;u(0),m(),n(null),setTimeout((function(){n(e)}),5)}},{label:"No",onClick:function(){n(null),u(0),f()}}],overlayClassName:"overlay"})}),500)}),[g]),2===k.length)if(g[k[0]].colorId===g[k[1]].colorId){var N=Object(l.a)(g);N[k[0]].flipped=!0,N[k[1]].flipped=!0,O(N);var F=Object(l.a)(k);F.push(!1),C(F)}else{var M=Object(l.a)(k);M.push(!0),C(M)}return 0===g.length?c.a.createElement("div",null,"loading..."):c.a.createElement("div",{id:"cards"},g.map((function(e,t){return c.a.createElement("div",{className:"card",key:t},c.a.createElement(d,{id:t,color:e.color,game:g,flippedCount:h,setFlippedCount:S,flippedIndexes:k,setFlippedIndexes:C,moves:i,setMoves:u}))})))}function d(e){var t=e.id,n=e.color,r=e.game,o=e.flippedCount,i=e.setFlippedCount,p=e.flippedIndexes,m=e.setFlippedIndexes,f=e.moves,d=e.setMoves,b=Object(a.useState)(!1),v=Object(s.a)(b,2),g=v[0],O=v[1],j=Object(u.b)({opacity:g?1:0,transform:"perspective(600px) rotateX(".concat(g?180:0,"deg)"),config:{mass:5,tension:500,friction:80}}),E=j.transform,h=j.opacity;Object(a.useEffect)((function(){!0===p[2]&&p.indexOf(t)>-1?setTimeout((function(){O((function(e){return!e})),i(o+1),m([]),d(f+1)}),700):!1===p[2]&&0===t&&(i(o+1),m([]),d(f+1))}),[p]);return c.a.createElement("div",{onClick:function(){if(r[t].flipped||o%3!==0){if(o%3===1&&!r[t].flipped&&p.indexOf(t)<0){O((function(e){return!e})),i(o+1);var e=Object(l.a)(p);e.push(t),m(e)}}else{O((function(e){return!e})),i(o+1);var n=Object(l.a)(p);n.push(t),m(n)}}},c.a.createElement(u.a.div,{className:"c back",style:{opacity:h.interpolate((function(e){return 1-e})),transform:E}}),c.a.createElement(u.a.div,{className:"c front",style:{opacity:h,transform:E.interpolate((function(e){return"".concat(e," rotateX(180deg)")})),backgroundImage:"url(".concat(n,")")}}))}o.a.render(c.a.createElement(m,null),document.getElementById("root"))}},[[10,1,2]]]);
//# sourceMappingURL=main.9ab616b0.chunk.js.map