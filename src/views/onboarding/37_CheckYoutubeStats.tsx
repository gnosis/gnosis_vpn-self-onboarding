import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

const STEP = 37;

interface CheckYoutubeStatsProps {
  className?: string;
}

export default function CheckYoutubeStats({ className }: CheckYoutubeStatsProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  const NEED_HELP_LABEL = "I need help";
  const DONE_LABEL = "That's done";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("37_CheckYoutubeStats", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`CheckYoutubeStats${className ? ` ${className}` : ""}`}
      onboardingStep={STEP}
      title="Check YouTube Stats"
      text={
        <Typography
          variant="body1"
          sx={{
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: "#333",
          }}
        >
          Let's check the video stats
        </Typography>
      }
      buttons={
        onboardingStep === STEP ? (
          <>
            <Button label={NEED_HELP_LABEL} onClick={() => handleAnswer(NEED_HELP_LABEL, STEP)} />
            <Button label={DONE_LABEL} onClick={() => handleAnswer(DONE_LABEL, STEP + 1)} />
          </>
        ) : null
      }
    />
  );
}
