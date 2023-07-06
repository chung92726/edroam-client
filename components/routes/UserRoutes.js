"use client";

import { useState, useEffect } from "react";

import axios from "axios";
import { useRouter } from "next/navigation";
import UserNav from "../nav/UserNav";

const UserRoute = ({ children, showNav = true }) => {
  const router = useRouter();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/api/current-user");
        // console.log(data)
        if (data.ok) setOk(true);
      } catch (err) {
        console.log(err);
        router.push("/login");
      }
    };
    fetchUser();
  }, []);
  return (
    <>
      {ok && (
        <div className="flex flex-row w-full">
          {showNav && (
            <div className="nav_container">
              <UserNav />
            </div>
          )}
          <div className="w-full min-h-[calc(100vh-70px)] bg-gray-100 pl-[4rem] lg:pl-[13rem]">
            <div className={showNav ? "w-full" : "w-full"}>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserRoute;
