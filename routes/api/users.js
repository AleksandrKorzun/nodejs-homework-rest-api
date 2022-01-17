const express = require('express');
// const signUp = require('../../controller/users/signUp');
const ctrlWrapper = require('../../middlewares/ctrlWrapper');
const authCheck = require('../../middlewares/authCheck');
const router = express.Router();

const {users: ctrl} = require('../../controller');

router.post('/signup', ctrlWrapper(ctrl.signUp));
router.post('/signin', ctrlWrapper(ctrl.signIn));
router.post('/logout', authCheck, ctrlWrapper(ctrl.logOut));
router.get('/current', authCheck, ctrlWrapper(ctrl.getCurrent));
router.patch('/', authCheck, ctrlWrapper(ctrl.updateSubscription))


module.exports = router;