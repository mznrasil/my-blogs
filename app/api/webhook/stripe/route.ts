import { stripe } from "@/app/utils/stripe";
import {
  createSubscription,
  updateSubscription,
} from "@/services/subscriptions";
import { getCustomerById } from "@/services/user";
import { headers } from "next/headers";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string,
    );
  } catch (error) {
    return new Response("Webhook error", { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type == "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string,
    );

    const customerId = session.customer as string;
    console.log("customerId", customerId);

    const user = await getCustomerById(customerId);
    console.log("user", user);

    //if (!user) throw new Error("User not found...");

    try {
      await createSubscription({
        stripe_subscription_id: subscription.id,
        current_period_start: subscription.current_period_start,
        current_period_end: subscription.current_period_end,
        interval: String(subscription.items.data[0].plan.interval),
        plan_id: subscription.items.data[0].plan.id,
        status: subscription.status,
      });
      console.log("create subscription successful");
    } catch (error) {
      console.error(error, "error message");
    }
  }

  if (event.type === "invoice.payment_succeeded") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string,
    );

    await updateSubscription({
      id: subscription.id,
      data: {
        plan_id: subscription.items.data[0].price.id,
        current_period_start: subscription.current_period_start,
        current_period_end: subscription.current_period_end,
        status: subscription.status,
      },
    });
    console.log("update subscription successful");
  }

  return new Response(null, { status: 200 });
}
