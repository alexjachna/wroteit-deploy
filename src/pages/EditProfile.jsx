import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../Nav";
import viteLogo from "../assets/vite.svg";

export default function EditProfile({
  username,
  setUsername,
  bio,
  setBio,
  posts,
  communities,
}) {
  const usernameVal = useRef(null);
  const bioVal = useRef(null);
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex flex-col items-center">
      <Nav
        username={username}
        bio={bio}
        posts={posts}
        communities={communities}
      />
      <div className="w-fit p-12 flex flex-col gap-8 items-center justify-center">
        <img
          src={viteLogo}
          alt=""
          className="w-36 border-slate-200 border-2 p-6 shadow-sm rounded-full"
        />
        <p className="text-black text-2xl">Edit Profile</p>
        <div>
          <p className="text-black">Username</p>
          <input
            type="text"
            ref={usernameVal}
            className="border-b px-2 h-10 text-black focus:outline-none"
            placeholder={username}
          />
        </div>
        <div>
          <p className="text-black">Bio</p>
          <input
            type="text"
            ref={bioVal}
            className="border-b px-2 h-10 text-black focus:outline-none"
            placeholder={bio}
          />
        </div>

        <button
          className="text-white w-36 h-12 bg-blue-500"
          onClick={() => {
            if (usernameVal.current.value !== "") {
              setUsername(usernameVal.current.value);
            }
            if (bioVal.current.value !== "") {
              setBio(bioVal.current.value);
            }
            navigate("/wroteit-deploy/Home");
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}
