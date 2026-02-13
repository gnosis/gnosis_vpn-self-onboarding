import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

interface TryDifferentExitNodeProps {
  className?: string;
}

export default function TryDifferentExitNode({ className }: TryDifferentExitNodeProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  return (
    <Step
      className={`TryDifferentExitNode${className ? ` ${className}` : ""}`}
      onboardingStep={36}
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
        onboardingStep === 36 ? (
          <>
            <Button label="Let's wrap up" onClick={() => setOnboardingStep(37)} />
            <Button label="Let's do that" onClick={() => setOnboardingStep(19)} />
          </>
        ) : null
      }
    />
  );
}
