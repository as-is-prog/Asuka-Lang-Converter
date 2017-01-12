var asukaLang = [ "飛", "宮", "二", "鳥" ];

/*引用元
JavaScriptコードスニペット：文字列_=_UTF-8バイト配列の変換 [松林堂_shorindo.com]
http://shorindo.com/research/1308637883
textToUtf8Arrayの処理部分をお借りしました。
*/
function textToUtf8Array(text) {
  var result = [];
  if (text == null)
      return result;
  for (var i = 0; i < text.length; i++) {
      var c = text.charCodeAt(i);
      if (c <= 0x7f) {
          result.push(c);
      } else if (c <= 0x07ff) {
          result.push(((c >> 6) & 0x1F) | 0xC0);
          result.push((c & 0x3F) | 0x80);
      } else {
          result.push(((c >> 12) & 0x0F) | 0xE0);
          result.push(((c >> 6) & 0x3F) | 0x80);
          result.push((c & 0x3F) | 0x80);
      }
  }
  return result;
}

//文字列をShift-jisのバイト配列に変換する
function textToSjisArray(text){
  var sjisArray = Encoding.convert(textToUtf8Array(text),"SJIS");
  return sjisArray;
}

//byte配列を飛鳥言語に変換する
function byteArrayToAsukaLang(byteArray){
  var retBf = new StringBuffer("");
  for(var i = 0;i < byteArray.length;i++){
    retBf.append(byteToAsukaLang(byteArray[i]));
  }
  return retBf.toString();
}

//一つのバイト変数を4進法敵に飛鳥言語に変換する
function byteToAsukaLang(byteNum){
  var retBf = new StringBuffer("");
  var num = byteNum;
  var quatNums = [0,0,0,0];

  for(var i = 0; i < 4; i++){
    quatNums[i] = Math.floor(num / Math.floor(Math.pow(4, 3 - i)));
    num = num % Math.floor(Math.pow(4, 3 - i));
  }

  for(var i = 0; i < quatNums.length; i++){
    retBf.append(asukaLang[quatNums[i]]);
  }

  return retBf.toString();
}

function asukaLangToString(asukaStr){
  var byteList = new Array();

  for (var i = 0; i < asukaStr.length; i += 4){
      var aCharBytes = [0,0,0,0];
      for (var j = i; j < i + 4; j++){
          switch (asukaStr.charAt(j)){
              case '二':
                  aCharBytes[j - i] = 2;
                  break;
              case '宮':
                  aCharBytes[j - i] = 1;
                  break;
              case '飛':
                  aCharBytes[j - i] = 0;
                  break;
              case '鳥':
                  aCharBytes[j - i] = 3;
                  break;
          }
      }
      byteList.push((aCharBytes[0] * 64) + (aCharBytes[1] * 16) + (aCharBytes[2] * 4) + aCharBytes[3]);
  }
  var utf8ByteList = Encoding.convert(byteList,{
    to: "UNICODE",
    from: "SJIS"
  });
  return Encoding.codeToString(utf8ByteList);
}

function plainConvertButtonClick(){
  document.alf.aLang.value = byteArrayToAsukaLang(textToSjisArray(document.alf.plain.value));
  $("#aLang").change();
}

function asukaLangConvertButtonClick(){
  document.alf.plain.value = asukaLangToString(document.alf.aLang.value);
}

function plainClearButtonClick(){
  document.alf.plain.value = "";
}

function asukaLangClearButtonClick(){
  document.alf.aLang.value = "";
}

function asukaLangToNumber(aLang){
  var tmp = aLang;
  tmp = tmp.replace(/飛/g,"0");
  tmp = tmp.replace(/宮/g,"1");
  tmp = tmp.replace(/二/g,"2");
  tmp = tmp.replace(/鳥/g,"3");
  return tmp;
}

function numberToAsukaLang(number){
  var tmp = aLang;
  tmp = tmp.replace(/0/g,"飛");
  tmp = tmp.replace(/1/g,"宮");
  tmp = tmp.replace(/2/g,"二");
  tmp = tmp.replace(/3/g,"鳥");
  return tmp;
}
