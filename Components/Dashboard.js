"use client";
import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchUser, updateProfile } from "@/actions/userActions";
import swal from "sweetalert";

const Dashboard = () => {

  const { data: session } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({});

  useEffect(() => {
    getData()
    if (!session) {
      router.push("/login");
    }
  });

  const getData = async () => {
    let a = await fetchUser(session.user.name)
    setForm(a)
  }
  

  const  handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    let a = await updateProfile(e, session.user.name)
    swal({
      icon: "success",
      text: "Profile updated",
      timer: "2000",
      button: false,
    });
  }
  

  return (
    <>
      <div className="max-w-3xl mx-auto rounded-md p-4 text-black container px-6">
        <h1>Welcome to your Dashboard</h1>
        <form className="mt-16 border border-slate-900 p-4 hover:border-slate-200 rounded-2xl" action={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-white">
              Name
            </label>
            <input
              placeholder="Enter name"
              type="text"
              id="name"
              name="name"
              value={form.name?form.name:""}
              onChange={handleChange}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md 
              h-8 px-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email
            </label>
            <input
              placeholder="Enter email ID"
              type="text"
              id="email"
              name="email"
              value={form.email?form.email:""}
              onChange={handleChange}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md 
              h-8 px-2"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-white"
            >
              Username
            </label>
            <input
              placeholder="Enter username"
              type="text"
              id="username"
              name="username"
              value={form.username?form.username:""}
              onChange={handleChange}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 h-8 px-2 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="profilepic" className="block text-sm font-medium text-white">
              Profile Pic
            </label>
            <input
              type="text"
              id="profilepic"
              name="profilepic"
              value={form.profilepic?form.profilepic:""}
              onChange={handleChange}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm h-8 sm:text-sm border-gray-300 rounded-md px-2"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="coverpic"
              className="block text-sm font-medium text-white"
            >
              Cover Pic 
            </label>
            <input
              type="text"
              id="coverpic"
              name="coverpic"
              value={form.coverpic?form.coverpic:""}
              onChange={handleChange}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 h-8 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-2"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="razorpay_id"
              className="block text-sm font-medium text-white"
            >
              Razorpay ID
            </label>
            <input
              placeholder="Enter RazaorPay ID"
              type="text"
              id="razorpay_id"
              name="razorpay_id"
              value={form.razorpay_id?form.razorpay_id:""}
              onChange={handleChange}
              className="mt-1 focus:ring-indigo-500 h-8 px-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="razorpay_secret"
              className="block text-sm font-medium text-white"
            >
              Razorpay Secret
            </label>
            <input
              placeholder="Enter RazaorPay secret"
              type="text"
              id="razorpay_secret"
              name="razorpay_secret"
              value={form.razorpay_secret?form.razorpay_secret:""}
              onChange={handleChange}
              className="mt-1 focus:ring-indigo-500 h-8 px-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="mt-4 flex justify-center">
            <button
              type="submit"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mt-2 text-center me-2 mb-2 w-56"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Dashboard;

