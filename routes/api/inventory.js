const router = require("express").Router();
const inventoryController = require("../../controllers/inventoryController");


router
    .route("/inventory")
    .get(inventoryController.findAll)
    .post(inventoryController.createFoodItem)

router
    .route("/:id")
    .get(inventoryController.findByIdWithFoodItem)
    .put(inventoryController.update)
    .delete(inventoryController.remove)

module.exports = router;