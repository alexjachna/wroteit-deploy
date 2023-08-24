import React, { useState } from "react";

export default function Comment({ id, postId, username, message, addComment }) {
  const [showTextarea, setShowTextarea] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [report, setReport] = useState();
  const [ifReported, setIfReported] = useState(false);
  const [reply, setReply] = useState("@" + username + " ");

  function handleReplyAdd(e) {
    e.preventDefault();

    addComment(postId, reply);

    setShowTextarea(!showTextarea);

    setReply("@" + username);
  }

  function handleReport(e) {
    e.preventDefault();

    setIfReported(true);

    setShowReport(!showReport);
  }

  return (
    <div
      className="w-full h-fit flex flex-col gap-2 px-4 py-2 border-l"
      key={id}
    >
      <p className="text-gray-500">
        Posted by <span className="text-gray-500">•</span> {username}
      </p>
      {ifReported ? (
        <p className="font-bold text-gray-500">
          This comment has been reported for {report}.
        </p>
      ) : (
        <p>{message}</p>
      )}
      {!ifReported && (
        <div className="flex gap-8">
          <p
            className="text-xs text-gray-500 hover:text-gray-700 hover:cursor-pointer"
            onClick={() => setShowTextarea(!showTextarea)}
          >
            REPLY
          </p>
          <p
            className="text-xs text-gray-500 hover:text-gray-700 hover:cursor-pointer"
            onClick={() => setShowReport(!showReport)}
          >
            REPORT
          </p>
        </div>
      )}

      {showTextarea && (
        <div className=" p-4 border-b">
          <form onSubmit={handleReplyAdd}>
            <textarea
              name="description"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="what is your reply?"
              className="w-full h-48 border rounded-sm p-4 text-black resize-none"
              required
            ></textarea>
            <div className="flex items-center gap-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white w-48 font-bold py-2 px-4 rounded"
              >
                Reply
              </button>
              <p
                className="text-gray-500 text-xs hover:cursor-pointer hover:text-gray-700"
                onClick={() => setShowTextarea(!showTextarea)}
              >
                cancel
              </p>
            </div>
          </form>
        </div>
      )}
      {showReport && (
        <div className=" p-4 border-b">
          <form className="flex flex-col gap-4" onSubmit={handleReport}>
            <p>What is the reason you are reporting this comment for?</p>
            <label htmlFor="opt1" className="flex items-center gap-2">
              <input
                type="radio"
                name="report"
                value="Harassment"
                id="opt1"
                onChange={(e) => setReport(e.target.value)}
              />
              Harassment
            </label>
            <label htmlFor="opt2" className="flex items-center gap-2">
              <input
                type="radio"
                name="report"
                value="Negativity"
                id="opt2"
                onChange={(e) => setReport(e.target.value)}
              />
              Negativity
            </label>
            <label htmlFor="opt3" className="flex items-center gap-2">
              <input
                type="radio"
                name="report"
                value="Offensive Language"
                id="opt3"
                onChange={(e) => setReport(e.target.value)}
              />
              Offensive Language
            </label>
            <label htmlFor="opt4" className="flex items-center gap-2">
              <input
                type="radio"
                name="report"
                value="Other"
                id="opt4"
                onChange={(e) => setReport(e.target.value)}
              />
              Other
            </label>
            <div className="flex items-center gap-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white w-48 font-bold py-2 px-4 rounded"
              >
                Report
              </button>
              <p
                className="text-gray-500 text-xs hover:cursor-pointer hover:text-gray-700"
                onClick={() => setShowReport(!showReport)}
              >
                cancel
              </p>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
