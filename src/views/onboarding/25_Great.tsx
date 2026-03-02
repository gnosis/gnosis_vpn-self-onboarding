import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

const STEP = 25;

interface GreatProps {
  className?: string;
  lastEntry?: boolean;}

export default function Great({ className, lastEntry }: GreatProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);

  const CONTINUE_LABEL = "Continue";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("25_Great", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`ReadyTimeout${className ? ` ${className}` : ""}`}
      onboardingStep={STEP}
      title="Great!"
      text={
        <Typography
          variant="body1"
          sx={{
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: "#333",
          }}
        >
          Now we wait for initialization to complete.
        </Typography>
      }
      buttons={
        lastEntry ? (
          <>
            <Button label={CONTINUE_LABEL} onClick={() => handleAnswer(CONTINUE_LABEL, STEP + 1)} />
          </>
        ) : null
      }
    />
  );
}
