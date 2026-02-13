import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

interface VisitWebsiteProps {
  className?: string;
}

export default function VisitWebsite({ className }: VisitWebsiteProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  return (
    <Step
      className={`VisitWebsite${className ? ` ${className}` : ""}`}
      onboardingStep={25}
      title="Visit website"
      text={
        <Typography
          variant="body1"
          sx={{
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: "#333",
          }}
        >
          Let's take it for a spin. Visit the Gnosis VPN site
        </Typography>
      }
      buttons={
        onboardingStep === 25 ? (
          <>
            <Button label="I need help" onClick={() => console.log("User needs help")} />
            <Button label="It's worked" onClick={() => setOnboardingStep(26)} />
          </>
        ) : null
      }
    />
  );
}
