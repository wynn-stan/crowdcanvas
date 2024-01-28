import Link from "next/link";
import Auth from "../Auth/Auth";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center">
      <div className="gap-8 hidden md:flex">
        <div className="text-xl font-medium">
          <Link href="/events/explore">Events</Link>
        </div>
        <div className="text-xl font-medium">
          <Link href="/home">Forum</Link>
        </div>
      </div>

      <div className="text-xl font-medium w-full md:w-fit text-center">CrowdCanvas</div>

      <div className="items-center gap-8 hidden md:flex">
        <Auth defaultView="log_in">
          {({ proceed }) => {
            return (
              <div onClick={() => proceed()} className="cursor-pointer text-xl font-medium">
                Login
              </div>
            );
          }}
        </Auth>
        <Auth defaultView="register">
          {({ proceed }) => {
            return (
              <div
                onClick={() => proceed()}
                className=" cursor-pointer text-xl font-medium py-4 px-7 border-black border rounded-full"
              >
                Sign Up
              </div>
            );
          }}
        </Auth>
      </div>
    </div>
  );
}
