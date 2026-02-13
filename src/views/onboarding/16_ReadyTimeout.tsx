import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

interface ReadyTimeoutProps {
  className?: string;
}

export default function ReadyTimeout({ className }: ReadyTimeoutProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  return (
    <Step
      className={`ReadyTimeout${className ? ` ${className}` : ""}`}
      onboardingStep={16}
      title="Response"
      text={
        <Typography
          variant="body1"
          sx={{
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: "#333",
          }}
        >
          Great!
        </Typography>
      }
      buttons={
        onboardingStep === 16 ? (
          <Button label="Continue" onClick={() => setOnboardingStep(17)} />
        ) : null
      }
    />
  );
}
