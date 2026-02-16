import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

const STEP = 30;

const LOCATIONS = ["USA", "UK", "Brazil", "India", "Australia", "South Korea"];

interface TellChoiceProps {
  className?: string;
}

export default function TellChoice({ className }: TellChoiceProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const onboardingStep = useAppStore((state) => state.onboardingStep);

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("30_TellChoice", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`TellChoice${className ? ` ${className}` : ""}`}
      onboardingStep={STEP}
      title="Tell us choice"
      text={
        <Typography
          variant="body1"
          sx={{
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: "#333",
          }}
        >
          Which one did you choose?
        </Typography>
      }
      buttons={
        onboardingStep === STEP ? (
          <>
            {LOCATIONS.map((location) => (
              <Button
                key={location}
                label={location}
                onClick={() => handleAnswer(location, STEP + 1)}
              />
            ))}
          </>
        ) : null
      }
    />
  );
}
