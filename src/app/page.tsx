"use client";
import React, { useEffect, useReducer } from "react";
import Image from "next/image";
import { SvgIcon } from "@progress/kendo-react-common";
import { Button } from "@progress/kendo-react-buttons";
import { Stepper, StepperChangeEvent } from "@progress/kendo-react-layout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardActions,
  CardSubtitle,
  // Avatar,
} from "@progress/kendo-react-layout";

import styles from "./page.module.css";

import { useRouter } from "next/navigation";

import { chevronRightIcon } from "@progress/kendo-svg-icons";
import {
  RadioGroup,
  RadioGroupChangeEvent,
} from "@progress/kendo-react-inputs";
import { Label } from "@progress/kendo-react-labels";

type Answers = {
  [key: string]: string;
};

type State = {
  answers: Answers;
  step: number;
};

type Action =
  | {
      type: "UPDATE_ANSWER";
      payload: { key: string; value: string; isLastQuestion?: boolean };
    }
  | { type: "RESET" }
  | { type: "INCREMENT_STEP" }
  | { type: "DECREMENT_STEP" };

function formReducer(state: State, action: Action): State {
  switch (action.type) {
    case "UPDATE_ANSWER":
      return {
        answers: {
          ...state.answers,
          [action.payload.key]: action.payload.value,
        },
        // Increment the step counter if this is the last question of the current step
        step: action.payload.isLastQuestion ? state.step + 1 : state.step,
      };
    case "RESET":
      return { answers: {}, step: 0 };
    case "INCREMENT_STEP":
      return { ...state, step: state.step + 1 };
    case "DECREMENT_STEP":
      return { ...state, step: state.step > 0 ? state.step - 1 : 0 };
    default:
      return state;
  }
}

const cardsData = [
  {
    thumbnailSrc:
      "https://demos.telerik.com/kendo-react-ui/assets/layout/card/rila_lakes.jpg",
    headerTitle: "Tell us about your pdooch 🥹",
    headerSubtitle: "Bulgaria, Europe",
    label: "Summary",
    url: "https://demos.telerik.com/kendo-react-ui/assets/layout/card/rila.jpg",
  },
  {
    thumbnailSrc:
      "https://demos.telerik.com/kendo-react-ui/assets/layout/card/rila_lakes.jpg",
    headerTitle: "What Quirks and Suchf? 🫠",
    headerSubtitle: "Bulgaria, Europe",
    label: "Physical Quirks",
    url: "https://demos.telerik.com/kendo-react-ui/assets/layout/card/pamporovo.jpg",
  },
  {
    thumbnailSrc:
      "https://demos.telerik.com/kendo-react-ui/assets/layout/card/rila_lakes.jpg",
    headerTitle: "What Words and Commands does your pooch know? 🤓",
    headerSubtitle: "Bulgaria, Europe",
    label: "Dictionary",
    url: "https://demos.telerik.com/kendo-react-ui/assets/layout/card/camping.jpg",
  },
  {
    thumbnailSrc:
      "https://demos.telerik.com/kendo-react-ui/assets/layout/card/rila_lakes.jpg",
    headerTitle: "Here's your QR code! 🐶",
    label: "Your Report!",
    url: "https://demos.telerik.com/kendo-react-ui/assets/layout/card/camping.jpg",
  },
];

const genderOptions = [
  { label: "Good Boy", value: "male" },
  { label: "Good Girl", value: "female" },
  { label: "Just a good pooch", value: "other" },
];

export default function Home() {
  const router = useRouter();
  const [state, dispatch] = useReducer(formReducer, {
    answers: { gender: "" },
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

  const card = cardsData[state.step];

  const labelOnly = cardsData.map((card, index) => {
    return { label: card.label };
  });

  const handleRadioChange = (name: string) => (event: RadioGroupChangeEvent) => {
    const { value } = event;
    const isLastQuestion = false;

    console.log(name);
    console.log(value);

    dispatch({
      type: 'UPDATE_ANSWER',
      payload: { key: name, value, isLastQuestion: isLastQuestion },
    });
  };

  const handleReset = () => {
    dispatch({ type: "RESET" });
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
      <div className={styles.container}>
        <Image
          className={styles.reactLogo}
          src="/react.svg"
          alt="React Logo"
          width={886}
          height={788}
          priority
        />
        <div className="k-d-flex k-flex-col">
          <h1 className={styles.title}>Hey Tudes</h1>
          <h3 className={styles.subtitle}>
            Comprehensive React UI Component Library
          </h3>
          <div className="k-mt-3">
            <Button themeColor="primary" className="k-mr-2">
              <a href="https://www.telerik.com/kendo-react-ui" target="_blank">
                Try KendoReact
              </a>
            </Button>
            <Button themeColor="secondary" fillMode="solid">
              <a href="https://vercel.com/" target="_blank">
                More about Next.js
              </a>
            </Button>
          </div>
        </div>
      </div>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className="k-pl-8">
            <h5 className={styles.sectionTitle}>Get started</h5>
            <p>
              Edit index page at or set up data source at{" "}
              <code>src/pages/index.jsx</code> or set up data source at{" "}
              <code>kendo/data.json</code>
            </p>
          </div>
        </div>
      </section>

      <section className={styles.cardsSection}>
        <div className={styles.cardsWrapper}>
          <h5 className={styles.sectionTitle}>Highlights</h5>
          <div className={styles.cardsContainer}>
            {/* <Card className={styles.card}>
              <CardHeader className={styles.cardHeader}>
                <Image
                  src="/classroom.svg"
                  alt="Virtual Classroom Logo"
                  width={64}
                  height={64}
                  priority
                />
                <CardTitle className={styles.cardTitle}>
                  Virtual Classroom
                </CardTitle>
              </CardHeader>
              <CardBody>
                <p className={styles.cardBody}>
                  Need to quickly get started with KendoReact or just prefer
                  video on-boarding materials we have Virtual Classroom for you.
                </p>
              </CardBody>
              <CardActions>
                <Button themeColor="primary" fillMode="flat">
                  <a href="https://rb.gy/w21cc8" target="_blank">
                    Get Started
                  </a>
                </Button>
              </CardActions>
            </Card> */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <div>
                <Card
                  style={{
                    // width: "100%",
                    boxShadow: "0 0 4px 0 rgba(0, 0, 0, .1)",
                    marginTop: "15px",
                  }}
                >
                  <CardHeader className={styles.cardHeader}>
                    <div className="k-d-flex k-flex-row">
                      <div>
                        <Image
                          src="/classroom.svg"
                          alt="Virtual Classroom Logo"
                          width={100}
                          height={100}
                          priority
                        />
                        <CardTitle style={{ marginBottom: "4px" }}>
                          {card.headerTitle}
                        </CardTitle>
                        <CardSubtitle>
                          <p>{card.headerSubtitle}</p>
                        </CardSubtitle>
                      </div>
                      <CardActions>
                        <Button themeColor="primary" fillMode="flat">
                          <SvgIcon icon={chevronRightIcon} size="large" />
                        </Button>
                      </CardActions>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <div className={styles.cardBody}>
                      <div>
                        <Label className="k-label">Payment Method</Label>
                        <RadioGroup
                          name="gender"
                          data={genderOptions}
                          value={state.answers.gender}
                          onChange={handleRadioChange("gender")}
                        />
                      </div>
                    </div>
                  </CardBody>
                  <div style={{ margin: "10px" }}>
                    <Stepper
                      value={state.step}
                      onChange={handleStepperChange}
                      mode={"labels"}
                      items={labelOnly}
                    />
                  </div>
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
