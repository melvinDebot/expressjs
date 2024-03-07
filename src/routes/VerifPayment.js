import { Router } from "express";
import Stripe from "stripe";

const routes = Router();

// Assurez-vous que votre variable d'environnement STRIPE_SECRET_KEY est définie
// Prod : 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
// test : sk_test_51MgTATKww5u0tgAGJjsLFA2mrVDXBlKsal9xaPz8OShrKhOojqj6K8gHufZcDMyViYCodYF8ZqJ0jEFQwyuuzQlM00zloO7hw7
const stripe = new Stripe(
  "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"
);

routes.get("/", async (req, res) => {
  const sessionId = req.query.sessionId;
  if (!sessionId) {
    return res.status(400).json({ error: "Session ID manquant" });
  }
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    // Vérifiez ici si le paiement a été réussi.
    if (session.payment_status === "paid") {
      res.json(session); // Renvoyer les détails de la session si le paiement est réussi
    } else {
      res.status(400).json({ error: "Paiement non réussi" });
    }
  } catch (error) { 
    res.status(500).json({ error: error.message });
  }
});

export default routes;