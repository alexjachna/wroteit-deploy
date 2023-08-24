import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "../Nav";
import Post from "../Post";
import Comment from "../Comment";

export default function PostPage({
  username,
  bio,
  posts,
  communities,
  addComment,
  handleVote,
}) {
  const [size, setSize] = useState(window.innerWidth);
  const [msg, setMsg] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    function handleResize() {
      setSize(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth]);

  function handleCommentAdd(e) {
    e.preventDefault();

    addComment(id, msg);

    setMsg("");
  }

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
          {posts.map((post) => {
            if (post.id == id) {
              return post.title;
            }
          })}
        </h1>

        <div className="flex flex-col xl:flex-row-reverse gap-4">
          {/* Your Communities */}
          {size >= 1280 && (
            <div className="w-full xl:max-w-sm h-fit bg-white border-gray-100 border rounded-lg">
              <div className="bg-green-100 flex items-center h-20 px-6 rounded-t-lg">
                <p className="text-black font-semibold text-lg pl-2">
                  Your Communities
                </p>
              </div>
              <div className="p-4 flex flex-col gap-4">
                {communities.map((c) => {
                  return (
                    <p
                      key={c.id}
                      className="hover:cursor-pointer"
                      onClick={() => navigate(`/${c.communityName}`)}
                    >
                      w/{c.communityName}
                    </p>
                  );
                })}
              </div>
            </div>
          )}

          {/* Post & Comments */}
          <div className="w-full h-fit flex flex-col gap-4 mb-7">
            {posts.map((post) => {
              if (post.id == id) {
                return (
                  <Post
                    username={post.username}
                    key={post.id}
                    handleVote={handleVote}
                    {...post}
                  />
                );
              }
            })}

            <div className=" p-4 border-b">
              <form onSubmit={handleCommentAdd}>
                <textarea
                  name="description"
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  placeholder="what are your thoughts?"
                  className="w-full h-48 border rounded-sm p-4 text-black resize-none"
                  required
                ></textarea>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white w-48 font-bold py-2 px-4 rounded"
                >
                  Comment
                </button>
              </form>
            </div>

            <div className="flex flex-col gap-4">
              {posts.map((post) => {
                if (post.id === id) {
                  return post.comments.map((p) => {
                    return (
                      <Comment
                        key={p.id}
                        postId={id}
                        username={p.username}
                        message={p.message}
                        addComment={addComment}
                      />
                    );
                  });
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
