import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

const STEP = 43;

interface TryDifferentExitNodeProps {
  className?: string;
  lastEntry?: boolean;
}

export default function TryDifferentExitNode({ className, lastEntry }: TryDifferentExitNodeProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const onboardNewExitNode = useAppStore((state) => state.onboardNewExitNode);

  const WRAP_UP_LABEL = "Let's wrap up";
  const TRY_AGAIN_LABEL = "Let's do that";

  const handleTryAgain = () => {
    handleAnswer(TRY_AGAIN_LABEL, 28);
    onboardNewExitNode();
  };

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("43_TryDifferentExitNode", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`TryDifferentExitNode${className ? ` ${className}` : ""}`}
      onboardingStep={STEP}
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
          Amazing! If you'd like to keep testing, we can try again with a different exit node.
        </Typography>
      }
      buttons={
        lastEntry ? (
          <>
            <Button label={TRY_AGAIN_LABEL} onClick={handleTryAgain} />
            <Button
              style={{
                backgroundColor: "#b8b8b8",
              }}
              label={WRAP_UP_LABEL}
              onClick={() => handleAnswer(WRAP_UP_LABEL, STEP + 1)}
            />
          </>
        ) : null
      }
    />
  );
}
