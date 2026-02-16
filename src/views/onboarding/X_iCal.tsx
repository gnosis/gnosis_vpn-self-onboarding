import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import FeedbackSection from "../../components/FeedbackSection";
import { useAppStore } from "../../store/appStore";

interface WhatCanIHelpYouWithProps {
  className?: string;
  lastEntry?: boolean;
  onboardingStep?: number;
}

export default function WhatCanIHelpYouWith({ className, lastEntry, onboardingStep }: WhatCanIHelpYouWithProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const currentOnboardingStep = useAppStore((state) => state.onboardingStep);
  const stepToUse = onboardingStep || currentOnboardingStep;

  const IT_IS_RESOLVED = "It's resolved";

  const STEP_KEY = `X${stepToUse}_WhatCanIHelpYouWith`;

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer(STEP_KEY, answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`WhatCanIHelpYouWith${className ? ` ${className}` : ""}`}
      onboardingStep={stepToUse}
      title="Let's talk!"
      text={
        <>
          <Typography
            variant="body1"
            sx={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#333",
              mb: 2,
            }}
          >
            No problem, just use this link to book some time with one of our team: [cal.com link]
          </Typography>
        </>
      }
      buttons={
        lastEntry
          ? (
            <>
              <Button label={IT_IS_RESOLVED} onClick={() => handleAnswer(IT_IS_RESOLVED, currentOnboardingStep + 0.25)} />
            </>
          )
          : null
      }
    />
  );
}
