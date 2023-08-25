import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import viteImg from "./assets/vite.svg";

export default function Account({ username, bio }) {
  const [account, setAccount] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="hidden lg:block relative">
      <img
        src={viteImg}
        alt=""
        className="border-slate-200 border-2 p-3 shadow-sm rounded-full hover:cursor-pointer"
        onClick={() => (account ? setAccount(false) : setAccount(true))}
      />
      {account ? (
        <div className="absolute flex flex-col items-center top-[calc(100%+5px)] right-0 w-60 h-fit bg-white border-zinc-300 border rounded shadow-md">
          <div className="bg-zinc-50 flex p-2 w-full gap-2">
            <img
              src={viteImg}
              alt=""
              className="border-slate-200 border-2 p-3 h-14 shadow-sm rounded-full"
            />
            <div>
              <p className="font-bold text-blue-600">{username}</p>
              <p className="text-gray-800">{bio}</p>
            </div>
          </div>
          <div
            onClick={() => navigate("/wroteit-deploy/Profile")}
            className="w-11/12 border-green-600 border rounded text-center hover:bg-green-50 hover:cursor-pointer"
          >
            <p className="text-green-600 font-semibold text-sm">View Profile</p>
          </div>
          <div>
            <p
              className="text-gray-500 text-sm py-2 hover:cursor-pointer hover:text-gray-700"
              onClick={() => navigate("/wroteit-deploy/")}
            >
              Sign out
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
