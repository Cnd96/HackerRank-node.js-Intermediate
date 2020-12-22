const router = require('express').Router();
const controller = require('../controllers/products');

router.post('/', controller.createProduct);
router.get('/', controller.findAll);
router.patch('/:id', controller.patchOne);
router.delete('/:id', controller.noAccess);
router.put('/:id', controller.noAccess);

module.exports = router;


// router.get('/', async (req, res) => {

//   });


