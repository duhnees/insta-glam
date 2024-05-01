import { useState } from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { fetchReplies } from "../../util/fetcher";
import CommentPopup from "./commentPopup";

interface CommProps {
    author: string,
    comment: string,
    postId: string,
    commentId: string,
    isReply: boolean
}

export default function RenderedComment({ author, comment, postId, commentId, isReply } : CommProps) {
    const [replying, setReplying] = useState(false);
    const { data: replies } = useSWR(
        [`/comment/getReplies`, commentId],
        ([url, id]) => fetchReplies(url, id),
        {refreshInterval: 2000}
    );

    return (
        <div>
             <div className="flex flex-col space-y-2 w-full text-left border-t-2 mt-2">
                <Link className="text-lg font-medium text-purple-500" 
                      to={`/profile/${author}`}
                      >{author}
                </Link>
                <p className="text-base">{comment}</p>
                {!isReply && !replying && 
                    <button className="bg-pink-400 text-white rounded w-[80px] h-[30px] ml-auto" 
                            onClick={() => setReplying(true)}
                        >Reply
                    </button>}
                {replies && replies.map(comment => (
                    <div className="ml-4" key={comment._id}>
                        <RenderedComment author={comment.author} comment={comment.comment} postId={postId} commentId={comment._id} isReply={true} />
                    </div>
                ))}
                {replying && <CommentPopup onChange={setReplying} parent={commentId} postId={postId} receiver={author} />}
            </div>
        </div>
    );
}