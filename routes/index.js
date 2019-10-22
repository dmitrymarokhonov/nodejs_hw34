const express = require('express');
const multer = require('multer');
const router = express.Router();

const upload = multer({ dest: 'public/assets/img/products/' })

const ctrlHome = require('../controllers/index');
const ctrlLogin = require('../controllers/login');
const ctrlAdmin = require('../controllers/admin');

const isAdmin = (req, res, next) => {
  req.session.isAdmin ? next() : res.redirect('/login');
};

router.get('/login', ctrlLogin.get);
router.post('/login', ctrlLogin.post);

router.get('/', ctrlHome.get);
router.post('/', ctrlHome.postMessage);

router.get('/admin', isAdmin, ctrlAdmin.get);
router.post('/admin/upload', isAdmin, ctrlAdmin.postMulterUpload);
router.post('/admin/skills', isAdmin, ctrlAdmin.postSkills);



module.exports = router;
