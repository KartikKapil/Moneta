import React, { useState } from 'react';
import { IonFab,  IonItem, IonIcon, IonCard, IonCardTitle, IonFabButton } from '@ionic/react';
import "./Cards.css";

type CardProps = {
    CardCon: any;
    fabButton: string;
    startIcon: string;
};
const Cards: React.FC<CardProps> = (props) => {
    const [isShow, setIsShow] = useState<boolean>(false);
    const showContent = () => {
        setIsShow(!isShow);
    }

    return (
        <IonCard className="card" >
            <IonItem lines="none" className="cardItem">
                <IonIcon className="card-icon" color="warning" icon={props.startIcon} slot="start" />
                <IonCardTitle className="title" color="secondary">{props.children}</IonCardTitle>
                <IonFab horizontal="end" >
                    <IonFabButton className="btn" color="success" onClick={showContent} size="small">
                        <IonIcon icon={props.fabButton} ></IonIcon>
                    </IonFabButton>
                </IonFab>
            </IonItem>
            {isShow &&
                props.CardCon
            }
        </IonCard>
    )
}
export default Cards;
