ls = {
	startup: function(){
    $(".canvas").click(function(event){
      // var offset = $(this).offset();
      // console.log(offset);
      // window.poho = event;
      var offset = $(this).offset();
      var xPos = event.clientX - offset.left - 10;
      var yPos = event.clientY - offset.top - 10;

      var tmp = $("<div class='led'></div>");
      tmp.css("margin-left", xPos+'px');
      tmp.css("margin-top", yPos+'px');
      // window.poho = tmp;
      $(".canvas").append(tmp);
    })
  }
}