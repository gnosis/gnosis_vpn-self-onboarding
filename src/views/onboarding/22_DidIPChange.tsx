import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

interface DidIPChangeProps {
  className?: string;
}

export default function DidIPChange({ className }: DidIPChangeProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  return (
    <Step
      className={`DidIPChange${className ? ` ${className}` : ""}`}
      onboardingStep={22}
      title="Did the IP change"
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
        onboardingStep === 22 ? (
          <>
            <Button label="No it's the same" onClick={() => setOnboardingStep(23)} />
            <Button label="Yes!" onClick={() => setOnboardingStep(24)} />
          </>
        ) : null
      }
    />
  );
}
