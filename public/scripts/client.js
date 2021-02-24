/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  // const moment = require('moment');

  // Test / driver code (temporary). Eventually will get this from the server.
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]


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
      <span>${Date(tweetData.created_at)}</span>
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
  
  renderTweets(data);
  



$('#tweet-form').on('submit', function(event) {
  // Prevent default behaviour (i.e. redirect)
  event.preventDefault();
  console.log('Submit Tweet');

  // Serialize the tweet content to submit to database
  console.log($(this).serialize());

});

});