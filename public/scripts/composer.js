$(document).ready(function() {

  // handle new-tweet counter
  $('#tweet-text').on('input', function() {
    // Get length of text in text-area
    let value = $(this).val();
    let tweetLength = value.length;
    // Update counterNumber by subtracting tweetLength
    let counterNumber = 140;
    counterNumber -= tweetLength;
    // traverse up DOM tree to get the counter output
    let counter = $(this).closest("form").find(".counter");
    // update counter output to counterNumber
    counter.text(counterNumber);

    if (counterNumber < 0) {
      counter.addClass("red");
    } else {
      counter.removeClass("red");
    }
  });

  // handle up-toggle icon
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#up-toggle').fadeIn(400);
      $('.bounce').fadeOut(400);
    } else {
      $('.bounce').fadeIn(400);
      $('#up-toggle').fadeOut(400);
    }
  });

});
