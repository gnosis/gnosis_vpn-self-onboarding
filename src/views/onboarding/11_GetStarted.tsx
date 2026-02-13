import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

interface GetStartedProps {
  className?: string;
}

export default function GetStarted({ className }: GetStartedProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  return (
    <Step
      className={`GetStarted${className ? ` ${className}` : ""}`}
      onboardingStep={11}
      title="Get Started"
      text={
        <Typography
          variant="body1"
          sx={{
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: "#333",
          }}
        >
          Perfect. Just follow the instructions in the app and let me know once you can see the funding screen
        </Typography>
      }
      buttons={
        onboardingStep === 11 ? (
          <>
            <Button label="I need some help" onClick={() => console.log("User needs help")} />
            <Button label="I'm there" onClick={() => setOnboardingStep(12)} />
          </>
        ) : null
      }
    />
  );
}
