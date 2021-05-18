// This script uses only JQuery DOM manipulation to practice its use.
$(document).ready(() => {
  // Creates shadow of tweet on hover
  $(".tweet-feed").hover(function(){
    $(this).css("box-shadow", "5px 8px #888888");
  }, function(){
    $(this).css("box-shadow", "");
  });
  // Changes the color of the icons when hovered with mouse
  $("#retweet").hover(function(){
    $(this).css("color", "rgb(253, 197, 124)");
  }, function(){
    $(this).css("color", "");
  });
  $("#like").hover(function(){
    $(this).css("color", "rgb(253, 197, 124)");
  }, function(){
    $(this).css("color", "");
  });
  $("#flag").hover(function(){
    $(this).css("color", "rgb(253, 197, 124)");
  }, function(){
    $(this).css("color", "");
  });
  // Show the time since the tweet was made
  $("#date").html(timeago.format(1621204295892));
});