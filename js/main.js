var cc = 0;
var curColor = "";
var colors = ['#03A9F4','#F44336','#3F51B5'];
function colorChange(input){
if (input < (colors.length - 1)){cc += 1; curColor = colors[cc];}
    else {cc=0;
    curColor = colors[cc];}
}
$('#get-another-quote-button').on('click', function(e) {
    e.preventDefault();
    $.ajax({
        type: 'GET',
        url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
        success: function(data){
        var post = data.shift();
        $('#quote-title').text(post.title);
        $('#quote-content').html(post.content);
            
            if (typeof post.custom_meta !== 'undefined' && typeof post.custom_meta.Source !== 'undefined') {
          $('#quote-source').html('Source:' + post.custom_meta.Source);
        } else {
          $('#quote-source').text('');
        }
    },
        cache: false});
        colorChange(cc);
           $("button").css({"background-color":curColor});
    $("body").css({"background-color":curColor});
    $(".colorMe").css({"color":curColor});
    $(".colorMe a").css({"color":curColor});
    
});
