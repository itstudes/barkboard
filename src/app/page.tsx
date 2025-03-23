"use client";
import React, { useEffect, useReducer } from "react";
import Image from "next/image";
import { SvgIcon } from "@progress/kendo-react-common";
import { Button } from "@progress/kendo-react-buttons";
import { Input, InputChangeEvent } from "@progress/kendo-react-inputs";
import {
  DatePicker,
  DatePickerChangeEvent,
} from "@progress/kendo-react-dateinputs";

import {
  CardFooter,
  CardImage,
  Stepper,
  StepperChangeEvent,
} from "@progress/kendo-react-layout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardActions,
  CardSubtitle,
  // Avatar,
} from "@progress/kendo-react-layout";
import { ChipList, Chip, ChipProps } from "@progress/kendo-react-buttons";

import styles from "./page.module.css";

import { useRouter } from "next/navigation";

import { chevronRightIcon, chevronLeftIcon } from "@progress/kendo-svg-icons";
import {
  RadioGroup,
  RadioGroupChangeEvent,
} from "@progress/kendo-react-inputs";
import { Label } from "@progress/kendo-react-labels";
import { BreedInfo } from "@/types/BreedInfo";

import { Dog } from "@/types/Dog";
import { DogQuirk } from "@/types/DogQuirk";
import { DogCommand } from "@/types/DogCommand";
import { commands } from "@/constants/data/DogCommands";

const defaultDogQuirk: DogQuirk[] = [];

const defaultDogCommand: DogCommand[] = [
  //   {
  //   base2Id: 0,
  //   name: "",
  //   expectation: "appearance",
  //   type: "obedience",
  //   similarToCommandsBitMap: 0
  // }
];

const defaultDog: Dog = {
  name: "",
  breedInfo: {} as BreedInfo, // Adjust default values for BreedInfo as needed
  gender: "male", // Choose a default valid gender
  birthday: new Date(),
  birthdayTicks: 0,
  age: 0,
  weightKg: 0,
  languageCode: "",
  physicalQuirks: defaultDogQuirk,
  behaviorQuirks: defaultDogQuirk,
  knownCommands: defaultDogCommand,
};

const defaultDogCommands: DogCommand[] = commands as DogCommand[];

type State = {
  dog: Dog;
  step: number;
};

type Action =
  | {
      type: "UPDATE_ANSWER";
      payload: { key: string; value: string | Date; isLastQuestion?: boolean };
    }
  | { type: "RESET" }
  | { type: "INCREMENT_STEP" }
  | { type: "DECREMENT_STEP" };

function formReducer(state: State, action: Action): State {
  switch (action.type) {
    case "UPDATE_ANSWER":
      return {
        dog: {
          ...state.dog,
          [action.payload.key]: action.payload.value,
        },
        // Increment the step counter if this is the last question of the current step
        step: action.payload.isLastQuestion ? state.step + 1 : state.step,
      };
    case "RESET":
      return { dog: defaultDog, step: 0 };
    case "INCREMENT_STEP":
      return { ...state, step: state.step + 1 };
    case "DECREMENT_STEP":
      return { ...state, step: state.step > 0 ? state.step - 1 : 0 };
    default:
      return state;
  }
}

const chipsData = [
  { text: "Filled Chip", value: "filled chip" },
  { text: "Chip Disabled", value: "disabled chip", selected: true },
  { text: "Outlined Chip", value: "outlined chip", fillMode: "outlined" },
  { text: "Selected Chip", value: "selected chip", selected: true },
  { text: "Removable Chip", value: "removable chip", removable: true },
];

