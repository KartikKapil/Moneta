import React, { Dispatch, useState, useRef, useEffect } from "react";
import Toasts from "../components/Toasts";
import VendorHome from "./VendorHome";
import {
  IonPage,
  IonAvatar,
  IonGrid,
  IonRow,
  IonItem,
  IonInput,
  IonCard,
  IonCardTitle,
  IonCol,
  IonCardHeader,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonLabel,
  IonContent,
  IonIcon,
  IonFab,
  IonFabButton,
  IonText,
} from "@ionic/react";
import Cards from "../components/Cards";
import "./Home.css";
import {
  cashOutline,
  pencilOutline,
  arrowUpCircleOutline,
  todayOutline,
  personOutline,
  addOutline,
  arrowForwardOutline,
  pizzaOutline,
  walletOutline,
} from "ionicons/icons";

type ParentProps = {
  setIsLoggedin: Dispatch<React.SetStateAction<boolean>>;
  userName: string;
  setUsername: Dispatch<React.SetStateAction<string>>;
  setIsVendor: Dispatch<React.SetStateAction<boolean>>;
  isVendor: boolean;
  currBudget: number;
  setBudget: Dispatch<React.SetStateAction<number>>;
};

type WalletProps = {
  setBalance: Dispatch<React.SetStateAction<number>>;
};

