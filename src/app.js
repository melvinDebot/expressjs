import express from "express";
import cors from "cors";
import morgan from "morgan";

import * as middleware from "./utils/middleware.js";
import helloRoute from "./routes/helloRouter.js";
import stripeRoute from "./routes/stripeRouter.js";
import VerifPayment from "./routes/VerifPayment.js";
import cancelSubscription from "./routes/cancelSubscription.js";
import reactiveSubscription from "./routes/reactiveSubscription.js";
import checkSubscription from "./routes/checkSubscription.js";

const app = express();

// parse json request body
app.use(express.json());

// enable cors
app.use(cors());

// request logger middleware
app.use(morgan("tiny"));

// healthcheck endpoint
app.get("/", (req, res) => {
  res.status(200).send({ status: "ok" });
});

app.use("/hello", helloRoute);
app.use("/create-checkout-session", stripeRoute);
app.use("/verify-payment", VerifPayment);
app.use("/cancel-subscription", cancelSubscription);
app.use("/reactive-subscription", reactiveSubscription);
app.use("/check-subscription", checkSubscription);


// custom middleware
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
