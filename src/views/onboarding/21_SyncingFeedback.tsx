import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";
import FeedbackSection from "../../components/FeedbackSection";

const STEP = 21;

interface SyncingFeedbackProps {
  className?: string;
  lastEntry?: boolean;}

export default function SyncingFeedback({ className, lastEntry }: SyncingFeedbackProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const currentExitNodeIteration = useAppStore((state) => state.exitNodeIteration);

  const CONTINUE_LABEL = "Continue";
  const STEP_KEY = `21_SyncingFeedback_${currentExitNodeIteration}`;

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer(STEP_KEY, answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`SyncingFeedback${className ? ` ${className}` : ""}`}
      onboardingStep={STEP}
      title="Syncing Feedback"
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
            Amazing! How long did that take?
          </Typography>
          <FeedbackSection stepKey={STEP_KEY} />
        </>
      }
      buttons={
        lastEntry ? (
          <>
            <Button label={CONTINUE_LABEL} onClick={() => handleAnswer(CONTINUE_LABEL, STEP + 5)} />
          </>
        ) : null
      }
    />
  );
}
