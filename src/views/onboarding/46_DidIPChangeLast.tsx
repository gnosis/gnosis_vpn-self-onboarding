import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

const STEP = 46;

interface DidIPChangeLastProps {
  className?: string;
}

export default function DidIPChangeLast({ className }: DidIPChangeLastProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  const WRONG_LABEL = "Something went wrong";
  const SAME_LABEL = "It's the same as last time";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("46_DidIPChangeLast", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`DidIPChangeLast${className ? ` ${className}` : ""}`}
      onboardingStep={STEP}
      title="Did the IP change?"
      text={
        <Typography
          variant="body1"
          sx={{
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: "#333",
          }}
        >
          Did the IP change?
        </Typography>
      }
      buttons={
        onboardingStep === STEP ? (
          <>
            <Button label={WRONG_LABEL} onClick={() => handleAnswer(WRONG_LABEL, STEP + 2)} />
            <Button label={SAME_LABEL} onClick={() => handleAnswer(SAME_LABEL, STEP + 3)} />
          </>
        ) : null
      }
    />
  );
}
