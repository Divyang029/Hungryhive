const express = require("express");
const storeController = require('../controllers/store-controllers');
const router = express.Router();

router.get('/',storeController.getAllStore);
router.get('/:storeid',storeController.getStoreById);
router.post('/add',storeController.addNewStore);
router.put('/update/:storeid',storeController.updateStoreById);
router.delete('/delete/:storeid',storeController.deleteStoreById);

module.exports = router;