const customerRouter = require("./customer");
const productRouter = require("./product");
const sellingRouter = require("./selling");
const userRouter = require("./user");

const router = require("express").Router();

router.use("/user", userRouter);
router.use("/customer", customerRouter);
router.use("/product", productRouter);
router.use("/selling", sellingRouter);

module.exports = router;
