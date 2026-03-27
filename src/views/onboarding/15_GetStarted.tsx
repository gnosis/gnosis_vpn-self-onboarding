import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

const STEP = 15;

interface GetStartedProps {
  className?: string;
  lastEntry?: boolean;}

export default function GetStarted({ className, lastEntry }: GetStartedProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const exitNodeIteration = useAppStore((state) => state.exitNodeIteration);

  const NEED_HELP_LABEL = "I need some help";
  const THERE_LABEL = "I'M AT THE FUNDING STEP";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer(`15_GetStarted_${exitNodeIteration}`, answer);
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
          Perfect! <strong>Click "Get Started" in the app</strong> and then follow the in-app instructions. Come back here when you reach the funding step.
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
