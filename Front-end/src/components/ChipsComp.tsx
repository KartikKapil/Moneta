import React, {Dispatch} from "react"
import { IonChip,IonLabel,IonIcon, IonButton } from "@ionic/react";
import {closeCircle} from "ionicons/icons";
type ChipsProps = {
    restName: string;
    
  
    restId: number,
    removeChip: Function
};
const ChipsComp: React.FC<ChipsProps>= (props) =>{
    return(
        <IonChip className="{props.restId}">
          <IonLabel>{props.restName}</IonLabel>
          <IonIcon icon={closeCircle} onClick={()=>props.removeChip(props.restId)} />
          
        </IonChip>
    )
}

export default ChipsComp;