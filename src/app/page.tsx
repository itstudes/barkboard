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
import { ChipList, ChipListChangeEvent } from "@progress/kendo-react-buttons";

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
import { physicalQuirks, behavioralQuirks } from "@/constants/data/DogQuirks";
import {
  MultiSelect,
  MultiSelectChangeEvent,
} from "@progress/kendo-react-dropdowns";

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

// const defaultDogCommands: DogCommand[] = commands as DogCommand[];

type State = {
  dog: Dog;
  step: number;
};

type Action =
  | {
      type: "UPDATE_ANSWER";
      payload: { key: string; value: string | Date };
    }
  | { type: "RESET" }
  | { type: "INCREMENT_STEP" }
  | { type: "DECREMENT_STEP" }
  | { type: "TOGGLE_KNOWN_COMMAND"; payload: DogCommand }
  | { type: "TOGGLE_BEHAVIOUR_QUIRKS"; payload: DogQuirk };

function formReducer(state: State, action: Action): State {
  switch (action.type) {
    case "UPDATE_ANSWER":
      return {
        ...state,
        dog: {
          ...state.dog,
          [action.payload.key]: action.payload.value,
        },
        // Increment the step counter if this is the last question of the current step
        // step: action.payload.isLastQuestion ? state.step + 1 : state.step,
      };
    case "RESET":
      return { dog: defaultDog, step: 0 };
    case "INCREMENT_STEP":
      return { ...state, step: state.step + 1 };
    case "DECREMENT_STEP":
      return { ...state, step: state.step > 0 ? state.step - 1 : 0 };
    case "TOGGLE_KNOWN_COMMAND": {
      const command = action.payload;
      const isAlreadyKnown = state.dog.knownCommands.some(
        (cmd) => cmd.name === command.name
      );
      return {
        ...state,
        dog: {
          ...state.dog,
          knownCommands: isAlreadyKnown
            ? state.dog.knownCommands.filter((cmd) => cmd.name !== command.name)
            : [...state.dog.knownCommands, command],
        },
      };
    }
    case "TOGGLE_BEHAVIOUR_QUIRKS": {
      const quirk = action.payload;
      const isAlreadyKnown = state.dog.behaviorQuirks.some(
        (cmd) => cmd.name === quirk.name
      );
      return {
        ...state,
        dog: {
          ...state.dog,
          behaviorQuirks: isAlreadyKnown
            ? state.dog.behaviorQuirks.filter((cmd) => cmd.name !== quirk.name)
            : [...state.dog.behaviorQuirks, quirk],
        },
      };
    }
    default:
      return state;
  }
}

const chipCommands = commands.map((command) => ({
  text: command.name,
  value: command.name,
}));

const chipBehavioralQuirks = behavioralQuirks.map((quirk) => ({
  text: quirk.name,
  value: quirk.name,
}));

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
    headerTitle: "What Behavioural quirks do they have? 🫠",
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

