import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

const STEP = 28;

interface YouTubeFeedbackProps {
  className?: string;
}

export default function YouTubeFeedback({ className }: YouTubeFeedbackProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  const CONTINUE_LABEL = "Continue";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("28_YouTubeFeedback", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`YouTubeFeedback${className ? ` ${className}` : ""}`}
      onboardingStep={STEP}
      title="YouTube feedback"
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
            Great! And how was the video and audio quality?
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#333",
            }}
          >
            Using a VPN will naturally introduce some latency, but we want to provide as normal a browsing experience as possible
          </Typography>
        </>
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
