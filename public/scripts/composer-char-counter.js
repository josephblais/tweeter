$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    let value = $(this).val();
    let tweetLength = value.length;

    let counterNumber = 140;
    counterNumber -= tweetLength;
    console.log(counterNumber);

    let counter = $(this).closest("form").find(".counter");
    counter.text(counterNumber);
  });
});
