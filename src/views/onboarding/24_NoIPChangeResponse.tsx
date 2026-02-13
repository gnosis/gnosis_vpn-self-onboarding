import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

interface NoDifferentExitNodeProps {
  className?: string;
}

export default function NoIPChangeResponse({ className }: NoDifferentExitNodeProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  return (
    <Step
      className={`NoIPChangeResponse${className ? ` ${className}` : ""}`}
      onboardingStep={24}
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
          We'll try again or get some help
        </Typography>
      }
      buttons={
        onboardingStep === 24 ? (
          <Button label="Continue" onClick={() => setOnboardingStep(25)} />
        ) : null
      }
    />
  );
}
