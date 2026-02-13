import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

interface NoDifferentExitNodeProps {
  className?: string;
}

export default function NoIPChangeResponse({ className }: NoDifferentExitNodeProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  const CONTINUE_LABEL = "Continue";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("24_NoIPChangeResponse", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`NoIPChangeResponse${className ? ` ${className}` : ""}`}
      onboardingStep={25}
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
        onboardingStep === 25 ? (
          <Button label={CONTINUE_LABEL} onClick={() => handleAnswer(CONTINUE_LABEL, 25)} />
        ) : null
      }
    />
  );
}
