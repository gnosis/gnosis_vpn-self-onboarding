import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

interface YouAreConnectedProps {
  className?: string;
  lastEntry?: boolean;
  onboardingStep?: number;
  messageNumber?: number;
  exitNodeIteration?: number;
}

export default function YouAreConnected({ className, lastEntry, onboardingStep }: YouAreConnectedProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const currentOnboardingStep = useAppStore((state) => state.onboardingStep);
  const exitNodeIteration = useAppStore((state) => state.exitNodeIteration);
  const stepToUse = onboardingStep || currentOnboardingStep;

  const CONTINUE_LABEL = "Continue";

  const STEP_KEY = `X${stepToUse}_YouAreConnected_${exitNodeIteration}`;

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer(STEP_KEY, answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`YouAreConnected${className ? ` ${className}` : ""}`}
      onboardingStep={stepToUse}
      title="Awesome!"
      text={
        <>
          <Typography
            variant="body1"
            sx={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#333",
              mb: 2,
              fontWeight: "bold",
            }}
          >
            You are connected to the VPN.
          </Typography>

        </>
      }
      buttons={
        lastEntry
          ? (
            <>
              <Button label={CONTINUE_LABEL} onClick={() => handleAnswer(CONTINUE_LABEL, currentOnboardingStep === 31.9 ? currentOnboardingStep + 1.1 : currentOnboardingStep - 0.9)} />
            </>
          )
          : null
      }
    />
  );
}
