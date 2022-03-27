import React, { useState, Dispatch } from "react";
import { IonIcon, IonItem, IonLabel, IonDatetime } from "@ionic/react";
import { calendarOutline } from "ionicons/icons";

type Props = {
    selectedDate: string;
    setSelectedDate: Dispatch<React.SetStateAction<string>>;
};

export const DateTimeExamples: React.FC<Props> = ({ selectedDate, setSelectedDate }) => {
  // const [selectedDate, setSelectedDate] = useState<string>("2000-01-01T13:47:20.789");
  return (
    <>
      <IonItem>
        <IonIcon color="primary" className="ion-padding" icon={calendarOutline}></IonIcon>
        <IonLabel>D.O.B</IonLabel>
        <IonDatetime
          color="primary"
          displayFormat="MMMM DD, YYYY"
          min="1994-01-01"
          max="2021-12-31"
          value={selectedDate}
          onIonChange={(e) => setSelectedDate(e.detail.value!)}
        ></IonDatetime>
      </IonItem>
    </>
  );
};

export default DateTimeExamples;

