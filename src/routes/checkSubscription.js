import Stripe from "stripe";
import { Router } from "express";

const routes = Router();

// Assurez-vous que votre variable d'environnement STRIPE_SECRET_KEY est définie
// Prod : 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
// test : sk_test_51MgTATKww5u0tgAGJjsLFA2mrVDXBlKsal9xaPz8OShrKhOojqj6K8gHufZcDMyViYCodYF8ZqJ0jEFQwyuuzQlM00zloO7hw7
const stripe = new Stripe(
  "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"
);

routes.post("/", async (req, res) => {
  const { subscriptionId } = req.body;
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    // Vérifier si l'abonnement est actif
    if (subscription.status === "active") {
      res.json({ subscription: true });
    } else {
      console.log(
        `L'abonnement n'est pas actif. Statut actuel: ${subscription.status}`
      );
      res.json({ subscription: false });
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de l'abonnement :", error);
    throw error;
  }
});

export default routes;
