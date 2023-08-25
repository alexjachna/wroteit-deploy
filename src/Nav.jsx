import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import Account from "./Account";
import wroteitLogo from "./assets/wroteit-logo.png";
import hamburger from "./assets/hamburger.png";
import magnifyingGlass from "./assets/magnifying-glass.png";
import xIcon from "./assets/x-icon.png";
import profileImage from "./assets/profile.png";
import SearchBar from "./SearchBar";

export default function Nav({ username, bio, posts, communities }) {
  const [size, setSize] = useState(window.innerWidth);
  const [showNav, setShowNav] = useState(false);
  const navigate = useNavigate();

  function toggleNav(nav) {
    nav ? setShowNav(false) : setShowNav(true);
  }

  useEffect(() => {
    function handleResize() {
      setSize(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth]);

  return (
    <div className="flex justify-evenly items-center w-full bg-zinc-100 border-b-slate-500 border-b-[1px] border-opacity-25">
      <div
        className="flex items-center h-20 hover:cursor-pointer"
        onClick={() => navigate("/wroteit-deploy/Home")}
      >
        <img src={wroteitLogo} alt="wroteit logo" className="w-12" />
        <p className="text-zinc-700 text-lg font-medium">Wroteit</p>
      </div>
      {size >= 1280 ? (
        <>
          <SearchBar posts={posts} communities={communities} />
          <Account username={username} bio={bio} />
        </>
      ) : (
        <div className="">
          <img
            src={hamburger}
            alt=""
            className="w-10 hover:cursor-pointer"
            onClick={() => toggleNav(showNav)}
          />
          {showNav ? (
            <div className="absolute z-10 top-0 right-0 w-full h-fit bg-white shadow-sm border-b">
              <div className="h-20 flex justify-between items-center px-12 gap-5 text-zinc-700 border-b border-b-black">
                <p className="text-2xl">Wroteit</p>
                <img
                  src={xIcon}
                  alt=""
                  className="w-6 hover:cursor-pointer"
                  onClick={() => toggleNav(showNav)}
                />
              </div>
              <div className="flex flex-col gap-3 text-zinc-700 p-6 border-b border-b-black">
                <p className="font-bold text-xl">For you</p>
                <div
                  className="flex gap-4"
                  onClick={() => {
                    setShowNav(!showNav);
                    navigate("/wroteit-deploy/Profile");
                  }}
                >
                  <img src={profileImage} alt="" className="h-6" />
                  <p>Profile</p>
                </div>
                <p
                  className="text-sm text-zinc-500"
                  onClick={() => navigate("/wroteit-deploy/")}
                >
                  Sign out
                </p>
              </div>
              <div className="flex flex-col gap-3 text-zinc-700 p-6">
                <p className="font-bold text-xl">Your communities</p>
                <div className="flex flex-col gap-4">
                  {communities.map((c) => {
                    return (
                      <p
                        key={c.id}
                        onClick={() => {
                          toggleNav(showNav);
                          navigate(`/wroteit-deploy/${c.communityName}`);
                        }}
                      >
                        w/{c.communityName}
                      </p>
                    );
                  })}
                </div>
                <p className="font-bold text-xl">All Posts</p>
                {posts.map((post) => {
                  return (
                    <div
                      key={post.id}
                      className="flex justify-between"
                      onClick={() => {
                        toggleNav(showNav);
                        navigate(`/wroteit-deploy/post/${post.id}`);
                      }}
                    >
                      <p className="hover:bg-slate-50 px-1">{post.title}</p>
                      <p className="text-xs">w/{post.community}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
