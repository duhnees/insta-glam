import { useState } from "react";
import DraftsPopup from "./draftsPopup";
import { useNavigate } from "react-router-dom";

export interface PopProps {
    onChange: (boolean) => void;
}

//NewPost will nav to new page (outfit editor), editdraft will bring popup asking for what draft and then clicking on that opens the editor
export default function NewPostPopup({ onChange } : PopProps) {
    const [draftClicked, setDraftClicked] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center">
            {!draftClicked && 
            <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col space-y-4 w-[600px] text-left">
                <button onClick={() => navigate('/outfit')}>New Post</button>
                <button onClick={() => {setDraftClicked(true);}}>Edit Draft</button>
                <button onClick={() => onChange(false)}>Close</button>
            </div>}
            {draftClicked && <DraftsPopup onChange={setDraftClicked} />}
        </div> 
        );
    
}