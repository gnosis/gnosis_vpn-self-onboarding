import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

const STEP = 26;

interface ChooseExitNodeProps {
  className?: string;
  lastEntry?: boolean;}

export default function ChooseExitNode({ className, lastEntry }: ChooseExitNodeProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const isSameDevice = useAppStore((state) => state.isSameDevice);

  const NEED_HELP_LABEL = "I need some help";
  const DONE_LABEL = "That's done";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("26_ChooseExitNode", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`ChooseExitNode${className ? ` ${className}` : ""}`}
      onboardingStep={STEP}
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
        lastEntry ? (
          <>
            <Button label={NEED_HELP_LABEL} onClick={() => handleAnswer(NEED_HELP_LABEL, STEP + 1)} />
            <Button label={DONE_LABEL} onClick={() => handleAnswer(DONE_LABEL, isSameDevice ? STEP + 5 : STEP + 2)} />
          </>
        ) : null
      }
    />
  );
}
