import React, { useState, useEffect } from "react";
import { IonContent } from "@ionic/react";
import "./VendorHome.css";
import TransactionList from "../components/TransactionList";

const VendorHome: React.FC = () => {
  const [nameUser, setName] = useState<string>("Ramu");
  const [amount, setAmount] = useState<number>(100);
  const [date, setSelectedDate] = useState<string>("2021-12-15T13:47:20.789");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND_API_URL + "/get_all_transactions/", {
      method: "GET",
      headers: { Authorization: `JWT ${localStorage.getItem("token")}` },
    }).then((res) => {
      res.json().then((data) => {
        console.log("Transactions: ");
        console.log(data);
	setTransactions(data["Transactions"]);
      });
    });
  }, []);

  return (
    <IonContent>
      <div className="login-logo">
        <img src="https://i.postimg.cc/qv3578F0/trans.png" alt="Ionic logo" />
      </div>
      {transactions.map((tr) => (
        <TransactionList username={tr["Sender"]} amount={tr["Amount"]} date={tr["Date"]}></TransactionList>
      ))}
    </IonContent>
  );
};

export default VendorHome;

