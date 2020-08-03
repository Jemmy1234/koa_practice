const koa = require('koa');
const router = require('koa-router');
const logger = require('koa-logger');
const koaBody = require('koa-body');
const apiRouter = require('./router/router');

const app = new koa();

// index
const index = router.get('/', ctx => {
    ctx.response.body = 'hello world';
}).routes();

app.use(index);
app.use(logger());
app.use(koaBody());
app.use(apiRouter.routes());
app.use(apiRouter.allowedMethods());

app.listen(3200);