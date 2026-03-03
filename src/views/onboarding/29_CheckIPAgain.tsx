import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";
import ButtonGrayCta from "../../components/ButtonGrayCta";

const STEP = 29;

interface CheckIPAgainProps {
  className?: string;
  lastEntry?: boolean;}

export default function CheckIPAgain({ className, lastEntry }: CheckIPAgainProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);

  const NEED_HELP_LABEL = "I need help";
  const DONE_LABEL = "Done";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("29_CheckIPAgain", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`CheckIPAgain${className ? ` ${className}` : ""}`}
      onboardingStep={STEP}
      title="Check your IP again"
      text={
        <Typography
          variant="body1"
          sx={{
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: "#333",
          }}
        >
          Great! Now return to{" "}
          <ButtonGrayCta
              href="https://ifconfig.me/ip"
              label="https://ifconfig.me/ip"/>
          {" "}and check the IP address.
        </Typography>
      }
      buttons={
        lastEntry ? (
          <>
            <Button label={NEED_HELP_LABEL} onClick={() => handleAnswer(NEED_HELP_LABEL, STEP + 0.25)} />
            <Button label={DONE_LABEL} onClick={() => handleAnswer(DONE_LABEL, STEP + 1)} />
          </>
        ) : null
      }
    />
  );
}
