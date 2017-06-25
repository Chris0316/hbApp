/**
 * Created by kim on 2017/5/24.
 */

export default {
  appInfo: {
    name: '华宝智投',
    desc: '专注股票智能交易',
    site: 'www.touker.com',
    version: '0.0.1',
    copyright: 'Copyright ©2017.HwaBao Securities Co.Ltd.,All Rights Reserved'
  },
  leanCloud: {
    appId: 'G1ooxgUmbxYegIkn1oF5cN71-gzGzoHsz',
    appKey: 'eDD28ddQiqUzF53Fl198PXQb'
  },
  apiDomain: 'https://kimbo.leanapp.cn/',
  //apiDomain: 'http://10.0.31.109:8080/',
  news: '<img src="http://img5.cache.netease.com/photo/0003/2015-08-12/B0Q7E98P00AJ0003.jpg"/><img src="http://img2.cache.netease.com/photo/0003/2015-08-12/B0Q7E9JJ00AJ0003.jpg"/><a href="http://10.0.31.109/h5" target="_blank">Local</a><br><a href="https://m.touker.com/account/login/index.htm" target="_blank">Login</a><br><br><a href="http://10.0.31.38:3000/h5" target="_blank">zhouhua -local</a><br><a href="http://10.0.31.109:8080/oauth#/oauth/login" target="_blank">local-hbec-oauth</a><br><br><a href="http://10.0.31.109:8080/#/oauth/forgetGuide" target="_blank">local-hbec-oauth-paste</a><br><br><a href="https://bbs.touker.com/tel:18016052872" target="_blank">打电话试试</a><br><br><a href="http://fd.dev.hbec.com/qq/faq_h5" target="_blank">qq faq</a><br>'
}

export const pageSize = 10;

export const storageKey = {
  OFFLINE_POSTS: "OFFLINE_POSTS",
  USER_TOKEN: "USER_TOKEN",
  TAIL_CONTENT: "TAIL_CONTENT",
  TAIL_ENABLED: "TAIL_ENABLED"
};