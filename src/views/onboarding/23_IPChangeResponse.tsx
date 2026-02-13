import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

interface IPChangeResponseProps {
  className?: string;
}

export default function IPChangeResponse({ className }: IPChangeResponseProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  return (
    <Step
      className={`IPChangeResponse${className ? ` ${className}` : ""}`}
      onboardingStep={23}
      title="Response"
      text={
        <Typography
          variant="body1"
          sx={{
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: "#333",
          }}
        >
          Great! Your private Gnosis VPN connection is working
        </Typography>
      }
      buttons={
        onboardingStep === 23 ? (
          <Button label="Continue" onClick={() => setOnboardingStep(25)} />
        ) : null
      }
    />
  );
}
