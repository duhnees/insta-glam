
import { useState } from "react";
import { useInteractWithPost } from "../util/post-interactions";

interface CommProps {
    onChange: (boolean) => void,
    parent?: string,
    postId: string
}

//TODO: make this not look like a popup and make it integrate w/ the background
export default function CommentPopup({ onChange, parent, postId } : CommProps) {
    const [comment, setComment] = useState('');
    const { leaveComment, interactPost } = useInteractWithPost();
    
    return (
        <div>
             <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col space-y-4 w-full text-left">
                <textarea
                        className="border border-teal-800 rounded w-full h-[100px]"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        placeholder="Leave a comment..."
                />
                <button onClick={() => {leaveComment(postId, comment, parent); interactPost(postId, false, true); onChange(false);}}>Comment</button>
                <button onClick={() => onChange(false)}>Cancel</button>
            </div>
        </div>
    );
}