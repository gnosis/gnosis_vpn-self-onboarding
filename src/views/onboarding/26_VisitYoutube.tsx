import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

interface VisitYoutubeProps {
  className?: string;
}

export default function VisitYoutube({ className }: VisitYoutubeProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  const NEED_HELP_LABEL = "I need help";
  const WORKED_LABEL = "It's worked";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("26_VisitYoutube", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`VisitYoutube${className ? ` ${className}` : ""}`}
      onboardingStep={27}
      title="Visit YouTube"
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
            Now let's try something more advanced. Go to YouTube and watch a video. Let's watch for at least a minute: really put the VPN to the test!
          </Typography>
        </>
      }
      buttons={
        onboardingStep === 27 ? (
          <>
            <Button label={NEED_HELP_LABEL} onClick={() => handleAnswer(NEED_HELP_LABEL, 27)} />
            <Button label={WORKED_LABEL} onClick={() => handleAnswer(WORKED_LABEL, 28)} />
          </>
        ) : null
      }
    />
  );
}
