import React, { useEffect, Dispatch, useState } from "react";
import {
  IonHeader,
  useIonPopover,
  IonFab,
  IonFabButton,
  IonIcon,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonButtons,
  IonMenuButton,
  IonList,
  IonItem,
  IonLabel,
  IonCard,
  IonCardSubtitle,
  IonText,
  IonCardTitle,
} from "@ionic/react";
import "./Account.css";
import AccCards from "../components/AccCards";
import { power } from "ionicons/icons";

type AccountProps = {
  setIsLoggedin: Dispatch<React.SetStateAction<boolean>>;
  userName: string;
  setUsername: Dispatch<React.SetStateAction<string>>;
  setIsVendor: Dispatch<React.SetStateAction<boolean>>;
  isVendor: boolean;
  currBudget: number;
  setBudget: Dispatch<React.SetStateAction<number>>;
};

const PopoverList: React.FC<{
  onHide: () => void;
}> = ({ onHide }) => (
  <IonList>
    <IonItem lines="none" button>
      Change Avatar
    </IonItem>
    {/* <IonItem lines="none" detail={false} button onClick={onHide}>
      Close
    </IonItem> */}
  </IonList>
);

const Account: React.FC<AccountProps> = ({ setIsLoggedin, userName, setUsername, setIsVendor, isVendor, currBudget }) => {
  const [present, dismiss] = useIonPopover(PopoverList, { onHide: () => dismiss() });
  const [balance, setBalance] = useState(0);

  const logout = () => {
    setIsLoggedin(false);
    setUsername("");
    localStorage.removeItem("token");
    localStorage.removeItem("name");
  };

  useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND_API_URL + "/get_balance/", {
      method: "GET",
      headers: { Authorization: `JWT ${localStorage.getItem("token")}` },
    }).then((res) => {
      res.json().then((data) => {
	console.log("Balance: ");
	console.log(data);
	setBalance(data["Balance"]);
      });
    });
  }, []);

  return (
    <IonPage id="account-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="acc-content">
        {true && (
          <div className="ion-padding-top ion-text-center">
            <div>
              <img
                src="https://i.postimg.cc/s1dTZX3G/av4.png"
                onClick={(e) =>
                  present({
                    event: e.nativeEvent,
                  })
                }
                alt="avatar"
              />
            </div>
            <h2>{userName}</h2>
	    {!isVendor &&
              <div className="ion-padding">
              <IonText color="primary" className="CurrBudget"> &#8377; {balance}</IonText>
              <IonCardSubtitle>Current Balance</IonCardSubtitle>
              </div>
	    }
            <AccCards setUsername={setUsername}>Change Password</AccCards>
            <IonItem lines="none" className="acc-item">
              <IonLabel>Logout</IonLabel>
              <IonFab horizontal="end">
                <IonFabButton className="btn" size="small" color="success" onClick={() => logout()}>
                  <IonIcon icon={power}></IonIcon>
                </IonFabButton>
              </IonFab>
            </IonItem>

            {/* <IonList inset> */}
            {/*
              <IonItem onClick={() => clicked('Update Picture')}>Update Picture</IonItem>
              <IonItem onClick={() => clicked('Change Password')}>Change Password</IonItem>
	      */}
            {/* <IonItem lines="none" onClick={() => setIsLoggedin(false) } style={{cursor: "pointer"}}>Logout</IonItem>
            </IonList> */}
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Account;
