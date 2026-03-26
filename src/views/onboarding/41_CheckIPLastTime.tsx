import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";
import ButtonGrayCta from "../../components/ButtonGrayCta";

const STEP = 41;

interface CheckIPLastTimeProps {
  className?: string;
  lastEntry?: boolean;}

export default function CheckIPLastTime({ className, lastEntry }: CheckIPLastTimeProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const exitNodeIteration = useAppStore((state) => state.exitNodeIteration);

  const NEED_HELP_LABEL = "I need help";
  const DONE_LABEL = "I've done that";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer(`41_CheckIPLastTime_${exitNodeIteration}`, answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`CheckIPLastTime${className ? ` ${className}` : ""}`}
      onboardingStep={STEP}
      title="Check IP one last time"
      text={
        <Typography
          variant="body1"
          sx={{
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: "#333",
          }}
        >
          Amazing! We're almost done. Let's just check the IP one last time. Go back to{" "}
            <ButtonGrayCta
              href="https://ifconfig.me/ip"
              label="https://ifconfig.me/ip"/>.
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
