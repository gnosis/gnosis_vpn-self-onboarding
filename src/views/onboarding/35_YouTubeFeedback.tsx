import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";
import FeedbackSection from "../../components/FeedbackSection";

const STEP = 35;

interface YouTubeFeedbackProps {
  className?: string;
  lastEntry?: boolean;
  exitNodeIteration?: number;
}

export default function YouTubeFeedback({ className, lastEntry, exitNodeIteration }: YouTubeFeedbackProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const sameDevice = useAppStore((state) => state.isSameDevice);
  const anonymous = useAppStore((state) => state.anonymous);

  const CONTINUE_LABEL = "That's done";

  const STEP_KEY = `35_YouTubeFeedback_${exitNodeIteration}`;

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer(STEP_KEY, answer);
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
            Using a VPN will naturally introduce some latency, but we want to provide as normal a browsing experience as possible.
          </Typography>
          
          <FeedbackSection stepKey={STEP_KEY} />
        </>
      }
      buttons={
        lastEntry ? (
          <>
            <Button label={CONTINUE_LABEL} onClick={() => handleAnswer(CONTINUE_LABEL, sameDevice || anonymous ? STEP + 2 : STEP + 1)} />
          </>
        ) : null
      }
    />
  );
}
