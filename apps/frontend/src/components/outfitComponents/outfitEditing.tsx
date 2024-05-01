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
            <OutfitPiece array={hats} start={hat} alt="Hat" isEditing={true} onChange={(value) => handleOutfitChange('hat', value)}/>
            <OutfitPiece array={hairs} start={hair} alt="Hair" isEditing={true} onChange={(value) => handleOutfitChange('hair', value)}/>
            <OutfitPiece array={faces} start={face} alt="Face" isEditing={true} onChange={(value) => handleOutfitChange('face', value)}/>
            <OutfitPiece array={tops} start={top} alt="Top" isEditing={true} onChange={(value) => handleOutfitChange('top', value)}/>
            <OutfitPiece array={pantsData} start={pants} alt="Pants" isEditing={true} onChange={(value) => handleOutfitChange('pants', value)}/>
            <OutfitPiece array={shoesData} start={shoes} alt="Shoes" isEditing={true} onChange={(value) => handleOutfitChange('shoes', value)}/>
            <OutfitPiece array={acc1s} start={accessory1} alt="Accessory 1" isEditing={true} onChange={(value) => handleOutfitChange('accessory1', value)}/>
            <OutfitPiece array={acc2s} start={accessory2} alt="Accessory 2" isEditing={true} onChange={(value) => handleOutfitChange('accessory2', value)}/>
        </div>
    );

}