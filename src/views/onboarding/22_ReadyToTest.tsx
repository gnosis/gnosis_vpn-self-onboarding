import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

const STEP = 22;

interface ReadyToTestProps {
  className?: string;
  lastEntry?: boolean;
}

export default function ReadyToTest({ className, lastEntry }: ReadyToTestProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);

  const ALREADY_DID_LABEL = "I already did";
  const OKAY_LABEL = "I'm waiting";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("22_ReadyToTest", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`ReadyToTest${className ? ` ${className}` : ""}`}
      onboardingStep={STEP}
      title="Your VPN is installed and funded"
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
            It’s now opening channels and completing final background steps. So please don’t connect the VPN yet.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#333",
              marginTop: "1rem",
            }}
          >
            This is an MVP release, so you may notice minor limitations or rough edges. That’s expected, and your feedback helps us improve.
          </Typography>
        </>
      }
      buttons={
        lastEntry
        ? (
          <>
            <Button label={ALREADY_DID_LABEL} onClick={() => handleAnswer(ALREADY_DID_LABEL, STEP + 1)} />
            <Button label={OKAY_LABEL} onClick={() => handleAnswer(OKAY_LABEL, STEP + 3)} />
          </>
        ) : null
      }
    />
  );
}