const cardsData = [
  {
    thumbnailSrc: "/dog-wirehair-svgrepo-com.svg",
    headerTitle: "Tell us about your doggo",
    headerSubtitle: "And we'll give you a free summary report of your pup!",
    label: "Summary",
    url: "https://demos.telerik.com/kendo-react-ui/assets/layout/card/rila.jpg",
  },
  {
    thumbnailSrc: "/dog-wirehair-svgrepo-com.svg",
    headerTitle: "What Quirks and Suchf? 🫠",
    headerSubtitle: "Bulgaria, Europe",
    label: "Quirks",
    url: "https://demos.telerik.com/kendo-react-ui/assets/layout/card/pamporovo.jpg",
  },
  {
    thumbnailSrc: "/dog-wirehair-svgrepo-com.svg",
    headerTitle: "What Words and Commands does your pooch know? 🤓",
    headerSubtitle: "Bulgaria, Europe",
    label: "Dictionary",
    url: "https://demos.telerik.com/kendo-react-ui/assets/layout/card/camping.jpg",
  },
  {
    thumbnailSrc: "/dog-wirehair-svgrepo-com.svg",
    headerTitle: "Here's your QR code! 🐶",
    label: "Your Report!",
    url: "https://demos.telerik.com/kendo-react-ui/assets/layout/card/camping.jpg",
  },
];

const genderOptions: Array<{ label: string; value: Dog["gender"] }> = [
  { label: "Male", value: "male" },
  // { label: "Neutered Male", value: "male_neutered" },
  { label: "Female", value: "female" },
  // { label: "Spayed Female", value: "female_spayed" },
];

