import { useContext } from "react";
import data from "../../assets/data.json";
import OutfitPiece from "./outfitPiece";
import { OutfitContext } from "../../pages/outfitPage";

export default function OutfitEditing() {
    const { outfitValues, handleOutfitChange } = useContext(OutfitContext);

    const { hat, hair, face, top, pants, shoes, accessory1, accessory2 } = outfitValues;
    
    const { hats, hairs, faces, tops, pants: pantsData, shoes: shoesData, acc1s, acc2s } = data;

    return(
        <div>
            <img className="float-left img-fluid h-auto top-0 left-0 z-0 bg-white" src={`http://localhost:8000/assets/body.png`} alt="body" />
            {/* <OutfitPiece array={hats} start={hat} alt="Hat" isEditing={true} onChange={(value) => handleOutfitChange('hat', value)} className="absolute top-0 left-0 z-0"/>
            <OutfitPiece array={hairs} start={hair} alt="Hair" isEditing={true} onChange={(value) => handleOutfitChange('hair', value)} className="absolute top-0 left-0 z-0"/> */}
            <OutfitPiece array={faces} start={face} alt="Face" isEditing={true} onChange={(value) => handleOutfitChange('face', value)} className="absolute top-6 left-6 z-0"/>
            <OutfitPiece array={tops} start={top} alt="Top" isEditing={true} onChange={(value) => handleOutfitChange('top', value)} className="absolute top-6 left-6 z-40"/>
            <OutfitPiece array={pantsData} start={pants} alt="Pants" isEditing={true} onChange={(value) => handleOutfitChange('pants', value)} className="absolute top-6 left-6 z-0"/>
            {/* <OutfitPiece array={shoesData} start={shoes} alt="Shoes" isEditing={true} onChange={(value) => handleOutfitChange('shoes', value)} className="absolute top-0 left-0 z-0"/>
            <OutfitPiece array={acc1s} start={accessory1} alt="Accessory 1" isEditing={true} onChange={(value) => handleOutfitChange('accessory1', value)} className="absolute top-0 left-0 z-0"/>
            <OutfitPiece array={acc2s} start={accessory2} alt="Accessory 2" isEditing={true} onChange={(value) => handleOutfitChange('accessory2', value)} className="absolute top-0 left-0 z-0"/> */}
        </div>
    );

}