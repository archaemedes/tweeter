/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  /*
  Functions & Declarations
  */

  // Define the function that initializes the event handlers
  const hoverEffects = function() {
    // Creates shadow of tweet on hover
    $(".post").hover(
      function() {
        $(this).css("box-shadow", "5px 8px #888888");
      },
      function() {
        $(this).css("box-shadow", "");
      }
    );
    // Changes the color of the icons when hovered with mouse
    $(".retweet").hover(
      function() {
        $(this).css("color", "rgb(253, 197, 124)");
      },
      function() {
        $(this).css("color", "");
      }
    );
    $(".like").hover(
      function() {
        $(this).css("color", "rgb(253, 197, 124)");
      },
      function() {
        $(this).css("color", "");
      }
    );
    $(".flag").hover(
      function() {
        $(this).css("color", "rgb(253, 197, 124)");
      },
      function() {
        $(this).css("color", "");
      }
    );
    $("#tweet").hover(
      function() {
        $(this).css("background-color", "rgb(253, 197, 124)");
      },
      function() {
        $(this).css("background-color", "");
      }
    );
  };

  // Escape function to make string literals HTML safe
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Called to generate a tweet element from passed in data
  const createTweetElement = function(tweetData, tweetID) {
    const date = timeago.format(escape(tweetData.created_at));
    const handle = tweetData.user.handle.replace(/\s+/g, "");
    let $tweet = `<article class='post'id="tweet-${escape(tweetID)}">
    <header class='tweet-name'>
    <span class='user'><img class='avatar' src="
    ${escape(tweetData.user.avatars)}"><p class='name'>
    ${escape(tweetData.user.name)}</p></span>
    <span> </span><p class='handle'>${escape(handle)}</p>
    </header>
    <p class='tweet-content'>
    <strong>
    ${escape(tweetData.content.text)}
    </strong>
    </p>
    <div class='border'></div>
    <footer>
    <div class='tweet-date'>
    <span>${date}</span><span> </span>
    <span class='options'><i class="fas fa-flag flag"></i><i class="fas fa-retweet retweet"></i>
    <i class="fas fa-heart like"></i></span>
  </article>`;

    return $tweet;
  };

  // renderTweets handles creating tweet elements populated from the database
  const renderTweets = function(tweets) {
    $(".tweet-feed").empty();
    let tweetID = 1;
    for (const item of tweets) {
      const tweet = createTweetElement(item, tweetID);
      tweetID = tweetID + 1;
      $(".tweet-feed").prepend(tweet);
    }
  };

  // Creates the HTML to be inserted into the DOM
  const createErrorElement = function(error) {
    let $error = `<i class="fas fa-exclamation-triangle"></i>
    <p class='tweet-error-message'>${error}</p>
    <i class="fas fa-exclamation-triangle"></i>`;
    return $error;
  };

  // Inserts the created error HTML into the DOM
  const renderError = function(errorMSG) {
    const error = createErrorElement(errorMSG);
    $(".tweet-error").empty();
    $(".tweet-error").addClass("tweet-error-active");
    $(".tweet-error").html(error).hide().slideDown("slow");
  };

  // Load tweets is the function that fetches the tweets from the data structure for rendering
  const loadTweets = function() {
    $.ajax("/tweets", { type: "GET" })
      .then(function (tweetArray) {
        renderTweets(tweetArray);
      })
      .then(function () {
        hoverEffects();
      });
  };

  /*
  Main thread
  */

  // Load tweets for rendering upon first pageload
  loadTweets();

  // Focuses on tweet text-area when compose in the navbar is clicked
  $(".navButton").on("click", function() {
    $("#tweet-text").focus();
  });

  // Create new tweet via POST
  $(".tweet-chars").on("submit", function(event) {
    event.preventDefault();
    const tweet = `${$(".tweet-chars").serialize().slice(11)}`;
    if (tweet.length > 140) {
      renderError("Error: Tweet was too long");
    }
    if (tweet.length === 0) {
      renderError("Error: Tweet was 0 characters long");
    }
    if (tweet.length <= 140 && tweet.length !== 0) {
      $(".tweet-error").empty();
      $(".tweet-error").removeClass("tweet-error-active");
      $.ajax({
        url: `/tweets/`,
        data: `text=${tweet}`,
        type: "POST",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      })
        .then((result) => {
          $("#tweet-text").val("");
          loadTweets();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
});
