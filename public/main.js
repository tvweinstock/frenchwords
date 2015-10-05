var key = "dict.1.1.20150926T134904Z.5614b0ab0a342b85.1a800440742fe955905574092e3e047fa02877b9";
var lang = "en-fr";
var url = "https://dictionary.yandex.net/api/v1/dicservice.json/lookup";

function getTranslate(text) {
  $.getJSON(url, {
    key: key,
    lang: lang,
    text: text
  }).done(setResponse);
}

function setResponse (response) {
  if (response.def.length === 0) {
    $('input:text').val('');
    $('.translation').text('');
    $('.encore').hide();
    $('.not-found').show();
  } else {
      $(".not-found").hide();
      $(".translation").text(response.def[0].tr[0].text);
      $(".encore").show();
  };
};

$(function(){
  $("#translate").on("submit", function(e){
    e.preventDefault();
    getTranslate(this.word.value);
  });

  $('button:reset').bind('click', function() {
    $('input:text').val('');
    $('.translation').text('');
    $('.not-found').hide();
  });
});
