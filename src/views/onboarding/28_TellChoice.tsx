import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

const STEP = 28;

const LOCATIONS = ["USA", "UK", "Brazil", "India", "Australia", "South Korea"];

interface TellChoiceProps {
  className?: string;
  lastEntry?: boolean;}

export default function TellChoice({ className, lastEntry }: TellChoiceProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const sameDevice = useAppStore((state) => state.isSameDevice);

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("28_TellChoice", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`TellChoice${className ? ` ${className}` : ""}`}
      onboardingStep={STEP}
      title="Tell us choice"
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
            Which one did you choose?
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
            Now you can connect.
          </Typography>
        </>
      }
      buttons={
        lastEntry ? (
          <>
            {LOCATIONS.map((location) => (
              <Button
                key={location}
                label={location}
                onClick={() => handleAnswer(location, sameDevice ? STEP + 3 : STEP + 1)}
              />
            ))}
          </>
        ) : null
      }
    />
  );
}
