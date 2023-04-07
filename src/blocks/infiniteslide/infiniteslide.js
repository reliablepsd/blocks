/*
infiniteslide.js v2
version: 2.0.1
Author: T.Morimoto

Copyright 2017, T.Morimoto
* Free to use and abuse under the MIT license.
* http://www.opensource.org/licenses/mit-license.php

https://github.com/woodroots/infiniteslidev2
*/
!function(n){n(function(){n.fn.infiniteslide=function(e){var t=n.extend({speed:100,direction:"left",pauseonhover:!0,responsive:!1,clone:1},e),r=function(e,i){if(n(e).wrap('<div class="infiniteslide_wrap"></div>').parent().css({overflow:"hidden"}),"up"==i||"down"==i)var t="column";else var t="row";n(e).css({display:"flex",flexWrap:"nowrap",alignItems:"center","-ms-flex-align":"center",flexDirection:t}).children().css({flex:"none",display:"block"})},o=function(e,t){var r=n(e).children().clone().addClass("infiniteslide_clone");for(i=1;i<=t;)r.clone().appendTo(n(e)),i++},a=function(e){return w=0,n(e).children(":not(.infiniteslide_clone)").each(function(){w+=n(this).outerWidth(!0)}),w},s=function(e){return h=0,n(e).children(":not(.infiniteslide_clone)").each(function(){h+=n(this).outerHeight(!0)}),h},l=function(n,e){return n/e},c=function(n,e){if("up"==e||"down"==e)var i=s(n);else var i=a(n);return i},f=function(n,e){if("up"==e||"down"==e)var i="0,-"+n+"px,0";else var i="-"+n+"px,0,0";return i},d=function(e,i,t,r){var o=c(e,t);"up"!=t&&"down"!=t||n(e).parent(".infiniteslide_wrap").css({height:o+"px"});var a=f(o,t);n(e).attr("data-style","infiniteslide"+i);var s="@keyframes infiniteslide"+i+"{from {transform:translate3d(0,0,0);}to {transform:translate3d("+a+");}}";if(n("<style />").attr("id","infiniteslide"+i+"_style").html(s).appendTo("head"),"right"==t||"down"==t)var d=" reverse";else var d="";n(e).css({animation:"infiniteslide"+i+" "+l(o,r)+"s linear 0s infinite"+d})},u=function(e){n(e).on("mouseenter",function(){n(this).css({animationPlayState:"paused"})}).on("mouseleave",function(){n(this).css({animationPlayState:"running"})})},p=function(n,e){var i=c(n,e),t=f(i,e);return t};return this.each(function(){var e=n(this),i=Date.now()+Math.floor(1e4*Math.random()).toString(16);1==t.pauseonhover&&u(e),n(window).on("load",function(){r(e,t.direction),o(e,t.clone),d(e,i,t.direction,t.speed),t.responsive&&n(window).on("resize",function(){var i=p(e,t.direction),r=e.attr("data-style"),o=n("#"+r+"_style").html(),a=o.replace(/to {transform:translate3d\((.*?)\)/,"to {transform:translate3d("+i+")");n("#"+r+"_style").html(a)})})})}})}(jQuery);

//  Need init function only after plugin
$(function(){
	$('.infiniteslide').infiniteslide({
			speed: 100,
			direction: 'left',
			pauseonhover: false
	});
});