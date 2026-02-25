import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";
import FeedbackSection from "../../components/FeedbackSection";

const STEP = 40;

interface AppFeedbackProps {
  className?: string;
  lastEntry?: boolean;}

export default function AppFeedback({ className, lastEntry }: AppFeedbackProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const sameDevice = useAppStore((state) => state.isSameDevice);

  const CONTINUE_LABEL = "Continue";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("40_AppFeedback", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`AppFeedback${className ? ` ${className}` : ""}`}
      onboardingStep={STEP}
      title="App feedback"
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
            Great! Did it work well? Did you notice any issues?
          </Typography>

          <FeedbackSection stepKey="40_AppFeedback" />
        </>
      }
      buttons={
        lastEntry ? (
          <>
            <Button label={CONTINUE_LABEL} onClick={() => handleAnswer(CONTINUE_LABEL, sameDevice ? STEP + 3 : STEP + 1)} />
          </>
        ) : null
      }
    />
  );
}
