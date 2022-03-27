import React, { useState, useContext, Dispatch, ReactElement, useRef } from "react";
import { IonContent, IonCard, IonPage, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonGrid } from "@ionic/react";
import "./Login.css";
import "./Signup.css";
import SignUpInput from "../components/SignUpInput";
import { personAddOutline, keyOutline, personOutline, homeOutline, phonePortraitOutline, walletOutline, cardOutline } from "ionicons/icons";
import SignupRows from "../components/SignupRows"
import DateTimeExamples from "../components/DateofBirth"
type Props = {
  setIsLoggedin: Dispatch<React.SetStateAction<boolean>>;
  setHomeName: Dispatch<React.SetStateAction<string>>;
  setIsVendor: Dispatch<React.SetStateAction<boolean>>;
};

const Vendor: React.FC<Props> = ({ setIsLoggedin, setHomeName, setIsVendor }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lname, setLName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [price, setPrice] = useState("");
  const [panNum, setPan] = useState("");
  const [selectedDate, setSelectedDate] = useState<string>("2000-01-01T13:47:20.789");

  // const [formSubmitted, setFormSubmitted] = useState(false);
  // const [usernameError, setUsernameError] = useState(false);
  // const [passwordError, setPasswordError] = useState(false);

  const signup = (e: React.FormEvent) => {
    e.preventDefault();

    // extract form data
    const formdata = new FormData(e.target as HTMLFormElement);

    const json: any = {};
    formdata.forEach(function (value, prop) {
      json[prop] = value;
    });
    const dob = new Date(selectedDate);
    json["DOB_date"] = dob.getDate();
    json["DOB_month"] = dob.getMonth()+1;
    json["DOB_year"] = dob.getFullYear();
    console.log(json);

    navigator.geolocation.getCurrentPosition((position) => {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      json["latitude"] = position.coords.latitude;
      json["longitude"] = position.coords.longitude;

      fetch(process.env.REACT_APP_BACKEND_API_URL + "/new_vendor_signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(json),
      })
        .then((response) => {
          if (response.status == 201) {
            console.log("success");
            response.json().then((data) => {
              localStorage.setItem("token", data.user.token);
              localStorage.setItem("vendor", "1");
              localStorage.setItem("name", data.vendor.name);
              setIsVendor(true);
              setHomeName(data.vendor.name);
              setIsLoggedin(true);
              console.log(data);
            });
          } else {
            console.log("error");
            response.json().then((data) => {
              // TODO: Display the errors on screen
              console.log(data);
            });
          }
        })
        .catch((error) => {
          console.log("error");
          console.log(error);
        });
    });
  };

  return (
    <IonPage id="login-page">
      <IonContent>
        <IonRow>
          <IonCol>
            <h2 className="header ">Personal Details</h2>
          </IonCol>
        </IonRow>
        <form noValidate onSubmit={signup}>
          <IonGrid>
            <SignupRows nameIn={"username"} typeIn={"text"} setter={setUsername} ionIcon={personAddOutline}>Username</SignupRows>
            <SignupRows nameIn={"password"} typeIn={"password"} setter={setPassword} ionIcon={keyOutline}>Password</SignupRows>
            <SignupRows nameIn={"name"} typeIn={"text"} setter={setName} ionIcon={personOutline}>First Name</SignupRows>
            <SignupRows nameIn={"last_name"} typeIn={"text"} setter={setLName} ionIcon={personOutline}>Last Name</SignupRows>
            <SignupRows nameIn={"address"} typeIn={"text"} setter={setAddress} ionIcon={homeOutline}>Address</SignupRows>
            <SignupRows nameIn={"phone"} typeIn={"tel"} setter={setPhone} ionIcon={phonePortraitOutline}>Phone</SignupRows>
            <SignupRows nameIn={"price"} typeIn={"number"} setter={setPrice} ionIcon={walletOutline}>Price</SignupRows>
            <SignupRows nameIn={"PAN_number"} typeIn={"text"} setter={setPan} ionIcon={cardOutline}>Pan Card</SignupRows>
            <IonRow >
              <IonCol className="cardRow">
                <IonCard>
                  <DateTimeExamples selectedDate={selectedDate} setSelectedDate={setSelectedDate}></DateTimeExamples>
                </IonCard>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonButton type="submit" color="primary" expand="block">
                  Submit
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Vendor;
