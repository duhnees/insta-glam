import { useState, createContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { fetchSinglePost } from "../util/fetcher";
import { useInteractWithPost } from "../util/post-interactions";
import OutfitEditing from "../components/outfitEditing";


const defaultValues = {
    caption: '',
    hat: -1,
    hair: -1,
    face: 0,
    top: 0,
    pants: 0,
    shoes: -1,
    accessory1: -1,
    accessory2: -1
};

export const OutfitContext = createContext({
    outfitValues: defaultValues,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleOutfitChange: (_key: string, _value: number) => {}
});

export default function OutfitPage() {
    const { postId } = useParams();
    const { data: postInfo } = useSWR(postId ?
        [`/post/getSinglePost`, postId] : null,
        ([url, id]) => fetchSinglePost(url, id)
        );

    const [outfitValues, setOutfitValues] = useState(postInfo ? postInfo : defaultValues);
    const {caption} = outfitValues;
  

    const [currCaption, setCaption] = useState(caption);
    const navigate = useNavigate();
    const { makeNewPost, saveDraft } = useInteractWithPost();

    const handleOutfitChange = (key, value) => {
        setOutfitValues((prevValues) => ({
            ...prevValues,
            [key]: value
        }));
    };

    return (
        <div className="bg-teal-300 p-6 w-full h-full flex justify-between">
            <OutfitContext.Provider value={{outfitValues, handleOutfitChange}}>
                <OutfitEditing />
            </OutfitContext.Provider>
            <div className="float-right flex flex-col items-end p-4">
                <textarea
                    className="border border-teal-800 rounded h-[400px] w-[500px]"
                    value={currCaption}
                    onChange={(event) => setCaption(event.target.value)}
                    placeholder="Write a caption..."
                />
                <div className="space-x-8 justify-center">
                    <button className="btn bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => {makeNewPost(currCaption, outfitValues, false); navigate('/')}}>Post</button>
                    <button className="btn bg-purple-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => {postId ? saveDraft(postId, currCaption, outfitValues) : makeNewPost(currCaption, outfitValues, true); navigate('/')}}>Save as draft</button>
                    <button className="btn bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => navigate('/')}>Close</button>
                </div>
            </div>
        </div>
    );

}
