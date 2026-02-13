import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

interface TellChatAppProps {
  className?: string;
}

export default function TellChatApp({ className }: TellChatAppProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  const CONTINUE_LABEL = "Continue";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("31_TellChatApp", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`TellChatApp${className ? ` ${className}` : ""}`}
      onboardingStep={31}
      title="Tell Us Your Chat App"
      text={
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
      }
      buttons={
        onboardingStep === 31 ? (
          <Button label={CONTINUE_LABEL} onClick={() => handleAnswer(CONTINUE_LABEL, 32)} />
        ) : null
      }
    />
  );
}
