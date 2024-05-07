"use client";
import React, { useEffect, useState } from "react";
import Script from "next/script";
import { fetchPayments, fetchUser, initiate } from "@/actions/userActions";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import swal from "sweetalert";
import { Router } from "next/router";

const PaymentPage = ({ username }) => {
  // const { data: session } = useSession();

  const [paymentForm, setPaymentForm] = useState({
    name: "",
    message: "",
    amount: "",
  });
  const [currentUser, setcurrentUser] = useState({});
  const [payments, setPayments] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    getData();
    if (searchParams.get("paymentdone") == "true") {
      swal({
        icon: "success",
        text: "Your payment was successfully completed",
        timer: "3000",
        button: false,
      });
      router.push(`/${username}`);
    }
  }, []);

  const handleChange = (e) => {
    setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value });
  };

  const getData = async () => {
    let u = await fetchUser(username);
    setcurrentUser(u);
    let dbPayments = await fetchPayments(username);
    setPayments(dbPayments);
  };

  const pay = async (amount) => {
    // get the order id
    let a = await initiate(amount, username, paymentForm);
    let order_id = a.id;

    var options = {
      key: currentUser.razorpay_id, // Enter the Key ID generated from the Dashboard
      amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Get Me A Chai", //your business name
      description: "Test Transaction",
      image: currentUser.profilepic,
      order_id: order_id, //This is a sample Order ID. Pass the id obtained in the response of Step 1
      callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: "Gaurav Kumar", //your customer's name
        email: "gaurav.kumar@example.com",
        contact: "9000090000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      <div className="cover w-full">
        <img
          className="object-fit w-full h-[350px] size-36"
          src={currentUser.coverpic}
          alt="cover_pic"
        />

        <div className="absolute top-[370px] md:top-[330px] right-[41%] md:right-[46.5%] overflow-hidden size-36 border-2 border-white  rounded-full">
          <img
            className="rounded-full size-36"
            src={currentUser.profilepic}
            alt="profile_pic"
            width={150}
            height={150}
          />
        </div>
      </div>
      <div className="info flex justify-center items-center flex-col mt-20 gap-2">
        <div className="font-bold text-lg">
          @{username.replaceAll("%20", " ")}
        </div>
        <div className="text-slate-400">
          Lets help {username} raise some funds.
        </div>
        <div className="text-slate-400">
          {payments.length} Payments. ₹
          {payments.reduce((a, b) => a + b.amount, 0)} raised
        </div>
        <div className="payment flex gap-10 w-[80%] my-4 flex-col md:flex-row">
          <div className="supporters w-full md:w-1/2 bg-slate-950 p-6 rounded-2xl text-white">
            <h2 className="font-bold text-2xl">Top 10 Supporters</h2>
            {/* show list of all supporters */}
            <ul className="mx-4 text-xs md:text-lg py-2">
              {payments.length == 0 && <li>No Payments yet</li>}
              {payments.map((p, i) => {
                return (
                  <li className="my-2 flex gap-2 items-center">
                    <span>
                      <img
                        className="border-2 border-white rounded-full"
                        src="/avatar.gif"
                        alt="avatar"
                        width={35}
                        height={35}
                      />
                    </span>
                    {p.name} donated{" "}
                    <span className="font-bold">₹{p.amount}</span> with a
                    message "{p.message}"
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="makePayment w-full md:w-1/2 bg-slate-950 p-4 rounded-2xl text-white">
            <h2 className="text-2xl font-bold my-5">Make a payment</h2>
            <div className="flex flex-col gap-4 justify-center items-center">
              <input
                type="text"
                name="name"
                id=""
                className="w-[80%] p-3 rounded-lg bg-slate-800"
                placeholder="Enter name"
                onChange={handleChange}
                value={paymentForm.name}
              />
              <input
                type="text"
                name="message"
                id=""
                className="w-[80%] p-3 rounded-lg bg-slate-800"
                placeholder="Enter message"
                onChange={handleChange}
                value={paymentForm.message}
              />
              <input
                type="number"
                name="amount"
                id=""
                className="w-[80%] p-3 rounded-lg bg-slate-800"
                placeholder="Enter amount in ₹"
                onChange={handleChange}
                value={paymentForm.amount}
              />
              <button
                type="button"
                onClick={() => {
                  pay(Number.parseInt(paymentForm.amount) * 100);
                }}
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mt-2 text-center me-2 mb-2 w-1/2 disabled:from-purple-100"
                disabled={
                  paymentForm.name?.length < 3 ||
                  paymentForm.message?.length < 4 ||
                  paymentForm.amount?.length < 1
                }
              >
                Pay to @{username.replaceAll("%20", " ")}
              </button>
            </div>
            <div className="flex flex-col md:flex-row gap-2 mt-5">
              <button
                className="bg-slate-800 p-3 rounded-lg"
                onClick={() => {
                  pay(1000);
                }}
              >
                Pay ₹10
              </button>
              <button
                className="bg-slate-800 p-3 rounded-lg"
                onClick={() => {
                  pay(2000);
                }}
              >
                Pay ₹20
              </button>
              <button
                className="bg-slate-800 p-3 rounded-lg"
                onClick={() => {
                  pay(3000);
                }}
              >
                Pay ₹30
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
