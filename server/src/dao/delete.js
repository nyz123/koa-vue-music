import { getModel } from './modelConf.js';
import MongoClient from './db'

function remove(model,wherestr) {
  getModel(model).remove(wherestr, function (err, res) {
    if (err) {
      console.log('err:', err)
      MongoClient.connection.close()
    }
    if (res) {
      console.log('res', res)
      MongoClient.connection.close()
    }
  })
}

// remove('file',{size: '123'});