/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Define the temporary object
$( document ).ready(function() {
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1621224137011
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1621310537011
  }
];

const createTweetElement = function(tweetData) {
  const date = timeago.format(tweetData.created_at);

  let $tweet = `<article class='post'id="tweet-2">
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
</article>`;

  return $tweet;
};

const renderTweets = function(tweets){
  for (const item of tweets) {
    const tweet = createTweetElement(item);
    $('.tweet-feed').append(tweet);
    console.log(tweet);
  }
};

renderTweets(data);
});
