const express = require('express')

const router = express.Router();
const authCheck = require('../../middlewares/authCheck')
const {contacts: ctrl} = require('../../controller')
const ctrlWrapper = require('../../middlewares/ctrlWrapper');


router.get('/', authCheck, ctrlWrapper(ctrl.getAll))

router.get('/:id', authCheck, ctrlWrapper(ctrl.getById))

router.post('/', authCheck, ctrlWrapper(ctrl.add))

router.delete('/:id', authCheck, ctrlWrapper(ctrl.deleteById))

router.patch('/:id', authCheck, ctrlWrapper(ctrl.updateById))

router.patch('/:id/favorite', authCheck, ctrlWrapper(ctrl.updateStatusContact))


module.exports = router
