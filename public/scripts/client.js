/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  // Render tweets from database on page
  loadTweets();

  // Posts user-submitted tweet to server
  $('#tweet-form').on('submit', function(event) {
  // Prevent default behaviour (i.e. redirect)
    event.preventDefault();
    // Get the tweet string
    let tweetText = $(this).children("#tweet-text").val();

    // Send alerts if tweet is empty or too long
    if (!tweetText) {
      errorDisplay('Empty Tweet! Add some text');
    } else if (tweetText.length > 140) {
      errorDisplay('That Tweet is too long! 140 characters max');
    } else {
      // Serialize the tweet content to submit to database
      const tweet = $(this).serialize();
      // post the tweet to server
      $.post('/tweets/', tweet)
        .done(function(result) {
          // Clear tweet form on submit
          $('#tweet-form').children("#tweet-text").val("");
          // Clear tweets-container
          $('#tweets-container').empty();
          // Load all the tweets (including the new one) from database
          loadTweets();
          // reset counter
          $('.counter').html('140');
          // hide validation error message if showing
          $('#error').slideUp();
        })
        .fail((err) => console.log(err.message));

    }
  });

  // hide the nav on scroll down in small viewports
  $(window).scroll(function() {
    if ($(window).width() < 768) {
      if ($(this).scrollTop() > 300) {
        $('nav').fadeOut();
      } else {
        $('nav').show();
      }
    }
  });

  $('.form-toggle').click(function() {
    if ($('#tweet-form').first().is(":hidden")) {
      $('#tweet-form').slideDown();
      $('#tweet-text').focus();
    } else {
      $('#tweet-form').slideUp();
    }
  });

});


// Helper functions:

// Reencodes potentially unsafe text in tweets to prevent XSS
const escapeTweetText = (tweetText) => {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(tweetText));
  return div.innerHTML;
};

const createTweetElement = (tweetData) => {
  let $tweet = `<article class="tweet">
  <header>
    <div class="username-and-image">
      <!-- User profile pic / avatar -->
      <img src="${tweetData.user.avatars}">
      <!-- User name -->
      <span>${tweetData.user.name}</span>
    </div>
    <div class="user-handle username-and-image">
      <span>${tweetData.user.handle}</span>
    </div>
  </header>
  <div class="tweet-content">
    <p>${escapeTweetText(tweetData.content.text)}</p>
  </div>
  <footer>
    <!-- Time posted -->
    <span>${moment(tweetData.created_at).fromNow()}</span>
    <!-- logos for flag, retweet, like -->
      <div class="icons">
      <img src="docs/flags.png">
      <img src="docs/retweet.png">
      <img src="docs/like.png">
    </div>
  </footer>
</article>`;
  return $tweet;
};
  
// fetches tweets from the server
const loadTweets = () => {
  $.get('/tweets/')
    .done(function(result) {
      renderTweets(result);
    })
    .fail((err) => console.log(err.message));
};

const renderTweets = (tweets) => {
  //loop through tweets
  for (let tweet of tweets) {
    // calls createTweetElement for each tweet
    const $tweet = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    $('#tweets-container').prepend($tweet);
  }
};

const errorDisplay = (text) => {
  $('#error-text').text(text);
  // Slide the error message into view
  $('#error').slideDown();
};