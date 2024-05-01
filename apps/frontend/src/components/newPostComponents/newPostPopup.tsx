import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DraftsPopup from "../draftsPopup";

export interface PopProps {
    onChange: (boolean) => void;
}

export default function NewPostPopup({ onChange } : PopProps) {
    const [draftClicked, setDraftClicked] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            {!draftClicked && 
            <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col space-y-4 w-[600px] text-left">
                <div className="flex justify-between">
                    <button className="btn rounded border-2 border-purple-100 text-lg text-purple-500 w-[275px] h-[200px] hover:bg-purple-500 hover:text-white font-semibold" 
                            onClick={() => navigate('/outfit')}
                        >New Post
                    </button>
                    <button className="btn rounded border-2 border-purple-100 text-lg text-purple-500 w-[275px] h-[200px] hover:bg-purple-500 hover:text-white font-semibold" 
                            onClick={() => {setDraftClicked(true);}}
                        >Edit Draft
                    </button>
                </div>
                <button className="btn" onClick={() => onChange(false)}>Close</button>
            </div>}
            {draftClicked && <DraftsPopup onChange={setDraftClicked} />}
        </div> 
        );
    
}