ls.serializer = {
  serialzeLocations: function(){
    ret = [];
    $.each(ls.leds, function(idx, led){
      ret.push(led.serialize());
    });
    return(ret);
  },

}