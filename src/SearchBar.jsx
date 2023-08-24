import React, { useEffect, useState } from "react";
import magnifyingGlass from "./assets/magnifying-glass.png";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ posts, communities }) {
  const [showSearch, setShowSearch] = useState(false);
  const [searched, setSearched] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (searched) {
      setShowSearch(true);
    }
  }, [searched]);

  return (
    <div className="w-6/12 xl:w-3/12 h-12 relative rounded-lg shadow-sm">
      <img
        src={magnifyingGlass}
        alt=""
        className="w-6 absolute top-3 left-3 invert-[50%]"
      />
      <input
        type="text"
        placeholder="Search..."
        value={searched}
        className="w-full h-12 rounded-lg text-black border-slate-200 border px-12 focus:outline-0"
        onChange={(e) => setSearched(e.target.value)}
        onFocus={() => setShowSearch(true)}
        onBlur={() => setShowSearch(false)}
      />
      {showSearch && (
        <div className="absolute mt-1 w-full p-2 bg-white shadow-lg rounded-bl rounded-br max-h-48 overflow-y-auto">
          <p className="font-bold border-b ">Posts</p>
          {posts.map((post) => {
            if (!searched || post.title.toLowerCase().includes(searched)) {
              return (
                <p
                  key={post.id}
                  className="hover:bg-slate-50 hover:cursor-pointer px-1 py-1"
                  onClick={() => navigate(`/wroteit-deploy/post/${post.id}`)}
                >
                  {post.title}
                </p>
              );
            }
          })}
          <p className="font-bold border-b">Communities</p>
          {communities.map((comm) => {
            if (
              !searched ||
              comm.communityName.toLowerCase().includes(searched)
            ) {
              return (
                <p
                  key={comm.id}
                  className="hover:bg-slate-50 hover:cursor-pointer px-1 py-1"
                  onClick={() => {
                    navigate(`/wroteit-deploy/${comm.communityName}`);
                  }}
                >
                  w/{comm.communityName}
                </p>
              );
            }
          })}
        </div>
      )}
    </div>
  );
}
