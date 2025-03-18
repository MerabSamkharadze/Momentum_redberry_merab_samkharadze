"use client";
import React, { useEffect, useState } from "react";

interface Comment {
  id: number;
  text: string;
  task_id: number;
  parent_id: number | null;
  author_avatar: string;
  author_nickname: string;
  sub_comments?: Comment[];
}

export default function Comentars({ id }: { id: string }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openReply, setOpenReply] = useState<{ [key: number]: boolean }>({});
  const [replyTexts, setReplyTexts] = useState<{ [key: number]: string }>({});

  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/comments/${id}`);
      if (!res.ok) {
        throw new Error("კომენტარების წამოღება ვერ მოხერხდა");
      }
      const data = await res.json();
      setComments(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

  const totalComments = comments.reduce(
    (acc, com) =>
      acc +
      1 +
      (com.sub_comments && com.sub_comments.length
        ? com.sub_comments.length
        : 0),
    0
  );

  const handleAddComment = async () => {
    try {
      const res = await fetch(
        `https://momentum.redberryinternship.ge/api
/tasks/${id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 9e686711-3c8a-4e08-8fbe-15612e25ab5b`,
          },
          body: JSON.stringify({ text: comment }),
        }
      );
      if (!res.ok) {
        throw new Error("კომენტარის დამატება ვერ მოხერხდა");
      }
      await fetchComments();
      setComment("");
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    }
  };

  const handleReply = async (parentId: number) => {
    try {
      const replyText = replyTexts[parentId];
      if (!replyText) return;
      const res = await fetch(
        `https://momentum.redberryinternship.ge/api
/tasks/${id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 9e686711-3c8a-4e08-8fbe-15612e25ab5b`,
          },
          body: JSON.stringify({ text: replyText, parent_id: parentId }),
        }
      );
      if (!res.ok) {
        throw new Error("პასუხის დამატება ვერ მოხერხდა");
      }
      await fetchComments();
      setReplyTexts((prev) => ({ ...prev, [parentId]: "" }));
      setOpenReply((prev) => ({ ...prev, [parentId]: false }));
    } catch (err: any) {
      console.error(err);
      alert("პასუხის დამატება ვერ მოხერხდა");
    }
  };

  return (
    <div className="w-[741px] h-[975px] absolute left-[1059px] top-[199px] bg-purple-50/60 rounded-[10px] outline-[0.30px] outline-offset-[-0.30px] overflow-scroll outline-violet-200">
      <div className="w-[651px] px-5 pt-4 pb-3.5  ml-[45px] mt-[40px] bg-white rounded-[10px] outline outline-gray-400 inline-flex flex-col gap-2.5">
        <div className="py-2.5 inline-flex justify-center items-center gap-2.5 w-full">
          <textarea
            placeholder="დაწერე კომენტარი..."
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-2 resize-none focus:outline-none text-zinc-700 text-sm"
          />
        </div>
        <div className="self-stretch inline-flex justify-between items-center">
          <div className="w-5 h-8 p-2.5" />
          <button
            onClick={handleAddComment}
            disabled={!comment}
            className={`w-40 px-5 py-2 rounded-[20px] flex justify-center items-center gap-2.5 text-base font-normal font-['FiraGO'] ${
              comment.trim()
                ? "bg-violet-600"
                : " bg-violet-500 cursor-not-allowed"
            }`}
          >
            <span className="text-white">დააკომენტარე</span>
          </button>
        </div>
      </div>

      <div className=" ml-[45px] mt-[14px] inline-flex justify-start items-center gap-1.5">
        <div className="text-black text-xl font-medium font-sans">
          კომენტარები
        </div>
        <div className="w-7 h-5 p-2.5 bg-violet-600 rounded-[30px] inline-flex flex-col justify-center items-center">
          <div className="text-white text-sm font-medium font-sans">
            {totalComments}
          </div>
        </div>
      </div>

      <div className=" ml-[45px] mt-7  w-[651px]">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="w-10 h-10 border-4 border-t-4 border-t-violet-600 border-gray-200 rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="text-red-500">Error: {error}</div>
        ) : comments.length === 0 ? (
          <div>კომენტარები არ არის</div>
        ) : (
          comments.map((com) => (
            <div key={com.id} className="mb-4">
              <div className="flex items-start gap-2">
                <img
                  className="w-9 h-9 rounded-full"
                  src={com.author_avatar}
                  alt={com.author_nickname}
                />
                <div>
                  <div className="font-medium">{com.author_nickname}</div>
                  <div className="text-base text-neutral-700">{com.text}</div>

                  {com.parent_id === null && (
                    <button
                      onClick={() =>
                        setOpenReply((prev) => ({
                          ...prev,
                          [com.id]: !prev[com.id],
                        }))
                      }
                      className="flex gap-1 text-violet-600 hover:text-violet-400 text-xs font-normal font-['FiraGO'] cursor-pointer mt-1"
                    >
                      <span>
                        <img src="/Left.svg" alt="უპასუხე იკონი" />
                      </span>
                      უპასუხე
                    </button>
                  )}

                  {openReply[com.id] && (
                    <div className="mt-2">
                      <textarea
                        autoFocus
                        placeholder="დაწერე პასუხი..."
                        value={replyTexts[com.id] || ""}
                        onChange={(e) =>
                          setReplyTexts((prev) => ({
                            ...prev,
                            [com.id]: e.target.value,
                          }))
                        }
                        className="w-full px-2 py-1 border rounded text-sm "
                        rows={2}
                      />
                      <button
                        onClick={() => handleReply(com.id)}
                        disabled={
                          !replyTexts[com.id] || !replyTexts[com.id].trim()
                        }
                        className="mt-1 bg-violet-600 hover:bg-violet-400 text-white px-3 py-1 cursor-pointer rounded text-xs"
                      >
                        უპასუხე
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {com.sub_comments && com.sub_comments.length > 0 && (
                <div className="ml-10 mt-2">
                  {com.sub_comments.map((sub) => (
                    <div key={sub.id} className="flex items-start gap-2 mb-2">
                      <img
                        className="w-8 h-8 rounded-full"
                        src={sub.author_avatar}
                        alt={sub.author_nickname}
                      />
                      <div>
                        <div className="font-medium">{sub.author_nickname}</div>
                        <div className="text-base text-neutral-700">
                          {sub.text}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
