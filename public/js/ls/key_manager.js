ls.keyManager = {
  shiftDown: false,
  keyup: function(keyCode){
    if(keyCode == 16) {ls.keyManager.shiftDown = false;}
  },
  keydown: function(keyCode){
    if(keyCode == 16) {ls.keyManager.shiftDown = true;}
    if(ls.mode == "edit" && ls.currentLed){
      if(keyCode == 37) {ls.keyManager.leftPressed();}
      if(keyCode == 38) {ls.keyManager.upPressed();}
      if(keyCode == 39) {ls.keyManager.rightPressed();}
      if(keyCode == 40) {ls.keyManager.downPressed();}
    }
  },
  leftPressed: function(){
    if(ls.keyManager.shiftDown){
      ls.currentLed.x -= 10;
    }else{
      ls.currentLed.x -= 1;
    }
    ls.redraw(ls.currentLed);
    ls.selectLed(ls.currentLed);
  },
  rightPressed: function(){
    if(ls.keyManager.shiftDown){
      ls.currentLed.x += 10;
    }else{
      ls.currentLed.x += 1;
    }
    ls.redraw(ls.currentLed);
    ls.selectLed(ls.currentLed);
  },
  upPressed: function(){
    if(ls.keyManager.shiftDown){
      ls.currentLed.y -= 10;
    }else{
      ls.currentLed.y -= 1;
    }
    ls.redraw(ls.currentLed);
    ls.selectLed(ls.currentLed);
  },
  downPressed: function(){
    if(ls.keyManager.shiftDown){
      ls.currentLed.y += 10;
    }else{
      ls.currentLed.y += 1;
    }
    ls.redraw(ls.currentLed);
    ls.selectLed(ls.currentLed);
  }
}