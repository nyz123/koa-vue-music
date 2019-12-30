import { getModel } from './modelConf.js';
import {connectMongo,closeMongo} from './db'
// http://blog.csdn.net/u022812849/article/details/51314810

// 查询操作
export async function query(model,data) {
  connectMongo()
  let res = await getModel(model).find(data, function (e, r) {
    closeMongo()
  })
  return res;
}

//模糊查询
export function getRegex(model,data){
  getModel(model).find(data, function (err, res) {
    if(err) {
      console.log('err' + err);
    } else {
      console.log('res:' + res)
    }
  })
}

//聚合查询
export function aggregate(model,data){
  getModel(model).aggregate(data, function (err, res) {
    if(err) {
      console.log('err' + err);
    } else {
      console.log('res:' + JSON.stringify(res))
    }
  })
}

// query('file',{});
// getRegex('user',{uname: {$regex: /yaobo/m}});
// aggregate('user',[{$group: {_id: '$uname', num: {$sum: 1}}}]);