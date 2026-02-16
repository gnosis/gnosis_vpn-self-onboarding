import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

const STEP = 34;

interface IPChangeResponseVideohelpProps {
  className?: string;
}

export default function IPChangeResponseVideohelp({ className }: IPChangeResponseVideohelpProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  const STILL_NOT_WORKING = "It's still not working";
  const WORKING_NOW = "It's working now";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("34_IPChangeResponse_videohelp", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`IPChangeResponseVideohelp${className ? ` ${className}` : ""}`}
      onboardingStep={STEP}
      title="Video support"
      text={
        <Typography
          variant="body1"
          sx={{
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: "#333",
          }}
        >
          Did your IP change?
        </Typography>
      }
      buttons={
        onboardingStep === STEP ? (
          <>
            <Button label={STILL_NOT_WORKING} onClick={() => handleAnswer(STILL_NOT_WORKING, STEP + 0.25)} />
            <Button label={WORKING_NOW} onClick={() => handleAnswer(WORKING_NOW, STEP + 1)} />
          </>
        ) : null
      }
    />
  );
}
