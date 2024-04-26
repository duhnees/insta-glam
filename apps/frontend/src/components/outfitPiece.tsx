import { useState } from "react";


interface PieceProps {
    array: string[],
    start: number,
    alt: string,
    isEditing: boolean
}

export default function OutfitPiece({array, start, alt, isEditing} : PieceProps) {
    const [index, setIndex] = useState(start);
    const limit = array.length;

    return (
        <div>
            {isEditing && 
            <div className="flex">
                <img className="float-left" src={`http://localhost:8000/assets${array[index]}`} alt={alt} />
                <div className="float-right">
                    <button className="float-left" onClick={() => {if (index - 1 < 0) {setIndex(limit - 1)} else {setIndex(index - 1)}}}>Previous</button>
                    <p>{index}</p>
                    <button className="float-right" onClick={() => {if (index + 1 > limit) {setIndex(0)} else {setIndex(index + 1)}}}>Next</button>
                </div>
            </div>}
            {!isEditing && <img src={`http://localhost:8000/assets${array[index]}`} alt={alt} />}
        </div>
        // <div>
        //     <button className="btn float-left" onClick={() => {if (index - 1 < 0) {setIndex(limit - 1)} else {setIndex(index - 1)}}}>Previous</button>
        //     <img src={`http://localhost:8000/assets${array[index]}`} alt={alt} />
        //     <button className="btn float-right" onClick={() => {if (index + 1 > limit) {setIndex(0)} else {setIndex(index + 1)}}}>Next</button>
        // </div>
    );
}