// const defaultDogCommands: Array<{
//   name: "sit";
//   expectation: "The dog sits calmly where it was.";
//   similarToCommandsBitMap: 2;
//   type: "obedience";
// }> = [
//   commands.map
// ]

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

  const handleStepIncrement = (increment: number) => () => {
    if (increment == 1) {
      dispatch({ type: "INCREMENT_STEP" });
    } else if (increment == -1) {
      dispatch({ type: "DECREMENT_STEP" });
    }
  };

  const card = cardsData[state.step];

  const labelOnly = cardsData.map((card, index) => {
    return { label: card.label };
  });

  const handleRadioChange =
    (name: string) => (event: RadioGroupChangeEvent) => {
      const { value } = event;
      dispatch({
        type: "UPDATE_ANSWER",
        payload: { key: name, value },
      });
    };

  const handleDateChange = (event: DatePickerChangeEvent) => {
    const value = event.target.value as Date;
    const name = event.target.name as string;

    dispatch({
      type: "UPDATE_ANSWER",
      payload: { key: name, value },
    });
  };

  const handleInputChange = (event: InputChangeEvent) => {
    const name = event.target.name as string;
    const value = event.target.value as string;

    dispatch({
      type: "UPDATE_ANSWER",
      payload: { key: name, value },
    });
  };

  const handleChipChange = (name: string) => (event: ChipListChangeEvent) => {
    const value = event.value as string;
    console.log(name);
    if (name == "knownCommands") {
      const commandObj = commands.find((c) => c.name === value);
      if (commandObj) {
        dispatch({ type: "TOGGLE_KNOWN_COMMAND", payload: commandObj });
      }
    } else if (name === "behaviorQuirks") {
      const quirksObj = behavioralQuirks.find((c) => c.name === value);
      if (quirksObj) {
        dispatch({ type: "TOGGLE_BEHAVIOUR_QUIRKS", payload: quirksObj });
      }
    }
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
              <div className="k-pr-10" style={{ width: "60%" }}>
                <Label className="k-label k-font-bold">Name</Label>
                <Input
                  name="name"
                  value={state.dog.name}
                  onChange={handleInputChange}
                  placeholder={"Sir Barksalot"}
                  style={{ width: "100%" }}
                />
              </div>
              <div>
                <Label className="k-label k-font-bold">Gender</Label>
                <RadioGroup
                  name="gender"
                  layout="horizontal"
                  data={genderOptions}
                  value={state.dog.gender}
                  onChange={handleRadioChange("gender")}
                />
              </div>
            </div>
            <div className="k-pl-5 k-pt-10" style={{ width: "35%" }}>
              <Label editorId="date" className="k-label k-font-bold">
                Select birth date
              </Label>
              <DatePicker
                id="date"
                value={state.dog.birthday}
                onChange={handleDateChange}
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div className={styles.cardBody}>
            <div>
              <Label className="k-label k-font-bold">
                Select the applicable quirks
              </Label>
              <div
                className="k-pt-5 k-pb-5"
                style={{ maxHeight: "200px", overflowY: "scroll" }}
              >
                <ChipList
                  data={chipBehavioralQuirks}
                  selection="multiple"
                  onChange={handleChipChange("behaviorQuirks")}
                  // value={state.dog.behaviorQuirks.map((quirk) => ({
                  //   text: quirk.name,
                  //   value: quirk.name,
                  // }))}
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className={styles.cardBody}>
            <div>
              <Label className="k-label k-font-bold">
                Please select all your dog's known Commands
              </Label>
              <ChipList
                className="k-pt-5"
                data={chipCommands}
                selection="multiple"
                onChange={handleChipChange("knownCommands")}
                // value={}
              />
            </div>
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
                          style={{ marginBottom: "2px", paddingLeft: "22px" }}
                        >
                          {card.headerTitle}
                        </CardTitle>
                        {/* <CardSubtitle>
                          <p>{card.headerSubtitle}</p>
                        </CardSubtitle> */}
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody className={styles.cardBody}>
                    {cardInputGroupings(state.step)}
                  </CardBody>
                  <CardFooter>
                    <div
                      className="k-d-flex k-flex-row"
                      style={{
                        margin: "10px",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button
                        style={{
                          opacity: state.step != 0 ? 100 : 0,
                        }}
                        themeColor="primary"
                        fillMode="flat"
                        className="roundButton"
                        onClick={handleStepIncrement(-1)}
                        disabled={state.step == 0}
                      >
                        <SvgIcon icon={chevronLeftIcon} size="large" />
                      </Button>

                      <Stepper
                        // className="my_stepper"
                        value={state.step}
                        onChange={handleStepperChange}
                        mode={"labels"}
                        items={labelOnly}
                      />
                      <Button
                        style={{
                          opacity: state.step != cardsData.length - 1 ? 100 : 0,
                        }}
                        themeColor="primary"
                        fillMode="flat"
                        className="roundButton"
                        onClick={handleStepIncrement(1)}
                        disabled={state.step == cardsData.length - 1}
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