const BudgetContent: React.FC<WalletProps> = ({ setBalance }) => {
  const [toastIsShown, setToastIsShown] = useState<boolean>(false);
  const inBudget = useRef<HTMLIonInputElement>(null);

  const clearInput = () => {
    inBudget.current!.value = "";
  };

  const showToast = () => {
    clearInput();
    setToastIsShown(true);
  };

  const updateBudget = () => {
    const budget = inBudget.current!.value;
    fetch(process.env.REACT_APP_BACKEND_API_URL + "/change_budget_spent/", {
      method: "POST",
      headers: { Authorization: `JWT ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
      body: JSON.stringify({ budget }),
    })
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        }
      })
      .then((json) => {
        if (json) {
          setBalance(json.balance);
          showToast();
        }
      });
  };

  return (
    <IonCardContent className="ion-text-center card-hidden">
      <IonItem className="budget" lines="full">
        <IonLabel color="primary" position="floating" className="budgetLabel">
          Enter Budget
        </IonLabel>
        <IonInput className="update-budget" ref={inBudget} type="number"></IonInput>
      </IonItem>
      <IonButton color="light" className="cardBtn" size="small" onClick={() => updateBudget()}>
        {" "}
        Update
      </IonButton>
      <Toasts toastIsShown={toastIsShown} setToastIsShown={setToastIsShown} msg="Budget Updated"></Toasts>
    </IonCardContent>
  );
};

const MenuContent: React.FC = () => {
  const [toastIsShown, setToastIsShown] = useState<boolean>(false);
  const showToast = () => {
    setToastIsShown(true);
  };
  return (
    <IonCardContent className="ion-text-center card-hidden">
      <IonItem className="budget">
        {/* <IonLabel position="stacked" className="custom-file-upload"> */}
        <input type="file" className="messMenu" name="upload_mess_menu" />
        {/* </IonLabel> */}
      </IonItem>
      <IonButton color="light" className="cardBtn" onClick={() => showToast()}>
        Upload
      </IonButton>
      <Toasts toastIsShown={toastIsShown} setToastIsShown={setToastIsShown} msg="Menu Added"></Toasts>
    </IonCardContent>
  );
};

const VendorContent: React.FC = () => {
  const [toastIsShown, setToastIsShown] = useState<boolean>(false);
  const showToast = () => {
    setToastIsShown(true);
  };
  return (
    <IonCardContent className="ion-text-center card-hidden">
      <IonItem>
        <IonLabel position="floating" color="primary">
          Enter vendor
        </IonLabel>
        <IonInput></IonInput>
        <IonFab horizontal="end">
          <IonFabButton className="v-btn" color="light" size="small" onClick={() => showToast()}>
            <IonIcon icon={addOutline} color="primary"></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonItem>
      <Toasts toastIsShown={toastIsShown} setToastIsShown={setToastIsShown} msg="Vendor Added"></Toasts>
    </IonCardContent>
  );
};

const WalletContent: React.FC<WalletProps> = ({ setBalance }) => {
  const [toastIsShown, setToastIsShown] = useState<boolean>(false);
  const [amount, setAmount] = useState("0");
  const inWallet = useRef<HTMLIonInputElement>(null);

  const clearInput = () => {
    inWallet.current!.value = "";
  };

  const showToast = () => {
    fetch(process.env.REACT_APP_BACKEND_API_URL + "/add_balance/", {
      method: "POST",
      headers: { Authorization: `JWT ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
      body: JSON.stringify({ amount: parseInt(amount) }),
    }).then((res) => {
      if (res.status == 200) {
        clearInput();
        setToastIsShown(true);
      }
    });
  };

  return (
    <IonCardContent className="ion-text-center card-hidden">
      <IonItem className="budget" lines="full">
        <IonLabel color="primary" position="floating" className="budgetLabel">
          Enter Amount
        </IonLabel>
        <IonInput
          className="update-budget"
          ref={inWallet}
          type="number"
          onIonChange={(e) => setAmount(e.detail.value!)}
        ></IonInput>
      </IonItem>
      <IonButton color="light" className="cardBtn" size="small" onClick={showToast}>
        {" "}
        Update
      </IonButton>
      <Toasts toastIsShown={toastIsShown} setToastIsShown={setToastIsShown} msg="Added to wallet"></Toasts>
    </IonCardContent>
  );
};
const Home: React.FC<ParentProps> = (props) => {
  const [recom, setRecom] = useState("");
  const [recomPrice, setRecomPrice] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (!props.isVendor) {
      fetch(process.env.REACT_APP_BACKEND_API_URL + "/recommend/", {
        method: "GET",
        headers: { Authorization: `JWT ${localStorage.getItem("token")}` },
      }).then((res) => {
        res.json().then((data) => {
          console.log("Rec: ");
          console.log(data);
          if (data.flag == true) {
            // setRecom(data.restr.name);
            // setRecomPrice(data.restr.price);
            setRecom("Food Express");
            setRecomPrice(200);
          } else {
            setRecom("Food Express");
            setRecomPrice(200);
          }
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
    }
  }, []);

  return (
    <IonPage className="page">
      {!props.isVendor ? (
        <IonContent className="content">
          <IonCard className="top-card">
            <IonGrid className="top-grid">
              <IonRow>
                <IonCol>
                  <IonCardHeader>
                    <IonCardSubtitle>Hello</IonCardSubtitle>
                    <IonCardTitle className="userName">{props.userName}</IonCardTitle>
                  </IonCardHeader>
                </IonCol>
                <IonCol className="ion-text-right" size="5">
                  <IonButton
                    className="pay-btn"
                    shape="round"
                    color="secondary"
                    fill="outline"
                    size="small"
                    routerLink="/payment"
                  >
                    Pay
                  </IonButton>
                </IonCol>
                <IonCol className="av-col">
                  <IonAvatar className="home-img">
                    <img src="https://i.postimg.cc/s1dTZX3G/av4.png" />
                  </IonAvatar>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCard>

          <IonCard className="main-card ion-text-center">
            <IonCardHeader className="ion-text-left card-head " color="medium">
              Meal for today
            </IonCardHeader>
            <IonCardContent className="ion-text-center">
              <IonGrid className="gridfull">
                <IonRow>
                  <IonCol className="icol" size="2">
                    <IonIcon icon={pizzaOutline} className="icons"></IonIcon>
                  </IonCol>
                  <IonCol className="ion-text-left icol" size="5">
                    <IonText className="head1" color="secondary">
                      Top Dish:
                    </IonText>
                  </IonCol>
                  <IonCol className="icol" size="5">
                    <IonText className="recomm" color="secondary">
                      {recom}
                    </IonText>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="2">
                    <IonIcon icon={walletOutline} className="icons"></IonIcon>
                  </IonCol>
                  <IonCol className="ion-text-left" size="5">
                    <IonText className="head1" color="secondary">
                      Price:
                    </IonText>
                  </IonCol>
                  <IonCol size="5">
                    <IonText className="recomm">{recomPrice !== 0 ? recomPrice : ""}</IonText>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>

          <Cards fabButton={pencilOutline} startIcon={cashOutline} CardCon={<BudgetContent setBalance={setBalance} />}>
            Update Budget
          </Cards>
          <Cards fabButton={arrowUpCircleOutline} startIcon={todayOutline} CardCon={<MenuContent />}>
            Add Menu
          </Cards>
          <Cards fabButton={addOutline} startIcon={personOutline} CardCon={<VendorContent />}>
            Add Vendor
          </Cards>
        </IonContent>
      ) : (
        <VendorHome></VendorHome>
      )}
    </IonPage>
  );
};

export default Home;
