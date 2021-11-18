/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {

  const createTweetElement = (tweetObj) => {
    const $tweet = $(`<article class="tweets-container"></article>`);
    const $header = $(`<header class="tweet-header"></header>`);
    const $nameAndAvater = $(`<div class="name">
      <img src=${tweetObj["user"].avatars} width="50" height="50">&nbsp;${tweetObj["user"].name}
      </div>
      <h4 class="user-name">${tweetObj["user"].handle}</h4>`);

    const $paragraph = $(`<p calss="a-tweet" >${tweetObj["content"].text}</p>`)
    const $footer = $(`<footer class="foot-text">
    <div class="icons">
      <i class="fa fa-flag" aria-hidden="true"></i>
      <i class="fa fa-retweet" aria-hidden="true"></i>
      <i class="fa fa-heart" aria-hidden="true"></i>
      </div>
    </footer>`);
    const timeAgo = timeago.format(tweetObj["created_at"]);
    const $footTimeStamp = $(`<div class="time-stamp">${timeAgo}</div>`)

    $tweet.append($header);
    $tweet.append($paragraph);
    $tweet.append($footer);
    $header.append($nameAndAvater);
    $footer.prepend($footTimeStamp);

    return $tweet;
  };

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

const renderTweets = function(tweetsArr) {
  for( let tweet of tweetsArr) {
    let $tweetArticle = createTweetElement(tweet);
    $(".new-tweet").append($tweetArticle);
  }
};
renderTweets(data);

// const $form = $(".submission-form")
const $form = $("#submit-form");
$form.on("submit", (event) =>{
  event.preventDefault();
  
  const $newTweet = $("#submit-form").serialize();
  $.ajax( "/tweets" ,{
   method: "POST", 
   data: $newTweet
  
  })
  .then((result) => {
    console.log('ajax callback called');
  
  })
  .catch(err => {
    console.log('ajax error caught');
    console.log(err); 
  });
});


});



