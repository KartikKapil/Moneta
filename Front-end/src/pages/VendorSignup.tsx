import React, { useState, useContext, Dispatch, ReactElement, useRef } from "react";
import { IonContent, IonPage, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput } from "@ionic/react";
import "./Login.css";
import "./Signup.css";
import SignUpInput from "../components/SignUpInput";

type Props = {
  setIsLoggedin: Dispatch<React.SetStateAction<boolean>>;
  setHomeName: Dispatch<React.SetStateAction<string>>;
  setIsVendor: Dispatch<React.SetStateAction<boolean>>;
};

const VendorSignup: React.FC<Props> = ({ setIsLoggedin, setHomeName, setIsVendor }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [price, setPrice] = useState("");
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
      {/* <IonHeader>
        <IonToolbar>
          <IonTitle>Sign Up</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <IonContent>
        <div className="login-logo">
          <img src="https://i.postimg.cc/d3nNXrr2/signup.png" alt="Ionic logo" />
        </div>

        <form noValidate onSubmit={signup}>
          <IonList>
            <SignUpInput nameIn={"username"} typeIn={"text"} value={username} setter={setUsername}>
              Username
            </SignUpInput>
            <SignUpInput nameIn={"password"} typeIn={"password"} value={password} setter={setPassword}>
              Password
            </SignUpInput>
            <SignUpInput nameIn={"name"} typeIn={"text"} value={name} setter={setName}>
              Name
            </SignUpInput>
            <SignUpInput nameIn={"address"} typeIn={"text"} value={address} setter={setAddress}>
              Address
            </SignUpInput>
            <SignUpInput nameIn={"phone"} typeIn={"tel"} value={phone} setter={setPhone}>
              Phone
            </SignUpInput>
            <SignUpInput nameIn={"price"} typeIn={"number"} value={price} setter={setPrice}>
              Price
            </SignUpInput>

            {/* <IonItem>
              <IonLabel position="stacked" color="primary">
                Password
              </IonLabel>
              <IonInput
                name="password1"
                type="password"
                value={password1}
                onIonChange={(e) => setPassword1(e.detail.value!)}
              ></IonInput>
            </IonItem> */}

            {/* <IonItem>
              <IonLabel position="stacked" color="primary">
                Confirm Password
              </IonLabel>
              <IonInput
                name="password2"
                type="password"
                value={password2}
                onIonChange={(e) => setPassword2(e.detail.value!)}
              ></IonInput>
            </IonItem> */}

            {/* <IonItem>
              <IonLabel position="stacked" color="primary">
                Name
              </IonLabel>
              <IonInput name="name" type="text" value={name} onIonChange={(e) => setName(e.detail.value!)}></IonInput>
            </IonItem> */}

            {/* <IonItem>
              <IonLabel position="stacked" color="primary">
                Address
              </IonLabel>
              <IonInput
                name="address"
                type="text"
                value={address}
                onIonChange={(e) => setAddress(e.detail.value!)}
              ></IonInput>
            </IonItem> */}

            {/* <IonItem>
              <IonLabel position="stacked" color="primary">
                Phone
              </IonLabel>
              <IonInput
                name="phone"
                type="text"
                value={phone}
                onIonChange={(e) => setPhone(e.detail.value!)}
              ></IonInput>
            </IonItem> */}

            {/* <IonItem>
              <IonLabel position="stacked" color="primary">
                Budget
              </IonLabel>
              <IonInput
                name="budget"
                type="number"
                value={budget}
                onIonChange={(e) => setBudget(e.detail.value!)}
              ></IonInput>
            </IonItem> */}
          </IonList>

          <IonRow>
            <IonCol>
              <IonButton type="submit" color="light" expand="block">
                Submit
              </IonButton>
            </IonCol>
          </IonRow>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default VendorSignup;
