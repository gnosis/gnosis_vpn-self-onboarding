import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

interface CheckYoutubeStatsProps {
  className?: string;
}

export default function CheckYoutubeStats({ className }: CheckYoutubeStatsProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  return (
    <Step
      className={`CheckYoutubeStats${className ? ` ${className}` : ""}`}
      onboardingStep={28}
      title="Check YouTube Stats"
      text={
        <Typography
          variant="body1"
          sx={{
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: "#333",
          }}
        >
          Let's check the video stats
        </Typography>
      }
      buttons={
        onboardingStep === 28 ? (
          <>
            <Button label="I need help" onClick={() => console.log("User needs help")} />
            <Button label="That's done" onClick={() => setOnboardingStep(29)} />
          </>
        ) : null
      }
    />
  );
}
