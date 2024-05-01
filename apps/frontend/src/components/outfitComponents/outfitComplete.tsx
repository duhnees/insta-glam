import data from "../../assets/data.json";
import OutfitPiece from "./outfitPiece";

interface OutfitProps {
    hat: number, 
    hair: number, 
    face: number, 
    top: number, 
    pants: number, 
    shoes: number, 
    accessory1: number, 
    accessory2: number
}

export default function OutfitComplete({hat, hair, face, top, pants, shoes, accessory1, accessory2}: OutfitProps) {
    
    const { hats, hairs, faces, tops, pants: pantsData, shoes: shoesData, acc1s, acc2s } = data;

    return(
        <div className="relative">
            <img className="float-left img-fluid h-auto top-0 left-0 z-0" src={`http://localhost:8000/assets/body.png`} alt="body" />
            <OutfitPiece array={hats} start={hat} alt="Hat" isEditing={false} className="absolute top-0 left-0 z-0" />
            <OutfitPiece array={hairs} start={hair} alt="Hair" isEditing={false} className="absolute top-0 left-0 z-0" />
            <OutfitPiece array={faces} start={face} alt="Face" isEditing={false} className="absolute top-0 left-0 z-0" />
            <OutfitPiece array={tops} start={top} alt="Top" isEditing={false} className="absolute top-0 left-0 z-0" />
            <OutfitPiece array={pantsData} start={pants} alt="Pants" isEditing={false} className="absolute top-0 left-0 z-0" />
            <OutfitPiece array={shoesData} start={shoes} alt="Shoes" isEditing={false} className="absolute top-0 left-0 z-0" />
            <OutfitPiece array={acc1s} start={accessory1} alt="Accessory 1" isEditing={false} className="absolute top-0 left-0 z-0" />
            <OutfitPiece array={acc2s} start={accessory2} alt="Accessory 2" isEditing={false} className="absolute top-0 left-0 z-0" />
        </div>
    );

}