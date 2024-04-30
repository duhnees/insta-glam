import { fetcher } from "../util/fetcher";
import { useLogout } from "../util/logout";
import useSWR from "swr";
import { poster } from "../util/poster";
import SinglePost from "../components/singlePost";
import { useNavigate } from "react-router-dom";
import NewPostButton from "../components/newPostButton";
import NotifBar from "../components/notificationBar";
import { useState } from "react";

export default function Homepage() {
    const {data: allPosts} = useSWR('/post', fetcher);
    const {data: user} = useSWR('/account', fetcher);
    const { data: currPosts } = useSWR(
        user ? '/post/getPostsFromFollowing' : null,
        url => poster(url, { username: user, draft: false })
    );

    const logout = useLogout();
    const navigate = useNavigate();

    const [currState, setCurrState] = useState('following');
    //checking that current user is nonempty
    const loggedIn = user !== '';

    return (
        <div className="bg-teal-300 p-6 w-full h-full">
            <div className="flex flex-col float-right">
                {loggedIn && <div className="flex float-right space-x-4">
                    <p>Hi, {user}!</p>
                    <button className="btn text-teal-800 font-semibold" onClick={async () => logout()}>
                            Logout
                    </button>
                </div>}
                {!loggedIn && <div className="flex float-right">
                    <button className="btn text-teal-800 font-semibold" onClick={async () => navigate('/login')}>
                            Login
                    </button>
                </div>}
                {loggedIn && 
                    <div className="flex float-right">
                        <NotifBar user={user} />
                    </div>}
            </div>
            
            <div className="flex flex-col items-center justify-center overflow-y-auto">
                <div className="space-x-8">
                    <button className={`btn w-[80px] ${currState === 'global' ? 'border-b-2' : ''}`} onClick={() => setCurrState('global')}>
                        Global
                    </button>
                    <button className={`btn w-[80px] ${currState === 'following' ? 'border-b-2' : ''}`} onClick={() => setCurrState('following')}>
                        Following
                    </button>
                </div>
                {(!loggedIn || currState === 'global') && allPosts && allPosts.map(post => (
                    <SinglePost key={post._id} postId={post._id} loggedIn={loggedIn} />
                ))}
                {(currState === 'following') && currPosts && currPosts.map(post => (
                    <SinglePost key={post._id} postId={post._id} loggedIn={loggedIn} />
                ))}
            </div>
            <div className="fixed bottom-0 right-0 p-6">
                {loggedIn && <NewPostButton /> }
            </div>
        </div>
    );
}