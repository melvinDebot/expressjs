import { Router } from "express";
import Stripe from "stripe";

const routes = Router();

// Assurez-vous que votre variable d'environnement STRIPE_SECRET_KEY est définie
// Prod : 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
// test : sk_test_51MgTATKww5u0tgAGJjsLFA2mrVDXBlKsal9xaPz8OShrKhOojqj6K8gHufZcDMyViYCodYF8ZqJ0jEFQwyuuzQlM00zloO7hw7
const stripe = new Stripe(
  "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"
);

routes.post("/", async (req, res) => {
  try {
    const { subscriptionId } = req.body;

    // Cancel the subscription on Stripe
    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: false,
    });

    res.status(200).json({ isCertified: true });

    return subscription;
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while reactive the subscription" });
  }
});

export default routes;
