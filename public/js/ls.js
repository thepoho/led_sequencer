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
    var tmp = led.getJqueryObject();
    ls.leds.push(led);

    $(".canvas").append(tmp);
  },
  redraw: function(led){
    $('.canvas .led').remove();
    $.each(ls.leds, function(idx, led){
      $(".canvas").append(led.getJqueryObject());
    })
  }
}

function LED(x,y,idx){
  this.x = x;
  this.y = y;
  this.idx = idx;

  this.getJqueryObject = function(){
    var tmp = $("<div class='led'></div>");
    tmp.css("margin-left", this.x+'px');
    tmp.css("margin-top", this.y+'px');
    return(tmp);
  }
}