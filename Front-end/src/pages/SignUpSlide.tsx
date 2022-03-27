import React, { useState, useContext, Dispatch, ReactElement, useRef, useEffect } from "react";
import { IonContent, IonPage, IonSlides, IonSlide } from "@ionic/react";
import PersonalInfo from "../components/PersonalInfo";
import Preferences from "../components/Preferences";

import "./SignUpSlide.css";
const slideOpts = {
  initialSlide: 0,
  speed: 400,
};

type Props = {
  setIsLoggedin: Dispatch<React.SetStateAction<boolean>>;
  setIsVendor: Dispatch<React.SetStateAction<boolean>>;
  setHomeName: Dispatch<React.SetStateAction<string>>;
};

const SignUpSlide: React.FC<Props> = ({ setIsLoggedin, setHomeName, setIsVendor }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lname, setLName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [budget, setBudget] = useState("");
  const [panNum, setPan] = useState("");
  const [selectedDate, setSelectedDate] = useState<string>("2000-01-01T13:47:20.789");
  const inInput = useRef<HTMLIonInputElement>(null);

  return (
    <IonPage>
      <IonContent>
        <IonSlides pager={true} options={slideOpts}>
          <IonSlide className="slides">
            <form noValidate>
              <PersonalInfo
                setUsername={setUsername}
                setPassword={setPassword}
                setName={setName}
                setLName={setLName}
                setAddress={setAddress}
                setPhone={setPhone}
                setBudget={setBudget}
                setPan={setPan}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                inInput={inInput}
              ></PersonalInfo>
            </form>
          </IonSlide>
          <IonSlide>
            <Preferences
              setIsLoggedin={setIsLoggedin}
              setHomeName={setHomeName}
              setIsVendor={setIsVendor}
              username={username}
              password={password}
              name={name}
              lname={lname}
              address={address}
              phone={phone}
              budget={budget}
              panNum={panNum}
              selectedDate={selectedDate}
              inInput={inInput}
            ></Preferences>
          </IonSlide>
        </IonSlides>
      </IonContent>
    </IonPage>
  );
};

export default SignUpSlide;

