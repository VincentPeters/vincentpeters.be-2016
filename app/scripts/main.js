"use strict";function sparkle(){var t;if(Math.abs(x-ox)>1||Math.abs(y-oy)>1)for(ox=x,oy=y,t=0;sparkles>t;t++)if(!starv[t]){star[t].style.left=(starx[t]=x)+"px",star[t].style.top=(stary[t]=y+1)+"px",star[t].style.clip="rect(0px, 5px, 5px, 0px)",star[t].childNodes[0].style.backgroundColor=star[t].childNodes[1].style.backgroundColor="random"==colour?newColour():colour,star[t].style.visibility="visible",starv[t]=50;break}for(t=0;sparkles>t;t++)starv[t]&&update_star(t),tinyv[t]&&update_tiny(t);setTimeout("sparkle()",40)}function update_star(t){if(25==--starv[t]&&(star[t].style.clip="rect(1px, 4px, 4px, 1px)"),starv[t]){if(stary[t]+=1+3*Math.random(),starx[t]+=(t%5-2)/5,!(stary[t]<shigh+sdown))return star[t].style.visibility="hidden",void(starv[t]=0);star[t].style.top=stary[t]+"px",star[t].style.left=starx[t]+"px"}else tinyv[t]=50,tiny[t].style.top=(tinyy[t]=stary[t])+"px",tiny[t].style.left=(tinyx[t]=starx[t])+"px",tiny[t].style.width="2px",tiny[t].style.height="2px",tiny[t].style.backgroundColor=star[t].childNodes[0].style.backgroundColor,star[t].style.visibility="hidden",tiny[t].style.visibility="visible"}function update_tiny(t){if(25==--tinyv[t]&&(tiny[t].style.width="1px",tiny[t].style.height="1px"),tinyv[t]){if(tinyy[t]+=1+3*Math.random(),tinyx[t]+=(t%5-2)/5,!(tinyy[t]<shigh+sdown))return tiny[t].style.visibility="hidden",void(tinyv[t]=0);tiny[t].style.top=tinyy[t]+"px",tiny[t].style.left=tinyx[t]+"px"}else tiny[t].style.visibility="hidden"}function mouse(t){t?(y=t.pageY,x=t.pageX):(set_scroll(),y=event.y+sdown,x=event.x+sleft)}function set_scroll(){"number"==typeof self.pageYOffset?(sdown=self.pageYOffset,sleft=self.pageXOffset):document.body&&(document.body.scrollTop||document.body.scrollLeft)?(sdown=document.body.scrollTop,sleft=document.body.scrollLeft):document.documentElement&&(document.documentElement.scrollTop||document.documentElement.scrollLeft)?(sleft=document.documentElement.scrollLeft,sdown=document.documentElement.scrollTop):(sdown=0,sleft=0)}function set_width(){var t=999999,e=999999;document.documentElement&&document.documentElement.clientWidth&&(document.documentElement.clientWidth>0&&(t=document.documentElement.clientWidth),document.documentElement.clientHeight>0&&(e=document.documentElement.clientHeight)),"number"==typeof self.innerWidth&&self.innerWidth&&(self.innerWidth>0&&self.innerWidth<t&&(t=self.innerWidth),self.innerHeight>0&&self.innerHeight<e&&(e=self.innerHeight)),document.body.clientWidth&&(document.body.clientWidth>0&&document.body.clientWidth<t&&(t=document.body.clientWidth),document.body.clientHeight>0&&document.body.clientHeight<e&&(e=document.body.clientHeight)),999999!=t&&999999!=e||(t=800,e=600),swide=t,shigh=e}function createDiv(t,e){var i=document.createElement("div");return i.style.position="absolute",i.style.height=t+"px",i.style.width=e+"px",i.style.overflow="hidden",i}function newColour(){var t=new Array;return t[0]=255,t[1]=Math.floor(256*Math.random()),t[2]=Math.floor(Math.random()*(256-t[1]/2)),t.sort(function(){return.5-Math.random()}),"rgb("+t[0]+", "+t[1]+", "+t[2]+")"}var _obj,_get=function t(e,i,n){null===e&&(e=Function.prototype);var s=Object.getOwnPropertyDescriptor(e,i);if(void 0===s){var o=Object.getPrototypeOf(e);return null===o?void 0:t(o,i,n)}if("value"in s)return s.value;var a=s.get;if(void 0!==a)return a.call(n)},PatternBackground=_obj={init:function(t){this.$el=t,this.canvas=this.$el.find("canvas"),this.context=this.canvas[0].getContext("2d"),this.image=new Image,this.image.src=this.$el.data("image"),this.reset(),this.getParameters(),this.eventHandlers()},getParameters:function(){this.expand=1===this.$el.data("expand"),this.follow=1===this.$el.data("follow"),this.move=1===this.$el.data("move"),this.follow||this.move||(this.active=!1)},reset:function(){this.canvasWidth=$(window).width(),this.canvasHeight=$(window).height(),this.canvas[0].width=this.canvasWidth,this.canvas[0].height=this.canvasHeight,this.active=!0,this.addWidth=0,this.addHeight=0},eventHandlers:function(){var t=this;this.follow&&$("body").on("mousemove",function(e){return t.mouseMove(e)}),$(window).on("resize",_.debounce(function(){return t.resize()},500)),$(this.image).on("load",function(){console.log("image loaded"),t.populateImageArray(),window.requestAnimationFrame(function(){return t.draw()})})},resize:function(){this.reset(),this.populateImageArray()},populateImageArray:function(){this.images=[];for(var t=-100;t<this.canvasWidth+100;t+=this.image.width)for(var e=-100;e<this.canvasHeight+100;e+=this.image.height)this.images.push({w:t,h:e})},draw:function(){var t=this;this.context.clearRect(0,0,this.canvasWidth,this.canvasHeight),this.move&&(this.addWidth+=1,this.addHeight+=1),this.images.forEach(function(e){var i=e.w+t.addWidth,n=e.h+t.addHeight,s=t.image.width,o=t.image.height;if(t.follow)var a=t.cursorX-i,r=t.cursorY-n,d=Math.atan2(r,a);else d=0;t.expand&&(s+=50,o+=50),t.drawRotatedImage(t.image,i,n,s,o,d)}),this.addWidth>this.image.width&&(this.addWidth=0),this.addHeight>this.image.height&&(this.addHeight=0),this.active&&window.requestAnimationFrame(function(){return t.draw()})},drawRotatedImage:function(t,e,i,n,s,o){this.context.translate(e,i),this.context.rotate(o),this.context.drawImage(t,-(n/2),-(s/2)),this.context.rotate(-o),this.context.translate(-e,-i)},mouseMove:function(t){this.cursorX=t.pageX,this.cursorY=t.pageY-$(document).scrollTop()},destroy:function(){this.active=!1,_get(Object.getPrototypeOf(_obj),"destroy",this).call(this)}};PatternBackground.init($(".js-pattern-background"));var colour="random",sparkles=500,x,ox=400,y,oy=300,swide=800,shigh=600,sleft,sdown=0,tiny=new Array,star=new Array,starv=new Array,starx=new Array,stary=new Array,tinyx=new Array,tinyy=new Array,tinyv=new Array;window.onload=function(){if(document.getElementById){for(var t,e,i,n,t=0;sparkles>t;t++){var e=createDiv(3,3);e.style.visibility="hidden",e.style.zIndex="999",document.body.appendChild(tiny[t]=e),starv[t]=0,tinyv[t]=0;var e=createDiv(5,5);e.style.backgroundColor="transparent",e.style.visibility="hidden",e.style.zIndex="999";var i=createDiv(1,5),n=createDiv(5,1);e.appendChild(i),e.appendChild(n),i.style.top="2px",i.style.left="0px",n.style.top="0px",n.style.left="2px",document.body.appendChild(star[t]=e)}set_width(),sparkle()}},document.onmousemove=mouse,window.onscroll=set_scroll,window.onresize=set_width;