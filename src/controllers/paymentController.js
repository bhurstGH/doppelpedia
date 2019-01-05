const publicKey = process.env.STRIPE_PUBLISHABLE_KEY;
const secretKey = process.env.STRIPE_SECRET_KEY;
const amount = process.env.PREMIUM_COST;
const stripe = require("stripe")(secretKey);

module.exports = {
    premiumSignup(req, res, next) {
        res.render("payments/premium_signup", {publicKey});
    },
    premiumAccount(req, res, next) {

        stripe.customers.create({
            email: req.body.stripeEmail,
            source: req.body.stripeToken
        })
        .then((customer) => {
            stripe.charges.create({
                amount: amount,
                description: "Sample Premium Account Charge",
                currency: "usd",
                customer: customer.id
            })
        })
        .then((charge) => {
            
            res.render("payments/charge")
        });
    }
}