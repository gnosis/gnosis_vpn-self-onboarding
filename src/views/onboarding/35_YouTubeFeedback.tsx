import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";
import FeedbackSection from "../../components/FeedbackSection";

const STEP = 35;

interface YouTubeFeedbackProps {
  className?: string;
  lastEntry?: boolean;}

export default function YouTubeFeedback({ className, lastEntry }: YouTubeFeedbackProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const selectedDevice = useAppStore((state) => state.onboardingAnswers["4_SwitchingDevices"]);
  const sameDevice = selectedDevice === "same device";

  const CONTINUE_LABEL = "That's done";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("35_YouTubeFeedback", answer);
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
          
          <FeedbackSection stepKey="35_YouTubeFeedback" />
        </>
      }
      buttons={
        lastEntry ? (
          <>
            <Button label={CONTINUE_LABEL} onClick={() => handleAnswer(CONTINUE_LABEL, sameDevice ? STEP + 2 : STEP + 1)} />
          </>
        ) : null
      }
    />
  );
}
