import useSWR from 'swr';
import { poster } from '../util/poster';

interface ProfileProps {
    username: string;
}

//TODO: add follow & unfollow, better rendering of posts
export default function Profile({ username }: ProfileProps) {
    const {data: userInfo} = useSWR('/account/getUser', url => poster(url, { username: username }));
    const {data: posts} = useSWR('/post/getPostsByUser', url => poster(url, { username: username, draft: false }));

    const {numFollowers, following} = userInfo || {};

    return (
        <div>
            {userInfo &&
                <div className="flex flex-col items-center justify-center w-full">
                    <div className="flex space-x-8">
                        <h1 className="text-2xl font-bold text-purple-500 mr-8">{username}</h1>
                        <p>{numFollowers} Followers</p>
                        <p>{following.length - 1} Following</p>
                    </div>
                    
                    <div className="bg-white rounded w-full">
                        <h2 className="text-xl font-semibold text-pink-400">Posts</h2>
                        <ul>
                            {posts && posts.map(post => (
                                <li key={post._id}>{post._id}</li>
                            ))}
                        </ul>
                    </div>
                    
                </div>
            }
        </div>
    );
}