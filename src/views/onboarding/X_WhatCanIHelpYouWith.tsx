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

  const SUBMIT_LABEL = "Submit";

  const STEP_KEY = `X${stepToUse}_WhatCanIHelpYouWith`;

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer(STEP_KEY, answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`WhatCanIHelpYouWith${className ? ` ${className}` : ""}`}
      onboardingStep={stepToUse}
      title="What can I help you with?"
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
            We want to make sure you have the best experience. Let us know if there's anything else we can help you with or any feedback you'd like to share.
          </Typography>

          <FeedbackSection
            stepKey={STEP_KEY}
            label="What can we help you with? (optional)"
          />
        </>
      }
      buttons={
        lastEntry
          ? (
            <>
              <Button label={SUBMIT_LABEL} onClick={() => handleAnswer(SUBMIT_LABEL, currentOnboardingStep + 0.5)} />
            </>
          )
          : null
      }
    />
  );
}
