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

  // Next three functions handle up-toggle icon & form-toggle (both move focus to tweet-text on click)

  // Bottom arrow appears, top arrow disappears once the page is scrolled more than 100px
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#up-toggle').fadeIn(400);
      $('.bounce').fadeOut(400);
    } else {
      $('.bounce').fadeIn(400);
      $('#up-toggle').fadeOut(400);
    }
  });

  $('.form-toggle').click(function() {
    showHideTweetForm();
  });

  $('#up-toggle').click(function() {
    showHideTweetForm();
  });

});

// Show/hide #tweet-form and move focus to tweet input
const showHideTweetForm = () => {
  if ($('#tweet-form').first().is(":hidden")) {
    $('#tweet-form').slideDown();
    $('#tweet-text').focus();
  } else {
    $('#tweet-form').slideUp();
  }
};