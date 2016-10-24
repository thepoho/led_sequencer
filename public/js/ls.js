ls = {
  mode: 'place',
  leds: [],
  sequences: [],
  currentLed: null,
  currentFrame: 0,
  currentSequence: null,

  startup: function(){
    var seq = new Sequence('default');
    ls.sequences.push(seq);
    ls.currentSequence = seq;

    $("label.place_edit").click(function(){
      ls.mode = $(this).find('input').val();
    });

    $(".canvas").click(function(event){
      if(ls.mode == 'place'){
        ls.placeLed(event);
      }
    });
    $("input.details_x").change(function(){
      if(ls.currentLed && ls.mode == 'edit'){
        ls.currentLed.x = $(this).val();
        ls.redraw(ls.currentLed);
      }
    });
    $("input.details_y").change(function(){
      if(ls.currentLed && ls.mode == 'edit'){
        ls.currentLed.y = $(this).val();
        ls.redraw(ls.currentLed);
      }
    });
    $("input.name").change(function(){
      if(ls.currentLed && ls.mode == 'edit'){
        ls.currentLed.name = $(this).val();
      }
    });
    $("input.colour").spectrum({
      change: ls.colourChanged,
      move: ls.colourChanged,
      showPalette: true,
      color: 'black',
      preferredFormat: "hex"
    });
    $("button.add_frame").click(function(){
      ls.addFrame();
    });

    $("button.next_frame").click(function(){

    })
    $("button.previous_frame").click(function(){
    });

  },

  placeLed: function(event){
    var offset = $('.canvas').offset();
    // the -10 is because my LED is 20x20 px
    var xPos = parseInt(event.clientX - offset.left - 10);
    var yPos = parseInt(event.clientY - offset.top  - 10);

    var led = new LED(xPos, yPos, ls.leds.length);
    ls.leds.push(led);
    ls.setCurrentLedColour(led, $("input.colour").val());

    ls.drawLed(led);
  },

  redraw: function(led){
    if(led == undefined){
      $('.canvas .led').remove();
      $.each(ls.leds, function(idx, led){
        ls.drawLed(led);
      });
    }else{
      $('.canvas .led[data-idx='+led.idx+']').remove();
      ls.drawLed(led);
    }
  },

  drawLed: function(led){
    var tmp = led.getJqueryObject(ls.currentFrame);
    tmp.css("background-color", ls.getCurrentLedColour(led));
    tmp.click(function(){
      ledObj = ls.leds[parseInt($(this).attr('data-idx'))];
      ls.selectLed(ledObj);
    });
    if(led == ls.currentLed){
      tmp.addClass('selected');
    }
    $(".canvas").append(tmp);
  },

  selectLed: function(led){
    if(ls.mode != 'edit'){
      return;
    }
    ls.currentLed = led;
    $(".canvas .led").removeClass("selected");
    $('.canvas .led[data-idx='+led.idx+']').addClass("selected");

    $("input.details_x").val(led.x);
    $("input.details_y").val(led.y);
    $("input.name").val(led.name);
  },
  colourChanged: function(colour){
    if(ls.currentLed && ls.mode == 'edit'){
      var hs = colour.toHexString();
      ls.setCurrentLedColour(ls.currentLed, hs);
      ls.redraw(ls.currentLed);
    }
  },
  addFrame: function(){
    if(ls.mode == 'edit'){
      ls.lastFrame += 1;
      $.each(ls.leds, function(idx, led){
        ls.addFrame(led);
      })
      $("input.total_frames").val(ls.lastFrame+1);
    }
  },
  setCurrentLedColour: function(led, colour){
    ls.currentSequence.setFrameLedColour(ls.currentFrame, led, colour);
  },
  getCurrentLedColour: function(led){
    return(ls.currentSequence.getFrameLedColour(ls.currentFrame, led));
  }
}

//--- Classes ---
function LED(x,y,idx){
  this.x       = x;
  this.y       = y;
  this.idx     = idx;
  this.name    = idx;

  this.getJqueryObject = function(frame){
    var tmp = $("<div class='led'></div>");
    tmp.attr('data-idx', this.idx)
    tmp.css("margin-left", this.x+'px');
    tmp.css("margin-top", this.y+'px');

    return(tmp);
  };
}

function Sequence(name){
  this.name   = name;
  this.frames = [];
  this.addFrame = function(){
    var newFrame = new Frame();
    var lastFrame = frames[frames.length-1];
    if(lastFrame){
      $.each(lastFrame.data, function(k,v){
        newFrame.data[k] = v;
      });
    }
    this.frames.push(newFrame);
  };
  this.setFrameLedColour = function(frame, led, colour){
    this.frames[frame].setLedColour(led, colour);
  };
  this.getFrameLedColour = function(frame, led){
    return(this.frames[frame].getLedColour(led));
  };
  this.addFrame();
}

function Frame(){
  this.data = {};
  this.setLedColour = function(led, colour){

    this.data[led.idx] = colour;
  };
  this.getLedColour = function(led){
    var ret = this.data[led.idx];
    if(ret == null){
      ret = '#000000'
    }
    return(ret);
  };
}
