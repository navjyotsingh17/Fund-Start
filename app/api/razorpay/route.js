import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import Razorpay from "razorpay";
import ConnectDB from "@/db/ConnectDB";
import { Elsie_Swash_Caps } from "next/font/google";
import User from "@/models/User";

export const POST = async (req) => {
  await ConnectDB();
  let body = await req.formData();
  body = Object.fromEntries(body);

  //check if razorpay id is present on the server or not

  let p = await Payment.findOne({ order_id: body.razorpay_order_id });
  if (!p) {
    return NextResponse.json({
      success: false,
      message: "Order ID not found",
    });
  }

  let user = await User.findOne({username: p.to_user})
  const secret = user.razorpay_secret

  //verify the payment
  let x = validatePaymentVerification(
    {
      "order_id": body.razorpay_order_id,
      "payment_id": body.razorpay_payment_id,
    },
    body.razorpay_signature,
    secret
  );

  if (x) {
    //update the payment in db
    const updatedPayment = await Payment.findOneAndUpdate(
      { order_id: body.razorpay_order_id },
      { done: "true" },
      { new: true }
    );
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`
    );
  } else {
    return NextResponse.json({
      success: false,
      message: "Payment Verification Failed",
    });
  }
};
