import getEnvVar from "../../../utils/envVars.js";
import inputCheck from "../../../utils/inputCheck.js";
import serverHelper from "../../../utils/serverHelper.js";
import Stripe from "stripe";

const stripe = new Stripe(getEnvVar("STRIPE_SECRET_KEY"));

export default function createPaymentIntentController(req, res, next) {
  const bodyData = req.body;
  const { price } = bodyData;

  const check = inputCheck([price], next);
  if (!check) return;

  if (typeof price !== "number") {
    res.status(400).json({
      success: false,
      message: "price must a number",
    });
    return;
  }

  serverHelper(async () => {
    const amount = parseInt(price) * 100;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      payment_method_types: ["card"],
    });
    res
      .status(201)
      .json({ success: true, clientSecret: paymentIntent.client_secret });
  }, next);
}
