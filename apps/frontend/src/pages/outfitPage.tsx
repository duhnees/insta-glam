import { useState } from "react";
import Outfit from "../components/outfit";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { fetchSinglePost } from "../util/fetcher";

//TODO: posting/saving functionality
export default function OutfitPage() {
    const { postId } = useParams();
    const { data: postInfo } = useSWR(postId ?
        [`/post/getSinglePost`, postId] : null,
        ([url, id]) => fetchSinglePost(url, id)
        );

    const defaultValues = {
        hat: -1,
        hair: -1,
        face: 0,
        top: 0,
        pants: 0,
        shoes: -1,
        accessory1: -1,
        accessory2: -1
    };

    const outfitValues = postInfo ? postInfo : defaultValues;
    const {caption, hat, hair, face, top, pants, shoes, accessory1, accessory2} = outfitValues;

    const [currCaption, setCaption] = useState(caption);
    const navigate = useNavigate();

    return (
        <div className="bg-teal-300 p-6 w-full h-full flex justify-between">
            <div className="float-left p-4">
                <Outfit hat={hat} hair={hair} face={face} top={top} pant={pants} shoe={shoes} accessory1={accessory1} accessory2={accessory2} isEditing={true} />
            </div>
            <div className="float-right flex flex-col items-end p-4">
                <textarea
                    className="border border-teal-800 rounded h-[400px] w-[500px]"
                    value={currCaption}
                    onChange={(event) => setCaption(event.target.value)}
                    placeholder="Write a caption..."
                />
                <div className="space-x-8 justify-center">
                    <button className="btn bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => navigate('/')}>Post</button>
                    <button className="btn bg-purple-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => navigate('/')}>Save as draft</button>
                    <button className="btn bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => navigate('/')}>Close</button>
                </div>
            </div>
        </div>
    );
}
