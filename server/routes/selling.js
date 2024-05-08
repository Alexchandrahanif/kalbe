const Controller = require("../controllers/selling");
const authentication = require("../middleware/authentication");

const sellingRouter = require("express").Router();

sellingRouter.get("/", authentication, Controller.getAll);
sellingRouter.get("/:id", authentication, Controller.getOne);
sellingRouter.post("/", authentication, Controller.create);
sellingRouter.patch("/:id", authentication, Controller.update);
sellingRouter.delete("/:id", authentication, Controller.delete);

module.exports = sellingRouter;
