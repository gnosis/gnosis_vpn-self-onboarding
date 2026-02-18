import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";
import FeedbackSection from "../../components/FeedbackSection";

const STEP = 37;

interface TellChatAppProps {
  className?: string;
  lastEntry?: boolean;}

export default function TellChatApp({ className, lastEntry }: TellChatAppProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);

  const CONTINUE_LABEL = "Continue";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("37_TellChatApp", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`TellChatApp${className ? ` ${className}` : ""}`}
      onboardingStep={STEP}
      title="Tell Us Your Chat App"
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
            I don't need to see what you're doing, but it would be great to know which app you're using, in case there are bugs related to specific apps. Just write the app name below.
          </Typography>

          <FeedbackSection stepKey="37_TellChatApp" />
        </>
      }
      buttons={
        lastEntry ? (
          <>
            <Button label={CONTINUE_LABEL} onClick={() => handleAnswer(CONTINUE_LABEL, STEP +1)} />
          </>
        ) : null
      }
    />
  );
}
