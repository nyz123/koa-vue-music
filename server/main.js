
import { generateUuid } from './src/util/uuid.js';
import { insert, query } from './src/dao/'
const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();
const koaBody = require('koa-body');
const fs = require('fs');
const path = require('path');
const serve = require('koa-static');
var NumberInt = require('mongoose-int32');

// const logger = require('koa-logger');
// const os = require('os');

const hostUpload = 'http://localhost:3000/upload/'
/**静态资源（服务端） */
app.use(serve(__dirname + "/html"));
app.use(koaBody({
    jsonLimit: '1kb',
    multipart: true,
    formidable: {
        maxFileSize: 200 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
    }
}));

router.get('/album', async (ctx, next) => {
    console.log(ctx.query)
    ctx.type = 'application/json;charset=utf-8'
    let res = await query('album', ctx.query);
    return ctx.body = res
})

router.get('/music', async (ctx, next) => {
    ctx.type = 'application/json;charset=utf-8'
    let res = await query('music', ctx.query);
    return ctx.body = res
})

router.get('/file', async (ctx, next) => {
    ctx.type = 'application/json;charset=utf-8'
    let res = await query('file', {});
    return ctx.body = res.map(item => {
        return {
            uid: item.uid,
            name: item.oname,
            url: item.name,
            updateTime: item.updateTime
        }
    })
})
router.post('/file', async (ctx, next) => {
    // 上传单个文件
    const file = ctx.request.files.file; // 获取上传文件
    let { size, type, } = file;
    let uid = generateUuid()
    let n = file.name.split('.'), name = uid + '.' + n[n.length - 1];
    let res = await insert('file', {
        uid,
        name,
        oname: file.name,
        size,
        deviceId: generateUuid(),
        updateTime: new Date().getTime(),
    });
    // TODO: 获取新增数据
    const reader = fs.createReadStream(file.path);// 创建可读流
    let filePath = path.join(__dirname) + `/html/upload/${name}`;
    const upStream = fs.createWriteStream(filePath);// 创建可写流
    reader.pipe(upStream);// 可读流通过管道写入可写流
    return ctx.body = {
        code: 0,
        data: `${res.name}`,
        message: '上传成功'
    };
});

router.post('/album', async (ctx, next) => {
    let { body } = ctx.request;
    let { type, albumCoverPath, albumTitle, albumUserNickName } = body;
    let res = await insert('album', {
        type, albumCoverPath,albumTitle, albumUserNickName,
        albumId: new Date().getTime() - new Date('2019-12-01'),
        albumPlayCount: Math.ceil(Math.random() * 100),//0-100
    });
    return ctx.body = {
        code: 0,
        data: res.albumId,
        message: '创建成功'
    }
})

router.post('/music', async (ctx, next) => {
    let { body } = ctx.request;
    let { trackName, trackCoverPath, albumId, src,duration } = body;
    let res = await insert('music', {
        trackName, trackCoverPath, albumId, src,duration,
        trackId: new Date().getTime() - new Date('2019-12-01'),
        createTime: new Date().getTime(),
        isLike:false
    });
    return ctx.body = {
        code: 0,
        data: res.trackId,
        message: '创建成功'
    }
})

app.use(router.routes());

app.listen(3000);
console.log('http://localhost:3000');