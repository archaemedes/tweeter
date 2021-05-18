$(document).ready(() => {
  // Creates shadow of tweet on hover
  $(".tweet-feed").hover(function(){
    // On hover
    $(this).css("box-shadow", "5px 8px #888888");
  }, function(){
    // Off hover
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
});