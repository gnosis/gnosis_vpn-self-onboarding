import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

const STEP = 23;

interface DidIPChangeProps {
  className?: string;
}

export default function DidIPChange({ className }: DidIPChangeProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  const NO_CHANGE_LABEL = "No it's the same";
  const YES_LABEL = "Yes!";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("23_DidIPChange", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`DidIPChange${className ? ` ${className}` : ""}`}
      onboardingStep={STEP}
      title="Did the IP change"
      text={
        <Typography
          variant="body1"
          sx={{
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: "#333",
          }}
        >
          Did your IP change?
        </Typography>
      }
      buttons={
        onboardingStep === STEP ? (
          <>
            <Button label={NO_CHANGE_LABEL} onClick={() => handleAnswer(NO_CHANGE_LABEL, STEP + 3)} />
            <Button label={YES_LABEL} onClick={() => handleAnswer(YES_LABEL, STEP + 2)} />
          </>
        ) : null
      }
    />
  );
}
