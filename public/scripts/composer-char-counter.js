$(document).ready(function() {
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
      counter.css({"color": "red"});
    }
  });

});
