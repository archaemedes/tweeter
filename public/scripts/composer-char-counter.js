$(document).ready(() => {
  // This first script I wrote for the project uses vanillaJS DOM manipulation
  // and JQuery, this is to practice different ways of acheiving things.
  const counter = document.getElementById("counter");
  $("#tweet-text").keyup(function(event) {
    const elementName = this.name;
    const tweetBox = $(`textarea#${elementName}`).val();
    const charCount = 140 - tweetBox.length;
    counter.innerHTML = charCount;
    console.log(charCount);
    console.log(event.which);
  });
  $("#tweet-text").keydown(function(event) {
    const elementName = this.name;
    const tweetBox = $(`textarea#${elementName}`).val();
    const charCount = 140 - tweetBox.length;
    counter.innerHTML = charCount;
    if (charCount < 0) {
      counter.style.color = "red";
    } else {
      counter.style.color = "#545149";
    };
  })
});
