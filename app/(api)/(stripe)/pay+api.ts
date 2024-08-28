import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { paymente_method_id, payment_intent_id, customer_id } = body;
    if (!paymente_method_id || !payment_intent_id || !customer_id) {
      return new Response(
        JSON.stringify({ error: "Missing payment information", status: 400 })
      );
    }

    const paymentMethod = await stripe.paymentMethods.attach(
      paymente_method_id,
      {
        customer: customer_id,
      }
    );

    const result = await stripe.paymentIntents.confirm(payment_intent_id, {
      payment_method: paymentMethod.id,
    });
    return new Response(
      JSON.stringify({
        success: true,
        message: "Payment confirmed successfully",
        result: result,
      })
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        error: error,
        message: "something went wrong",
        status: 500,
      })
    );
  }
}
