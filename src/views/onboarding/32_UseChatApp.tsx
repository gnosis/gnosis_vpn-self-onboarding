import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

interface UseChatAppProps {
  className?: string;
}

export default function UseChatApp({ className }: UseChatAppProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  return (
    <Step
      className={`UseChatApp${className ? ` ${className}` : ""}`}
      onboardingStep={32}
      title="Use your Chat App"
      text={
        <Typography
          variant="body1"
          sx={{
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: "#333",
          }}
        >
          Now just use your chat app normally for a bit
        </Typography>
      }
      buttons={
        onboardingStep === 32 ? (
          <>
            <Button label="I need help" onClick={() => console.log("User needs help")} />
            <Button label="I've done that" onClick={() => setOnboardingStep(33)} />
          </>
        ) : null
      }
    />
  );
}
