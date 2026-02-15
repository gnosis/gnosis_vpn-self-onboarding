import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

const STEP = 19;

interface SyncingProps {
  className?: string;
}

export default function Syncing({ className }: SyncingProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  const NEED_HELP_LABEL = "I need some help";
  const SYNCED_LABEL = "It's synced";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("19_Syncing", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`Syncing${className ? ` ${className}` : ""}`}
      onboardingStep={STEP}
      title="Syncing"
      text={
        <>
          <Typography
            variant="body1"
            sx={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#333",
            }}
          >
            Next we need to wait for the node to sync. It would be great if you could note the time this process started.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#333",
            }}
          >
            Let me know when it's synced!
          </Typography>
        </>
      }
      buttons={
        onboardingStep === STEP ? (
          <>
            <Button label={NEED_HELP_LABEL} onClick={() => handleAnswer(NEED_HELP_LABEL, STEP + 1)} />
            <Button label={SYNCED_LABEL} onClick={() => handleAnswer(SYNCED_LABEL, STEP + 2)} />
          </>
        ) : null
      }
    />
  );
}
