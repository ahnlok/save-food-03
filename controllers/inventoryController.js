const db = ("../models");

//Defining methods for the inventoryController
module.exports = {
    findAll: function (req, res){
    db.Food.find(req.query)
        .populate("foodItem")
        .sort({ date: -1 })
        .then((dbFood) => res.json(dbFood))
        .catch((err) => res.status(422).json(err));
    },
    findByIdWithFoodItem: function (req, res){
        db.Food.findById(req.params.id)
            .populate("foodItem")
            .then((dbFood) => res.json(dbFood))
            .catch((err) => res.status(400).json(err));
    }, 
    createFoodItem: function (req, res) {
        db.FoodItem.create(req.body).then((newFoodItem) => {
            db.Food.findByIdAndUpdate(
                req.params.id,
                { $push: { foodItem: newFoodItem._id } },
                { new: true }
            ).then((updatedFood) => {
                res.json(updatedFood);
            });
        });
    },
    update: function (req, res) {
        db.Food.findOneAndUpdate({_id: req.params.id }, req.body, {
            new: true,
        })
            .then((dbFood) => res.json(dbFood))
            .catch((err) => res.status(422).json(err));
    },
    remove: function (req, res) {
        db.Food.findByIdWithFoodItem({ _id: req.params.id })
        .then((dbFood) => dbFood.remove())
        .then((dbFood) => res.json(dbFood))
        .catch((err) => res.status(422).json(err));
    },
}