/*	

 *	jQuery AjaxGetContent 1.3.1
 *
 *
 *  Requires: jQuery BBQ, http://benalman.com/projects/jquery-bbq-plugin/
 *	
 *	More info at:
 *  www.implico.pl/lang-en/ajaxgetcontent_dynamic_ajax_website,7.html
 *	info@implico.pl
 *	
 *	Copyright (c) 2012 Implico Group
 *	www.implico.pl
 *
 *	Licensed under the MIT license.
 *	http://en.wikipedia.org/wiki/MIT_License
 */


(function(e){e.fn.ajaxGetContent=function(t){t=e.extend({requestParameter:"ajax_get_standard_content",baseUrl:"",useCache:true,forceBookmarkLinking:false,params:{},excludeAttr:{rel:"lightbox",rel:"nofollow"},onHrefCheck:function(e,t){return e.length>0&&(e.substr(e.length-1,1)=="/"||e.substr(e.length-5,5)==".html"||e.substr(e.length-4,4)==".php")},onElementCheck:function(e){return!e.hasClass("no-ajax-load")&&e.attr("rel")!="nofollow"},onSend:function(e){},onReceive:function(e,t){}},t);if(!e("body").data("ajaxGetContent"))e.fn.ajaxGetContent.usePushState=Boolean(!t.forceBookmarkLinking&&history.pushState);if(!e("body").data("ajaxGetContent"))e.fn.ajaxGetContent.cache=new Array;var n=this;e.fn.ajaxGetContent.lastClickedElement=null;e.fn.ajaxGetContent.lastClickedUrl=null;e.fn.ajaxGetContent.ajaxHandler=null;wasLoaded=true;var r=function(n,i){if(typeof n=="boolean"){if(e.fn.ajaxGetContent.ajaxHandler){e.fn.ajaxGetContent.ajaxHandler.abort();e.fn.ajaxGetContent.ajaxHandler=null}e.fn.ajaxGetContent.lastClickedUrl=i;if(t.useCache&&i in e.fn.ajaxGetContent.cache){t.onSend(i);r(e.fn.ajaxGetContent.cache[i],"success");return}var s=new Array;var o=new String;if(i.indexOf("?")>=0)o=i.substr(i.indexOf("?"));var u=e.deparam(o);e.each(u,function(e,t){s.push({name:e,value:t})});var a=e.fn.ajaxGetContent.lastClickedElement;var f=a&&a.data("options")?a.data("options"):t;e.each(f.params,function(t,n){if(a.is(t))e.each(n,function(e,t){s.push({name:e,value:t})})});t.onSend(i);s.push({name:t.requestParameter,value:"on"});e.fn.ajaxGetContent.ajaxHandler=e.ajax({url:i,data:s,type:"GET",success:r,error:r,context:this})}else{e.fn.ajaxGetContent.ajaxHandler=null;if(i=="success"){if(t.useCache&&e.fn.ajaxGetContent.lastClickedUrl){e.fn.ajaxGetContent.cache[e.fn.ajaxGetContent.lastClickedUrl]=n}}else{}t.onReceive(n,i)}};e.fn.ajaxGetContent.load=function(t){if(e.fn.ajaxGetContent.usePushState){if(t==null)t=location.href;history.pushState({},"",t);e(window).trigger("popstate")}else{if(t==null)t=e.param.fragment();if(e.param.fragment()!=t)jQuery.bbq.pushState(t,2);else r(true,t)}};e.fn.ajaxGetContent.scrollTo=function(t,n){var r=e("html").scrollTop();if(!r)r=e("body").scrollTop();if(n||r>e(t).offset().top){e("html,body").animate({scrollTop:e(t).offset().top},500)}};e.fn.ajaxGetContent.getCurrentUrl=function(){if(e.fn.ajaxGetContent.usePushState){var t=new String(location.href);var n=t.indexOf("//");n=n>=0?n+2:0;t=t.substr(t.indexOf("/",n));if(t.length==0)t="/";return t}else return e.param.fragment()};e.fn.ajaxGetContent.clearCache=function(){e.fn.ajaxGetContent.cache=new Array};var i=function(){e(window).bind(e.fn.ajaxGetContent.usePushState?"popstate":"hashchange",function(t){if(!(e.fn.ajaxGetContent.usePushState&&!wasLoaded))r(true,e.fn.ajaxGetContent.usePushState?location.href:t.fragment)});e("body").data("ajaxGetContent",true)};if(!e("body").data("ajaxGetContent"))i();e(window).load(function(){wasLoaded=false;setTimeout(function(){wasLoaded=true;if(!e.fn.ajaxGetContent.usePushState&&e.param.fragment()!=""){e(window).trigger("hashchange")}},1)});return this.each(function(n,r){$this=e(r);var s=$this.data("ajaxGetContent");var o=$this.attr("href");if(!o)return true;var u=new String;var a=location.href.substr(0,5)!="http:";var f=new String((a?"https://":"http://")+window.location.hostname);if(o.indexOf(f)==0)o=o.substr(f.length);if(o.indexOf("?")>=0){u=o.substr(o.indexOf("?"));o=o.substr(0,o.indexOf("?"))}var l=$this.attr("target");var c=o.indexOf("#")>=0||typeof l!=="undefined"&&l!==false;var h=t.onHrefCheck(o,u);var p=t.onElementCheck($this);var d=false;e.each(t.excludeAttr,function(e,t){if($this.attr(e)&&$this.attr(e).indexOf(t)==0){d=true;return}});var v=$this.get(0).onclick!=null;if(!s&&!c&&h&&p&&!d&&!v){$this.data("ajaxGetContent",true);$this.click(function(n){if(n&&n.which&&n.which!=1)return true;var r=new String(window.location.href);if(r.indexOf("#")>=0)r=r.substr(0,r.indexOf("#"));if(!e.fn.ajaxGetContent.usePushState){var s=t.baseUrl;if(s!=""){if(r!=s){location.href=s+"#"+o+u;return false}}}var a=e(this);a.data("options",t);e.fn.ajaxGetContent.lastClickedElement=a;if(e.fn.ajaxGetContent.usePushState){history.pushState({},"",o+u);e(window).trigger("popstate");if(o!=location.pathname){if(e.fn.ajaxGetContent.ajaxHandler){e.fn.ajaxGetContent.ajaxHandler.abort();e.fn.ajaxGetContent.ajaxHandler=null}e.fn.ajaxGetContent.usePushState=false;e(window).unbind("popstate");i()}}if(!e.fn.ajaxGetContent.usePushState)jQuery.bbq.pushState(o+u,2);return false})}})}})(jQuery)