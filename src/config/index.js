export let AlbumTypeMap = {
    yinyue: "音 乐",
    ertong: "儿 童",
    xiangsheng: "相 声",
    youshengshu: "有声书",
    waiyu: "外 语",
    qinggan: "情 感",
    toutiao:'头 条',
    jiaoyu:'教 育'
}
let host = ''
if(process.env.NODE_ENV=='production'){
    host = 'http://47.105.205.36:3000/upload/'
}else{
    host = 'http://localhost:3000/upload/'
}
export let Host = host;