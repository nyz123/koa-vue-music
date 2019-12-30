import * as PAGE from '../pages'

const routes = [
    { path: "*", redirect: "/home" },
    { name: 'home', title: "首 页", path: '/home', component: PAGE.home },
    { name: 'uploadAlbum', title: "增加歌单", path: '/uploadAlbum', component: PAGE.uploadAlbum },
    { name: 'uploadMusic', title: "增加歌曲", path: '/uploadMusic', component: PAGE.uploadMusic },
    { name: 'musicList', title: "歌曲列表", path: '/musicList', component: PAGE.musicList },
]
export default routes