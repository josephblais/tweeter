/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  // const moment = require('moment');

  const renderTweets = (tweets) => {
    //loop through tweets
    for (let tweet of tweets) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('#tweets-container').append($tweet);
    }
  };

  const createTweetElement = (tweetData) => {
    let now = moment();
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
      <p>${tweetData.content.text}</p>
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
    


  // Posts user-submitted tweet to server
  $('#tweet-form').on('submit', function(event) {
  // Prevent default behaviour (i.e. redirect)
    event.preventDefault();

    // Serialize the tweet content to submit to database
    const tweet = $(this).serialize();
    // post the tweet to server
    $.post('/tweets/', tweet)
      .done(function(result) {
        console.log('successfully posted to server');
      })
      .fail((err) => console.log(err.message));

    // Clear tweet form on submit
    $('#tweet-form').children("#tweet-text").val("");
  });

  // fetches tweets from the server
  const loadTweets = () => {
    $.get('/tweets/')
      .done(function(result) {
        renderTweets(result);
      })
      .fail((err) => console.log(err.message));
  };

  loadTweets();

});