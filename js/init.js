$(function(){
/*引用元 http://qiita.com/tonkatu_tanaka/items/99d167ded9330dbc4019*/
  var arg = new Object;
  var pair=location.search.substring(1).split('&');
  for(var i=0;pair[i];i++) {
    var kv = pair[i].split('=');
    arg[kv[0]]=kv[1];
  }
/*ここまで*/
  if(arg.text !== undefined){
    $("#aLang").val(numberToAsukaLang(arg.text));
  }
  $(".base").hide().fadeIn(1000);

  $("#aLang").on("change",function(){
//    console.log($("#aLang").val());
    var text = encodeURIComponent($("#aLang").val());
    var number = encodeURIComponent(asukaLangToNumber($("#aLang").val()));
//    console.log(text);
    var linkText = "https://twitter.com/intent/tweet?hashtags=AsukaLang&ref_src=twsrc%5Etfw&text="+text+"&tw_p=tweetbutton&url=http%3A%2F%2Fasuka-lang.azurewebsites.net%2F%3Ftext%3D"+number;
//    console.log(linkText);
    $("#tweetLink").attr("href",linkText);
  });

});

//ツイッター利用準備
!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');
