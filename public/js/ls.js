ls = {
  mode: 'place',
  leds: [],
	startup: function(){
    $("label.place_edit").click(function(){
      ls.mode = $(this).find('input').val();
    });

    $(".canvas").click(function(event){
      if(ls.mode == 'place'){
        ls.placeLed(event);
      }
    });
  },
  placeLed: function(event){
    var offset = $('.canvas').offset();
    // the -10 is because my LED is 20x20 px
    var xPos = event.clientX - offset.left - 10;
    var yPos = event.clientY - offset.top  - 10;

    var led = new LED(xPos, yPos, ls.leds.length);
    ls.leds.push(led);

    ls.drawLed(led);
  },

  redraw: function(led){
    if(led == undefined){
      $('.canvas .led').remove();
      $.each(ls.leds, function(idx, led){
        ls.drawLed(led);
      })
    }else{
      $('.canvas .led[data-idx='+led.idx+']').remove();      
    }
  },
  drawLed: function(led){
    var tmp = led.getJqueryObject();
    tmp.click(function(){
      ls.selectLed($(this));
    });
    $(".canvas").append(tmp);
  }
}

function LED(x,y,idx){
  this.x = x;
  this.y = y;
  this.idx = idx;

  this.getJqueryObject = function(){
    var tmp = $("<div class='led'></div>");
    tmp.attr('data-idx', this.idx)
    tmp.css("margin-left", this.x+'px');
    tmp.css("margin-top", this.y+'px');

    return(tmp);
  }
}