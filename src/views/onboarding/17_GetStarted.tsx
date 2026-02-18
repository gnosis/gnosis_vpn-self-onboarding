import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

const STEP = 17;

interface GetStartedProps {
  className?: string;
  lastEntry?: boolean;}

export default function GetStarted({ className, lastEntry }: GetStartedProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);

  const NEED_HELP_LABEL = "I need some help";
  const THERE_LABEL = "I'm there";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("17_GetStarted", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`GetStarted${className ? ` ${className}` : ""}`}
      onboardingStep={STEP}
      title="Get Started"
      text={
        <Typography
          variant="body1"
          sx={{
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: "#333",
          }}
        >
          Perfect. Just follow the instructions in the app and let me know once you can see the funding screen
        </Typography>
      }
      buttons={
        lastEntry ? (
          <>
            <Button label={NEED_HELP_LABEL} onClick={() => handleAnswer(NEED_HELP_LABEL, STEP + 1)} />
            <Button label={THERE_LABEL} onClick={() => handleAnswer(THERE_LABEL, STEP + 2)} />
          </>
        ) : null
      }
    />
  );
}
