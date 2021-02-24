/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// const moment = require('moment');

$(document).ready(function() {
  // Test / driver code (temporary). Eventually will get this from the server.
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  };
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
      <span>moment(tweetData.created_at).fromNow()</span>
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
  
});