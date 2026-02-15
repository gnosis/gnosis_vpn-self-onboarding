import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

const STEP = 10;

interface RunGnosisVPNProps {
  className?: string;
}

export default function RunGnosisVPN({ className }: RunGnosisVPNProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  const NEED_HELP_LABEL = "I need some help";
  const RUNNING_LABEL = "It's running";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("10_RunGnosisVPN", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`RunGnosisVPN${className ? ` ${className}` : ""}`}
      onboardingStep={STEP}
      title="Run Gnosis VPN"
      text={
        <Typography
          variant="body1"
          sx={{
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: "#333",
          }}
        >
          Amazing! Now we're ready to run the Gnosis VPN app and begin our journey properly
        </Typography>
      }
      buttons={
        onboardingStep === STEP ? (
          <>
            <Button label={NEED_HELP_LABEL} onClick={() => handleAnswer(NEED_HELP_LABEL, STEP)} />
            <Button label={RUNNING_LABEL} onClick={() => handleAnswer(RUNNING_LABEL, STEP + 1)} />
          </>
        ) : null
      }
    />
  );
}
