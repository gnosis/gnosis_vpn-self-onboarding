import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

const STEP = 100;

interface ThankYouProps {
  className?: string;
  lastEntry?: boolean;
}

export default function ThankYou({ className, lastEntry }: ThankYouProps) {
  const resetStore = useAppStore((state) => state.resetStore);

  return (
    <Step
      className={`ThankYou${className ? ` ${className}` : ""}`}
      onboardingStep={STEP}
      title="You made it to the end!"
      text={
        <Typography
          variant="body1"
          sx={{
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: "#333",
          }}
        >
          Thank you for completing the onboarding and helping test this release. Your time and feedback help us improve the VPN and make it better for everyone.
        </Typography>
      }
      buttons={
        lastEntry ? (
          <Button label="Close" onClick={resetStore} />
        ) : null
      }
    />
  );
}
