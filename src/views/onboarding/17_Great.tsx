import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

const STEP = 17;

interface GreatProps {
  className?: string;
}

export default function Great({ className }: GreatProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  const CONTINUE_LABEL = "Continue";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("17_Great", answer);
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
          
        </Typography>
      }
      buttons={
        onboardingStep === STEP ? (
          <>
            <Button label={CONTINUE_LABEL} onClick={() => handleAnswer(CONTINUE_LABEL, STEP + 1)} />
          </>
        ) : null
      }
    />
  );
}
