import React, { useState, useContext, Dispatch, ReactElement, useRef, useEffect } from "react";
import { IonContent, IonPage, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput } from "@ionic/react";
import fuzzysort from "fuzzysort";
import "./Login.css";
import "./Signup.css";
import SignUpInput from "../components/SignUpInput";
import ChipsComp from "../components/ChipsComp";

type Props = {
  setIsLoggedin: Dispatch<React.SetStateAction<boolean>>;
  setHomeName: Dispatch<React.SetStateAction<string>>;
};

const Signup: React.FC<Props> = ({ setIsLoggedin, setHomeName }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [budget, setBudget] = useState("");
  const [preferredCuisines, setPreferredCuisines] = useState("");
  const [dislikedDishes, setDislikedDishes] = useState("");

  const [preferredRestaurants, setPreferredRestaurants] = useState("");
  const [restSuggestions, setRestSuggestions] = useState<ReactElement<any, any>>();
  const [selectedRests, setSelectedRests] = useState<{ id: any; name: any }[]>([]);

  const [preferredVendors, setPreferredVendors] = useState("");
  const [vendorList, setVendorList] = useState<{ id: any; name: any }[]>([
    { id: "abc", name: "ABC" },
    { id: "xyz", name: "XYZ" },
  ]);
  const [vendorSuggestions, setVendorSuggestions] = useState<ReactElement<any, any>>();
  const [selectedVendors, setSelectedVendors] = useState<{ id: any; name: any }[]>([]);
  // const [formSubmitted, setFormSubmitted] = useState(false);
  // const [usernameError, setUsernameError] = useState(false);
  // const [passwordError, setPasswordError] = useState(false);

  const restInput = useRef<HTMLIonInputElement>(null);

  // Get the nearby vendors list
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      fetch(
        process.env.REACT_APP_BACKEND_API_URL +
          `/closest_vendors/?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`,
        {
          method: "GET",
        }
      ).then((res) => {
        res.json().then((data) => {
          console.log("Vendors: ");
          console.log(data.vendors);
	  setVendorList(data.vendors);
        });
      });
    });
  }, []);

  // Select a Vendor
  const selectVendor = (e: any) => {
    const id = e.target.id;
    const name = e.target.innerText;
    const newArray = [...selectedVendors, { id: id, name: name }];
    setSelectedVendors(newArray);
    setRestSuggestions(<div></div>);
    setPreferredVendors("");
    setVendorSuggestions(<></>);
  };

  // Select a Restaurant
  const selectRest = (e: any) => {
    const id = e.target.id;
    const name = e.target.innerText;
    const newArray = [...selectedRests, { id: id, name: name }];
    setSelectedRests(newArray);
    setVendorSuggestions(<div></div>);
    setPreferredRestaurants("");
    setRestSuggestions(<></>);
  };

  // Change the autocomplete dropdown based on suggestions
  const onVendorInpChange = (e: any) => {
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].some((key) => key === e.key)) {
      // TODO: Move up and down in suggestions (Low Priority)
      console.log("TBD");
    } else {
      // Show suggestions
      // console.log("Input value: ", restInput.current!.value);
      const suggestions = vendorList.length !== 0 ? fuzzysort.go(e.target.value, vendorList, { key: "name" }) : [];
      // The suggestions List
      const list = (
        <div id="autocomplete-list" className="autocomplete-items">
          {suggestions.map(({ obj }: any) => {
            return (
              <div id={obj.id} key={obj.id} onClick={selectVendor}>
                {" "}
                {obj.name}{" "}
              </div>
            );
          })}
        </div>
      );
      console.log(suggestions);
      setVendorSuggestions(list);
      setPreferredVendors(e.target.value);
    }
  };

  // Change the autocomplete dropdown based on suggestions
  const onRestInputChange = (e: any) => {
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].some((key) => key === e.key)) {
      // TODO: Move up and down in suggestions (Low Priority)
      console.log("TBD");
    } else {
      // Show suggestions
      // console.log("Input value: ", restInput.current!.value);
      fetch(
        process.env.REACT_APP_ZOMATO_API_URL + `/search?count=5&q=${e.target.value}&lat=28.6362295&lon=77.3763150`,
        {
          headers: {
            Accept: "application/json",
            "User-Key": "28c7fdb103232548b1503df6df9b4520",
          },
        }
      ).then((resp) => {
        resp.json().then((data) => {
          const rests = data.restaurants;
          // The suggestions List
          const list = (
            <div id="autocomplete-list" className="autocomplete-items">
              {rests.map((rest: any) => {
                return (
                  <div id={rest.restaurant.id} key={rest.restaurant.id} onClick={selectRest}>
                    {" "}
                    {rest.restaurant.name}{" "}
                  </div>
                );
              })}
            </div>
          );
          setRestSuggestions(list);
          setPreferredRestaurants(e.target.value);
        });
      });
    }
  };

  const signup = (e: React.FormEvent) => {
    e.preventDefault();

    // extract form data
    const target = e.target as HTMLFormElement;
    console.log(target);
    const formdata = new FormData(e.target as HTMLFormElement);

    const json: any = {};
    formdata.forEach(function (value, prop) {
      json[prop] = value;
    });

    const restIds = selectedRests.map((rest) => rest.id);
    const vendorNames = selectedVendors.map((vendor) => vendor.id);
    json["preferred_restaurants"] = restIds.join(",");
    json["preferred_vendors"] = vendorNames.length != 0 ? vendorNames.join(",") : ",";

    console.log(json);

    navigator.geolocation.getCurrentPosition((position) => {
      json["latitude"] = position.coords.latitude;
      json["longitude"] = position.coords.longitude;

      fetch(process.env.REACT_APP_BACKEND_API_URL + "/new_signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(json),
      })
        .then((userResponse) => {
          if (userResponse.status == 201) {
            console.log("User success");

            // Upload the menu
            fetch(process.env.REACT_APP_BACKEND_API_URL + "/file_upload/", {
              method: "POST",
              body: formdata,
            }).then((fileResponse) => {
              // If upload is successful, log in
              if (fileResponse.status == 204) {
                userResponse.json().then((data) => {
                  localStorage.setItem("token", data.user.token);
                  localStorage.setItem("vendor", "0");
                  localStorage.setItem("name", data.student.name);
                  setHomeName(data.student.name);
                  setIsLoggedin(true);
                  console.log(data);
                });
              }
            });
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
    });
  };

  const removeRestChip = (restId: number) => {
    const newSelectedRest: any = selectedRests.filter((rest) => {
      return rest.id !== restId;
    });
    setSelectedRests(newSelectedRest);
  };

  const removeVendChip = (vendId: number) => {
    const newSelectedVendors: any = selectedVendors.filter((vend) => {
      return vend.id !== vendId;
    });
    setSelectedRests(newSelectedVendors);
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
            <SignUpInput nameIn={"budget_total"} typeIn={"number"} value={budget} setter={setBudget}>
              Budget
            </SignUpInput>

            <IonItem>
              <IonLabel position="floating" color="primary">
                Preferred Restaurants
              </IonLabel>
              <IonInput
                name="preferred_restaurants"
                type="text"
                value={preferredRestaurants}
                onKeyDown={onRestInputChange}
                ref={restInput}
              ></IonInput>
              <div>{restSuggestions}</div>
            </IonItem>
            {selectedRests.map((rest: any) => (
              <IonItem lines="none" className="chipsDiv">
                <div id={rest.id}>
                  <ChipsComp restName={rest.name} restId={rest.id} removeChip={removeRestChip} />
                </div>
              </IonItem>
            ))}

            <IonItem>
              <IonLabel position="floating" color="primary">
                Preferred Nearby Vendors
              </IonLabel>
              <IonInput
                name="preferred_vendors"
                type="text"
                value={preferredVendors}
                onKeyDown={onVendorInpChange}
                // ref={restInput}
              ></IonInput>
              <div>{vendorSuggestions}</div>
            </IonItem>
            {selectedVendors.map((vend: any) => (
              <IonItem lines="none" className="chipsDiv">
                <div id={vend.id}>
                  <ChipsComp restName={vend.name} restId={vend.id} removeChip={removeVendChip} />
                </div>
              </IonItem>
            ))}

            <IonItem>
              <IonLabel position="floating" color="primary">
                Preferred Cuisines
              </IonLabel>
              <IonInput
                name="preferred_cuisines"
                type="text"
                value={preferredCuisines}
                onIonChange={(e) => setPreferredCuisines(e.detail.value!)}
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="floating" color="primary">
                Disliked Dishes
              </IonLabel>
              <IonInput
                name="not_preferred"
                type="text"
                value={dislikedDishes}
                onIonChange={(e) => setDislikedDishes(e.detail.value!)}
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked" color="primary">
                Mess Menu
              </IonLabel>
              <input type="file" name="file" />
            </IonItem>
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

export default Signup;
