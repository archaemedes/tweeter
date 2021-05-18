$(document).ready(() => {
  const counter = document.getElementById("counter");
  $("#tweet-text").keyup(function(event) {
    const elementName = this.name;
    const tweetBox = $(`textarea#${elementName}`).val();
    const charCount = 140 - tweetBox.length;
    if (charCount < 0) {
      counter.style.color = "red";
    }
    counter.innerHTML = charCount;
    console.log(charCount);
    console.log(event.which);
  });
  $("#tweet-text").keydown(function(event) {
    const elementName = this.name;
    const tweetBox = $(`textarea#${elementName}`).val();
    const charCount = 140 - tweetBox.length;
    counter.innerHTML = charCount;
  })
});
