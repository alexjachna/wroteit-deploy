import React, { useState } from "react";
import Posts from "./Posts";
import CreatePost from "./CreatePost";

export default function Feed({
  username,
  posts,
  setPosts,
  ifCommunity,
  handleVote,
}) {
  const [community, setCommunity] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  function createPost() {
    if (!community && !title && !desc) {
      console.log("empty inputs");
      return;
    }

    setPosts((currentPosts) => {
      return [
        {
          username,
          id: crypto.randomUUID(),
          community,
          title,
          desc,
          likes: 0,
          liked: false,
          disliked: false,
          comments: [],
        },
        ...currentPosts,
      ];
    });
  }

  return (
    <div
      className="w-full h-fit flex flex-col-reverse items-center gap-4
        xl:flex-row xl:justify-center xl:items-start"
    >
      <Posts posts={posts} handleVote={handleVote} />
      <CreatePost
        community={community}
        title={title}
        desc={desc}
        setCommunity={setCommunity}
        setTitle={setTitle}
        setDesc={setDesc}
        createPost={createPost}
        ifCommunity={ifCommunity}
      />
    </div>
  );
}
