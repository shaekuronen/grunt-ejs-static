;(function($) {

  if (Modernizr.touch) {

    // listen for a gesture does not trigger for touch events (one fingertip vs 2 or more fingertips for gesture)
    document.body.addEventListener("gesturestart", start_touch_event, false);
    // listen for orientation of device changing
    window.addEventListener("orientationchange", orientation_change, false);

    function orientation_change() {
      // the device orientation is portrait
      if (window.orientation == 0 || window.orientation == 180) {
        // sets maximum scale to 1 which locks down user resizing but also prevents resize bug on orientation change
        document.getElementById("viewport").setAttribute("content", "width=device-width, initial-scale=1.0, maximum-scale=1.0");
      }        
          
      // the device orientation is landscape
      else if (window.orientation == -90 || window.orientation == 90) {
        // sets maximum scale to 1 which locks down user resizing but also prevents resize bug on orientation change
        document.getElementById("viewport").setAttribute("content", "width=device-height, initial-scale=1.0, maximum-scale=1.0");
      } else {
      }               
    } 

    function start_touch_event() {
      // removes maximum scale 1 to allow user resizing
      document.getElementById("viewport").setAttribute("content", "width=device-width, minimum-scale=0.25, maximum-scale=1.6");
    }

  } else {
    console.log('touch events not supported');
  }



}(jQuery));
