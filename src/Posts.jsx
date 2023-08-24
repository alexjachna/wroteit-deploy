import React from "react";
import Post from "./Post";

export default function Posts({ posts, handleVote }) {
  return (
    <div className="w-full h-fit flex flex-col gap-4 pb-6">
      {posts.map((post) => {
        return <Post {...post} handleVote={handleVote} key={post.id} />;
      })}
    </div>
  );
}
