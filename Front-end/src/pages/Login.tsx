import React, { useState, Dispatch } from "react";
import Toasts from "../components/Toasts";
import {
  IonContent,
  IonPage,
  IonRow,
  IonCol,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonText,
  IonTitle,
  IonRouterLink,
  IonIcon,
} from "@ionic/react";
import "./Login.css";
import { arrowForwardOutline, chevronForwardOutline } from "ionicons/icons";

// import { RouteComponentProps, Redirect } from 'react-router';

type Props = {
  setIsLoggedin: Dispatch<React.SetStateAction<boolean>>;
  setIsVendor: Dispatch<React.SetStateAction<boolean>>;
  setHomeName: Dispatch<React.SetStateAction<string>>;
};

const Login: React.FC<Props> = ({ setIsLoggedin, setIsVendor, setHomeName }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [toastIsShown, setToastIsShown] = useState<boolean>(false);

  const clearInput = () => {
		setUsername("");
		setPassword("");
		setUsernameError(false);
		setPasswordError(false);
  };

  const showToast = () => {
		clearInput();
    setToastIsShown(true);
  };

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (!username) {
      setUsernameError(true);
    }
    if (!password) {
      setPasswordError(true);
    }

    if (username && password) {
      // setIsLoggedin(true);
      const data: any = {
        username,
        password,
      };
      fetch(process.env.REACT_APP_BACKEND_API_URL + "/token-auth/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          if (res.status == 200) return res.json();
          return;
        })
        .then((json) => {
          console.log(json);
          if (!json) {
            return showToast();
          }
          localStorage.setItem("token", json.token);
          localStorage.setItem("vendor", json.isVendor ? "1" : "0");
          localStorage.setItem("name", json.name);
          setIsVendor(json.isVendor);
          setHomeName(json.name);
          setIsLoggedin(true);
        });
    }
  };

  return (
    <IonPage id="login-page">
      <Toasts toastIsShown={toastIsShown} setToastIsShown={setToastIsShown} msg="Invalid credentials"></Toasts>
      {/* <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <IonContent id="login-page">
        <div className="login-logo">
          <img src="https://i.postimg.cc/bJwxHcM3/log2.png" alt="Ionic logo" />
        </div>
        <IonTitle className="welcome ion-text-center">WELCOME ! </IonTitle>
        <form noValidate onSubmit={login}>
          <IonList>
            <IonItem>
              <IonLabel position="floating" className="loginLabel" color="danger">
                Username
              </IonLabel>
              <IonInput
                name="username"
                type="text"
                value={username}
                spellCheck={false}
                autocapitalize="off"
                onIonChange={(e) => setUsername(e.detail.value!)}
                required
              ></IonInput>
            </IonItem>

            {formSubmitted && usernameError && (
              <IonText>
                <p className="ion-padding-start errorLogin">*Username is required</p>
              </IonText>
            )}

            <IonItem>
              <IonLabel className="loginLabel" position="floating" color="danger">
                Password
              </IonLabel>
              <IonInput
                name="password"
                type="password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
              ></IonInput>
            </IonItem>

            {formSubmitted && passwordError && (
              <IonText>
                <p className="ion-padding-start errorLogin">*Password is required</p>
              </IonText>
            )}
          </IonList>

          <IonRow>
            <IonCol>
              <IonButton type="submit" color="success" expand="block">
                Login
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton routerLink="/signup" color="light" expand="block">
                Signup
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRouterLink href="/vendorSignup" routerDirection="forward">
            <IonText className="vendor-txt">
              <IonIcon icon={arrowForwardOutline} className="arrow"></IonIcon> A Vendor? Join us :)
            </IonText>
          </IonRouterLink>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Login;
