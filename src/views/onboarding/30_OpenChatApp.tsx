import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

interface OpenChatAppProps {
  className?: string;
}

export default function OpenChatApp({ className }: OpenChatAppProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  const NEED_HELP_LABEL = "I need help";
  const DONE_LABEL = "I've done that";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("30_OpenChatApp", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`OpenChatApp${className ? ` ${className}` : ""}`}
      onboardingStep={30}
      title="Open your Chat App"
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
            Now let's try something else.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#333",
            }}
          >
            Not everything we do online uses the same method to send data, but we need to support them all!
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#333",
            }}
          >
            Please open a Chat app, one that isn't in your browser.
          </Typography>
        </>
      }
      buttons={
        onboardingStep === 30 ? (
          <>
            <Button label={NEED_HELP_LABEL} onClick={() => handleAnswer(NEED_HELP_LABEL, 30)} />
            <Button label={DONE_LABEL} onClick={() => handleAnswer(DONE_LABEL, 31)} />
          </>
        ) : null
      }
    />
  );
}