export default function Home() {
  const router = useRouter();
  const [state, dispatch] = useReducer(formReducer, {
    dog: defaultDog,
    step: 0,
  });

  // useEffect(() => {
  //   setCard(cardsData[step]);
  // }, [step]);

  const handleStepperChange = (e: StepperChangeEvent) => {
    const newValue = e.value;
    if (newValue > state.step) {
      dispatch({ type: "INCREMENT_STEP" });
    } else if (newValue < state.step) {
      dispatch({ type: "DECREMENT_STEP" });
    }
  };

  const handleStepIncrement = (increment: number) => (event: MouseEvent) => {};

  const card = cardsData[state.step];

  const labelOnly = cardsData.map((card, index) => {
    return { label: card.label };
  });

  const handleRadioChange =
    (name: string) => (event: RadioGroupChangeEvent) => {
      const { value } = event;
      const isLastQuestion = false;
      console.log(name);
      console.log(value);
      dispatch({
        type: "UPDATE_ANSWER",
        payload: { key: name, value, isLastQuestion: isLastQuestion },
      });
    };

  const handleDateChange = (event: DatePickerChangeEvent) => {
    const value = event.target.value as Date;
    const name = event.target.name as string;

    console.log(name);
    console.log(typeof event.value);
    console.log(event.value);
    console.log(value);
    const isLastQuestion = false;

    dispatch({
      type: "UPDATE_ANSWER",
      payload: { key: name, value, isLastQuestion: isLastQuestion },
    });
  };

  const handleInputChange = (event: InputChangeEvent) => {
    const name = event.target.name as string;
    const value = event.target.value as string;

    const isLastQuestion = false;

    dispatch({
      type: "UPDATE_ANSWER",
      payload: { key: name, value, isLastQuestion: isLastQuestion },
    });
  };

  const handleReset = () => {
    dispatch({ type: "RESET" });
  };

  const cardInputGroupings = (step: number) => {
    switch (step) {
      case 0:
        return (
          <div
            className={styles.cardBody}
            style={{ justifyContent: "space-between" }}
          >
            <div
              className="k-d-flex k-flex-row  k-pt-5 k-pl-5"
              style={{ justifyContent: "left" }}
            >
              <div className="k-pr-10">
                <Label className="k-label">Name</Label>
                <Input
                  name="name"
                  value={state.dog.name}
                  onChange={handleInputChange}
                  placeholder={"Sir Barksalot"}
                  style={{ width: "100%" }}
                />
              </div>
              <div>
                <Label className="k-label">Gender</Label>
                <RadioGroup
                  name="gender"
                  layout="horizontal"
                  data={genderOptions}
                  value={state.dog.gender}
                  onChange={handleRadioChange("gender")}
                />
              </div>
            </div>
            <div className="k-pl-5 k-pv-10">
              <Label editorId="date">Select date</Label>
              <DatePicker
                id="date"
                value={state.dog.birthday}
                onChange={handleDateChange}
              />
            </div>
            <div>
              <ChipList
                selection={"single"}
                defaultData={chipsData}
                chip={(props: ChipProps) => {
                  const { dataItem, onClick, onRemove } = props;
                  return (
                    <Chip
                      text={dataItem.text}
                      value={dataItem.value}
                      disabled={dataItem.disabled}
                      selected={dataItem.selected}
                      fillMode={dataItem.fillMode}
                      removable={dataItem.removable}
                      onClick={onClick}
                      onRemove={onRemove}
                    />
                  );
                }}
              />
            </div>
          </div>
        );
      case 1:
        return <div className={styles.cardBody}></div>;
      case 2:
        return (
          <div className={styles.cardBody}>
            <Label className="k-label">Gender</Label>
            <RadioGroup
              name="gender"
              data={genderOptions}
              value={state.dog.gender}
              onChange={handleRadioChange("gender")}
            />
          </div>
        );
      default:
        break;
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h2>Bark-board</h2>
        <div>
          <Button themeColor="primary" fillMode="flat" className="k-mr-1">
            Home
          </Button>
          <Button
            themeColor="primary"
            fillMode="flat"
            onClick={() => router.push("/grid")}
          >
            Grid
          </Button>
        </div>
      </header>
      {/* <div className={styles.container}>
        <Image
          className={styles.logoImage}
          src={card.thumbnailSrc}
          alt="React Logo"
          width={886}
          height={788}
          priority
        />
      </div> */}

      <section className={styles.cardsSection}>
        <div className={styles.cardsWrapper}>
          <h5 className={styles.sectionTitle}>Let's get to know your pup 🐶</h5>
          <p>And we'll give you a free summary report of your furbaby</p>
          <div className={styles.cardsContainer}>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <div>
                <Card
                  style={{
                    // width: "100%",
                    boxShadow: "0 0 4px 0 rgba(0, 0, 0, .1)",
                    marginTop: "15px",
                  }}
                >
                  <CardHeader className={styles.cardHeader}>
                    <div
                      className="k-d-flex k-flex-row"
                      style={{
                        justifyContent: "space-between",
                        padding: "10px",
                      }}
                    >
                      <div
                        className="k-d-flex k-flex-row"
                        style={{
                          // justifyContent: "center",
                          alignItems: "center",
                          padding: "15px",
                        }}
                      >
                        <Image
                          //src = {card.headerImage}
                          src="/dog-breed-svgrepo-com.svg"
                          alt="dog-breed-svgrepo-com.svg"
                          width={180}
                          height={180}
                          priority
                        />
                        <CardTitle
                          style={{ marginBottom: "2px", paddingLeft: "20px" }}
                        >
                          {card.headerTitle}
                        </CardTitle>
                        {/* <CardSubtitle>
                          <p>{card.headerSubtitle}</p>
                        </CardSubtitle> */}
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody>{cardInputGroupings(state.step)}</CardBody>
                  <CardFooter>
                    <div
                      className="k-d-flex k-flex-row"
                      style={{
                        margin: "10px",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      {state.step != 0 ? (
                        <Button
                          themeColor="primary"
                          fillMode="flat"
                          className="roundButton"
                          // onClick={handleStepIncrement(-1)}
                        >
                          <SvgIcon icon={chevronLeftIcon} size="large" />
                        </Button>
                      ) : (
                        <></>
                      )}

                      <Stepper
                        // className="my_stepper"
                        value={state.step}
                        onChange={handleStepperChange}
                        mode={"labels"}
                        items={labelOnly}
                      />

                      <Button
                        themeColor="primary"
                        fillMode="flat"
                        className="roundButton"
                        // onClick={handleStepIncrement(1)}
                      >
                        <SvgIcon icon={chevronRightIcon} size="large" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>Copyright © 2023 Progress Software. All rights reserved.</p>
      </footer>
    </div>
  );
}
