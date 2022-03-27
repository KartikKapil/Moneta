import React,{Dispatch} from "react";
import {IonToast} from '@ionic/react';
//Toasts for Home page Cards
type ToastProps = {
    toastIsShown: boolean,
    setToastIsShown: Dispatch<React.SetStateAction<boolean>>,
    msg: string
  };

const Toasts: React.FC< ToastProps > = (props) =>{
    return(
        <IonToast
        isOpen={props.toastIsShown}
        onDidDismiss={() => props.setToastIsShown(false)}
        message={props.msg}
        duration={3000}
      />
    )
}

export default Toasts;