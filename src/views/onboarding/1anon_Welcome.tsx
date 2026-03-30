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
  const exitNodeIteration = useAppStore((state) => state.exitNodeIteration);

  const START_ONBOARDING_LABEL = "Start Onboarding";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer(`1anon_welcome_${exitNodeIteration}`, answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`Welcome ANON${className ? ` ${className}` : ""}`}
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
            Welcome, Anonymous to the Datanaut program. We're on a mission to reduce how much data you leak online.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#333",
            }}
          >
            I'm Gino, your guide for this quest. I'll walk you step-by-step through setting up and using Gnosis VPN.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#333",
            }}
          >
            You've chosen to stay anonymous, which is great. With Gnosis VPN, our goal is that everyone can be as private as they choose on the Internet. Before we proceed, I want to explain how that choice will affect your experience here.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#333",
            }}
          >
            First, I won't be able to track your progress through the onboarding. I'll store that locally, if I can, but if you want to change devices or use something like incognito mode, you'll need to start over.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#333",
            }}
          >
            Second, if you do run into a problem, you'll have slightly fewer options for how to proceed. But we can still help! I'll explain more if and when you get stuck.
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
            Ready? Let's begin.
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
