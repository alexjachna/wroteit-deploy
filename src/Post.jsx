import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Vote from "./Vote";
import commentImg from "./assets/comments.png";

export default function Post({
  username,
  id,
  community,
  title,
  desc,
  likes,
  liked,
  disliked,
  comments,
  handleVote,
}) {
  const navigate = useNavigate();
  const [commentNum, setCommentNum] = useState(comments.length);

  useEffect(() => {
    setCommentNum(comments.length);
  }, [comments]);

  return (
    <div
      className="w-full h-60 bg-white border-zinc-100 border rounded-md text-black shadow-sm"
      key={id}
    >
      <div id="content" className="h-[80%] flex">
        <Vote
          likes={likes}
          id={id}
          liked={liked}
          disliked={disliked}
          handleVote={handleVote}
        />
        <div
          id="info"
          className="flex flex-col gap-4 py-4 overflow-hidden basis-5/6"
        >
          <div id="credentials" className="flex gap-1 items-center">
            <p
              className="inline-block border-b border-b-gray-900 font-semibold hover:cursor-pointer"
              onClick={() => navigate(`/${community}`)}
            >
              w/{community}
            </p>
            <span className="text-gray-500">•</span>
            <p className="text-gray-500 text-sm">Posted by {username}</p>
          </div>
          <p
            id="title"
            className="text-lg font-bold hover:cursor-pointer"
            onClick={() => navigate(`/post/${id}`)}
          >
            {title}
          </p>
          <p id="description">{desc}</p>
        </div>
      </div>
      <div
        id="comments"
        className="h-[20%] bg-slate-50 flex items-center gap-3 px-6 hover:cursor-pointer"
        onClick={() => navigate(`/post/${id}`)}
      >
        <img src={commentImg} alt="" className="h-6" />
        <p>
          {commentNum} {commentNum == 1 ? "Comment" : "Comments"}
        </p>
      </div>
    </div>
  );
}
