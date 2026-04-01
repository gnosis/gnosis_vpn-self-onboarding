import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

const STEP = 1;

interface WelcomeProps {
  className?: string;
  lastEntry?: boolean;}

export default function Welcome({ className, lastEntry }: WelcomeProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const username = useAppStore((state) => state.username);
  const exitNodeIteration = useAppStore((state) => state.exitNodeIteration);

  const START_ONBOARDING_LABEL = "Start onboarding";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer(`1_welcome_${exitNodeIteration}`, answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`Welcome${className ? ` ${className}` : ""}`}
      onboardingStep={STEP}
      title="Welcome to Gnosis VPN Onboarding"
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
            Welcome, {username || "datanaut"} to the Datanaut program. <br/>
            We’re on a mission to reduce how much data you leak online.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#333",
            }}
          >
            I’m Gino, your guide for this quest. I’ll walk you step-by-step through setting up and using Gnosis VPN.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#333",
            }}
          >
           To help us improve the experience, <strong>please follow each step in this guide in order.</strong> We’re testing clarity and flow, so skipping ahead can affect the results.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#333",
            }}
          >
            Everything stays stored locally until you choose to submit or end your session.
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
            Ready? Let’s begin.
          </Typography>
        </>
      }
      buttons={
        lastEntry ? (
          <>
            <Button
              label={START_ONBOARDING_LABEL}
              onClick={() => handleAnswer(START_ONBOARDING_LABEL, STEP + 1)}
            />
          </>
        ) : null
      }
    />
  );
}
