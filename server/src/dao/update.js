import { getModel } from './modelConf.js';
import MongoClient from './db'
// https://www.cnblogs.com/zgwang24/articles/5531672.html
function update(model, wherestr, updatestr) {
  getModel(model).update(wherestr, updatestr, function (err, res) {
    if (err) {
      console.log('er:', err)
      MongoClient.connection.close()
    }
    if (res) {
      console.log('res', res)
      MongoClient.connection.close()
    }
  })
}

// update('file', { size: '123' }, { name: '神奇的造物主' });