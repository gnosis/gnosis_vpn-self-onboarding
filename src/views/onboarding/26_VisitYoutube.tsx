import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

interface VisitYoutubeProps {
  className?: string;
}

export default function VisitYoutube({ className }: VisitYoutubeProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  return (
    <Step
      className={`VisitYoutube${className ? ` ${className}` : ""}`}
      onboardingStep={26}
      title="Visit YouTube"
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
            Now let's try something more advanced. Go to YouTube and watch a video. Let's watch for at least a minute: really put the VPN to the test!
          </Typography>
        </>
      }
      buttons={
        onboardingStep === 26 ? (
          <>
            <Button label="I need help" onClick={() => console.log("User needs help")} />
            <Button label="It's worked" onClick={() => setOnboardingStep(27)} />
          </>
        ) : null
      }
    />
  );
}
