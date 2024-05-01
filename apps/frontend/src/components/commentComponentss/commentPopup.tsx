import { useState } from "react";
import { useInteractWithPost } from "../../util/post-interactions";

interface CommProps {
    onChange: (boolean) => void,
    parent?: string,
    postId: string,
    receiver: string
}

export default function CommentPopup({ onChange, parent, postId, receiver } : CommProps) {
    const [comment, setComment] = useState('');
    const { leaveComment, interactPost, sendNotif } = useInteractWithPost();
    
    return (
        <div>
             <div className="bg-white p-6 rounded-lg flex flex-col space-y-4 w-full text-left">
                <textarea
                        className="border border-slate-400 rounded w-full h-[100px]"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        placeholder="Leave a comment..."
                />
                <div className="flex space-x-2 ml-auto">
                    <button
                        className="bg-pink-400 text-white rounded w-[80px] h-[30px]" 
                        onClick={() => {
                            leaveComment(postId, comment, parent); 
                            interactPost(postId, false, true);
                            sendNotif(receiver, 'comment', postId); 
                            onChange(false);
                        }}>Comment</button>
                    <button className="text-pink-800" onClick={() => onChange(false)}>Cancel</button>
                </div>
            </div>
        </div>
    );
}