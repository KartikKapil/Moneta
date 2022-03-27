import React, { useState, useContext, Dispatch, ReactElement, useRef, useEffect } from "react";
import { IonContent, IonPage, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonSlides, IonSlide } from "@ionic/react";
import SignUpInput from "../components/SignUpInput";
import ChipsComp from "../components/ChipsComp";
import PersonalInfo from "../components/PersonalInfo";
import Preferences from "../components/Preferences"
import "./Landing.css"
import "./SignUpSlide.css";
const slideOpts = {
    initialSlide: 0,
    speed: 400
};
const Landing: React.FC = () => {

    return (
        <IonPage>
            <IonContent className="main">
                <IonSlides pager={true}  options={slideOpts}>
                    <IonSlide className="slides">
                        <img src="https://i.postimg.cc/Gmd1dZYB/foodflex-4.png"></img>
                    </IonSlide>
                    <IonSlide>
        <h1>hi</h1>
                    </IonSlide>
                </IonSlides>
            </IonContent>
        </IonPage>
    );
}

export default Landing;