import { PopProps } from "./newPostPopup";


export default function DraftsPopup({ onChange } : PopProps) {
    return (
        <div>
             <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col space-y-4 w-[600px] text-left">
                <button onClick={() => onChange(false)}>Back</button>
            </div>
        </div>
    );
}