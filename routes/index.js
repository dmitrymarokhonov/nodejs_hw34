const express = require('express');
const router = express.Router();

const ctrlHome = require('../controllers/index');
const ctrlLogin = require('../controllers/login');
const ctrlAdmin = require('../controllers/admin');

const isAdmin = (req, res, next) => {
  req.session.isAdmin ? next() : res.redirect('/login');
};

router.get('/login', ctrlLogin.get);
router.post('/login', ctrlLogin.post);

router.get('/', isAdmin, ctrlHome.get);
router.post('/', isAdmin, ctrlHome.postMessage);

router.get('/admin', isAdmin, ctrlAdmin.get);
router.post('/admin/upload', isAdmin, ctrlAdmin.postUpload);
router.post('/admin/skills', isAdmin, ctrlAdmin.postSkills);



module.exports = router;
