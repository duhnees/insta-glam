
import useSWR from "swr";
import { fetchSinglePost } from "../../util/fetcher";

import { useNavigate } from "react-router-dom";
import OutfitComplete from "../outfitComponents/outfitComplete";

interface PostProps {
    postId: string,
    editing: boolean
}

export default function ThumbnailPost({ postId, editing }: PostProps) {

    const navigate = useNavigate();

    const { data: postInfo } = useSWR(
        [`/post/getSinglePost`, postId],
        ([url, id]) => fetchSinglePost(url, id),
        {refreshInterval: 2000}
      );

    const navigateString = editing ? `/outfit/${postId}` : `/post/${postId}`

    return (
        <button onClick={() => navigate(navigateString)}>
            <div className="flex bg-white shadow-sm rounded-md w-fit p-4 h-[400px] hover:bg-gray-200 transition-colors duration-300 cursor-pointer">
                {postInfo && (
                    <OutfitComplete
                        hat={postInfo.hat}
                        hair={postInfo.hair}
                        face={postInfo.face}
                        top={postInfo.top}
                        pants={postInfo.pants}
                        shoes={postInfo.shoes}
                        accessory1={postInfo.accessory1}
                        accessory2={postInfo.accessory2}
                        isThumbnail={true}
                    />
                )}
            </div>
        </button>
    );
}