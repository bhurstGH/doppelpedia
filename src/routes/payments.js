const express =require("express");
const router = express.Router();

const paymentController = require("../controllers/paymentController");

router.get("/payments/premium_signup", paymentController.premiumSignup);
router.post("/payments/charge", paymentController.premiumAccount);

module.exports = router;