import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

interface ChooseExitNodeProps {
  className?: string;
}

export default function ChooseExitNode({ className }: ChooseExitNodeProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  const NEED_HELP_LABEL = "I need help";
  const DONE_LABEL = "That's done";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("19_ChooseExitNode", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`ChooseExitNode${className ? ` ${className}` : ""}`}
      onboardingStep={20}
      title="Choose an exit node"
      text={
        <Typography
          variant="body1"
          sx={{
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: "#333",
          }}
        >
          Next, choose and exit node and connect the VPN
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
