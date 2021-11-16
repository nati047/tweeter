$(document).ready(function() {
 
  const $textArea = $('.new-tweet');
  const $textInput = $('#tweet-text');
  
  $textArea.on('input', function() {
    const inputLength = $textInput.val().length;
    const charsLeft = 140 - inputLength;
    const counter= $(this).find(".counter");
    counter.val(charsLeft);
    if(counter.val() < 0){
      counter.addClass("negative-val").removeClass("counter");
    }
    
    console.log(charsLeft);
    console.log(counter.html())

   
  })
 


});

// $(this).parentsUntil(".new-tweet").find(".counter").html()