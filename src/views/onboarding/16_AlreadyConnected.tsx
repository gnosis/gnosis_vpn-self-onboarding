import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

const STEP = 16;

interface AlreadyConnectedProps {
  className?: string;
  lastEntry?: boolean;
}

export default function AlreadyConnected({ className, lastEntry }: AlreadyConnectedProps) {
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
      onboardingStep={STEP}
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
        onboardingStep === STEP && lastEntry ? (
          <>
            <Button label={NEED_HELP_LABEL} onClick={() => handleAnswer(NEED_HELP_LABEL, STEP)} />
            <Button label={DISCONNECTED_LABEL} onClick={() => handleAnswer(DISCONNECTED_LABEL, STEP - 1)} />
          </>
        ) : null
      }
    />
  );
}
