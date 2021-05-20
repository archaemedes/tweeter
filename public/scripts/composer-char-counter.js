$(document).ready(() => {
  // This first script I wrote for the project uses vanillaJS DOM manipulation
  // and JQuery, this is to practice different ways of acheiving things. The
  // client.js file is much larger and all written in JQuery.
  const counter = document.getElementById("counter");
  
  // Event listener for for both keyup and keydown for more responsiveness
  $("#tweet-text").keyup(function(event) { // Function for changing counter num and color
    const elementName = this.name;
    const tweetBox = $(`textarea#${elementName}`).val();
    const charCount = 140 - tweetBox.length;
    counter.innerHTML = charCount;
    if (charCount < 0) {
      counter.style.color = "red";
    } else {
      counter.style.color = "#545149";
    };
  });
  $("#tweet-text").keydown(function(event) { // Function for changing counter num and color
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
