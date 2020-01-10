
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


app.use(router.routes());

app.listen(3000);
console.log('http://localhost:3000');