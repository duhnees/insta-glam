import useSWR from "swr";
import { fetcher } from "../util/fetcher";
import { PopProps } from "./newPostComponents/newPostPopup";
import axios from "axios";
import ThumbnailPost from "./thumbnailPost";

async function fetchDrafts(url, username) {
    try {
        const response = await axios.post(url, {
            username: username,
            draft: true
        });
        return response.data;
    } catch (error) {
        // eslint-disable-next-line no-alert
        alert(error.response.data.message);
        return 500;
    }
  }

export default function DraftsPopup({ onChange } : PopProps) {
    const {data: user} = useSWR('/account', fetcher);
    const { data: drafts } = useSWR(user ?
        [`/post/getPostsByUser`, user] : null,
        ([url, username]) => fetchDrafts(url, username),
        {refreshInterval: 2000}
      );

    return (
        <div>
             <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col space-y-4 w-[600px] h-[500px] text-left items-center">
                {drafts && drafts.length !== 0 && 
                    <div className="w-full h-[400px] overflow-y-auto">
                        <h3>Drafts</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {drafts && drafts.slice().reverse().map(post => (
                                <div key={post._id} className="py-2">
                                    <ThumbnailPost postId={post._id} editing={true} />
                                </div>
                            ))}
                        </div>
                    </div>}
                {drafts && drafts.length === 0 && 
                    <div>
                        <p className="text-lg">You currently have 0 drafts</p>
                    </div>}
                <button onClick={() => onChange(false)}>Back</button>
            </div>
        </div>
    );
}