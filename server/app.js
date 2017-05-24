/**
 * Created by kim on 2017/5/10.
 */

var app = require('koa')()
  , path = require('path')
  , cors = require('koa-cors')
  , json = require('koa-json')
  , session = require('koa-session')
  , bodyParser = require('koa-bodyparser')
  , send = require('koa-send')
  , appRouter = require('./router')
  , debug = require('debug')('react:app');
//cookie的加密串
app.keys = ['HBEC'];
app.use(session({
  //session 名称
  key: 'HBEC_SESSIONID',
  //过期时间:半个小时
  maxAge: 30 * 60 * 1000
}, app));
app.use(bodyParser());
app.use(json());
app.use(cors());

app.use(appRouter);

app.use(function*(next) {
  var pathUrl = this.path;
  yield send(this, pathUrl, {
    root: path.resolve(__dirname, '../')
  })
});

//处理页面未找到异常
app.use(function*(next) {
  if (this.status == 404) {
    this.body = '404'
  } else {
    yield next;
  }
});

//监听服务端异常信息
app.on('error', function (err) {
  debug(err);
});
module.exports = app;

