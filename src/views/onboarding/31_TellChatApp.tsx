import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

interface TellChatAppProps {
  className?: string;
}

export default function TellChatApp({ className }: TellChatAppProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  return (
    <Step
      className={`TellChatApp${className ? ` ${className}` : ""}`}
      onboardingStep={31}
      title="Tell Us Your Chat App"
      text={
        <Typography
          variant="body1"
          sx={{
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: "#333",
          }}
        >
          I don't need to see what you're doing, but it would be great to know which app you're using, in case there are bugs related to specific apps. Just write the app name below.
        </Typography>
      }
      buttons={
        onboardingStep === 31 ? (
          <Button label="Continue" onClick={() => setOnboardingStep(32)} />
        ) : null
      }
    />
  );
}
