import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";
import FeedbackSection from "../../components/FeedbackSection";

const STEP = 21;

interface SyncingFeedbackProps {
  className?: string;
}

export default function SyncingFeedback({ className }: SyncingFeedbackProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  const CONTINUE_LABEL = "Continue";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("21_SyncingFeedback", answer);
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
          <FeedbackSection stepKey="21_SyncingFeedback" />
        </>
      }
      buttons={
        onboardingStep === STEP ? (
          <>
            <Button label={CONTINUE_LABEL} onClick={() => handleAnswer(CONTINUE_LABEL, STEP + 1)} />
          </>
        ) : null
      }
    />
  );
}
