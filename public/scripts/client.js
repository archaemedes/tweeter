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

  // Escape function to make string literals safe
  const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

  const renderTweets = function(tweets){
    $(".tweet-feed").empty();
    let tweetID = 1;
    for (const item of tweets) {
      const tweet = createTweetElement(item, tweetID);
      tweetID = tweetID + 1;
      $('.tweet-feed').prepend(tweet);
    }
  };

  const renderError = function(errorMSG){
    const error = createErrorElement(errorMSG);
    $('.tweet-error').empty();
    $('.tweet-error').addClass('tweet-error-active');
    $('.tweet-error').html(error).hide().slideDown("slow");
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
  const date = timeago.format(escape(tweetData.created_at));
  const handle = tweetData.user.handle.replace(/\s+/g, '')
  let $tweet = 
    `<article class='post'id="tweet-${escape(tweetID)}">
    <header class='tweet-name'>
    <span class='user'><img class='avatar' src="${escape(tweetData.user.avatars)}"><p class='name'>${escape(tweetData.user.name)}</p></span><span> </span><p class='handle'>${escape(handle)}</p>
    </header>
    <p class='tweet-content'>
    ${escape(tweetData.content.text)}
    </p>
    <div class='border'></div>
    <footer>
    <div class='tweet-date'>
    <span>${date}</span><span> </span><span class='options'><i class="fas fa-flag flag"></i><i class="fas fa-retweet retweet"></i><i class="fas fa-heart like"></i></span>
  </article>`;

  return $tweet;
};

const createErrorElement = function(error){
  let $error = 
   `<i class="fas fa-exclamation-triangle"></i>
    <p class='tweet-error-message'>${error}</p>
    <i class="fas fa-exclamation-triangle"></i>`
  return $error;
};


loadTweets();

// Create new tweet via POST
$('.tweet-chars').on('submit', function(event){
  event.preventDefault();
  const tweet = `${$('.tweet-chars').serialize().slice(11)}`;
  console.log(tweet);
  if (tweet.length > 140) {
    renderError('Error: Tweet was too long');
  };
  if (tweet.length === 0) {
    renderError('Error: Tweet was 0 characters long');
  };
  if (tweet.length <= 140 && tweet.length !== 0) {
    $('.tweet-error').empty();
    $('.tweet-error').removeClass('tweet-error-active');
  $.ajax({url: `/tweets/`, data: `text=${tweet}`, type: 'POST', contentType: 'application/x-www-form-urlencoded; charset=UTF-8'})
  .then((result)=>{
    loadTweets();
  })
  .catch((err)=>{console.log(err)});
  };
});
});
