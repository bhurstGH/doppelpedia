const express =require("express");
const router = express.Router();
const validation = require("./validation");

const userController = require("../controllers/userController");

router.get("/users/signup", userController.signUp);
router.post("/users/signup", validation.validateUsers, userController.create);
router.get("/users/signin", userController.signInForm);
router.post("/users/signin", validation.validateUsers, userController.signIn);
router.get("/users/signout", userController.signOut);
router.get("/users/:id", userController.profile);
router.get("/users/:id/downgrade", userController.cancelPage);
router.post("/users/:id/downgrade", userController.cancel);

module.exports = router;