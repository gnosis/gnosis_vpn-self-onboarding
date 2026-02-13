import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

interface UseChatAppProps {
  className?: string;
}

export default function UseChatApp({ className }: UseChatAppProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  const NEED_HELP_LABEL = "I need help";
  const DONE_LABEL = "I've done that";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("32_UseChatApp", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`UseChatApp${className ? ` ${className}` : ""}`}
      onboardingStep={32}
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
        onboardingStep === 32 ? (
          <>
            <Button label={NEED_HELP_LABEL} onClick={() => handleAnswer(NEED_HELP_LABEL, 32)} />
            <Button label={DONE_LABEL} onClick={() => handleAnswer(DONE_LABEL, 33)} />
          </>
        ) : null
      }
    />
  );
}
