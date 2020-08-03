const Router = require('koa-router');
const userCtrl = require('../controllers/users/UserController');

const router = new Router({
    prefix:'/api'
});

router
    .post('/user/reg', userCtrl.addUserData)
    .post('/user/login', userCtrl.login)
    .get('/user/:id', userCtrl.getUserData)
    .put('/user/:id/:method', userCtrl.modifiedUserData)
    .delete('/user/:id/:method', userCtrl.deleteUserDelData);

module.exports = router;