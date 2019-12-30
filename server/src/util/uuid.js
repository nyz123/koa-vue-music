export function generateUuid(num) {
	num = num||32;
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < num; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    var uuid = s.join("");
    return uuid;
}

//产生随机数函数
function generateNumber(n){
    var rnd="";
    for(var i=0;i<n;i++)
        rnd+=Math.floor(Math.random()*10);
    return rnd;
}