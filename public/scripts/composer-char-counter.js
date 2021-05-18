$(document).ready(() => {
  console.log("Document is ready");

  const counter = document.getElementById("counter");

  $("#tweet-text").keyup(function(event) {
    const elementName = this.name;
    const tweetBox = $(`textarea#${elementName}`).val();
    const charCount = tweetBox.length;

    counter.innerHTML = 140 - tweetBox.length;
    console.log(charCount);
  });
});
