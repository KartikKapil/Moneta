import React, { useState, Dispatch, RefObject, useRef } from "react";
import {
    IonGrid,
    IonCard,
    IonRow,
    IonCol,
} from "@ionic/react";
import SignupRows from "./SignupRows";
import { personAddOutline, keyOutline, personOutline, homeOutline, phonePortraitOutline, walletOutline, cardOutline } from "ionicons/icons";
import DateTimeExamples from "./DateofBirth";

type Setters = {
    setUsername: Dispatch<React.SetStateAction<string>>;
    setPassword: Dispatch<React.SetStateAction<string>>;
    setName: Dispatch<React.SetStateAction<string>>;
    setLName: Dispatch<React.SetStateAction<string>>;
    setAddress: Dispatch<React.SetStateAction<string>>;
    setPhone: Dispatch<React.SetStateAction<string>>;
    setBudget: Dispatch<React.SetStateAction<string>>;
    setPan: Dispatch<React.SetStateAction<string>>;
    inInput: RefObject<HTMLIonInputElement>;
    selectedDate: string;
    setSelectedDate: Dispatch<React.SetStateAction<string>>;
};

const PersonalInfo: React.FC<Setters> = (props) => {
    return (
        <IonGrid>
            <IonRow className="cardRow" >
                <IonCol className="cardRow">
                    <h2 className=" headers">Personal Details</h2>
                </IonCol>
            </IonRow>
            <SignupRows  nameIn={"username"} typeIn={"text"}  setter={props.setUsername} ionIcon={personAddOutline}>Username</SignupRows>
            <SignupRows  nameIn={"password"} typeIn={"password"}  setter={props.setPassword} ionIcon={keyOutline}>Password</SignupRows>
            <SignupRows  nameIn={"fname"} typeIn={"text"}  setter={props.setName} ionIcon={personOutline}>First Name</SignupRows>
            <SignupRows  nameIn={"lname"} typeIn={"text"}  setter={props.setLName} ionIcon={personOutline}>Last Name</SignupRows>
            <SignupRows  nameIn={"address"} typeIn={"text"} setter={props.setAddress} ionIcon={homeOutline}>Address</SignupRows>
            <SignupRows  nameIn={"phone"} typeIn={"tel"}  setter={props.setPhone} ionIcon={phonePortraitOutline}>Phone</SignupRows>
            <SignupRows  nameIn={"budget_total"} typeIn={"number"} setter={props.setBudget} ionIcon={walletOutline}>Budget</SignupRows>
            <SignupRows  nameIn={"pan_num"} typeIn={"text"} setter={props.setPan} ionIcon={cardOutline}>Pan Card</SignupRows>

            <IonRow >
                <IonCol className="cardRow">
                    <IonCard>
                        <DateTimeExamples selectedDate={props.selectedDate} setSelectedDate={props.setSelectedDate}></DateTimeExamples>
                    </IonCard>
                </IonCol>
            </IonRow>

        </IonGrid>
    )
}

export default PersonalInfo;
