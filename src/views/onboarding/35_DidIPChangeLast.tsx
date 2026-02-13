import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

interface DidIPChangeLastProps {
  className?: string;
}

export default function DidIPChangeLast({ className }: DidIPChangeLastProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  return (
    <Step
      className={`DidIPChangeLast${className ? ` ${className}` : ""}`}
      onboardingStep={35}
      title="Did the IP change?"
      text={
        <Typography
          variant="body1"
          sx={{
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: "#333",
          }}
        >
          Did the IP change?
        </Typography>
      }
      buttons={
        onboardingStep === 35 ? (
          <>
            <Button label="Something went wrong" onClick={() => setOnboardingStep(36)} />
            <Button label="It's the same as last time" onClick={() => setOnboardingStep(36)} />
          </>
        ) : null
      }
    />
  );
}
