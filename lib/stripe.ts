import Stripe from "stripe";

// Stripe is optional — only required when billing features are used
const key = process.env.STRIPE_SECRET_KEY;

export const stripe = key
  ? new Stripe(key, { apiVersion: "2026-05-27.dahlia", typescript: true })
  : null;

export const STRIPE_PRICE_IDS = {
  PRO_MONTHLY:  process.env.STRIPE_PRO_PRICE_ID  ?? "",
  TEAM_MONTHLY: process.env.STRIPE_TEAM_PRICE_ID ?? "",
};
