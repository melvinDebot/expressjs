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
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // prod : price_1ObRi1Kww5u0tgAGFdOaFMpE
          // test : price_1OL2uDKww5u0tgAGMJvUrrDp
          price: "price_1ObRi1Kww5u0tgAGFdOaFMpE", // Remplacez par votre identifiant de prix
          quantity: 1,
        },
      ],

      mode: "subscription",
      success_url:
        req.headers.origin === undefined
          ? "https://verse-app.netlify.app/successed"
          : `${req.headers.origin}/success`,
      cancel_url:
        req.headers.origin === undefined
          ? "https://verse-app.netlify.app/cancelled"
          : `${req.headers.origin}/cancel`,
    });

    res.json({ sessionId: session.id, url : session.url, session: session });
  } catch (error) {
    res.status(400).send({ error: { message: error.message } });
  }
});


export default routes;
