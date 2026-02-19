import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

const STEP = 5;

interface SessionSummaryProps {
  className?: string;
  lastEntry?: boolean;}

export default function SessionSummary({ className, lastEntry }: SessionSummaryProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const selectedDevice = useAppStore((state) => state.onboardingAnswers["4_SwitchingDevices"]);
  const sameDevice = selectedDevice === "same device";

  const CONTINUE_LABEL = "Continue";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("5_SessionSummary", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`SessionSummary${className ? ` ${className}` : ""}`}
      onboardingStep={STEP}
      title="Session Summary"
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
            At the end of your session, you'll be shown a summary of what happened,
            including all the help buttons you used, feedback you wrote, and times you
            needed support. This summary also acts as a list of all the data you shared
            with us throughout your journey.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#333",
              fontWeight: 600,
            }}
          >
            Now let's get this journey started!
          </Typography>
        </>
      }
      buttons={
        lastEntry ? (
          <>
            <Button
              label={CONTINUE_LABEL}
              onClick={() => handleAnswer(CONTINUE_LABEL, sameDevice ? STEP + 3 : STEP + 1)}
            />
          </>
        ) : null
      }
    />
  );
}
