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

  const START_ONBOARDING_LABEL = "Start onboarding";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("1_welcome", answer);
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
            Welcome, {username || "datanaut"}, to the datanaut program, so-called because
            we're searching for ways to reduce the amount of data you leak online all the
            way to nought.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#333",
            }}
          >
            I'm Gino, your guide for this quest to Atlantis, the first hidden city on the
            journey to Gnosis VPN's launch. This guide will walk you step-by-step through
            setting up and using Gnosis VPN.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#333",
            }}
          >
            Thanks for agreeing to share some information with us – it will really help
            shape how the VPN is developed. It also means you can switch devices and your
            progress will be restored once you log back in.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#333",
            }}
          >
            No data will be shared until you submit feedback or close the session. Until
            then I'll store everything locally if I can. If you're using something like
            incognito mode – well done on being private! – then you'll need to make sure
            to submit your progress before you close the browser.
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
            Ready? Let’s get started!
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
