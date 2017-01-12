/*
引用元
例のあれ（仮題） - JavaScriptでStringBuffer
http://reiare.net/blog/2010/11/15/javascript-de-stringbuffer/
*/
var StringBuffer = function(string) {
    this.buffer = [];

    this.append = function(string) {
        this.buffer.push(string);
        return this;
    };

    this.toString = function() {
        return this.buffer.join('');
    };

    if (string) {
        this.append(string);
    }
};
