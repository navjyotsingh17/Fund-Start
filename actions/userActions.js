"use server";

import Razorpay from "razorpay";
import Payment from "../models/Payment";
import ConnectDB from "../db/ConnectDB";
import User from "../models/User";
import { Anybody } from "next/font/google";

export const initiate = async (amount, to_username, paymentForm) => {
  await ConnectDB();
  let user = await User.findOne({ username: to_username });
  const secret = user.razorpay_secret;  
  const id = user.razorpay_id;  
  var instance = new Razorpay({
    key_id: id,
    key_secret: secret,
  });

  //   instance.orders.create({
  //     amount: 50000,
  //     currency: "INR",
  //     receipt: "receipt#1",
  //     notes: {
  //       key1: "value2",
  //       key2:"value3"
  //     },
  //   });

  let options = {
    amount: Number.parseInt(amount),
    currency: "INR",
  };

  let x = await instance.orders.create(options);

  // create a payment obj which shows the pending payment in the database
  await Payment.create({
    order_id: x.id,
    amount: amount / 100,
    to_user: to_username,
    name: paymentForm.name,
    message: paymentForm.message,
  });

  return x;
};

export const fetchUser = async (username) => {
  await ConnectDB();
  // let userName = username.replaceAll("%20"," ")

  let u = await User.findOne({ username: username });
  let user = u.toObject({ flattenObjectIds: true });
  return user;
};

export const fetchPayments = async (username) => {
  await ConnectDB();
  let p = await Payment.find({ to_user: username, done: true })
    .sort({ amount: -1 })
    .limit(10)
    .lean();
  return p;
};

export const updateProfile = async (data, oldUsername) => {
  await ConnectDB();
  let nData = Object.fromEntries(data);
  //if the username is being updated check if the username is available
  if (oldUsername !== nData.username) {
    let u = await User.findOne({ username: nData.username });
    if (u) {
      return { success: false, message: "Username already exists" };
    }
    await User.updateOne({ email: nData.email }, nData);
    
    await Payment.updateMany({to_user: oldUsername}, {to_user: nData.username})
  }
  else{
    await User.updateOne({ email: nData.email }, nData);

  }

};
