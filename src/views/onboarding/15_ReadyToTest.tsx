import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

interface ReadyToTestProps {
  className?: string;
}

export default function ReadyToTest({ className }: ReadyToTestProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  const ALREADY_DID_LABEL = "I already did";
  const OKAY_LABEL = "Okay";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("15_ReadyToTest", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`ReadyToTest${className ? ` ${className}` : ""}`}
      onboardingStep={15}
      title="Ready to test"
      text={
        <Typography
          variant="body1"
          sx={{
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: "#333",
          }}
        >
          We're ready to test! But please don't connect the VPN yet
        </Typography>
      }
      buttons={
        onboardingStep === 15 ? (
          <>
            <Button label={ALREADY_DID_LABEL} onClick={() => handleAnswer(ALREADY_DID_LABEL, 17)} />
            <Button label={OKAY_LABEL} onClick={() => handleAnswer(OKAY_LABEL, 17)} />
          </>
        ) : null
      }
    />
  );
}
