
const router = require('koa-router')();
router.get('/album', async (ctx, next) => {
    console.log(ctx.query)
    ctx.type = 'application/json;charset=utf-8'
    let res = await query('album', ctx.query);
    return ctx.body = res
})

router.get('/music', async (ctx, next) => {
    ctx.type = 'application/json;charset=utf-8'
    let res = await query('music', {});
    return ctx.body = res
})

router.get('/file', async (ctx, next) => {
    ctx.type = 'application/json;charset=utf-8'
    let res = await query('file', {});
    return ctx.body = res.map(item => {
        return {
            uid: item.uid,
            name: item.oname,
            url: `${hostUpload}${item.name}`,
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
        updateTime: new Date(),
    });
    // TODO: 获取新增数据
    const reader = fs.createReadStream(file.path);// 创建可读流
    let filePath = path.join(__dirname) + `/html/upload/${name}`;
    const upStream = fs.createWriteStream(filePath);// 创建可写流
    reader.pipe(upStream);// 可读流通过管道写入可写流
    return ctx.body = {
        code:0,
        data:`${hostUpload}${res.name}`,
        message:'上传成功'
    };
});