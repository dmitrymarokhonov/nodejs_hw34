const Router = require('koa-router');
const router = new Router();
const koaBody = require('koa-body');

const ctrlHome = require('../controllers/index');
const ctrlLogin = require('../controllers/login');
const ctrlAdmin = require('../controllers/admin');

const isAdmin = (ctx, next ) => {
  ctx.session.isAdmin ? next() : ctx.redirect('/login');
};

router.get('/', ctrlHome.get);
router.post('/', koaBody(), ctrlHome.postMessage);

router.get('/login', ctrlLogin.get);
router.post('/login', koaBody(), ctrlLogin.post);


router.get('/admin', isAdmin, ctrlAdmin.get);
// router.post('/admin/upload', isAdmin, ctrlAdmin.postMulterUpload);
// router.post('/admin/skills', isAdmin, ctrlAdmin.postSkills);

module.exports = router;
