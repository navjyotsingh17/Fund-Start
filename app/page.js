import Link from "next/link";
import Image from "next/image"

export default function Home() {
  return (
    <>
      <div className="flex justify-center flex-col gap-4 text-white items-center h-[30vh] px-5 md:px-0 text-xs md:text-base">
        <div className="font-bold text-3xl flex justify-center items-center gap-5 text-white rounded-2xl">
          Fund Start
          <span>
            <Image src="/fund.png" alt="fund" width={45} height={45} style={{"marginBottom": "12px"}}/>
          </span>
        </div>
        <p className="text-center md:text-left">
          A crowdfunding platform for creators. Get funded by your fans and
          followers.
        </p>
        <p className="text-center md:text-left">
          A place where your fans can fund you Projects. Unleash the power of your fans and ge your projects funded
        </p>
        <div className="button flex gap-5">
          <Link href={"/login"}>
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
            Start Now !
          </button>
          </Link>
          <Link href={"/about"}>
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Read More
          </button>
          </Link>
        </div>
      </div>
      <div className="bg-white h-1 opacity-10"></div>

      <div className="text-white container mx-auto py-5">
        <h2 className="text-center py-4 text-3xl font-bold m-10">
          Your Fans can buy you a chai
        </h2>
        <div className="flex gap-5 justify-around py-2 ">
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <Image
              className="bg-white p-4 rounded-full"
              src="/man.png"
              alt="man"
              width={150}
              height={150}
            />
            <p className="font-bold text-center">Fans want to help</p>
            <p className="text-center">Your fans are available for your help</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <Image
              className="bg-white p-4 rounded-full"
              src="/rupee.png"
              alt="rupee"
              width={150}
              height={150}
            />
            <p className="font-bold text-center">Fans want to help</p>
            <p className="text-center">Your fans are available for your help</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <Image
              className="bg-white p-4 rounded-full"
              src="/people.png"
              alt="people"
              width={150}
              height={150}
            />
            <p className="font-bold text-center">Fans want to help</p>
            <p className="text-center">Your fans are available for your help</p>
          </div>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10"></div>

      <div className="text-white container mx-auto py-5">
        <h2 className="text-center py-4 text-3xl font-bold m-10">
          Learn more about us
        </h2>
        <div className="flex gap-5 justify-around py-2 ">
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <Image
              className="bg-white p-4 rounded-full"
              src="/man.png"
              alt="man"
              width={150}
              height={150}
            />
            <p className="font-bold text-center">Fans want to help</p>
            <p className="text-center">Your fans are available for your help</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <Image
              className="bg-white p-4 rounded-full"
              src="/rupee.png"
              alt="rupee"
              width={150}
              height={150}
            />
            <p className="font-bold text-center">Fans want to help</p>
            <p className="text-center">Your fans are available for your help</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <Image
              className="bg-white p-4 rounded-full"
              src="/people.png"
              alt="people"
              width={150}
              height={150}
            />
            <p className="font-bold text-center">Fans want to help</p>
            <p className="text-center">Your fans are available for your help</p>
          </div>
        </div>
      </div>
    </>
  );
}
