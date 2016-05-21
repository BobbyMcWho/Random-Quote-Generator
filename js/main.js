$(document).ready(function() {
  var cc = 0;
  var curColor = "";
  var colors = ['#03A9F4', '#F44336', '#3F51B5'];
  function colorChange(input) {
    if (input < (colors.length - 1)) {
      cc += 1;
      curColor = colors[cc];
    } else {
      cc = 0;
      curColor = colors[cc];
    }
  }

  function newQuote() {
    $.ajax({
      type: 'GET',
      dataType: "JSON",
      url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
      success: function(data) {
        var post = data.shift();
        $('#quote-title').html("&mdash; " + post.title);
        $('#quote-content').html(post.content);

        if (typeof post.custom_meta !== 'undefined' && typeof post.custom_meta.Source !== 'undefined') {
          $('#quote-source').html('Source:' + post.custom_meta.Source);
        } else {
          $('#quote-source').text('');

        }
      },
      cache: false,
      complete:function tweetIt () {
  var author = document.getElementById('quote-title').innerText || document.getElementById('quote-title').textContent;
        var quote = document.getElementById('quote-content').innerText || document.getElementById('quote-content').textContent;
  var tweetUrl = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(quote) + '-' +
    encodeURIComponent(author);
    $('#tweetButt').attr('href',tweetUrl);
  // window.open(tweetUrl);
}
    });
    colorChange(cc);
    $("i").css({
      "color": curColor
    });
    $("body").css({
      "background-color": curColor
    });
    $(".colorMe").css({
      "color": curColor
    });

    $(".colorMe a").css({
      "color": curColor
    });

    $(".qCon").fadeOut(100, "linear");
 setTimeout(function(){$(".qCon").fadeIn(800, "linear");},400);
    $(".colorMe").fadeOut(100, "linear");
      setTimeout(function(){$(".colorMe").fadeIn(800, "linear");},400);
    $('#ps').fadeOut(100, "linear");
     setTimeout(function(){$('#ps').fadeIn(800, "linear");},400);
  }  
  
   
  $('#get-another-quote-button').on('click', newQuote);
  newQuote();


    // $('#tweetButt').on('click', tweetIt);

  //Optional future wiki-author
  // function wikiIt() {
  //   var author = document.getElementById('quote-title').innerText;
  //   var wikiUrl = 'https://wikipedia.org/wiki/' +
  //     encodeURIComponent(author);
  //   window.open(wikiUrl);
  // }
  //$('#quote-title').on('click', wikiIt);

  // Optional future Google quote on click
  // function googleQuote() {
  //   var quote = document.getElementById('quote-content').innerText;
  //   var googleUrl = 'https://www.google.com/search?q=' +
  //     encodeURIComponent(quote);
  //   window.open(googleUrl);
  // }
  // $('#quote-content').on('click', googleQuote);
  $('body').keyup(newQuote);

});
