import React from "react";
import Nav from "../Nav";
import { useNavigate } from "react-router-dom";
import Posts from "../Posts";
import viteLogo from "../assets/vite.svg";
import editImg from "../assets/edit.png";
import wroteitLogo from "../assets/wroteit-logo.png";

export default function Profile({
  username,
  bio,
  posts,
  communities,
  handleVote,
}) {
  const navigate = useNavigate();

  let filteredPosts = posts.filter((p) => p.username == username).length;

  return (
    <div className="bg-zinc-50 w-full h-fit flex flex-col items-center gap-4 pb-12">
      <Nav
        username={username}
        bio={bio}
        posts={posts}
        communities={communities}
      />

      {/* Container with Profile title + Profile card/Posts Section */}
      <div className="flex flex-col px-2 lg:px-60 w-full">
        <p className="text-black text-4xl font-bold py-7">My Profile</p>

        {/* Profile Card and Posts section */}
        <div className="flex flex-col gap-4 lg:flex-row w-full">
          {/* Profile Card */}
          <div className="relative w-full h-fit xl:w-1/2 flex flex-col items-center gap-2 bg-white border-zinc-100 border rounded-md text-black shadow-sm">
            <div className="bg-green-100 rounded-t w-full h-60 py-4 flex justify-center items-center">
              <img
                src={viteLogo}
                alt=""
                className="border-slate-200 border-2 p-6 h-36 xl:h-48 shadow-sm rounded-full bg-white"
              />
            </div>

            <div className="relative rounded w-full h-48 flex flex-col items-center justify-center gap-4 px-12">
              <p className="text-black font-bold text-6xl">{username}</p>
              <p className="text-black font-light text-xl">{bio}</p>
              <div
                className="absolute flex items-center justify-center rounded-full bg-zinc-100 bottom-3 right-3 w-8 h-8"
                onClick={() => navigate("/wroteit-deploy/EditProfile")}
              >
                <img src={editImg} alt="" className="w-4 invert-[70%]" />
              </div>
            </div>
          </div>

          {/* Your Posts */}
          <div className="w-full flex flex-col items-center gap-4">
            <p className="text-black text-2xl">Your posts</p>
            <div
              className={`flex flex-col items-center w-full gap-4 ${
                !filteredPosts ? "justify-center" : ""
              }`}
            >
              {filteredPosts ? (
                <Posts
                  posts={posts.filter((p) => p.username == username)}
                  handleVote={handleVote}
                />
              ) : (
                <div className="flex flex-col justify-center items-center text-center">
                  <p className="text-zinc-500 text-xl">
                    You currently have no posts!
                  </p>
                  <p className="text-zinc-500 text-lg">
                    Create your first post by visiting the{" "}
                    <span
                      className="text-blue-500 underline hover:cursor-pointer"
                      onClick={() => navigate("/wroteit-deploy/Home")}
                    >
                      home page
                    </span>
                    !
                  </p>
                  <img src={wroteitLogo} alt="" className="w-24" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
