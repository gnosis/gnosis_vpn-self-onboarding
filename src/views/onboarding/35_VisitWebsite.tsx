import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

const STEP = 35;

interface VisitWebsiteProps {
  className?: string;
}

export default function VisitWebsite({ className }: VisitWebsiteProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  const NEED_HELP_LABEL = "I need help";
  const WORKED_LABEL = "It's worked";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("35_VisitWebsite", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`VisitWebsite${className ? ` ${className}` : ""}`}
      onboardingStep={STEP}
      title="Visit website"
      text={
        <Typography
          variant="body1"
          sx={{
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: "#333",
          }}
        >
          Let's take it for a spin. Visit the Gnosis VPN site
        </Typography>
      }
      buttons={
        onboardingStep === STEP ? (
          <>
            <Button label={NEED_HELP_LABEL} onClick={() => handleAnswer(NEED_HELP_LABEL, STEP)} />
            <Button label={WORKED_LABEL} onClick={() => handleAnswer(WORKED_LABEL, STEP + 1)} />
          </>
        ) : null
      }
    />
  );
}
