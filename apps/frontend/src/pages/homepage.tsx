import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import NewPostButton from "../components/newPostComponents/newPostButton";
import NotifBar from "../components/notificationBar";
import SinglePost from "../components/singlePost";
import { fetcher } from "../util/fetcher";
import { useLogout } from "../util/logout";
import { poster } from "../util/poster";

export default function Homepage() {
    
    const {data: allPosts} = useSWR('/post', fetcher, {refreshInterval: 2000});
    const {data: user} = useSWR('/account', fetcher);
    const { data: currPosts } = useSWR(
        user ? '/post/getPostsFromFollowing' : null,
        url => poster(url, { username: user, draft: false }), {refreshInterval: 2000}
    );

    const logout = useLogout();
    const navigate = useNavigate();
    const [currState, setCurrState] = useState('following');
    
    //checking that current user is nonempty
    const loggedIn = user !== '';

    return (
        <div className="bg-pink-200 p-6 w-full h-full min-h-screen">
            <div className="flex flex-col float-right">
                {loggedIn && 
                    <div className="flex float-right space-x-4">
                        <p>Hi, {user}!</p>
                        <button className="btn text-purple-500 font-semibold" 
                                onClick={async () => logout()}
                            >Logout
                        </button>
                    </div>}
                {!loggedIn && 
                    <div className="flex float-right">
                        <button className="btn text-purple-500 font-semibold" 
                                onClick={async () => navigate('/login')}
                            >Login
                        </button>
                    </div>}
                {loggedIn && 
                    <div className="flex float-right">
                        <NotifBar user={user} />
                    </div>}
            </div>
            
            <div className="flex flex-col items-center justify-center overflow-y-auto space-y-6">
                <div className="space-x-8">
                    <button className={`btn text-lg font-semibold w-[80px] border-purple-500 ${currState === 'global' ? 'border-b-4' : ''}`} 
                            onClick={() => setCurrState('global')}
                        >Global
                    </button>
                    {loggedIn && 
                        <button className={`btn text-lg font-semibold w-[80px] border-purple-500 ${currState === 'following' ? 'border-b-4' : ''}`} 
                            onClick={() => setCurrState('following')}
                            >Following
                        </button>}
                </div>
                {(!loggedIn || currState === 'global') && allPosts && allPosts.slice().reverse().map(post => (
                    <SinglePost key={post._id} postId={post._id} loggedIn={loggedIn} />
                ))}
                {(currState === 'following') && currPosts && currPosts.slice().reverse().map(post => (
                    <SinglePost key={post._id} postId={post._id} loggedIn={loggedIn} />
                ))}
            </div>
            <div className="fixed bottom-0 right-0 p-6">
                {loggedIn && <NewPostButton /> }
            </div>
        </div>
    );
}