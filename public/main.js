var Dictionary = {
  params: {
    key: "dict.1.1.20150926T134904Z.5614b0ab0a342b85.1a800440742fe955905574092e3e047fa02877b9",
    lang: "en-fr",
    wrapper: $("search-wrapper"),
  },
  url: function(text) {
    return "https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key="+this.params.key+"&lang="+this.params.lang+"&text="+text.replace(/ /g, "+");
  },
  getTranslate: function(text) {
    $.get(this.url(text), function(data) {
      Dictionary.setResponse(data)
    })
  },
  setResponse: function(response) {
    if (response.def.length === 0) {
      $('.not-found').removeClass('hidden')
      $('button:submit').attr("disabled", true)
    } else {
        var translation = response.def[0].tr[0].text
            // isMasculine = !!(response.def[0].tr[1].gen === "m"),
            // gender = isMasculine ? "Masculine" : "Feminine"
            // console.log(response);
          $(".translation").text(translation)
          // gender && ($(".gender").text(gender))
          $('button:submit').attr("disabled", true)
          $('.encore').removeClass('hidden')

    }
  }
}
$(function(){
  $("#translate").on("submit", function(e){
    e.preventDefault()
    var word = $(this).find("[name=word]").val()
    Dictionary.getTranslate(word)
  })
})

$('button:reset').bind('click', function() {
  window.location.reload();
})
