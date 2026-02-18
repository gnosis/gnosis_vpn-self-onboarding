import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

const STEP = 38;

interface UseChatAppProps {
  className?: string;
  lastEntry?: boolean;}

export default function UseChatApp({ className, lastEntry }: UseChatAppProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);

  const NEED_HELP_LABEL = "I need help";
  const DONE_LABEL = "I've done that";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("38_UseChatApp", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`UseChatApp${className ? ` ${className}` : ""}`}
      onboardingStep={STEP}
      title="Use your Chat App"
      text={
        <Typography
          variant="body1"
          sx={{
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: "#333",
          }}
        >
          Now just use your chat app normally for a bit
        </Typography>
      }
      buttons={
        lastEntry ? (
          <>
            <Button label={NEED_HELP_LABEL} onClick={() => handleAnswer(NEED_HELP_LABEL, STEP + 0.25)} />
            <Button label={DONE_LABEL} onClick={() => handleAnswer(DONE_LABEL, STEP + 1)} />
          </>
        ) : null
      }
    />
  );
}
