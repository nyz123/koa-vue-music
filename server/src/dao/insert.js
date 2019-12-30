import { getModel } from './modelConf.js';
import { connectMongo, closeMongo } from './db'

// 插入数据
export async function insert(model, userInfo) {
  let code;
  connectMongo()
  let m = new getModel(model)(userInfo)
  try {
    let res = await m.save()
    closeMongo()
    return res;
  } catch (e) {
    closeMongo()
  }
}