import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

interface WhatCanIHelpYouWithProps {
  className?: string;
  lastEntry?: boolean;
  onboardingStep?: number;
  messageNumber?: number;
  exitNodeIteration?: number;
}

export default function WhatCanIHelpYouWith({ className, lastEntry, onboardingStep }: WhatCanIHelpYouWithProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const currentOnboardingStep = useAppStore((state) => state.onboardingStep);
  const exitNodeIteration = useAppStore((state) => state.exitNodeIteration);
  const stepToUse = onboardingStep || currentOnboardingStep;

  const IT_IS_RESOLVED = "It's resolved";

  const STEP_KEY = `X${stepToUse}_WhatCanIHelpYouWith_${exitNodeIteration}`;

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer(STEP_KEY, answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`WhatCanIHelpYouWith${className ? ` ${className}` : ""}`}
      onboardingStep={stepToUse}
      title="Let's keep in touch!"
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
            Thanks! Keep an eye on your chosen communication channel and we'll be in touch.
          </Typography>

        </>
      }
      buttons={
        lastEntry
          ? (
            <>
              <Button label={IT_IS_RESOLVED} onClick={() => handleAnswer(IT_IS_RESOLVED, currentOnboardingStep + 0.5)} />
            </>
          )
          : null
      }
    />
  );
}
