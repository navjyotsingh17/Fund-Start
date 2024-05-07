import React from "react";
import Image from "next/image";

const page = () => {
  return (
    <>
      <div class="[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] text-white min-h-screen  py-44">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h2 class="text-3xl font-extrabold  sm:text-4xl">
              About Our Cause
            </h2>
            <p class="mt-4 text-lg ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              hendrerit, lectus et molestie accumsan, ex eros convallis leo, at
              cursus lectus nulla et libero.
            </p>
          </div>
          <div class="mt-20 grid grid-cols-1 gap-20 md:grid-cols-2 lg:grid-cols-3">
            <div class="flex flex-col items-center justify-center">
              <Image
                class="rounded-full object-cover bg-white p-4"
                src="/people.png"
                alt="Team"
                height={150}
                width={150}
              />
              <h3 class="mt-6 text-lg font-medium ">Our Team</h3>
              <p class="mt-2">
                Meet the dedicated individuals behind our cause.
              </p>
            </div>

            <div class="flex flex-col items-center justify-center">
              <Image
                class="rounded-full object-cover bg-white p-4"
                src="/rupee.png"
                alt="Mission"
                height={150}
                width={150}
              />
              <h3 class="mt-6 text-lg font-medium ">
                Our Mission
              </h3>
              <p class="mt-2">
                Discover the purpose and goals of our organization.
              </p>
            </div>

            <div class="flex flex-col items-center justify-center">
              <Image
                class="rounded-full object-cover bg-white p-4"
                src="/fund.png"
                alt="Impact"
                height={150}
                width={150}
              />
              <h3 class="mt-6 text-lg font-medium ">Our Impact</h3>
              <p class="mt-2 ">
                Learn about the positive changes we&apos;re making in the world.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;

export const metadata = {
    title: "About - Fund Start a crowd funding app",
  }
