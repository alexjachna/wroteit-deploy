import React from "react";
import Nav from "../Nav";
import Feed from "../Feed";
import { useParams } from "react-router-dom";

export default function Community({
  username,
  bio,
  posts,
  setPosts,
  communities,
  handleVote,
}) {
  const { community } = useParams();

  return (
    <div className="w-full h-fit flex flex-col">
      <Nav
        username={username}
        bio={bio}
        posts={posts}
        communities={communities}
      />
      <div className="px-2 lg:px-60 flex flex-col bg-zinc-50 justify-center align-center w-full">
        <h1 className="text-black text-4xl font-bold w-full py-7">
          w/{community}
        </h1>
        <Feed
          username={username}
          posts={posts.filter((p) => p.community == community)}
          setPosts={setPosts}
          ifCommunity={community}
          handleVote={handleVote}
        />
      </div>
    </div>
  );
}
