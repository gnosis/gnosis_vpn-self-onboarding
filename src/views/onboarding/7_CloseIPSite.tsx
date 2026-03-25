import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

const STEP = 7;

interface CloseIPSiteProps {
  className?: string;
  lastEntry?: boolean;}

export default function CloseIPSite({ className, lastEntry }: CloseIPSiteProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const exitNodeIteration = useAppStore((state) => state.exitNodeIteration);

  const NEED_HELP_LABEL = "I need help";
  const DONE_LABEL = "Done";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer(`7_CloseIPSite_${exitNodeIteration}`, answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`CloseIPSite${className ? ` ${className}` : ""}`}
      onboardingStep={STEP}
      title="Close IP site"
      text={
        <Typography
          variant="body1"
          sx={{
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: "#333",
          }}
        >
          Wonderful. We'll be referring back to that throughout this process. Close the IP address finder for now.
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
