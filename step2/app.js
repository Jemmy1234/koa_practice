const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
const logger = require('koa-logger');

const app = new Koa();
const router = new Router({
    prefix: '/api'
});

app.use(koaBody());

router.get('/login', async(ctx) => {
    ctx.body = `
        <form method="POST" action="/api/login">
            <label>UserName</label>
            <input name="usr" /><br/>
            <button type="submit">submit</button>
        </form>
    `;
});

router.post('/login', async(ctx) => {
    console.log(ctx.request.body);
    let reqInfo = ctx.request.body.usr;
    ctx.body = `<p>Welcome - ${reqInfo}</p>`;
});

router.get('/', async(ctx) => {
    ctx.body = 'Hello Koa2';
});

router.get('/about', async(ctx) => {
    ctx.body = 'About me';
});

router.get('/user', async(ctx) => {
    let fn = ctx.query.firstName;
    let ln = ctx.query.lastName;
    ctx.body = `User Info - ${fn} ${ln}`;
});

app.use(logger());
router.get('/time', async(ctx, next) => {
    ctx.body = 'Hello koa2 time~~';
    let startTime = new Date();
    await next();
    let endTime = new Date() - startTime;
    console.log(`${ctx.method} ${ctx.url} - ${endTime}ms`);
});

app.use(router.routes());
app.listen(3200);