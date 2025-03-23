"use client";
import React, { useReducer } from "react";
import Image from "next/image";
import { SvgIcon } from "@progress/kendo-react-common";
import { Button } from "@progress/kendo-react-buttons";
import { Input, InputChangeEvent } from "@progress/kendo-react-inputs";
import { Slider, SliderChangeEvent } from "@progress/kendo-react-inputs";
import {
  DatePicker,
  DatePickerChangeEvent,
} from "@progress/kendo-react-dateinputs";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";

import {
  CardFooter,
  Stepper,
  StepperChangeEvent,
} from "@progress/kendo-react-layout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  // Avatar,
} from "@progress/kendo-react-layout";
import { ChipList, ChipListChangeEvent } from "@progress/kendo-react-buttons";

import styles from "./page.module.css";

import { useRouter } from "next/navigation";

import {
  chevronRightIcon,
  chevronLeftIcon,
  columnsIcon,
} from "@progress/kendo-svg-icons";
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
import { breeds } from "@/constants/data/DogBreeds";
import { tryBuildReportUrl } from "./report/queryParams";

import {
  DropDownList,
  DropDownListChangeEvent,
} from "@progress/kendo-react-dropdowns";

const defaultDogQuirk: DogQuirk[] = [];

const defaultDogCommand: DogCommand[] = [];

const defaultDog: Dog = {
  name: "",
  breedInfo: {} as BreedInfo, // Adjust default values for BreedInfo as needed
  gender: "male", // Choose a default valid gender
  birthday: new Date("2023-01-01"),
  birthdayTicks: 0,
  age: 0,
  weightKg: 0,
  languageCode: "",
  physicalQuirks: defaultDogQuirk,
  behaviorQuirks: defaultDogQuirk,
  knownCommands: defaultDogCommand,
};

type State = {
  dog: Dog;
  step: number;
};

type Action =
  | {
      type: "UPDATE_ANSWER";
      payload: { key: string; value: string | number | Date };
    }
  | { type: "RESET" }
  | { type: "SET_STEP"; payload: number }
  | { type: "INCREMENT_STEP" }
  | { type: "DECREMENT_STEP" }
  | { type: "SET_KNOWN_COMMANDS"; payload: DogCommand[] }
  | { type: "SET_BEHAVIOUR_QUIRKS"; payload: DogQuirk[] }
  | { type: "SET_PHYSICAL_QUIRKS"; payload: DogQuirk[] };

