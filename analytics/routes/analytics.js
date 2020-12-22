const router = require('express').Router();
const controller = require('../controllers/analytics');

router.post('/', controller.createAnalytics);
router.get('/', controller.findAll);
router.delete('/:id', controller.noAccess);
router.put('/:id', controller.noAccess);
router.patch('/:id', controller.noAccess);
module.exports = router;
