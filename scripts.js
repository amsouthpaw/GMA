$(document).ready(function() {

  $("#overlay, .close").click(function() {
    $("#overlay, #overlay_box").fadeOut();
    $("#overlay_box").children().fadeOut();
  });
  
  var ua = navigator.userAgent.toLowerCase();
  var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
  if(isAndroid) {
    $("a.store").attr("href", "https://play.google.com/store/apps/details?id=com.guardmyangel")
    $(".video_wrapper").wrap("<a href='http://m.youtube.com/watch?v=oq-iCdrMFrg' target='blank' />")
  }
    
  if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
    $("a.store").click(function() {
      $(".coming_soon, .close, form").show();
      $("#overlay").fadeIn();
      $("#overlay_box").delay(400).fadeIn();
    });
    
    $(".video_wrapper").wrap("<a href='http://m.youtube.com/watch?v=oq-iCdrMFrg' target='blank' />")
  };
  
  if((!isAndroid && !navigator.userAgent.match(/iPhone/i)) && !(navigator.userAgent.match(/iPod/i))) {
    $("a.store").click(function() {
      $("button.store, .store_links").fadeOut(200);
      $("button.ios, button.android").delay(400).fadeIn(200);
    });
    
    $("button.ios, .ios_link").click(function() {
      $(".coming_soon, .close, form").show();
      $("#overlay").fadeIn();
      $("#overlay_box").delay(400).fadeIn();
    });
    
    $(".video_wrapper").click(function() {
      $("#overlay").fadeIn();
      $(".intro_movie, .close").show();
      $("#overlay_box").delay(400).fadeIn();
    });
  }
  
  /*
   * @author       Rob W (http://stackoverflow.com/a/7513356/938089
   * @description  Executes function on a framed YouTube video (see previous link)
   *               For a full list of possible functions, see:
   *               http://code.google.com/apis/youtube/js_api_reference.html
   * @param String frame_id The id of (the div containing) the frame
   * @param String func     Desired function to call, eg. "playVideo"
   * @param Array  args     (optional) List of arguments to pass to function func*/
  function callPlayer(frame_id, func, args) {
      if (window.jQuery && frame_id instanceof jQuery) frame_id = frame_id.get(0).id;
      var iframe = document.getElementById(frame_id);
      if (iframe && iframe.tagName.toUpperCase() != 'IFRAME') {
          iframe = iframe.getElementsByTagName('iframe')[0];
      }
      if (iframe) {
          // Frame exists, 
          iframe.contentWindow.postMessage(JSON.stringify({
              "event": "command",
              "func": func,
              "args": args || [],
              "id": frame_id
          }), "*");
      }
  }
  
  $(".close").click(function() {
    callPlayer("intro_movie", "pauseVideo");
  })
  
  $('[placeholder]').focus(function() {
    var input = $(this);
    if (input.val() == input.attr('placeholder')) {
      input.val('');
      input.removeClass('placeholder');
    }
  }).blur(function() {
    var input = $(this);
    if (input.val() == '' || input.val() == input.attr('placeholder')) {
      input.addClass('placeholder');
      input.val(input.attr('placeholder'));
    }
  }).blur();
  
  $('[placeholder]').parents('form').submit(function() {
    $(this).find('[placeholder]').each(function() {
      var input = $(this);
      if (input.val() == input.attr('placeholder')) {
        input.val('');
      }
    })
  });
  
})