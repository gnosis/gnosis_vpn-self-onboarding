import { Typography } from "@mui/material";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

interface ConnectedTooEarlyProps {
  className?: string;
  lastEntry?: boolean;
  onboardingStep?: number;
  messageNumber?: number;
  exitNodeIteration?: number;
}

export default function ConnectedTooEarly({ className, lastEntry, onboardingStep }: ConnectedTooEarlyProps) {
  const currentOnboardingStep = useAppStore((state) => state.onboardingStep);
  const stepToUse = onboardingStep || currentOnboardingStep;

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
