import React, { Dispatch, useRef, RefObject } from "react";
import {
    IonIcon,
    IonCard,
    IonRow,
    IonCol,
    IonItem,
    IonLabel,
    IonInput
} from "@ionic/react";
import { TextFieldTypes } from "@ionic/core";
import "./SignUpSlide.css"
type SignRow = {
    nameIn: string,
    typeIn: TextFieldTypes,
    ionIcon: string,
    setter: Dispatch<React.SetStateAction<string>>,
    // refer: RefObject<HTMLIonInputElement>;

};
const SignupRows: React.FC<SignRow> = (props) => {
    
    return (
        <IonRow className="cardRow">
            <IonCol className="cardRow">
                <IonCard>
                    <IonItem >
                        <IonIcon color="primary" className="ion-padding" icon={props.ionIcon}></IonIcon>
                        <IonLabel className="labels">
                            {props.children}
                        </IonLabel>
                        <IonInput
                           
                            color="primary"
                            name={props.nameIn}
                            type={props.typeIn}
                            onIonChange={(e) => props.setter(e.detail.value!)}
                        ></IonInput>
                    </IonItem>
                </IonCard>
            </IonCol>
        </IonRow>
    )
}

export default SignupRows;