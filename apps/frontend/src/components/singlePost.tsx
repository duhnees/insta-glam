import useSWR from "swr";
import { Link, useNavigate } from "react-router-dom";
import { useInteractWithPost } from "../util/post-interactions";
import { fetchSinglePost } from "../util/fetcher";
import OutfitComplete from "./outfitComplete";
import { useState } from "react";
import CommentPopup from "./commentPopup";
import RenderedComment from "./renderedComment";

interface PostProps {
    postId: string;
    loggedIn: boolean;
}

export default function SinglePost({ postId, loggedIn }: PostProps) {
    const [commenting, setCommenting] = useState(false);
    const navigate = useNavigate();
    const { interactPost, sendNotif } = useInteractWithPost();
    
    const { data: postInfo } = useSWR(
        [`/post/getSinglePost`, postId],
        ([url, id]) => fetchSinglePost(url, id)
      );
    const {author, caption, numLikes, numComments, hat, hair, face, top, pants, shoes, accessory1, accessory2} = postInfo || {};

    const { data: comments } = useSWR(
        [`/comment/getComments`, postId],
        ([url, id]) => fetchSinglePost(url, id)
    );
    
    return (
        <div className="flex border rounded w-fit p-4">
            { postInfo && 
            <div className="space-y-8">
                <div className="space-y-4 float-left w-80">
                    <Link className="text-2xl text-purple-500" to={`/profile/${author}`}>{author}</Link>
                    {caption !== '' && <p className="text-1xl">{caption}</p>}
                    <p className="text-1xl">{numLikes} Likes</p>
                    <p className="text-1xl">{numComments} Comments</p>
                    <button className="btn bg-teal-800 text-white font-bold rounded w-full h-[45px]" 
                        onClick={() => {
                            if(!loggedIn) {
                                navigate('/login');
                            } else {
                                interactPost(postId, true, false);
                                sendNotif(author, 'like', postId);
                            }
                    }}>Like</button>
                    {!commenting && <button className="btn bg-teal-800 text-white font-bold rounded w-full h-[45px]" 
                        onClick={() => {
                            if(!loggedIn) {
                                navigate('/login');
                            } else {
                                setCommenting(true);
                            }
                    }}>Comment</button>}
                    {commenting && <CommentPopup onChange={setCommenting} postId={postId} receiver={author}/>}
                    <div className="float-left"> 
                    {comments && comments.map(comment => (
                        <RenderedComment key={comment._id} author={comment.author} comment={comment.comment} postId={postId} commentId={comment._id} isReply={false} />
                    ))}
                </div>
                </div>
                <div className="float-right">
                    <OutfitComplete hat={hat} hair={hair} face={face} top={top} pants={pants} shoes={shoes} accessory1={accessory1} accessory2={accessory2} />
                </div>
            </div> }
        </div>
    );
}