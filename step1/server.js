const Koa = require('koa');
const Logger = require('koa-logger');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

//response
app.use(Logger());
app.use((ctx,next) => {
    const start_time = Date.now();
    return next().then(() => {
        const ms = Date.now() - start_time;
        console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
    });
});

app.listen(3000);