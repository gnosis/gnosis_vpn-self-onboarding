import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

interface CloseIPSiteProps {
  className?: string;
}

export default function CloseIPSite({ className }: CloseIPSiteProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  return (
    <Step
      className={`CloseIPSite${className ? ` ${className}` : ""}`}
      onboardingStep={18}
      title="Close IP site"
      text={
        <Typography
          variant="body1"
          sx={{
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: "#333",
          }}
        >
          Wonderful. We'll be referring back to that throughout this process. Close the IP address finder for now.
        </Typography>
      }
      buttons={
        onboardingStep === 18 ? (
          <>
            <Button label="I need help" onClick={() => console.log("User needs help")} />
            <Button label="Done" onClick={() => setOnboardingStep(19)} />
          </>
        ) : null
      }
    />
  );
}
