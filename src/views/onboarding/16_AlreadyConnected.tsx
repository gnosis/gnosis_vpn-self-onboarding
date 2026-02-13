import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

interface AlreadyConnectedProps {
  className?: string;
}

export default function AlreadyConnected({ className }: AlreadyConnectedProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  const NEED_HELP_LABEL = "I need help";
  const DISCONNECTED_LABEL = "Disconnected";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("16_AlreadyConnected", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`AlreadyConnected${className ? ` ${className}` : ""}`}
      onboardingStep={16}
      title="Good to know!"
      text={
        <Typography
          variant="body1"
          sx={{
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: "#333",
          }}
        >
          No problem! Just disconnect for now
        </Typography>
      }
      buttons={
        onboardingStep === 16 ? (
          <>
            <Button label={NEED_HELP_LABEL} onClick={() => handleAnswer(NEED_HELP_LABEL, 16)} />
            <Button label={DISCONNECTED_LABEL} onClick={() => handleAnswer(DISCONNECTED_LABEL, 15)} />
          </>
        ) : null
      }
    />
  );
}
