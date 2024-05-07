import PaymentPage from "@/Components/PaymentPage";
import React from "react";
import { notFound } from "next/navigation";
import ConnectDB from "@/db/ConnectDB";
import User from "@/models/User";

const Username = async ({ params }) => {
  const checkUser = async () => {
    await ConnectDB();
    let u = await User.findOne({ username: params.username });
    if (!u) {
      return notFound();
    }
  };

  await checkUser();

  return (
    <>
      <PaymentPage username={params.username} />
    </>
  );
};

export default Username;

export async function generateMetadata({ params }) {
  return{
    title: `Support ${params.username} - Fund Start`,
  }
}


