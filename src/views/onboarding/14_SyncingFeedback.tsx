import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

interface SyncingFeedbackProps {
  className?: string;
}

export default function SyncingFeedback({ className }: SyncingFeedbackProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  return (
    <Step
      className={`SyncingFeedback${className ? ` ${className}` : ""}`}
      onboardingStep={14}
      title="Syncing Feedback"
      text={
        <Typography
          variant="body1"
          sx={{
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: "#333",
          }}
        >
          Amazing! How long did that take?
        </Typography>
      }
      buttons={
        onboardingStep === 14 ? (
          <Button label="Continue" onClick={() => setOnboardingStep(15)} />
        ) : null
      }
    />
  );
}
