import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";

const STEP = 13;

interface HoprBasicsProps {
  className?: string;
  lastEntry?: boolean;}

export default function HoprBasics({ className, lastEntry }: HoprBasicsProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);

  const NEED_HELP_LABEL = "I need some help";
  const INSTALLED_LABEL = "It's installed";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("13_HoprBasics", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`HoprBasics${className ? ` ${className}` : ""}`}
      onboardingStep={STEP}
      title="HOPR Basics"
      text={
        <Typography
          variant="body1"
          sx={{
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: "#333",
          }}
        >
          While we're waiting, I'll explain a little about the VPN. Gnosis VPN runs over the HOPR mixnet, which means we'll be sending your data via multiple nodes run by people like you. Don't worry, they can't see anything you send or learn anything about you. It's fully private! But to join the network you'll need a node of your own that runs in the background. You don't need to know how any of this works, but if you're interested you can learn more at{" "}
          <Typography
            component="a"
            href="https://github.com/hoprnet/hoprnet"
            target="_blank"
            rel="noreferrer noopener"
            sx={{
              fontSize: "0.95rem",
              color: "#0066cc",
              textDecoration: "none",
              fontWeight: 500,
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            https://github.com/hoprnet/hoprnet
          </Typography>
        </Typography>
      }
      buttons={
        lastEntry ? (
          <>
            <Button label={NEED_HELP_LABEL} onClick={() => handleAnswer(NEED_HELP_LABEL, STEP + 1)} />
            <Button label={INSTALLED_LABEL} onClick={() => handleAnswer(INSTALLED_LABEL, STEP + 2)} />
          </>
        ) : null
      }
    />
  );
}
