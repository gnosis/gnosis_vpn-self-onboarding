import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

interface SyncingProps {
  className?: string;
}

export default function Syncing({ className }: SyncingProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  return (
    <Step
      className={`Syncing${className ? ` ${className}` : ""}`}
      onboardingStep={13}
      title="Syncing"
      text={
        <>
          <Typography
            variant="body1"
            sx={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#333",
            }}
          >
            Next we need to wait for the node to sync. It would be great if you could note the time this process started.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#333",
            }}
          >
            Let me know when it's synced!
          </Typography>
        </>
      }
      buttons={
        onboardingStep === 13 ? (
          <>
            <Button label="I need some help" onClick={() => console.log("User needs help")} />
            <Button label="It's synced" onClick={() => setOnboardingStep(14)} />
          </>
        ) : null
      }
    />
  );
}
