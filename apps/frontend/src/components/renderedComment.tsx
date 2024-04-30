
import { useState } from "react";
import CommentPopup from "./commentPopup";
import useSWR from "swr";
import { fetchReplies } from "../util/fetcher";

interface CommProps {
    author: string,
    comment: string,
    postId: string,
    commentId: string,
    isReply: boolean
}

//TODO: make this not look like a popup and make it integrate w/ the background
export default function RenderedComment({ author, comment, postId, commentId, isReply } : CommProps) {
    const [replying, setReplying] = useState(false);
    const { data: replies } = useSWR(
        [`/comment/getReplies`, commentId],
        ([url, id]) => fetchReplies(url, id)
    );

    return (
        <div>
             <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col space-y-4 w-full text-left">
                <p>{author} says {comment}!</p>
                {!isReply && !replying && <button onClick={() => setReplying(true)}>Reply</button>}
                {replies && replies.map(comment => (
                    <RenderedComment key={comment._id} author={comment.author} comment={comment.comment} postId={postId} commentId={comment._id} isReply={true} />
                ))}
                {replying && <CommentPopup onChange={setReplying} parent={commentId} postId={postId} receiver={author} />}
            </div>
        </div>
    );
}