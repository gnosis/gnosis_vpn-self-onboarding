import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

interface TellChoiceProps {
  className?: string;
}

export default function TellChoice({ className }: TellChoiceProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  return (
    <Step
      className={`TellChoice${className ? ` ${className}` : ""}`}
      onboardingStep={20}
      title="Tell us choice"
      text={
        <Typography
          variant="body1"
          sx={{
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: "#333",
          }}
        >
          Which one did you choose?
        </Typography>
      }
      buttons={
        onboardingStep === 20 ? (
          <Button label="Continue" onClick={() => setOnboardingStep(21)} />
        ) : null
      }
    />
  );
}
