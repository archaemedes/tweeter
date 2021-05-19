/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Define the temporary object
$( document ).ready(function() {
const defTweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1421216985729
};

const date = timeago.format(defTweetData.created_at);

const createTweetElement = (tweetData) => {
  return `<article class='post'id="tweet-2">
      <header class='tweet-name'>
        <span class='user'><img class='avatar' src="${tweetData.user.avatars}"><p class='name'>${tweetData.user.name}</p></span><span> </span><p class='handle'>${tweetData.user.handle}</p>
      </header>
  <p class='tweet-content'>
  ${tweetData.content.text}
  </p>
  <div class='border'></div>
  <footer>
    <div class='tweet-date'>
      <span>${date}</span><span> </span><span class='options'><i class="fas fa-flag flag"></i><i class="fas fa-retweet retweet"></i><i class="fas fa-heart like"></i></span>
    </article>`
};

const tweet = $(createTweetElement(defTweetData));

$('.tweet-feed').append(tweet);
});
