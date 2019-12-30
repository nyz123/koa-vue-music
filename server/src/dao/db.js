import MongoClient from 'mongoose'
import { DB_CONF, COLORS } from '../config'

const DB_URL = DB_CONF.DB_URL;

export function connectMongo() {
  // 连接
  MongoClient.connect(DB_URL, {
    connectTimeoutMS: DB_CONF.TIMEOUT,
    keepAlive: DB_CONF.KEEP_ALIVE,
  });
  // 测试连接是否成功
  MongoClient.connection.on('connected', function () {
    console.log(COLORS.green[0], 'mongodb connection success !!! ')
  })

  // 连接异常的情况
  MongoClient.connection.on('error', function (er) {
    console.log(COLORS.red[0], 'connection error: ' + er);
  })

  // 连接断开
  MongoClient.connection.on('disconnected', function () {
    console.log(COLORS.green[0], 'mongodb disconnection')
  });
}

export function closeMongo(){
  MongoClient.connection.close();
}
