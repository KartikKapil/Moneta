import React , {Dispatch} from "react";
import {
    IonItem,
    IonLabel,
    IonInput,
  } from "@ionic/react";
import { TextFieldTypes } from "@ionic/core";
type SignUpProps = {
    nameIn:string,
    value: string,
    typeIn: TextFieldTypes,
    setter: Dispatch<React.SetStateAction<string>>
  };
const SignUpInput: React.FC<SignUpProps>= (props) =>{
    return(
        <IonItem>
        <IonLabel position="floating" color="primary">
          {props.children}
        </IonLabel>
        <IonInput
          name={props.nameIn}
          type={props.typeIn}
          value={props.value}
          onIonChange={(e) => props.setter(e.detail.value!)}
        ></IonInput>
      </IonItem>
    )
}

export default SignUpInput;