import { stripe } from "@/backend/sdks/stripe";
import { headers } from "next/headers";
import { string, parse } from "valibot";
import { match } from "ts-pattern";

export const POST = async (req: Request) => {
  const body = await req.text();
  const signature = parse(string(), headers().get("stripe-signature"));

  const event = stripe.webhooks.constructEvent(
    body,
    signature,
    env.stripeWebhookSecret
  );

  try {
    match(event.type)
      .with("customer.subscription.created", () => {
        // A subscription has been created. This is NOT called when a customer has ended a subscription but then subscribes again before the cancelation.
      })
      .with("customer.subscription.updated", () => {
        // Updated
      })
      .with("customer.subscription.deleted", () => {
        // Delete
      });
  } catch {
    //
  }

  return new Response(null, { status: 200 });
};
