const formidable = require('formidable');

let indexId = 0;
let userDataList = [];

class UserController {
    // reg
    async addUserData(ctx, next) {
        await new Promise((resolve, reject) => {
            let name, email, pw = undefined;
            if (ctx.headers['content-type'].indexOf('multipart/form-data') == -1) {
                console.log('1');
                name = ctx.request.body.name;
                email = ctx.request.body.email;
                pw = ctx.request.body.pw;
                resolve([name, email, pw]);
            } else {
                console.log('2');
                let form = formidable({ multiples: true });
                form.parse(ctx.req, (err, fields, files) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    name = fields.name;
                    email = fields.email;
                    pw = fields.pw;
                    resolve([name, email, pw]);
                });
            }
        }).then(result => {
            console.log(result);
            let name = result[0];
            let email = result[1];
            let pw = result[2];

            if (name && email && pw) {
                let userName = name;
                let userMail = email;
                let userPw = pw;

                userDataList.push({
                    userId: ++indexId,
                    userName: userName,
                    userMail: userMail,
                    userPw: userPw,
                    createTime: new Date(),
                });

                ctx.set('Content-Type', 'application/json');
                ctx.status = 201;
                ctx.body = {
                    stat: 'ok',
                    result: indexId,
                };
            } else {
                ctx.status = 400;
            }
        });
    }

    // login check
    async login(ctx, next) {
        const { email } = ctx.request.body;
        const { pw } = ctx.request.body;

        if (email && pw) {
            let userMail = email;
            let userPw = pw;

            const newUserData = userDataList.find((item) =>
                (item.userMail === userMail && item.userPw === userPw));

            if (newUserData) {
                ctx.body = {
                    stat: 'ok',
                    result: newUserData,
                };
            } else {
                ctx.status = 404;
            }
        } else {
            ctx.status = 404;
        }
    }

    // get user data
    async getUserData(ctx, next) {
        const userId = parseInt(ctx.params.id);

        if (userId) {
            const newUserDataList = userDataList.find(
                (item) => item.userId === userId);

            if (newUserDataList) {
                ctx.body = {
                    stat: 'ok',
                    result: newUserDataList,
                };
            } else {
                ctx.status = 404;
            }
        } else {
            ctx.status = 404;
        }
    }

    // modified user data
    async modifiedUserData(ctx, next) {
        const userId = parseInt(ctx.params.id);
        const method = ctx.params.method;

        if (userId && method === 'edit') {
            const { name } = ctx.request.body;
            const { email } = ctx.request.body;
            const { interest } = ctx.request.body;

            if (name && email && interest) {
                let userName = name;
                let userMail = email;
                let userInterest = interest;

                const newUserDataList = userDataList.find(
                    (item) => item.userId === userId);

                if (newUserDataList) {
                    newUserDataList.userName = userName;
                    newUserDataList.userMail = userMail;
                    newUserDataList.userInterest = userInterest;
                    newUserDataList.modifiedTime = new Date();

                    ctx.body = {
                        stat: 'ok',
                        result: newUserDataList
                    };
                } else {
                    ctx.status = 404;
                }
            } else {
                ctx.status = 404;
            }
        } else {
            ctx.status = 404;
        }
    }

    // delete user data
    async deleteUserDelData(ctx, next) {
        const userId = parseInt(ctx.params.id);
        const method = ctx.params.method;

        if (userId && method === 'delete') {
            const newUserDataList = userDataList.find(
                (item) => item.userId === userId);

            if (newUserDataList) {
                userDataList = userDataList.filter(
                    (item) => item.userId !== userId);

                ctx.status = 204;
                ctx.body = {
                    stat: 'ok',
                    result: userDataList,
                };
            } else {
                ctx.status = 404;
            }
        } else {
            ctx.status = 404;
        }
    }
}

module.exports = new UserController();