import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

const STEP = 25;

interface AlreadyConnectedProps {
  className?: string;
  lastEntry?: boolean;
}

export default function AlreadyConnected({ className, lastEntry }: AlreadyConnectedProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);

  const NEED_HELP_LABEL = "I need some help";
  const DISCONNECTED_LABEL = "I'm disconnected";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("25_AlreadyConnected", answer);
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
        lastEntry ? (
          <>
            <Button label={NEED_HELP_LABEL} onClick={() => handleAnswer(NEED_HELP_LABEL, STEP)} />
            <Button label={DISCONNECTED_LABEL} onClick={() => handleAnswer(DISCONNECTED_LABEL, STEP - 1)} />
          </>
        ) : null
      }
    />
  );
}
