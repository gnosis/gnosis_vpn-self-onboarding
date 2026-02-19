import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

interface ConnectedTooEarlyProps {
  className?: string;
  lastEntry?: boolean;
  onboardingStep?: number;
}

export default function ConnectedTooEarly({ className, lastEntry, onboardingStep }: ConnectedTooEarlyProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const currentOnboardingStep = useAppStore((state) => state.onboardingStep);
  const stepToUse = onboardingStep || currentOnboardingStep;

  const CONTINUE_LABEL = "Continue";

  const STEP_KEY = `X${stepToUse}_ConnectedTooEarly`;

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer(STEP_KEY, answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`ConnectedTooEarly${className ? ` ${className}` : ""}`}
      onboardingStep={stepToUse}
      title="You connected too early!"
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
            You connected to the VPN too early. <strong>Please disconnect.</strong>
          </Typography>

        </>
      }
      buttons={
        lastEntry
          ? (
            <>
              {/* <Button label={CONTINUE_LABEL} onClick={() => handleAnswer(CONTINUE_LABEL, currentOnboardingStep - 0.9)} /> */}
            </>
          )
          : null
      }
    />
  );
}
