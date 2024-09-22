import { updatePaymentStatus } from "@/services/payments";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;

  const pidx = searchParams.get("pidx") as string;
  const transaction_id = searchParams.get("transaction_id") as string;
  const amount = searchParams.get("amount") as string;
  const total_amount = searchParams.get("total_amount") as string;
  const mobile = searchParams.get("mobile") as string;
  const status = searchParams.get("status") as string;
  const purchase_order_id = searchParams.get("purchase_order_id") as string;

  try {
    await updatePaymentStatus({
      plan_id: parseInt(purchase_order_id),
      total_amount: parseFloat(total_amount),
      amount: parseFloat(amount),
      pidx,
      status,
      mobile,
      transaction_id,
    });
  } catch (error) {
    console.error(error);
    return Response.redirect(
      "http://localhost:3000/dashboard/payment/cancelled",
      302,
    );
  }

  return Response.redirect(
    "http://localhost:3000/dashboard/payment/success",
    302,
  );
}
