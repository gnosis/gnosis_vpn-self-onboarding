import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

interface TellChoiceProps {
  className?: string;
}

export default function TellChoice({ className }: TellChoiceProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  const CONTINUE_LABEL = "Continue";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("20_TellChoice", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`TellChoice${className ? ` ${className}` : ""}`}
      onboardingStep={21}
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
        onboardingStep === 21 ? (
          <Button label={CONTINUE_LABEL} onClick={() => handleAnswer(CONTINUE_LABEL, 21)} />
        ) : null
      }
    />
  );
}
