import { Typography } from "@mui/material";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";
import FeedbackSection from "../../components/FeedbackSection";

interface YouAreConnectedProps {
  className?: string;
  lastEntry?: boolean;
  onboardingStep?: number;
}

export default function YouAreConnected({ className, lastEntry, onboardingStep }: YouAreConnectedProps) {
  const currentOnboardingStep = useAppStore((state) => state.onboardingStep);
  const stepToUse = onboardingStep || currentOnboardingStep;

  const STEP_KEY = `X${stepToUse}_YouAreConnected`;

  return (
    <Step
      className={`YouAreConnected${className ? ` ${className}` : ""}`}
      onboardingStep={stepToUse}
      title="Not cool!"
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
            You are disconnected from the VPN.
            You can't move forward until you are connected again, but we want to understand what happened. Please tell us more.
          </Typography>

          <FeedbackSection 
            stepKey={STEP_KEY}
            label="Please briefly describe what happened"
          />
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
