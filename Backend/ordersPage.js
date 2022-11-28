const express = require('express')
const orderSchema = require("./Schema/OrderSchema/orderSchema")
const router = express.Router()
router.get("/get", async (req, res) => {
    console.log(req.headers.email)
    let email = req.headers.email
    try {
        await orderSchema.find({ userId: email }).then((orderlist) => {
            res.status(200).send(orderlist)
        })
    } catch (err) {
        res.status(403).send("hello")
    }
})

router.put("/:id", async (req, res) => {
    console.log(req.params.id)
    await orderSchema.updateOne({ _id: req.params.id }, { status: "order cancelled" }).then((data) => {
        console.log(data)
        res.status(200).send("updated successfully")
    }).catch((err) => {
        res.status(400).send(err)
    })
})

module.exports = router;