import { Box } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

const STEP = 20;

interface SyncingVideohelpProps {
  className?: string;
  lastEntry?: boolean;
}

export default function SyncingVideohelp({ className, lastEntry }: SyncingVideohelpProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  const I_NEED_MORE_HELP = "I need more help";
  const THANKS_LABEL = "Thanks, continue";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("20_Syncing_videohelp", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`SyncingVideohelp${className ? ` ${className}` : ""}`}
      onboardingStep={STEP}
      title="Video support"
      text={
        <Box
          sx={{
            width: "100%",
            maxWidth: "500px",
            aspectRatio: "16 / 9",
            backgroundColor: "#f0f0f0",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.2rem",
            color: "#999",
            fontWeight: 500,
          }}
        >
          Video Placeholder
        </Box>
      }
      buttons={
        onboardingStep === STEP && lastEntry
          ? (
            <>
              <Button label={I_NEED_MORE_HELP} disabled />
              <Button label={THANKS_LABEL} onClick={() => handleAnswer(THANKS_LABEL, STEP + 1)} />
            </>
          )
          : null
      }
    />
  );
}
