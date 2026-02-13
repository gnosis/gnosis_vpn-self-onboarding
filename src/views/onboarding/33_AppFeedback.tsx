import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

interface AppFeedbackProps {
  className?: string;
}

export default function AppFeedback({ className }: AppFeedbackProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  return (
    <Step
      className={`AppFeedback${className ? ` ${className}` : ""}`}
      onboardingStep={33}
      title="App feedback"
      text={
        <Typography
          variant="body1"
          sx={{
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: "#333",
          }}
        >
          Great! Did it work well? Did you notice any issues?
        </Typography>
      }
      buttons={
        onboardingStep === 33 ? (
          <Button label="Continue" onClick={() => setOnboardingStep(34)} />
        ) : null
      }
    />
  );
}
