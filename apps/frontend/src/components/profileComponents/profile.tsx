import { useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '../../util/fetcher';
import { useInteractWithPost } from '../../util/post-interactions';
import { poster } from '../../util/poster';
import { useUserInteractions } from '../../util/user-interactions';
import ThumbnailPost from '../postComponents/thumbnailPost';
import BioEditor from './bioEditor';

interface ProfileProps {
    username: string;
}

export default function Profile({ username }: ProfileProps) {
    
    const {getUserInfo, follow, unfollow} = useUserInteractions();
    const {sendNotif} = useInteractWithPost();

    const { data: userInfo } = useSWR(username, user => getUserInfo(user), { refreshInterval: 2000 });
    const { data: posts } = useSWR('/post/getPostsByUser', url => poster(url, { username: username, draft: false }));
    const { data: currUser } = useSWR('/account', fetcher);
    const { data: currUserInfo } = useSWR(currUser ? currUser : null, user => getUserInfo(user), { refreshInterval: 2000 });

    const {numFollowers, following, bio} = userInfo || {};
    const [isFollowing, setIsFollowing] = useState(currUserInfo && currUserInfo.following && currUserInfo.following.includes(username));
    const [editing, setEditing] = useState(false);

    const isOwnProfile = currUser && (currUser === username);

    return (
        <div>
            {userInfo &&
                <div className="flex flex-col items-center justify-center w-full space-y-4">
                    <div className="flex flex-col space-y-4">
                        <div className="flex space-x-8">
                            <h1 className="text-2xl font-bold text-purple-500 mr-8">{username}</h1>
                            {!isOwnProfile && isFollowing && 
                                <button className="btn bg-white hover:bg-purple-800 text-purple-500 hover:text-white font-bold py-2 px-4 rounded text-xl"
                                    onClick={async () => {
                                        unfollow(currUser, username); 
                                        setIsFollowing(false);}}>
                                    Unfollow
                                </button>}
                            {!isOwnProfile && !isFollowing &&
                                <button className="btn bg-purple-500 hover:bg-purple800 text-white font-bold py-2 px-4 rounded text-xl"
                                    onClick={async () => {
                                        follow(currUser, username); 
                                        sendNotif(username, 'follow'); 
                                        setIsFollowing(true);}}>
                                    Follow
                                </button>}
                            {isOwnProfile && 
                                <button className="btn bg-purple-500 hover:bg-purple800 text-white font-bold py-2 px-4 rounded text-xl"
                                    onClick={() => setEditing(true)}>
                                    Edit
                                </button>
                            }
                            <p>{numFollowers} Followers</p>
                            <p>{following.length - 1} Following</p>
                        </div>
                        <div className="text-left w-full">
                            {editing && <BioEditor bio={bio} onChange={setEditing} />}
                            {!editing && <p>{bio}</p>}
                        </div>
                    </div>
                    <div className="bg-white rounded w-full p-4">
                        <h2 className="text-xl font-semibold text-pink-400">Posts</h2>
                        <div className="grid grid-cols-3 gap-4">
                            {posts && posts.slice().reverse().map(post => (
                                <div key={post._id} className="py-2">
                                    <ThumbnailPost postId={post._id} editing={false}/>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}