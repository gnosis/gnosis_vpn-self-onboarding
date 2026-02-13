import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

interface WrapUpProps {
  className?: string;
}

export default function WrapUp({ className }: WrapUpProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  return (
    <Step
      className={`WrapUp${className ? ` ${className}` : ""}`}
      onboardingStep={37}
      title="Wrap up"
      text={
        <Typography
          variant="body1"
          sx={{
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: "#333",
          }}
        >
          No problem! Thanks for testing Gnosis VPN with us today. The next few steps will ask you some questions about your experience and show you a summary of what happened.
        </Typography>
      }
      buttons={
        onboardingStep === 37 ? (
          <Button label="Continue" onClick={() => setOnboardingStep(38)} />
        ) : null
      }
    />
  );
}
