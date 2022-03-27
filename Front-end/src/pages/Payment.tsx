import React, { Dispatch, useState, useEffect, useRef } from "react";
import {
  IonPage,
  IonCard,
  IonCardTitle,
  IonCardHeader,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  useIonPicker,
  IonIcon,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonAlert,
} from "@ionic/react";
import "./Payment.css";
import { restaurantOutline, send } from "ionicons/icons";
import Toasts from "../components/Toasts";
type PaymentProps = {
  setIsLoggedin: Dispatch<React.SetStateAction<boolean>>;
  setHomeName: Dispatch<React.SetStateAction<string>>;
  userName: string;
  phoneNumber: number;
  amountPaid: number;
  currBudget: number;
  setBudget: Dispatch<React.SetStateAction<number>>;
};

const Payment: React.FC<PaymentProps> = (props) => {
  const [present] = useIonPicker();
  const inAmount = useRef<HTMLIonInputElement>(null);
  const [pay, setPay] = useState<number>();
  const [value, setValue] = useState("Select vendor");
  const [msg, setmsg] = useState<string>("");
  const [toastIsShown, setToastIsShown] = useState<boolean>(false);
  const [vendors, setVendors] = useState<any>([]);
  const [balance, setBalance] = useState(0);

  const clearInput = () => {
    inAmount.current!.value = "";
  };

  const showToast = () => {
    console.log(value);
    clearInput();
    fetch(process.env.REACT_APP_BACKEND_API_URL + "/make_transaction/", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `JWT ${localStorage.getItem("token")}` },
      body: JSON.stringify({ username: value, amount: pay }),
    })
      .then((userResponse) => {
        if (userResponse.status == 200) {
          console.log("Transfer Success");
          setToastIsShown(true);
          setValue("Select vendor");
        } else {
          console.log("error");
          userResponse.json().then((data) => {
            // TODO: Display the errors on screen
            console.log(data);
          });
        }
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
  };

  useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND_API_URL + "/get_preferred_vendors/", {
      method: "GET",
      headers: { Authorization: `JWT ${localStorage.getItem("token")}` },
    }).then((res) => {
      res.json().then((data) => {
        console.log("Vendors: ");
        console.log(data);
        setVendors(data["vendors"]);
      });
    });

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
    <IonPage>
      <IonContent>
        <IonCard color="secondary" className="ion-text-center pay-card">
          <IonCardHeader className="ion-text-left header">
            <IonCardSubtitle>Balance</IonCardSubtitle>
            <IonCardTitle className="user-title">
              <p className="head">&#8377; {balance}</p>
            </IonCardTitle>
          </IonCardHeader>

          <IonCardContent className="cardcon">
            <IonIcon icon={restaurantOutline} className="rest" size="small"></IonIcon>
            <IonButton
              className="vendorop ion-text-left"
              expand="block"
              fill="clear"
              color="tertiary"
              onClick={() =>
                present({
                  buttons: [
                    {
                      text: "Confirm",
                      handler: (selected) => {
                        setValue(selected.vendors.value);
                      },
                    },
                    {
                      text: "Cancel",
                      role: "cancel",
                      cssClass: "secondary",
                      handler: () => {
                        console.log("Canceled");
                      },
                    },
                  ],
                  columns: [
                    {
                      name: "vendors",
                      options: vendors.map((v: any) => {
                        return { text: v.name, value: v.username };
                      }),
                      // options: [
                      //     { text: 'Food Express', value: 'Food Express, Noida' },
                      //     { text: 'Agra Retaurant', value: 'Agra Retaurant' },
                      //     { text: 'Vinod Fast Food', value: 'Vinod Fast Food' },
                      //     { text: 'Foodie Range', value: 'Foodie Range' },
                      //     { text: 'Veerji Food Corner', value: 'Veerji Food Corner' },
                      //     { text: 'Kathi Junction', value: 'Kathi Junction' },
                      // ],
                    },
                  ],
                })
              }
            >
              {value}
            </IonButton>
            <IonItem color="secondary" className="ion-text-center ">
              <IonInput
                placeholder="Enter Amount"
                type="number"
                ref={inAmount}
                color="primary"
                className="amt"
                onIonChange={(e) => setPay(parseInt(e.detail.value!))}
              ></IonInput>
            </IonItem>
            <IonItemSliding color="secondary">
              <IonItem color="secondary" lines="none" className="ion-text-center swipe">
                <IonLabel>Swipe to Send</IonLabel>
              </IonItem>

              <IonItemOptions side="end">
                <IonItemOption color="secondary" onClick={showToast} expandable>
                  <IonIcon icon={send} size="medium"></IonIcon>
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
            <Toasts toastIsShown={toastIsShown} setToastIsShown={setToastIsShown} msg="Payment Confirmed"></Toasts>
          </IonCardContent>
        </IonCard>
        <div className="pay-logo">
          {/* https://i.postimg.cc/YSm0wwDW/pay2.png */}
          <img src="https://i.postimg.cc/VkZDMvJr/Let-s-Start-2.png" alt="Ionic logo" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Payment;
