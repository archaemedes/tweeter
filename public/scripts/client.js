/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Define the temporary object
$( document ).ready(function() {
  // Define the function that initializes the event handlers
  const hoverEffects = function(){
  // Creates shadow of tweet on hover
  $(".post").hover(function(){
    console.log('Hover registered');
    $(this).css("box-shadow", "5px 8px #888888");
  }, function(){
    $(this).css("box-shadow", "");
  });
  // Changes the color of the icons when hovered with mouse
  $(".retweet").hover(function(){
    $(this).css("color", "rgb(253, 197, 124)");
  }, function(){
    $(this).css("color", "");
  });
  $(".like").hover(function(){
    $(this).css("color", "rgb(253, 197, 124)");
  }, function(){
    $(this).css("color", "");
  });
  $(".flag").hover(function(){
    $(this).css("color", "rgb(253, 197, 124)");
  }, function(){
    $(this).css("color", "");
  });
  // Show the time since the tweet was made
  $(".date").html(timeago.format(1621204295892));
};
  const testData = [
    {
    user: {
    name: "Newton",
    avatars: "https://i.imgur.com/73hZDYK.png",
    handle: "@SirIsaac"
    },
    content: {
    text: "If I have seen further it is by standing on the shoulders of giants"
    },
    created_at: 1621301723252
    },
    {
    user: {
    name: "Descartes",
    avatars: "https://i.imgur.com/nlhLi3I.png",
    handle: "@rd"
    },
    content: {
    text: "Je pense , donc je suis"
    },
    created_at: 1621388123252
    }
    ];

  const renderTweets = function(tweets){
    let tweetID = 1;
    for (const item of tweets) {
      const tweet = createTweetElement(item, tweetID);
      tweetID = tweetID + 1;
      $('.tweet-feed').append(tweet);
    }
  };

  const loadTweets = function(){
    $.ajax('/tweets', {type: 'GET'})
    .then(function(tweetArray){
      renderTweets(tweetArray);})
    .then(function(){
      hoverEffects();
    });
  };

const createTweetElement = function(tweetData, tweetID) {
  const date = timeago.format(tweetData.created_at);
  let $tweet = `<article class='post'id="tweet-${tweetID}">
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


loadTweets();

$('.tweet-chars').on('submit', function(event){
  event.preventDefault();
  const tweet = `text${$('.tweet-chars').serialize().slice(10)}`;
  console.log(tweet);
  $.ajax({url: `/tweets/`, data: tweet, type: 'POST', contentType: 'application/x-www-form-urlencoded; charset=UTF-8'})
  .then((result)=>{console.log(result);})
  .catch((err)=>{console.log(err)});
});
});
