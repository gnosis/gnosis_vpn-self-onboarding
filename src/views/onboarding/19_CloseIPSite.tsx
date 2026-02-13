import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

interface CloseIPSiteProps {
  className?: string;
}

export default function CloseIPSite({ className }: CloseIPSiteProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  const NEED_HELP_LABEL = "I need help";
  const DONE_LABEL = "Done";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("19_CloseIPSite", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`CloseIPSite${className ? ` ${className}` : ""}`}
      onboardingStep={20}
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
        onboardingStep === 20 ? (
          <>
            <Button label={NEED_HELP_LABEL} onClick={() => handleAnswer(NEED_HELP_LABEL, 20)} />
            <Button label={DONE_LABEL} onClick={() => handleAnswer(DONE_LABEL, 21)} />
          </>
        ) : null
      }
    />
  );
}
