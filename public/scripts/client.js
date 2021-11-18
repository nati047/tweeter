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

  

const renderTweets = function(tweetsArr) {
  for( let tweet of tweetsArr) {
    let $tweetArticle = createTweetElement(tweet);
    $("#tweet-articles-container").prepend($tweetArticle);
  }
};



const $form = $("#submit-form");
$form.on("submit", (event) =>{
  event.preventDefault();
  const $userInput = $("#tweet-text").val();
  if(!$userInput) {
    alert("Tweet too short: Type something to tweet!");
  }
  else if($userInput.length > 140) {
    alert("Teweet too long: try less words!");
  }
  else {
    const $newTweet = $("#submit-form").serialize();
    $.ajax( "/tweets" ,{
    method: "POST", 
    data: $newTweet
    
    })
    .then(() => { $.ajax("/tweets", {
      method: "GET"
    }).then(function(data) {
      renderTweets(data);
    })
    $("#tweet-text").val("")

  });


  let tweetData = [ {
    "user": {
      "name": "Dead Pool",
      "avatars": "/images/deadpool.png",
      "handle": "@dead"
    },
    "content": {
      "text": ""
    },
    "created_at": 1637029335355
  }]

 }

});

const loadTweets = function() {
  $.ajax("/tweets", {
    method: "GET"
  }).then(function(data) {
    renderTweets(data);
  })
}();


});



