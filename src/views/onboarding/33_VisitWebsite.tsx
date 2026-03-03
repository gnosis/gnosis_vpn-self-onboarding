import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";
import ButtonGrayCta from "../../components/ButtonGrayCta";

const STEP = 33;

interface VisitWebsiteProps {
  className?: string;
  lastEntry?: boolean;
}

export default function VisitWebsite({ className, lastEntry }: VisitWebsiteProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);

  const NEED_HELP_LABEL = "I need help";
  const WORKED_LABEL = "It's worked";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("33_VisitWebsite", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`VisitWebsite${className ? ` ${className}` : ""}`}
      onboardingStep={STEP}
      title="Visit our website"
      text={
        <Typography
          variant="body1"
          sx={{
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: "#333",
          }}
        >
          Let's take it for a spin. Visit{" "}
          <ButtonGrayCta
            href="https://vpn.gnosis.eth.limo/"
            label="https://vpn.gnosis.eth.limo/" />.
        </Typography>
      }
      buttons={
        lastEntry ? (
          <>
            <Button label={NEED_HELP_LABEL} onClick={() => handleAnswer(NEED_HELP_LABEL, STEP + 0.25)} />
            <Button label={WORKED_LABEL} onClick={() => handleAnswer(WORKED_LABEL, STEP + 1)} />
          </>
        ) : null
      }
    />
  );
}
