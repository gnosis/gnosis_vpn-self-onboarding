import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

interface ReadyTimeoutProps {
  className?: string;
}

export default function ReadyTimeout({ className }: ReadyTimeoutProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  const CONTINUE_LABEL = "Continue";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("17_ReadyTimeout", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`ReadyTimeout${className ? ` ${className}` : ""}`}
      onboardingStep={17}
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
        onboardingStep === 17 ? (
          <Button label={CONTINUE_LABEL} onClick={() => handleAnswer(CONTINUE_LABEL, 18)} />
        ) : null
      }
    />
  );
}
