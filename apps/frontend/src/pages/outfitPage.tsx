import { createContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import OutfitEditing from "../components/outfitComponents/outfitEditing";
import { fetchSinglePost } from "../util/fetcher";
import { useInteractWithPost } from "../util/post-interactions";

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
    const { data: postInfoData } = useSWR(postId ?
        [`/post/getSinglePost`, postId] : null,
        ([url, id]) => fetchSinglePost(url, id),
        { refreshInterval: 2000 }
    );

    const [outfitValues, setOutfitValues] = useState(postInfoData || defaultValues);
    const { caption } = outfitValues;

    const [currCaption, setCaption] = useState(caption);
    const navigate = useNavigate();
    const { makeNewPost, saveDraft } = useInteractWithPost();

    useEffect(() => {
        if (postInfoData) {
            setOutfitValues({ ...postInfoData });
            setCaption(postInfoData.caption);
        }
    }, [postInfoData]);

    const handleOutfitChange = (key, value) => {
        setOutfitValues((prevValues) => {
            const updatedValues = { ...prevValues, [key]: value };
            return updatedValues;
        });
    };


    return (
        <div className="bg-pink-200 py-6 px-20 w-full h-full flex justify-between min-h-screen">
            <OutfitContext.Provider value={{ outfitValues, handleOutfitChange }}>
                <OutfitEditing />
            </OutfitContext.Provider>
            <div className="float-right flex flex-col items-end p-4 space-y-4">
                <textarea
                    className="border border-teal-800 rounded h-[400px] w-[500px]"
                    value={currCaption}
                    onChange={(event) => setCaption(event.target.value)}
                    placeholder="Write a caption..."
                />
                <div className="space-x-8 justify-center">
                    <button className="btn bg-purple-500 hover:bg-pink-400 text-white font-bold py-2 px-4 rounded"
                        onClick={async () => {
                            postId ? await saveDraft(postId, currCaption, outfitValues, false) : await makeNewPost(currCaption, outfitValues, false);
                            navigate('/');
                        }}
                    >Post
                    </button>
                    <button className="btn bg-white hover:bg-pink-400 hover:text-white text-purple-500 font-bold py-2 px-4 rounded"
                        onClick={async () => {
                            postId ? await saveDraft(postId, currCaption, outfitValues, true) : await makeNewPost(currCaption, outfitValues, true);
                            navigate('/');
                        }}
                    >Save as draft
                    </button>
                    <button className="btn bg-red-500 hover:bg-white text-white hover:text-red-500 font-bold py-2 px-4 rounded"
                        onClick={() => navigate('/')}
                    >Close
                    </button>
                </div>
            </div>
        </div>
    );
}