function formReducer(state: State, action: Action): State {
  switch (action.type) {
    case "UPDATE_ANSWER":
      console.log(action.payload.value);
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
    case "SET_STEP":
      return { ...state, step: action.payload };
    case "INCREMENT_STEP":
      return { ...state, step: state.step + 1 };
    case "DECREMENT_STEP":
      return { ...state, step: state.step > 0 ? state.step - 1 : 0 };
    case "SET_KNOWN_COMMANDS": {
      return {
        ...state,
        dog: {
          ...state.dog,
          knownCommands: action.payload,
        },
      };
    }
    case "SET_BEHAVIOUR_QUIRKS": {
      return {
        ...state,
        dog: {
          ...state.dog,
          behaviorQuirks: action.payload,
        },
      };
    }
    case "SET_PHYSICAL_QUIRKS": {
      return {
        ...state,
        dog: {
          ...state.dog,
          physicalQuirks: action.payload,
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
  command: command,
}));

const chipBehavioralQuirks = behavioralQuirks.map((quirk) => ({
  text: quirk.name,
  value: quirk.name,
  quirk: quirk,
}));

const chipPhysicalQuirks = physicalQuirks.map((quirk) => ({
  text: quirk.name,
  value: quirk.name,
  quirk: quirk,
}));

const ungroupedBreedInfo = breeds
  .map((el) =>
    el.size
      ? {
          ...el,
          size_text:
            el.size.charAt(0).toUpperCase() +
            el.size.substring(1).toLowerCase(),
        }
      : { ...el, size_text: "unknown" }
  )
  .sort((a, b) => {
    // First sort by size group
    if (a.size_text < b.size_text) return -1;
    if (a.size_text > b.size_text) return 1;
    // Then sort alphabetically by breed name
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

const cardsData = [
  {
    thumbnailSrc: "/dog-wirehair-svgrepo-com.svg",
    headerTitle: "Welcome to Barkboard!",
    headerSubtitle: "And we will give you a free summary report of your pup!",
    label: "Welcome",
    url: "https://demos.telerik.com/kendo-react-ui/assets/layout/card/rila.jpg",
  },
  {
    thumbnailSrc: "/dog-wirehair-svgrepo-com.svg",
    headerTitle: "Tell us about your doggo",
    headerSubtitle: "And we'll give you a free summary report of your pup!",
    label: "Info",
    url: "https://demos.telerik.com/kendo-react-ui/assets/layout/card/rila.jpg",
  },
  {
    thumbnailSrc: "/dog-wirehair-svgrepo-com.svg",
    headerTitle: "What physical quirks do they have?",
    headerSubtitle: "Bulgaria, Europe",
    label: "Identity",
    url: "https://demos.telerik.com/kendo-react-ui/assets/layout/card/pamporovo.jpg",
  },
  {
    thumbnailSrc: "/dog-wirehair-svgrepo-com.svg",
    headerTitle: "What behavioural quirks do they have?",
    headerSubtitle: "Bulgaria, Europe",
    label: "Behavioral",
    url: "https://demos.telerik.com/kendo-react-ui/assets/layout/card/pamporovo.jpg",
  },
  {
    thumbnailSrc: "/dog-wirehair-svgrepo-com.svg",
    headerTitle: "What words and commands does your pooch know?",
    headerSubtitle: "Bulgaria, Europe",
    label: "Words",
    url: "https://demos.telerik.com/kendo-react-ui/assets/layout/card/camping.jpg",
  },
  {
    thumbnailSrc: "/dog-wirehair-svgrepo-com.svg",
    headerTitle: "Here's your report!",
    label: "Report",
    url: "https://demos.telerik.com/kendo-react-ui/assets/layout/card/camping.jpg",
  },
];

const genderOptions: Array<{ label: string; value: Dog["gender"] }> = [
  { label: "Male", value: "male" },
  { label: "Male ✂️", value: "male_neutered" },
  { label: "Female", value: "female" },
  { label: "Female ✂️", value: "female_spayed" },
];

export default function Home() {
  const router = useRouter();
  const [opened, setOpened] = React.useState(false);

  const [state, dispatch] = useReducer(formReducer, {
    dog: defaultDog,
    step: 0,
  });
  const [reportError, setReportError] = React.useState<string | null>(null);

  // useEffect(() => {
  //   setCard(cardsData[step]);
  // }, [step]);

  const handleStepperChange = (e: StepperChangeEvent) => {
    const newValue = e.value;
    dispatch({ type: "SET_STEP", payload: newValue });
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
    const selectedNames = Array.isArray(event.value)
      ? event.value
      : [event.value];
    if (name == "knownCommands") {
      const selectedCommands = chipCommands
        .filter((chip) => selectedNames.includes(chip.value))
        .map((chip) => chip.command);
      console.log(selectedNames);
      console.log(selectedCommands);
      if (selectedCommands) {
        dispatch({ type: "SET_KNOWN_COMMANDS", payload: selectedCommands });
      }
    } else if (name === "behaviorQuirks") {
      const selectedQuirks = chipBehavioralQuirks
        .filter((chip) => selectedNames.includes(chip.value))
        .map((chip) => chip.quirk);
      console.log(selectedNames);
      console.log(selectedQuirks);

      if (selectedQuirks) {
        dispatch({ type: "SET_BEHAVIOUR_QUIRKS", payload: selectedQuirks });
      }
    } else if (name === "physicalQuirks") {
      const selectedQuirks = chipPhysicalQuirks
        .filter((chip) => selectedNames.includes(chip.value))
        .map((chip) => chip.quirk);
      console.log(selectedNames);
      console.log(selectedQuirks);

      if (selectedQuirks) {
        dispatch({ type: "SET_PHYSICAL_QUIRKS", payload: selectedQuirks });
      }
    }
  };

  const handleDropDownChange =
    (name: string) => (event: DropDownListChangeEvent) => {
      let value = event.target.value;
      console.log(value);
      dispatch({
        type: "UPDATE_ANSWER",
        payload: { key: name, value: value },
      });
    };

  const onClickGoToReport = () => {
    const report_url = tryBuildReportUrl(state.dog);
    console.log(report_url);
    const { success, url, errors } = tryBuildReportUrl(state.dog);
    if (success && url) {
      window.open(url, "_blank");
    } else {
      setReportError(
        "Failed to generate report URL:\n" +
          errors.map((e) => "• " + e.errorMessage).join("\n")
      );
    }
  };

  const handleReset = () => {
    dispatch({ type: "RESET" });
  };

  const cardInputGroupings = (step: number) => {
    switch (step) {
      case 0:
        return (
          <div className={styles.cardBody}>
            <div className="k-pt-3 k-pl-5">
              <h1>Hi there fellow dog owner</h1>
              <p className="k-pt-3">
                This application generates a unique summary report detailing
                your dog. It can be used to show off to your friends, to take
                with to the vet, puppy training, or to show your pet sitter.
                Simply follow the steps to enter your dog&apos;s information.
              </p>
              <p>
                Once your dog&apos;s profile is complete, a permanent report URL
                is created that you can share with your family and friends—it
                will always be the same for your dog.
              </p>
              <p>Click &quot;Info&quot; or &quot;Next&quot; to get started!</p>
            </div>
          </div>
        );
      case 1:
        return (
          <div className={styles.cardBody}>
            <div
              className="k-d-flex k-flex-row k-pt-3 k-pl-5"
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
            <div
              className="k-d-flex k-flex-row k-pt-10 k-pl-5"
              style={{ justifyContent: "left", alignItems: "center" }}
            >
              <div style={{ width: "40%" }}>
                <Label editorId="date" className="k-label k-font-bold">
                  Select birth date
                </Label>
                <DatePicker
                  id="date"
                  name="birthday"
                  value={state.dog.birthday}
                  onChange={handleDateChange}
                />
              </div>
              <div
                className="k-d-flex k-flex-column k-pl-10"
                style={{ width: "45%" }}
              >
                <Label editorId="date" className="k-label k-font-bold">
                  Select breed
                </Label>
                <DropDownList
                  data={ungroupedBreedInfo}
                  textField="name"
                  groupField="size_text"
                  opened={opened}
                  onOpen={() => setOpened(true)}
                  onClose={() => setOpened(false)}
                  onChange={handleDropDownChange("breedInfo")}
                  value={state.dog.breedInfo}
                />
              </div>
            </div>
            <div className="k-d-flex k-flex-column k-pt-10 k-pl-5">
              <Label className="k-label k-font-bold">Weight</Label>
              <div
                className="k-d-flex k-flex-row"
                style={{ justifyContent: "left" }}
              >
                <Slider
                  min={1}
                  max={110}
                  value={state.dog.weightKg}
                  style={{ width: "60%" }}
                  onChange={(event: SliderChangeEvent) => {
                    const value = Math.round(event.value) as number;
                    dispatch({
                      type: "UPDATE_ANSWER",
                      payload: { key: "weightKg", value: value },
                    });
                  }}
                />
                <div className="k-pl-2">
                  <strong>{state.dog.weightKg}</strong>
                  {" kg"}
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className={styles.cardBody}>
            <div className="k-pt-3 k-pl-5">
              <Label className="k-label k-font-bold">
                Select the applicable physical quirks
              </Label>
              <div
                style={{
                  maxHeight: "25vh",
                  overflowY: "scroll",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              >
                <ChipList
                  data={chipPhysicalQuirks}
                  selection="multiple"
                  onChange={handleChipChange("physicalQuirks")}
                  value={state.dog.physicalQuirks.map((quirk) => quirk.name)}
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className={styles.cardBody}>
            <div className="k-pt-3 k-pl-5">
              <Label className="k-label k-font-bold">
                Select the applicable behavioral quirks
              </Label>
              <div
                style={{
                  maxHeight: "30vh",
                  overflowY: "scroll",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              >
                <ChipList
                  data={chipBehavioralQuirks}
                  selection="multiple"
                  onChange={handleChipChange("behaviorQuirks")}
                  value={state.dog.behaviorQuirks.map((quirk) => quirk.name)}
                />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className={styles.cardBody}>
            <div className="k-pt-3 k-pl-5">
              <div>
                <Label className="k-label k-font-bold">
                  Please select all your dog&apos;s known Commands
                </Label>
                <ChipList
                  className="k-pt-5"
                  data={chipCommands}
                  selection="multiple"
                  onChange={handleChipChange("knownCommands")}
                  value={state.dog.knownCommands.map(
                    (commands) => commands.name
                  )}
                />
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className={styles.cardBody}>
            <div
              className="k-pt-3 k-pl-5"
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyItems: "left",
                // alignItems: "center",
              }}
            >
              <h1>Get your report</h1>
              <p className="k-pt-3">
                Go to your report and share the url with anytone you want to see
                it.
              </p>
              <div
                className="k-d-flex k-flex-row k-pt-5"
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  // width: "100%",
                }}
              >
                <Button
                  themeColor="primary"
                  fillMode="outline"
                  onClick={onClickGoToReport}
                >
                  Go to report
                </Button>
                <span style={{ width: "10px" }} />
                <Button
                  themeColor="secondary"
                  fillMode="outline"
                  onClick={handleReset}
                >
                  Reset Profile
                </Button>
              </div>
            </div>
          </div>
        );
      default:
        break;
    }
  };

  return (
    <div className={styles.page}>
      {/* <header className={styles.header}>
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
      </header> */}
      {/* <div className={styles.container}>
        <Image
          style={{ marginTop: -100 }}
          className={styles.logoImage}
          src={card.thumbnailSrc}
          alt="logo"
          width={886}
          height={788}
          priority
        />
      </div> */}

      <section className={styles.cardsSection}>
        <div className={styles.cardsWrapper}>
          {/* <h5 className={styles.sectionTitle}>Let&apos;s get to know your pup 🐶</h5>
          <p>And we&apos;ll give you a free summary report of your furbaby</p> */}
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
                          padding: "10px",
                        }}
                      >
                        <Image
                          //src = {card.headerImage}
                          src={"/dog-breed" + state.step + "-svgrepo-com.svg"}
                          alt="dog-breed-svgrepo-com.svg"
                          width={150}
                          height={150}
                          priority
                        />
                        <h1
                          style={{
                            marginBottom: "2px",
                            paddingLeft: "22px",
                            fontSize: "2.5rem",
                          }}
                        >
                          {card.headerTitle}
                        </h1>
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

      {reportError && (
        <Dialog title="⚠️ Error" onClose={() => setReportError(null)}>
          <div style={{ whiteSpace: "pre-wrap" }}>{reportError}</div>
          <DialogActionsBar>
            <Button onClick={() => setReportError(null)}>Close</Button>
          </DialogActionsBar>
        </Dialog>
      )}
      <footer className={styles.footer}>
        <p>Copyright © 2025 BarkBoard MIT License. All rights reserved.</p>
      </footer>
    </div>
  );
}
