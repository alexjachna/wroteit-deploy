import React, { useEffect } from "react";
import House from "./assets/house.png";

export default function CreatePost({
  community,
  title,
  desc,
  setCommunity,
  setTitle,
  setDesc,
  createPost,
  ifCommunity,
}) {
  function handleCreatePost(e) {
    e.preventDefault();

    createPost();

    setCommunity("");
    setTitle("");
    setDesc("");
  }

  useEffect(() => {
    ifCommunity && setCommunity(ifCommunity);
  }, []);

  return (
    <div className="w-full max-w-md h-fit bg-white border-gray-100 border rounded-lg">
      <div className="bg-green-100 flex items-center h-20 px-6 rounded-t-lg">
        <img src={House} alt="" className="w-5" />
        <p className="text-black font-semibold text-lg pl-2">
          {ifCommunity ? ifCommunity : "Home"}
        </p>
      </div>
      <form
        onSubmit={handleCreatePost}
        className="m-3 flex flex-col gap-2 items-center"
      >
        {!ifCommunity && (
          <input
            name="community"
            value={community}
            onChange={(e) => setCommunity(e.target.value)}
            type="text"
            placeholder="community"
            className="w-full border rounded-sm px-2 text-black"
            required
          />
        )}
        <input
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="title"
          className="w-full border rounded-sm px-2 text-black"
          required
        />
        <textarea
          name="description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="description"
          className="w-full border rounded-sm p-2 text-black resize-none"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white w-11/12 font-bold py-2 px-4 rounded"
        >
          Create Post
        </button>
      </form>
      <div className="flex flex-col justify-center items-center p-4 h-fit">
        <p className="text-gray-600 mb-6">
          Your personal Wroteit page. Create your first post here.
        </p>
      </div>
    </div>
  );
}
