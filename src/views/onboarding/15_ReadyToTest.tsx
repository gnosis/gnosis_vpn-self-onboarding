import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

interface ReadyToTestProps {
  className?: string;
}

export default function ReadyToTest({ className }: ReadyToTestProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  return (
    <Step
      className={`ReadyToTest${className ? ` ${className}` : ""}`}
      onboardingStep={15}
      title="Ready to test"
      text={
        <Typography
          variant="body1"
          sx={{
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: "#333",
          }}
        >
          We're ready to test! But please don't connect the VPN yet
        </Typography>
      }
      buttons={
        onboardingStep === 15 ? (
          <>
            <Button label="I already did" onClick={() => setOnboardingStep(16)} />
            <Button label="Okay" onClick={() => setOnboardingStep(17)} />
          </>
        ) : null
      }
    />
  );
}
