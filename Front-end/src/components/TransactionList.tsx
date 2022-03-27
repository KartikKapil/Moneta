import React from "react";
import { IonContent,IonText,IonDatetime,IonCardHeader,IonIcon,IonFab,IonFabButton, IonRow,IonCard,IonCol,IonItem, IonCardTitle, IonCardSubtitle} from "@ionic/react";
import {enterOutline } from "ionicons/icons";
import "./TransactionList.css"
type TransactionProps = {
    username: string;
    amount: number
    date: string
}
const TransactionList: React.FC<TransactionProps> = (props) =>{
    return(
        <IonCard className="transcard" >
        <IonItem lines="none" className="cardItem ">
        <IonIcon className="card-icon" color="warning" icon={enterOutline} slot="start" />
        <IonCardHeader className="info">
            <IonCardTitle className="addAcc">From: {props.username}</IonCardTitle>
            <IonDatetime className="date"
            displayFormat="DD MMM YYYY"
            value={props.date}
          ></IonDatetime>
        </IonCardHeader>
        <IonText className="amount" color="primary">+{props.amount}</IonText>


        </IonItem>
        </IonCard>
    )
}

export default TransactionList;