import { useState } from "react";


interface PieceProps {
    array: string[],
    start: number,
    alt: string,
    isEditing: boolean,
    onChange?: (value: number) => void,
    className: string
}

export default function OutfitPiece({array, start, alt, isEditing, onChange, className} : PieceProps) {
    const [index, setIndex] = useState(start);
    const limit = array.length;

    if (index === -1) {
        setIndex(0);
    }

    return (
        <div className="flex space-x-4">
            {isEditing && 
            <div className="flex space-x-4">
                {(index > -1) && <img className={`float-left img-fluid h-auto ${className || ''}`} src={`http://localhost:8000/assets${array[index]}`} alt={alt} />}
                <div className="float-right">
                    <div className="flex space-x-4">
                        <button className="btn bg-pink-400 rounded-full text-white font-bold float-left p-2" 
                            onClick={() => {
                                setIndex((index - 1) < 0 ? limit - 1 : (index - 1)); 
                                onChange((index - 1) < 0 ? limit - 1 : (index - 1));
                            }}
                            >{'<'}
                        </button>
                        <p>{alt}</p>
                        <button className="btn bg-pink-400 rounded-full text-white font-bold float-right p-2" 
                            onClick={() => {
                                setIndex((index + 1) > limit - 1 ? 0 : (index + 1)); 
                                onChange((index + 1) > limit - 1 ? 0 : (index + 1));
                            }}
                            >{'>'}
                        </button>
                    </div>
                </div>
            </div>}
            {!isEditing && (index > -1) && <img className={`float-left img-fluid ${className || ''}`} src={`http://localhost:8000/assets${array[index]}`} alt={alt} />}
        </div>
    );
}