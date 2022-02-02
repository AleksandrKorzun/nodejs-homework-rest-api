const express = require('express');
const ctrlWrapper = require('../../middlewares/ctrlWrapper');
const authCheck = require('../../middlewares/authCheck');
const router = express.Router();

const {users: ctrl} = require('../../controller');
const upload = require('../../middlewares/upload');
const resizeImg = require('../../middlewares/resizeImg');

router.post('/signup', ctrlWrapper(ctrl.signUp));
router.post('/signin', ctrlWrapper(ctrl.signIn));
router.post('/logout', authCheck, ctrlWrapper(ctrl.logOut));
router.get('/current', authCheck, ctrlWrapper(ctrl.getCurrent));
router.patch('/', authCheck, ctrlWrapper(ctrl.updateSubscription))
router.patch('/avatars', authCheck, upload.single("avatar"), resizeImg, ctrlWrapper(ctrl.setAvatar))
router.get('/verify/:verificationToken', ctrlWrapper(ctrl.getVerify));
router.post('/verify', ctrlWrapper(ctrl.setVerify));


module.exports = router;