/*
Window scrolling functions, so the user don't have to scroll so much
Set to use section class. 
Author: Daniel Tan (02/10/14)
*/
var main={
  anchorArr:["section"]
}

$(window).load(function(){
  var scroll =0;
  var anchor=findAnchor(main.anchorArr);
  var offset=0;
  function scrollNext(e){
    var movement=e.originalEvent.wheelDelta-offset;
    movement= movement < 0 ? 1 : -1;
    console.log(movement);
    scroll=clamp(scroll+movement,0,anchor.length-1);
    scrollToElement(anchor[scroll]);
  }
  //UGLY Hack to only use auto scroll 
  //when height is right
  var minheight=1900;
  var curheight=$(window).height();
  $(window).resize(function(){
    curheight=$(window).height();
  })
  //No support for firefox 
  $('body').bind('mousewheel', function(e){
    if (curheight<minheight){
      scrollNext(e);
      console.log("No prob");
      return false;
    }
  });
});
function findAnchor(jumpToArr){
  //Support for multiple class anchor
  var dir=[];
  $("."+jumpToArr.join(", .")).
    each(function(arg){
      dir.push($(this));
    })
  return dir;
}
function scrollToElement(ele) {
    $('html,body').animate({scrollTop: ele.offset().top-50, duration: 400});
}
function clamp(arg,start,end){
  if(arg<start){
    return start;
  }else if (arg>end){
    return end;
  }else{
    return arg;
  }
}