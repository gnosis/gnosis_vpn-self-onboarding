import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

interface TryDifferentExitNodeProps {
  className?: string;
}

export default function TryDifferentExitNode({ className }: TryDifferentExitNodeProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  const WRAP_UP_LABEL = "Let's wrap up";
  const TRY_AGAIN_LABEL = "Let's do that";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("37_TryDifferentExitNode", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`TryDifferentExitNode${className ? ` ${className}` : ""}`}
      onboardingStep={38}
      title="Try with a different exit node"
      text={
        <Typography
          variant="body1"
          sx={{
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: "#333",
          }}
        >
          Amazing! If you'd like to keep testing, we can try again with a different exit node
        </Typography>
      }
      buttons={
        onboardingStep === 38 ? (
          <>
            <Button label={WRAP_UP_LABEL} onClick={() => handleAnswer(WRAP_UP_LABEL, 39)} />
            <Button label={TRY_AGAIN_LABEL} onClick={() => handleAnswer(TRY_AGAIN_LABEL, 38)} />
          </>
        ) : null
      }
    />
  );
}
