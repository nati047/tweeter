$(document).ready(function () {
  // create html elements for new tweets dynamicaly 
  const createTweetElement = (tweetObj) => {
    const $tweet = $(`<article class="tweets-container"></article>`);
    const $header = $(`<header class="tweet-header"></header>`);
    const $nameAndAvater = $(`<div class="name">
      <img src=${tweetObj["user"].avatars} width="50" height="50">&nbsp;${tweetObj["user"].name}
      </div>
      <h4 class="user-name">${tweetObj["user"].handle}</h4>`);

    const $paragraph = $(`<p calss="a-tweet" ></p>`);
    let textFromUser = `${tweetObj["content"].text}`;
    $paragraph.text(textFromUser);
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


  // add new tweets to main page 
  const renderTweets = function (tweetsArr) {
    for (let tweet of tweetsArr) {
      let $tweetArticle = createTweetElement(tweet);

      $("#tweet-articles-container").prepend($tweetArticle);
    }
  };



  const $form = $("#submit-form");
  // make ajax request on form submit 
  $form.on("submit", (event) => {
    event.preventDefault();
    $("#error-par").remove();           // remove previous error message p tag with id error-par
    const $userInput = $("#tweet-text").val();
    const $errorParagraph = $(`<p id="error-par"><i class="fa fa-warning"></i></p>`);
    let validate;
    for (let chars of $userInput) {
      if (chars !== " ") {
        validate = true;
        break;
      }
      else validate = false;
    }

    if (!$userInput || !validate) {   // check if user tried to submit empty form
      const errorMessage = "Type something to post!";
      $errorParagraph.append(errorMessage);
      $("#tweets-section").prepend($errorParagraph);
      $("#error-par").hide();
      $("#error-par").slideDown(1200);
    }

    else if ($userInput.length > 140) {  // check if user input is not more than allowed amount
      const errorMessage = "No more than 140 charachters allowed for tweets!";
      $errorParagraph.append(errorMessage);
      $("#tweets-section").prepend($errorParagraph);
      $("#error-par").hide();
      $("#error-par").slideDown(1200);
    }

    else {
      const $newTweet = $("#submit-form").serialize();
      $.ajax("/tweets", {
        method: "POST",
        data: $newTweet
      }).then(() => {
        $.ajax("/tweets", { method: "GET" })
          .then(function (data) {
            $.ajax("/tweets", {
              method: "GET"
            }).then(function (data) {
              $("#tweet-articles-container").empty();
              renderTweets(data);
            })
          })
        $("#tweet-text").val("")
      });

    }


  });
  // render tweets in database 
  const loadTweets = function () {
    $.ajax("/tweets", {
      method: "GET"
    }).then(function (data) {
      renderTweets(data);
    })
  }();
});



