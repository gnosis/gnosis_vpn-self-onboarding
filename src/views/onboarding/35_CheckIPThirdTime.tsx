import { Typography } from "@mui/material";
import Button from "../../components/onboarding/Button";
import Step from "../../components/onboarding/Step";
import { useAppStore } from "../../store/appStore";
import ButtonGrayCta from "../../components/ButtonGrayCta";

const STEP = 35;

interface CheckIPThirdTimeProps {
  className?: string;
  lastEntry?: boolean;}

export default function CheckIPThirdTime({ className, lastEntry }: CheckIPThirdTimeProps) {
  const setOnboardingStep = useAppStore((state) => state.setOnboardingStep);
  const saveAnswer = useAppStore((state) => state.saveAnswer);

  const SAME_LABEL = "It's the same as last time";
  const WRONG_LABEL = "Something's gone wrong";

  const handleAnswer = (answer: string, nextStep: number) => {
    saveAnswer("35_CheckIPThirdTime", answer);
    setOnboardingStep(nextStep);
  };

  return (
    <Step
      className={`CheckIPThirdTime${className ? ` ${className}` : ""}`}
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
          Let's check in on the connection. Go back to{" "}
            <ButtonGrayCta
              href="https://ifconfig.me/ip"
              label="https://ifconfig.me/ip"/>
          {" "}and check your IP
        </Typography>
      }
      buttons={
        lastEntry ? (
          <>
            <Button label={WRONG_LABEL} onClick={() => handleAnswer(WRONG_LABEL, STEP + 0.25)} />
            <Button label={SAME_LABEL} onClick={() => handleAnswer(SAME_LABEL, STEP + 1)} />
          </>
        ) : null
      }
    />
  );
}
