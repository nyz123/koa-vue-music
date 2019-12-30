import MongoClient from 'mongoose'
import  * as Model from '../model/'

const Schema = MongoClient.Schema;
function setModel(name, obj) {
    return MongoClient.model(name, new Schema(obj), name);
}
// model 映射表
const map = {
    file: setModel('file', Model.File),
    album: setModel('album', Model.Album),
    music: setModel('music', Model.Music),
}
// 获取model
export function getModel(name) {
    return map[name];
}