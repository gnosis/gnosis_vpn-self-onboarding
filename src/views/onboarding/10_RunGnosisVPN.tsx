import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

interface RunGnosisVPNProps {
  className?: string;
}

export default function RunGnosisVPN({ className }: RunGnosisVPNProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  return (
    <Step
      className={`RunGnosisVPN${className ? ` ${className}` : ""}`}
      onboardingStep={10}
      title="Run Gnosis VPN"
      text={
        <Typography
          variant="body1"
          sx={{
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: "#333",
          }}
        >
          Amazing! Now we're ready to run the Gnosis VPN app and begin our journey properly
        </Typography>
      }
      buttons={
        onboardingStep === 10 ? (
          <>
            <Button label="I need some help" onClick={() => console.log("User needs help")} />
            <Button label="It's running" onClick={() => setOnboardingStep(11)} />
          </>
        ) : null
      }
    />
  );
}
