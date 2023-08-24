import React, { useEffect } from "react";
import { useState } from "react";
import upArrow from "./assets/up-arrow.png";
import downArrow from "./assets/down-arrow.png";

export default function Vote({ likes, id, liked, disliked, handleVote }) {
  const [up, setUp] = useState(liked ? "up-arrow-selected" : "");
  const [down, setDown] = useState(disliked ? "down-arrow-selected" : "");

  function handleLike() {
    if (liked && !disliked) {
      handleVote(id, 1, false, false, false);
    } else if (!liked && disliked) {
      handleVote(id, 2, true, true, false);
    } else if (!liked && !disliked) {
      handleVote(id, 1, true, true, false);
    }
  }

  function handleDislike() {
    if (liked && !disliked) {
      handleVote(id, 2, false, false, true);
    } else if (!liked && disliked) {
      handleVote(id, 1, true, false, false);
    } else if (!liked && !disliked) {
      handleVote(id, 1, false, false, true);
    }
  }

  useEffect(() => {
    setUp(liked ? "up-arrow-selected" : "");
    setDown(disliked ? "down-arrow-selected" : "");
  }, [liked, disliked]);

  return (
    <div
      id="vote"
      className="flex flex-col gap-4 justify-center items-center basis-1/6"
    >
      <img
        src={upArrow}
        alt="upvote-arrow"
        id={up}
        className="w-8 xl:w-6 hover:cursor-pointer"
        onClick={handleLike}
      />
      <p className="font-bold">{likes}</p>
      <img
        src={downArrow}
        alt="downvote-arrow"
        id={down}
        className="w-8 xl:w-6 hover:cursor-pointer"
        onClick={handleDislike}
      />
    </div>
  );
}
