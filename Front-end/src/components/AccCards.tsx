import React, { useState ,Dispatch} from 'react';
import { IonFab, IonTabs,IonAlert, IonTabBar, IonTabButton, IonItem, IonRange, IonLabel, IonToast, IonGrid, IonButton, IonCol, IonIcon, IonCard, IonCardContent, IonRow, IonInput, IonMenuButton, IonPage, IonTitle, IonToolbar, IonCardTitle, IonFabButton } from '@ionic/react';
import { pencilOutline } from "ionicons/icons";
import "./AccCards.css";
import Toasts from "../components/Toasts";
//Change UserName Card In account section
type UserProps = {
    setUsername: Dispatch<React.SetStateAction<string>>;
  };
const AccCards: React.FC<UserProps> = (props,setUsername) => {
    const [showAlert, setShowAlert] = useState(false);
    const [toastIsShown, setToastIsShown] = useState<boolean>(false);

    return (
        <React.Fragment>
            <IonItem lines="none" className="acc-item">
                <IonLabel>{props.children}</IonLabel>
                <IonFab horizontal="end" >
                    <IonFabButton className="btn" size="small" color="success" onClick={() => setShowAlert(true)}>
                        <IonIcon icon={pencilOutline} ></IonIcon>
                    </IonFabButton>
                </IonFab>
            </IonItem>
            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                cssClass='my-custom-class'
                header={'New Password'}
                inputs={[
                    {
                        name: 'name1',
                        type: 'password',
                        placeholder: 'Enter Password',
                          
                    },
                ]}
                buttons={[
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => {
                            console.log("Canceled");
                        }
                    },
                    {
                        text: 'Ok',
                        handler: (data) => {
                            var msg = data.name1;
                            setToastIsShown(true);
                        }
                    }
                ]}
            />
            <Toasts toastIsShown={toastIsShown} setToastIsShown={setToastIsShown} msg="Password changed"></Toasts>

            </React.Fragment>

            )
}

            export default AccCards;