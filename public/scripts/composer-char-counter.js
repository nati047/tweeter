$(document).ready(function () {

  const $textArea = $('.new-tweet');
  const $textInput = $('#tweet-text');

  $textArea.on('input', function () {
    const inputLength = $textInput.val().length;
    const charsLeft = 140 - inputLength;
    const counter = $(this).find(".counter");
    counter.text(charsLeft);
    
    if (charsLeft < 0) {
      counter.addClass("negative-val");
    }
    else {
      counter.removeClass("negative-val")
    }
  })

});

