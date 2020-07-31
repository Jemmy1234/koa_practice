const Koa = require('koa');
const Logger = require('koa-logger');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const fs = require('fs');
const path = require('path');

const app = new Koa();
const router = new Router();

function read(filename) {
    let fullpath = path.join(_dirname, filename);
    return fs.readFileSync(fullpath, 'binary');
}

// Router -> /
router.get('/', async(ctx) => {
    ctx.body = 'Hello Koa2 body';
});
// Router -> /ready
router.get('/ready', async(ctx) => {
    ctx.body = 'Ready Content';
});
// Router -> /admin
router.get('/admin', async(ctx) => {
    let name = ctx.query.name;
    let talk = ctx.query.talk;
    ctx.body =`<p>${name} : ${talk}</p>`;
});
// Login form
router.get('/login', async(ctx) => {
    ctx.body = `
        <form method="POST" action="/login">
            <label>UserName</label>
            <input name="user" /><br/>
            <button type="submit">submit</button>
        </form>
    `;
});
// Send form
router.post('/login', async(ctx) => {
    let user = ctx.request.body.user;
    ctx.body = `<p>Welcome, ${user}!</p>`;
});
// Auto load index.html
router.get('/page', async(ctx) => {
    ctx.body = read('index.html');
});

app.use(router.routes());
app.use(bodyParser());
app.listen(3000);