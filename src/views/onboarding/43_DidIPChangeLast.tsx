import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

const STEP = 43;

interface DidIPChangeLastProps {
  className?: string;
  lastEntry?: boolean;}

export default function DidIPChangeLast({ className, lastEntry }: DidIPChangeLastProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);

  const WRONG_LABEL = "Something went wrong";
  const SAME_LABEL = "It's the same as last time";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("43_DidIPChangeLast", answer);
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
          No problem! Thanks for testing Gnosis VPN with us today. The next few steps will ask you some questions about your experience and show you a summary of what happened.
        </Typography>
      }
      buttons={
        lastEntry ? (
          <>
            <Button label={WRONG_LABEL} onClick={() => handleAnswer(WRONG_LABEL, STEP + 0.25)} />
            <Button label={SAME_LABEL} onClick={() => handleAnswer(SAME_LABEL, STEP + 1)} />
          </>
        ) : null
      }
    />
  );
}
