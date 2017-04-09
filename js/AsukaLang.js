var asukaLang = "飛宮二鳥".split("");
var aCharCounts = 4;

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
  var quatNums = new Array(aCharCounts);

  for(var i = 0; i < aCharCounts; i++){
    quatNums[i] = Math.floor(num / Math.floor(Math.pow(asukaLang.length, aCharCounts - 1 - i)));
    num = num % Math.floor(Math.pow(asukaLang.length, aCharCounts - 1 - i));
  }

  for(var i = 0; i < quatNums.length; i++){
    retBf.append(asukaLang[quatNums[i]]);
  }

  return retBf.toString();
}

function asukaLangToString(asukaText){
  var reg = new RegExp("[^"+(asukaLang.join(""))+"]","g");
  var asukaStr = asukaText.replace(reg, "");

  var byteList = new Array();

  for (var i = 0; i < asukaStr.length; i += aCharCounts){
      var aCharBytes = new Array(aCharCounts);
      for (var j = i; j < i + aCharCounts; j++){
          for(var k = 0; k < asukaLang.length; k++){
            if(asukaLang[k] == asukaStr.charAt(j)){
              aCharBytes[j - i] = k;
              break;
            }
          }
      }
      var pushCode = 0;
      for(var l = (aCharCounts - 1);l >= 0;l--){
        pushCode += aCharBytes[aCharCounts - 1 - l] * Math.pow(asukaLang.length,l);
      }
      byteList.push(pushCode);
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
  for(var i = 0; i < asukaLang.length;i++){
    reg = new RegExp(asukaLang[i],"g");
    tmp = tmp.replace(reg,""+i);
  }
  return tmp;
}

function numberToAsukaLang(number){
  var tmp = number;
  for(var i = 0; i < asukaLang.length;i++){
    tmp = tmp.replace(new RegExp(""+i,"g"),asukaLang[i]);
  }
  return tmp;
}
