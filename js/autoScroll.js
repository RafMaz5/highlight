//<![CDATA[
$(window).load(function(){
 var c=0;
 var test=true
 var obj,obj1,obj2,hgt,exp,shr;
 var speed=50;
if(window.addEventListener){
   window.addEventListener('load',init,false);
 }
else { 
if(window.attachEvent){
   window.attachEvent('onload',init);
  }
 }

function init(){
   obj=document.getElementById('expand');
   obj1=document.getElementById('container');
   hgt=document.getElementById('inner').offsetHeight;

   obj.style.display='block';
   obj1.className='';
   obj1.style.height=0;

obj.onclick=function(){
if(test==true){
   expandDiv();
   test=false;
 }
else {
   shrinkDiv();
   test=true;
   }
  }
 }

function expandDiv() {
   clearTimeout(shr);
   obj1.style.height=c+'px';
   obj1.className='brdr';
   obj.firstChild.nodeValue='shrink';
   obj.className='stop';

   c+=20;
if(c>=hgt) {
   c=hgt;
   clearTimeout(exp);
   return;
 }
   exp=setTimeout('expandDiv()',50);
 }

function shrinkDiv() {
   clearTimeout(exp);
   obj1.style.height=c+'px';
   obj.firstChild.nodeValue='expand';
   obj.className='go';

   c-=20;
if(c<0) {
   c=0;
   clearTimeout(shr);
   obj1.style.height=0;
   obj1.className='';
   return;
 }
   shr=setTimeout('shrinkDiv()',50);
 }
div = $('#container');
var temp;
var pos;
var scrollbol = true;
setInterval(function () {
    console.log(div.height());
    pos = div.scrollTop();
    if (temp === pos) {
        pos = 0;
    }
    if(scrollbol){
        div.scrollTop(pos + 1);
        temp = pos;
    }
}, 50)
$('#inner').on('mouseover', function(){
    scrollbol = false;
})
$('#inner').on('mouseout', function(){
    scrollbol = true;
})

});//]]> 
