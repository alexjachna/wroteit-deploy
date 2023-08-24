import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Profile from "./Profile";
import Community from "./Community";
import PostPage from "./PostPage";
import { useState, useEffect } from "react";
import EditProfile from "./EditProfile";

function App() {
  const [username, setUsername] = useState(() => {
    const currentUsername = localStorage.getItem("username");
    if (currentUsername == null) {
      return "";
    } else {
      return currentUsername;
    }
  });
  const [bio, setBio] = useState("Wroteit User");
  const [posts, setPosts] = useState(() => {
    const localVal = sessionStorage.getItem("items");
    if (localVal == null) {
      return [
        {
          username: "wroteitFAN",
          id: crypto.randomUUID(),
          community: "crazyvideos",
          title: "UNREAL!",
          desc: "the FIRST ever video. https://www.youtube.com/watch?v=jNQXAC9IVRw",
          likes: 1036,
          liked: false,
          disliked: false,
          comments: [
            {
              id: crypto.randomUUID(),
              username: "yupyupyup999",
              message: "@wroteitFAN I totally agree.",
            },
            {
              id: crypto.randomUUID(),
              username: "wroteitFAN",
              message: "This is one for the history books",
            },
            {
              id: crypto.randomUUID(),
              username: "dantheman45",
              message: "this is actually crazy... just a guy at the zoo!",
            },
            {
              id: crypto.randomUUID(),
              username: "dantheman45",
              message: "I will remember this FOREVER.",
            },
          ],
        },
        {
          username: "alexjachna123",
          id: crypto.randomUUID(),
          community: "react",
          title: "hello world",
          desc: "hello world, this is react.",
          likes: 36,
          liked: false,
          disliked: false,
          comments: [
            {
              id: crypto.randomUUID(),
              username: "alexjachna123",
              message: "hello there",
            },
            {
              id: crypto.randomUUID(),
              username: "dantheman45",
              message: "this is awesome.",
            },
          ],
        },
        {
          username: "krazykoala45",
          id: crypto.randomUUID(),
          community: "theworld",
          title: "This is my World.",
          desc: "Hello world, the world is mine!!!!",
          likes: 122,
          liked: false,
          disliked: false,
          comments: [
            {
              id: crypto.randomUUID(),
              username: "alexjachna123",
              message: "hello there",
            },
          ],
        },
        {
          username: "reactenjoyer",
          id: crypto.randomUUID(),
          community: "react",
          title: "React help here!!",
          desc: "Hey guys, since I enjoy React so much, I wanted to help out. Here's a cool link: https://react.dev/",
          likes: 245,
          liked: false,
          disliked: false,
          comments: [
            {
              id: crypto.randomUUID(),
              username: "randomuserguy",
              message: "I also enjoy React :D",
            },
            {
              id: crypto.randomUUID(),
              username: "ilikethis",
              message: "I like this.",
            },
            {
              id: crypto.randomUUID(),
              username: "turtlefriend2",
              message: "I'll check this out later, thanks!",
            },
          ],
        },
      ];
    }

    return JSON.parse(localVal);
  });

  const [communities, setCommunities] = useState([]);

  // Populate communities with current communities
  useEffect(() => {
    const final = [];
    const arr = posts.map((post) => {
      return post.community;
    });
    arr.map((item) => {
      if (!final.includes(item)) {
        final.push(item);
      }
    });
    setCommunities(
      final.map((comm) => {
        return { id: crypto.randomUUID(), communityName: comm };
      })
    );
  }, [posts.length]);

  // Handle votes for posts
  function handleVote(id, num, ifLiked, setLiked, setDisliked) {
    setPosts((currentPosts) => {
      return currentPosts.map((post) => {
        if (post.id === id) {
          if (ifLiked) {
            return {
              ...post,
              likes: post.likes + num,
              liked: setLiked,
              disliked: setDisliked,
            };
          } else {
            return {
              ...post,
              likes: post.likes - num,
              liked: setLiked,
              disliked: setDisliked,
            };
          }
        }
        return post;
      });
    });
  }

  // Handle adding comments to specific post depending on id
  function addComment(id, msg) {
    setPosts((currentPosts) => {
      return currentPosts.map((post) => {
        if (post.id === id) {
          return {
            ...post,
            comments: [
              {
                id: crypto.randomUUID(),
                username: username,
                message: msg,
              },
              ...post.comments,
            ],
          };
        }
        return post;
      });
    });
  }

  // Save username & posts on refresh
  useEffect(() => {
    sessionStorage.setItem("items", JSON.stringify(posts));
    localStorage.setItem("username", username);
  }, []);

  // Reset all posts' liked and disliked flags
  useEffect(() => {
    setPosts((currentPosts) => {
      return currentPosts.map((post) => {
        return { ...post, liked: false, disliked: false };
      });
    });
  }, [username]);

  return (
    <div className="w-full h-screen flex flex-col">
      <Router>
        <Routes>
          <Route
            path="/wroteit-deploy/"
            element={<Login setUsername={setUsername} />}
          />
          <Route
            path="/wroteit-deploy/Home"
            element={
              <Home
                username={username}
                bio={bio}
                posts={posts}
                setPosts={setPosts}
                communities={communities}
                handleVote={handleVote}
              />
            }
          />
          <Route
            path="/wroteit-deploy/Profile"
            element={
              <Profile
                username={username}
                bio={bio}
                posts={posts}
                communities={communities}
                handleVote={handleVote}
              />
            }
          />
          <Route
            path="/wroteit-deploy/EditProfile"
            element={
              <EditProfile
                username={username}
                setUsername={setUsername}
                bio={bio}
                setBio={setBio}
                posts={posts}
                communities={communities}
              />
            }
          />
          <Route
            path="/wroteit-deploy/:community"
            element={
              <Community
                username={username}
                bio={bio}
                posts={posts}
                setPosts={setPosts}
                communities={communities}
                handleVote={handleVote}
              />
            }
          />
          <Route
            path="/wroteit-deploy/post/:id"
            element={
              <PostPage
                username={username}
                bio={bio}
                posts={posts}
                communities={communities}
                addComment={addComment}
                handleVote={handleVote}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
