import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import FeedbackSection from "../../components/FeedbackSection";
import { useAppStore } from "../../store/appStore";

interface WhatCanIHelpYouWithProps {
  className?: string;
  lastEntry?: boolean;
  onboardingStep?: number;
  messageNumber?: number;
  exitNodeIteration?: number;
}

export default function WhatCanIHelpYouWith({ className, lastEntry, onboardingStep, exitNodeIteration }: WhatCanIHelpYouWithProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const currentOnboardingStep = useAppStore((state) => state.onboardingStep);
  const stepToUse = onboardingStep || currentOnboardingStep;
  const currentExitNodeIteration = useAppStore((state) => state.exitNodeIteration);
  const anonymous = useAppStore((state) => state.anonymous);

  const SUBMIT_LABEL = "Submit";
  const I_NEED_A_CALL = "I need a call";
  const RESOLVED_LABEL = "Resolved";

  const STEP_KEY = `X${stepToUse}_WhatCanIHelpYouWith_${exitNodeIteration}`;

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer(STEP_KEY, answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`WhatCanIHelpYouWith${className ? ` ${className}` : ""}`}
      onboardingStep={stepToUse}
      title={anonymous ? "Help" : "What can I help you with?"}
      text={
        anonymous ?
          <Typography
            variant="body1"
            sx={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#333",
              mb: 2,
            }}
          >
            No problem! Since you're in anonymous mode I can't gather any info here, but you can reach out to us on your chosen communication channel to tell us the issue or book a call.
          </Typography>
          :
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
              Uh-oh. Just let us know what's gone wrong and we'll try to resolve it ASAP.
            </Typography>

            <FeedbackSection
              stepKey={STEP_KEY}
              label="Please briefly describe the issue"
              disabled={currentExitNodeIteration !== exitNodeIteration}
            />
          </>
      }
      buttons={
        lastEntry
          ? (
            anonymous ?
              <Button label={RESOLVED_LABEL} onClick={() => handleAnswer(RESOLVED_LABEL, currentOnboardingStep + 0.75)} />
            :
            <>
              <Button label={SUBMIT_LABEL} onClick={() => handleAnswer(SUBMIT_LABEL, currentOnboardingStep + 0.25)} />
              <Button label={I_NEED_A_CALL} onClick={() => handleAnswer(I_NEED_A_CALL, currentOnboardingStep + 0.5)} />
            </>
          )
          : null
      }
    />
  );
}
