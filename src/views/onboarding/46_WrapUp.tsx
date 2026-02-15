import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

const STEP = 46;

interface WrapUpProps {
  className?: string;
}

export default function WrapUp({ className }: WrapUpProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  const CONTINUE_LABEL = "Continue";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("46_WrapUp", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`WrapUp${className ? ` ${className}` : ""}`}
      onboardingStep={STEP}
      title="Wrap up"
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
        onboardingStep === STEP ? (
          <>
            <Button label={CONTINUE_LABEL} onClick={() => handleAnswer(CONTINUE_LABEL, STEP)} />
          </>
        ) : null
      }
    />
  );
}
